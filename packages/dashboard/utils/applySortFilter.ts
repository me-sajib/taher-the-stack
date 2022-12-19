import {
  HeadType,
  SortType
} from 'interfaces';

function descendingComparator<T>(
  a: T,
  b: T,
  orderBy: keyof T
): number {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator<T>(
  order: SortType,
  orderBy: keyof T
) {
  return order === 'desc'
    ? (a: T, b: T) =>
        descendingComparator<T>(
          a,
          b,
          orderBy
        )
    : (a: T, b: T) =>
        -descendingComparator<T>(
          a,
          b,
          orderBy
        );
}

interface FilerParams<T> {
  array: T[];
  order: SortType;
  orderBy: keyof T;
  query: string;
  tableHead: HeadType<T>[];
}

function applySortFilter<T>({
  array,
  order,
  orderBy,
  query,
  tableHead
}: FilerParams<T>) {
  const stabilizedThis: Array<
    [T, number]
  > = array.map((el, index) => [
    el,
    index
  ]);

  const comparator = getComparator(
    order,
    orderBy
  );
  stabilizedThis.sort((a, b) => {
    const order = comparator(
      a[0],
      b[0]
    );

    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  if (query) {
    const splitQuery = query.split(':');

    if (splitQuery.length == 2) {
      const [propName, queryString] =
        splitQuery;

      orderBy = tableHead.find(
        ({ label }) =>
          propName
            .trim()
            .toLowerCase() ===
          label.toLowerCase()
      )?.id;
      query = queryString.trim();
    }

    return array.filter(
      (item: T) =>
        String(
          item[orderBy] as unknown
        ).indexOf(
          query.toLowerCase()
        ) !== -1
    );
  }

  return stabilizedThis.map(
    (el) => el[0]
  );
}

export default applySortFilter;
