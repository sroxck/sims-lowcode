import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
createApp(App).mount('#app')


// 1. 先自己构造一些假数据,实现根据位置,渲染内容
// 2. 配置组件对应的映射关系{preview:xxx,render:xxx}