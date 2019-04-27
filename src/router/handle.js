import vrule from './verifyRules'
import config from './rule.json'


// router navigation guards
let routerHandle = (router) => {
  router.beforeEach((to, from, next) => {

    if (!vrule.whiteList(to)) {
      // next('/')
      return
    }
    // console.log('before to', to)
    // console.log('before from', from)
    // console.log('before next', typeof next)
    next()
  })

  router.beforeResolve((to, from, next) => {
    // console.log('resolve to', to)
    // console.log('resolve from', from)
    // console.log('resolve next', next)
    // next(false)
    next()
  })

  router.afterEach((to, from) => {
    // console.log('after to', to)
    // console.log('after from', from)
  })
}

// init router
export function handleInit (router) {
  if (!router) {
    console.error('Cannot found "vue.router" object, please checked use correctly of "vue.router".')
    return
  }

  routerHandle(router)
}

// Router the component accept parameter type is Function and not Object.
export function routeView (view = 'index') {
  if (!view) return {}
  return () => import(`@/views/${view}/index`)
}

// Read config to build simple routing information.
export function routeList () {
  const routeArr = config.routerList
  let simpleRouters = []

  // Construct the base object of the route.
  let baseRouteObj = (item, index) => {
    let tempPath = item.path
      ? item.path.toString().substring(0, 1) === '/'
        ? `${item.path}` : `/${item.path}`
      : `/${item.name}`
    let tempName = item.name ? `${item.name}` : `route${index}`
    return {
      path: tempPath,
      name: tempName,
      component: item.name ? routeView(item.name) : {},
      meta: {
        title: item.title || ''
      }
    }
  }

  routeArr.forEach((item, index) => {
    if (item.name) {
      simpleRouters.push(baseRouteObj(item, index))
    }
  })

  // If you need to use advanced routing behavior, use push to add your routing.
  simpleRouters.append = (routeRules = []) => {
    let appendList = simpleRouters.slice(0) || []
    routeRules.forEach((item, index) => {
      if (item.path || item.name) {
        appendList.push(Object.assign({}, baseRouteObj(item, index), item))
      }
    })
    return appendList
  }

  return simpleRouters 
}