import { createMuiTheme } from 'material-ui/styles'
import blueGrey from 'material-ui/colors/blueGrey'
import amber from 'material-ui/colors/amber'
import deepOrange from 'material-ui/colors/deepOrange'

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: amber,
    error: deepOrange
  }
})

export default theme
