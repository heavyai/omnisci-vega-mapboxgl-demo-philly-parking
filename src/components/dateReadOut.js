import dispatcher from "../common/dispatcher"
import { startDate, timeFormatterDR } from "../common/date-time-utils"

let dateReadOut = null

export function initDateReadOut() {
  dateReadOut = document.querySelector(".date-read-out")
  dateReadOut.innerHTML = timeFormatterDR(startDate)
}

export function updateDateReadOut(value) {
  dateReadOut.innerHTML = value
}

export default dateReadOut
