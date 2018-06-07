import { interval } from "d3-timer"
import { updateSliderPos, getValue } from "./slider"
import { numberMonths } from "../common/date-time-utils"

let playPauseBtn = null
let timerInstance = null
let isPlaying = false
let sliderValue = 0

const ONE_SEC = 1000
const totalTime = 10 * 10 * ONE_SEC
const delay = totalTime / numberMonths

function stop () {
  isPlaying = false
  timerInstance.stop()
  playPauseBtn.innerHTML = "PLAY"
}

function play () {
  if (timerInstance) {
    timerInstance = null
  }

  isPlaying = true
  playPauseBtn.innerHTML = "PAUSE"
  sliderValue = getValue()

  timerInstance = interval(elapsed => {
    //console.log(elapsed)
    if (!isPlaying) {
      stop()
    } else if (sliderValue > numberMonths) {
      sliderValue = 0
      updateSliderPos(sliderValue)
    } else {
      sliderValue = sliderValue + 1
      updateSliderPos(sliderValue)
    }
  }, delay)
}

function handleClick (event) {
  event.preventDefault()
  if (isPlaying) {
    stop()
  } else {
    play()
  }
}

function initplayPauseBtn () {
  playPauseBtn = document.querySelector("button.play-pause")
  playPauseBtn.addEventListener("click", handleClick)
}

export default initplayPauseBtn
