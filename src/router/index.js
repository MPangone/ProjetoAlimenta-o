import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DoacoesView from '@/views/DoacoesView.vue'
import AppTeamView from '@/views/AppTeamView.vue'
import HomeView from '@/views/HomeView.vue'
import InstituicoesView from '@/views/InstituicoesView.vue'
import PerfilView from '@/views/PerfilView.vue'
import DoacoesInstituicoesView from '@/views/DoacoesInstituicoesView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/', 
    redirect: '/login' 
  },
  {
    path: '/instituicao',
    name: 'instituicao',
    component: InstituicoesView
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
  {
    path: '/perfil',
    name: 'perfil',
    component: PerfilView
  },
  {
    path: '/doacoesinstituicoes',
    name: 'doacoesinstituicoes',
    component: DoacoesInstituicoesView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
