<template>
  <b-row class="vh-100 vw-100 row-login">
    <b-col sm="5" class="d-flex justify-content-center align-items-center left-login">
      <div class="col-8">
        <h2 class="text-center mb-5 title-login">
          {{ step === 1 ? 'Entrar' : 'Cadastrar-se' }}
        </h2>

        <b-form v-if="step === 1">
          <b-form-group label="E-mail" label-for="email" class="mb-3">
            <b-form-input
              id="email"
              type="email"
              placeholder="Digite seu email"
              autocomplete="off"
              v-model.trim="loginEmail"
              :state="getValidation('email')"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-for="password" class="mb-2">
            <label>Senha</label>
            <b-form-input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              v-model.trim="loginPassword"
              :state="getValidation('password')"
            ></b-form-input>
            <small class="d-block text-end">
              <a href="#">Esqueceu sua senha?</a>
            </small>
          </b-form-group>

          <b-button type="button" variant="primary" block @click="login" class="mb-1">
            <i class="fas fa-sign-in-alt"></i> Entrar
          </b-button>

          <hr>

          <b-button type="button" variant="outline-secondary" block @click="toggleStep">
            <i class="fas fa-user-plus"></i> Não tenho conta
          </b-button>
        </b-form>

        <b-form v-else>
          <b-form-group label="Nome" label-for="registerUsername" class="mb-3">
            <b-form-input
              id="registerUsername"
              type="text"
              placeholder="Digite seu nome"
              v-model.trim="registerUsername"
              :state="getValidation('registerUsername')"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="E-mail" label-for="registerEmail" class="mb-3">
            <b-form-input
              id="registerEmail"
              type="email"
              placeholder="Digite seu email"
              autocomplete="off"
              v-model.trim="registerEmail"
              :state="getValidation('registerEmail')"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-for="registerPassword" class="mb-2">
            <label>Senha</label>
            <b-form-input
              id="registerPassword"
              type="password"
              placeholder="Digite sua senha"
              v-model.trim="registerPassword"
              :state="getValidation('registerPassword')"
            ></b-form-input>
          </b-form-group>

          <b-button type="button" variant="primary" block @click="register" class="mb-1">
            <i class="fas fa-user-plus"></i> Cadastrar
          </b-button>

          <hr>

          <b-button type="button" variant="outline-secondary" block @click="toggleStep">
            <i class="fas fa-arrow-left"></i> Já tenho conta
          </b-button>
        </b-form>
      </div>
    </b-col>
    <b-col sm="7" class="d-flex justify-content-center align-items-center">
      <img src="../assets/login.svg" class="img-login" />
    </b-col>
  </b-row>
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
          email: this.loginEmail,
          senha: this.loginPassword
        });
        localStorage.setItem('access_token', data.access_token);
        this.message = 'Login bem-sucedido!';
      } catch (error) {
        this.message = 'Credenciais inválidas';
        console.error('Erro de login:', error);
      }
    },
    async register() {
      try {
        await axios.post('http://localhost:5000/registro', {
          nome_usuario: this.registerUsername,
          email: this.registerEmail,
          senha: this.registerPassword,
          e_instituicao: false
        });
        this.message = 'Cadastro bem-sucedido!';
      } catch (error) {
        this.message = 'Erro ao cadastrar';
        console.error('Erro de cadastro:', error);
      }
    },
    toggleStep() {
      this.step = this.step === 1 ? 2 : 1;
    },
    getValidation(field) {
      if (field === 'email') {
        return this.loginEmail.length > 0 && this.loginEmail.includes('@') ? true : false;
      } else if (field === 'password') {
        return this.loginPassword.length > 0 ? true : false;
      } else if (field === 'registerUsername') {
        return this.registerUsername.length > 0 ? true : false;
      } else if (field === 'registerEmail') {
        return this.registerEmail.length > 0 && this.registerEmail.includes('@') ? true : false;
      } else if (field === 'registerPassword') {
        return this.registerPassword.length > 0 ? true : false;
      }
      return null;
    }
  }
}
</script>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

.row-login {
  margin-left: 0;
}

.left-login {
  background-color: #F2F2F2;
}

.title-login {
  font-weight: bold;
}

.img-login {
  width: 600px;
  height: 600px;
}

.b-form-group {
  margin-bottom: 30px; 
}
</style>
