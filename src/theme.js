import { createMuiTheme } from '@material-ui/core/styles';
import { blue, grey, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: grey,
    loading: red
  },
  status: {
    danger: 'orange',
  },
});

export default theme;