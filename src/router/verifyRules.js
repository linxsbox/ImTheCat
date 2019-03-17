import config from '@/config/router.json'

const CONF_RULE = config.routerRule
// The base router white list.
const WHITELIST = CONF_RULE.whitelist
// The other whitelist rules.
const OTHER_WHITELIST = CONF_RULE.other

const WHITELIST_LENGHT = WHITELIST.length + OTHER_WHITELIST.length

// merge all whitelist rule.
let allWhitelist = []
// and checked it, don't repeat merge whitelist array.
let updatedWhitelist = () => {
  if (allWhitelist < WHITELIST_LENGHT) {
    allWhitelist = WHITELIST.concat(OTHER_WHITELIST)
  }
}
updatedWhitelist()

// Verification whitelist
let whiteList = (to = {}) => {
  if (!to.path) return false
  if (allWhitelist.indexOf(to.path) === -1) return false
  return true
}

// Verification tokens

let verifyToken = () => {

}

export default {
  whiteList,
  updatedWhitelist
}