import throttle from "lodash.throttle"

import dispatcher from "../common/dispatcher"
import {
  timeParser,
  timeFormatter,
  startDate,
  endDate,
  numberMonths,
  timeScale
} from "../common/date-time-utils"

let slider = null
const WAIT_TIME_MS = 100

function handleInput(event) {
  //for debugging
  console.log(timeFormatter(timeScale.invert(event.target.value)))
  dispatcher.call(
    "sliderInput",
    null,
    timeScale.invert(event.target.value)
  )
}

export function updateSliderPos(value) {
  slider.value = value.toString()
  dispatcher.call(
    "sliderInput",
    null,
    timeScale.invert(value)
  )
}

export function getValue() {
  return Number(slider.value)
}

function initSlider() {
  slider = document.querySelector("input.slider")
  slider.setAttribute("max", numberMonths)
  slider.addEventListener("input", throttle(handleInput, WAIT_TIME_MS, { leading: true }))
  return slider
}

export default initSlider
