import echarts from 'echarts'
import chinaJson from './china'
import cityCoordinates from './cityCoordinates'

const CITY_LIST = cityCoordinates['body']
let allFootPrintList = []
let queryLock = 0

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
  // visualMap: {
	// 	type: 'continuous', // 连续型
	// 	min: 0,       		// 值域最小值，必须参数
	// 	max: 200,			// 值域最大值，必须参数
	// 	calculable: true,	// 是否启用值域漫游
	// 	inRange: {
  //     // 指定数值从低到高时的颜色变化
  //     color: ['#50a3ba','#eac736','#d94e5d']
  //   },
	// 	textStyle: {
	// 		color: '#fff'	// 值域控件的文本颜色
	// 	}
  // },
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
  if (!tempElem) {
    console.error(`Emmm…… Cannot find element '${elem}' in document unable to draw map.`)
    return
  }

  if (allFootPrintList.length < 1) {
    myfootprint()
  }

  echart = echarts.init(tempElem) // init echarts
  mapOpts.series[0].data = allFootPrintList || []
  echart.setOption(mapOpts)
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

  let tempResults = []

  tempCityList.forEach(item => {
    searchCity(item).filter(state => {
      state.forEach(citem => {
        tempResults.push({
          name: citem.name,
          // 经度，纬度，值
          value: [citem.lng, citem.lat, 100],
        })
      })

      // console.log(state)
      return state.length > 0
    })
  })

  if (allFootPrintList.length < 1 && tempResults.length >= 1) {
    allFootPrintList = tempResults
  }
}

let searchCity = (cityName = '') => {
  let results = []

  let tempQeuryCity = (key) => {
    return (state) => {
      return state.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
    }
  }
  CITY_LIST.forEach(item => {
    let tempArr = item.children.filter(tempQeuryCity(cityName))
    if (tempArr.length > 0) {
      results.push(tempArr)
      // console.log(tempArr)
    }
  })

  return results.length > 0 ? results : []
}

let qeuryCity = (cityName = '') => {

  let tempResults = searchCity(cityName)
  let tempResult = null

  if (tempResults[0].length > 0) {
    const item = tempResults[0][0]
    tempResult = {
      name: item.name,
      value: [item.lng, item.lat, 500]
    }
  }
  mapOpts.series[0].data = !cityName && tempResults.length <= 0 ? allFootPrintList : tempResult || []
console.log(mapOpts)

  clearTimeout(queryLock)

  queryLock = setTimeout(() => {
    debugger
    echart.setOption(mapOpts)
    clearTimeout(queryLock)
  }, 300)
}

// 国内 => ['玉林', '贵港', '柳州', '南宁', '桂林', '厦门', '杭州', '上海', '苏州', '无锡', '南京', '扬州', '青岛', '莱西',
//  '北京', '西安', '兰州', '张掖', '敦煌', '嘉峪关', '成都', '重庆', '乐山', '雅安', '泸定', '康定']
// 国外
export default {
  qeuryCity: qeuryCity,
  drawMap: drawMap
}
