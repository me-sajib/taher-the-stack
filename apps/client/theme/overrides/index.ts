//

import Autocomplete from './AutoComplete';
import Backdrop from './Backdrop';
import Button from './Button';
import Card from './Card';
import CssBaseline from './CssBaseline';
import Input from './Input';
import Paper from './Paper';
import Tooltip from './Tooltip';
import Typography from './Typography';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return Object.assign(
    Card(theme),
    Input(theme),
    Paper(theme),
    Button(theme),
    Tooltip(theme),
    Backdrop(theme),
    Typography(theme),
    CssBaseline(theme),
    Autocomplete(theme)
  );
}
