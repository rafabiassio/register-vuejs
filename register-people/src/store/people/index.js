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
    peoples: state => {
      return state.content;
    },
    single: state => {
      return state.single;
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
      context.commit("loadList", await RestRepository("/pessoas").get());
    },
    getById: async (context, id) => {
      context.commit("loadById", await RestRepository("/pessoas").getById(id));
    },
    updateById: async (context, payload) => {
      try {
        await RestRepository("/pessoas").update(payload, payload.id);
        context.commit("dataSaved", true);
      } catch (error) {
        debugger;
        context.commit("handleError", { status: true, msg: error });
      } finally {
        context.commit("loadList", await RestRepository("/pessoas").get());
      }
    },
    create: async (context, payload) => {
      try {
        await RestRepository("/pessoas").create(payload);
        context.commit("dataSaved", true);
      } catch (error) {
        context.commit("handleError", { status: true, msg: error });
      } finally {
        context.commit("loadList", await RestRepository("/pessoas").get());
      }
    },
    delete: async (context, id) => {
      try {
        await RestRepository("/pessoas").remove(id);
      } catch (error) {
        // context.commit("handleError", { status: true, msg: error });
      } finally {
        context.commit("loadList", await RestRepository("/pessoas").get());
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
