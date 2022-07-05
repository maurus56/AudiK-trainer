import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolyphonicDetectionComponent } from './polyphonic-detection.component';

describe('PolyphonicDetectionComponent', () => {
  let component: PolyphonicDetectionComponent;
  let fixture: ComponentFixture<PolyphonicDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolyphonicDetectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolyphonicDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
