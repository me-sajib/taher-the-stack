/* eslint-disable no-sequences */
import type {
  MultiResult,
  Result,
  ResultSchema,
  ScrapeSelectors,
  Select,
  Selector
} from '../interfaces/extension';
import generatePerfectKey from '../utils/generatePerfectKey';
import { $$ } from '../utils/scrapeHelpers';

// This function will create a result schema based on the property name
const makeResultSchema = (
  scrapeSelectors: ScrapeSelectors
): ResultSchema => {
  const resultSchema: ResultSchema = {};

  for (const uid in scrapeSelectors) {
    const { name, selectors }: Select =
      scrapeSelectors[uid];
    const suggestSelectors: string[] =
      [];

    for (const key in selectors) {
      const selector: Selector =
        selectors[key];

      if (
        selector.customSelects.length
      ) {
        suggestSelectors.push(
          ...selector.customSelects
        );
      } else {
        suggestSelectors.push(
          selector.suggest
        );
      }
    }

    // if the property name already exist in result schema
    if (name in resultSchema) {
      resultSchema[
        generatePerfectKey<ResultSchema>(
          resultSchema,
          name
        )
      ] = suggestSelectors;
    } else {
      resultSchema[name] =
        suggestSelectors;
    }
  }

  return resultSchema;
};

// This function scrape elements data and return an object or string
const scrapeElement = (
  element: Element
): string | MultiResult => {
  if (!element) {
    return '';
  }

  const data: MultiResult = {
    text:
      element instanceof HTMLElement
        ? element.innerText
        : '',
    link:
      element instanceof
      HTMLAnchorElement
        ? element.href
        : '',
    src:
      element instanceof
      HTMLImageElement
        ? element.src
        : ''
  };
  const dataValues =
    Object.values(data);
  const isMultiValue: boolean =
    dataValues.filter(Boolean).length >
    1;

  if (isMultiValue) {
    // filtering the empty result
    return Object.entries(data).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc[
            key as keyof MultiResult
          ] = value;
        }
        return acc;
      },
      {} as MultiResult
    );
  }

  return (
    dataValues.find(Boolean)! ?? ''
  );
};

const resultScraper = (
  resultSchema: ResultSchema
): Result[] => {
  const resultElements: Map<
    string,
    Element[]
  > = Object.entries(
    resultSchema
  ).reduce(
    (
      map,
      [propertyName, suggestSelector]
    ) => {
      if (suggestSelector.length > 1) {
        suggestSelector.forEach(
          (selector, index) => {
            map.set(
              `${propertyName}_COLLECTION-${
                index + 1
              }`,
              $$(selector).reverse()
            );
          }
        );

        return map;
      }
      return map.set(
        propertyName,
        $$(
          suggestSelector.at(0)!
        ).reverse()
      );
    },
    new Map()
  );
  const results: Result[] = [];

  // this function will check is any element exist in the element Map or not
  const isEmptyElements = (): boolean =>
    [...resultElements.values()].some(
      (elements: Element[]) =>
        elements.length
    );

  while (isEmptyElements()) {
    // generate the result scuff holder
    const result: Result = {};

    for (const [
      propertyName,
      elements
    ] of resultElements) {
      result[propertyName] =
        scrapeElement(elements.pop()!);
    }

    results.push(result);
  }

  return results;
};

export {
  makeResultSchema,
  resultScraper
};
