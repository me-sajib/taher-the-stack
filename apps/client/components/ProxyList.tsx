import { filter } from 'lodash';
import { useEffect, useState } from 'react';

// material
import {
  Button,
  Card,
  Checkbox,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
// components
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from 'store';
import {
  clearProxyListError,
  getProxyList,
  getProxyListError,
  getProxyListStatus,
} from 'store/proxyListSlice';

// thunks
import {
  createProxyList,
  deleteProxyList,
  editProxyList,
  fetchProxyList,
  recheckProxyList,
} from 'store/thunks';

import useSelection from 'hooks/useSelection';
import { getUser } from 'store/userSlice';
import {
  ListHead,
  ListToolbar,
  ProxyListMenu,
} from '../sections/dashboard/list';
import CopyToolTip from './CopyToolTip';
import Iconify from './Iconify';
import LoadingListFallback from './LoadingListFallback';
import Musk from './Musk';
import Page from './Page';
import ProxyListModal from './ProxyListModal';
import RotateIcon from './RotateIcon';
import SearchNotFound from './SearchNotFound';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'username', label: 'Username', align: 'center' },
  { id: 'password', label: 'Password', align: 'center' },
  { id: 'rotatingIndex', label: 'Rotating index', align: 'center' },
  { id: 'totalProxy', label: 'Total proxy', align: 'center' },
  {},
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Index() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openProxyListModal, setProxyListModalStatus] = useState(false);
  const asyncDispatch = useDispatch<AppThunkDispatch>();
  const syncDispatch = useDispatch();
  const proxyLists = useSelector(getProxyList);
  const status = useSelector(getProxyListStatus);
  const user = useSelector(getUser);
  const proxyListErrors = useSelector(getProxyListError);

  useEffect(() => {
    if (proxyListErrors.length) {
      setProxyListModalStatus(true);
    } else {
      setProxyListModalStatus(false);
    }
  }, [proxyListErrors.length]);

  useEffect(() => {
    return () => {
      syncDispatch(clearProxyListError());
    };
  }, []);

  // custom hooks
  const { selects, clearSelection, handleClick, handleSelectAllClick } =
    useSelection<string>();

  useEffect(() => {
    asyncDispatch(fetchProxyList());
  }, [asyncDispatch]);

  const handleProxyListModal = () =>
    setProxyListModalStatus(!openProxyListModal);

  const submitProxyListHandler = async (data) => {
    syncDispatch(clearProxyListError());
    await asyncDispatch(createProxyList({ ...data, userId: user.id }));
  };

  const handleBulkDelete = () => {
    asyncDispatch(
      deleteProxyList({
        listKeys: [...selects],
      })
    );
    clearSelection();
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleBulkRecheck = () => {
    const filteredProxyList = [...selects].filter((key) => {
      const proxyList = proxyLists.find((list) => list.key === key);

      return proxyList.totalProxy !== 0 && !proxyList.checking;
    });

    asyncDispatch(recheckProxyList({ checkProxyListIds: filteredProxyList }));

    clearSelection();
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - proxyLists.length) : 0;

  const filteredProxyList = applySortFilter(
    proxyLists,
    getComparator(order, orderBy),
    filterName
  );

  const editList = filteredProxyList
    .map((list) => ({
      name: list.name,
      username: list.username,
      password: list.password,
    }))
    .slice(page * rowsPerPage, rowsPerPage + page * rowsPerPage);

  const handleBulkEdit = (changedMap: Map<number, any>) => {
    const updatedIterator = changedMap.values();
    const updatePayload = [...changedMap.keys()].map((index) => {
      const { key } = filteredProxyList.at(index + page * rowsPerPage);

      return {
        key,
        ...updatedIterator.next().value,
      };
    });
    asyncDispatch(editProxyList(updatePayload));
  };

  const isUserNotFound = filteredProxyList.length === 0;

  switch (status) {
    case 'success':
      return (
        <Page title="Proxy List">
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                Proxy List
              </Typography>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={handleProxyListModal}
              >
                New Proxy List
              </Button>
              <ProxyListModal
                actionType="Add"
                open={openProxyListModal}
                onSubmit={submitProxyListHandler}
                handleClose={handleProxyListModal}
              />
            </Stack>

            <Card>
              <ListToolbar
                editStateData={JSON.stringify(editList, null, 2)}
                placeholder={'Search proxy list...'}
                numSelected={selects.size}
                filterName={filterName}
                onFilterName={handleFilterByName}
                bulkDeleteHandler={handleBulkDelete}
                bulkRecheckHandler={handleBulkRecheck}
                bulkEditHandler={handleBulkEdit}
              />

              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <ListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={proxyLists.length}
                    numSelected={selects.size}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick(
                      proxyLists.map((list) => list.key)
                    )}
                  />
                  <TableBody>
                    {filteredProxyList
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((proxyList) => {
                        const {
                          key: id,
                          name,
                          username,
                          password,
                          rotatingIndex,
                          checking,
                          totalProxy,
                        } = proxyList;
                        const isItemSelected = selects.has(id);

                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={handleClick(id)}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                              >
                                {checking && <RotateIcon />}
                                <Link href={`/proxy-list/${username}/proxies`}>
                                  <Typography
                                    variant="subtitle2"
                                    noWrap
                                    sx={{ cursor: 'pointer' }}
                                  >
                                    {name}
                                  </Typography>
                                </Link>
                              </Stack>
                            </TableCell>
                            <TableCell align="center">
                              <CopyToolTip text={username}>
                                {username}
                              </CopyToolTip>
                            </TableCell>

                            <TableCell align="center">
                              <CopyToolTip text={password}>
                                <Musk>{password}</Musk>
                              </CopyToolTip>
                            </TableCell>

                            <TableCell align="center">
                              {rotatingIndex}
                            </TableCell>
                            <TableCell align="center">{totalProxy}</TableCell>

                            <TableCell align="right">
                              <ProxyListMenu id={id} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={proxyLists.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Container>
        </Page>
      );
    case 'loading':
      return <LoadingListFallback />;
  }
}
