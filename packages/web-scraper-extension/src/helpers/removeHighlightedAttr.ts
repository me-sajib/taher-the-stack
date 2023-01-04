import { SCRAPE_ATTRIBUTE_NAME } from '../global';
import { $$ } from '../utils/scrapeHelpers';

const removeHighlightedAttr = () => {
  const selector = `[${SCRAPE_ATTRIBUTE_NAME}]`;

  $$(selector).forEach((el: Element) =>
    el.removeAttribute(selector.replace(/\[|\]/g, ''))
  );
};

export default removeHighlightedAttr;
