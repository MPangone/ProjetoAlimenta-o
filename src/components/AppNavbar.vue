<template>
  <nav>
    <v-app-bar color="red" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase ">
        <!-- <span class="font-weight-light">AlimentAção</span> -->
        <span>AlimentAção</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <v-icon left>expand_more</v-icon>
          <span>Menu</span>
        </v-btn>
      </template>

      <v-btn text @click="sair">
        <span>Sair</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" dark app class="red darken-4">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <!-- <img src="../assets/profile.avif" alt=""> -->
          </v-avatar>
          <p class="white--text subheading mt-1 text-center">{{ username }}</p>
        </v-flex>
        <v-flex class="mt-4 mb-4">
          <AppPopup />
        </v-flex>
      </v-layout>
      <v-list flat>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route" active-class="border">
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import AppPopup from './AppPopup.vue';

export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: 'house', text: 'Home', route: '/home' },
        { icon: 'person', text: 'Perfil', route: '/perfil' },
        // { icon: 'dashboard', text: 'Instituições', route: '/instituicao' },
        { icon: 'mdi-food', text: 'Doações', route: '/doacoes' },
      ]
    };
  },
  mounted() {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
  },
  methods: {
    sair() {
      sessionStorage.removeItem('token'); // Remova o token do sessionStorage
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('user_id');
      sessionStorage.removeItem('username');
      this.$router.push({ path: '/login' }); // Redirecione para o login
    }
  },
  components: {
    AppPopup
  }
  
}
</script>

<style scoped>
.border {
  border-left: 4px solid #0ba518;
}
</style>
