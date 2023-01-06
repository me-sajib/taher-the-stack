import {
  HeadType,
  SortType
} from 'packages/proxy-dashboard/interfaces';
import { applySortFilter } from 'packages/proxy-dashboard/utils';
import { useState } from 'react';

const useSortFilter = <T>(items: T[], tableHead: HeadType<T>[]) => {
  const [order, setOrder] = useState<SortType>('asc');
  const [orderBy, setOrderBy] = useState<keyof T>(tableHead.at(0).id);
  const [query, setfilterSearch] = useState('');

  const handleRequestSort = (property: keyof T) => () => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterBySearch = (query: string) => {
    setfilterSearch(query);
  };

  const filteredAndSortItems: T[] = applySortFilter({
    array: items,
    order,
    orderBy,
    query,
    tableHead
  });

  return {
    items: filteredAndSortItems,
    query,
    order,
    orderBy,
    handleRequestSort,
    handleFilterBySearch
  };
};

export default useSortFilter;
