import React from 'react'
import { string, number, arrayOf, func } from 'prop-types'
import TextField from 'material-ui/TextField'

const clamp = function(value, [min, max]) {
  return Math.min(Math.max(min, value), max)
}

class NumberParameter extends React.Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const value = clamp(Number.parseInt(event.target.value, 10), this.props.range)
    this.props.onChange(value)
  }

  render() {
    const { name, label } = this.props
    const value = this.props.value || this.props.defaultValue

    return (
      <div className="parameter number">
        <TextField
          id={name}
          label={label}
          type="number"
          value={value}
          onChange={this.handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
      </div>
    )
  }
}

NumberParameter.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  defaultValue: number.isRequired,
  range: arrayOf(number).isRequired,
  value: string,
  onChange: func.isRequired
}

NumberParameter.defaultProps = {
  value: ''
}

export default NumberParameter
