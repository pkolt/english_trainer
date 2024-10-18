const isSupportedSpeak: boolean = !!window.speechSynthesis;

let _ready: Promise<boolean> | null = null;

export const getReadySpeak = async (): Promise<boolean> => {
  if (_ready) {
    return _ready;
  }

  _ready = new Promise((resolve) => {
    if (isSupportedSpeak) {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve(true);
      } else {
        speechSynthesis.onvoiceschanged = () => resolve(true);
      }
    } else {
      resolve(false);
    }
  });

  return _ready;
};

export const speakText = async (text: string, voiceURI: string): Promise<void> => {
  if (speechSynthesis.speaking) {
    return;
  }
  const voices = speechSynthesis.getVoices();
  const voice = voices.filter((it) => it.voiceURI === voiceURI)[0];
  if (!voice) {
    console.error(`Not found voice: ${voiceURI}`);
    return;
  }
  return new Promise((resolve) => {
    const utter = new SpeechSynthesisUtterance(text);
    const handler = () => resolve();
    utter.onend = handler;
    utter.onerror = handler;
    utter.voice = voice;
    speechSynthesis.speak(utter);
  });
};
