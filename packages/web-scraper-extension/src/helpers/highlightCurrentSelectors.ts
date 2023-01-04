import { SCRAPE_ATTRIBUTE_NAME } from '../global';
import {
  ScraperState,
  Select,
  Selector
} from '../interfaces/extension';
import {
  $,
  $$
} from '../utils/scrapeHelpers';
import removeHighlightedAttr from './removeHighlightedAttr';

const highlightCurrentSelectors = ({
  currentSelector,
  paginate
}: ScraperState) => {
  removeHighlightedAttr();
  const { selectors } = currentSelector;

  let allCustomSelected: string[] = [];
  const allSuggested: string[] = [];
  let allRejected: string[] = [];

  for (const key in selectors) {
    const {
      selected,
      suggest,
      rejects,
      customSelects
    }: Selector =
      selectors[key as keyof Select];

    const selectedElement: Element =
      $(selected);
    selectedElement.setAttribute(
      SCRAPE_ATTRIBUTE_NAME,
      'selected'
    );

    if (customSelects.length) {
      allCustomSelected =
        allCustomSelected.concat(
          customSelects
        );
    } else {
      allSuggested.push(suggest);
    }
    allRejected =
      allRejected.concat(rejects);
  }

  const customSelected: Element[] = $$(
    allCustomSelected.join(',')
  );
  const suggestedElements: Element[] =
    $$(allSuggested.join(','));
  const rejectedElements: Element[] =
    $$(allRejected.join(','));
  const paginateButton: Element = $(
    paginate.selector
  );

  suggestedElements.forEach(
    (el) =>
      !el.hasAttribute(
        SCRAPE_ATTRIBUTE_NAME
      ) &&
      el.setAttribute(
        SCRAPE_ATTRIBUTE_NAME,
        'suggested'
      )
  );

  rejectedElements.forEach((el) =>
    el.setAttribute(
      SCRAPE_ATTRIBUTE_NAME,
      'rejected'
    )
  );

  customSelected.forEach((el) => {
    el.setAttribute(
      SCRAPE_ATTRIBUTE_NAME,
      'selected'
    );
  });

  paginateButton?.setAttribute(
    SCRAPE_ATTRIBUTE_NAME,
    'paginated'
  );
};

export default highlightCurrentSelectors;
