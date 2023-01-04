import '@webcomponents/custom-elements';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import marginTop from '../animations/marginTop';
import App from '../App';
import { store } from '../app/store';
import stylesJss from '../extensionStyle';
import Scraper from '../features/scraper/Scraper';
import { DETECTION_STYLE_ID } from '../global';
import colorPalate from '../helpers/colorPalate';
import { initElementDetector } from '../helpers/detectElement';
import generateDetectionTheme from '../helpers/generateDetectionTheme';
import { generateCSS } from '../utils/scrapeHelpers';

class EasyScraper extends HTMLElement {
  constructor() {
    super();

    const closedShadow: ShadowRoot =
      this.attachShadow({
        mode: 'closed'
      });
    const root = createRoot(
      closedShadow
    );
    const extensionStyles: HTMLStyleElement =
      generateCSS(stylesJss);

    const externalStyles: HTMLStyleElement =
      Object.assign(
        generateCSS(
          generateDetectionTheme(
            colorPalate.current
          )
        ),
        {
          id: DETECTION_STYLE_ID,
          type: 'text/css'
        }
      );

    document.head.appendChild(
      externalStyles
    );
    closedShadow.appendChild(
      extensionStyles
    );

    marginTop('body', '80px', () =>
      root.render(
        <Provider store={store}>
          <App>
            <Scraper />
          </App>
        </Provider>
      )
    );

    initElementDetector();
  }
}

export default EasyScraper;
