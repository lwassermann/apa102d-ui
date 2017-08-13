import { createMuiTheme } from 'material-ui/styles'
import createPalette from 'material-ui/styles/palette'
import blueGrey from 'material-ui/colors/blueGrey'
import green from 'material-ui/colors/green'
import deepOrange from 'material-ui/colors/deepOrange'

const theme = createMuiTheme({
  palette: createPalette({
    primary: blueGrey,
    accent: green,
    error: deepOrange
  })
})

export default theme
