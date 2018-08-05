export default {
  test (state, param) {
    setTimeout(() => {
      state.test = param
    }, 1000)
  }
}
