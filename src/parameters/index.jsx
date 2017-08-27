import React from 'react'
import { string } from 'prop-types'

import Color from './color'
import NumberParameter from './number'

function Parameter(props) {
  switch (props.type) {
    case 'color':
      return <Color {...props} />
    case 'number':
      return <NumberParameter {...props} />
    default:
      return (
        <div className="parameter">
          Unknown Type {props.type} {props.name}: {props.value}
        </div>
      )
  }
}
Parameter.propTypes = {
  type: string.isRequired,
  name: string.isRequired,
  value: string
}

Parameter.defaultProps = {
  value: ''
}

export default Parameter
