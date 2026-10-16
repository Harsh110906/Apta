import { NextResponse } from "next/server";
import { serverInterviewService } from "@/services/interview/serverService";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const reason = body?.reason || "completed";

    const report = await serverInterviewService.completeSession(id, reason);
    return NextResponse.json({ report });
  } catch (error: any) {
    console.error("[API /api/interview/session/[id]/complete] Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to finalize interview report." },
      { status: 500 }
    );
  }
}
