// material
import {
  InputAdornment,
  OutlinedInput,
  Toolbar,
  Typography
} from '@mui/material';
import {
  styled,
  Theme
} from '@mui/material/styles';
import BulkEditor from 'packages/dashboard/components/BulkEditor';
// component
import { getIcon } from 'packages/dashboard/utils';
import React, {
  useEffect,
  useState
} from 'react';

const RootStyle = styled(Toolbar)(
  ({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3)
  })
);

interface CustomTheme extends Theme {
  customShadows: any;
}

const SearchStyle = styled(
  OutlinedInput
)(
  ({
    theme
  }: {
    theme: CustomTheme;
  }) => ({
    width: 240,
    transition:
      theme.transitions.create(
        ['box-shadow', 'width'],
        {
          easing:
            theme.transitions.easing
              .easeInOut,
          duration:
            theme.transitions.duration
              .shorter
        }
      ),

    '&.Mui-focused': {
      width: 320,
      boxShadow: theme.customShadows.z8
    },
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  })
);

interface ListToolbarTypes {
  placeholder: string;
  numSelected: number;
  filterName: string;
  editStateData: string;
  bulkEditHandler: <T>(
    changedMap: Map<number, T>
  ) => void;
  bulkDeleteHandler: () => void;
  bulkRecheckHandler: () => void;
  onFilterName: (query: string) => void;
  extraValidation?: (
    state: Map<number, any>,
    setError: React.Dispatch<
      React.SetStateAction<string>
    >
  ) => boolean;
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
  extraValidation
}: ListToolbarTypes) {
  const [queryText, setQueryText] =
    useState<string>(filterName);

  useEffect(
    () => onFilterName(queryText),
    [queryText]
  );

  const queryChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQueryText(e.target.value);
  };

  const bulkEditorProps = {
    title: 'Bulk Change',
    modalId: 'BulkEdit',
    bulkEditHandler,
    editStateData,
    extraValidation
  };

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          component="div"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={queryText}
          onChange={queryChangeHandler}
          placeholder={placeholder}
          startAdornment={
            <InputAdornment position="start">
              {getIcon(
                'eva:search-fill'
              )}
            </InputAdornment>
          }
        />
      )}

      {
        numSelected > 0 ? (
          <div className="flex gap-3 items-center">
            <span
              className="tooltip tooltip-bottom cursor-pointer"
              data-tooltip="Delete"
              onClick={
                bulkDeleteHandler
              }
            >
              {getIcon(
                'eva:trash-2-fill'
              )}
            </span>
            <span
              className="tooltip tooltip-bottom cursor-pointer"
              data-tooltip="Recheck"
              onClick={
                bulkRecheckHandler
              }
            >
              {getIcon(
                'fluent:arrow-clockwise-16-filled'
              )}
            </span>
          </div>
        ) : (
          <span
            className="tooltip tooltip-bottom cursor-pointer"
            data-tooltip="Edit"
          >
            <label
              htmlFor={
                bulkEditorProps.modalId
              }
            >
              {getIcon(
                'akar-icons:edit'
              )}
            </label>
          </span>
        )
        // TODO: ADD filter feature
        /*           {<Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>} */
      }

      <BulkEditor
        {...bulkEditorProps}
      />
    </RootStyle>
  );
}
