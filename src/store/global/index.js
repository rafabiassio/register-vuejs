import RestRepository from "../../repositories/RestRepository";

export default {
  namespaced: true,
  state: {
    quantity: {
      peoples: 0,
      products: 0,
      requests: 0,
    }
  },
  mutations: {
    loadQuantityPeople: (state, response) => {
      const { data } = response;
      state.quantity.peoples = data.length || 0;
    },
    loadQuantityProduct: (state, response) => {
      const { data } = response;
      state.quantity.products = data.length || 0;
    },
    loadQuantityRequest: (state, response) => {
      const { data } = response;
      state.quantity.requests = data.length || 0;
    },
  },
  actions: {
    getQuantityPeople: async context => {
      context.commit("loadQuantityPeople", await RestRepository("/pessoas").get());
    },
    getQuantityProduct: async context => {
      context.commit("loadQuantityProduct", await RestRepository("/produtos").get());
    },
    getQuantityRequest: async context => {
      context.commit("loadQuantityRequest", await RestRepository("/pedidos").get());
    },
  }
};
