import { TestBed } from '@angular/core/testing';

import { GeneralNoteDetectorService } from './general-note-detector.service';

describe('GeneralNoteDetectorService', () => {
  let service: GeneralNoteDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralNoteDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
