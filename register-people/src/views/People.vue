<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateData">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">{{ contextLabel }}</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('nome')">
                <label for="nome">Nome</label>
                <md-input
                  name="nome"
                  id="nome"
                  v-model="formData.nome"
                  :disabled="isLoading"
                />
                <!-- <span class="md-error" v-if="!$v.form.nome.required">O nome é obrigatório</span> -->
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('cpf')">
                <label for="cpf">CPF</label>
                <md-input name="cpf" id="cpf" v-model="formData.cpf" :disabled="isLoading" />
                <!-- <span class="md-error" v-else-if="!$v.form.cpf.minlength">Invalid last name</span> -->
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <md-datepicker
              id="dataNascimento"
              v-model="formData.dataNascimento"
              md-immediately
              :disabled="isLoading"
            />
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="isLoading" />

        <md-card-actions>
          <!-- <Button :type="submit" :label="Salvar" :classType="primary" :disabled="sending" 
          :class="[submit-bnt]"/> -->
          <md-button type="submit" class="md-dense md-raised md-primary" :disabled="isLoading"
            >Salvar</md-button
          >
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="dataSaved">Salvo com sucesso!</md-snackbar>
      <md-snackbar :md-active.sync="error.status">Erro ao salvar dados</md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";

// import { required } from "vuelidate/lib/validators";

const resetInfo = (type, timeAlive) => {
  setTimeout(() => {
    this.$store.dispatch(`${type}`);
  }, timeAlive);
};

export default {
  name: "People",
  mixins: [validationMixin],
  data: () => ({
    contextLabel: "",
    id: null,
    formData: {
      nome: null,
      cpf: null,
      dataNascimento: null
    },
    isLoading: false,
    dataSaved: false,
    error: {
      status: false,
      msg: ""
    }
  }),
  validations: {
    form: {
      // nome: required
    }
  },
  computed: {
    isEdit() {
      return this.$route.params.id != null;
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.formData.nome = null;
      this.formData.cpf = null;
      this.formData.dataNascimento = null;
    },
    saveData() {
      if (this.isEdit) {
        this.$store.dispatch(`people/updateById`, this.formData);
      } else {
        this.$store.dispatch(`people/create`, this.formData);
      }
    },
    validateData() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveData();
      }
    },
    disabledDates(date) {
      const today = new Date().getTime();
      debugger;
      return date.getTime() > today;
    },
    watchStore(mutation, state) {
      switch (mutation.type) {
        case "people/loadById":
          this.formData = { ...state.people.single };
          break;
        case "loader/isLoading":
          this.isLoading = state.loader.loading;
          break;
        case "people/dataSaved":
          this.dataSaved = state.people.dataSaved;
          resetInfo(`people/resetDataSaved`, 5000);
          break;
        case "people/handleError":
          this.error = { ...state.people.error };
          resetInfo(`people/resetDataSaved`, 10000);
          break;
      }
    }
  },
  created() {
    if (this.isEdit) {
      this.contextLabel = "Editar pessoa";
      this.id = this.$route.params.id;
      this.$store.dispatch(`people/getById`, this.id);
      this.$store.subscribe((mutation, state) => {
        this.watchStore(mutation, state);
      });
    } else {
      this.contextLabel = "Cadastrar pessoa";
    }
  }
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.submit-bnt {
  width: 6rem;
  height: 2.5rem;
}
</style>
