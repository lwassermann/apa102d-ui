const effects = [
  {
    name: 'off'
  },
  {
    name: 'particles'
  },
  {
    name: 'bubbels',
    parameters: {
      color: {
        type: 'color',
        defaultValue: 'hsv(0.0,1.0,0.15)'
      },
      color2: {
        type: 'color',
        defaultValue: 'hsv(0.5,1.0,0.15)'
      }
    }
  },
  {
    name: 'test',
    parameters: {
      test_length_ms: {
        label: 'Step length (ms)',
        type: 'time',
        defaultValue: 10,
        range: [5, 1000]
      },
      color: {
        type: 'color',
        defaultValue: 'hsv(0.0,0.3,0.15)'
      }
    }
  }
]

export default effects
