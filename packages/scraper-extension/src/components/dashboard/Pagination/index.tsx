import React, { useEffect, useState, useMemo } from 'react';
import icon from '../../../icon';
import addClass from '../../../utils/addClass';
import generateUid from '../../../utils/generateUid';
import styles from './index.module.css';
import { chunk } from 'lodash';

interface PaginationTypes {
  results: unknown[];
  children: (
    results: unknown[],
    paginationIndex: number,
    resultPerPage: number
  ) => JSX.Element;
}

const Pagination = ({ results, children }: PaginationTypes) => {
  const [paginationIndex, setPaginationIndex] = useState<number>(0);
  const [resultPerPage, setresultPerPage] = useState<number>(10);

  useEffect(() => {
    setPaginationIndex(0);
  }, [resultPerPage]);

  const splitedResult = useMemo(
    () => chunk(results, resultPerPage),
    [results, resultPerPage]
  );

  const totalPages = splitedResult.length;
  const indicators = [...Array(totalPages).keys()];
  const isFirstPage = paginationIndex === 0;
  const isLastPage = paginationIndex === totalPages - 1;
  const MAX_INDEX = 4;
  let start = 0;
  let end = MAX_INDEX;

  if (paginationIndex > MAX_INDEX) {
    start = paginationIndex - MAX_INDEX;
    end = paginationIndex;
  }

  const backButtonHandler = () =>
    setPaginationIndex((prevIndex) => {
      if (!isFirstPage) {
        return prevIndex - 1;
      }

      return prevIndex;
    });

  const forwardButtonHandler = () =>
    setPaginationIndex((prevIndex) => {
      if (!isLastPage) {
        return prevIndex + 1;
      }

      return prevIndex;
    });

  const selectChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setresultPerPage(+e.target.value);
  };

  return (
    <>
      <div className={styles.resultContainer}>
        {children(
          splitedResult.at(paginationIndex) ?? splitedResult.at(0)!,
          paginationIndex,
          resultPerPage
        )}
      </div>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <button
            type="button"
            disabled={isFirstPage}
            className={styles.actionButton}
            onClick={backButtonHandler}
          >
            {icon['backOutline']}
          </button>
          <div className="pageIndicators">
            {indicators.slice(start, end + 1).map((int) => (
              <span
                key={generateUid()}
                className={addClass(
                  styles.pageIndicator,
                  int === paginationIndex && styles.activeIndicator
                )}
                onClick={() => setPaginationIndex(int)}
              >
                {int + 1}
              </span>
            ))}
          </div>
          <button
            type="button"
            disabled={isLastPage}
            className={styles.actionButton}
            onClick={forwardButtonHandler}
          >
            {icon['forwardOutline']}
          </button>
        </div>

        <div className={styles.rowsController}>
          <span>results per page: </span>
          <select
            className={styles.selectContainer}
            onChange={selectChangeHandler}
          >
            {[5, 10, 15, 20].map((option) => (
              <option
                key={generateUid()}
                value={option}
                selected={resultPerPage === option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Pagination;
