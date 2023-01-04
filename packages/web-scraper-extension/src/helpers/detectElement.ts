import marginTop from '../animations/marginTop';
import { DETECTION_STYLE_ID, DETECTOR_ATTR_NAME } from '../global';
import isExtensionTagName from '../utils/isExtensionTagName';
import { $ } from '../utils/scrapeHelpers';
import selectionHandler from './selectionHandler';

const onDetectElement = (element: any) => {
  if (!isExtensionTagName(element.nodeName.toLowerCase())) {
    element.setAttribute(DETECTOR_ATTR_NAME, 'detected');
  }
};

const onRemoveDetectElement = (element: any) => {
  element.removeAttribute(DETECTOR_ATTR_NAME);
};

const removeDetectElementHandler = (event: MouseEvent) => {
  const target: EventTarget = event.target!;
  onRemoveDetectElement(target);

  target.removeEventListener(
    'mouseout',
    removeDetectElementHandler as EventListenerOrEventListenerObject
  );
  target.removeEventListener(
    'click',
    selectionHandler as EventListenerOrEventListenerObject
  );
};

const detectElementHandler = (event: MouseEvent) => {
  const target: EventTarget = event.target!;

  onDetectElement(target);

  target.addEventListener(
    'mouseout',
    removeDetectElementHandler as EventListenerOrEventListenerObject
  );
  target.addEventListener(
    'click',
    selectionHandler as EventListenerOrEventListenerObject
  );
};

export function initElementDetector() {
  document.body.addEventListener('mouseover', detectElementHandler);
}

export function killElementDetector() {
  $(`#${DETECTION_STYLE_ID}`)?.remove();
  removeElementDetector();

  marginTop('body', '0');
}

export function removeElementDetector() {
  document.body.removeEventListener(
    'mouseover',
    detectElementHandler
  );
}
