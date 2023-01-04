import { Result } from '../../../interfaces/extension';
import generateUid from '../../../utils/generateUid';
import Pagination from '../Pagination';
import styles from './index.module.css';

interface ResultPropTypes {
  results: Result[];
}

//  this function generate the tables data from the result array
const generateTableBody = (
  results: Result[],
  paginateIndex: number,
  rowsPerPage: number
) => {
  const firstResult: Result =
    results.at(0)!;
  const resultKeys: Array<
    keyof Result
  > = Object.keys(firstResult);

  return results.map(
    (result, index) => (
      <tr key={generateUid()}>
        <td
          key={generateUid()}
          className={styles.rowCount}
        >
          {rowsPerPage * paginateIndex +
            index +
            1}
        </td>
        {resultKeys.map((propName) => {
          const value =
            result[propName];
          const firstResultValue =
            firstResult[propName];

          if (
            typeof firstResultValue ===
            'object'
          ) {
            // if value not empty string
            if (value) {
              return Object.values(
                value
              ).map((eachAttrValue) => (
                <td
                  key={generateUid()}
                  className={
                    styles.data
                  }
                >
                  {eachAttrValue}
                </td>
              ));
            }

            // if the value is empty
            return new Array(
              Object.keys(
                firstResultValue
              ).length
            )
              .fill('')
              .map(() => (
                <td
                  key={generateUid()}
                  className={
                    styles.data
                  }
                ></td>
              ));
          }

          return (
            <td
              key={generateUid()}
              className={styles.data}
            >
              {value as string}
            </td>
          );
        })}
      </tr>
    )
  );
};

const ResultTablePreview = ({
  results
}: ResultPropTypes) => {
  const firstResult: Result =
    results.at(0)!;

  const propHeadings: JSX.Element[] =
    Object.entries(firstResult)
      .map(([propName, value]) => {
        if (typeof value === 'object') {
          return Object.keys(value).map(
            (postFix) => (
              <th
                key={generateUid()}
              >{`${propName}_${postFix}`}</th>
            )
          );
        }

        return (
          <th key={generateUid()}>
            {propName}
          </th>
        );
      })
      .flat();

  propHeadings.unshift(
    <th key={generateUid()}>no</th>
  );

  return (
    <Pagination results={results}>
      {(
        splitedResult,
        paginateIndex,
        rowsPerPage
      ) => (
        <table
          className={
            styles.previewTable
          }
        >
          <thead
            className={styles.headings}
          >
            <tr
              className={
                styles.propHeadings
              }
            >
              {propHeadings}
            </tr>
          </thead>
          <tbody>
            {generateTableBody(
              splitedResult as Result[],
              paginateIndex,
              rowsPerPage
            )}
          </tbody>
        </table>
      )}
    </Pagination>
  );
};

export default ResultTablePreview;
