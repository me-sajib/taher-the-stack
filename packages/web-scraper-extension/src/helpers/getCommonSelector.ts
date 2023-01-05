import {
  CommonSelections,
  ElementFootprint
} from '../interfaces/extension';
import {
  elementQueryCount,
  getPrioritySelector,
  predictQuery,
  reduceElementSelector,
  reduceQueryString
} from '../utils/scrapeHelpers';
import getExactSelector from './getExactSelector';

const getCommonSelector = (
  footprint: ElementFootprint
): CommonSelections => {
  const selectorsMap: Map<number, string> = new Map();
  let lastQuery = '';
  let ft: ElementFootprint | null = footprint;
  const checkQueryCount = predictQuery(selectorsMap, 2);

  while ((ft = ft.parent) && ft.name !== 'html') {
    const newQuery = reduceElementSelector(ft);

    lastQuery = `${newQuery}${lastQuery ? ` ${lastQuery}` : ''}`;

    checkQueryCount(lastQuery);

    // check with exact path
    const lastLimit: number = checkQueryCount(
      lastQuery.replace(/\s/g, ' > ')
    );

    if (lastLimit === 0) {
      break;
    }
  }

  const parentSuggested: string = selectorsMap.get(
    Math.min(...selectorsMap.keys())
  )!;
  const suggest: string = reduceQueryString(
    `${parentSuggested} > ${reduceElementSelector(footprint)}`
  );
  const selected = getExactSelector(footprint);

  return {
    selected,
    parentSuggested,
    prioritize: getPrioritySelector(suggest, footprint.position),
    suggest,
    count: elementQueryCount(suggest)
  };
};

export default getCommonSelector;
