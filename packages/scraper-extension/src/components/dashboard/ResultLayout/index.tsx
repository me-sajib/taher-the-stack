import { Children } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DOWNLOAD_FORMATS } from '../../../global';
import { Result } from '../../../interfaces/extension';
import BackButton from '../BackButton';
import Divider from '../Divider';
import DownloadButton from '../DownloadButton';
import ResultHeading from '../ResultHeading';
import ResultPreview from '../ResultPreview';
import ResultStatusBar from '../ResultStatusBar';
import classes from './index.module.css';

interface ResultLayoutPropTypes {
  name?: string;
  hostname: string;
  dates: string[];
  statuses: Array<{
    heading: string;
    status: string;
  }>;
  results: Result[];
}

const ResultLayout = ({
  hostname,
  name,
  dates,
  statuses,
  results
}: ResultLayoutPropTypes) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const toBack = () => navigate(`/my-recipe/${hostname}/${id}/edit`);

  return (
    <div className={classes.container}>
      <ResultHeading name={name} hostname={hostname} dates={dates} />
      <Divider />
      <ResultStatusBar statuses={statuses} />
      <Divider />
      <ResultPreview results={results} />
      <Divider />

      <div className={classes.downloadButtons}>
        {Children.map(DOWNLOAD_FORMATS, (format) => (
          <DownloadButton
            format={format}
            fileName={`${name || hostname}-data`}
            results={results}
          />
        ))}
      </div>

      {name && (
        <BackButton
          classes={classes.backToEditPage}
          clickAction={toBack}
        />
      )}
    </div>
  );
};

export default ResultLayout;
