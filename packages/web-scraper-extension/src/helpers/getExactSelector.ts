import {
  ElementDetails,
  ElementFootprint
} from '../interfaces/extension';
import makeSafeId from '../utils/makeSafeId';
import {
  elementQueryCount,
  reduceElementSelector
} from '../utils/scrapeHelpers';

const hasId = (
  element: ElementDetails
): boolean => Boolean(element.attrs.id);

const getSafeId = (
  element: ElementDetails
): string =>
  makeSafeId(`#${element.attrs.id}`);

const isAllDifferentTag = (
  element: ElementFootprint
) => {
  const { prev, next } =
    element.siblings;
  const totalSiblings =
    prev.length + next.length + 1;
  const tagNames: string[] = [
    ...prev,
    element,
    ...next
  ].map((el) => el.name);

  if (
    new Set(tagNames).size ===
    totalSiblings
  ) {
    return true;
  }

  return false;
};

const getPerfectSelection = (
  ft: ElementFootprint
) => {
  if (isAllDifferentTag(ft)) {
    return ft.name;
  }

  const { prev, next } = ft.siblings;
  const siblings: ElementDetails[] = [
    ...prev,
    ...next
  ];
  const elementSelector: string =
    reduceElementSelector(ft);

  const hasSameElement: boolean =
    siblings.some(
      (el) =>
        reduceElementSelector(el) ===
        elementSelector
    );

  if (hasSameElement) {
    return `${elementSelector}:nth-child(${ft.position})`;
  }

  return elementSelector;
};

const attachSelector = (
  selector: string
) => (selector ? ` > ${selector}` : '');

const getExactSelector = (
  footprint: ElementFootprint
): string => {
  let selector = '';
  let ft: ElementFootprint | null =
    footprint;

  do {
    if (hasId(ft)) {
      return `${getSafeId(
        ft
      )}${attachSelector(selector)}`;
    }

    selector = `${getPerfectSelection(
      ft
    )}${attachSelector(selector)}`;
  } while (
    (ft = ft.parent) &&
    elementQueryCount(selector) !== 1
  );

  return selector;
};

export default getExactSelector;
