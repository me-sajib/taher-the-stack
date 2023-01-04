import { ExtractResponse } from 'interfaces';
import { Page } from 'puppeteer';
import { ExtractionDto, ExtractOption } from 'src/parse/dto/';

class Extraction {
  constructor(private page: Page) {}

  private clean(str: string) {
    return str
      .trim()
      .replace(/\n+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .replace(/\t+/g, ' ');
  }

  private cleaner(results: ExtractResponse) {
    for (const key in results) {
      const result = results[key];

      if (typeof result === 'string') {
        results[key] = this.clean(result);
      }

      if (Array.isArray(result)) {
        results[key] = result.map((eachResult) =>
          this.cleaner(eachResult)
        );
      }

      if (typeof result === 'object') {
        for (const key in result) {
          const value = result[key];

          if (typeof value !== 'string') {
            result[key] = this.cleaner(value as ExtractResponse);
          } else {
            result[key] = this.clean(value);
          }
        }
      }
    }

    return results;
  }

  private documentScraper(dto: ExtractionDto): ExtractResponse {
    const scrapeOption = (dto: string | ExtractOption): any => {
      let parent: Document | Element = document;
      console.log('dto', { dto });
      if (
        typeof dto !== 'string' &&
        dto.output &&
        typeof dto.output !== 'string' &&
        dto.selector
      ) {
        parent =
          document.querySelector<Element>(dto.selector) ?? document;
      }

      if (typeof dto === 'string') {
        return (parent.querySelector(dto) as HTMLElement).innerText;
      }

      function extractHandler(element: Element, output: string) {
        console.log('extractHandler', {
          element,
          output
        });
        if (output.startsWith('@')) {
          return element.getAttribute(output.substring(1));
        }

        const tableToArray = (table: HTMLTableElement) => {
          if (table instanceof HTMLTableElement) {
            return table.innerText
              .split(/\n/)
              .map((str) => str.split(/\t/));
          }

          return [];
        };

        switch (output.toLowerCase()) {
          case 'html':
            return element.outerHTML;
          case 'table_array':
            return tableToArray(element as HTMLTableElement);
          case 'table_json': {
            const [head, ...bodies] = tableToArray(
              element as HTMLTableElement
            );

            return bodies.map((body) => {
              return body.reduce(
                (acc, cur, index) => ((acc[head[index]] = cur), acc),
                {}
              );
            });
          }
          case 'text':
            return (element as HTMLElement).innerText;
        }
      }

      if (dto.output && typeof dto.output === 'object') {
        try {
          console.log('nested scraper started');
          const results: Array<ExtractResponse> = [];
          let totalNulls = 0;
          const props = Object.keys(dto.output);

          while (true) {
            const result = props.reduce((acc, prop) => {
              const options: ExtractOption | string =
                dto.output[prop];
              const el = parent?.querySelector(
                typeof options !== 'string'
                  ? options.selector
                  : options
              );

              if (!el) {
                totalNulls++;
                acc[prop] = '';
                return acc;
              }

              if (
                typeof options === 'object' &&
                typeof options.output !== 'string'
              ) {
                acc[prop] = mainScraper(
                  options.output as ExtractionDto
                );
              } else {
                acc[prop] = extractHandler(
                  el,
                  typeof options === 'object'
                    ? (options.output as string)
                    : 'text'
                );
              }

              return acc;
            }, {});

            if (dto.type === 'list') {
              if (totalNulls !== props.length) results.push(result);
              else break;
            } else {
              return result;
            }

            totalNulls = 0;
            if (parent instanceof Element) {
              parent?.remove();
              parent = document.querySelector(dto.selector);
            }
          }

          return results;
        } catch (e) {
          console.log(e);
        }
      }

      if (dto.type === 'list') {
        return [...parent.querySelectorAll(dto.selector)].map((el) =>
          extractHandler(el, (dto.output as string) ?? 'text')
        );
      }

      const element = parent.querySelector(dto.selector);

      return (
        element &&
        extractHandler(element, (dto.output as string) ?? 'text')
      );
    };

    const mainScraper = (
      dto: ExtractionDto,
      extractResponse: ExtractResponse = {}
    ): ExtractResponse => {
      for (const key in dto) {
        const scraped = scrapeOption(dto[key]);
        extractResponse[key] = scraped;
      }

      return extractResponse;
    };

    return mainScraper(dto);
  }

  async extract(
    extractDto: string | ExtractionDto
  ): Promise<ExtractResponse> {
    try {
      let extractData = await this.page.evaluate(
        this.documentScraper,
        extractDto
      );

      if (typeof extractDto !== 'string' && extractDto.clean) {
        extractData = this.cleaner(extractData);
      }

      return extractData;
    } catch {
      return null;
    }
  }
}

export default Extraction;
