const blockMouseEvents = (
  event: MouseEvent
) => {
  event.preventDefault();
  event.stopImmediatePropagation();
  event.stopPropagation();
};

export default blockMouseEvents;
