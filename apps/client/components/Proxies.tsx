import { formatDistanceToNow } from 'date-fns';
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
  Tooltip,
  Typography,
} from '@mui/material';
// components
import { ListHead, ListToolbar } from '../sections/dashboard/list';
import Iconify from './Iconify';
import Label from './Label';
import Page from './Page';
import ProxyModal from './ProxyModal';
import SearchNotFound from './SearchNotFound';
// store
import { Proxy } from '@prisma/client';
import useSelection from 'hooks/useSelection';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import ProxyMenu from 'sections/dashboard/list/ProxyMenu';
import { AppThunkDispatch } from 'store';
import { getProxies, getProxyStatus } from 'store/proxySlice';
import {
  createProxy,
  deleteProxy,
  fetchProxies,
  recheckProxy,
} from 'store/thunks';
import CopyToolTip from './CopyToolTip';
import LoadingListFallback from './LoadingListFallback';
import Musk from './Musk';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'proxyAddress', label: 'Proxy address' },
  { id: 'port', label: 'Port' },
  { id: 'hits', label: 'Hits', align: 'center' },
  { id: 'username', label: 'Username', align: 'center' },
  { id: 'password', label: 'Password', align: 'center' },
  { id: 'status', label: 'Status', align: 'center' },
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
  const [orderBy, setOrderBy] = useState('port');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openProxyListModal, setProxyListModalStatus] = useState(false);
  const router = useRouter();
  const asyncDispatch = useDispatch<AppThunkDispatch>();
  const proxyMap = useSelector(getProxies);
  const proxiesStatus = useSelector(getProxyStatus);
  const proxyListKey = router.query.id as string;
  const proxies = proxyMap[proxyListKey] ?? [];

  // custom hooks
  const { selects, clearSelection, handleSelectAllClick, handleClick } =
    useSelection<number>();

  useEffect(() => {
    console.log('Proxies effect called');
    asyncDispatch(fetchProxies({ proxyListKey }));
  }, [asyncDispatch, proxyListKey]);

  const handleProxyListModal = () =>
    setProxyListModalStatus(!openProxyListModal);

  const handleBulkDelete = () => {
    asyncDispatch(deleteProxy({ proxyListKey, proxyIds: [...selects] }));
    clearSelection();
  };

  const handleBulkRecheck = () => {
    const check = {
      listKey: proxyListKey,
      ids: [...selects],
    };
    asyncDispatch(recheckProxy([check]));

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

  const submitProxyHandler = (data) => {
    if (+Boolean(data.username) ^ +Boolean(data.password)) {
      delete data.username;
      delete data.password;
    }

    asyncDispatch(
      createProxy({
        ...data,
        proxyListKey,
      })
    );

    handleProxyListModal();
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - proxies.length) : 0;

  const filteredProxies = applySortFilter(
    proxies,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredProxies.length === 0;

  switch (proxiesStatus) {
    case 'success':
      return (
        <Page title={router.query.name as string}>
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                {router.query.name}
              </Typography>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={handleProxyListModal}
              >
                New Proxy
              </Button>
              <ProxyModal
                actionType="Add"
                open={openProxyListModal}
                onSubmit={submitProxyHandler}
                handleClose={handleProxyListModal}
              />
            </Stack>

            <Card>
              <ListToolbar
                placeholder={'Search proxy...'}
                numSelected={selects.size}
                filterName={filterName}
                bulkDeleteHandler={handleBulkDelete}
                bulkRecheckHandler={handleBulkRecheck}
                onFilterName={handleFilterByName}
              />

              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <ListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={proxies.length}
                    numSelected={selects.size}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick(
                      proxies.map((proxy) => proxy.id)
                    )}
                  />
                  <TableBody>
                    {filteredProxies
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((proxy: Proxy) => {
                        const {
                          id,
                          host,
                          port,
                          status,
                          totalHits,
                          username,
                          password,
                          lastCheckAt,
                        } = proxy;
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
                                spacing={2}
                              >
                                <Typography variant="subtitle2" noWrap>
                                  <CopyToolTip text={host}>{host}</CopyToolTip>
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">
                              <CopyToolTip text={String(port)}>
                                {String(port)}
                              </CopyToolTip>
                            </TableCell>

                            <TableCell align="center">{totalHits}</TableCell>

                            <TableCell align="center">
                              {username ? (
                                <CopyToolTip text={username}>
                                  {username}
                                </CopyToolTip>
                              ) : (
                                '-'
                              )}
                            </TableCell>

                            <TableCell align="center">
                              {password ? (
                                <CopyToolTip text={password}>
                                  <Musk>{password}</Musk>
                                </CopyToolTip>
                              ) : (
                                '-'
                              )}
                            </TableCell>

                            <TableCell align="center">
                              <Tooltip
                                title={`Checked ${formatDistanceToNow(
                                  new Date(lastCheckAt)
                                )}`}
                                arrow
                              >
                                <span>
                                  <Label
                                    variant="ghost"
                                    color={
                                      (status === 'INACTIVE' && 'error') ||
                                      (status === 'CHECKING' && 'warning') ||
                                      'success'
                                    }
                                  >
                                    {status}
                                  </Label>
                                </span>
                              </Tooltip>
                            </TableCell>

                            <TableCell align="right">
                              <ProxyMenu id={id} />
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
                count={proxies.length}
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
