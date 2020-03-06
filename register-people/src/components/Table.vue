<template>
  <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
    <md-table-toolbar>
      <div class="md-toolbar-section-start">
        <h1 class="md-title">{{ context || "Dados" }}</h1>
      </div>

      <md-field md-clearable class="md-toolbar-section-end">
        <md-icon>search</md-icon>
        <md-input placeholder="Digite para filtrar..." v-model="search" @input="searchOnTable" />
      </md-field>
    </md-table-toolbar>

    <md-table-empty-state md-label="Não há dados"> </md-table-empty-state>

    <md-table-row slot="md-table-row" slot-scope="{ item }">
      <md-table-cell
        v-for="(value, att) in item"
        :md-label="att.toUpperCase()"
        :md-sort-by="att"
        :key="`${att}-${getRandomKey}`"
      >
        {{ value }}
      </md-table-cell>
      <md-table-cell md-label="Editar">
        <Button @handleClick="handleEdit(item.id)" label="Editar" classType="primary" />
      </md-table-cell>
      <md-table-cell md-label="Remover">
        <Button @handleClick="handleDelete(item.id)" label="Deletar" classType="accent" />
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import Button from "@/components/Button.vue";

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
    Button
  },
  data: () => ({
    searched: [],
    search: ""
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
.md-field {
  max-width: 300px;
}
</style>
