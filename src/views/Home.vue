<template>
  <div class="home">
    <div @click="redirect('people')" class="cardWrapper">
      <md-card>
        <md-card-content>
          <span>Clientes</span>
          <span>{{ peopleQuantity }}</span>
        </md-card-content>
      </md-card>
    </div>
    <div @click="redirect('product')" class="cardWrapper">
      <md-card>
        <md-card-content>
          <span>Produtos</span>
          <span>{{ productQuantity }}</span>
        </md-card-content>
      </md-card>
    </div>
    <div @click="redirect('request')" class="cardWrapper">
      <md-card>
        <md-card-content>
          <span>Pedidos</span>
          <span>{{ requestQuantity }}</span>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters({
      peopleQuantity: "people/quantity",
      productQuantity: "product/quantity",
      requestQuantity: "request/quantity",
    })
  },
  methods: {
    redirect(context) {
      this.$router.push(`/list/${context}`);
    }
  },
  created() {
    this.$store.dispatch("people/getList");
    this.$store.dispatch("product/getList");
    this.$store.dispatch("request/getList");
  }
};
</script>

<style scoped>
.cardWrapper {
  padding: 2rem 6rem;
}
.md-card-content {
  display: flex;
  justify-content: space-between;
}
</style>
