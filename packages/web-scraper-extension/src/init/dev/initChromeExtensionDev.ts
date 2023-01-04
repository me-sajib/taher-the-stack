import { EXTENSION_TAG_NAME } from '../../global';
import { $ } from '../../utils/scrapeHelpers';
import EasyScraper from '../../web-components/EasyScraper';

const initChromeExtensionDev = (selector: string) => {
  const container: Element = $(selector);

  if (!customElements.get(EXTENSION_TAG_NAME)) {
    customElements.define(EXTENSION_TAG_NAME, EasyScraper);
    const extension: EasyScraper = document.createElement(
      EXTENSION_TAG_NAME
    );
    container.appendChild(extension);
  }
};

export default initChromeExtensionDev;
