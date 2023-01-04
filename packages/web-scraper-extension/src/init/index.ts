import { store } from '../app/store';
import { toggleScrapping } from '../features/scraper/scraperSlice';
import initChromeExtensionDev from './dev/initChromeExtensionDev';
import initChromeExtensionProd from './prod/initChromeExtensionProd';
import initDashboardProd from './prod/initDashboardProd';

function init() {
  try {
    chrome.runtime.onMessage.addListener(
      (
        { type, payload },
        _,
        sendResponse
      ) => {
        switch (type) {
          case 'RUN-EASY-SCRAPER':
            initChromeExtensionProd();
            return sendResponse(
              'Easy web scraper extension launched 🚀'
            );
          case 'SCRAPE_COMPLETE':
            store.dispatch(
              toggleScrapping()
            );
            return sendResponse(
              'SCRAPE DONE ✅'
            );
          case 'OPEN_DASHBOARD':
            initDashboardProd(payload);
            return sendResponse(
              'Easy web scraper dashboard launched 🚀'
            );
          default:
            return sendResponse(
              'Something went wrong :('
            );
        }
      }
    );
  } catch {
    initChromeExtensionDev('#root');
  }
}

export default init;
