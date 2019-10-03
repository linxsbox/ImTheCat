<template>
  <div class="cat-calendar-box" v-show="catShow" ref="calendar">
    <div class="cat-datetime-box">
      <cat-slide
        class="cat-date-year"
        :cat-x="false"
        :cat-move-y="0"
        @cat-y="retYaerPageY"
        v-if="listYear.length > 0"
        ref="dateyear"
      >
        <p
          v-for="(item, index) in listYear"
          :key="'_year_'+index"
          class="cat-item-year"
        >{{item || '&nbsp;'}}</p>
      </cat-slide>
      <cat-slide
        class="cat-date-month"
        :cat-x="false"
        :cat-move-y="20"
        @cat-y="retMonthPageY"
        v-if="listMonth.length > 0"
        ref="datemonth"
      >
        <p
          v-for="(item, index) in listMonth"
          :key="'_month_'+index"
          class="cat-item-month"
        >{{item || '&nbsp;'}}</p>
      </cat-slide>
      <cat-slide
        class="cat-date-day"
        :cat-x="false"
        :cat-default-y="0"
        @cat-y="retDayPageY"
        v-if="listDay.length > 0"
        ref="dateday"
      >
        <p
          v-for="(item, index) in listDay"
          :key="'_day_'+index"
          class="cat-item-day"
        >{{item || '&nbsp;'}}</p>
      </cat-slide>
    </div>
  </div>
</template>

