import { filter } from 'lodash';
import { useEffect, useState } from 'react';

// material
import {
  Button,
  Card,
  Checkbox,
  Container,
  Grid,
  Skeleton,
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
import { ListHead, ListToolbar } from '../sections/dashboard/list';
import Iconify from './Iconify';
import Label from './Label';
import Page from './Page';
import ProxyModal from './ProxyModal';
import SearchNotFound from './SearchNotFound';
// store
import { Proxy } from '@prisma/client';
import ProxyMenu from '@sections/dashboard/list/ProxyMenu';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from 'store';
import {
  createProxy,
  deleteProxy,
  fetchProxies,
  getProxies,
  getProxyStatus,
} from 'store/proxySlice';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'host', label: 'Host' },
  { id: 'port', label: 'Port' },
  { id: 'hits', label: 'Hits', alignRight: 'center' },
  { id: 'username', label: 'Username', alignRight: 'center' },
  { id: 'password', label: 'Password', alignRight: 'center' },
  { id: 'status', label: 'status', alignRight: 'center' },
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
  const [selected, setSelected] = useState<number[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openProxyListModal, setProxyListModalStatus] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppThunkDispatch>();
  const proxyMap = useSelector(getProxies);
  const proxiesStatus = useSelector(getProxyStatus);
  const proxyListKey = router.query.id as string;
  const proxies = proxyMap[proxyListKey] ?? [];

  useEffect(() => {
    dispatch(fetchProxies({ proxyListKey }));
  }, [dispatch, proxyListKey]);

  const handleProxyListModal = () =>
    setProxyListModalStatus(!openProxyListModal);

  const handleBulkDelete = () => {
    dispatch(deleteProxy({ proxyListKey, proxyIds: selected }));
    setSelected([]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = proxies.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }

    setSelected([]);
  };

  const handleClick = (id: number) => (_event: React.ChangeEvent) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
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
    dispatch(
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
                numSelected={selected.length}
                filterName={filterName}
                bulkDeleteHandler={handleBulkDelete}
                onFilterName={handleFilterByName}
              />

              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <ListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={proxies.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
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
                        } = proxy;
                        const isItemSelected = selected.indexOf(id) !== -1;

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
                                  {host}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{port}</TableCell>
                            <TableCell align="center">{totalHits}</TableCell>
                            <TableCell align="center">
                              {username ?? '-'}
                            </TableCell>
                            <TableCell align="center">
                              {password ?? '-'}
                            </TableCell>
                            <TableCell align="center">
                              <Label
                                variant="ghost"
                                color={
                                  (status === 'INACTIVE' && 'error') ||
                                  'success'
                                }
                              >
                                {status}
                              </Label>
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
      return (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ opacity: 0.6 }}
        >
          <Stack spacing={1}>
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ width: '65vw', height: '8vh' }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ width: '65vw', height: '60vh' }}
            />
          </Stack>
        </Grid>
      );
    case 'failed':
      return <h3>Error: Proxies not found</h3>;
  }
}
