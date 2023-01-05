import flatten from 'flat';
import { parse } from 'json2csv';
import mapKeys from 'lodash.mapkeys';
import { Result } from '../interfaces/extension';

const resultToCsv = (results: Result[]): string =>
  parse(
    results.map((result) =>
      mapKeys(
        flatten(result) as Result, // flat the result object
        (_, key: string) => key.replace('.', '_') // replace the dot notation to underscore
      )
    )
  );

export default resultToCsv;
