//

import Autocomplete from './AutoComplete';
import Backdrop from './BackDrop';
import Button from './Button';
import Card from './Card';
import CssBaseline from './CssBaseLine';
import Input from './input';
import Paper from './Paper';
import Tooltip from './ToolTip';
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
