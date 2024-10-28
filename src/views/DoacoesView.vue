<template>
  <div class="doacoes">
    <v-container>
      <h1 class="subheading grey--text text-center">Gerenciar Doações</h1>

      <v-row justify="center" class="mb-3">
        <v-btn color="blue" @click="abrirDialogo">Nova Doação</v-btn>
      </v-row>

      <v-data-table
        :headers="cabecalhos"
        :items="doacoes"
        :items-per-page="5"
        class="elevation-1"
      >
        <!-- Formatação da Data da Doação -->
        <template v-slot:item.data="{ item }">
          <span>{{ new Date(item.data).toLocaleDateString('pt-BR') }}</span>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn icon @click="editarDoacao(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deletarDoacao(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <!-- Restante do código -->
      <v-dialog v-model="dialogo" persistent max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ editando ? 'Editar Doação' : 'Nova Doação' }}</span>
          </v-card-title>
          <v-form ref="formulario" @submit.prevent="submeter">
            <v-card-text>
              <v-row v-for="(item, index) in doacao.alimentos" :key="index" class="align-center">
                <v-col cols="12" md="4">
                  <v-text-field
                    label="Alimento"
                    v-model="item.nome"
                    :rules="regrasInput"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    label="Quantidade"
                    type="number"
                    v-model="item.quantidade"
                    :rules="regrasInput"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="item.validade"
                        label="Validade"
                        hint="YYYY-MM-DD formato"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="item.validade" no-title @input="menu1 = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-btn icon @click="removerAlimento(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-row>

              <v-btn text @click="adicionarAlimento">Adicionar Alimento</v-btn>

              <v-text-field
                label="Doador"
                v-model="doacao.doador"
                prepend-icon="mdi-account"
                :rules="regrasInput"
                required
              ></v-text-field>

              <v-select
                v-model="idInstituicao"
                :items="instituicoes"
                item-text="nome" 
                item-value="id"
                label="Selecione uma Instituição"
                required
                @change="onInstituicaoChange"
                :error-messages="instituicaoError"
              ></v-select>

              <v-alert v-if="submissaoSucesso" type="success" dismissible>
                Dados salvos com sucesso!
              </v-alert>
              <v-alert v-if="erroEnvio" type="error" dismissible>
                Ocorreu um erro ao salvar a doação.
              </v-alert>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="fecharDialogo">Fechar</v-btn>
              <v-btn color="green" text outlined @click="submeter">{{ editando ? 'Atualizar' : 'Salvar' }}</v-btn>
            </v-card-actions>
          </v-form>
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
      editando: false,
      doacao: this.inicializarDoacao(),
      menu1: false,
      submissaoSucesso: false,
      erroEnvio: false,
      regrasInput: [v => !!v || 'Este campo é obrigatório'],
      doacoes: [],
      instituicoes: [], // Adicione a lista de instituições
      idInstituicao: null,
      instituicaoError: '',
      cabecalhos: [
        { text: 'Doador', value: 'doador' },
        { text: 'Instituição', value: 'instituicao' },
        { text: 'Data da Doação', value: 'data' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
    };
  },
  mounted() {
    this.buscarDoacoes();
    this.carregarInstituicoes(); // Carrega instituições ao montar o componente
  },
  methods: {
    inicializarDoacao() {
      return {
        doador: '',
        alimentos: [{ nome: '', quantidade: 0, validade: new Date().toISOString().substr(0, 10) }],
        data: new Date().toISOString().substr(0, 10),
      };
    },
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
    async carregarInstituicoes() {
      try {
        const resposta = await axios.get('http://localhost:5000/instituicoes'); // Ajuste o URL conforme necessário
        this.instituicoes = resposta.data; // Supondo que sua API retorne um array de instituições
      } catch (erro) {
        console.error('Erro ao carregar instituições:', erro);
      }
    },
    adicionarAlimento() {
      this.doacao.alimentos.push({
        nome: '',
        quantidade: 0,
        validade: new Date().toISOString().substr(0, 10),
      });
    },
    removerAlimento(index) {
      this.doacao.alimentos.splice(index, 1);
    },
    abrirDialogo() {
      this.resetarFormulario();
      this.dialogo = true;
    },
    editarDoacao(item) {
      this.doacao = { ...item };
      this.editando = true;
      this.idInstituicao = item.id_instituicao; // Atribuir a instituição ao editar
      this.dialogo = true;
    },
    async deletarDoacao(item) {
      try {
        await axios.delete(`http://localhost:5000/doacoes/${item.id}`);
        this.doacoes = this.doacoes.filter(doacao => doacao.id !== item.id);
        this.$emit('snackbar', { message: 'Doação excluída com sucesso!', color: 'success' });
      } catch (erro) {
        console.error('Erro ao excluir doação:', erro);
      }
    },
    async submeter() {
      if (!this.$refs.formulario.validate()) {
        return;
      }
      try {
        const metodo = this.editando ? 'PUT' : 'POST';
        const url = this.editando
          ? `http://localhost:5000/doacoes/${this.doacao.id}`
          : 'http://localhost:5000/doacoes';

        const dadosEnviar = {
          id_doador: this.doacao.doador,
          id_instituicao: this.idInstituicao, // Corrigido para usar o idInstituicao
          alimentos: this.doacao.alimentos,
          data: this.doacao.data,
        };

        const resposta = await axios({
          method: metodo,
          url: url,
          data: dadosEnviar,
        });

        if (this.editando) {
          const index = this.doacoes.findIndex(d => d.id === this.doacao.id);
          this.$set(this.doacoes, index, resposta.data);
        } else {
          this.doacoes.push(resposta.data);
        }

        this.submissaoSucesso = true;
        this.erroEnvio = false;
        this.resetarFormulario();
        this.dialogo = false;

        setTimeout(() => {
          this.submissaoSucesso = false;
        }, 2000);
      } catch (erro) {
        this.erroEnvio = true;
        console.error('Erro ao salvar doação:', erro);
      }
    },
    resetarFormulario() {
      this.doacao = this.inicializarDoacao();
      this.idInstituicao = null; // Resetar a instituição
      this.editando = false;
      if (this.$refs.formulario) {
        this.$refs.formulario.resetValidation();
      }
    },
    fecharDialogo() {
      this.dialogo = false;
    },
    onInstituicaoChange() {
      this.instituicaoError = '';
    },
  },
};
</script>
