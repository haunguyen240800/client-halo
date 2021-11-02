import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfitmationComponent } from './confitmation.component';

describe('ConfitmationComponent', () => {
  let component: ConfitmationComponent;
  let fixture: ComponentFixture<ConfitmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfitmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfitmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
