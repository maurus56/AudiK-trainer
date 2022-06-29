import { Injectable } from '@angular/core';
import {
  BasicPitch,
  NoteEventTime,
  noteFramesToTime,
  addPitchBendsToNoteEvents,
  outputToNotesPoly,
} from '@spotify/basic-pitch';


@Injectable({
  providedIn: 'root'
})
export class FileToNotesService {
  private basicPitch: BasicPitch;
  private audioCtx: AudioContext;
  private settings = {
    // @param onsetThresh: minimum amplitude of an onset activation to be considered an onset
    "note_segmentation": 0.5,
    // @param frameThresh: minimum amplitude of a frame activation for a note to remain "on"
    "conf_thresh": 0.3,
    // @param minNoteLen: minimum allowed note length in frames
    "min_note_len": 5,
    // @param inferOnsets: if True, add additional onsets when there are large differences in frame amplitudes
    "infer_onsets": true,
    // @param maxFreq: maximum allowed output frequency, in Hz
    "max_pitch": null,
    // @param minFreq: minimum allowed output frequency, in Hz
    "min_pitch": null,
    // @param melodiaTrick: remove semitones near a peak
    "melodia_trick": true,
    // @param energyTolerance: number of frames allowed to drop below 0
    "energy_tolerance": 11,
  };


  constructor() {
    this.audioCtx = new window.AudioContext({
      sampleRate: 22050,
    });
    this.basicPitch = new BasicPitch('/assets/tf-model/model.json');
  }

  updateSetings(
    onsetThresh: number = 0.5,
    frameThresh: number = 0.3,
    minNoteLen: number = 5,
    inferOnsets: boolean = true,
    maxFreq: number|null = null,
    minFreq: number|null = null,
    melodiaTrick: boolean = true,
    energyTolerance: number = 11){
      
    }

  /**
   * Decode raw model output to polyphonic note events
   * @param file
   * @returns List of tuples[(startTimeSeconds, durationSeconds, pitchMidi, amplitude)]
                  where amplitude is a number between 0 and 1
  */
  async getNotesFromFile(file: File) : Promise<NoteEventTime[]|undefined> {
    // this.file = file;
    let audioBuffer: AudioBuffer | undefined = undefined;
    let frames: number[][] = [];
    let onsets: number[][] = [];
    let contours: number[][] = [];
    let pct: number = 0;
    let model: any;


    let fr = new FileReader();
    fr.readAsArrayBuffer(file);
    while (fr.result === null) {
      await new Promise(r => setTimeout(r, 1));
    }
    let buff = fr.result;

    if (typeof (buff) === 'string') {
      console.log(typeof (buff));
      return;
    }

    await this.audioCtx.decodeAudioData(buff,
      async (_audioBuffer: AudioBuffer) => {
        audioBuffer = _audioBuffer;
      },
      () => { },
    );

    await this.basicPitch.evaluateModel(
      audioBuffer as unknown as AudioBuffer,
      (f: number[][], o: number[][], c: number[][]) => {
        frames.push(...f);
        onsets.push(...o);
        contours.push(...c);
      },
      (p: number) => {
        pct = p;
      },
    );

    const notes = noteFramesToTime(
      addPitchBendsToNoteEvents(
        contours,
        outputToNotesPoly(frames, onsets, 0.25, 0.25, 5),
      ),
    );

    return notes;
  };




}
