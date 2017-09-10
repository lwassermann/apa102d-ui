import React, { Component } from 'react'
import { object } from 'prop-types'
import { withStyles } from 'material-ui/styles'

import ExpandMore from 'material-ui-icons/ExpandMore'
import ExpandLess from 'material-ui-icons/ExpandLess'
import Collapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  root: {
    position: 'relative',
    backgroundColor: theme.palette.background.contentFrame,
    marginBottom: 40,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 24,
    paddingRight: 24
  },
  toggleButton: {
    display: 'block',
    zIndex: 10,
    position: 'absolute',
    top: 7,
    right: 7
  }
})

class Introduction extends Component {
  state = {
    isOpen: false
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const classes = this.props.classes

    return (
      <div className={classes.root}>
        <Typography type="title" component="h1">
          Introduction
        </Typography>
        <IconButton onClick={this.toggleOpen} className={classes.toggleButton}>
          {this.state.isOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
        <Collapse in={this.state.isOpen}>
          <Typography type="body1" component="p">
            Lorem ipsum dolor sit amet
          </Typography>
        </Collapse>
      </div>
    )
  }
}

Introduction.propTypes = {
  classes: object.isRequired
}

export default withStyles(styles)(Introduction)
