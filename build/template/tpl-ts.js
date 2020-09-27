module.exports.default = (pascalName) => `// https://github.com/kaorun343/vue-property-decorator
// https://github.com/vuejs/vue-class-component
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';

@Component
export default class ${pascalName} extends Vue {

  // data
  name = '${pascalName}';
  msg = '你好';

  @Prop(Number) readonly propA: number | undefined;

  @Watch('propA')
  onChildChanged (val: number, oldVal: number) {
    console.log(\`newValue: \${val}, oldValue: \${oldVal}\`);
  }

  // created
  created () {
    console.log('this is created');
  }
  // mounted
  mounted () {
    console.log('this is mounted');
  }

  // computed
  get hello${pascalName} () {
    return this.msg + this.name;
  }

  @Emit()
  returnValue () {
    return this.name;
  }

  // methods
  helloWorld () {
    return 'Hello World';
  }
}`;