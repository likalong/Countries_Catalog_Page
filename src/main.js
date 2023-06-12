import {createApp } from 'vue'
import App from '@/App.vue'
import DashboardPage from '@/components/Dashboard.vue'
import CountriesList from '@/components/CountriesList.vue'



import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// custom css
import './css/global.css'

import { createRouter,  createWebHistory} from 'vue-router'

// import ElementPlus from 'element-plus'
// import './element-variables.scss'


const routes = [
  { path: '/', name:"Homepage", component: CountriesList },
  { path: '/:page_number',name:"Pagination", component: CountriesList },
  { path: '/dashboard', name:"DashboardPage", component: DashboardPage },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})


import axios from './axios';

const app =  createApp(App)

app.config.globalProperties.axios=axios
app.config.productionTip = false

app.use(router)


// app.use(ElementPlus)


// console.log("route query :: ", route.query)


// app.mount('#app')// this way $route can't  get value like the parameters in url, to solve it use router.isReadya()


router.isReady().then(() => {
  app.mount('#app')
})

