import { Component, OnInit } from '@angular/core';
import * as Pitchfinder from "pitchfinder";
import { PitchDetector } from 'pitchfinder/lib/detectors/types';


@Component({
  selector: 'app-note-detection',
  templateUrl: './note-detection.component.html',
  styleUrls: ['./note-detection.component.scss']
})
export class NoteDetectionComponent implements OnInit {

  started = false;
  note: string | null = "";
  frequency: number | null = null;
  cents: number | null = null;
  lastFrequency: number | null = null;
  algorithms = ['YIN', 'AMDF', 'ACF2PLUS', 'DynamicWavelet', 'Macleod'];

  private detectPitch!: PitchDetector;
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
    this.detectPitch = Pitchfinder.YIN();
    // this.detectPitch = Pitchfinder.AMDF();
    // this.detectPitch = Pitchfinder.ACF2PLUS();
    // this.detectPitch = Pitchfinder.DynamicWavelet();
    // this.detectPitch = Pitchfinder.Macleod();
  }

  stop() {
    this.audioContext.suspend();
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

  setPitchDetector(){

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

              this.frequency = this.detectPitch(array32);
              this.note = this.calculateNote(this.frequency);
              this.cents = this.calculateCents(this.frequency, this.lastFrequency);

            }, 500);
          })
        .catch(() => { });
    }
  }

}
