import axios from 'axios'
import config from '@/config.json'

const env = process.env.NODE_ENV
const conf = env === 'production' ? config.prd : config.dev
const baseUrl = conf.origin ? `${conf.rootpath}` : `${conf.url}${conf.rootpath}`

axios.defaults.baseURL = baseUrl
axios.defaults.timeout = (1000 * conf.timeout)

// the Axios use Hijack requset
axios.interceptors.request.use(
  request => {
    // console.log('Hijack requset: ', request)
    return request
  },
  err => {
    return Promise.reject(err)
  }
)

// the Axios use Hijack response
axios.interceptors.response.use(
  response => {
    // console.log('Hijack response: ', response)
    return response
  },
  err => {
    return Promise.reject(err)
  }
)

export default axios
