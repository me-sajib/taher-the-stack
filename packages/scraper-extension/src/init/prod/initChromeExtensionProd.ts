import { EXTENSION_TAG_NAME } from '../../global';
import { $ } from '../../utils/scrapeHelpers';
import EasyScraper from '../../web-components/EasyScraper';

const initWebExtension = () => {
  if (!customElements.get(EXTENSION_TAG_NAME)) {
    customElements.define(EXTENSION_TAG_NAME, EasyScraper);
  }

  const extension: EasyScraper = document.createElement(
    EXTENSION_TAG_NAME
  );
  document.body.prepend(extension);
};

const initChromeExtensionProd = () => {
  const isRunning = $(EXTENSION_TAG_NAME, document.body);

  if (!isRunning) {
    initWebExtension();
  }
};

export default initChromeExtensionProd;
