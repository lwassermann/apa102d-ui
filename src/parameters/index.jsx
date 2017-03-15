import React, { PropTypes } from 'react'

import Color from './color'
import './parameters.css'

function Parameter(props) {
  switch (props.type) {
    case 'color':
      return (<Color {...props} />)
    case 'time':
      return (<div className="parameter">Time {props.name}: {props.currentValue}</div>)
    default:
      return (<div className="parameter">Unknown Type {props.type} {props.name}: {props.currentValue}</div>)
  }
}
Parameter.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  currentValue: PropTypes.string
}

Parameter.defaultProps = {
  currentValue: ''
}

export default Parameter
