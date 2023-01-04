import { store } from '../app/store';
import { toggleScrapping } from '../features/scraper/scraperSlice';
import { ScrapedPageInfo } from '../interfaces/dashboard';

import {
  Paginate,
  Result,
  ResultSchema,
  ScrapeSelectors
} from '../interfaces/extension';
import {
  makeResultSchema,
  resultScraper
} from './resultScraper';
import sendAction from './sendAction';

const viewResult = (
  scrapeSelectors: ScrapeSelectors,
  paginate: Paginate
) => {
  const resultSchema: ResultSchema =
    makeResultSchema(scrapeSelectors);
  let results: Result[],
    totalScraped: number;
  store.dispatch(toggleScrapping());

  if (paginate.limit) {
    results = [];
    totalScraped = 0;
  } else {
    results = resultScraper(
      resultSchema
    );
    totalScraped = Object.values(
      scrapeSelectors
    ).reduce(
      (total, select) =>
        total + select.totalCount,
      0
    );
  }

  const scrapedInfos: ScrapedPageInfo =
    {
      url: document.location.href,
      paginate,
      resultSchema,
      results,
      totalScraped
    };

  sendAction(
    scrapedInfos,
    'VIEW_RESULT'
  );
};

export default viewResult;
