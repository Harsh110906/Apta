"use client";

import { useState } from "react";
import Link from "next/link";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"candidate" | "recruiter">("candidate");

  return (
    <main className="flex-1 w-full flex items-center justify-center min-h-[calc(100vh-140px)] bg-bg-primary">
      <div className="w-full max-w-md p-8">
        <MotionWrapper animation="scale">
          <div className="bg-bg-secondary rounded-3xl border border-border shadow-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
            
            <div className="text-center mb-8 relative z-10">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg">
                  <span className="font-display font-bold text-2xl">A</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold">Welcome to Apta</h1>
              <p className="text-sm text-text-secondary mt-2">
                Sign in to continue to your account
              </p>
            </div>

            <div className="flex justify-center mb-6 relative z-10">
              <div className="inline-flex rounded-xl bg-neutral-100 dark:bg-midnight-800 p-1 w-full">
                <button
                  onClick={() => setActiveTab("candidate")}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-bold transition-all ${
                    activeTab === "candidate"
                      ? "bg-bg-secondary text-foreground shadow-sm"
                      : "text-text-muted hover:text-foreground"
                  }`}
                >
                  Candidate
                </button>
                <button
                  onClick={() => setActiveTab("recruiter")}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-bold transition-all ${
                    activeTab === "recruiter"
                      ? "bg-bg-secondary text-foreground shadow-sm"
                      : "text-text-muted hover:text-foreground"
                  }`}
                >
                  Hiring Team
                </button>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              {activeTab === "candidate" ? (
                <div className="animate-fade-in space-y-3">
                  <Link href="/demo/candidate/onboarding?login=google" className="block">
                    <Button variant="outline" className="w-full py-5 text-base justify-center gap-3 bg-white text-black hover:bg-neutral-50 border-neutral-200">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Continue with Google
                    </Button>
                  </Link>
                  <Link href="/demo/candidate/onboarding?login=github" className="block">
                    <Button variant="outline" className="w-full py-5 text-base justify-center gap-3 border-neutral-300 dark:border-neutral-700 bg-[#24292e] text-white hover:bg-[#2c3137]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      Continue with GitHub
                    </Button>
                  </Link>
                  
                  <div className="relative py-2">
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-bg-secondary px-2 text-text-muted">Or continue with</span>
                    </div>
                  </div>

                  <Link href="/demo/candidate/onboarding?login=email" className="block">
                    <Button className="w-full py-5 text-base justify-center gap-2">
                      <Mail className="w-4 h-4" />
                      Continue with Email
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="animate-fade-in space-y-4">
                  <div className="bg-emerald/10 border border-emerald/20 rounded-xl p-4 mb-2">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-emerald mb-1">Verified recruiter access</div>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          Only authenticated hiring teams can contact candidates. Recruiter identity verification protects our candidates.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link href="/demo/recruiter/setup?login=work_email" className="block">
                    <Button variant="outline" className="w-full py-5 text-base justify-center gap-2 border-orange-500/30 hover:border-orange-500/60 bg-orange-500/5 hover:bg-orange-500/10">
                      <Lock className="w-4 h-4 text-orange-500" />
                      Continue with Work Email
                    </Button>
                  </Link>

                  <div className="text-center text-xs text-text-muted mt-4">
                    Strictly requires a verified company domain.
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 text-center text-[10px] text-text-muted uppercase tracking-wider font-semibold">
              Prototype Auth Mock
            </div>
          </div>
        </MotionWrapper>
      </div>
    </main>
  );
}
