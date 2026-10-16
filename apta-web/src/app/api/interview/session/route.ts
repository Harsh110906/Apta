import { NextResponse } from "next/server";
import { serverInterviewService } from "@/services/interview/serverService";
import { InterviewConfig } from "@/types/interview";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as InterviewConfig;

    if (!body || !body.jobRole) {
      return NextResponse.json(
        { error: "jobRole is required to configure an interview session." },
        { status: 400 }
      );
    }

    if (!body.experienceLevel || !body.interviewType || !body.durationMinutes) {
      return NextResponse.json(
        { error: "experienceLevel, interviewType, and durationMinutes are required." },
        { status: 400 }
      );
    }

    const session = await serverInterviewService.createSession(body);
    return NextResponse.json({ session }, { status: 201 });
  } catch (error) {
    console.error("[API /api/interview/session] Error:", error);
    return NextResponse.json(
      { error: "Failed to initialize interview session." },
      { status: 500 }
    );
  }
}
