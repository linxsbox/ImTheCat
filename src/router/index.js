import Vue from 'vue'
import router from 'vue-router'
import config from '@/config.json'
import handle from './handle'

Vue.use(router)

// Router the component accept parameter type is Function and not Object
const view = (view) => {
  return () => import(`@/views/${view}/index`)
}

let routers = new router({
  // router mode: hash, history, abstract
  // vue-router https://router.vuejs.org/zh/api/#mode
  mode: config.routerMode,
  routes: [{
      path: '/',
      name: 'home',
      component: view('home'),
      meta: {
        title: ''
      }
    },
    {
      path: '/test',
      name: 'test',
      component: view('test'),
      meta: {
        title: ''
      }
    }
  ]
})

handle.init(routers)



export default routers