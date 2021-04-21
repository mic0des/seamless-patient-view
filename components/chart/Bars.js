import React from "react"
import PropTypes from "prop-types"
import * as d3 from 'd3'
import { accessorPropsType, callAccessor } from "./utils";

const Bars = ({ data, keyAccessor, xAccessor, yAccessor, widthAccessor, heightAccessor, onMouseOverCallback, onMouseOutCallback, ...props }) => {
  return (<>
    {data.map((d, i) => {
      return <rect {...props}
        className="Bars__rect"
        key={keyAccessor(d, i)}
        x={callAccessor(xAccessor, d, i) + 20}
        y={callAccessor(yAccessor, d, i)}
        width={d3.max([callAccessor(widthAccessor, d, i), 0])}
        height={d3.max([callAccessor(heightAccessor, d, i), 0])}
        onMouseOver={() => {
          onMouseOverCallback({dimensions: {left: (callAccessor(xAccessor, d, i) / 16) + ((d3.max([callAccessor(widthAccessor, d, i), 0]) / 16)/2), top: (callAccessor(yAccessor, d, i) / 16)}, label: `${d3.min(d.map(d => d.age))} - ${d3.max(d.map(d => d.age))}`})
        }}
        onMouseOut={() => {
          onMouseOutCallback(null)
        }}
      />
    })}
  </>)
}

Bars.propTypes = {
  data: PropTypes.array,
  keyAccessor: accessorPropsType,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  widthAccessor: accessorPropsType,
  heightAccessor: accessorPropsType,
}

Bars.defaultProps = {
}

export default Bars