<template>
  <div class="home">
    <v-container>
      <h1 class="subheading grey--text text-center">Bem-vindo ao AlimentAção!</h1>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-card class="mx-auto" max-width="400">
            <v-card-title>
              <span class="headline">O que é o AlimentAção?</span>
            </v-card-title>
            <v-card-text>
              <p>
                O AlimentAção é uma plataforma que conecta doadores de alimentos a instituições de caridade. Junte-se a nós na luta contra a fome!
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="navegarParaDoacao">Faça uma Doação</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-card class="mx-auto" max-width="400">
            <v-card-title>
              <span class="headline">Como Funciona?</span>
            </v-card-title>
            <v-card-text>
              <p>
                1. Cadastre-se como doador ou instituição.<br />
                2. Ofereça alimentos que você pode doar.<br />
                3. As instituições interessadas entrarão em contato com você.
              </p>
            </v-card-text>
            <v-card-actions>
              <!-- <v-btn color="primary" @click="navegarParaCadastro">Cadastre-se</v-btn> -->
            </v-card-actions>
          </v-card>
        </v-flex>
        <!-- <v-flex xs12 md6>
          <v-card class="mx-auto" max-width="400">
            <v-card-title>
              <span class="headline">Instituições</span>
            </v-card-title>
            <v-card-text>
              <p>
                1. Cadastre-se como doador ou instituição.<br />
                2. Ofereça alimentos que você pode doar.<br />
                3. As instituições interessadas entrarão em contato com você.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="navegarParaCadastro">Cadastre-se</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex> -->
      </v-layout>

      <v-divider></v-divider>

      <v-row class="mt-5">
        <v-col cols="12">
          <h2 class="subheading grey--text text-center">Instituições Parceiras</h2>
        </v-col>
        <v-col v-for="instituicao in instituicoes" :key="instituicao.id" cols="12" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-card-title>{{ instituicao.nome }}</v-card-title>
            <v-card-text>
              <p>Endereço: {{ instituicao.endereco }}</p>
              <p>Telefone: {{ instituicao.telefone }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      // instituicoes: [
      //   { id: 1, nome: 'Instituição A', endereco: 'Rua A, 123', telefone: '(11) 1111-1111' },
      //   { id: 2, nome: 'Instituição B', endereco: 'Rua B, 456', telefone: '(22) 2222-2222' },
      //   { id: 3, nome: 'Instituição C', endereco: 'Rua C, 789', telefone: '(33) 3333-3333' },
      // ],
    };
  },
  methods: {
    navegarParaDoacao() {
      this.$router.push('/doacao'); // Altere para a rota de doação correta
    },
    navegarParaCadastro() {
      this.$router.push('/login'); // Altere para a rota de cadastro correta
    },
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
}

.v-card {
  margin: 15px 0;
}
</style>
