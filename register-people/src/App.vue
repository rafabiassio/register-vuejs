<template>
  <div id="app">
    <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">Loja</span>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Menu</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>view_list</md-icon>
          <span class="md-list-item-text">
            <router-link to="/list/people">Listar Clientes</router-link>
          </span>
        </md-list-item>

        <md-list-item>
          <md-icon>view_list</md-icon>
          <span class="md-list-item-text">
            <router-link to="/list/product">Listar Produtos</router-link>
          </span>
        </md-list-item>

        <md-list-item>
          <md-icon>view_list</md-icon>
          <span class="md-list-item-text">
            <router-link to="/list/request">Listar Pedidos</router-link>
          </span>
        </md-list-item>

        <md-list-item>
          <md-icon>person_add</md-icon>
          <span class="md-list-item-text">
            <router-link to="/people/0">Cadastrar Clientes</router-link>
          </span>
        </md-list-item>

        <md-list-item>
          <md-icon>note_add</md-icon>
          <span class="md-list-item-text">
            <router-link to="/product/0">Cadastrar Produtos</router-link>
          </span>
        </md-list-item>

        <md-list-item>
          <md-icon>playlist_add</md-icon>
          <span class="md-list-item-text">
            <router-link to="/request/0">Cadastrar Pedidos</router-link>
          </span>
        </md-list-item>
      </md-list>
    </md-drawer>

    <md-content>
      <router-view :key="$route.fullPath" />
    </md-content>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    showNavigation: false,
    contextTitle: "Loja"
  }),
  methods: {
    watchStore(mutation, state) {
      if (mutation.type == "loader/changeContextTitle") {
        this.contextTitle = state.loader.contextTitle;
      }
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      this.watchStore(mutation, state);
    });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* .md-app {
  min-height: 350px;
  border: 1px solid rgba(#000, 0.12);
} */

/* .md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
} */
</style>
