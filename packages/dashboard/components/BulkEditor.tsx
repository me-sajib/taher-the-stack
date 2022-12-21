import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  TextField
} from '@mui/material';
import { getChange } from 'packages/dashboard/utils';
import React, {
  useEffect,
  useState
} from 'react';
import { Validator } from 'packages/dashboard/validator';

interface BulkEditorTypes {
  editStateData: string;
  isOpenEditModal: boolean;
  toggleModal: () => void;
  bulkEditHandler: (
    changedMap: Map<number, any>
  ) => void;
  extraValidation?: (
    changedMap: Map<number, any>,
    setError: React.Dispatch<
      React.SetStateAction<string>
    >
  ) => boolean;
}

export default function BulkEditor({
  editStateData,
  isOpenEditModal,
  toggleModal,
  bulkEditHandler,
  extraValidation
}: BulkEditorTypes) {
  const [modalText, setModalText] =
    useState(editStateData);
  const [bulkError, setBulkError] =
    useState('');

  useEffect(() => {
    setModalText(editStateData);
  }, [editStateData]);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setModalText(e.target.value);
  };

  const validateBulkData = (
    changedMap: Map<number, any>
  ) => {
    for (const obj of changedMap.values()) {
      const validator = new Validator(
        obj
      );
      const isValidMessage =
        validator.lunch();

      if (isValidMessage !== true) {
        setBulkError(
          isValidMessage as string
        );
        return false;
      }
    }

    return extraValidation
      ? extraValidation(
          changedMap,
          setBulkError
        )
      : true;
  };

  const saveHandler = () => {
    try {
      const recentChange =
        JSON.parse(modalText);
      const prevState = JSON.parse(
        editStateData
      );
      const changedMap = getChange(
        prevState,
        recentChange
      );

      const isValid =
        validateBulkData(changedMap);

      if (isValid) {
        bulkEditHandler(changedMap);
        setBulkError('');
        toggleModal();
      }
    } catch (e) {
      return null;
    }
  };
  return (
    <Dialog
      open={isOpenEditModal}
      onClose={toggleModal}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Bulk Edit
      </DialogTitle>
      <Stack spacing={3} sx={{ p: 3 }}>
        <TextField
          value={modalText}
          autoFocus
          size="medium"
          label="JSON"
          multiline
          rows={20}
          variant="outlined"
          error={Boolean(bulkError)}
          helperText={bulkError}
          onChange={changeHandler}
        />
        <DialogActions>
          <Button onClick={toggleModal}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={saveHandler}
          >
            Save
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
