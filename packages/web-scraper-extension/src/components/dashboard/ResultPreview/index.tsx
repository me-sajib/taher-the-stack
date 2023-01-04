import {
  Children,
  useState
} from 'react';
import { PREVIEW_STATUS } from '../../../global';
import { Result } from '../../../interfaces/extension';
import addClass from '../../../utils/addClass';
import wordAt from '../../../utils/wordAt';
import PickResultPreview from '../PickResultPreview';
import styles from './index.module.css';

interface ResultPreviewPropTypes {
  results: Result[];
}

const ResultPreview = ({
  results
}: ResultPreviewPropTypes) => {
  const [previewMode, setPreview] =
    useState<string>(
      PREVIEW_STATUS.at(0)!
    );

  const togglePreview = (
    e: React.MouseEvent<
      HTMLHeadingElement,
      MouseEvent
    >
  ) => {
    const { innerText } =
      e.target as HTMLElement;

    setPreview(wordAt(innerText));
  };

  return (
    <div className={styles.container}>
      <div className={styles.modes}>
        {Children.map(
          PREVIEW_STATUS,
          (mode: string) => (
            <h4
              className={addClass(
                styles.mode,
                mode === previewMode &&
                  styles.active
              )}
              onClick={togglePreview}
            >
              {`${mode} preview`}
            </h4>
          )
        )}
      </div>

      <PickResultPreview
        mode={previewMode}
        results={results}
      />
    </div>
  );
};

export default ResultPreview;
