/**
 * Client-side Voice Services for Apta Interview Arena:
 * - Web Speech API SpeechSynthesis for question audio playback
 * - Web Speech API SpeechRecognition for speech-to-text transcription
 * - Web Audio API AnalyserNode for live mic volume metering
 * - Safe resource cleanup & fallbacks
 */

export interface SpeechRecognitionResultPayload {
  transcript: string;
  isFinal: boolean;
}

export class VoiceService {
  private synth: SpeechSynthesis | null = null;
  private recognition: any = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private mediaStream: MediaStream | null = null;
  private animFrameId: number | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.synth = window.speechSynthesis || null;
    }
  }

  // ────────────────────────────────────────
  // Text-To-Speech (TTS)
  // ────────────────────────────────────────

  isTtsSupported(): boolean {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  speakQuestion(
    text: string,
    persona: "Supportive" | "Neutral" | "Challenging" = "Neutral",
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ): void {
    if (!this.synth) {
      onError?.(new Error("Speech synthesis not supported in this browser."));
      return;
    }

    // Cancel any previous in-flight utterance
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Adjust rate and pitch by persona
    if (persona === "Supportive") {
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
    } else if (persona === "Challenging") {
      utterance.rate = 1.05;
      utterance.pitch = 0.95;
    } else {
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
    }

    // Select suitable English voice if available
    const voices = this.synth.getVoices();
    const naturalVoice = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.includes("Natural") ||
          v.name.includes("Google") ||
          v.name.includes("Samantha") ||
          v.name.includes("Daniel") ||
          v.name.includes("Premium"))
    ) || voices.find((v) => v.lang.startsWith("en"));

    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => onStart?.();
    utterance.onend = () => onEnd?.();
    utterance.onerror = (e) => {
      // Ignore user-initiated cancellation errors
      if (e.error === "canceled" || e.error === "interrupted") return;
      onError?.(e);
    };

    this.synth.speak(utterance);
  }

  stopSpeaking(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  // ────────────────────────────────────────
  // Speech-To-Text (STT)
  // ────────────────────────────────────────

  isSttSupported(): boolean {
    if (typeof window === "undefined") return false;
    return Boolean(
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    );
  }

  startListening(
    onResult: (payload: SpeechRecognitionResultPayload) => void,
    onError: (err: any) => void,
    onEnd: () => void
  ): () => void {
    if (typeof window === "undefined") {
      return () => {};
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      onError(new Error("Speech recognition not supported in this browser. Please use text input."));
      return () => {};
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = "en-US";

      let finalTranscript = "";

      this.recognition.onresult = (event: any) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalTranscript += item[0].transcript + " ";
          } else {
            interimTranscript += item[0].transcript;
          }
        }

        onResult({
          transcript: (finalTranscript + interimTranscript).trim(),
          isFinal: false,
        });
      };

      this.recognition.onerror = (e: any) => {
        if (e.error === "no-speech") return;
        onError(e);
      };

      this.recognition.onend = () => {
        onResult({ transcript: finalTranscript.trim(), isFinal: true });
        onEnd();
      };

      this.recognition.start();

      return () => {
        this.stopListening();
      };
    } catch (err) {
      onError(err);
      return () => {};
    }
  }

  stopListening(): void {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        // Ignored
      }
      this.recognition = null;
    }
  }

  // ────────────────────────────────────────
  // Audio Meter & Speaker Testing
  // ────────────────────────────────────────

  async startMicVolumeMeter(
    stream: MediaStream,
    onVolume: (volumePct: number) => void
  ): Promise<void> {
    this.stopMicVolumeMeter();
    this.mediaStream = stream;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      this.audioContext = new AudioCtx();
      const source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.5;

      source.connect(this.analyser);

      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);

      const checkVolume = () => {
        if (!this.analyser) return;
        this.analyser.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        // Normalize to 0-100 range with sensitivity boost
        const volume = Math.min(100, Math.round((average / 128) * 100 * 1.5));
        onVolume(volume);

        this.animFrameId = requestAnimationFrame(checkVolume);
      };

      this.animFrameId = requestAnimationFrame(checkVolume);
    } catch (err) {
      console.warn("[VoiceService] Failed to start mic meter:", err);
    }
  }

  stopMicVolumeMeter(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.audioContext && this.audioContext.state !== "closed") {
      this.audioContext.close().catch(() => {});
      this.audioContext = null;
    }
    this.analyser = null;
    this.mediaStream = null;
  }

  playAudioTestChime(): Promise<void> {
    return new Promise((resolve) => {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) {
          resolve();
          return;
        }

        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        // Play pleasant two-tone chime (523.25 Hz - C5, 659.25 Hz - E5)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(523.25, now);
        osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.2);

        osc2.type = "sine";
        osc2.frequency.setValueAtTime(659.25, now + 0.2);
        osc2.frequency.exponentialRampToValueAtTime(783.99, now + 0.4);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc1.stop(now + 0.2);

        osc2.start(now + 0.2);
        osc2.stop(now + 0.6);

        setTimeout(() => {
          ctx.close().catch(() => {});
          resolve();
        }, 700);
      } catch (err) {
        console.warn("[VoiceService] Audio test failed:", err);
        resolve();
      }
    });
  }

  cleanup(): void {
    this.stopSpeaking();
    this.stopListening();
    this.stopMicVolumeMeter();
  }
}

export const voiceService = new VoiceService();
