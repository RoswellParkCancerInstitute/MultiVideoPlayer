import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoElementsComponent } from './video-elements.component';

describe('VideoElementsComponent', () => {
  let component: VideoElementsComponent;
  let fixture: ComponentFixture<VideoElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
