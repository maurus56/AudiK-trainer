import { TestBed } from '@angular/core/testing';

import { TestPitchAnalyzersService } from './test-pitch-analyzers.service';

describe('TestPitchAnalyzersService', () => {
  let service: TestPitchAnalyzersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestPitchAnalyzersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
