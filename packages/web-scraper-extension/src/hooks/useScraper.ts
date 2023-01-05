import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  getCurrentSelector,
  getIsScrapping,
  getPaginate,
  getScrapeSelectors,
  resetState,
  setCurrentSelector,
  setPaginate,
  setScrapeSelector
} from '../features/scraper/scraperSlice';
import { EXTENSION_TAG_NAME } from '../global';
import { killElementDetector } from '../helpers/detectElement';
import highlightCurrentSelectors from '../helpers/highlightCurrentSelectors';
import removeHighlightedAttr from '../helpers/removeHighlightedAttr';
import { ScraperState } from '../interfaces/extension';
import generateUid from '../utils/generateUid';
import { $ } from '../utils/scrapeHelpers';

const useScraper = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const state: ScraperState = {
    isScrapping: useAppSelector(getIsScrapping),
    paginate: useAppSelector(getPaginate),
    currentSelector: useAppSelector(getCurrentSelector),
    scrapeSelectors: useAppSelector(getScrapeSelectors)
  };

  const suggest = Object.values(state.currentSelector.selectors)
    .map(({ customSelects, suggest }) =>
      customSelects.length ? customSelects : suggest
    )
    .join();
  const scrapeSelectorList = Object.values(state.scrapeSelectors);

  useEffect(() => highlightCurrentSelectors(state), [state]);

  const togglePaginate = () => {
    if (
      state.currentSelector.totalCount ||
      scrapeSelectorList.length
    ) {
      !state.paginate.limit &&
        dispatch(
          setPaginate({
            active: !state.paginate.active
          })
        );
    }
  };

  const clearButtonHandler = () => {
    dispatch(resetState({}));
  };

  const propertyNameChangeHandler = (value: string) => {
    dispatch(
      setCurrentSelector({
        name: value
      })
    );
  };

  const closeHandler = () => {
    killElementDetector();

    removeHighlightedAttr();
    $(EXTENSION_TAG_NAME, document.body)?.remove();
  };

  const saveSelectorHandler = () => {
    const { uid: prevUid, totalCount } = state.currentSelector;

    if (totalCount) {
      dispatch(
        setScrapeSelector({
          ...state.currentSelector,
          uid: prevUid || generateUid()
        })
      );

      dispatch(resetState({}));
    }
  };

  return {
    state,
    inputRef,
    suggest,
    scrapeSelectorList,
    togglePaginate,
    propertyNameChangeHandler,
    clearButtonHandler,
    saveSelectorHandler,
    closeHandler
  };
};

export default useScraper;
