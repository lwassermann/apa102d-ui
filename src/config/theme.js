import { createMuiTheme } from 'material-ui/styles'
import createPalette from 'material-ui/styles/palette'
import blueGrey from 'material-ui/colors/blueGrey'
import amber from 'material-ui/colors/amber'
import deepOrange from 'material-ui/colors/deepOrange'

const theme = createMuiTheme({
  palette: createPalette({
    primary: blueGrey,
    accent: amber,
    error: deepOrange
  })
})

export default theme
