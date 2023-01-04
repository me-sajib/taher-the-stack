import generateUid from '../../../utils/generateUid';
import classes from './index.module.css';

interface ResultStatus {
  heading: string;
  status: string;
}

interface ResultStatusBarPropTypes {
  statuses: ResultStatus[];
}

const ResultStatusBar = ({
  statuses
}: ResultStatusBarPropTypes) => (
  <div className={classes.container}>
    {statuses.map(
      ({ heading, status }) => (
        <div
          key={generateUid()}
          className={
            classes.statusContainer
          }
        >
          <h4
            className={
              classes.statusHeading
            }
          >
            {heading}
          </h4>
          <p className={classes.status}>
            {status}
          </p>
        </div>
      )
    )}
  </div>
);

export default ResultStatusBar;
