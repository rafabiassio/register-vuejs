import Vue from "vue";
import Vuex from "vuex";

import LoaderStore from "./loader";
import PeopleStore from "./people";
import ProductStore from "./product";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loader: LoaderStore,
    people: PeopleStore,
    product: ProductStore
  }
});
