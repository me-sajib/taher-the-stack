import { SCRAPE_ATTRIBUTE_NAME } from '../global';
import type {
  AttrDetails,
  ElementDetails,
  ElementFootprint,
  StyleSchema
} from '../interfaces/extension';
import camelToKebabCase from './camelToKebab';
import generateUid from './generateUid';

const $ = (
  query: string,
  root: Document | Element = document
): Element =>
  (query
    ? root.querySelector(query)
    : null)!;

const $$ = (
  query: string,
  root: Document | Element = document
): Element[] => [
  ...root.querySelectorAll(
    query || null!
  )
];

const generateCSS = (
  schemas: Array<StyleSchema>,
  extraCss = ''
): HTMLStyleElement => {
  const styleTag: HTMLStyleElement =
    document.createElement('style');
  styleTag.setAttribute(
    'type',
    'text/css'
  );

  const css: string = schemas.reduce(
    (
      acc: string,
      schema: StyleSchema
    ) => {
      const { attr, selector } =
        schema!;

      const cssPropValue: string =
        Object.entries(
          schema.styles
        ).reduce(
          (style, [prop, value]) =>
            `${style}${camelToKebabCase(
              prop
            )}:${value};`,
          ''
        );

      return `${acc}${
        attr
          ? `[${attr?.name}="${attr?.value}"]`
          : `${selector}`
      }{${cssPropValue}}`;
    },
    ''
  );

  styleTag.innerText = css + extraCss;

  return styleTag;
};

const getElementIndex = (
  el: Element
): number => {
  if (el.parentElement) {
    const uniqueValue: string =
      generateUid(5);
    el.setAttribute(
      'data-selected',
      uniqueValue
    );

    const siblings: Array<Element> =
      Array.from(
        el.parentElement.children
      );

    for (const index in siblings) {
      if (
        siblings[index].getAttribute(
          'data-selected'
        ) === uniqueValue
      ) {
        el.removeAttribute(
          'data-selected'
        );
        return +index;
      }
    }
  }

  return -1;
};

const attributesFilter = (
  attrs: AttrDetails,
  attrName: string,
  attrValue: string
) => {
  type Cases = {
    [key: string]: (
      value: string
    ) => string;
  };
  const cases: Cases = {
    class: (attrValue: string) =>
      attrValue.split(/\s+/).at(0)!
  };

  const filterSet: Set<string> =
    new Set([
      'class',
      'id',
      SCRAPE_ATTRIBUTE_NAME
    ]);

  if (filterSet.has(attrName)) {
    attrs[attrName] =
      attrName in cases
        ? cases[attrName](attrValue)
        : attrValue;
  }

  return attrs;
};

const getElementDetails = (
  el: Element,
  position?: number
): ElementDetails => ({
  name: el.nodeName.toLowerCase(),
  attrs: Object.values(
    el.attributes
  ).reduce(
    (
      attributes,
      { nodeName, nodeValue }
    ) =>
      attributesFilter(
        attributes,
        nodeName,
        nodeValue!
      ),
    {} as AttrDetails
  ),
  position:
    position ?? getElementIndex(el) + 1,
  parent: null,
  ref: el
});

const getSiblingDetails = (
  el: Element,
  direction:
    | 'previousElementSibling'
    | 'nextElementSibling',
  positionFrom: number,
  parent: ElementFootprint | null = null
): Array<ElementDetails> => {
  const elements: Array<ElementDetails> =
    [];

  const incrementValue =
    direction ===
    'previousElementSibling'
      ? -1
      : 1;

  while (el[direction]) {
    el = el[direction]!;
    positionFrom =
      positionFrom + incrementValue;

    elements.push({
      ...getElementDetails(
        el,
        positionFrom
      ),
      parent
    });
  }

  return elements;
};

const getElementFootprint = (
  el: Element
): ElementFootprint => {
  const footprint: ElementFootprint = {
    ...getElementDetails(el),
    siblings: {
      next: [],
      prev: []
    },
    parent: null
  };

  if (el.parentElement) {
    footprint.parent =
      getElementFootprint(
        el.parentElement
      );

    footprint.siblings!.prev =
      getSiblingDetails(
        el,
        'previousElementSibling',
        footprint.position,
        footprint.parent
      );
    footprint.siblings!.next =
      getSiblingDetails(
        el,
        'nextElementSibling',
        footprint.position,
        footprint.parent
      );
  }

  return footprint;
};

const makeValidClass = (
  ft: ElementFootprint | ElementDetails
): string =>
  ft.attrs.class
    ? `.${ft.attrs.class}`
    : '';

const elementQueryCount = (
  query: string,
  root: Document | Element = document
) => $$(query, root)?.length ?? 0;

const getPrioritySelector = (
  suggest: string,
  position: number
): string =>
  `${suggest}:nth-child(${position})`;

const generatePerfectQuery = (
  queries: string[],
  root: Element | Document = document
) => {
  const queryMap: Map<number, string> =
    queries.reduce(
      (map, query) =>
        map.set(
          elementQueryCount(
            query,
            root
          ),
          query
        ),
      new Map()
    );

  return queryMap.values().next().value;
};

const reduceElementSelector = (
  elementDetails: ElementDetails
): string => {
  const tagName: string =
    elementDetails.name;
  const className: string =
    makeValidClass(elementDetails);

  const queries: string[] = [
    `${tagName}${className}`,
    `${className}`,
    `${tagName}`
  ];

  return generatePerfectQuery(queries);
};

const reduceQueryString = (
  query: string
) => {
  const queries: string[] = [query];
  let matched;

  while (
    (matched = / > |\s/.exec(query))
  ) {
    const patternMatched: string =
      matched.at(0)!;
    const { index, input } = matched;
    query = input
      .substring(index)
      .replace(patternMatched, '');

    queries.push(query);
  }

  return generatePerfectQuery(queries);
};

const predictQuery =
  (
    map: Map<number, string>,
    limit = Infinity
  ) =>
  (
    query: string,
    root: Element | Document = document
  ): number => {
    if (limit > 0) {
      const totalCount =
        elementQueryCount(query, root);

      if (map.has(totalCount)) {
        return --limit;
      }

      map.set(totalCount, query);
      return ++limit;
    }

    return 0;
  };

export {
  $,
  $$,
  generateCSS,
  attributesFilter,
  getElementDetails,
  getSiblingDetails,
  getElementFootprint,
  getElementIndex,
  elementQueryCount,
  predictQuery,
  getPrioritySelector,
  makeValidClass,
  generatePerfectQuery,
  reduceElementSelector,
  reduceQueryString
};
