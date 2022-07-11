import { Component, OnInit } from '@angular/core';
import * as Pitchfinder from "pitchfinder";
import { PitchDetector, ProbabalisticPitchDetector, ProbabilityPitch } from 'pitchfinder/lib/detectors/types';

interface algorithm {
  name: string,
  algo: PitchDetector | ProbabalisticPitchDetector,
  active: boolean,
  data: {
    note?: string | ProbabilityPitch | null,
    frequency?: number | null,
    cents?: number | null,
    lastFrequency?: number | null
  }
};

@Component({
  selector: 'app-note-detection',
  templateUrl: './note-detection.component.html',
  styleUrls: ['./note-detection.component.scss']
})
export class NoteDetectionComponent implements OnInit {

  started = false;

  settings = {
    YIN: {
      threshold: 0,
      probabilityThreshold: 0
    },
    AMDF: {
      minFrequency: 0,
      maxFrequency: 0,
      sensitivity: 0,
      ratio: 0
    }
  };

  private algorithms :algorithm[]  = [
    { name: 'YIN', algo: Pitchfinder.YIN(), active: false, data: {} },
    { name: 'AMDF', algo: Pitchfinder.AMDF(), active: false, data: {} },
    { name: 'ACF2PLUS', algo: Pitchfinder.ACF2PLUS(), active: false, data: {} },
    { name: 'DynamicWavelet', algo: Pitchfinder.DynamicWavelet(), active: false, data: {} },
    { name: 'Macleod', algo: Pitchfinder.Macleod(), active: false, data: {} }
  ];
  private notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  private A4 = 440;
  private C0 = Math.round(this.A4 * Math.pow(2, -4.75)); // 16

  // Predefine variables
  private audioAnalyser: AnalyserNode;
  private audioContext: AudioContext;

  constructor() {
    this.audioContext = new window.AudioContext();
    this.audioAnalyser = this.audioContext!.createAnalyser();
  }

  ngOnInit(): void {
    console.log(this.audioAnalyser.fftSize);
  }

  stop() {
    this.audioContext.suspend();
  }

  togglePitchDetector(algo: string) {
    if (!this.algorithms.some(algos => algos.name === algo)) { return };

    this.algorithms = this.algorithms.map(obj => {
      if (obj.name === algo) {
        obj.active = !obj.active;
      };
      return obj;
    });
  }

  getAlgorithms() {
    return this.algorithms.map(obj => { return { name: obj.name, active: obj.active, data: obj.data } });
  }

  getData() {
    return this.algorithms.filter(obj => obj.active).map(obj => { return { name: obj.name, data: obj.data } });
  }


  test() {
    this.started = true;

    if ("mediaDevices" in navigator) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(
          stream => {
            this.audioContext!.createMediaStreamSource(stream).connect(this.audioAnalyser);

            const arrayUInt = new Uint8Array(this.audioAnalyser.frequencyBinCount);
            this.audioAnalyser.getByteTimeDomainData(arrayUInt);

            setInterval(() => {
              const array32 = new Float32Array(this.audioAnalyser.fftSize);
              this.audioAnalyser.getFloatTimeDomainData(array32);

              this.algorithms.forEach(obj => {
                if (obj.active) {

                  let frequency = obj.algo(array32);
                  let probability: number;
                  let lastFrequency = obj.data.frequency ?? 0;

                  if (frequency && typeof (frequency) === 'object') {
                    probability = frequency.probability;
                    frequency = frequency.freq;
                  };

                  const values = {
                    note: this.calculateNote(frequency),
                    frequency: frequency,
                    cents: this.calculateCents(frequency, lastFrequency),
                    lastFrequency: lastFrequency,
                  };

                  obj.data = values;
                }
              });

            }, 500);
          })
        .catch(() => { });
    }
  }


  calculateNote(frequency: number | null) {
    if (frequency === null) {
      return ""
    }
    const semiTone = this.calculateSemiTone(frequency);
    const octave = this.calculateOctave(semiTone);
    const notePosition = Math.floor(semiTone % 12);
    const note = this.notes[notePosition] + String(octave);
    return note;
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

  calculateCents(currentFrequency: number | null, lastFrequency: number | null) {
    return (lastFrequency && currentFrequency) ? 1200 * Math.log2(lastFrequency / currentFrequency) : 0;
  };
}
