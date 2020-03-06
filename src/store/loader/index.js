export default {
  namespaced: true,
  state: {
    loading: false,
    dataSaved: false,
    contextTitle: ''
  },
  getters : {
    isLoading : state => {
      return state.loading;
    },
    dataSaved : state => {
      return state.dataSaved;
    }
  },
  mutations: {
    setLoading: (state, newValue) => {
      state.loading = newValue
    },
    dataSaved: (state, newValue) => {
      state.dataSaved = newValue
    },
    changeContextTitle: (state, newValue) => {
      state.contextTitle = newValue
    },
  },
  actions: {
    setLoading: (context, isLoading) => {
      context.commit("setLoading", isLoading);
    },
    dataSaved: (context, dataSaved) => {
      context.commit("dataSaved", dataSaved);
    },
    setContextTitle: (context, newValue) => {
      context.commit("changeContextTitle", newValue);
    },
  }
};
