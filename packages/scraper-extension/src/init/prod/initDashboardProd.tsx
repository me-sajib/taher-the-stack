import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';
import { store } from '../../app/store';
import Dashboard from '../../features/dashboard/Dashboard';
import { updateCurrentPage } from '../../features/dashboard/dashboardSlice';
import { ScrapedPageInfo } from '../../interfaces/dashboard';
import createFormatDate from '../../utils/createFormatDate';
import { $ } from '../../utils/scrapeHelpers';

const initDashboardProd = (scrapedInfo: ScrapedPageInfo) => {
  store.dispatch(
    updateCurrentPage({
      hostname: new URL(scrapedInfo.url).hostname,
      createAt: createFormatDate(),
      ...scrapedInfo
    })
  );

  const container = $('#root');
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Dashboard />
        </App>
      </BrowserRouter>
    </Provider>
  );
};

export default initDashboardProd;
