/* eslint-disable no-console */
export class TtsService {
  public get hasTts(): boolean {
    return !!this.speechApi && !!this.voice
  }

  private readonly speechApi: SpeechSynthesis | undefined
  private voice: SpeechSynthesisVoice | undefined

  constructor() {
    this.speechApi = window.speechSynthesis
    if (!this.speechApi) return
    let counter = 0

    const interval = setInterval(() => {
      counter++
      if (!this.speechApi) {
        clearInterval(interval)
        return
      }
      const voices = this.speechApi.getVoices()
      console.log('Attempting to get voices:', voices.length)
      if (voices.length > 0) {
        this.voice = voices.find(voice => voice.lang === 'ko-KR')
        clearInterval(interval)
        console.info('Text-to-Speech initialized')
      }
      if (counter >= 20) {
        clearInterval(interval)
        console.warn('Unable to load service or voice for Text-To-Speech')
      }
    }, 100)
  }

  public speak(text: string): void {
    if (!this.speechApi || !this.voice) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = this.voice
    this.speechApi.speak(utterance)
  }
}
