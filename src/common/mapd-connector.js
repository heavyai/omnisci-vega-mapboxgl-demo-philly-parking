import MapDCon from '@mapd/connector/dist/browser-connector'

const connector = new window.MapdCon()
let savedConnection = null

function establishConnection(config) {
  return new Promise((resolve, reject) => {
    connector
      .host(config.host)
      .port(config.port)
      .dbName(config.database)
      .user(config.username)
      .password(config.password)
      .connect((error, con) => {
        if (error) {
          reject(error)
        } else if (con) {
          console.log(con)
          resolve(con)
        }
      })
  })
}

async function getConnection(config) {
  try {
    const result = await establishConnection(config)
    return result
  } catch(error) {
    return error
  }
}

async function getConnectionStatus(con) {
  try {
    let result = await con.getStatusAsync()
    return result
  } catch(error) {
    return error
  }
}

// store the connection once we've established it
function saveConnectionObj(con) {
  savedConnection = con
}

async function renderVega (vegaSpec, vegaOptions = {returnTiming: true}) {
  let promise = new Promise((resolve, reject) => {
    savedConnection.renderVega(1, JSON.stringify(vegaSpec), vegaOptions, function(error, result) {
      if (error) {
        reject(error.message)
      } else {
        console.log(`
            Execution Time: ${result.execution_time_ms}
            Render Time: ${result.render_time_ms}
            Total Time: ${result.total_time_ms}
        `)
        var blobUrl = `data:image/png;base64,${result.image}`
        resolve(blobUrl)
      }
    })
  })
  let result = await promise
  return result
}

export {
  getConnection,
  getConnectionStatus,
  saveConnectionObj,
  renderVega
}
