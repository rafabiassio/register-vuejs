import Vue from "vue";
import Vuex from "vuex";

import LoaderStore from "./loader";
import PeopleStore from "./people";
import ProductStore from "./product";
import RequestStore from "./request";
import GlobalStore from "./global";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loader: LoaderStore,
    people: PeopleStore,
    product: ProductStore,
    request: RequestStore,
    global: GlobalStore
  }
});
