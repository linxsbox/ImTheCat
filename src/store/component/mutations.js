import { COMMIT as type } from './handle.types'

// This Mutations is handle with sync tasks.
export default {
  [type.SET_TEST_COMMIT] (state, params) {
    state.test.commit = params
  }
}

