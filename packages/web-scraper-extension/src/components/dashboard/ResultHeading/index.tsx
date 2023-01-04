import SelectGroup from '../../SelectGroup';
import styles from './index.module.css';

interface ResultHeadingPropTypes {
  name?: string;
  dates: string[];
  hostname: string;
}

const ResultHeading = ({
  name,
  dates,
  hostname
}: ResultHeadingPropTypes) => {
  const getChangeValue = (
    value: string
  ) => {
    // TODO: Works with new selected date
  };

  return (
    <div className={styles.container}>
      {dates.length > 1 ? (
        <SelectGroup
          options={dates}
          liftValue={getChangeValue}
        />
      ) : (
        <h2
          className={styles.dateHeading}
        >
          {dates.at(0)}
        </h2>
      )}

      <p className={styles.hostname}>
        {hostname}
        {name && ` - ${name}`}
      </p>
    </div>
  );
};

export default ResultHeading;
