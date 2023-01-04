import findKey from 'lodash.findkey';
import remove from 'lodash.remove';
import { store } from '../app/store';
import {
  setCurrentSelector,
  setPaginate
} from '../features/scraper/scraperSlice';
import { SCRAPE_ATTRIBUTE_NAME } from '../global';
import type {
  CommonSelections,
  ElementDetails,
  ElementFootprint,
  Select,
  Selector
} from '../interfaces/extension';
import blockMouseEvents from '../utils/blockMouseEvents';
import isExtensionTagName from '../utils/isExtensionTagName';
import {
  $,
  $$,
  elementQueryCount,
  getElementDetails,
  getElementFootprint,
  getPrioritySelector,
  predictQuery,
  reduceElementSelector
} from '../utils/scrapeHelpers';
import getCommonSelector from './getCommonSelector';

const generatePerfectSelector = (
  rejects: string[],
  selected: string,
  parentSuggest: string
): string => {
  const allElementDetails: ElementDetails[] =
    rejects
      .map((selector) => $(selector)!)
      .map((el) =>
        getElementDetails(el)
      );
  const selectedDetails: ElementDetails =
    getElementDetails($(selected));

  const sortedElements = [
    ...allElementDetails,
    selectedDetails
  ].sort(
    (a, b) => a.position - b.position
  );

  if (
    sortedElements.at(-1) ===
    selectedDetails
  ) {
    const selectorMap: Map<
      number,
      string
    > = new Map();
    const checkQueryCount =
      predictQuery(selectorMap, 3);
    let lastQuery = '';

    for (
      let i = 0;
      i < sortedElements.length - 1;
      i++
    ) {
      const cur = sortedElements[i];
      const next =
        sortedElements[i + 1];
      const curSelector: string =
        reduceElementSelector(cur);
      const nextSelector: string =
        reduceElementSelector(next);
      const diff =
        next.position - cur.position;

      const query = `${
        lastQuery
          ? `${lastQuery} ~ `
          : ''
      }${curSelector} ${
        diff === 1 ? '+' : '~'
      } ${nextSelector}`;

      checkQueryCount(query);
      lastQuery = curSelector;
    }

    const selector: string =
      selectorMap.get(
        Math.min(...selectorMap.keys())
      )!;

    return `${parentSuggest} > ${selector}`;
  }

  return '';
};

