import React from 'react'
import { string, func } from 'prop-types'

import { RGBtoHSV, HSVtoRGB } from './color-spaces'

// import './color.css';

class Color extends React.Component {
  constructor() {
    super()

    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    const value = event.target.value
    const r = Number.parseInt(value.slice(1, 3), 16)
    const g = Number.parseInt(value.slice(3, 5), 16)
    const b = Number.parseInt(value.slice(5, 7), 16)
    const { h, s, v } = RGBtoHSV(r, g, b)
    this.props.onChange(this.props.name, `hsv(${h},${s},${v})`)
  }

  toRGBValue(currentValue) {
    const [, h, s, v] = (currentValue || '').match(/hsv\((\d\.\d+),(\d\.\d+),(\d\.\d+)\)/) || []
    const { r, g, b } = HSVtoRGB(
      (h && parseFloat(h)) || 0.0,
      (s && parseFloat(s)) || 0.0,
      (v && parseFloat(v)) || 0.0
    )
    return '#' + [r, g, b].map(n => ('0' + n.toString(16)).slice(-2)).join('')
  }

  render() {
    const rgb = this.toRGBValue(this.props.currentValue || this.props.default)

    return (
      <div className="parameter color">
        <span className="color-header">
          {this.props.name}
        </span>
        <input type="color" value={rgb} onChange={this.handleChange} />
      </div>
    )
  }
}

Color.propTypes = {
  name: string.isRequired,
  default: string,
  onChange: func.isRequired
}

Color.defaultProps = {
  default: 'hsv(0.0,0.0,0.0)'
}

export default Color
