import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTimeDisplayComponent } from './video-time-display.component';

describe('VideoTimeDisplayComponent', () => {
  let component: VideoTimeDisplayComponent;
  let fixture: ComponentFixture<VideoTimeDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoTimeDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoTimeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
