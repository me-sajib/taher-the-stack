import { Paginate, Result, ResultSchema } from './extension';

export type DownloadFormat = 'CSV' | 'JSON';

export interface User {
  username: string;
  avatar: string;
}

export interface History {
  [updateAt: string]: Result[];
}

export interface ScrapedPageInfo {
  id?: string;
  url: string;
  paginate: Paginate;
  resultSchema: ResultSchema;
  results: Result[];
  totalScraped: number;
}

export interface Page extends ScrapedPageInfo {
  name: string;
  hostname: string;
  updateAt: string;
  createAt: string;
  histories: History;
  startTime?: number;
}

export interface Recipe {
  name: string;
  url: string;
  resultSchema: ResultSchema;
  paginate: Paginate;
  updateAt: string;
  createAt: string;
  results?: Result[];
  totalScraped?: number;
  duration?: string;
}
export interface Recipes {
  [hostname: string]: Recipe[];
}

export interface DashboardState {
  user: User | null;
  currentPage: Page;
  recipes: Recipes;
}

export interface PageFormState<SchemaType = any> {
  name: string;
  url: string;
  paginate: Paginate;
  resultSchemas: SchemaType;
}
