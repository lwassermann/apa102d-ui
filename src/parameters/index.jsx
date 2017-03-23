import React, { PropTypes } from 'react'

import Color from './color'
import Time from './time'
import './parameters.css'

function Parameter(props) {
  switch (props.type) {
    case 'color':
      return (<Color {...props} />)
    case 'time':
      return (<Time {...props} />)
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
