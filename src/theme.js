import { createMuiTheme } from '@material-ui/core/styles';
import { blue, orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
  status: {
    danger: 'orange',
  },
});

export default theme;