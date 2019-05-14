import 'mapbox-gl/dist/mapbox-gl.css'
import './styles.css'

import {serverInfo} from './common/config'
import updateVega from './common/updateVega'
import {getConnection, getConnectionStatus, saveConnectionObj} from "./common/mapd-connector"
import {initMap} from './components/map'
import initSlider from './components/slider'
import {initDateReadOut} from './components/dateReadOut'
import initPlayPause from './components/playPauseControl'

import mapdLogo from './images/mapd-logo.png';


document.addEventListener("DOMContentLoaded", main)

function main() {
  // render markup for our UI
  document.querySelector("#app").innerHTML = `
    <div class="header">
      <img class="logo" height='75px' width='75px' />
      <div class="title-slider">
        <h2 class="title">Parking Violations by Month: Philadelphia</h2>
        <div class="slider-controls">
          <input class='slider' type='range' min='0' max='11' step='1' value='0' />
          <button class="play-pause">PLAY</button>
          <label class='date-read-out'></label>
        </div>
      </div>
      </div>
    </div>
    <div id="map"></div>`

  const logoImg = document.querySelector('img.logo');
  logoImg.src = mapdLogo;

  // create the mapboxgl map
  const map = initMap()

  // set up the slider
  const slider = initSlider()

  // set up date read out
  initDateReadOut()

  // set up the play pause button
  initPlayPause()

  // connect to the mapd backend
  getConnection(serverInfo)
    .then(con => {
      // save the connection object so we can use it later
      saveConnectionObj(con)
      // check the connection status
      return getConnectionStatus(con)
    })
    .then(status => {
      if (status && status[0] && status[0].rendering_enabled) {
        // render the vega and add it to the map
        updateVega(map)
      } else {
        // no BE rendering :(
        throw Error("backend rendering is not enabled")
      }
    })
    .catch(error => throw error)
}
