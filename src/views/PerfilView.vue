<template>
    <div class="perfil">
      <v-container>
        <h1 class="subheading grey--text text-center">Perfil do Usuário</h1>
  
        <!-- Informações do Usuário -->
        <v-card flat class="mb-4">
          <v-card-title>
            <span class="headline">Informações do Usuário</span>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="editarUsuarioDialog = true">Editar</v-btn>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <div class="caption grey--text">Nome de Usuário</div>
                <div>{{ usuario.nome_usuario }}</div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="caption grey--text">Email</div>
                <div>{{ usuario.email }}</div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="caption grey--text">CPF/CNPJ</div>
                <div>{{ usuario.cpf_cnpj }}</div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="caption grey--text">Telefone</div>
                <div>{{ usuario.telefone }}</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="navegarParaInstituicao">Ir para Instituição</v-btn>
        </v-card-actions>
  
        <!-- Editar Usuário Dialog -->
        <v-dialog v-model="editarUsuarioDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Editar Informações do Usuário</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="formUsuario">
                <v-text-field v-model="usuarioEditado.nome_usuario" label="Nome de Usuário" required></v-text-field>
                <v-text-field v-model="usuarioEditado.email" label="Email" required></v-text-field>
                <v-text-field v-model="usuarioEditado.cpf_cnpj" label="CPF/CNPJ" required></v-text-field>
                <v-text-field v-model="usuarioEditado.telefone" label="Telefone" required></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="editarUsuarioDialog = false">Cancelar</v-btn>
              <v-btn color="green" flat @click="atualizarUsuario">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
  
        <!-- Editar Instituição Dialog -->
        <v-dialog v-model="editarInstituicaoDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Editar Informações da Instituição</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="formInstituicao">
                <v-text-field v-model="instituicaoEditada.nome" label="Nome" required></v-text-field>
                <v-text-field v-model="instituicaoEditada.endereco" label="Endereço" required></v-text-field>
                <v-text-field v-model="instituicaoEditada.telefone" label="Telefone" required></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="editarInstituicaoDialog = false">Cancelar</v-btn>
              <v-btn color="green" flat @click="atualizarInstituicao">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PerfilView',
    data: () => ({
      usuario: {
        nome_usuario: '',
        email: '',
        cpf_cnpj: '',
        telefone: '',
      },
      instituicao: null,
      editarUsuarioDialog: false,
      editarInstituicaoDialog: false,
      usuarioEditado: {},
      instituicaoEditada: {},
    }),
    methods: {
      async buscarUsuario() {
        try {
          const response = await axios.get(`http://localhost:5000/usuario`);
          this.usuario = response.data;
          if (this.usuario.e_instituicao) {
            await this.buscarInstituicao();
          }
        } catch (error) {
          console.error('Erro ao buscar usuário:', error);
        }
      },
      async buscarInstituicao() {
        try {
          const response = await axios.get(`http://localhost:5000/instituicao/${this.usuario.id}`);
          this.instituicao = response.data;
        } catch (error) {
          console.error('Erro ao buscar instituição:', error);
        }
      },
      editarUsuario() {
        this.usuarioEditado = { ...this.usuario };
        this.editarUsuarioDialog = true;
      },
      editarInstituicao() {
        this.instituicaoEditada = { ...this.instituicao };
        this.editarInstituicaoDialog = true;
      },
      async atualizarUsuario() {
        try {
          await axios.put(`http://localhost:5000/usuario/${this.usuario.id}`, this.usuarioEditado);
          this.usuario = { ...this.usuarioEditado };
          this.editarUsuarioDialog = false;
        } catch (error) {
          console.error('Erro ao atualizar usuário:', error);
        }
      },
      async atualizarInstituicao() {
        try {
          await axios.put(`http://localhost:5000/instituicao/${this.instituicao.id}`, this.instituicaoEditada);
          this.instituicao = { ...this.instituicaoEditada };
          this.editarInstituicaoDialog = false;
        } catch (error) {
          console.error('Erro ao atualizar instituição:', error);
        }
      },
      navegarParaInstituicao() {
        this.$router.push({ path: '/instituicao' });
      },
    },
    mounted() {
      this.buscarUsuario();
    }
  };
  </script>
  
  <style scoped>
  .perfil {
    padding: 20px;
  }
  </style>
  