import vue from 'vue'
import vuex from 'vuex'

import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import { COMMIT, ACTION } from './handle.types'
import storeConf from './store.json'

// vue use vuex
vue.use(vuex)

// Construct independent the module, which is configure in store.json. 
const store = storeConf
for (const key in store) {
  if (store.hasOwnProperty(key)) {
    store[key]['namespaced'] = true
    store[key]['state'] = require(`./${key}/state`).default
    store[key]['actions'] = require(`./${key}/actions`).default
    store[key]['mutations'] = require(`./${key}/mutations`).default
    store[key]['getters'] = require(`./${key}/getters`).default
  }
}

// vuex init
export default new vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: store
})

// Register action logic typs to global environment.
vue.prototype.$commitTypes = COMMIT
vue.prototype.$actionTypes = ACTION

let recursivehModuleTypes = (item, key) => {
  let tempTypes = {}

  let forInSelf = (fisitem, fiskey) => {
    if (fiskey !== key) {
      tempTypes[fiskey] = {}
    }
    for (const keyname in fisitem) {
      if (!fisitem.hasOwnProperty(keyname)) {
        break
      }
      const childItem = fisitem[keyname]
      if (typeof childItem === 'object') {
        forInSelf(childItem, keyname, 2)
      }else if (typeof childItem === 'string') {
        if (fiskey !== key) {
          tempTypes[fiskey][keyname] = `${key}/${childItem}`
        }
      }
    }
  }
  forInSelf(item, key)
  return tempTypes
}

for (const key in store) {
  if (store.hasOwnProperty(key)) {
    const tempHT = require(`./${key}/handle.types`)
    vue.prototype[`$${key}Types`] = recursivehModuleTypes(tempHT, key)
  }
}

