import { NextResponse } from "next/server";
import { serverInterviewService } from "@/services/interview/serverService";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const report = await serverInterviewService.getReport(id);

    if (!report) {
      return NextResponse.json(
        { error: "Report not found for this session." },
        { status: 404 }
      );
    }

    return NextResponse.json({ report });
  } catch (error: any) {
    console.error("[API /api/interview/session/[id]/report] Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to retrieve report." },
      { status: 500 }
    );
  }
}
