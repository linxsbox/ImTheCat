import vue from 'vue'
import vuex from 'vuex'

import actions from './components/actions'
import mutations from './components/mutations'
import state from './components/state'
import getter from './components/getter'

import alactions from './actions'
import almutations from './mutations'
import alstate from './state'
import algetter from './getter'

// vue use vuex
vue.use(vuex)

// components vuex stroe
let component = {
  actions: actions,
  mutations: mutations,
  state: state,
  getters: getter
}

// action logic vuex stroe
let actionLogic = {
  actions: alactions,
  mutations: almutations,
  state: alstate,
  getters: algetter
}

// vuex init
export default new vuex.Store({
  modules: {
    component,
    actionLogic
  }
})
