<template>
  <div class="wrapper">
    <form novalidate class="md-layout wrapper" @submit.prevent="saveData">
      <md-card class="md-layout-item md-small-size-100">
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
          <md-button
            class="md-dense md-raised md-accent"
            :disabled="isLoading"
            @click="handleCancel"
            >Cancelar</md-button
          >
          <md-button type="submit" class="md-dense md-raised md-primary" :disabled="isLoading || finished"
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
    },
    finished: false
  }),
  methods: {
    clearForm() {
      this.$v.$reset();
      this.formData.descricao = null;
      this.formData.valoUnitario = null;
    },
    saveData() {
      if (this.id) {
        this.$store.dispatch(`product/updateById`, this.formData);
      } else {
        this.$store.dispatch(`product/create`, this.formData);
      }
    },
    handleCancel() {
      this.$router.go(-1);
    },
    watchStore(mutation, state) {
      switch (mutation.type) {
        case "product/loadById":
          console.log("CALLED");
          this.formData = { ...state.product.single };
          break;
        case "loader/isLoading":
          this.isLoading = state.loader.loading;
          break;
        case "product/dataSaved":
          console.log("CALLED");
          this.dataSaved = state.product.dataSaved;
          resetInfo(`product/resetDataSaved`, 3000);
          // this.$router.push(`/list/product`);
          break;
        case "product/handleError":
          this.error = { ...state.product.error };
          resetInfo(`product/resetErrorStatus`, 5000);
          break;
      }
    }
  },
  created() {
    this.$store.dispatch(`loader/setContextTitle`, 'Cadastro de Produtos');
    this.$store.subscribe((mutation, state) => {
      this.watchStore(mutation, state);
    });
    if (this.id) {
      this.contextLabel = "Editar produto";
      this.id = this.$route.params.id;
      this.$store.dispatch(`product/getById`, this.id);
    } else {
      this.contextLabel = "Cadastrar produto";
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
            this.$router.push(`/list/product`);
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
