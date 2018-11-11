import vrule from './verifyRules'

let init = (router) => {
  if (!router) {
    console.error('Cannot found "vue.router" object, please checked use correctly of "vue.router".')
    return
  }

  routerHandle(router)
}

let routerHandle = (router) => {
  router.beforeEach((to, from, next) => {
    
    if (!vrule.whiteList(to)) {
      next('/')
      return
    }
    console.log('before to', to)
    console.log('before from', from)
    console.log('before next', typeof next)
    next()
  })

  router.beforeResolve((to, from, next) => {
    console.log('resolve to', to)
    console.log('resolve from', from)
    console.log('resolve next', next)
    // next(false)
    next()
  })

  router.afterEach((to, from) => {
    console.log('after to', to)
    console.log('after from', from)
  })
}

export default {init}