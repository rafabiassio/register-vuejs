<template>
  <div>
    <section class="tableWrapper">
      <Table
        :context="labelContext"
        :data="tableData"
        @editItem="editItem"
        @deleteItem="deleteItem"
      />
    </section>
    <Button @handleClick="createItem()" classType="fab" icon="add" />
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import Button from "@/components/Button.vue";

const getLabelContext = context => {
  switch (context) {
    case "people":
      return "Pessoas";
    case "product":
      return "Produtos";
    case "request":
      return "Pedidos";
  }
};

export default {
  name: "List",
  components: {
    Table,
    Button
  },
  data: () => ({
    context: "",
    tableData: []
  }),
  computed: {
    labelContext() {
      return getLabelContext(this.context);
    }
  },
  methods: {
    createItem() {
      this.$router.push(`/${this.context}/0`);
    },
    editItem(id) {
      this.$router.push(`/${this.context}/${id}`);
    },
    deleteItem(id) {
      this.$store.dispatch(`${this.context}/delete`, id);
    },
    watchStore(mutation, state) {
      const contextList = `${this.context}/loadList`;
      switch (mutation.type) {
        case contextList:
          this.tableData = [...state[`${this.context}`].content];
          break;
      }
    }
  },
  created() {
    this.context = this.$route.params.context;
    this.$store.dispatch(`${this.context}/getList`);
    this.$store.subscribe((mutation, state) => {
      this.watchStore(mutation, state);
    });
  },
};
</script>

<style lang="scss" scoped>
.tableWrapper {
  padding: 1rem;
}
</style>
