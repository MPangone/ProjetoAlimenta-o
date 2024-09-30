<template>
  <v-app>
    <!-- Verifica se a rota atual é diferente de 'login' -->
    <AppNavbar v-if="!isLoginPage" />
    <v-content class="ma-4">
      <router-view></router-view>
    </v-content>
    <!-- Verifica se a rota atual é diferente de 'login' -->
    <AppFooter v-if="!isLoginPage" />
  </v-app>
</template>

<script>
import AppNavbar from '../src/components/AppNavbar';
import AppFooter from '../src/components/AppFooter';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter,
  },
  computed: {
    // Verifica se a rota atual é a página de login
    isLoginPage() {
      return this.$route.name === 'login';
    }
  }
};
</script>
