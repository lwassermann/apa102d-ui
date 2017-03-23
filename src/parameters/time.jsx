import React from 'react'

// import './color.css';

const clamp = function(value, [min, max]) {
  return Math.min(Math.max(min, value), max)
}

class Time extends React.Component {
  constructor() {
    super()

    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    const value = event.target.value
    const number = clamp(Number.parseInt(value, 10), this.props.range)
    this.props.onChange(number)
  }

  render() {
    const currentValue = this.props.currentValue || this.props.default

    return (
      <div className="parameter time">
        <span className="time-header">
          {this.props.name}
        </span>
        <input type="number" value={currentValue} onChange={this.onChange} />
      </div>
    )
  }
}

Time.propTypes = {
  name: React.PropTypes.string.isRequired,
  default: React.PropTypes.number.isRequired,
  range: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  currentValue: React.PropTypes.number,
  onChange: React.PropTypes.func.isRequired
}

Time.defaultProps = {
  currentValue: ''
}

export default Time
