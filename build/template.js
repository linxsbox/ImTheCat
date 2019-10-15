const fs = require('fs');
const path = require('path')
const basePath = path.resolve(__dirname, '../src')

const bulidTpl = () => new Promise((resolve, reject) => {
  // resolve()
  // reject()
}).then(data => {
  const tempPascalName = fileName.replace(fileName[0], fileName[0].toUpperCase());
  // 视图模板
  const viewTpl = `<template>
  <div class="${fileName}-container">

  </div>
</template>
<script>
// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import * as h from './index.${coreType}';
@Component({
  component: ''
})
export class ${tempPascalName} extends Vue {
  // data
  msg = '你好';

  @Prop(Number) readonly propA: number | undefined;

  @Watch('propA')
  onChildChanged (val: number, oldVal: number) {}

  // created
  created () { }
  // mounted
  mounted () { }
  
  // computed
  get hello${tempPascalName} () {
    return this.msg + '${fileName}';
  }

  // methods
  helloWorld () {
    return 'Hello World';
  }

  @Emit()
  returnValue() {
    return '${fileName}';
  }
}
</script>
<style${cssType !== 'css' ? ' lang="' + cssType + '"' : ''}>
  @import url('./index${cssType}');
</style>
`;

  const jsTpl = `import * as apis from '@apis/${fileName}.${coreType}';

function getFn () { return [${fileName}]; }

export default getFn;
`;

  const cssTpl = `.${fileName}-container{ }`;

  const apisTpl = fileApi ? `// ${fileName} api 集合
function get${tempPascalName} (params) {
  return http('url', {
    data: params
  })
}
function submit${tempPascalName} (params) {
  return http('url', {
    data: params
  })
}` : '';

}).catch(err => {

});

export default bulidTpl;