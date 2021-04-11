import Toast from './Toast.vue'
const toastObj = {}

toastObj.install = Vue => { 
  // 1. 创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 2. 以 new 的方式，根据组件构造器创建组件对象
  const toast = new toastConstructor()
  // 3. 将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4. 将Toast 组件放到页面里
  document.body.appendChild(toast.$el)
  // install 函数默认会接收一个参数 Vue
  Vue.prototype.$toast = toast
}

export default toastObj