const selectionHandler = () => {
  let target: EventTarget;
  let current: Select;
  let footprint: ElementFootprint;
  let selections: CommonSelections;
  let selectorStatus: string;

  const dispatchCurrentSelector =
    () => {
      store.dispatch(
        setCurrentSelector({
          ...current,
          totalCount: Object.values(
            current.selectors
          ).reduce(
            (acc, cur) =>
              acc + cur.count,
            0
          )
        })
      );
    };

  const getSiblingPrioritizes =
    (): string[] => {
      const { selected, suggest } =
        selections;
      const { prev, next } =
        footprint.siblings;

      // TODO: (FIX ERROR) here the exact selector occurring error when one element has multiple id
      const parent: Element =
        $(selected).parentElement!;
      const siblingsPositionSet: Set<number> =
        new Set(
          $$(suggest, parent)
            .map(
              (el) =>
                getElementDetails(el)
                  .position
            )
            .filter(
              (number) =>
                number !==
                footprint.position
            )
        );

      const siblings: ElementDetails[] =
        [
          ...prev.reverse(),
          ...next
        ].filter((ed) =>
          siblingsPositionSet.has(
            ed.position
          )
        );
      const selectedElementQuery: string =
        reduceElementSelector(
          footprint
        );

      return siblings.map(
        (ed: ElementDetails) => {
          const siblingElementQuery: string =
            reduceElementSelector(ed);

          if (
            selectedElementQuery ===
            siblingElementQuery
          ) {
            return getPrioritySelector(
              suggest,
              ed.position
            );
          }

          return getPrioritySelector(
            siblingElementQuery,
            ed.position
          );
        }
      );
    };

  const onClickNonSelectedElement =
    () => {
      const {
        selected,
        parentSuggested,
        prioritize,
        suggest,
        count
      } = selections;
      const hasExistInSelectors: boolean =
        prioritize in current.selectors;

      if (hasExistInSelectors) {
        const selector: Selector =
          current.selectors[prioritize];
        selector.customSelects.push(
          selected
        );

        selector.count++;
      } else {
        const newSelector: Selector = {
          selected,
          suggested: suggest,
          parentSuggested,
          suggest,
          rejects: [],
          customSelects: [],
          siblingPrioritizes:
            getSiblingPrioritizes(),
          count
        };

        current.selectors[prioritize] =
          newSelector;
      }

      dispatchCurrentSelector();
    };

  const onClickSelectedElement = () => {
    const { selected, prioritize } =
      selections;
    const selector: Selector =
      current.selectors[prioritize];

    if (
      selected !== selector?.selected
    ) {
      remove(
        selector.customSelects,
        (curSelect) =>
          curSelect === selected
      );
      selector.count--;
    } else {
      delete current.selectors[
        prioritize
      ];
    }

    dispatchCurrentSelector();
  };

  const onClickSuggestedElement =
    () => {
      const {
        selected,
        prioritize,
        parentSuggested,
        count
      } = selections;
      const isEqualElement: boolean =
        prioritize in current.selectors;

      if (isEqualElement) {
        const selector: Selector =
          current.selectors[prioritize];

        selector.rejects.push(selected);
        selector.customSelects.push(
          selector.selected
        );
        selector.count -= count - 1;
      } else {
        const prioritizedKey: string =
          findKey(
            current.selectors,
            (curPrioritize) =>
              curPrioritize.siblingPrioritizes.includes(
                prioritize
              )
          )!;
        const selector: Selector =
          current.selectors[
            prioritizedKey
          ];

        selector.rejects.push(selected);

        const generalSiblingSuggest =
          generatePerfectSelector(
            selector.rejects,
            selector.selected,
            parentSuggested
          );
        selector.suggest =
          generalSiblingSuggest
            ? generalSiblingSuggest
            : prioritizedKey;

        selector.count =
          elementQueryCount(
            selector.suggest
          );
      }

      dispatchCurrentSelector();
    };

  const onClickRejectedElement = () => {
    const {
      selected,
      parentSuggested,
      suggest,
      prioritize,
      count
    } = selections;
    const isEqualElement: boolean =
      prioritize in current.selectors;

    if (isEqualElement) {
      const selector: Selector =
        current.selectors[prioritize];

      selector.suggest = suggest;
      selector.count -=
        selector.customSelects.length;
      selector.customSelects = [];
      selector.rejects = [];

      selector.count += count;
    } else {
      const prioritizedKey: string =
        findKey(
          current.selectors,
          (curPrioritize) =>
            curPrioritize.siblingPrioritizes.includes(
              prioritize
            )
        )!;
      const selector: Selector =
        current.selectors[
          prioritizedKey
        ];
      remove(
        selector.rejects,
        (curReject) =>
          curReject === selected
      );

      if (selector.rejects.length) {
        const generalSiblingSuggest =
          generatePerfectSelector(
            selector.rejects,
            selector.selected,
            parentSuggested
          );

        selector.suggest =
          generalSiblingSuggest
            ? generalSiblingSuggest
            : prioritizedKey;
      } else {
        selector.suggest =
          selector.suggested;
      }

      selector.count =
        elementQueryCount(
          selector.suggest
        );
    }

    dispatchCurrentSelector();
  };

  const onClickPaginatedElement =
    () => {
      store.dispatch(
        setPaginate({
          selector: '',
          limit: 0
        })
      );
    };

  const addPaginateSelector = () => {
    store.dispatch(
      setPaginate({
        selector: selections.selected,
        limit: 1,
        active: false
      })
    );
  };

  return (event: MouseEvent) => {
    blockMouseEvents(event);

    const selectedNodeName: string = (
      event.target as Element
    ).nodeName;

    if (
      !isExtensionTagName(
        selectedNodeName.toLocaleLowerCase()
      )
    ) {
      const {
        paginate,
        currentSelector
      } = structuredClone(
        store.getState().scraper
      );
      target = event.target!;
      footprint = getElementFootprint(
        target as Element
      );
      current = currentSelector;
      selections =
        getCommonSelector(footprint);
      selectorStatus = footprint.attrs[
        SCRAPE_ATTRIBUTE_NAME
      ] as string;
      const paginationMode: boolean =
        paginate.active;

      switch (
        selectorStatus?.toLocaleUpperCase()
      ) {
        case 'SELECTED':
          return (
            !paginationMode &&
            onClickSelectedElement()
          );
        case 'SUGGESTED':
          return (
            !paginationMode &&
            onClickSuggestedElement()
          );
        case 'REJECTED':
          return (
            !paginationMode &&
            onClickRejectedElement()
          );
        case 'PAGINATED':
          return onClickPaginatedElement();
        default:
          paginationMode
            ? addPaginateSelector()
            : onClickNonSelectedElement();
      }
    }
  };
};

export default selectionHandler();
