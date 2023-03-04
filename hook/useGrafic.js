import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

export const useGrafic = (renderChartFn, dependencies) => {
  const ref = useRef()

  useEffect(() => {
    renderChartFn(d3.select(ref.current))
    return () => {}
  }, dependencies)

  return ref
}
