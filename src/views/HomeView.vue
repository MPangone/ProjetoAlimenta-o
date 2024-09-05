<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="16">
        <v-card class="elevation-6 mt-10">
          <v-window v-model="step">
            <!-- Tela de Login -->
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Entrar na Sua Conta</h4>
                    <h6 class="text-center grey--text">
                      Faça login na sua conta para continuar construindo <br> e editando seus fluxos de onboarding
                    </h6>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                        <v-text-field
                          label="Email"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          v-model="loginEmail"
                          class="mt-16"
                        />
                        <v-text-field
                          label="Senha"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          type="password"
                          v-model="loginPassword"
                        />
                        <v-row>
                          <v-col cols="12" sm="7">
                            <v-checkbox
                              label="Lembrar de Mim"
                              class="mt-n1"
                              color="blue"
                            ></v-checkbox>
                          </v-col>
                          <v-col cols="12" sm="5">
                            <span class="caption blue--text">Esqueceu a senha</span>
                          </v-col>
                        </v-row>
                        <v-btn color="blue" dark block tile @click="login">Entrar</v-btn>

                        <h5 class="text-center grey--text mt-4 mb-3">Ou entre usando</h5>
                        <div class="d-flex justify-space-between align-center mx-10 mb-16">
                          <v-btn depressed outlined color="grey">
                            <v-icon color="red">fab fa-google</v-icon>
                          </v-btn>
                          <v-btn depressed outlined color="grey">
                            <v-icon color="blue">fab fa-facebook-f</v-icon>
                          </v-btn>
                          <v-btn depressed outlined color="grey">
                            <v-icon color="light-blue lighten-3">fab fa-twitter</v-icon>
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="6" class="blue rounded-bl-xl">
                  <div style="text-align: center; padding: 180px 0;">
                    <v-card-text class="white--text">
                      <h3 class="text-center">Ainda Não Tem uma Conta?</h3>
                      <h6 class="text-center">
                        Vamos configurar tudo para que você possa começar a criar<br> sua primeira experiência de onboarding
                      </h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step++">CADASTRAR-SE</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>

            <!-- Tela de Cadastro -->
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" md="6" class="blue rounded-br-xl">
                  <div style="text-align: center; padding: 180px 0;">
                    <v-card-text class="white--text">
                      <h3 class="text-center">Já Está Cadastrado?</h3>
                      <h6 class="text-center">
                        Faça login na sua conta para continuar construindo <br> e editando seus fluxos de onboarding
                      </h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step--">Entrar</v-btn>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Criar uma Conta</h4>
                    <h6 class="text-center grey--text">
                      Vamos configurar tudo para que você possa começar a criar sua<br> primeira experiência de onboarding
                    </h6>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                        <v-text-field
                          label="Nome de Usuário"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          v-model="registerUsername"
                          class="mt-4"
                        />
                        <v-text-field
                          label="Senha"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          type="password"
                          v-model="registerPassword"
                        />
                        <v-text-field
                          label="Email"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          v-model="registerEmail"
                        />
                        <v-row>
                          <v-col cols="12" sm="7">
                            <v-checkbox
                              label="Aceito os Termos"
                              class="mt-n1"
                              color="blue"
                            ></v-checkbox>
                          </v-col>
                          <v-col cols="12" sm="5">
                            <span class="caption blue--text ml-n4">Termos e Condições</span>
                          </v-col>
                        </v-row>
                        <v-btn color="blue" dark block tile @click="register">Cadastrar-se</v-btn>

                        <h5 class="text-center grey--text mt-4 mb-3">Ou cadastre-se usando</h5>
                        <div class="d-flex justify-space-between align-center mx-10 mb-11">
                          <v-btn depressed outlined color="grey">
                            <v-icon color="red">fab fa-google</v-icon>
                          </v-btn>
                          <v-btn depressed outlined color="grey">
                            <v-icon color="blue">fab fa-facebook-f</v-icon>
                          </v-btn>
                          <v-btn depressed outlined color="grey">
                            <v-icon color="light-blue lighten-3">fab fa-twitter</v-icon>
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      step: 1,
      loginEmail: '',
      loginPassword: '',
      registerUsername: '',
      registerPassword: '',
      registerEmail: '',
      message: ''
    };
  },
  methods: {
    async login() {
      try {
        const { data } = await axios.post('http://localhost:5000/login', {
          nome_usuario: this.loginEmail,
          senha: this.loginPassword
        });
        localStorage.setItem('access_token', data.access_token);
        this.message = 'Login bem-sucedido!';
        // Redirecionar ou realizar outras ações após o login
      } catch (error) {
        this.message = 'Credenciais inválidas';
        console.error('Erro de login:', error);
      }
    },
    async register() {
      try {
        await axios.post('http://localhost:5000/registro', {
          nome_usuario: this.registerUsername,
          senha: this.registerPassword,
          e_instituicao: false // Adicionar este campo se for necessário para seu backend
        });
        this.message = 'Cadastro bem-sucedido!';
        // Redirecionar ou realizar outras ações após o registro
      } catch (error) {
        this.message = 'Erro ao cadastrar';
        console.error('Erro de cadastro:', error);
      }
    }
  }
}
</script>

<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
</style>
