import React from 'react'
import { bool, string, shape } from 'prop-types'
import classnames from 'classnames'
import { withStyles, createStyleSheet } from 'material-ui/styles'

import Card, { CardContent } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import Button from 'material-ui/Button'

import Parameter from './parameters'
import { send } from './communication'

const styleSheet = createStyleSheet(theme => ({
  card: {
    backgroundColor: theme.palette.background.card,
    transition: theme.transitions.create('margin')
  },
  cardActive: {
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: theme.palette.background.contentFrame
  },
  effect: {
    width: '100%'
  }
}))

function selectEffect(name) {
  return () => {
    send({ effect: name })
  }
}

function updateEffect(props, paramName) {
  return value => {
    const parameters = Object.assign({}, { [paramName]: value }, props.state)
    send({ effect: props.name, ...parameters })
  }
}

function Effect(props) {
  const { classes } = props

  const parameters = Object.keys(props.parameters).map(parameterName =>
    <Parameter
      key={parameterName}
      name={parameterName}
      {...props.parameters[parameterName]}
      value={props.state[parameterName]}
      onChange={updateEffect(props, parameterName)}
    />
  )

  return (
    <Card className={classnames(classes.card, { [classes.cardActive]: props.active })}>
      <Button
        className={classnames(classes.effect)}
        raised
        color={props.active ? 'accent' : 'default'}
        onClick={selectEffect(props.name)}
        aria-expanded={props.active}
        aria-label="Select Effect"
      >
        {props.name}
      </Button>
      {parameters.length > 0 &&
        <Collapse in={props.active} transitionDuration="auto" unmountOnExit>
          <CardContent>
            {parameters}
          </CardContent>
        </Collapse>}
    </Card>
  )
}

Effect.propTypes = {
  name: string.isRequired,
  active: bool,
  parameters: shape({}),
  state: shape({})
}

Effect.defaultProps = {
  active: false,
  parameters: {},
  state: {}
}

export default withStyles(styleSheet)(Effect)
