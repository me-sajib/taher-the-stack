import initDashboardDev from '../init/dev/initDashboardDev';
import { ScrapedPageInfo } from '../interfaces/dashboard';

const sendAction = async (
  scrapedInfos: ScrapedPageInfo,
  type: string
) => {
  try {
    chrome.runtime.sendMessage({
      type,
      payload: scrapedInfos
    });
  } catch {
    initDashboardDev(scrapedInfos);
  }
};

export default sendAction;
