// Stubbed voice transcription service - not configured for Railway deployment
// Keep type exports for compatibility

export type TranscribeOptions = {
  file: Buffer | Blob;
  model?: string;
  language?: string;
  prompt?: string;
};

export type WhisperSegment = {
  id: number;
  seek: number;
  start: number;
  end: number;
  text: string;
  tokens: number[];
  temperature: number;
  avg_logprob: number;
  compression_ratio: number;
  no_speech_prob: number;
};

export type WhisperResponse = {
  task: string;
  language: string;
  duration: number;
  text: string;
  segments: WhisperSegment[];
};

export type TranscriptionResponse = WhisperResponse;

export type TranscriptionError = {
  error: string;
  details?: string;
};

/**
 * Transcribe audio function - STUBBED
 * Throws error indicating voice transcription service is not configured
 */
export async function transcribeAudio(
  options: TranscribeOptions
): Promise<TranscriptionResponse> {
  throw new Error(
    "Voice transcription service is not configured. This feature requires an audio transcription API integration (OpenAI Whisper, AssemblyAI, etc.) which has not been set up for this Railway deployment."
  );
}
