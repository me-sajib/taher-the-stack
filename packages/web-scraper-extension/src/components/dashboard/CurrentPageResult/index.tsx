import { formatDistanceStrict } from 'date-fns';
import { Page } from '../../../interfaces/dashboard';
import ResultLayout from '../ResultLayout';

interface CurrentPageResultPropTypes {
  page: Page;
  date?: Date;
}

const CurrentPageResult = ({
  page,
  date
}: CurrentPageResultPropTypes) => {
  const {
    results,
    totalScraped,
    hostname,
    histories,
    createAt,
    startTime
  } = page;
  const dates = [
    ...Object.keys(histories),
    createAt
  ];

  const statuses = [
    {
      heading: String(results.length),
      status: 'rows extracted'
    },
    {
      heading: String(totalScraped),
      status: 'properties extracted'
    }
  ];

  if (startTime) {
    statuses.push(
      {
        heading: formatDistanceStrict(
          startTime,
          date?.getTime()!
        ),
        status: 'time to complete'
      },
      {
        heading: String(
          page.paginate.limit || 1
        ),
        status: 'page scraped'
      }
    );
  }

  return (
    <ResultLayout
      hostname={hostname}
      results={results}
      dates={dates}
      statuses={statuses}
    />
  );
};

export default CurrentPageResult;
