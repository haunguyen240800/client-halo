import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatJobComponent } from './updat-job.component';

describe('UpdatJobComponent', () => {
  let component: UpdatJobComponent;
  let fixture: ComponentFixture<UpdatJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
