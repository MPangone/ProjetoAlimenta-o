<template>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">Nova doação</span>
          </v-card-title>
          <v-form class="px-3" ref="form">
            <v-card-text>
              <v-text-field label="Alimento" v-model="title" prepend-icon="apple" :rules="inputRules"></v-text-field>
              <v-text-field label="Doador" v-model="content" prepend-icon="person" :rules="inputRules"></v-text-field>
              <v-text-field label="Beneficiado" v-model="content1" prepend-icon="person" :rules="inputRules"></v-text-field>
              <v-col cols="12" lg="6">
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
                      v-model="dateFormatted"
                      label="Data da doação"
                      hint="MM/DD/YYYY formato"
                      persistent-hint
                      prepend-icon="event"
                      @blur="date = parseDate(dateFormatted)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <!-- Feedback visual para submissão -->
              <v-alert v-if="submissionSuccess" type="success" dismissible>
                Dados enviados com sucesso!
              </v-alert>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Fechar</v-btn>
              <v-btn color="green" text outlined @click="submit">Salvar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
  
  <script>
  export default {
    data: () => ({
      dialog: false,
      title: '',
      content: '',
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: '',
      menu1: false,
      submissionSuccess: false, // Controle de sucesso na submissão
      inputRules: [v => v.length >= 3 || 'Mínimo de 3 caracteres'],
    }),
    methods: {
      parseDate(date) {
        if (!date) return null;
        const [year, month, day] = date.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      },
      openDialog() {
        console.log('Abrindo formulário de doações');
        this.dialog = true;
        this.resetForm(); // Limpa o formulário ao abrir novamente
      },
      submit() {
        // Simulação de submissão
        console.log('Formulário submetido:', this.title, this.content, this.content1, this.date);
        this.submissionSuccess = true; // Mostra a mensagem de sucesso
  
        // Simula o envio e esconde a mensagem após 3 segundos
        setTimeout(() => {
          this.submissionSuccess = false;
        }, 2000);
      },
      resetForm() {
        this.title = '';
        this.content = '';
        this.content1 = '';
        this.date = new Date().toISOString().substr(0, 10);
        this.dateFormatted = '';
      }
    },
    created() {
      this.$root.$on('open-doacoes-form', this.openDialog);
    },
    beforeDestroy() {
      this.$root.$off('open-doacoes-form', this.openDialog);
    }
  };
  </script>
  