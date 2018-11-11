import http from '@/core/http/index'

let tempNewArticles = {}
let tempHotArticles = {}
let tempMyFootPrint = {}
let tempMyAlbum = {}

function newArticles(resolve, reject, params) {
  http('/static/data/data.json', {
      method: 'get'
    })
    .then(r => {
      console.log(r.data)
      resolve(r.data)
    })
    .catch(err => {
      reject(err)
    })
}

function hotArticles(resolve, rejects, params) {

}

function myAlbum(resolve, rejects, params) {

}

function myFootPrint(resolve, rejects, params) {

}

export const fnEnum = {
  ARTC_NEW: 'newArticles',
  ARTC_HOT: 'hotArticles',
  MY_ALBUM: 'myAlbum',
  MY_FOOTPRINT: 'myFootPrint'
}

export let fnDispatch = (key = '', params) => {
  return new Promise((resolve, reject) => {
    switch (key) {
      case fnEnum.ARTC_NEW:
        newArticles(resolve, reject, params)
        break
      case fnEnum.ARTC_HOT:
        hotArticles(resolve, reject, params)
        break
      case fnEnum.MY_ALBUM:
        myAlbum(resolve, reject, params)
        break
      case fnEnum.MY_FOOTPRINT:
        myFootPrint(resolve, reject, params)
        break
      default:
        // reject()
        break
    }
  })
}

export const getDatas = {
  newArticles: tempNewArticles,
  hotArticles: tempHotArticles,
  myAlbum: tempMyFootPrint,
  myFootPrint: tempMyAlbum
}

export function test(params) {
  http.utils(params)
  // http('/css/catui.docs.min.css', {
  //   method: 'get'
  // })
  //   .then(data => {
  //     // console.log(1, data)
  //   })
  //   .catch()
}