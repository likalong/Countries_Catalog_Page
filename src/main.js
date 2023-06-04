import {createApp } from 'vue'
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// custom css
import './assets/css/global.css'



import axios from './axios';

const app =  createApp(App)

app.config.globalProperties.axios=axios
app.config.productionTip = false



import { defineComponent } from "vue";


export default defineComponent({
   props:{
   modelValue: String
  },
  // setup(props,{emit}) {

  //   function updateValue(value: any) {
  //     emit('update:modelValue', value)
  //   }
  // }
})

app.mount('#app')

