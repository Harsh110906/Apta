import { InterviewSession, InterviewReport } from "@/types/interview";

export interface IInterviewStorageAdapter {
  saveSession(session: InterviewSession): Promise<void>;
  getSession(sessionId: string): Promise<InterviewSession | null>;
  listSessions(): Promise<InterviewSession[]>;
  deleteSession(sessionId: string): Promise<boolean>;
  saveReport(report: InterviewReport): Promise<void>;
  getReport(sessionId: string): Promise<InterviewReport | null>;
}

const STORAGE_KEYS = {
  SESSIONS_PREFIX: "apta_interview_session_",
  REPORTS_PREFIX: "apta_interview_report_",
  SESSIONS_INDEX: "apta_interview_sessions_index",
};

// In-memory fallback for SSR or environments without localStorage
const memorySessionStore = new Map<string, InterviewSession>();
const memoryReportStore = new Map<string, InterviewReport>();

export class LocalDemoStorageAdapter implements IInterviewStorageAdapter {
  private isBrowser(): boolean {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  }

  async saveSession(session: InterviewSession): Promise<void> {
    if (!session || !session.id) return;

    if (!this.isBrowser()) {
      memorySessionStore.set(session.id, session);
      return;
    }

    try {
      // Clean large temporary objects before storing
      const cleanSession: InterviewSession = {
        ...session,
        // Ensure no active stream handles or circular references exist
      };
      window.localStorage.setItem(
        `${STORAGE_KEYS.SESSIONS_PREFIX}${session.id}`,
        JSON.stringify(cleanSession)
      );

      // Update index
      const index = await this.getSessionIndex();
      if (!index.includes(session.id)) {
        index.unshift(session.id);
        window.localStorage.setItem(STORAGE_KEYS.SESSIONS_INDEX, JSON.stringify(index));
      }
    } catch (err) {
      console.warn("[LocalDemoStorageAdapter] Failed to save session to localStorage:", err);
      memorySessionStore.set(session.id, session);
    }
  }

  async getSession(sessionId: string): Promise<InterviewSession | null> {
    if (!sessionId) return null;

    if (!this.isBrowser()) {
      return memorySessionStore.get(sessionId) || null;
    }

    try {
      const raw = window.localStorage.getItem(`${STORAGE_KEYS.SESSIONS_PREFIX}${sessionId}`);
      if (raw) {
        return JSON.parse(raw) as InterviewSession;
      }
      return memorySessionStore.get(sessionId) || null;
    } catch (err) {
      console.warn("[LocalDemoStorageAdapter] Failed to get session:", err);
      return memorySessionStore.get(sessionId) || null;
    }
  }

  async listSessions(): Promise<InterviewSession[]> {
    if (!this.isBrowser()) {
      return Array.from(memorySessionStore.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    try {
      const index = await this.getSessionIndex();
      const sessions: InterviewSession[] = [];
      for (const id of index) {
        const session = await this.getSession(id);
        if (session) {
          sessions.push(session);
        }
      }
      return sessions;
    } catch (err) {
      console.warn("[LocalDemoStorageAdapter] Failed to list sessions:", err);
      return Array.from(memorySessionStore.values());
    }
  }

  async deleteSession(sessionId: string): Promise<boolean> {
    if (!sessionId) return false;

    memorySessionStore.delete(sessionId);
    memoryReportStore.delete(sessionId);

    if (this.isBrowser()) {
      try {
        window.localStorage.removeItem(`${STORAGE_KEYS.SESSIONS_PREFIX}${sessionId}`);
        window.localStorage.removeItem(`${STORAGE_KEYS.REPORTS_PREFIX}${sessionId}`);
        const index = await this.getSessionIndex();
        const updated = index.filter((id) => id !== sessionId);
        window.localStorage.setItem(STORAGE_KEYS.SESSIONS_INDEX, JSON.stringify(updated));
        return true;
      } catch (err) {
        console.warn("[LocalDemoStorageAdapter] Failed to delete session:", err);
        return false;
      }
    }
    return true;
  }

  async saveReport(report: InterviewReport): Promise<void> {
    if (!report || !report.sessionId) return;

    if (!this.isBrowser()) {
      memoryReportStore.set(report.sessionId, report);
      return;
    }

    try {
      window.localStorage.setItem(
        `${STORAGE_KEYS.REPORTS_PREFIX}${report.sessionId}`,
        JSON.stringify(report)
      );

      // Also attach to session if session exists
      const session = await this.getSession(report.sessionId);
      if (session) {
        session.report = report;
        session.status = report.completionStatus;
        await this.saveSession(session);
      }
    } catch (err) {
      console.warn("[LocalDemoStorageAdapter] Failed to save report:", err);
      memoryReportStore.set(report.sessionId, report);
    }
  }

  async getReport(sessionId: string): Promise<InterviewReport | null> {
    if (!sessionId) return null;

    if (!this.isBrowser()) {
      return memoryReportStore.get(sessionId) || null;
    }

    try {
      const raw = window.localStorage.getItem(`${STORAGE_KEYS.REPORTS_PREFIX}${sessionId}`);
      if (raw) {
        return JSON.parse(raw) as InterviewReport;
      }
      // Check session
      const session = await this.getSession(sessionId);
      if (session?.report) {
        return session.report;
      }
      return memoryReportStore.get(sessionId) || null;
    } catch (err) {
      console.warn("[LocalDemoStorageAdapter] Failed to get report:", err);
      return memoryReportStore.get(sessionId) || null;
    }
  }

  private async getSessionIndex(): Promise<string[]> {
    if (!this.isBrowser()) return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.SESSIONS_INDEX);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}

export const interviewStorage = new LocalDemoStorageAdapter();
