import echarts from 'echarts'
import chinaJson from './china'

export default (elem) => {
  echarts.registerMap('china', chinaJson)

  let map = echarts.init(document.querySelector(elem))

  let opts = {
    geo: {
      map: 'china',
      label: {
        emphasis: {
          show: true
        }
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#abcdef',
          borderColor: '#fff'
        },
        emphasis: {
          areaColor: '#53a2dc',
          borderColor: '#000'
        }
      }
    }
  }
  map.setOption(opts)
}
