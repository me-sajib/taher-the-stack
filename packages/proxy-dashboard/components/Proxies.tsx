import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Badge, Container } from '.';
// material
import {
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow
} from '@mui/material';
// components
import {
  ListHead,
  ListToolbar
} from 'packages/proxy-dashboard/sections/dashboard/list';
import Page from './Page';
import ProxyModal from './ProxyModal';
import SearchNotFound from './SearchNotFound';
// store
import { Proxy } from '@prisma/client';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import useSelection from 'packages/proxy-dashboard/hooks/useSelection';
import useSortFilter from 'packages/proxy-dashboard/hooks/useSortFilter';
import { HeadType } from 'packages/proxy-dashboard/interfaces';
import ProxyMenu from 'packages/proxy-dashboard/sections/dashboard/list/ProxyMenu';
import { AppThunkDispatch } from 'packages/proxy-dashboard/store';
import {
  getList,
  getProxies,
  getProxyStatus
} from 'packages/proxy-dashboard/store/proxySlice';
import {
  createProxy,
  deleteProxy,
  editProxy,
  fetchProxies,
  recheckProxy
} from 'packages/proxy-dashboard/store/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { getIcon } from '../utils';
import CopyToolTip from './CopyToolTip';
import LoadingListFallback from './LoadingListFallback';
import Musk from './Musk';

const TABLE_HEAD: Array<HeadType<Proxy>> = [
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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openProxyListModal, setProxyListModalStatus] =
    useState(false);
  const router = useRouter();
  const asyncDispatch = useDispatch<AppThunkDispatch>();
  const proxies = useSelector(getProxies) ?? [];
  const proxiesStatus = useSelector(getProxyStatus);
  const proxyList = useSelector(getList);
  const {
    items: sortFilterProxies,
    orderBy,
    order,
    query,
    handleRequestSort,
    handleFilterBySearch
  } = useSortFilter<Proxy>(proxies, TABLE_HEAD);

  const proxyListUsername = router.query.username as string;

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
  }, [asyncDispatch, proxyListUsername]);

  const handleProxyListModal = () =>
    setProxyListModalStatus(!openProxyListModal);

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
    const filteredSelectsByStatus = [...selects].filter((id) => {
      const proxy = proxies.find((proxy) => proxy.id === id);

      return proxy.status !== 'CHECKING';
    });

    asyncDispatch(recheckProxy(filteredSelectsByStatus));

    clearSelection();
  };

  const handleChangePage = (_event, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const submitProxyHandler = (data) => {
    if (+Boolean(data.username) ^ +Boolean(data.password)) {
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
      ? Math.max(0, (1 + page) * rowsPerPage - proxies.length)
      : 0;

  const editProxiesState = sortFilterProxies
    .map((proxy: Proxy) => ({
      host: proxy.host,
      port: proxy.port,
      username: proxy.username,
      password: proxy.password,
      country: proxy.country
    }))
    .slice(page * rowsPerPage, rowsPerPage + page * rowsPerPage);

  const handleBulkEdit = (changedMap) => {
    const updatedIterator = changedMap.values();
    const updatePayload = [...changedMap.keys()].map((index) => {
      const { id } = sortFilterProxies.at(index + page * rowsPerPage);

      return {
        id,
        ...updatedIterator.next().value
      };
    });

    asyncDispatch(editProxy(updatePayload));
  };

  const isUserNotFound = sortFilterProxies.length === 0;

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
              <h3 className="text-2xl text-black font-semibold">
                {proxyList.name}
              </h3>

              <label
                className="btn btn-outline-primary px-1.5"
                htmlFor="AddProxy"
              >
                <i>{getIcon('material-symbols:add')}</i>
                <span className="font-semibold">Proxy</span>
              </label>
              <ProxyModal
                modalId="AddProxy"
                actionType="Add"
                onSubmit={submitProxyHandler}
              />
            </Stack>

            <Card>
              <ListToolbar
                editStateData={JSON.stringify(
                  editProxiesState,
                  null,
                  2
                )}
                placeholder={'Search proxy...'}
                numSelected={selects.size}
                filterName={query}
                bulkDeleteHandler={handleBulkDelete}
                bulkRecheckHandler={handleBulkRecheck}
                onFilterName={handleFilterBySearch}
                bulkEditHandler={handleBulkEdit}
              />

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
                  {sortFilterProxies
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
                        lastCheckAt
                      } = proxy;
                      const isItemSelected = selects.has(id);

                      return (
                        <TableRow
                          hover
                          key={nanoid()}
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
                              <span className="font-semibold">
                                <CopyToolTip text={host}>
                                  {host}
                                </CopyToolTip>
                              </span>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">
                            <CopyToolTip text={String(port)}>
                              {String(port)}
                            </CopyToolTip>
                          </TableCell>

                          <TableCell align="center">
                            {totalHits}
                          </TableCell>

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
                            <span
                              className="tooltip tooltip-bottom cursor-pointer"
                              data-tooltip={`Checked ${formatDistanceToNow(
                                new Date(lastCheckAt)
                              )}`}
                            >
                              <Badge variant={status} />
                            </span>
                          </TableCell>

                          <TableCell align="right">
                            <ProxyMenu id={id} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows
                      }}
                    >
                      <TableCell colSpan={6} />
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
                        {query ? (
                          <SearchNotFound searchQuery={query} />
                        ) : (
                          <p className="font-semibold text-black text-center">
                            No proxy found. add new proxy
                          </p>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>

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
