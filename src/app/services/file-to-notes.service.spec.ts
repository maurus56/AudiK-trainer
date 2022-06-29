import { TestBed } from '@angular/core/testing';

import { FileToNotesService } from './file-to-notes.service';

describe('FileToNotesService', () => {
  let service: FileToNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileToNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
