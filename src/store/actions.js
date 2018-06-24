import http from '@/js/http'

export default {
  test ({ commit }, param) {
    console.log(111111111,
      http.get('a').then(data => {
        console.log(33333, data)
      }).catch(msg => {
        console.log(msg)
      })
    )
    console.log(222222222, http('v'))
    console.log(param)
  }
}
