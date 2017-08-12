import React from 'react'
import { string, number, arrayOf, func } from 'prop-types'

// import './color.css';

const clamp = function(value, [min, max]) {
  return Math.min(Math.max(min, value), max)
}

class Time extends React.Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const value = clamp(Number.parseInt(event.target.value, 10), this.props.range)
    this.props.onChange(value)
  }

  render() {
    const currentValue = this.props.currentValue || this.props.default

    return (
      <div className="parameter time">
        <span className="time-header">
          {this.props.name}
        </span>
        <input type="number" value={currentValue} onChange={this.handleChange} />
      </div>
    )
  }
}

Time.propTypes = {
  name: string.isRequired,
  default: number.isRequired,
  range: arrayOf(number).isRequired,
  currentValue: number,
  onChange: func.isRequired
}

Time.defaultProps = {
  currentValue: ''
}

export default Time
