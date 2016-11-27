import React from 'react';

// import './color.css';

function Color(props) {
  return (
    <div className="parameter color">
      <span className="color-header">
        {props.name}
      </span>
      <input type="color" />
    </div>
  );
}

Color.propTypes = {
  name: React.PropTypes.string.isRequired,
  default: React.PropTypes.string
};

Color.defaultProps = {
  default: 'hsv(0.0,0.0,0.0)'
};

/* eslint-disable */
  // attr('change', function() {
  //   const r = Number.parseInt(this.value.slice(1, 3), 16);
  //   const g = Number.parseInt(this.value.slice(3, 5), 16);
  //   const b = Number.parseInt(this.value.slice(5, 7), 16);
  //   const { h, s, v } = RGBtoHSV(r, g, b);
  //   onChange(`hsv(${h},${s},${v})`);
  // }),
  // toRGBValue(currentValue) {
  //   const [, h, s, v ] = ((currentValue || '').match(/hsv\((\d\.\d+),(\d\.\d+),(\d\.\d+)\)/) || []);
  //   const { r, g, b } = HSVtoRGB(h && parseFloat(h) || this.h,
  //                                s && parseFloat(s) || this.s,
  //                                v && parseFloat(v) || this.v);
  //   return '#' + [r, g, b].map(n => ('0' + n.toString(16)).slice(-2)).join('');
  // },
  // toString() {
  //   return `hsv(${this.h},${this.s},${this.v})`;
  // }

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (h && s === undefined && v === undefined) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
    };
}

function RGBtoHSV() {
  var rr, gg, bb,
    r = arguments[0] / 255,
    g = arguments[1] / 255,
    b = arguments[2] / 255,
    h, s,
    v = Math.max(r, g, b),
    diff = v - Math.min(r, g, b),
    diffc = function(c){
      return (v - c) / 6 / diff + 1 / 2;
    };

  if (diff == 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(r);
    gg = diffc(g);
    bb = diffc(b);

    if (r === v) {
      h = bb - gg;
    } else if (g === v) {
      h = (1 / 3) + rr - bb;
    } else if (b === v) {
      h = (2 / 3) + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return { h, s, v };
}
/* eslint-enable */

export default Color;
