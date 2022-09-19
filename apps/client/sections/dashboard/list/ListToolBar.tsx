// material
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/system';
// component
import Iconify from 'components/Iconify';
import React, { useEffect, useState } from 'react';
import { getChange } from 'utils';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------
// akar-icons:edit

interface ListToolbarTypes {
  placeholder: string;
  numSelected: number;
  filterName: string;
  editStateData: string;
  bulkEditHandler: <T>(changedMap: Map<number, T>) => void;
  bulkDeleteHandler: () => void;
  bulkRecheckHandler: () => void;
  onFilterName: (e: React.ChangeEvent) => void;
}

export default function ListToolbar({
  placeholder,
  numSelected,
  filterName,
  editStateData,
  bulkDeleteHandler,
  bulkEditHandler,
  bulkRecheckHandler,
  onFilterName,
}: ListToolbarTypes) {
  const [modalText, setModalText] = useState(editStateData);
  const [isOpenEditModal, setModalStatus] = useState(false);

  useEffect(() => {
    setModalText(editStateData);
  }, [editStateData]);

  const toggleModal = () => setModalStatus((prev) => !prev);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalText(e.target.value);
  };

  const saveHandler = () => {
    try {
      const recentChange = JSON.parse(modalText);
      const prevState = JSON.parse(editStateData);

      bulkEditHandler(getChange(prevState, recentChange));
      toggleModal();
    } catch (e) {
      return null;
    }
  };

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder={placeholder}
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      {
        numSelected > 0 ? (
          <span>
            <Tooltip title="Delete" onClick={bulkDeleteHandler}>
              <IconButton>
                <Iconify icon="eva:trash-2-fill" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Recheck" onClick={bulkRecheckHandler}>
              <IconButton>
                <Iconify icon="fluent:arrow-clockwise-16-filled" />
              </IconButton>
            </Tooltip>
          </span>
        ) : (
          <Tooltip title="Edit" onClick={toggleModal}>
            <IconButton>
              <Iconify icon="akar-icons:edit" />
            </IconButton>
          </Tooltip>
        )
        // TODO: ADD filter feature
        /*           {<Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>} */
      }

      <Dialog
        open={isOpenEditModal}
        onClose={toggleModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Bulk Edit</DialogTitle>
        <Stack spacing={3} sx={{ p: 3 }}>
          <TextField
            value={modalText}
            autoFocus
            size="medium"
            label="JSON"
            multiline
            rows={20}
            variant="outlined"
            onChange={changeHandler}
          />
          <DialogActions>
            <Button onClick={toggleModal}>Cancel</Button>
            <Button variant="contained" onClick={saveHandler}>
              Save
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </RootStyle>
  );
}
