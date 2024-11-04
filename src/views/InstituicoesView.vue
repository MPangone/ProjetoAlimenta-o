<template>
  <div class="instituicoes">
    <h1 class="subheading black--text center">Minha Instituição</h1>
    <v-container>
      <v-layout row wrap class="mb-4">
        <v-btn small outlined color="green" @click="criarDialog = true" class="mr-2" dark :disabled="usuarioTemInstituicao">
          <v-icon left small>add</v-icon>
          <span class="caption text-lowercase">Criar Instituição</span>
        </v-btn>
      </v-layout>
      <v-card flat v-for="instituicao in instituicoes" :key="instituicao.id" class="mb-1">
        <v-layout row wrap :class="`pa-3 instituicao`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Nome</div>
            <div>{{ instituicao.nome }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Rua</div>
            <div>{{ instituicao.rua }}, {{ instituicao.numero }}, {{ instituicao.bairro }}</div>
            <div>CEP: {{ formatarCep(instituicao.cep) }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Telefone</div>
            <div>{{ formatarTelefone(instituicao.telefone) }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">CNPJ</div>
            <div>{{ formatarCnpj(instituicao.cnpj) }}</div>
          </v-flex>
          <v-flex xs12 md2>
            <v-btn small outlined color="blue" @click="editarInstituicao(instituicao)" class="mr-2" dark>
              <v-icon left small>edit</v-icon>
              <span class="caption text-lowercase">Editar</span>
            </v-btn>
            <v-btn small outlined color="red" @click="deletarInstituicao(instituicao)" class="mr-2" dark>
              <v-icon left small>delete</v-icon>
              <span class="caption text-lowercase">Deletar</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>

    <!-- Criar Instituição Dialog -->
    <v-dialog v-model="criarDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Criar Instituição</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="novaInstituicao.nome" label="Nome" required></v-text-field>
            <v-text-field v-model="novaInstituicao.rua" label="Rua" required></v-text-field>
            <v-text-field v-model="novaInstituicao.numero" label="Número" required></v-text-field>
            <v-text-field v-model="novaInstituicao.bairro" label="Bairro" required></v-text-field>
            <v-text-field v-model="novaInstituicao.cep" label="CEP" required v-mask="'#####-###'"></v-text-field>
            <v-text-field v-model="novaInstituicao.telefone" label="Telefone" required
              v-mask="'(##) #####-####'"></v-text-field>
            <v-text-field v-model="novaInstituicao.cnpj" label="CNPJ" required
              v-mask="'##.###.###/####-##'"></v-text-field>
            <v-text-field v-model="novaInstituicao.id_usuario" label="Usuário" readonly solo></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="criarDialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" flat @click="criarInstituicao">Criar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Editar Instituição Dialog -->
    <v-dialog v-model="editarDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Editar Instituição</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="instituicaoEditada.nome" label="Nome" required></v-text-field>
            <v-text-field v-model="instituicaoEditada.rua" label="Rua" required></v-text-field>
            <v-text-field v-model="instituicaoEditada.numero" label="Número" required></v-text-field>
            <v-text-field v-model="instituicaoEditada.bairro" label="Bairro" required></v-text-field>
            <v-text-field v-model="instituicaoEditada.cep" label="CEP" required v-mask="'#####-###'"></v-text-field>
            <v-text-field v-model="instituicaoEditada.telefone" label="Telefone" required
              v-mask="'(##) #####-####'"></v-text-field>
            <v-text-field v-model="instituicaoEditada.cnpj" label="CNPJ" required
              v-mask="'##.###.###/####-##'"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="editarDialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" flat @click="atualizarInstituicao">Atualizar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'instituicoes',
  data: () => ({
    instituicoes: [],
    criarDialog: false,
    editarDialog: false,
    userId: sessionStorage.getItem(''),
    usuarioTemInstituicao: false,
    novaInstituicao: {
      nome: '',
      endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cep: ''
      },
      telefone: '',
      cnpj: '',
      id_usuario: '',
    },
    instituicaoEditada: {
      id: null,
      nome: '',
      endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cep: ''
      },
      telefone: '',
      cnpj: '',
    }
  }),
  methods: {
    formatarTelefone(telefone) {
      return telefone ? telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') : '';
    },
    formatarCnpj(cnpj) {
      return cnpj ? cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') : '';
    },
    formatarCep(cep) {
      return cep ? cep.replace(/(\d{5})(\d{3})/, '$1-$2') : '';
    },
    async buscarInstituicoes() {
      const idUsuarioLogado = sessionStorage.getItem('user_id');
      if (!idUsuarioLogado) {
        console.error('Usuário não logado.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/instituicoes/${idUsuarioLogado}`);
        this.instituicoes = response.data;
        this.usuarioTemInstituicao = this.instituicoes.length > 0;
      } catch (error) {
        console.error('Erro ao buscar instituições:', error);
      }
    },
    // async buscarInstituicoes() {
    //   try {
    //     const response = await axios.get('http://localhost:5000/instituicoes/${this.idUsuarioLogado}');
    //     this.instituicoes = response.data;
    //   } catch (error) {
    //     console.error('Erro ao buscar instituições:', error);
    //   }
    // },
    async criarInstituicao() {
      this.novaInstituicao.cep = this.novaInstituicao.cep.replace(/\D/g, '');
      this.novaInstituicao.telefone = this.novaInstituicao.telefone.replace(/\D/g, '');
      this.novaInstituicao.cnpj = this.novaInstituicao.cnpj.replace(/\D/g, '');
      try {
        const response = await axios.post('http://localhost:5000/instituicoes', this.novaInstituicao);
        this.instituicoes.push(response.data);
        this.criarDialog = false;
        this.novaInstituicao = {
          nome: '',
          rua: '',
          numero: '',
          bairro: '',
          cep: '',
          telefone: '',
          cnpj: '',
          id_usuario: ''
        };
        await this.buscarInstituicoes();
      } catch (error) {
        console.error('Erro ao criar instituição:', error);
      }
    },
    editarInstituicao(instituicao) {
      this.instituicaoEditada = { ...instituicao };
      this.editarDialog = true;
    },
    async atualizarInstituicao() {
      this.instituicaoEditada.cep = this.instituicaoEditada.cep.replace(/\D/g, '');
      this.instituicaoEditada.telefone = this.instituicaoEditada.telefone.replace(/\D/g, '');
      this.instituicaoEditada.cnpj = this.instituicaoEditada.cnpj.replace(/\D/g, '');
      try {
        const response = await axios.put(`http://localhost:5000/instituicoes/${this.instituicaoEditada.id}`, this.instituicaoEditada);
        const index = this.instituicoes.findIndex(inst => inst.id === this.instituicaoEditada.id);
        this.instituicoes.splice(index, 1, response.data);
        this.editarDialog = false;
        await this.buscarInstituicoes();
      } catch (error) {
        console.error('Erro ao atualizar instituição:', error);
      }
    },
    async deletarInstituicao(instituicao) {
      try {
        await axios.delete(`http://localhost:5000/instituicoes/${instituicao.id}`);
        const index = this.instituicoes.indexOf(instituicao);
        this.instituicoes.splice(index, 1);
        await this.buscarInstituicoes();
      } catch (error) {
        console.error('Erro ao deletar instituição:', error);
      }
    }
  },
  mounted() {
    this.buscarInstituicoes();
    const idUsuarioLogado = sessionStorage.getItem('user_id');
    if (idUsuarioLogado) {
      this.novaInstituicao.id_usuario = idUsuarioLogado;
    }
  }
}
</script>

<style scoped>
.instituicao {
  border: 1px solid #e0e0e0;
  border-radius: 5px;
}
</style>
