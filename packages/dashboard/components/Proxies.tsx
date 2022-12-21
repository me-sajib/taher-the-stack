import { formatDistanceToNow } from 'date-fns';
import React, {
  useEffect,
  useState
} from 'react';

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
  Typography
} from '@mui/material';
// components
import {
  ListHead,
  ListToolbar
} from 'packages/dashboard/sections/dashboard/list';
import Iconify from './Iconify';
import Label from './Label';
import Page from './Page';
import ProxyModal from './ProxyModal';
import SearchNotFound from './SearchNotFound';
// store
import { Proxy } from '@prisma/client';
import { useRouter } from 'next/router';
import useSelection from 'packages/dashboard/hooks/useSelection';
import useSortFilter from 'packages/dashboard/hooks/useSortFilter';
import { HeadType } from 'packages/dashboard/interfaces';
import ProxyMenu from 'packages/dashboard/sections/dashboard/list/ProxyMenu';
import { AppThunkDispatch } from 'packages/dashboard/store';
import {
  getList,
  getProxies,
  getProxyStatus
} from 'packages/dashboard/store/proxySlice';
import {
  createProxy,
  deleteProxy,
  editProxy,
  fetchProxies,
  recheckProxy
} from 'packages/dashboard/store/thunks';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import CopyToolTip from './CopyToolTip';
import LoadingListFallback from './LoadingListFallback';
import Musk from './Musk';

// ----------------------------------------------------------------------

const TABLE_HEAD: Array<
  HeadType<Proxy>
> = [
  {
    id: 'host',
    label: 'Proxy address'
  },
  { id: 'port', label: 'Port' },
  {
    id: 'totalHits',
    label: 'Hits',
    align: 'center'
  },
  {
    id: 'username',
    label: 'Username',
    align: 'center'
  },
  {
    id: 'password',
    label: 'Password',
    align: 'center'
  },
  {
    id: 'status',
    label: 'Status',
    align: 'center'
  }
];

