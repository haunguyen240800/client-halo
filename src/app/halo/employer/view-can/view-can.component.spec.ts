import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCanComponent } from './view-can.component';

describe('ViewCanComponent', () => {
  let component: ViewCanComponent;
  let fixture: ComponentFixture<ViewCanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
