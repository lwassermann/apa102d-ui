import React from 'react'
import { MuiThemeProvider } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import effects from './config/effects'
import theme from './config/theme'

import { subscribe, unsubscribe } from './communication'
import Effect from './effect'
import Introduction from './introduction'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      effect: 'test'
    }
  }

  componentDidMount() {
    this.subscription = subscribe(serverState => this.setState(serverState))
  }

  componentWillUnmount() {
    unsubscribe(this.subscription)
  }

  render() {
    const effectNodes = effects.map(effect => {
      if (effect.name === this.state.effect) {
        return <Effect key={effect.name} {...effect} active state={this.state} />
      }
      return <Effect key={effect.name} {...effect} />
    })

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Typography type="title" color="inherit">
                APA102 Daemon control
              </Typography>
            </Toolbar>
          </AppBar>
          <Introduction />
          <div className="effects">
            {effectNodes}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
