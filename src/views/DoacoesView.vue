<template>
  <div class="doacoes">
    <v-container>
      <h1 class="subheading grey--text text-center">Gerenciar Doações</h1>

      <v-row justify="center" class="mb-3">
        <v-btn color="blue" @click="openDialog">Nova Doação</v-btn>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="donations"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn icon @click="editDonation(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteDonation(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <!-- Diálogo de Doação -->
      <v-dialog v-model="dialog" persistent max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ editing ? 'Editar Doação' : 'Nova Doação' }}</span>
          </v-card-title>
          <v-form class="px-3" ref="form">
            <v-card-text>
              <v-text-field
                label="Alimento"
                v-model="donation.title"
                prepend-icon="apple"
                :rules="inputRules"
              ></v-text-field>
              <v-text-field
                label="Doador"
                v-model="donation.donor"
                prepend-icon="person"
                :rules="inputRules"
              ></v-text-field>
              <v-text-field
                label="Beneficiado"
                v-model="donation.beneficiary"
                prepend-icon="person"
                :rules="inputRules"
              ></v-text-field>
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
                      label="Data da Doação"
                      hint="MM/DD/YYYY formato"
                      persistent-hint
                      prepend-icon="event"
                      @blur="donation.date = parseDate(dateFormatted)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="donation.date" no-title @input="menu1 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <!-- Feedback visual para submissão -->
              <v-alert v-if="submissionSuccess" type="success" dismissible>
                Dados salvos com sucesso!
              </v-alert>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Fechar</v-btn>
              <v-btn color="green" text outlined @click="submit">{{ editing ? 'Atualizar' : 'Salvar' }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      editing: false,
      donation: {
        title: '',
        donor: '',
        beneficiary: '',
        date: new Date().toISOString().substr(0, 10),
      },
      dateFormatted: '',
      menu1: false,
      submissionSuccess: false,
      inputRules: [v => !!v || 'Este campo é obrigatório'],
      donations: [],
      headers: [
        { text: 'Alimento', value: 'title' },
        { text: 'Doador', value: 'donor' },
        { text: 'Beneficiado', value: 'beneficiary' },
        { text: 'Data da Doação', value: 'date' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    parseDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    openDialog() {
      this.resetForm();
      this.dialog = true;
    },
    editDonation(item) {
      this.donation = { ...item };
      this.dateFormatted = item.date.split('T')[0];
      this.editing = true;
      this.dialog = true;
    },
    deleteDonation(item) {
      this.donations = this.donations.filter(donation => donation !== item);
      this.$emit('snackbar', { message: 'Doação excluída com sucesso!', color: 'success' });
    },
    submit() {
      if (this.editing) {
        const index = this.donations.findIndex(d => d.id === this.donation.id);
        this.$set(this.donations, index, { ...this.donation });
      } else {
        const newDonation = {
          id: this.donations.length + 1, // Simulando ID
          ...this.donation,
        };
        this.donations.push(newDonation);
      }
      this.submissionSuccess = true;
      this.resetForm();
      this.dialog = false;

      // Simula o envio e esconde a mensagem após 3 segundos
      setTimeout(() => {
        this.submissionSuccess = false;
      }, 2000);
    },
    resetForm() {
      this.donation = {
        title: '',
        donor: '',
        beneficiary: '',
        date: new Date().toISOString().substr(0, 10),
      };
      this.dateFormatted = '';
      this.editing = false;
    },
  },
};
</script>

<style scoped>
.doacoes {
  padding: 20px;
}
</style>
