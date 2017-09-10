import React from 'react'
import { string, func } from 'prop-types'
import { FormLabel } from 'material-ui/Form'

import { HSVtoRGB } from './color-spaces'

const HUES = 64
const SATURATIONS = 16
const VALUES = 32
const RATIO = 0.9

function fillHSV(ctx, x, y, width, height) {
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

function fillValue(ctx, x, y, width, height) {
  for (let value = 0; value < VALUES; value += 1) {
    const { r, g, b } = HSVtoRGB(0, 0, value / VALUES)
    ctx.fillStyle = `rgb(${r},${g},${b})`
    ctx.fillRect(x + value * width / VALUES, y, width / VALUES + 1, height)
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

      fillHSV(ctx, 0, 0, width * RATIO, height)

      ctx.transform(1, 0, 0, 1, width, 0)
      ctx.rotate(Math.PI / 2)
      fillValue(ctx, 0, 0, height, width * (1 - RATIO))
    }

    this.canvas = canvas
  }

  handleClick(event) {
    const { offsetX: x, offsetY: y } = event.nativeEvent
    const { clientWidth: width, clientHeight: height } = event.target
    if (event.nativeEvent.offsetX < event.target.clientWidth * RATIO) {
    }
    // this.props.onChange(this.props.name, `hsv(${h},${s},${v})`)
  }

  render() {
    return (
      <div className="parameter color">
        <FormLabel>
          {this.props.label || this.props.name}
        </FormLabel>
        <canvas
          id={this.props.name}
          onClick={this.handleClick}
          ref={this.renderCanvas}
          width="600"
          height="200"
          style={{ width: '100%', height: 200 }}
        />
      </div>
    )
  }
}

Color.propTypes = {
  name: string.isRequired,
  label: string,
  defaultValue: string,
  onChange: func.isRequired
}

Color.defaultProps = {
  defaultValue: 'hsv(0.0,0.0,0.0)',
  label: ''
}

export default Color
