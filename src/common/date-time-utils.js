import { scaleTime } from "d3-scale"
import { timeParse, timeFormat } from "d3-time-format"
import { timeMonth, timeDay } from "d3-time"

// https://github.com/d3/d3-time-format#locale_format
const parseString = "%B %d %Y"
const formatString = "%Y-%m-01 00:00:00"
const formatStringDR = "%B %Y"

export const timeParser = timeParse(parseString)
export const timeFormatter = timeFormat(formatString)
export const timeFormatterDR = timeFormat(formatStringDR)

export const startDate = timeParser("January 01 2012")
export const endDate = timeParser("December 31 2017")

export const numberMonths = timeMonth.count(startDate, endDate)

export const timeScale = scaleTime()
  .range([0, numberMonths])
  .domain([startDate, endDate])
