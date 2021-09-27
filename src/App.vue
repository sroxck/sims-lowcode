<!--
 * @Author: your name
 * @Date: 2021-09-26 15:11:14
 * @LastEditTime: 2021-09-26 15:21:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-lesson/src/App.vue
-->
<template>
  <div class="app">
    <editor v-model="state"></editor>
  </div>
</template>

<script>
import { ref ,provide} from 'vue'
import data from './data.json'
import editor from './packages/editor'
import {registerConfig as config} from './utils/editor-config'
export default {
  components:{
    editor
  },
  setup() {
    const state = ref(data)
    provide('config',config)
    return { state }
  }
}
</script>

<style>
.app{
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
}
</style>
