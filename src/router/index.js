import Vue from 'vue'
import router from 'vue-router'
import config from './rule.json'
import {handleInit, routeList} from './handle'

Vue.use(router)

// If you need to use advanced routing behavior, use push to add your routing.
// use routerList().append([{ // your route rule }])
const newRoutes = routeList()

// If you need to use lazy loading of route.
// routeView( filename ) // The read path is `@/views/{filename}/index`

let routers = new router({
  // router mode: hash | history | abstract
  // vue-router https://router.vuejs.org/zh/api/#mode
  mode: config.routerMode,
  routes: newRoutes
})

handleInit(routers)

export default routers