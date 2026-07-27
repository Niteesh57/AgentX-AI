/**
 * Edge-TTS Client Audio Synthesizer Service
 * Communicates with /api/tts endpoint (served via Vite / Node.js server)
 * Streams real Microsoft Neural TTS MP3 audio for ANY language (Telugu, Tamil, Malayalam, Hindi, etc.)
 */

export interface SynthesizeOptions {
  voiceName: string;
  text: string;
  rate?: string;  // e.g. "+0%", "+10%", "-20%"
  pitch?: string; // e.g. "+0Hz", "+5Hz", "-5Hz"
}

// In-memory audio cache to prevent duplicate network calls
const audioCache = new Map<string, ArrayBuffer>();

export async function fetchEdgeTTSAudio(options: SynthesizeOptions): Promise<ArrayBuffer> {
  const cacheKey = `${options.voiceName}:${options.text}`;
  if (audioCache.has(cacheKey)) {
    return audioCache.get(cacheKey)!;
  }

  const response = await fetch('/api/tts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      voiceName: options.voiceName,
      text: options.text,
      rate: options.rate || '+0%',
      pitch: options.pitch || '+0Hz',
    }),
  });

  if (!response.ok) {
    throw new Error(`Edge-TTS API failed with status ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  audioCache.set(cacheKey, arrayBuffer);
  return arrayBuffer;
}

export class EdgeAudioPlayer {
  private audioCtx: AudioContext | null = null;
  private currentSource: AudioBufferSourceNode | null = null;
  private isPlaying = false;

  public async playBuffer(
    arrayBuffer: ArrayBuffer,
    options: { playbackRate?: number; detuneCents?: number },
    onEnd: () => void,
    onError: (err: Error) => void
  ) {
    try {
      this.stop();
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioCtx();

      const audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer.slice(0));
      const source = this.audioCtx.createBufferSource();
      source.buffer = audioBuffer;

      // Apply Pace / Speed (0.5x to 2.5x)
      if (options.playbackRate !== undefined) {
        source.playbackRate.value = Math.min(Math.max(options.playbackRate, 0.5), 2.5);
      }

      // Apply Pitch Detune in cents (-600 to +600 cents)
      if (options.detuneCents !== undefined && source.detune) {
        source.detune.value = Math.min(Math.max(options.detuneCents, -800), 800);
      }

      source.connect(this.audioCtx.destination);

      this.currentSource = source;
      this.isPlaying = true;

      source.onended = () => {
        this.isPlaying = false;
        onEnd();
      };

      source.start(0);
    } catch (err: any) {
      this.isPlaying = false;
      onError(err);
    }
  }

  /** Dynamically adjust speed/pace while audio is playing */
  public setPlaybackRate(rate: number) {
    if (this.currentSource && this.currentSource.playbackRate) {
      this.currentSource.playbackRate.value = Math.min(Math.max(rate, 0.4), 2.5);
    }
  }

  /** Dynamically adjust pitch detune while audio is playing */
  public setDetune(cents: number) {
    if (this.currentSource && this.currentSource.detune) {
      this.currentSource.detune.value = cents;
    }
  }

  public stop() {
    if (this.currentSource) {
      try {
        this.currentSource.stop();
        this.currentSource.disconnect();
      } catch (e) {}
      this.currentSource = null;
    }
    if (this.audioCtx) {
      try {
        this.audioCtx.close();
      } catch (e) {}
      this.audioCtx = null;
    }
    this.isPlaying = false;
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const globalEdgeAudioPlayer = new EdgeAudioPlayer();
