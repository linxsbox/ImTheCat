import axios from 'axios'

let _http = (param) => new Promise(
  (resolve, reject) => {
    axios(param).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })

Object.assign(_http, axios)

let config = {
  timeout: 0
}
Object.assign(_http, config)

export default _http
