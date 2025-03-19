import { createApp } from 'vue'
import App from './App.vue'


import './assets/main.css'
import { createWebHashHistory, createRouter } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'

// const routes = [
//     { path: '/', component: Home },
//     { path: '/login', component: Login },
//     { path: '/signup', component: Signup },
// ]

// const router = createRouter({
//     history: createWebHashHistory(),
//     routes,
// })



createApp(App).mount('#app')
    // .use(router)

