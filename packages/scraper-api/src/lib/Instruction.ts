import { Logger } from '@nestjs/common';
import { Frame, Page } from 'puppeteer';
import {
  ClickOption,
  FillDto,
  ScrollOption
} from '../parse/dto';

type scrollHandlerParamType = {
  option: number | ScrollOption;
  axis: 'x' | 'y';
};
class Instruction {
  constructor(private page: Page) {}

  async wait(timeout: number) {
    Logger.log(
      'returned for timeout',
      timeout
    );
    await this.page.waitForTimeout(
      timeout
    );
  }

  async waitFor(selector: string) {
    Logger.log(
      'returned for selector',
      selector
    );
    return await this.page.waitForSelector(
      selector
    );
  }

  async waitForAndClick(
    option: string | ClickOption
  ) {
    const selector =
      typeof option !== 'string'
        ? option.selector
        : option;
    const exactFrame =
      await this.findExactFrame(
        selector
      );
    const elementHandler =
      await exactFrame.$(selector);

    if (typeof option === 'string') {
      await elementHandler.click();
    } else {
      await elementHandler.click(
        option
      );
    }

    await this.page.waitForNavigation({
      waitUntil: 'networkidle0'
    });
  }

  async click(
    option: string | ClickOption
  ) {
    const selector =
      typeof option !== 'string'
        ? option.selector
        : option;
    const exactFrame =
      await this.findExactFrame(
        selector
      );
    const elementHandler =
      await exactFrame.$(selector);

    if (typeof option === 'string') {
      await elementHandler.click();
    } else {
      await elementHandler.click(
        option
      );
    }

    await this.page.waitForNavigation({
      waitUntil: 'networkidle0'
    });
  }

  private async scrollHandler({
    option,
    axis
  }: scrollHandlerParamType) {
    const axisAlias = {
      x: 'left',
      y: 'top'
    };

    if (typeof option === 'object') {
      const {
        selector,
        amount,
        delay,
        behavior
      } = option;
      option.scrollCount ||= 1;
      const element =
        document.querySelector(
          selector
        ) ?? window;

      while (option.scrollCount--) {
        element.scrollBy({
          [axisAlias[axis]]: amount,
          behavior: behavior ?? 'auto'
        });

        await new Promise((resolve) =>
          setTimeout(
            resolve,
            delay ?? 300
          )
        );
      }

      return;
    }

    window.scrollBy({
      top: option as number
    });
  }

  private async findExactFrame(
    selector: string
  ) {
    Logger.log('finding exact frame');
    const isInPage = await this.page.$(
      selector
    );
    let exactFrame: Frame | Page =
      isInPage !== null && this.page;

    if (!exactFrame) {
      const frames = this.page.frames();
      Logger.log(
        'the length of frames is',
        frames.length
      );

      for (const frame of frames) {
        const elementHandler =
          await frame.$(selector);
        Logger.log(
          'selecting element handler of frame'
        );
        if (elementHandler !== null) {
          exactFrame = frame;
        }
      }
    }

    Logger.log('returned exact frame');
    return exactFrame;
  }

  async scrollX(
    option: number | ScrollOption
  ) {
    Logger.log('scroll x called');
    if (
      typeof option === 'object' &&
      option.selector
    ) {
      const exactFrame =
        await this.findExactFrame(
          option.selector
        );
      Logger.log('found frame');

      if (exactFrame) {
        return await exactFrame.evaluate(
          this.scrollHandler,
          {
            option,
            axis: 'x'
          } as scrollHandlerParamType
        );
      }
    }

    await this.page.evaluate(
      this.scrollHandler,
      { option, axis: 'x' }
    );
    Logger.log('scroll x end');
  }

  async scrollY(
    option: number | ScrollOption
  ) {
    Logger.log('scroll y called');

    if (
      typeof option === 'object' &&
      option.selector
    ) {
      const exactFrame =
        await this.findExactFrame(
          option.selector
        );

      if (exactFrame) {
        return await exactFrame.evaluate(
          this.scrollHandler,
          {
            option,
            axis: 'y'
          } as scrollHandlerParamType
        );
      }
    }

    await this.page.evaluate(
      this.scrollHandler,
      { option, axis: 'y' }
    );
    Logger.log('scroll y end');
  }

  async fill(dto: FillDto) {
    const {
      selector,
      text,
      delay = 0
    } = dto;

    await this.page.type(
      selector,
      text,
      { delay }
    );
  }

  async evaluate(script: string) {
    Logger.log('evaluating start');
    await this.page.evaluate(
      (script) => {
        try {
          return eval(script);
        } catch (e) {
          throw e;
        }
      },
      script
    );
    Logger.log('evaluating end');
  }
}

export default Instruction;
