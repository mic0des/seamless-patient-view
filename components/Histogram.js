import React, { useState } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3" 

import Chart from "./chart/Chart" 
import Bars from "./chart/Bars"
import Axis from "./chart/Axis"
import Gradient from "./chart/Gradient"
import Tooltip from "./Tooltip"

import { useChartDimensions, accessorPropsType } from "./chart/utils"

const gradientColors = ["#316F9E", "rgb(226, 222, 243)"]
const Histogram = ({ data, xAccessor, label }) => {
  const gradientId = "Histogram-gradient"
  const [ref, dimensions] = useChartDimensions({
    marginBottom: 77,
  })
  const [displayObject, setDisplayObject] = useState(null)

  const numberOfThresholds = 9

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .range([0, (dimensions.boundedWidth === 0 ? 1223 : dimensions.boundedWidth)])
    .nice(numberOfThresholds)

  const binsGenerator = d3.bin()
    .domain(xScale.domain())
    .value(xAccessor)
    .thresholds(xScale.ticks(numberOfThresholds))

  const bins = binsGenerator(data)

  const yAccessor = d => d.length

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(bins, yAccessor)])
    .range([(dimensions.boundedHeight === 0 ? 383 : dimensions.boundedHeight), 0])
    .nice()

  const barPadding = 2

  const xAccessorScaled = d => { 
      return xScale(d.x0) + barPadding
  }
  const yAccessorScaled = d => yScale(yAccessor(d))
  const widthAccessorScaled = d => xScale(d.x1) - xScale(d.x0) - barPadding
  const heightAccessorScaled = d => dimensions.boundedHeight - yScale(yAccessor(d))
  const keyAccessor = (d, i) => i

  return (
    <div className="Histogram" ref={ref}>
      { 
        displayObject ? 
        <Tooltip displayObj={displayObject}/> 
         :
        null
      }
      <Chart dimensions={dimensions}>
        <defs>
          <Gradient
            id={gradientId}
            colors={gradientColors}
            x2="0"
            y2="100%"
          />
        </defs>
        <Axis
          dimensions={dimensions}
          dimension="x"
          scale={xScale}
          label={label}
        />
        <Axis
          dimensions={dimensions}
          dimension="y"
          scale={yScale}
          label="Count"
        />
        <Bars
          data={bins}
          keyAccessor={keyAccessor}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          widthAccessor={widthAccessorScaled}
          heightAccessor={heightAccessorScaled}
          onMouseOverCallback={obj => { 
            setDisplayObject(obj)
          }}
          onMouseOutCallback={obj => setDisplayObject(null)}
          style={{fill: `url(#${gradientId})`}}
        />
      </Chart>
    </div>

  )
}

Histogram.propTypes = {
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
}

Histogram.defaultProps = {
  xAccessor: d => d.x,
  yAccessor: d => d.y,
}

export default Histogram
