import config from './config.json'

const env = process.env.NODE_ENV

let tempUrl = {
  url: '',
  post: '',
  rootpath: '',
  timeout: '10'
}

if (env === 'production') {
  let tempConf = config.prd
  tempUrl.url = !tempConf.url ? '127.0.0.1' : tempConf.url
  tempUrl.post = !tempConf.post ? `:${window.location.port}` : `:${tempConf.post}`
  tempUrl.timeout = tempConf.timeout
} else {
  let tempConf = config.dev
  tempUrl.url = !tempConf.url ? 'localhost' : tempConf.url
  tempUrl.post = !tempConf.post ? `:${window.location.port}` : `:${tempConf.post}`
  tempUrl.timeout = tempConf.timeout
}

const conf = tempUrl

const baseUrl = `${window.location.protocol}//${conf.url}${conf.post}${conf.rootpath}`

export default {
  baseUrl: baseUrl,
  timeout: conf.timeout
}
