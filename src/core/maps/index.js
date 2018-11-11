import echarts from 'echarts'
import chinaJson from './china'
import cityCoordinates from './cityCoordinates'

const CITY_LIST = cityCoordinates['body']

// register map, type is china.
echarts.registerMap('china', chinaJson)

let echart = null
let mapOpts = {
  geo: {
    map: 'china', // map type is china
    label: { // the label show the style
      emphasis: { // label emphasis to show
        show: true,
        color: '#333'
      }
    },
    roam: true, // the roam is true
    itemStyle: { // the style for each item
      normal: { // set default normal ths style
        areaColor: '#abcdef',
        borderColor: '#f5f5f5'
      },
      emphasis: { // set emphasis for each item
        areaColor: '#53a2dc',
        borderColor: '#333'
      }
    }
  },
  series: [ // series data
    {
      name: '我的足迹',
      type: 'scatter', // data type is 'scatter'
      coordinateSystem: 'geo', // the series coordina system type
      data: []
    }
  ]
}

let drawMap = (elem = '') => {
  let tempElem = document.querySelector(elem)
  // if (!tempElem) {
  //   console.error(`Emmm…… Cannot find element '${elem}' in document unable to draw map.`)
  //   return
  // }
  echart = echarts.init(tempElem) // init echarts
  mapOpts.series.data = []
  echart.setOption(mapOpts)
  myfootprint()
}

let myfootprint = () => {
  // 国内
  let tempCityList = [
    '玉林', '贵港', '柳州', '南宁', '桂林',
    '厦门', '杭州', '上海', '苏州',
    '无锡', '南京', '扬州',
    '青岛', '莱西', '北京', '西安',
    '兰州', '张掖', '敦煌', '嘉峪关',
    '成都', '重庆', '乐山', '雅安',
    '泸定', '康定', '新都桥']

  // let tempResults = []

  tempCityList.forEach(item => {
    searchCity(item).filter(state => {
      return state.length > 0
    })
  })
}

let searchCity = (cityName = '') => {
  let results = []

  let qeuryCity = (key) => {
    return (state) => {
      return state.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
    }
  }
  CITY_LIST.forEach(item => {
    let tempArr = item.children.filter(qeuryCity(cityName))
    if (tempArr.length > 0) {
      // results.push(tempArr)
      // console.log(tempArr)
    }
  })

  return results.length > 0 ? results : []
}
// 国内 => ['玉林', '贵港', '柳州', '南宁', '桂林', '厦门', '杭州', '上海', '苏州', '无锡', '南京', '扬州', '青岛', '莱西',
//  '北京', '西安', '兰州', '张掖', '敦煌', '嘉峪关', '成都', '重庆', '乐山', '雅安', '泸定', '康定']
// 国外
export default {
  searchCity: searchCity,
  drawMap: drawMap
}
