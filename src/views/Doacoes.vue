<template>
  <div class="projects">
    <h1 class="subheading grey--text">Doações</h1>
    <v-container>
      <v-layout row wrap class="mb-4" justify="space-between" align="center">
        <!-- Sorting Buttons on the Right -->
        <div class="sort-buttons">
          <v-btn small outlined color="primary" @click="openForm" class="ml-0">
          <v-icon left small>add</v-icon>
          <span class="caption text-lowercase">Adicionar</span>
        </v-btn>
          <v-tooltip bottom>  
            <template v-slot:activator="{ on }">
              <v-btn small outlined color="green" @click="sortBy('title')" class="mr-2" dark v-on="on">
                <v-icon left small>folder</v-icon>
                <span class="caption text-lowercase">By project title</span>
              </v-btn>
            </template>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn small outlined color="blue" @click="sortBy('doador')" class="mr-2" dark v-on="on">
                <v-icon left small>person</v-icon>
                <span class="caption text-lowercase">By name</span>
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </v-layout>

      <!-- Projects List -->
      <v-card flat v-for="project in projects" :key="project.title" class="mb-1">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Alimento</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Doador</div>
            <div>{{ project.doador }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Beneficiado</div>
            <div>{{ project.beneficiado }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Data</div>
            <div>{{ project.data }}</div>
          </v-flex>
        </v-layout>
      </v-card>
      <doacoes-form></doacoes-form>
    </v-container>
  </div>
</template>

<script>
import DoacoesForm from '@/forms/Doacoesform.vue';  // Importando o formulário de doações

export default {
  name: 'projects',
  components: {
    DoacoesForm  // Declarando o componente para uso
  },
  data: () => ({
    projects: [
      { title: 'Arroz 1Kg', doador: 'Naldo', beneficiado: 'Everton', data: '10/10/1987', status: 'complete' }
    ],
  }),
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    openForm() {
      console.log('Botão Adicionar clicado');  // Adicionando log para verificar se o método é chamado
      // Emite o evento para abrir o formulário de doações
      this.$root.$emit('open-doacoes-form');
    }
  }
};
</script>


<style scoped>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.sort-buttons {
  display: flex;
  justify-content: flex-end;
}
.v-btn {
  min-width: 150px;
  margin-right: 8px;
}
</style>
