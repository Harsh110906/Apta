import { NextResponse } from "next/server";
import { serverInterviewService } from "@/services/interview/serverService";

export async function GET() {
  try {
    const sessions = await serverInterviewService.listHistory();
    return NextResponse.json({ sessions });
  } catch (error: any) {
    console.error("[API /api/interview/history] Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to retrieve interview history." },
      { status: 500 }
    );
  }
}
