import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http2';
import { ExtractResponse } from 'interfaces';
import normalizeUrl from 'normalize-url';
import { Page } from 'puppeteer';
import Extraction from 'src/lib/Extraction';
import ExtraExtraction from 'src/lib/ExtraExtractions';
import snakeToCamelCase from 'src/utils/snakeToCamelCase';
import CustomBrowser from '../lib/CustomBrowser';
import Instruction from '../lib/Instruction';
import {
  ParseBodyDto,
  ParseQueryDto
} from './dto';

@Injectable()
export class ParseService {
  private result: string | Buffer;
  private page: Page;
  constructor(
    private config: ConfigService
  ) {}

  public validateAccessToken(
    accessToken: string
  ) {
    const apiKey =
      this.config.get('API_KEY');
    Logger.log({ apiKey, accessToken });
    return (
      accessToken &&
      apiKey === accessToken
    );
  }

  private filterCustomHeaders(
    headers: IncomingHttpHeaders
  ) {
    const filteredHeaders: {
      [key: string]: string;
    } = {};

    for (const key in headers) {
      console.log({ key });
      if (
        key
          .toUpperCase()
          .startsWith('ESA-')
      ) {
        filteredHeaders[
          key.replace(/^(ESA-)/i, '')
        ] = headers[key].toString();
      }
    }

    return filteredHeaders;
  }

  private async gotoUrl(
    dto: ParseQueryDto,
    bodyDto: ParseBodyDto,
    customBrowser: CustomBrowser,
    req: Request
  ): Promise<Page> {
    const { url, keep_headers } = dto;
    const browser =
      await customBrowser.launch();
    const page =
      await browser.newPage();

    if (keep_headers === 'true') {
      const customHeaders =
        this.filterCustomHeaders(
          req.headers
        );
      console.log({ customHeaders });
      await page.setExtraHTTPHeaders(
        customHeaders
      );
    }

    for (const configKey in bodyDto.config) {
      const camelCaseKey =
        snakeToCamelCase(configKey);
      typeof customBrowser[
        camelCaseKey
      ] === 'function' &&
        (await customBrowser[
          camelCaseKey
        ](page));
    }

    await page.goto(normalizeUrl(url), {
      waitUntil: 'networkidle2'
    });

    return page;
  }

  async parse(
    dto: ParseQueryDto,
    bodyDto: ParseBodyDto,
    req: Request
  ) {
    Logger.log(dto);
    const customBrowser =
      new CustomBrowser(
        bodyDto.config,
        dto.url
      );

    try {
      this.page = await this.gotoUrl(
        dto,
        bodyDto,
        customBrowser,
        req
      );

      if (dto.render === 'true') {
        this.result = await this.render(
          bodyDto
        );
      } else {
        this.result =
          await this.page.content();
      }

      return this.result;
    } catch (e) {
      Logger.error(e);
      return new HttpException(
        e.message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    } finally {
      await customBrowser.browser.close();
    }
  }

  async render(bodyDto: ParseBodyDto) {
    const instruction = new Instruction(
      this.page
    );

    for (const instructionDto of bodyDto.instructions ??
      []) {
      for (const action in instructionDto) {
        const value =
          instructionDto[action];
        const camelCaseKey =
          snakeToCamelCase(action);
        typeof instruction[
          camelCaseKey
        ] === 'function' &&
          (await instruction[
            camelCaseKey
          ](value));
      }
    }

    delete bodyDto.instructions;

    const extraction = new Extraction(
      this.page
    );
    const extractRes: ExtractResponse =
      await extraction.extract(
        bodyDto.extract
      );

    if (bodyDto.extract && extractRes) {
      this.result = JSON.stringify(
        extractRes,
        null,
        2
      );
    }

    delete bodyDto.extract;

    Logger.log('I am result', {
      result: this.result
    });

    const extraExtraction =
      new ExtraExtraction(this.page);

    for (const extraExtractionProp in bodyDto) {
      const extractMethod =
        snakeToCamelCase(
          extraExtractionProp
        );

      if (
        extractMethod in extraExtraction
      ) {
        this.result =
          await extraExtraction[
            extractMethod
          ](
            bodyDto[extraExtractionProp]
          );
      }
    }

    Logger.log('I am result', {
      result: this.result
    });

    return this.result;
  }
}