<script>
import { Vue } from 'vue-property-decorator';
import CatSlide from '@/components/CatSlide';
export default Vue.extend({
  name: 'CatCalendar',

  data () {
    return {
      defFormate: 'yyyy-MM-dd HH:mm:ss',
      strFormate: 'yyyy-MM-dd HH:mm:ss',
      dateGroup: [],
      timeGroup: [],
      currentYear: 1900,
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
      boxChildYearHeight: 0, // 高度
      boxChildMonthHeight: 0, // 高度
      boxChildDayHeight: 0, // 高度
      // 移动位置
      moveListYear: 0,
      moveListMonth: 0,
      moveListDay: 0,
    };
  },
  components: {
    CatSlide,
  },
  props: {
    catShow: {
      type: Boolean,
      default: false,
    },
    catFormate: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss',
    },
    catBefore: {
      type: String,
    },
    catAfter: {
      type: String,
    },
    catDefValue: {
      type: String,
    },
    // CatZone:{
    //   type: String,
    //   default: function () {
    //     return;
    //   },
    // },
  },
  watch: {
    catFormate: (val, oldVal) => {
      console.log(val, oldVal);
    },
  },
  created () {
    console.log('created CatCalendar');
  },
  mounted () {
    this.boxWidth = this.$refs.calendar.offsetWidth;
    this.boxHeight = this.$refs.calendar.offsetHeight;

    this.initCatCalendar();
    this.formateDateTime(this.catFormate);
  },
  beforeUpdate () {
    this.$nextTick(() => {
      if (this.$refs.dateyear) {
        this.$refs.dateyear.catRefresh();
        console.log('$refs.dateyear', this.$refs.dateyear);
      }
      if (this.$refs.datemonth) {
        this.$refs.datemonth.catRefresh();
        console.log('$refs.datemonth', this.$refs.datemonth);
      }
      if (this.$refs.dateday) {
        this.$refs.dateday.catRefresh();
        console.log('$refs.dateday', this.$refs.dateday);
      }
    });
  },
  methods: {
    initCatCalendar () {
      const tempDate = new Date();
      this.currentYear = tempDate.getFullYear();
      this.currentMonth = tempDate.getMonth() + 1;
      this.currentDay = tempDate.getDate();

      console.log(this.currentYear, this.currentMonth, this.currentDay);

      this.updateYear();
      this.updateMonth();
      this.updateDay();
    },
    formateDateTime (val) {
      const [tempDate, tempTime] = val.split(' ');
      const [tempYear, tempMonth, tempDay] = ['yyyy', 'MM', 'dd'];
      const tempCctor = '-';
      // if cat-formate the value is not format the string
      if (
        !val ||
        (typeof tempDate === 'undefined' && typeof tempTime === 'undefined')
      ) {
        console.error(
          `[CatCalendar] Uncaught TypeError: :cat-formate='${val}' is not a unresolved type,
        Please use the correct time to format the string.
        E.q 'yyyy-MM-dd HH:mm:ss' or yyyy/MM/dd HH:mm:ss`.trim(),
        );
        {
          [tempDate, tempTime] = this.defFormate.split(' ');
        }
      }

      if (tempDate) {
        if (tempDate.indexOf('/') !== -1) {
          tempCctor = '/';
        }
        this.dateGroup = tempDate.split(tempCctor);
        tempDate.split(tempCctor);
      }

      if (tempTime) {
        tempTime.split(':');
        this.timeGroup = tempTime.split(':');
      }

      // console.log(tempDate, tempTime);
    },
    dateGroupType (type) {
      // console.log(type);
      const [tempYear, tempMonth, tempDay] = ['yyyy', 'MM', 'dd'];

      // if (type === tempYear) { }

      if (type === tempMonth) {
        const tempMonthArr = [];
        for (const index = 1; index <= 12; index++) {
          tempMonthArr.push(index);
        }
        return tempMonthArr;
      }

      if (type === tempDay) {
        // console.log(this.updateDay);
      }
    },
    updateYear () {
      const tempYear = new Date().getFullYear();
      const tempYearArr = [null, null];
      const tempSYear = tempYear - 10;
      for (const index = 0; index <= 20; index++) {
        tempYearArr.push(tempSYear + index);
      }
      tempYearArr.push(null, null);
      this.listYear = tempYearArr;
      console.log('listYear: ', this.listYear);

      this.$nextTick(() => {
        this.boxYearHeight = this.$refs.dateyear;
        const tempItemElem = document.querySelector('.cat-item-year');
        if (tempItemElem) {
          this.boxChildYearHeight = tempItemElem.offsetHeight;
        }
      });
    },
    updateMonth () {
      const tempMonth = new Date().getMonth() + 1;
      const tempMonthArr = [null, null];
      for (const index = 1; index <= 12; index++) {
        tempMonthArr.push(index);
      }
      tempMonthArr.push(null, null);
      this.listMonth = tempMonthArr;
      console.log('listMonth: ', this.listMonth);

      this.$nextTick(() => {
        this.boxMonthHeight = this.$refs.datemonth;
        const tempItemElem = document.querySelector('.cat-item-month');
        if (tempItemElem) {
          this.boxChildMonthHeight = tempItemElem.offsetHeight;
        }
      });
    },
    updateDay () {
      const tempDate = new Date(this.currentYear, this.currentMonth, 0);
      const tempDayArr = [null, null];
      for (
        const index = 1, lenDay = tempDate.getDate();
        index <= lenDay;
        index++
      ) {
        tempDayArr.push(index);
      }
      tempDayArr.push(null, null);
      this.listDay = tempDayArr;
      console.log('listDay: ', this.listDay);

      this.$nextTick(() => {
        this.boxDayHeight = this.$refs.dateday;
        // .$refs.chlidbox.offsetHeight;
        const tempItemElem = document.querySelector('.cat-item-day');
        if (tempItemElem) {
          this.boxChildDayHeight = tempItemElem.offsetHeight;
        }
      });
    },
    retYaerPageY (data) {
      const tempNum = (data / this.boxChildYearHeight).toFixed(0);
      const tempMove = tempNum * this.boxChildYearHeight;
      this.$refs.dateyear.catMove(0, tempMove);
      console.log(`Year: 第${Math.abs(tempNum)}个, 移动到: ${tempMove}`);

      console.log('retYaerPageY: ', data);
    },
    retMonthPageY (data) {
      const tempNum = (data / this.boxChildMonthHeight).toFixed(0);
      const tempMove = tempNum * this.boxChildMonthHeight;
      this.$refs.datemonth.catMove(0, tempMove);
      console.log(`Month: 第${Math.abs(tempNum)}个, 移动到: ${tempMove}`);

      console.log('retDayPageY: ', data);
    },
    retDayPageY (data) {
      const tempNum = (data / this.boxChildDayHeight).toFixed(0);
      const tempMove = tempNum * this.boxChildDayHeight;
      this.$refs.dateday.catMove(0, tempMove);
      console.log(`Day: 第${Math.abs(tempNum)}个, 移动到: ${tempMove}`);

      console.log('retDayPageY: ', data);
    },
  },
  // computed: {},
});
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
  padding: 0.5em;
  margin: 0;
  line-height: 1.5;
  text-align: center;
  vertical-align: top;
}
</style>
