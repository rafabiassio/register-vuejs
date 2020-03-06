export default {
  namespaced: true,
  state: {
    loading: false,
    dataSaved: false
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
  },
  actions: {
    setLoading: (context, isLoading) => {
      context.commit("setLoading", isLoading);
    },
    dataSaved: (context, dataSaved) => {
      context.commit("dataSaved", dataSaved);
    },
  }
};
