import {
  $,
  elementQueryCount,
  getElementIndex
} from '../utils/scrapeHelpers';

const getSiblingSelector = (
  parent: Element,
  selector: string,
  position: number,
  prevSiblingSelector?: string
): string => {
  const generalQuery = `${
    prevSiblingSelector ?? selector
  } ~ ${selector}`;
  const adjacentQuery = `${
    prevSiblingSelector ?? selector
  } + ${selector}`;

  const generalQueryCount: number =
    elementQueryCount(
      generalQuery,
      parent
    );
  const foundElementPosition = (
    query: string
  ) => {
    const foundElement: Element = $(
      query,
      parent
    )!;
    return (
      getElementIndex(foundElement) + 1
    );
  };

  if (
    generalQueryCount === 1 &&
    foundElementPosition(
      generalQuery
    ) === position
  ) {
    return generalQuery;
  }

  const adjacentQueryCount: number =
    elementQueryCount(
      adjacentQuery,
      parent
    );
  if (
    adjacentQueryCount === 1 &&
    foundElementPosition(
      adjacentQuery
    ) === position
  ) {
    return adjacentQuery;
  }

  return `:nth-child(${position})`;
};

export default getSiblingSelector;
