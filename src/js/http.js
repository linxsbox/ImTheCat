import axios from 'axios'
import curl from './curl'

const baseUrl = curl.baseUrl

axios.defaults.baseURL = baseUrl
axios.defaults.timeout = (1000 * curl.timeout)

// the Axios use Hijack requset
axios.interceptors.request.use(
  request => {
    console.log(request)
    return request
  },
  err => {
    console.log(err)
    return Promise.reject(err)
  }
)

// the Axios use Hijack response
axios.interceptors.response.use(
  response => {
    console.log(response)
    return response
  },
  err => {
    console.log(err)
    Promise.reject(err)
  }
)

export default axios
