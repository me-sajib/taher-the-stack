// material
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import {
  styled,
  Theme
} from '@mui/material/styles';
import BulkEditor from 'packages/dashboard/components/BulkEditor';
// component
import Iconify from 'packages/dashboard/components/Iconify';
import React, {
  useEffect,
  useState
} from 'react';

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------
// akar-icons:edit

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
  const [
    isOpenEditModal,
    setModalStatus
  ] = useState(false);
  const toggleModal = () =>
    setModalStatus((prev) => !prev);
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
    bulkEditHandler,
    editStateData,
    isOpenEditModal,
    toggleModal,
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
              <Iconify
                icon="eva:search-fill"
                sx={{
                  color:
                    'text.disabled',
                  width: 20,
                  height: 20
                }}
              />
            </InputAdornment>
          }
        />
      )}

      {
        numSelected > 0 ? (
          <span>
            <Tooltip
              title="Delete"
              onClick={
                bulkDeleteHandler
              }
            >
              <IconButton>
                <Iconify icon="eva:trash-2-fill" />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Recheck"
              onClick={
                bulkRecheckHandler
              }
            >
              <IconButton>
                <Iconify icon="fluent:arrow-clockwise-16-filled" />
              </IconButton>
            </Tooltip>
          </span>
        ) : (
          <Tooltip
            title="Edit"
            onClick={toggleModal}
          >
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

      <BulkEditor
        {...bulkEditorProps}
      />
    </RootStyle>
  );
}
