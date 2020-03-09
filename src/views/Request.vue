<template>
  <div class="wrapper">
    <form novalidate class="md-layout" @submit.prevent="saveData">
      <md-card class="md-layout-item md-small-size-100">
        <md-card-header>
          <div class="md-title">{{ contextLabel }}</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout-item md-small-size-100">
            <md-autocomplete v-model="formData.cliente" :md-options="clients">
              <label>Cliente</label>
            </md-autocomplete>
          </div>

          <md-field>
            <label for="products">Produtos</label>
            <md-select v-model="selectdItens" name="products" id="products" multiple>
              <md-option v-for="(product, index) in products" :value="product.id" :key="index">{{
                product.descricao
              }}</md-option>
            </md-select>
          </md-field>

          <md-card v-for="itemId in selectdItens" :key="itemId" class="itemCard">
            <span class="deleteCard">
              <Button @handleClick="removeItem(itemId)" classType="icon-flat" icon="close" />
            </span>
            <md-card-content>
              <div class="md-title">{{ getProduct(itemId).descricao }}</div>
              <md-field>
                <label>Insira a quantidade...</label>
                <md-input v-model="quantityItens[itemId]" :disabled="isLoading" type="number" />
              </md-field>
            </md-card-content>
          </md-card>

          <!-- <div class="md-layout md-gutter">
            <md-datepicker
              id="dataEmissao"
              v-model="formData.dataEmissao"
              md-immediately
              :disabled="isLoading"
            >
              <label>Data de emissão</label>
            </md-datepicker>
          </div> -->
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
import Button from "@/components/Button.vue";
import { validationMixin } from "vuelidate";

const resetInfo = (type, timeAlive) => {
  setTimeout(function() {
    this.$store.dispatch(`${type}`);
  }, timeAlive);
};

export default {
  name: "Request",
  mixins: [validationMixin],
  components: {
    Button
  },
  data: () => ({
    contextLabel: "",
    id: null,
    formData: {
      cliente: null,
      itens: []
    },
    // for Autocomplete and select
    clients: [],
    products: [],
    selectdItens: [],
    quantityItens: {},
    pureData: {
      people: []
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
    parseFormData() {
      const data = { ...this.formData };
      data.cliente = this.pureData.people.find(people => people.id == data.cliente[0]);
      data.itens = this.selectdItens.map(itemId => {
        const item = this.getProduct(itemId);
        return {
          // id: index,
          produto: {
            id: item.id,
            descricao: item.descricao
          },
          valor: item.valoUnitario,
          quantidade: this.quantityItens[itemId] || 1,
          subtotal: this.quantityItens[itemId] * item.valoUnitario
        };
      });
      return data;
    },
    saveData() {
      const parsedData = this.parseFormData();
      if (this.id) {
        parsedData.id = this.id;
        this.$store.dispatch(`request/updateById`, parsedData);
      } else {
        this.$store.dispatch(`request/create`, parsedData);
      }
    },
    handleCancel() {
      this.$router.go(-1);
    },
    populateForm(data) {
      const toForm = {
        ...data,
        cliente: `${data.cliente.id} - ${data.cliente.nome}`,
        itens: []
      };
      this.formData = { ...toForm };
      this.selectdItens = data.itens.map(item => {
        const itemId = item.produto.id;
        this.quantityItens[itemId] = item.quantidade;
        return itemId;
      });
    },
    watchStore(mutation, state) {
      switch (mutation.type) {
        case "people/loadList":
          this.pureData.people = state.people.content;
          this.setClients(state.people.content);
          break;
        case "product/loadList":
          this.products = state.product.content;
          break;
        case "request/loadById":
          this.populateForm(state.request.single);
          break;
        case "loader/isLoading":
          this.isLoading = state.loader.loading;
          break;
        case "request/dataSaved":
          this.dataSaved = state.request.dataSaved;
          resetInfo(`request/resetDataSaved`, 3000);
          break;
        case "request/handleError":
          this.error = { ...state.request.error };
          resetInfo(`request/resetErrorStatus`, 5000);
          break;
      }
    },
    setClients(dataStore) {
      this.clients = dataStore.map(client => `${client.id} - ${client.nome}`);
    },
    getProduct(itemId) {
      return this.products.find(product => product.id == itemId);
    },
    removeItem(itemId) {
      this.selectdItens = this.selectdItens.filter(item => item != itemId);
      delete this.quantityItens[itemId];
    }
  },
  created() {
    const hrefId = window.location.href.split("request/")[1];
    this.$store.dispatch(`loader/setContextTitle`, "Cadastro de Pedidos");
    this.$store.dispatch(`people/getList`);
    this.$store.dispatch(`product/getList`);
    this.$store.subscribe((mutation, state) => {
      this.watchStore(mutation, state);
    });
    if (Number(hrefId)) {
      this.id = hrefId;
      this.$store.dispatch(`request/getById`, this.id);
      this.contextLabel = "Editar pedido";
    } else {
      this.contextLabel = "Cadastrar pedido";
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
            this.$router.push(`/list/request`);
          }
        }
      }
    },
    selectdItens: {
      immediate: true,
      handler() {
        if (this.selectdItens && this.selectdItens.length > 0) {
          const emptyValues = this.selectdItens.filter(selected => !this.quantityItens[selected]);
          for (let i = 0; i < emptyValues.length; i++) {
            this.quantityItens[emptyValues[i]] = 1;
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
.itemCard {
  padding: unset;
  margin-bottom: 1.5rem;
  position: relative;
}
.deleteCard {
  position: absolute;
  top: 0.25rem;
  right: 0;
  cursor: pointer;
}
</style>
