<template>
  <div class="cat-calendar-box" v-show="catShow" ref="calendar">
    <div class="cat-datetime-box">
      <cat-slide class="cat-date-year"
        :cat-x="false" :cat-move-y="0" @cat-y="retPageY"
        v-if="listYear.length > 0"
        ref="dateyear">
        <p v-for="(item, index) in listYear" :key="'_year_'+index" class="cat-item-year"></p>
      </cat-slide>
      <cat-slide class="cat-date-month"
        :cat-x="false" :cat-move-y="0" @cat-y="retPageY"
        v-if="listMonth.length > 0"
        ref="datemonth">
        <p v-for="(item, index) in listMonth" :key="'_month_'+index" class="cat-item-month"></p>
      </cat-slide>
      <cat-slide class="cat-date-day"
        :cat-x="false" :cat-move-y="0" @cat-y="retPageY"
        v-if="listDay.length > 0"
        ref="dateday">
        <p v-for="(item, index) in listDay" :key="'_day_'+index" class="cat-item-day">{{item}}</p>
      </cat-slide>
    </div>
    <div @click="gohere">GO</div>
  </div>
</template>

<script>
import CatSlide from "@/components/CatSlide"

export default {
  name: 'CatCalendar',

  data() {
    return {
      defFormate: 'yyyy-MM-dd HH:mm:ss',
      strFormate: 'yyyy-MM-dd HH:mm:ss',
      dateGroup: [],
      timeGroup: [],
      currentYear: 1970,
      currentMonth: 1,
      currentDay: 1,
      listYear: [],
      listMonth: [],
      listDay: [],

      // 盒子宽高 用于计算滑动位置
      boxWidth: 0, // 宽度
      // 父盒子高度
      boxYearHeight: 0, // 高度
      boxMonthHeight: 0, // 高度
      boxDayHeight: 0, // 高度
      // 子盒子高度
      boxYearHeight: 0, // 高度
      boxMonthHeight: 0, // 高度
      boxDayHeight: 0, // 高度
    }
  },
  components: {
    CatSlide
  },
  props: {
    catShow: {
      type: Boolean,
      default: false
    },
    catFormate: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    },
    catBefore: {
      type: String
    },
    catAfter: {
      type: String
    },
    catDefValue: {
      type: String
    }
    // CatZone:{
    //   type: String,
    //   default: function () {
    //     return
    //   }
    // },
  },
  watch: {
    catFormate: function(val, oldVal) {
      console.log(val, oldVal)
    }
  },
  created() {},
  mounted() {
    this.boxWidth = this.$refs.calendar.offsetWidth
    this.boxHeight = this.$refs.calendar.offsetHeight

    this.initCatCalendar()
    this.formateDateTime(this.catFormate)
  },
  beforeUpdate () {
    this.$nextTick(()=>{
      if (this.$refs.dateyear) {
        this.$refs.dateyear.catRefresh
      }
      if (this.$refs.datemonth) {
        this.$refs.datemonth.catRefresh
      }
      if (this.$refs.dateday) {
        this.$refs.dateday.catRefresh
      }
    })
  },
  methods: {
    initCatCalendar () {
      let tempDate = new Date()
      this.currentYear = tempDate.getFullYear()
      this.currentMonth = tempDate.getMonth() + 1
      this.currentDay = tempDate.getDate()

      console.log(this.currentYear, this.currentMonth, this.currentDay)

      this.updateYear()
      this.updateMonth()
      this.updateDay()
    },
    formateDateTime (val) {
      let [tempDate, tempTime] = val.split(' ')
      let [tempYear, tempMonth, tempDay] = ['yyyy', 'MM', 'dd']
      let tempCctor = '-'
      // if cat-formate the value is not format the string
      if (!val || (typeof tempDate === 'undefined' && typeof tempTime === 'undefined')) {
        console.error(
        `[CatCalendar] Uncaught TypeError: :cat-formate='${val}' is not a unresolved type,
        Please use the correct time to format the string.
        E.q 'yyyy-MM-dd HH:mm:ss' or yyyy/MM/dd HH:mm:ss`.trim()
        )
        {[tempDate, tempTime]  = this.defFormate.split(' ')}
      }

      if (tempDate) {
        if (tempDate.indexOf('/') !== -1) {
          tempCctor = '/'
        }
        this.dateGroup = tempDate.split(tempCctor)
        tempDate.split(tempCctor)
      }

      if (tempTime) {
        tempTime.split(':')
        this.timeGroup = tempTime.split(':')
      }

      // console.log(tempDate, tempTime)
    },
    dateGroupType (type) {
      // console.log(type)
      let [tempYear, tempMonth, tempDay] = ['yyyy', 'MM', 'dd']

      if (type === tempYear) {
        
      }

      if (type === tempMonth) {
        let tempMonthArr = []
        for (let index = 1; index <= 12; index++) {
          tempMonthArr.push(index)
        }
        return tempMonthArr
      }

      if (type === tempDay) {
        // console.log(this.updateDay)
      }
    },
    updateYear () {
      let tempElem = document.querySelector('.cat-item-year')
      if (tempElem) {
        boxYearHeight
      }
    },
    updateMonth () {
      let tempElem = document.querySelector('.cat-item-month')
      if (tempElem) {
        boxMonthHeight
      }
    },
    updateDay () {
      let tempDate = new Date(this.currentYear, this.currentMonth, 0)
      let tempDayArr = []
      for (let index = 1, lenDay = tempDate.getDate(); index <= lenDay; index++) {
        tempDayArr.push(index)
      }
      this.listDay = tempDayArr

      this.$nextTick(() => {
        this.boxDayHeight = this.$refs.dateday.$refs.chlidbox.offsetHeight
        let tempItemElem = document.querySelector('.cat-item-day')
        if (tempItemElem) {
          
        }
        console.log(tempItemElem.offsetHeight)
      })

    },
    retPageY (data) {
      console.log(data)
    },
    gohere () {

    }
  },
  computed: {}
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .cat-datetime-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .cat-datetime-box [class*="cat-date-"] {
    display: inline-block;
    width: 30%;
    padding: 0;
    margin: 0;
    vertical-align: top;
    overflow: hidden;
  }
  .cat-datetime-box [class*="cat-item-"] {
    padding: .5em;
    margin: 0;
    line-height: 1.5;
    text-align: center;
    vertical-align: top;
  }
</style>
