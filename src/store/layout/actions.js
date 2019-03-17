import { ACTION as type } from './handle.types'

// This Actions is handle with async tasks.
export default {
  [type.SET_TEST_DISPATCH] ({ state }, params) {
    state.test.dispatch = params
  }
}
