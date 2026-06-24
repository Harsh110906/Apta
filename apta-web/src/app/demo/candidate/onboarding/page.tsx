"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function CandidateOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      setIsLoading(true);
      setTimeout(() => router.push("/demo/candidate/dashboard"), 1500);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-grid">
      <MotionWrapper animation="scale" className="w-full max-w-lg">
        <div className="bg-bg-secondary rounded-3xl border border-border p-8 shadow-2xl">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`h-2 flex-1 rounded-full ${i <= step ? 'bg-orange-500' : 'bg-neutral-200 dark:bg-midnight-600'}`}
              />
            ))}
          </div>

          {step === 1 && (
            <MotionWrapper animation="fade-right">
              <h1 className="text-2xl font-bold mb-2">Connect LinkedIn</h1>
              <p className="text-text-secondary mb-6">We'll import your work history to establish your baseline profile.</p>
              
              <div className="space-y-4 mb-8">
                <Button className="w-full py-6 bg-[#0077b5] hover:bg-[#006396] text-white">
                  Continue with LinkedIn
                </Button>
                <div className="relative flex items-center justify-center my-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                  <span className="relative bg-bg-secondary px-2 text-xs text-text-muted">OR</span>
                </div>
                <Input label="LinkedIn Profile URL" placeholder="https://linkedin.com/in/..." />
              </div>
            </MotionWrapper>
          )}

          {step === 2 && (
            <MotionWrapper animation="fade-right">
              <h1 className="text-2xl font-bold mb-2">Select your domain</h1>
              <p className="text-text-secondary mb-6">This determines your daily tests and leaderboard placement.</p>
              
              <div className="grid grid-cols-1 gap-3 mb-8">
                {['Frontend Engineering', 'Backend Engineering', 'Data Science', 'Product Design'].map((domain) => (
                  <div key={domain} className="p-4 rounded-xl border border-border hover:border-orange-500 hover:bg-orange-500/5 cursor-pointer transition-colors">
                    <span className="font-medium">{domain}</span>
                  </div>
                ))}
              </div>
            </MotionWrapper>
          )}

          {step === 3 && (
            <MotionWrapper animation="fade-right">
              <h1 className="text-2xl font-bold mb-2">Upload Certificates</h1>
              <p className="text-text-secondary mb-6">Boost your initial rank by providing verified credentials.</p>
              
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center mb-8 hover:bg-bg-tertiary transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-neutral-100 dark:bg-midnight-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📄</span>
                </div>
                <div className="font-medium mb-1">Click to upload or drag and drop</div>
                <div className="text-sm text-text-muted">PDF, PNG, JPG (max 5MB)</div>
              </div>
            </MotionWrapper>
          )}

          <div className="flex gap-4">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} disabled={isLoading}>
                Back
              </Button>
            )}
            <Button className="flex-1 glow-orange" onClick={handleNext} disabled={isLoading}>
              {isLoading ? "Setting up..." : step === 3 ? "Complete Setup" : "Continue"}
            </Button>
          </div>
        </div>
      </MotionWrapper>
    </div>
  );
}
