import * as type from './handle.types'

export default {
  [type.COMMIT.GET_TEST_COMMIT]: (state) => state.test.commit,
  [type.ACTION.GET_TEST_DISPATCH]: (state) => state.test.dispatch
}
