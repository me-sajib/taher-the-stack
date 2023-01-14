import { format } from 'date-fns';

const createFormatDate = () => {
  const datePattern = 'EEE dd MMM yyyy - hh:mm aa';

  return format(new Date(), datePattern);
};

export default createFormatDate;
