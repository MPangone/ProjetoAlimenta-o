import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import AppDashboardView from '@/views/AppDashboardView.vue'
import DoacoesView from '@/views/Doacoes.vue'
import AppTeamView from '@/views/AppTeamView.vue'
import HomeView from '@/views/HomeView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/', 
    redirect: '/login' 
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AppDashboardView
  },
  {
    path: '/doacoes',
    name: 'doacoes',
    component: DoacoesView
  },
  {
    path: '/team',
    name: 'team',
    component: AppTeamView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
