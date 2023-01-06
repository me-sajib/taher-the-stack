import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deleteScrapeSelector,
  getScrapeSelectors,
  resetState,
  setCurrentSelector
} from '../features/scraper/scraperSlice';

const usePropWrapper = (
  uid: string,
  propInputRef?: React.RefObject<HTMLInputElement>
) => {
  const [isMouseEnter, setMouseEnter] = useState<boolean>(false);
  const scrapeSelectors = useAppSelector(getScrapeSelectors);

  const dispatch = useAppDispatch();

  const mouseEnterHandler = () => setMouseEnter(true);
  const mouseLeaveHandler = () => setMouseEnter(false);

  const deleteActionHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    dispatch(deleteScrapeSelector({ uid }));
    dispatch(resetState({}));
  };

  const propNameClickHandler = () => {
    const selector = scrapeSelectors[uid];

    propInputRef?.current!.focus();

    dispatch(
      setCurrentSelector({
        ...selector
      })
    );
  };

  return {
    isMouseEnter,
    mouseEnterHandler,
    mouseLeaveHandler,
    deleteActionHandler,
    propNameClickHandler
  };
};

export default usePropWrapper;
