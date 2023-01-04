import { BODY_HOLDER } from '../global';

const restoreElements = () => {
  const allChild: Element[] = [
    ...document.body.children
  ];

  while (allChild.length) {
    allChild.pop()?.remove(); // remove the all dashboard elements
  }

  document.body.appendChild(
    BODY_HOLDER
  ); // add the previous elements from the global fragment
};

export default restoreElements;
