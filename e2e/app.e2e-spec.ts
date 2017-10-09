import { AppPage } from './app.po';

describe('klm-case-assignment App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('get the current carosuel detail', () => {
    page.notWaitForAngular().then(() => {
      page.navigateTo();
      const pauseBtn = page.getPauseButton();
      const textref = page.getTextReference();
      const img = page.getImageRef();
      expect(textref.getText()).toEqual('There are 101 reason for th city trip.');
      expect(img.getAttribute('src')).toContain('/carousel/home1.jpg');
  });
  });

  it('click the next button', () => {
    page.notWaitForAngular().then(() => {
      page.navigateTo();
      const pauseBtn = page.getPauseButton();
      const textref = page.getTextReference();
      const nextBtn = page.getNextButton();
      const img = page.getImageRef();
      pauseBtn.click().then(() => {
        nextBtn.click().then(() => {
        expect(textref.getText()).toEqual('Round trip price at heavy discount.');
        expect(img.getAttribute('src')).toContain('/carousel/home3.jpg');
    });
  });
  });
  });

  it('click the prev button', () => {
    page.notWaitForAngular().then(() => {
      page.navigateTo();
      const pauseBtn = page.getPauseButton();
      const textref = page.getTextReference();
      const prevBtn = page.getPrevButton();
      const img = page.getImageRef();
      pauseBtn.click().then(() => {
        prevBtn.click().then(() => {
        expect(textref.getText()).toEqual('There are 101 reason for th city trip.');
        expect(img.getAttribute('src')).toContain('/carousel/home1.jpg');
    });
  });
  });
  });

  it('get No. of bullets', () => {
      page.notWaitForAngular().then(() => {
      page.navigateTo();
      const pauseBtn = page.getPauseButton();
      const bullets = page.getBullets();
      pauseBtn.click().then(() => {
        expect(bullets.count()).toBe(5);
    });
  });
  });

  it('click the first bullet.', () => {
    page.notWaitForAngular().then(() => {
    page.navigateTo();
    const pauseBtn = page.getPauseButton();
    const firstbullet = page.getBullets().get(0);
    const textref = page.getTextReference();
    const img = page.getImageRef();
    pauseBtn.click().then(() => {
      firstbullet.click().then(() => {
        expect(textref.getText()).toEqual('There are 101 reason for th city trip.');
        expect(img.getAttribute('src')).toContain('/carousel/home1.jpg');
      });
  });
});
});
});
