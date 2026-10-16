import { NextResponse } from "next/server";
import { serverInterviewService } from "@/services/interview/serverService";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (typeof body.turnNumber !== "number") {
      return NextResponse.json(
        { error: "turnNumber (number) is required." },
        { status: 400 }
      );
    }

    if (typeof body.answerTranscript !== "string") {
      return NextResponse.json(
        { error: "answerTranscript (string) is required." },
        { status: 400 }
      );
    }

    const result = await serverInterviewService.submitTurn(id, {
      turnNumber: body.turnNumber,
      answerTranscript: body.answerTranscript,
      isVoiceInput: Boolean(body.isVoiceInput),
      deliverySeconds: typeof body.deliverySeconds === "number" ? body.deliverySeconds : 30,
      fillerWords: Array.isArray(body.fillerWords) ? body.fillerWords : undefined,
      speakingPaceWpm: typeof body.speakingPaceWpm === "number" ? body.speakingPaceWpm : undefined,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[API /api/interview/session/[id]/turn] Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to submit answer turn." },
      { status: 500 }
    );
  }
}
