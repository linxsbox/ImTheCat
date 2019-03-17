/**
 * Storage v1.0.0
 * (c) 2018 Linxs
 * license MIT
 */
// import sidb from './storageDB'
'use strict'

const local = window.localStorage
const session = window.sessionStorage
const cookie = document.cookie

const WebLocal = function webLocal() {}
const WebSession = function webSession() {}
const WebCookies = function webCookies() {}
// let StorageDB = sidb
// StorageDB

let cryptkeys = []
let cryptmaps = {l:[],s:[],c:[]}

// Web local get
WebLocal.prototype.get = (key) => {
  let tempGetItem = local.getItem(key)
  if (!tempGetItem || tempGetItem === null) return
  return isEncrypt(tempGetItem) ?
    valueParse(tempGetItem) : valueDecrypt(tempGetItem)
}

/**
 * Web local get
 * @param {String} key
 * @param {String} value
 * @param {Object} options
 * @return {Boolean}
 */
WebLocal.prototype.set = function (key, value, options = {
  expires: 0,
  encrypt: false
}) {
  // let args = arguments
  // if (args.length < 2) {
  //   storageError('local')
  //   return false
  // }

  key = toStringify(key)
  value = toStringify(value)

  local.setItem(key, options.encrypt ? valueEncrypt(value) : value)
  if (options.encrypt) {
    if (cryptkeys.indexOf(key) === -1){
      cryptkeys.push(key)
    }
    cryptmaps.l.push({key: value})
  }
  

  if (options.expires > 0) { key }
  return true
}

// Web session get
WebSession.prototype.get = function get(key) {
  let tempGetItem = session.getItem(key)
  if (!tempGetItem || tempGetItem === null) return
  return isEncrypt(tempGetItem) ?
    valueParse(tempGetItem) : valueDecrypt(tempGetItem)
}

/**
 * Web session set
 * @param {String} key
 * @param {String} value
 * @param {Boolean} encrypt
 * @return {Boolean}
 */
WebSession.prototype.set = function (key = '', value, encrypt = false) {
  let args = arguments
  if (args.length < 2) {
    storageError('session')
    return false
  }
  if ((!key && key === null) || (!value && value === null)) return false
  session.setItem(key, encrypt ? valueEncrypt(value) : toStringify(value))
  return true
}

WebCookies.prototype.get = (key) => {
  key
  // cookie
}

WebCookies.prototype.set = function (key, value,
  options = {
    encrypt: false,
    expires: 0,
    path: '',
    secure: '',
    samesize: '',
    domain: ''
  }) {
  let args = arguments
  if (args.length < 2) {
    storageError('cookies')
    return false
  }
  if (options.expires > 0) { cookie }
}

// will be 'value' stringify
function toStringify (val) {
  return val === null ?
    'null' : val === undefined ?
    'undefined' : typeof val === 'string' ?
    val : typeof val === 'object' ? 
    Array.isArray(val) ? `[${val + ''}]` : JSON.stringify(val):
    val + ''
}

function valueParse(val) {
  let tempLen = val.length
  let tempLenEnd = tempLen - 1
  let strMatch = (val = '', strArr = []) => {
    return val.indexOf(strArr[0]) === 0 && val.indexOf(strArr[1]) === tempLenEnd
  }

  if (strMatch(val, ['{', '}'])) {
    return JSON.parse(val)
  } else if (strMatch(val, ['[', ']'])) {
    return val.substr(1, tempLenEnd - 1).split(',')
  } else {
    return val
  }
}

function valueEncrypt(val) {
  return val
}

function valueDecrypt(val) {
  return val
}

function isEncrypt(val) {
  val
  return true
}

function storageError(fnName) {
  console.error(`[Error] "set" on "${fnName}": At least 2 arguments required, but only 1 present.`)
}

const install = function (Vue, opts = {}) {
  opts
  Vue.prototype.$session = new WebSession()
  Vue.prototype.$local = new WebLocal()
  Vue.prototype.$cookies = new WebCookies()
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}