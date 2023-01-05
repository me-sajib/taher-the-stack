import { DownloadFormat } from '../interfaces/dashboard';
import makePerfectId from '../utils/makePerfectId';

const EXTENSION_TAG_NAME = 'easy-web-scraper';
const SCRAPE_ATTRIBUTE_NAME: string = makePerfectId('data-selected');
const DETECTION_STYLE_ID: string = makePerfectId('ews-detection');
const DETECTOR_ATTR_NAME: string = makePerfectId('data-selected');
const BODY_HOLDER: DocumentFragment = new DocumentFragment();
const PREVIEW_STATUS: string[] = ['Table', 'JSON'];
const DOWNLOAD_FORMATS: DownloadFormat[] = ['CSV', 'JSON'];
const COLOR_PALATE: string[] = [
  '#f2ea00', // yellow
  '#ebce13', // amber
  '#f0aa14', // orange
  '#f08630', // sunset
  '#f07a60', // red
  '#ee78f0', // fuchsia
  '#bd90f0', // purple
  '#9092f0', // indigo
  '#7fbadc', // blue
  '#90f0e3', // aqua
  '#91d271', // green
  '#c5f060' // lime
];

export {
  EXTENSION_TAG_NAME,
  SCRAPE_ATTRIBUTE_NAME,
  DETECTOR_ATTR_NAME,
  DETECTION_STYLE_ID,
  PREVIEW_STATUS,
  BODY_HOLDER,
  DOWNLOAD_FORMATS,
  COLOR_PALATE
};
