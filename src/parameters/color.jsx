import React from 'react'
import { string, func } from 'prop-types'
import { FormLabel } from 'material-ui/Form'

import { HSVtoRGB } from './color-spaces'

const HUES = 64
const SATURATIONS = 16
const VALUES = 32
const RATIO = 0.9

function fillHS(ctx, x, y, width, height) {
  for (let hue = 0; hue < HUES; hue += 1) {
    for (let saturation = 0; saturation < SATURATIONS; saturation += 1) {
      const { r, g, b } = HSVtoRGB(hue / HUES, 1 - saturation / SATURATIONS, 1)
      ctx.fillStyle = `rgb(${r},${g},${b})`
      ctx.fillRect(
        x + hue * width / HUES,
        y + saturation * height / SATURATIONS,
        width / HUES + 1,
        height / SATURATIONS + 1
      )
    }
  }
}

function calculateHS(x, y, width, height) {
  return {
    h: x / width,
    s: (height - y) / height
  }
}

function fillV(ctx, x, y, width, height) {
  for (let value = 0; value < VALUES; value += 1) {
    const { r, g, b } = HSVtoRGB(0, 0, value / VALUES)
    ctx.fillStyle = `rgb(${r},${g},${b})`
    ctx.fillRect(x + value * width / VALUES, y, width / VALUES + 1, height)
  }
}

function calculateValueOf(x, y, width, height) {
  return {
    v: x / width
  }
}

class Color extends React.Component {
  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)
    this.renderCanvas = this.renderCanvas.bind(this)
  }

  renderCanvas(canvas) {
    if (canvas) {
      const ctx = canvas.getContext('2d')
      const { width, height } = canvas

      fillHS(ctx, 0, 0, width * RATIO, height)

      ctx.transform(1, 0, 0, 1, width, 0)
      ctx.rotate(Math.PI / 2)
      fillV(ctx, 0, 0, height, width * (1 - RATIO))
    }

    this.canvas = canvas
  }

  handleClick(event) {
    const { offsetX: x, offsetY: y } = event.nativeEvent
    const { clientWidth: width, clientHeight: height } = event.target
    if (x < width * RATIO) {
      const { h, s } = calculateHS(x, y, width * RATIO, height)
      const { v } = this.parsedValue()
      // console.log({ h, s, v })
      this.props.onChange(`hsv(${h},${s},${v})`)
    } else {
      const { h, s } = this.parsedValue()
      const { v } = calculateValueOf(
        y,
        (width - x) / width * (1 - RATIO),
        height,
        width * (1 - RATIO)
      )
      // console.log({ h, s, v })
      this.props.onChange(`hsv(${h},${s},${v})`)
    }
  }

  parsedValue() {
    const [, h, s, v] =
      (this.props.value || this.props.defaultValue || '')
        .match(/hsv\((\d(?:\.\d+)?),(\d(?:\.\d+)?),(\d(?:\.\d+)?)\)/) || []
    return {
      h: (h && parseFloat(h)) || 0.0,
      s: (s && parseFloat(s)) || 0.0,
      v: (v && parseFloat(v)) || 0.0
    }
  }

  render() {
    const { h, s, v } = this.parsedValue()
    const clampedH = Math.floor(h * HUES) / HUES
    const clampedS = Math.floor((1 - s) * SATURATIONS) / SATURATIONS
    const clampedV = Math.floor(v * VALUES) / VALUES
    return (
      <div className="parameter color">
        <FormLabel>
          {this.props.label || this.props.name}
        </FormLabel>
        <div style={{ position: 'relative' }}>
          <canvas
            id={this.props.name}
            onClick={this.handleClick}
            ref={this.renderCanvas}
            width="600"
            height="200"
            style={{ width: '100%', height: 200 }}
          />
          <div
            style={{
              position: 'absolute',
              left: `calc(${clampedH * 100 * RATIO}% - 2px)`,
              top: `calc(${clampedS * 100}% - 2px)`,
              width: `${RATIO / HUES * 100}%`,
              height: `${1 / SATURATIONS * 100}%`,
              border: '2px solid black',
              boxSizing: 'content-box',
              borderRadius: '2px',
              pointerEvents: 'none'
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: `calc(${RATIO * 100}% - 2px)`,
              top: `calc(${clampedV * 100}% - 2px)`,
              width: `${(1 - RATIO) * 100}%`,
              height: `${1 / VALUES * 100}%`,
              border: '2px solid white',
              boxSizing: 'content-box',
              borderRadius: '2px',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>
    )
  }
}

Color.propTypes = {
  name: string.isRequired,
  label: string,
  value: string,
  defaultValue: string,
  onChange: func.isRequired
}

Color.defaultProps = {
  value: '',
  defaultValue: 'hsv(0.0,0.0,0.0)',
  label: ''
}

export default Color