export default function Index() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] =
    useState(5);
  const [
    openProxyListModal,
    setProxyListModalStatus
  ] = useState(false);
  const router = useRouter();
  const asyncDispatch =
    useDispatch<AppThunkDispatch>();
  const proxies =
    useSelector(getProxies) ?? [];
  const proxiesStatus = useSelector(
    getProxyStatus
  );
  const proxyList =
    useSelector(getList);
  const {
    items: sortFilterProxies,
    orderBy,
    order,
    query,
    handleRequestSort,
    handleFilterBySearch
  } = useSortFilter<Proxy>(
    proxies,
    TABLE_HEAD
  );

  const proxyListUsername = router.query
    .username as string;

  // custom hooks
  const {
    selects,
    clearSelection,
    handleSelectAllClick,
    handleClick
  } = useSelection<number>();

  useEffect(() => {
    proxyListUsername &&
      asyncDispatch(
        fetchProxies({
          proxyListUsername
        })
      );
  }, [
    asyncDispatch,
    proxyListUsername
  ]);

  const handleProxyListModal = () =>
    setProxyListModalStatus(
      !openProxyListModal
    );

  const handleBulkDelete = () => {
    asyncDispatch(
      deleteProxy({
        proxyListKey: proxyList.key,
        proxyIds: [...selects]
      })
    );
    clearSelection();
  };

  const handleBulkRecheck = () => {
    // if the proxy all ready in checking status, it will filtered it
    const filteredSelectsByStatus = [
      ...selects
    ].filter((id) => {
      const proxy = proxies.find(
        (proxy) => proxy.id === id
      );

      return (
        proxy.status !== 'CHECKING'
      );
    });

    asyncDispatch(
      recheckProxy(
        filteredSelectsByStatus
      )
    );

    clearSelection();
  };

  const handleChangePage = (
    _event,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(
      parseInt(event.target.value, 10)
    );
    setPage(0);
  };

  const submitProxyHandler = (data) => {
    if (
      +Boolean(data.username) ^
      +Boolean(data.password)
    ) {
      delete data.username;
      delete data.password;
    }

    asyncDispatch(
      createProxy({
        ...data,
        proxyListKey: proxyList.key
      })
    );

    handleProxyListModal();
  };

  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            proxies.length
        )
      : 0;

  const editProxiesState =
    sortFilterProxies
      .map((proxy: Proxy) => ({
        host: proxy.host,
        port: proxy.port,
        username: proxy.username,
        password: proxy.password,
        country: proxy.country
      }))
      .slice(
        page * rowsPerPage,
        rowsPerPage + page * rowsPerPage
      );

  const handleBulkEdit = (
    changedMap
  ) => {
    const updatedIterator =
      changedMap.values();
    const updatePayload = [
      ...changedMap.keys()
    ].map((index) => {
      const { id } =
        sortFilterProxies.at(
          index + page * rowsPerPage
        );

      return {
        id,
        ...updatedIterator.next().value
      };
    });

    asyncDispatch(
      editProxy(updatePayload)
    );
  };

  const isUserNotFound =
    sortFilterProxies.length === 0;

  switch (proxiesStatus) {
    case 'success':
      return (
        <Page title={proxyList.name}>
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography
                variant="h4"
                gutterBottom
              >
                {proxyList.name}
              </Typography>
              <Button
                variant="contained"
                startIcon={
                  <Iconify icon="eva:plus-fill" />
                }
                onClick={
                  handleProxyListModal
                }
              >
                New Proxy
              </Button>
              <ProxyModal
                actionType="Add"
                open={
                  openProxyListModal
                }
                onSubmit={
                  submitProxyHandler
                }
                handleClose={
                  handleProxyListModal
                }
              />
            </Stack>

            <Card>
              <ListToolbar
                editStateData={JSON.stringify(
                  editProxiesState,
                  null,
                  2
                )}
                placeholder={
                  'Search proxy...'
                }
                numSelected={
                  selects.size
                }
                filterName={query}
                bulkDeleteHandler={
                  handleBulkDelete
                }
                bulkRecheckHandler={
                  handleBulkRecheck
                }
                onFilterName={
                  handleFilterBySearch
                }
                bulkEditHandler={
                  handleBulkEdit
                }
              />

              <TableContainer
                sx={{ minWidth: 800 }}
              >
                <Table>
                  <ListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={
                      TABLE_HEAD
                    }
                    rowCount={
                      proxies.length
                    }
                    numSelected={
                      selects.size
                    }
                    onRequestSort={
                      handleRequestSort
                    }
                    onSelectAllClick={handleSelectAllClick(
                      proxies.map(
                        (proxy) =>
                          proxy.id
                      )
                    )}
                  />
                  <TableBody>
                    {sortFilterProxies
                      .slice(
                        page *
                          rowsPerPage,
                        page *
                          rowsPerPage +
                          rowsPerPage
                      )
                      .map(
                        (
                          proxy: Proxy
                        ) => {
                          const {
                            id,
                            host,
                            port,
                            status,
                            totalHits,
                            username,
                            password,
                            lastCheckAt
                          } = proxy;
                          const isItemSelected =
                            selects.has(
                              id
                            );

                          return (
                            <TableRow
                              hover
                              key={Math.random().toString(
                                32
                              )}
                              tabIndex={
                                -1
                              }
                              role="checkbox"
                              selected={
                                isItemSelected
                              }
                              aria-checked={
                                isItemSelected
                              }
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={
                                    isItemSelected
                                  }
                                  onChange={handleClick(
                                    id
                                  )}
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
                                  spacing={
                                    2
                                  }
                                >
                                  <Typography
                                    variant="subtitle2"
                                    noWrap
                                  >
                                    <CopyToolTip
                                      text={
                                        host
                                      }
                                    >
                                      {
                                        host
                                      }
                                    </CopyToolTip>
                                  </Typography>
                                </Stack>
                              </TableCell>

                              <TableCell align="left">
                                <CopyToolTip
                                  text={String(
                                    port
                                  )}
                                >
                                  {String(
                                    port
                                  )}
                                </CopyToolTip>
                              </TableCell>

                              <TableCell align="center">
                                {
                                  totalHits
                                }
                              </TableCell>

                              <TableCell align="center">
                                {username ? (
                                  <CopyToolTip
                                    text={
                                      username
                                    }
                                  >
                                    {
                                      username
                                    }
                                  </CopyToolTip>
                                ) : (
                                  '-'
                                )}
                              </TableCell>

                              <TableCell align="center">
                                {password ? (
                                  <CopyToolTip
                                    text={
                                      password
                                    }
                                  >
                                    <Musk>
                                      {
                                        password
                                      }
                                    </Musk>
                                  </CopyToolTip>
                                ) : (
                                  '-'
                                )}
                              </TableCell>

                              <TableCell align="center">
                                <Tooltip
                                  title={`Checked ${formatDistanceToNow(
                                    new Date(
                                      lastCheckAt
                                    )
                                  )}`}
                                  arrow
                                >
                                  <span>
                                    <Label
                                      variant="ghost"
                                      color={
                                        (status ===
                                          'INACTIVE' &&
                                          'error') ||
                                        (status ===
                                          'CHECKING' &&
                                          'warning') ||
                                        'success'
                                      }
                                    >
                                      {
                                        status
                                      }
                                    </Label>
                                  </span>
                                </Tooltip>
                              </TableCell>

                              <TableCell align="right">
                                <ProxyMenu
                                  id={
                                    id
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height:
                            53 *
                            emptyRows
                        }}
                      >
                        <TableCell
                          colSpan={6}
                        />
                      </TableRow>
                    )}
                  </TableBody>

                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell
                          align="center"
                          colSpan={6}
                          sx={{ py: 3 }}
                        >
                          <SearchNotFound
                            searchQuery={
                              query
                            }
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[
                  5, 10, 25
                ]}
                component="div"
                count={proxies.length}
                rowsPerPage={
                  rowsPerPage
                }
                page={page}
                onPageChange={
                  handleChangePage
                }
                onRowsPerPageChange={
                  handleChangeRowsPerPage
                }
              />
            </Card>
          </Container>
        </Page>
      );
    case 'loading':
      return <LoadingListFallback />;
  }
}
