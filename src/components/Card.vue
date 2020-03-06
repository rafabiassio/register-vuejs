<template>
  <md-card>
    <md-card-header>
      <md-field md-clearable class="filter">
        <md-icon>search</md-icon>
        <md-input placeholder="Digite para filtrar..." v-model="search" @input="searchOnTable" />
      </md-field>
    </md-card-header>

    <md-card-content>
      <md-card>
        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio.
          Dolores, sed accusantium quasi non.
        </md-card-content>
      </md-card>
    </md-card-content>
  </md-card>
</template>

<script>
// import Button from "@/components/Button.vue";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => {
      return Object.values(item).some(att => toLower(att).includes(toLower(term)));
    });
  }

  return items;
};

export default {
  name: "Table",
  props: {
    context: String,
    data: Array
  },
  components: {
    // Button
  },
  data: () => ({
    searched: [],
    search: "",
    model: ["id", "nome", "cpf", "data", "editar", "remover"]
  }),
  methods: {
    searchOnTable() {
      this.searched = searchByName(this.data, this.search);
    },
    getRandomKey() {
      return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    },
    handleEdit(id) {
      this.$emit("editItem", id);
    },
    handleDelete(id) {
      this.$emit("deleteItem", id);
    }
  },
  created() {
    this.searchOnTable();
  },
  watch: {
    data: {
      immediate: true,
      handler() {
        this.searchOnTable();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.filter {
  width: 100%;
}
</style>
