<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="saveData">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">{{ contextLabel }}</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="first-name">Descrição</label>
                <md-input
                  name="descricao"
                  id="descricao"
                  v-model="formData.descricao"
                  :disabled="isLoading"
                />
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="valoUnitario">Valor unitário</label>
                <md-input
                  name="valoUnitario"
                  id="valoUnitario"
                  v-model="formData.valoUnitario"
                  :disabled="isLoading"
                />
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="isLoading" />

        <md-card-actions>
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
const resetInfo = (type, timeAlive) => {
  setTimeout(() => {
    this.$store.dispatch(`${type}`);
  }, timeAlive);
};

export default {
  name: "Product",
  data: () => ({
    contextLabel: "",
    id: null,
    formData: {
      descricao: null,
      valoUnitario: null
    },
    isLoading: false,
    dataSaved: false,
    error: {
      status: false,
      msg: ""
    }
  }),
  computed: {
    isEdit() {
      return this.$route.params.id != null;
    }
  },
  methods: {
    clearForm() {
      this.$v.$reset();
      this.formData.descricao = null;
      this.formData.valoUnitario = null;
    },
    saveData() {
      if (this.isEdit) {
        this.$store.dispatch(`product/updateById`, this.formData);
      } else {
        this.$store.dispatch(`product/create`, this.formData);
      }
    },
    watchStore(mutation, state) {
      switch (mutation.type) {
        case "product/loadById":
          this.formData = { ...state.product.single };
          break;
        case "loader/isLoading":
          this.isLoading = state.loader.loading;
          break;
        case "product/dataSaved":
          this.dataSaved = state.product.dataSaved;
          resetInfo(`product/resetDataSaved`, 5000);
          break;
        case "product/handleError":
          this.error = { ...state.product.error };
          resetInfo(`product/resetDataSaved`, 10000);
          break;
      }
    }
  },
  created() {
    if (this.isEdit) {
      this.contextLabel = "Editar produto";
      this.id = this.$route.params.id;
      this.$store.dispatch(`product/getById`, this.id);
      this.$store.subscribe((mutation, state) => {
        this.watchStore(mutation, state);
      });
    } else {
      this.contextLabel = "Cadastrar produto";
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
