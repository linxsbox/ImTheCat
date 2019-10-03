<template>
  <div class="cat-slide-box"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
    ref="slidebox">
    <div class="cat-slide-item" ref="chlidbox"
    :style="touchStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { Vue } from 'vue-property-decorator';
export default Vue.extend({
  name: 'CatSlide',

  data () {
    return {
      // 盒子边界
      boxWidth: 0, // 可溢出最大边界宽度x
      boxHeight: 0, // 可溢出最大边界高度y
      chlidBoxWidth: 0, // 盒子子模型宽度
      chlidBoxHeight: 0, // 盒子子模型高度
      slideBoxWidth: 0, // 盒子父模型宽度
      slideBoxHeight: 0, // 盒子父模型高度
      // 触摸位移
      touchStartX: 0, // 开始触摸点坐标x
      touchStartY: 0, // 开始触摸点坐标y
      touchEndX: 0, // 结束触摸点坐标x
      touchEndY: 0, // 结束触摸点坐标y
      touchDifferX: 0, // x位移差
      touchDifferY: 0, // y位移差
      initTouchX: 0, // 初始位置x
      initTouchY: 0, // 初始位置y
      lastTouchX: 0, // 最后位置x
      lastTouchY: 0, // 最后位置y
      touchStyle: { transform: 'translate3d(0, 0, 0)' },
      // 惯性
      speedX: 0, // 加速度
      speedY: 0, // 加速度
      time: 0, // 时间差
      startTime: 0, // 开始时间
      lastTime: 0, // 结束时间
      // 拉力
      maxPullinX: 0, // 最大横向拉力系数
      maxPullinY: 0, // 最大纵向拉力系数
      // 位置锁
      lockX: true,
      lockY: true,
    };
  },
  props: {
    catX: {
      type: Boolean,
      default: true,
    },
    catY: {
      type: Boolean,
      default: true,
    },
    catDefaultX: {
      type: Number,
      default: 0,
    },
    catDefaultY: {
      type: Number,
      default: 0,
    },
  },
  created () {
    console.log('created CatSlide');
  },
  mounted () {
    // 初始化
    this.initBox();

    // 设置默认位置 或 初始化位置
    if (this.catX && !this.catY) {
      this.lastTouchX = this.catDefaultX;
      this.touchStyle = {transform: `translate3d(${this.catDefaultX}px, 0px, 0px)`};
    }
    if (!this.catX && this.catY) {
      this.lastTouchY = this.catDefaultY;
      this.touchStyle = {transform: `translate3d(0px, ${this.catDefaultY}px, 0px)`};
    }
    if (this.catX && this.catY) {
      this.lastTouchX = this.catDefaultX;
      this.lastTouchY = this.catDefaultY;
      this.touchStyle = {transform: `translate3d(${this.catDefaultX}px, ${this.catDefaultY}px, 0px)`};
    }
  },
  methods: {
    initBox () {
      // 初始化获取 父、子模型盒子大小
      this.chlidBoxWidth = this.$refs.chlidbox.offsetWidth;
      this.chlidBoxHeight = this.$refs.chlidbox.offsetHeight;
      this.slideBoxWidth = this.$refs.slidebox.offsetWidth;
      this.slideBoxHeight = this.$refs.slidebox.offsetHeight;
      console.log('Box Model Child: [width: %s, height: %s]', this.chlidBoxWidth, this.chlidBoxHeight);
      console.log('Box Model Slide: [width: %s, height: %s]', this.slideBoxWidth, this.slideBoxHeight);

      // 计算子盒子模型可溢出边界大小 = 子盒子模型大小 - 父盒子模型大小
      this.boxWidth = this.chlidBoxWidth - this.slideBoxWidth;
      this.boxHeight = this.chlidBoxHeight - this.slideBoxHeight;
      console.log('Box Model Overflow: [width: %s, height: %s]', this.boxWidth, this.boxHeight);

      // 设定拉力系数
      this.maxPullinX = this.slideBoxWidth * 0.3;
      this.maxPullinY = this.slideBoxHeight * 0.3;
    },
    // touch
    touchStart (e) {
      // 记录开始的时间
      this.startTime = new Date();

      // 记录开始坐标
      this.touchStartX = e.changedTouches[0].pageX;
      this.touchStartY = e.changedTouches[0].pageY;
      console.log('Touch Start: [x: %s, y: %s]', this.touchStartX, this.touchStartY);
      // 解构方式，但是代码会变得不清晰，适用场景不对
      // {(
      //   {
      //     pageX: this.touchStartX,
      //     pageY: this.touchStartY
      //   } = e.changedTouches[0]
      // )}

      // 设置最后一次坐标，保证移动开始时与上次结束坐标相同
      console.log('Init Touch: [x: %s, y: %s]', this.initTouchX, this.initTouchY);
      console.log('Last Touch: [x: %s, y: %s]', this.lastTouchX, this.lastTouchY);
      this.initTouchX = this.lastTouchX;
      this.initTouchY = this.lastTouchY;

      if (this.catX && !this.catY) {
        this.touchStyle = {transform: `translate3d(${this.initTouchX}px, 0px, 0px)`};
      }
      if (!this.catX && this.catY) {
        this.touchStyle = {transform: `translate3d(0px, ${this.initTouchY}px, 0px)`};
      }
      if (this.catX && this.catY) {
        this.touchStyle = {transform: `translate3d(${this.initTouchX}px, ${this.initTouchY}px, 0px)`};
      }
    },
    touchMove (e) {
      // 记录当前位置
      const {pageX: tempCurrentTouchX, pageY: tempCurrentTouchY} = e.changedTouches[0];
      // console.log('Current Touch: [x: %s, y: %s]', tempCurrentTouchX, tempCurrentTouchY);
      // 当前位置与开始位置的差值就是此次移动的距离
      const tempCurrentDifferX = tempCurrentTouchX - this.touchStartX;
      const tempCurrentDifferY = tempCurrentTouchY - this.touchStartY;
      // console.log('Differ Touch In: [x: %s, y: %s]', tempCurrentDifferX, tempCurrentDifferY);

      // 衔接位移 = 当前位移距离 + 上次最后位移距离
      const tempLastTouchX = tempCurrentDifferX + this.lastTouchX;
      const tempLastTouchY = tempCurrentDifferY + this.lastTouchY;

      // 边界计算 拉力 阻尼感
      // if (tempLastTouchY > 0) {
      //   tempLastTouchY *= .4;
      //   if (tempLastTouchY <= this.maxPullinY ) {
      //   } else {
      //     tempLastTouchY = this.maxPullinY;
      //   }
      //   console.log(tempLastTouchY);
      // } else if (tempLastTouchY < -this.boxHeight) {
      //   this.lastTouchY = -this.boxHeight;
      // }
      // 弹性计算
      
      // 移动模式 仅x轴
      if (this.catX && !this.catY) {
        // 如果是x轴移动距离小于 10 则认为是点击或者误触
        if (Math.abs(this.tempCurrentDifferX) < 10) {
          return;
        }
      }
      // 移动模式 仅y轴
      if (!this.catX && this.catY) {
        // 如果是y轴移动距离小于 10 则认为是点击或者误触
        if (Math.abs(this.tempCurrentDifferY) < 10) {
          return;
        }
      }
      // 移动模式任意方向
      if (this.catX && this.catY) {
        // 如果是x or y轴移动距离小于 10 则认为是点击或者误触
        if (Math.abs(this.tempCurrentDifferX) < 10 && Math.abs(this.tempCurrentDifferY) < 10) {
          return;
        }
      }

      if (this.catX && !this.catY) {
        this.touchStyle = {transform: `translate3d(${tempLastTouchX}px, 0px, 0px)`};
      }
      if (!this.catX && this.catY) {
        this.touchStyle = {transform: `translate3d(0px, ${tempLastTouchY}px, 0px)`};
      }
      if (this.catX && this.catY) {
        this.touchStyle = {transform: `translate3d(${tempLastTouchX}px, ${tempLastTouchY}px, 0px)`};
      }
    },
    touchEnd (e) {
      // if (condition) {
        
      // }
      // 记录结束的时间
      this.lastTime = new Date();

      // 记录结束的位置
      this.touchEndX = e.changedTouches[0].pageX;
      this.touchEndY = e.changedTouches[0].pageY;
      
      // 计算位移差 = 结束的位置 - 开始的位置
      this.touchDifferX = this.touchEndX - this.touchStartX;
      this.touchDifferY = this.touchEndY - this.touchStartY;
      console.log('Differ Touch End: [x: %s, y: %s]', this.touchDifferX, this.touchDifferY);

      // 移动模式 仅x轴
      if (this.catX && !this.catY) {
        // 如果是x轴移动距离小于 10 则认为是点击或者误触
        if (Math.abs(this.touchDifferX) < 10) {
          return;
        }
      }
      // 移动模式 仅y轴
      if (!this.catX && this.catY) {
        // 如果是y轴移动距离小于 10 则认为是点击或者误触
        if (Math.abs(this.touchDifferY) < 10) {
          return;
        }
      }
      // 移动模式任意方向
      if (this.catX && this.catY) {
        // 如果是x or y轴移动距离小于 10 则认为是点击或者误触
        if (Math.abs(this.touchDifferX) < 10 && Math.abs(this.touchDifferY) < 10) {
          return;
        }
      }

      // 计算时间差 = 结束时间 - 开始时间
      this.time = this.lastTime - this.startTime;
      console.log('Time Over: %sms', this.time);

      // 计算加速度 = 移动的距离差 / 移动的时间 | 系数太小，需要放大为所需倍数
      this.speedX = (this.touchDifferX / this.time) * 100;
      this.speedY = (this.touchDifferY / this.time) * 100;
      

      console.log('Speed: [%s, %s]', this.speedX, this.speedY);
      // 最后的位置 = 上次一最后的位置 + 此次位移的距离
      this.lastTouchX += this.touchDifferX;
      this.lastTouchY += this.touchDifferY;

      // 惯性 增加距离 = 当前位移距离 + 加速度系数
      this.lastTouchX += this.speedX;
      this.lastTouchY += this.speedY;

      // 边界计算 回弹
      // x轴方向
      if (this.lastTouchX >= 0) {
        this.lastTouchX = 0;
      } else if (this.lastTouchX <= -this.boxWidth) {
        this.lastTouchX = this.boxWidth <= 0 ? 0 : -this.boxWidth;
      }
      // y轴方向
      if (this.lastTouchY >= 0) {
        this.lastTouchY = 0;
      } else if (this.lastTouchY <= -this.boxHeight) {
        this.lastTouchY = this.boxHeight <= 0 ? 0 : -this.boxHeight;
      }

      if (this.catX && !this.catY) {
        this.touchStyle = {
          transform: `translate3d(${this.lastTouchX}px, 0px, 0px)`,
          transition: `transform ${0.5}s cubic-bezier(0.1, 0.57, 0.1, 1)`,
        };
        this.$emit('cat-x', this.lastTouchY);
      }
      if (!this.catX && this.catY) {
        this.touchStyle = {
          transform: `translate3d(0px, ${this.lastTouchY}px, 0px)`,
          transition: `transform ${0.5}s cubic-bezier(0.1, 0.57, 0.1, 1)`,
        };
        this.$emit('cat-y', this.lastTouchY);
      }
      if (this.catX && this.catY) {
        this.touchStyle = {
          transform: `translate3d(${this.lastTouchX}px, ${this.lastTouchY}px, 0px)`,
          transition: `transform ${0.5}s cubic-bezier(0.1, 0.57, 0.1, 1)`,
        };
        this.$emit('cat-x', this.lastTouchY);
        this.$emit('cat-y', this.lastTouchY);
      }
    },
    catMove (x = 0, y = 0) {
      if (this.catX && !this.catY) {
        this.lastTouchX = x;
        this.touchStyle = {
          transform: `translate3d(${this.lastTouchX}px, 0px, 0px)`,
          transition: `transform ${0.5}s cubic-bezier(0.1, 0.57, 0.1, 1)`,
        };
      }
      if (!this.catX && this.catY) {
        this.lastTouchY = y;
        this.touchStyle = {
          transform: `translate3d(0px, ${this.lastTouchY}px, 0px)`,
          transition: `transform ${0.5}s cubic-bezier(0.1, 0.57, 0.1, 1)`,
        };
      }
      if (this.catX && this.catY) {
        this.lastTouchX = x;
        this.lastTouchY = y;
        this.touchStyle = {
          transform: `translate3d(${this.lastTouchX}px, ${this.lastTouchY}px, 0px)`,
          transition: `transform ${0.5}s cubic-bezier(0.1, 0.57, 0.1, 1)`,
        };
      }
    },
  },
  computed: {
    catRefresh () {
      this.initBox();
    },
  },
});
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
@import url(./../assets/catstyle.css);
</style>
