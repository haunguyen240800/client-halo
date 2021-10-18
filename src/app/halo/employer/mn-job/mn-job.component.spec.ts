import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MnJobComponent } from './mn-job.component';

describe('MnJobComponent', () => {
  let component: MnJobComponent;
  let fixture: ComponentFixture<MnJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MnJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MnJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
