import { Page } from 'puppeteer';

class ExtraExtraction {
  constructor(private readonly page: Page) {}

  onlyBody() {
    return this.page.evaluate(
      () => document.querySelector('body').innerHTML
    );
  }

  onlyText() {
    return this.page.evaluate(
      () => document.querySelector('body').innerText
    );
  }

  screenshot() {
    return this.page.screenshot();
  }

  screenshotFullPage(value: boolean) {
    return this.page.screenshot({
      fullPage: value
    });
  }

  metrics(value: boolean) {
    return value && this.page.metrics();
  }

  async screenshotSelector(selector: string) {
    const elementHandler = await this.page.waitForSelector(selector);
    return elementHandler.screenshot();
  }
}

export default ExtraExtraction;
