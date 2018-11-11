// The base router white list
let WHTIELIST = ['/', '/index', '/home', '/login', '/test']

// Verification white listx
let whiteList = (to = {}) => {
  if (!to.path) return false
  if (WHTIELIST.indexOf(to.path) === -1) return false
  return true
}

// tokens 

export default {
  whiteList
}