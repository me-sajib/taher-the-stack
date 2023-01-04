export interface StyleSchema {
  attr?: {
    name: string;
    value: string;
  };
  selector?: string;
  styles: {
    [key: string]: string;
  };
}

export interface StyleSheet {
  [key: string]: Array<StyleSchema>;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface Selector {
  selected: string;
  suggested: string;
  parentSuggested: string;
  suggest: string;
  rejects: string[];
  customSelects: string[];
  siblingPrioritizes: string[];
  count: number;
}

export interface Select {
  name: string;
  uid: string;
  selectors: {
    [prioritized: string]: Selector;
  };
  color: HSL;
  totalCount: number;
}

export interface ScrapeSelectors {
  [uid: string]: Select;
}

export interface Paginate {
  selector: string;
  limit: number;
  delay: number;
  active: boolean;
}
export interface ScraperState {
  isScrapping: boolean;
  paginate: Paginate;
  currentSelector: Select;
  scrapeSelectors: ScrapeSelectors;
}

export interface AttrDetails {
  [attrName: string]: string;
}

export interface ElementDetails {
  name: string;
  attrs: AttrDetails;
  position: number;
  parent: ElementFootprint | null;
  ref: Element;
}

export interface ElementFootprint
  extends ElementDetails {
  siblings: {
    prev: Array<ElementDetails>;
    next: Array<ElementDetails>;
  };
}

export interface CommonSelections {
  selected: string;
  parentSuggested: string;
  suggest: string;
  prioritize: string;
  count: number;
}

export interface Schema {
  suggest: string[];
  customSelector: string[];
}

export interface ResultSchema {
  [propertyName: string]: string[];
}

export interface MultiResult {
  text: string;
  link: string;
  src: string;
}

export interface Result {
  [propertyName: keyof ResultSchema]:
    | string
    | MultiResult;
}
