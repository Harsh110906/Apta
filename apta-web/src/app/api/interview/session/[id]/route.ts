import { NextResponse } from "next/server";
import { serverInterviewService } from "@/services/interview/serverService";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await serverInterviewService.getSession(id);

    if (!session) {
      return NextResponse.json({ error: "Session not found." }, { status: 404 });
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error("[API /api/interview/session/[id]] Error:", error);
    return NextResponse.json({ error: "Failed to retrieve session." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const deleted = await serverInterviewService.deleteSession(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    console.error("[API DELETE /api/interview/session/[id]] Error:", error);
    return NextResponse.json({ error: "Failed to delete session." }, { status: 500 });
  }
}
