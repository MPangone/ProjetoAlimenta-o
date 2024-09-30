import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import AppDashboardView from '@/views/AppDashboardView.vue'
import AppProjectsView from '@/views/AppProjectsView.vue'
import AppTeamView from '@/views/AppTeamView.vue'
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
    path: '/projects',
    name: 'projects',
    component: AppProjectsView
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
