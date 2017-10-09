import { browser, by, element } from 'protractor';

export class AppPage {

  notWaitForAngular() {
   return browser.waitForAngularEnabled(false);
  }
  navigateTo() {
    return browser.get('/');
  }

  getNextButton() {
    return element(by.id('next'));
  }

  getPrevButton() {
    return element(by.id('prev'));
  }

  getImageRef() {
    return element(by.id('imgcontainer'));
  }

  getBullets() {
    return element.all(by.className('dot'));
  }
  getPauseButton() {
    return element(by.className('play-pause'));
  }

  getTextReference() {
    return element(by.className('blocktext'));
  }

}
