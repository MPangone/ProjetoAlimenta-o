<template>
    <div class="doacoesinstituicoes">
      <v-container>
        <h1 class="subheading grey--text text-center">Doações Disponíveis</h1>
  
        <v-data-table
          :headers="cabecalhos"
          :items="doacoesFiltradas"
          :items-per-page="5"
          class="elevation-1"
        >
          <!-- Formatação da Data da Doação -->
          <template v-slot:item.data="{ item }">
            <span>{{ new Date(item.data).toLocaleDateString('pt-BR') }}</span>
          </template>
        </v-data-table>
  
        <v-dialog v-model="dialogo" persistent max-width="800px">
          <v-card>
            <v-card-title>
              <span class="headline">Detalhes da Doação</span>
            </v-card-title>
            <v-card-text>
              <v-list-item-group>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title><strong>Doador:</strong> {{ doacaoDetalhada.doador }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title><strong>Data da Doação:</strong> {{ new Date(doacaoDetalhada.data).toLocaleDateString('pt-BR') }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-for="(alimento, index) in doacaoDetalhada.alimentos" :key="index">
                  <v-list-item-content>
                    <v-list-item-title><strong>Alimento:</strong> {{ alimento.nome }}</v-list-item-title>
                    <v-list-item-subtitle><strong>Quantidade:</strong> {{ alimento.quantidade }}</v-list-item-subtitle>
                    <v-list-item-subtitle><strong>Validade:</strong> {{ alimento.validade }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="fecharDialogo">Fechar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        dialogo: false,
        doacoes: [],
        doacaoDetalhada: {},
        instituicaoVinculada: null, // ID da instituição vinculada ao usuário
        cabecalhos: [
          { text: 'Doador', value: 'doador' },
          { text: 'Data da Doação', value: 'data' },
          { text: 'Ações', value: 'actions', sortable: false },
        ],
      };
    },
    computed: {
      doacoesFiltradas() {
        return this.doacoes.filter(doacao => doacao.id_instituicao === this.instituicaoVinculada);
      },
    },
    mounted() {
      this.instituicaoVinculada = 1; // Substitua com o ID da instituição vinculada ao usuário logado
      this.buscarDoacoes();
    },
    methods: {
      async buscarDoacoes() {
        try {
          const resposta = await axios.get('http://localhost:5000/doacoes');
          this.doacoes = resposta.data.map(doacao => ({
            ...doacao,
            data: new Date(doacao.data).toISOString().substr(0, 10), // Formatação da data
          }));
        } catch (erro) {
          console.error('Erro ao buscar doações:', erro);
        }
      },
      verDetalhes(item) {
        this.doacaoDetalhada = item;
        this.dialogo = true;
      },
      fecharDialogo() {
        this.dialogo = false;
      },
    },
  };
  </script>
  