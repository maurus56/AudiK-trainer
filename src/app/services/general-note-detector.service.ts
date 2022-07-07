import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralNoteDetectorService {

  // Predefine variables
  private audioSource: MediaStreamAudioSourceNode | undefined;
  private audioAnalyser: AnalyserNode;
  private audioStream: MediaStream | undefined;
  private audioContext: AudioContext | undefined;
  private mediaDevices: MediaDevices;

  private notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  private A4 = 440;
  private C0 = Math.round(this.A4 * Math.pow(2, -4.75)); // 16

  private frequencies: Float32Array | undefined;
  private amplitude: Uint8Array | undefined;

  // Default of options
  private options = {
    microphone: true,
    audioFile: false,
    callback: this.callback,
    returnNote: true,
    returnCents: true,
    decimals: 2,
  };

  private lastFrequency: number | null = null;

  constructor() {
    this.audioContext = new window.AudioContext();
    this.mediaDevices = navigator.mediaDevices;
    // Initialize and assign a audio analyser
    this.audioAnalyser = this.audioContext!.createAnalyser();
  }

  // Code by fritzvd (signaltohertz) - https://github.com/fritzvd/signaltohertz
  // Changes: function name
  calculateFrequency(frequencies: Float32Array, options: { rate: number; } | undefined = undefined) {
    let rate = 22050 / 1024; // defaults in audioContext.

    if (options) {
      if (options.rate) {
        rate = options.rate;
      }
    }

    let maxI = 0;
    let max = frequencies[0];

    for (let i = 0; frequencies.length > i; i++) {
      const oldmax = max;
      // const oldmax = parseFloat(max);
      const newmax = Math.max(max, frequencies[i]);
      if (oldmax != newmax) {
        max = newmax;
        maxI = i;
      }
    }
    return maxI * rate;
  };

  // Calculate amount of steps away from C0
  calculateSemiTone(frequency: number) {
    const semiTonesAway = 12 * Math.log2(frequency / this.C0);
    return semiTonesAway;
  };

  // Uses C0 as base
  calculateOctave(semiTonesAway: number) {
    const octave = Math.floor(semiTonesAway / 12);
    return octave;
  };

  calculateCents(currentFrequency: number, lastFrequency: number | null) {
    return lastFrequency ? 1200 * Math.log2(lastFrequency / currentFrequency) : 0;
  };

  calculateNote(frequency: number) {
    const semiTone = this.calculateSemiTone(frequency);
    const octave = this.calculateOctave(semiTone);
    const notePosition = Math.floor(semiTone % 12);
    const note = this.notes[notePosition] + String(octave);
    return note;
  };

  // Handle error
  throwError(err: string) {
    throw new Error(`Something went wrong: ${err}`);
  };

  // Get the frequencies and return values based on options
  analysePitch() {
    console.log(this.frequencies)
    this.audioAnalyser.getFloatFrequencyData(this.frequencies!);

    const frequency = this.calculateFrequency(this.frequencies!);

    if (frequency) {
      const { returnCents, returnNote, decimals, callback } = this.options;

      const returnValue = {
        frequency: frequency.toFixed(decimals),
        note: returnNote ? this.calculateNote(frequency) : "",
        cents: returnCents ? this.calculateCents(frequency, this.lastFrequency).toFixed(decimals) : "",
      };

      this.lastFrequency = frequency;
      // Execute the callback. (Intended for returning the output)
      callback(returnValue);

    }

    // Tells the browser we wish to perform an animation. Call callback before re-paint
    if (this.audioContext && this.audioContext.state === 'running') {
      window.requestAnimationFrame(this.analysePitch);
    }
  }

  // What to do with the audio payload
  callback(payload: { frequency: string; note: string; cents: string; }) {
  }

  initialize(args: any) {
    // Start media stream
    this.options = { ...this.options, ...args };
    return this.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.initiateStream(stream);
      })
      .catch(this.throwError);
  }

  resumeAnalyser() {
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume().then(() => {
        this.analysePitch();
      });
    }
  }

  pauseAnalyser() {
    if (this.audioContext?.state === 'running') {
      this.audioContext.suspend();
    }
  }

  // stopAnalyser() {
  //   this.audioContext?.close().then(() => {
  //     this.audioContext = undefined;
  //   });
  // }

  initiateStream(stream: MediaStream) {
    // Set the stream to audioStream
    this.audioStream = stream;

    // Create frequencies arrayholder
    this.frequencies = new Float32Array(this.audioAnalyser.frequencyBinCount);

    this.amplitude = new Uint8Array(this.audioAnalyser.frequencyBinCount);

    console.log(this.frequencies);
    console.log(this.amplitude);

    // Assign a stream source as main source
    this.audioSource = this.audioContext!.createMediaStreamSource(this.audioStream);

    // Connect the audio to our analyser
    this.audioSource.connect(this.audioAnalyser);
  }

    //   // What to do with the audio payload
  //   analyserCallback(payload: { frequency: string; note: string; cents: string; }) {
  //     this.note = payload.note;
  //     this.frequency = payload.frequency;
  //     this.cents = payload.cents;
  //   }

  // // Button to initialise and start the analyser
  // startButton() {
  //   // Required to init the analyser first
  //   // It will create an AudioContext instance under 'analyser.audioContext'
  //   // It returns no value
  //   this.generalNoteService.initialize({callback : this.analyserCallback}).then(() => {
  //     // Start the analyser after initialisation
  //     this.generalNoteService.analysePitch();
  //   });
  // };

  // controlPlay() {
  //   this.generalNoteService.resumeAnalyser();
  // };

  // controlPause() {
  //   this.generalNoteService.pauseAnalyser();
  // };



}
