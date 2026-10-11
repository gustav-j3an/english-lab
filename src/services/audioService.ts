export interface AudioPlayOptions {
  rate?: number;
  accent?: 'US' | 'UK';
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

class AudioService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  public speak(text: string, options: AudioPlayOptions = {}): boolean {
    if (!this.synth) {
      console.warn('Speech synthesis não suportado neste navegador.');
      return false;
    }

    try {
      // Cancel any ongoing speech
      this.synth.cancel();

      // Clean phonetic markers or quotes from audio text
      const cleanText = text.replace(/[/ˈˌ]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);

      utterance.rate = options.rate ?? 1.0;
      utterance.pitch = 1.0;

      const targetLang = options.accent === 'UK' ? 'en-GB' : 'en-US';
      utterance.lang = targetLang;

      // Try finding preferred English voice
      const preferredVoice = this.voices.find(
        (v) =>
          v.lang.startsWith(targetLang.substring(0, 2)) &&
          (v.lang.includes(options.accent === 'UK' ? 'GB' : 'US') || v.name.includes('English'))
      );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      if (options.onStart) utterance.onstart = options.onStart;
      if (options.onEnd) utterance.onend = options.onEnd;
      if (options.onError) utterance.onerror = options.onError;

      this.synth.speak(utterance);
      return true;
    } catch (err) {
      console.error('Erro ao reproduzir áudio:', err);
      if (options.onError) options.onError();
      return false;
    }
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }
}

export const audioService = new AudioService();
