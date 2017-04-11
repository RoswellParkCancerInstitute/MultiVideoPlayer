import { MultiVideoPlayerPage } from './app.po';

describe('multi-video-player App', () => {
  let page: MultiVideoPlayerPage;

  beforeEach(() => {
    page = new MultiVideoPlayerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
