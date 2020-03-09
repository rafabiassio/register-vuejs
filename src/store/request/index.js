import RestRepository from "../../repositories/RestRepository";

export default {
  namespaced: true,
  state: {
    content: [],
    single: null,
    loading: false,
    dataSaved: false,
    error: {
      status: false,
      msg: ""
    }
  },
  getters: {
    products: state => {
      return state.content;
    },
    single: state => {
      return state.single;
    },
    quantity: state => {
      return state.content.length || 0;
    }
  },
  mutations: {
    loadList: (state, response) => {
      const { data } = response;
      state.content = data;
    },
    loadById: (state, response) => {
      const { data } = response;
      state.single = data;
    },
    dataSaved: (state, newValue) => {
      state.dataSaved = newValue;
    },
    handleError: (state, newValue) => {
      state.error = { ...newValue };
    }
  },
  actions: {
    getList: async context => {
      context.commit("loadList", await RestRepository("/pedidos").get());
    },
    getById: async (context, id) => {
      context.commit("loadById", await RestRepository("/pedidos").getById(id));
    },
    updateById: async (context, payload) => {
      try {
        const data = {
          ...payload,
          id: payload.id,
          cliente: {
            id: payload.cliente.id,
            nome: payload.cliente.nome
          },
          valorTotal: payload.itens.reduce((sum, item) => {
            return sum + item.subtotal;
          }, 0)
        };
        await RestRepository("/pedidos").update(data, data.id);
        context.commit("dataSaved", true);
      } catch (error) {
        context.commit("handleError", { status: true, msg: error });
      } finally {
        context.commit("loadList", await RestRepository("/pedidos").get());
      }
    },
    create: async (context, payload) => {
      try {
        const data = {
          ...payload,
          cliente: {
            id: payload.cliente.id,
            nome: payload.cliente.nome
          },
          dataEmissao: new Date(),
          valorTotal: payload.itens.reduce((sum, item) => {
            return sum + item.subtotal;
          }, 0)
        };
        await RestRepository("/pedidos").create(data);
        context.commit("dataSaved", true);
      } catch (error) {
        context.commit("handleError", { status: true, msg: error });
      } finally {
        context.commit("loadList", await RestRepository("/pedidos").get());
      }
    },
    delete: async (context, id) => {
      try {
        await RestRepository("/pedidos").remove(id);
      } catch (error) {
        // context.commit("handleError", { status: true, msg: error });
      } finally {
        context.commit("loadList", await RestRepository("/pedidos").get());
      }
    },
    resetDataSaved: context => {
      context.commit("dataSaved", false);
    },
    resetErrorStatus: context => {
      context.commit("handleError", { status: false, msg: "" });
    }
  }
};
