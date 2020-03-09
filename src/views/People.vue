<template>
  <div class="wrapper">
    <form novalidate class="md-layout" @submit.prevent="validateData">
      <md-card class="md-layout-item md-small-size-100">
        <md-card-header>
          <div class="md-title">{{ contextLabel }}</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('nome')">
                <label for="nome">Nome</label>
                <md-input name="nome" id="nome" v-model="form.nome" :disabled="isLoading" />
                <span class="md-error" v-if="!$v.form.nome.required">O nome é obrigatório</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('cpf')">
                <label for="cpf">CPF</label>
                <md-input
                  name="cpf"
                  id="cpf"
                  v-model="form.cpf"
                  :disabled="isLoading"
                  maxlength="11"
                  :md-counter="`${false}`"
                />
                <!-- <span class="md-error" v-if="!$v.form.cpf.minlength">CPF inválido</span> -->
                <span class="md-error" v-if="!$v.form.cpf.validateCPF">CPF inválido</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <md-datepicker
              id="dataNascimento"
              v-model="form.dataNascimento"
              md-immediately
              :disabled="isLoading"
            >
              <label>Data de nascimento</label>
            </md-datepicker>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="isLoading" />

        <md-card-actions>
          <md-button
            class="md-dense md-raised md-accent"
            :disabled="isLoading"
            @click="handleCancel"
            >Cancelar</md-button
          >
          <md-button
            type="submit"
            class="md-dense md-raised md-primary"
            :disabled="isLoading || finished"
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
import { required } from "vuelidate/lib/validators";
import { validateCPF } from "../utils/validation";

const resetInfo = (type, timeAlive) => {
  setTimeout(function() {
    this.$store.dispatch(`${type}`);
  }, timeAlive);
};

export default {
  name: "People",
  mixins: [validationMixin],
  data: () => ({
    contextLabel: "",
    id: null,
    form: {
      nome: null,
      cpf: null,
      dataNascimento: null
    },
    isLoading: false,
    dataSaved: false,
    error: {
      status: false,
      msg: ""
    },
    finished: false
  }),
  validations: {
    form: {
      nome: {
        required
      },
      cpf: {
        required,
        validateCPF
      }
    }
  },
  computed: {
    isEdit() {
      return Boolean(this.$route.params.id);
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
      this.form.nome = null;
      this.form.cpf = null;
      this.form.dataNascimento = null;
    },
    saveData() {
      if (this.id) {
        this.$store.dispatch(`people/updateById`, this.form);
      } else {
        this.$store.dispatch(`people/create`, this.form);
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
      return date.getTime() > today;
    },
    handleCancel() {
      this.$router.go(-1);
    },
    watchStore(mutation, state) {
      switch (mutation.type) {
        case "people/loadById":
          this.form = { ...state.people.single };
          break;
        case "loader/isLoading":
          this.isLoading = state.loader.loading;
          break;
        case "people/dataSaved":
          this.dataSaved = state.people.dataSaved;
          resetInfo(`people/resetDataSaved`, 3000);
          break;
        case "people/handleError":
          this.error = { ...state.people.error };
          resetInfo(`people/resetErrorStatus`, 5000);
          break;
      }
    }
  },
  created() {
    const hrefId = window.location.href.split('people/')[1]
    this.$store.dispatch(`loader/setContextTitle`, 'Cadastro de Clientes');
    this.$store.subscribe((mutation, state) => {
      this.watchStore(mutation, state);
    });
    if (Number(hrefId)) {
      this.id = hrefId;
      this.$store.dispatch(`people/getById`, this.id);
      this.contextLabel = "Editar cliente";
    } else {
      this.contextLabel = "Cadastrar cliente";
    }
  },
  watch: {
    dataSaved: {
      immediate: true,
      handler() {
        if (this.dataSaved) {
          this.finished = true;
        }
        if (this.finished) {
          if (!this.dataSaved) {
            this.$router.push(`/list/people`);
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 1rem;
}
.md-card {
  padding: 2rem;
}
.md-card-header {
  padding-bottom: 1rem;
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.md-card-actions {
  display: flex;
  justify-content: space-between;
}
</style>
