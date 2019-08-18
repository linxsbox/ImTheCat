import Vue from 'vue'
import Main from './mian.vue'

let ToastConstructor = Vue.extend(Main);
let instance;
let instances = [];

const Toast = function (options) {
  // debugger
  if (typeof options === 'string') {
    options = { message: options }
  }
  instance = new ToastConstructor({ data: options });
  console.log('instance', instance)
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.visible = true;

  instances.push(instance)
}

export default Toast;