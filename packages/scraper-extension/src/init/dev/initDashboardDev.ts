import { BODY_HOLDER } from '../../global';
import { removeElementDetector } from '../../helpers/detectElement';
import { ScrapedPageInfo } from '../../interfaces/dashboard';
import initDashboardProd from '../prod/initDashboardProd';

const createDashboard = () => {
  const children: Element[] = [...document.body.children];

  for (const node of children) {
    BODY_HOLDER.appendChild(node);
  }

  const dashboard: HTMLDivElement = document.createElement('div');
  dashboard.id = 'root';

  document.body.appendChild(dashboard);
};

const initDashboardDev = (scrapedInfo: ScrapedPageInfo) => {
  removeElementDetector();
  createDashboard();

  initDashboardProd(scrapedInfo);
};

export default initDashboardDev;
