/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { range } from 'lodash';

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

import { ProxyList } from '@prisma/client';
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
import { HeadType } from 'interfaces';
import useSortFilter from 'hooks/useSortFilter';

// ----------------------------------------------------------------------
type UiProxyList = ProxyList & { totalProxy: number };

const TABLE_HEAD: Array<HeadType<UiProxyList>> = [
  { id: 'name', label: 'Name' },
  { id: 'username', label: 'Username', align: 'center' },
  { id: 'password', label: 'Password', align: 'center' },
  { id: 'rotatingIndex', label: 'Rotating index', align: 'center' },
  { id: 'totalProxy', label: 'Total proxy', align: 'center' },
];

export default function Index() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openProxyListModal, setProxyListModalStatus] = useState(false);
  const asyncDispatch = useDispatch<AppThunkDispatch>();
  const syncDispatch = useDispatch();
  const proxyLists = useSelector(getProxyList);
  const status = useSelector(getProxyListStatus);
  const user = useSelector(getUser);

  useEffect(() => {
    return () => {
      syncDispatch(clearProxyListError());
    };
  }, []);

  // custom hooks
  const { selects, clearSelection, handleClick, handleSelectAllClick } =
    useSelection<string>();
  const {
    items: filterSortProxyList,
    query,
    order,
    orderBy,
    handleRequestSort,
    handleFilterBySearch,
  } = useSortFilter<UiProxyList>(proxyLists, TABLE_HEAD);

  useEffect(() => {
    asyncDispatch(fetchProxyList());
  }, [asyncDispatch]);

  const toggleProxyListModal = () => setProxyListModalStatus((prev) => !prev);

  const submitProxyListHandler = async (data) => {
    syncDispatch(clearProxyListError());

    const [firstName, lastName] = user.fullname.split(/\s/);
    data.username ||= `${faker.internet.userName(
      firstName,
      lastName
    )}_${faker.random.alphaNumeric(5)}`;

    data.password ||= faker.internet.password(
      faker.datatype.number({
        min: 5,
        max: 10,
      })
    );
    const res = (await asyncDispatch(
      createProxyList({ ...data, userId: user.id })
    )) as any;

    if (!res.payload.error) {
      toggleProxyListModal();
    }
  };

  const handleBulkDelete = () => {
    asyncDispatch(
      deleteProxyList({
        listKeys: [...selects],
      })
    );
    clearSelection();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBulkRecheck = () => {
    const filterSortProxyList = [...selects].filter((key) => {
      const proxyList = proxyLists.find((list) => list.key === key);

      return proxyList.totalProxy !== 0 && !proxyList.checking;
    });

    asyncDispatch(recheckProxyList({ checkProxyListIds: filterSortProxyList }));

    clearSelection();
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - proxyLists.length) : 0;

  const editList = filterSortProxyList
    .map((list) => ({
      name: list.name,
      username: list.username,
      password: list.password,
    }))
    .slice(page * rowsPerPage, rowsPerPage + page * rowsPerPage);

  const handleBulkEdit = (changedMap: Map<number, any>) => {
    const updatedIterator = changedMap.values();
    const updatePayload = [...changedMap.keys()].map((index) => {
      const { key } = filterSortProxyList.at(index + page * rowsPerPage);

      return {
        key,
        ...updatedIterator.next().value,
      };
    });
    asyncDispatch(editProxyList(updatePayload));
  };

  const usernameValidationHandler = (
    changedMap: Map<number, ProxyList>,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const usernameSet: Set<string> = new Set(
      proxyLists.map((list) => list.username)
    );

    for (const [, { username }] of changedMap) {
      if (usernameSet.has(username)) {
        setError(`${username} is already exist`);
        return false;
      }

      usernameSet.add(username);
    }

    return true;
  };

  const isUserNotFound = filterSortProxyList.length === 0;

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
                onClick={toggleProxyListModal}
              >
                New Proxy List
              </Button>
              <ProxyListModal
                actionType="Add"
                open={openProxyListModal}
                onSubmit={submitProxyListHandler}
                handleClose={toggleProxyListModal}
              />
            </Stack>

            <Card>
              <ListToolbar
                editStateData={JSON.stringify(editList, null, 2)}
                placeholder={'Search proxy list...'}
                numSelected={selects.size}
                filterName={query}
                onFilterName={handleFilterBySearch}
                bulkDeleteHandler={handleBulkDelete}
                bulkRecheckHandler={handleBulkRecheck}
                bulkEditHandler={handleBulkEdit}
                extraValidation={usernameValidationHandler}
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
                    {filterSortProxyList
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
                          <SearchNotFound searchQuery={query} />
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
