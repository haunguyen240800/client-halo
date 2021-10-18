import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MnCandidateComponent } from './mn-candidate.component';

describe('MnCandidateComponent', () => {
  let component: MnCandidateComponent;
  let fixture: ComponentFixture<MnCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MnCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MnCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
