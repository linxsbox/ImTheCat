module.exports.default = (pascalName) => `
// https://github.com/kaorun343/vue-property-decorator
import { Vue } from 'vue-property-decorator';
export default Vue.extend({
  name: '${pascalName}',
  components: {}, // components 组件引用
  props: {}, // props 暴露对象
  data () {
    return {
      name: '${pascalName}',
      msg: '你好'
    };
  },

  // 组件路由生命周期
  beforeRouteEnter (to, from, next) { next(); }, // 路由进入之前
  beforeRouteLeave (to, from, next) { next(); }, // 路由离开之前
  beforeRouteUpdate (to, from, next) { next(); }, // 路由更新之前

  // 生命周期
  beforeCreate () { }, // 创建前执行
  created () { }, // 创建时执行

  beforeMount () { }, // 加载前执行
  mounted () { }, // 加载时执行

  beforeUpdate () { }, // 更新之前执行
  updated () { }, // 更新时执行

  beforeDestroy () { }, // 销毁前执行
  destroyed () { }, // 销毁时执行

  watch: {}, // watch 监听对象
  computed: {}, // computed 计算对象

  methods: {}, // methods 方法对象
});`;