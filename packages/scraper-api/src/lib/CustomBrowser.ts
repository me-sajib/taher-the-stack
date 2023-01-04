import { PuppeteerBlocker } from '@cliqz/adblocker-puppeteer';
import { Logger } from '@nestjs/common';
import fetch from 'cross-fetch';
import proxies from 'data/proxies';
import { Proxy } from 'interfaces';
import { anonymizeProxy } from 'proxy-chain';
import type {
  Browser,
  Page,
  Protocol,
  PuppeteerLaunchOptions
} from 'puppeteer';
import puppeteer from 'puppeteer';
import puppeteerExtra from 'puppeteer-extra';
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { ConfigPageDto } from '../parse/dto';

class CustomBrowser {
  private proxy: Proxy;
  public browser: Browser;

  constructor(
    private readonly configPageDto: ConfigPageDto,
    private readonly url: string
  ) {}

  // this function will generate a valid Proxy object from proxy url
  private generateUserProxy(
    proxyUrl: string
  ): Proxy {
    if (proxyUrl) {
      const [
        username,
        password,
        host,
        port
      ] = proxyUrl
        .replace(/^\w+:\/\//, '')
        .split(/:|@/);

      return Object.assign(
        { host, port: +port },
        username &&
          password && {
            auth: { username, password }
          }
      );
    }
  }

  // it will pick a rotate proxy or users proxy, if user provide any proxy by own_proxy property
  private async getProxy() {
    const ownProxy =
      this.configPageDto?.own_proxy;

    delete this.configPageDto
      ?.own_proxy;
    return (
      this.generateUserProxy(
        ownProxy
      ) ?? (await proxies.next()).value
    );
  }

  // this function will invoke when config dto hold device prop
  async device(page: Page) {
    const iPhone =
      puppeteer.devices['iPhone 6'];
    this.configPageDto.device ===
      'mobile' &&
      (await page.emulate(iPhone));
  }

  // this function will invoke when config dto hold block_resource prop
  async blockResource(page: Page) {
    await page.setRequestInterception(
      true
    );
    const pattern = new RegExp(
      `(${this.configPageDto.block_resource
        .map(
          (ext) => String.raw`\.${ext}`
        )
        .join('|')})`
    );

    page.on('request', (request) => {
      if (pattern.test(request.url())) {
        return request.abort();
      }

      request.continue();
    });
  }

  async captcha(page: Page) {
    const { id, token } =
      this.configPageDto.captcha;

    id &&
      token &&
      (await page.solveRecaptchas());
  }

  async captchaSolve(page: Page) {
    this.configPageDto.captcha_solve ===
      true &&
      (await page.solveRecaptchas());
  }

  solveCaptchaConfig() {
    if (
      this.configPageDto?.captcha ||
      this.configPageDto
        ?.captcha_solve === true
    ) {
      puppeteerExtra.use(
        RecaptchaPlugin({
          provider: {
            id:
              this.configPageDto.captcha
                .id ??
              process.env.CAPTCHA_ID,
            token:
              this.configPageDto.captcha
                .token ??
              process.env.CAPTCHA_TOKEN
          },
          visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );
    }
  }

  async blockAds(page: Page) {
    if (
      this.configPageDto.block_ads ===
      true
    ) {
      const blocker =
        await PuppeteerBlocker.fromPrebuiltAdsAndTracking(
          fetch
        );
      await blocker.enableBlockingInPage(
        page
      );
    }
  }

  async windowWidth(page: Page) {
    return page.setViewport({
      width:
        this.configPageDto.window_width,
      height: page.viewport().height
    });
  }

  async windowHeight(page: Page) {
    return page.setViewport({
      height:
        this.configPageDto
          .window_height,
      width: page.viewport().width
    });
  }

  async cookies(page: Page) {
    const urlInfo = new URL(this.url);

    const cookieMap =
      this.configPageDto.cookies.map(
        (
          cookie: Protocol.Network.CookieParam
        ) => {
          cookie.domain ??=
            urlInfo.host;
          cookie.path ??=
            urlInfo.pathname;
          return cookie;
        }
      );

    Logger.log({ cookieMap });

    await page.setCookie(...cookieMap);
    Logger.log(
      'cookie set successfully'
    );
  }

  stealthConfig() {
    this.configPageDto?.stealth_mode ===
      true &&
      puppeteerExtra.use(
        StealthPlugin()
      );
  }

  async launch() {
    this.proxy = await this.getProxy();
    const { host, port, auth } =
      this.proxy ?? {};
    const proxyUrl =
      await anonymizeProxy(
        `http://${
          auth
            ? `${auth.username}:${auth.password}@`
            : ''
        }${host}:${port}`
      );
    const options: PuppeteerLaunchOptions =
      Object.assign(
        {
          headless: true,
          ignoreHTTPSErrors: true
        },
        host &&
          port && {
            args: [
              '--no-sandbox',
              `--proxy-server=${proxyUrl}`,
              '--disable-web-security'
            ]
          }
      );

    this.solveCaptchaConfig();
    this.stealthConfig();

    this.browser =
      await puppeteerExtra.launch(
        options
      );

    return this;
  }

  async newPage(): Promise<Page> {
    const page =
      await this.browser.newPage();

    return page;
  }
}

export default CustomBrowser;
