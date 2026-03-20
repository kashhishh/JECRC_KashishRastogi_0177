import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackFormComponent } from './feedback-form';

describe('FeedbackForm', () => {
  let component: FeedbackFormComponent;
  let fixture: ComponentFixture<FeedbackFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
