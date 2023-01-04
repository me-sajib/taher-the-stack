import { Result } from '../../../interfaces/extension';
import ResultJSONPreview from '../ResultJSONPreview';
import ResultTablePreview from '../ResultTablePreview';

interface ResultPreviewPropTypes {
  mode: string;
  results: Result[];
}

const PickResultPreview = ({
  mode,
  results
}: ResultPreviewPropTypes) => {
  switch (mode.toUpperCase()) {
    case 'TABLE':
      return (
        <ResultTablePreview
          results={results}
        />
      );
    case 'JSON':
      return (
        <ResultJSONPreview
          results={results}
        />
      );
    default:
      return (
        <p className="result-!found">
          Status not valid
        </p>
      );
  }
};

export default PickResultPreview;
