import { screen } from '@testing-library/react';
import type {
  AttrDetails,
  ElementDetails
} from '../../interfaces/extension';
import {
  $,
  $$,
  attributesFilter,
  elementQueryCount,
  getElementDetails,
  getElementIndex,
  getSiblingDetails,
  makeValidClass,
  reduceElementSelector
} from '../scrapeHelpers';

describe('Testing DOM related functions via jest-dom', () => {
  document.body.innerHTML = `
    <div class="parent root" id="root-id" data-testid="root">
      <span class="child" data-testid="child-1">child 1</span>
      <span class="child" data-testid="child-2">child 2</span>
      <span class="child" data-testid="child-3">child 3</span>
    </div>

    <div class="roots-sibling"></div>
    <article class="articles roots-sibling" data-testid="articles"></article>
    <pre>i am pre tag</pre>
  `;
  const rootElement: Element = screen.getByTestId('root');
  const child_1: Element = screen.getByTestId('child-1');
  const child_2: Element = screen.getByTestId('child-2');
  const child_3: Element = screen.getByTestId('child-3');
  const articles: Element = screen.getByTestId('articles');
  const preTag: Element = screen.getByText('i am pre tag');

  it('Unit test of the $ function', () => {
    expect($('.root')).toBe(rootElement);
    expect($('#root-id')).toBe(rootElement);
    expect($('.not-exist-selector')).toBe(null);
  });

  it('Unit test of the $$ function', () => {
    expect($$('.root')).toEqual([rootElement]);
    expect($$('.child')).toEqual([child_1, child_2, child_3]);
    expect($$('.not-exist-selector')).toEqual([]);
  });

  it('Unit test of the getElementIndex function', () => {
    expect(getElementIndex(child_1)).toBe(0);
    expect(getElementIndex(child_2)).toBe(1);
    expect(getElementIndex(child_3)).toBe(2);
  });

  it('Unit test of the attributeFilter function', () => {
    const attrs: AttrDetails = {
      class: 'first second third',
      id: 'uniqueId',
      href: 'https://www.google.com',
      src: './src/image.png',
      'data-custom': 'custom-value'
    };

    const result: AttrDetails = {};

    for (const key in attrs) {
      attributesFilter(result, key, attrs[key]);
    }

    expect(result).toEqual({
      class: 'first',
      id: 'uniqueId'
    });
  });

  it('Integration test of the elementQueryCount function', () => {
    expect(elementQueryCount('.root')).toBe(1);
    expect(elementQueryCount('.child')).toBe(3);
    expect(elementQueryCount('.invalid-selector')).toBe(0);
  });

  it('Integration test of the getElementDetails function', () => {
    expect(getElementDetails(rootElement)).toEqual({
      name: 'div',
      attrs: {
        class: 'parent',
        id: 'root-id'
      },
      position: 1,
      parent: null,
      ref: rootElement
    });
  });

  it('Integration test of the makeValidClass function', () => {
    const preElementDetails: ElementDetails =
      getElementDetails(preTag);
    const rootDetails: ElementDetails =
      getElementDetails(rootElement);

    expect(makeValidClass(rootDetails)).toBe('.parent');
    expect(makeValidClass(preElementDetails)).toBe('');
  });

  it('Integration test of the getSiblingDetails function', () => {
    const nextSiblingDetails: Array<ElementDetails> =
      getSiblingDetails(child_1, 'nextElementSibling', 1);
    const prevSiblingDetails: Array<ElementDetails> =
      getSiblingDetails(child_3, 'previousElementSibling', 3);

    expect(nextSiblingDetails).toEqual([
      getElementDetails(child_2),
      getElementDetails(child_3)
    ]);

    expect(prevSiblingDetails).toEqual([
      getElementDetails(child_2),
      getElementDetails(child_1)
    ]);
  });

  it('Integration test of the reduceElementSelector function', () => {
    const rootDetails: ElementDetails =
      getElementDetails(rootElement);
    const childDetails: ElementDetails = getElementDetails(child_1);
    const article: ElementDetails = getElementDetails(articles);

    expect(reduceElementSelector(rootDetails)).toBe('.parent');
    expect(reduceElementSelector(childDetails)).toBe('span');
    expect(reduceElementSelector(article)).toBe('article');
  });
});
