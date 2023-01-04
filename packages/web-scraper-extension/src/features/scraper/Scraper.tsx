import {
  useEffect,
  useRef
} from 'react';
import { useAppSelector } from '../../app/hooks';
import Button from '../../components/Button';
import PaginationConfigInput from '../../components/extension/PaginationConfigInput';
import ScrapeInput from '../../components/extension/ScrapeInput';
import SelectorButtons from '../../components/extension/SelectorButtons';
import InfiniteLoading from '../../components/loaders/InfiniteLoading';
import viewResult from '../../helpers/viewResult';
import useScraper from '../../hooks/useScraper';
import addClass from '../../utils/addClass';
import { getIsScrapping } from './scraperSlice';

const Scraper = () => {
  const {
    state,
    inputRef,
    suggest,
    scrapeSelectorList,
    togglePaginate,
    saveSelectorHandler,
    closeHandler,
    clearButtonHandler,
    propertyNameChangeHandler
  } = useScraper();
  const isScrapping = useAppSelector(
    getIsScrapping
  );

  const {
    paginate,
    currentSelector,
    scrapeSelectors
  } = state;
  const prevSaveCount = useRef<number>(
    scrapeSelectorList.length
  );

  useEffect(() => {
    prevSaveCount.current =
      scrapeSelectorList.length;
  }, [scrapeSelectorList.length]);

  if (currentSelector.totalCount) {
    inputRef.current?.focus();
  }

  return (
    <main>
      <header className={'scraper-bar'}>
        <div
          className={'selector-inputs'}
        >
          <ScrapeInput
            ref={inputRef}
            placeholder={
              'selector name'
            }
            value={currentSelector.name}
            liftValue={
              propertyNameChangeHandler
            }
          />

          <SelectorButtons
            inputRef={inputRef}
            currentSelector={
              currentSelector
            }
            scrapeSelectorList={
              scrapeSelectorList
            }
            prevSaveCount={
              prevSaveCount.current
            }
            saveSelectorHandler={
              saveSelectorHandler
            }
            clearButtonHandler={
              clearButtonHandler
            }
          />
        </div>

        <div
          className={'result-options'}
        >
          <Button
            classes={addClass(
              'result-button',
              scrapeSelectorList.length &&
                !isScrapping &&
                'result-ready'
            )}
            innerText={
              isScrapping
                ? 'SCRAPPING'
                : 'VIEW RESULTS'
            }
            clickAction={
              scrapeSelectorList.length
                ? viewResult.bind(
                    null,
                    scrapeSelectors,
                    paginate
                  )
                : () => null
            }
          >
            {isScrapping && (
              <InfiniteLoading />
            )}
          </Button>
          <Button
            classes={addClass(
              'option-button',
              paginate.active &&
                'pagination-active',
              paginate.limit &&
                !paginate.active &&
                'pagination-done'
            )}
            status={'next'}
            clickAction={togglePaginate}
          />

          {Boolean(
            paginate.limit &&
              !paginate.active
          ) && (
            <>
              <PaginationConfigInput
                type={'limit'}
                placeholder={'limit'}
                after={'total page'}
              />
              <PaginationConfigInput
                type={'delay'}
                placeholder={'delay'}
                after={'seconds'}
              />
            </>
          )}

          <Button
            classes={'option-button'}
            status={'close'}
            clickAction={closeHandler}
          />
        </div>
      </header>

      {suggest && (
        <pre
          className={
            'suggested-selector'
          }
        >
          {suggest}
        </pre>
      )}
    </main>
  );
};

export default Scraper;
