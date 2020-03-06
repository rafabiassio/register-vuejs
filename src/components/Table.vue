<template>
  <md-card>
    <md-card-content>
      <md-field md-clearable class="filter">
        <md-icon>search</md-icon>
        <md-input placeholder="Digite para filtrar..." v-model="search" @input="searchOnTable" />
      </md-field>
      <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-fixed-header>
        <md-table-toolbar> </md-table-toolbar>

        <md-table-empty-state><md-progress-bar md-mode="indeterminate"/></md-table-empty-state>

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
            <Button @handleClick="handleEdit(item.id)" label="Editar" classType="icon-primary" icon="edit"/>
          </md-table-cell>
          <md-table-cell md-label="Remover">
            <Button @handleClick="handleDelete(item.id)" label="Deletar" classType="icon-accent" icon="delete"/>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </md-card-content>
  </md-card>
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
  width: 100%;
  margin: 0;
}
</style>
