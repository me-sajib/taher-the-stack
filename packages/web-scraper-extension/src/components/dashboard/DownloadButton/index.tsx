import resultDownloader from '../../../helpers/resultDownloader';
import resultToCsv from '../../../helpers/resultToCsv';
import { DownloadFormat } from '../../../interfaces/dashboard';
import { Result } from '../../../interfaces/extension';
import styles from './index.module.css';

interface DownloadButtonPropTypes {
  format: DownloadFormat;
  fileName: string;
  results: Result[];
}

const getResultByFormat = (
  format: DownloadFormat,
  results: Result[]
): string | null => {
  switch (format) {
    case 'CSV':
      return resultToCsv(results);
    case 'JSON':
      return JSON.stringify(
        results,
        null,
        2
      );
    default:
      return null;
  }
};

const DownloadButton = ({
  format,
  fileName,
  results
}: DownloadButtonPropTypes) => {
  const downloadableResult: string =
    getResultByFormat(format, results)!;

  const clickHandler = () =>
    resultDownloader(
      downloadableResult,
      `${fileName}.${format.toLowerCase()}`
    );

  return (
    <button
      className={styles.button}
      type="button"
      onClick={clickHandler}
    >{`Download ${format}`}</button>
  );
};

export default DownloadButton;
