import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Result } from '../../../interfaces/extension';
import Pagination from '../Pagination';

interface ResultPropTypes {
  results: Result[];
}

const ResultJSONPreview = ({ results }: ResultPropTypes) => (
  <Pagination results={results}>
    {(slicedResult) => (
      <SyntaxHighlighter
        language="JSON"
        style={a11yLight}
        customStyle={{
          fontSize: '14px'
        }}
        showLineNumbers={true}
      >
        {JSON.stringify(slicedResult, null, 2)}
      </SyntaxHighlighter>
    )}
  </Pagination>
);

export default ResultJSONPreview;
