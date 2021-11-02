import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupInterviewComponent } from './popup-interview.component';

describe('PopupInterviewComponent', () => {
  let component: PopupInterviewComponent;
  let fixture: ComponentFixture<PopupInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
