import {createApp } from 'vue'
import App from './App.vue'
// import DetailModal from './components/DetailModal.vue';


import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// custom css
import './assets/css/global.css'

import { createRouter,  createWebHashHistory, RouterLink} from 'vue-router'

const routes = [
  { path: '/', name:"Home", component: App },
  { path: '/:page_number',name:"Pagination", component: App },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})


import axios from './axios';

const app =  createApp(App)

app.config.globalProperties.axios=axios
app.config.productionTip = false

app.use(router)
app.use(RouterLink)


// console.log("route query :: ", route.query)


// app.mount('#app')// this way $route can't  get value like the parameters in url, to solve it use router.isReadya()


router.isReady().then(() => {
  app.mount('#app')
})

