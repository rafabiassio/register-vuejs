import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/list/:context",
    name: "List",
    component: () => import("../views/List.vue")
  },
  {
    path: "/people/:id",
    name: "People",
    component: () => import("../views/People.vue")
  },
  {
    path: "/product/:id",
    name: "Product",
    component: () => import("../views/Product.vue")
  },
  {
    path: "/request/:id",
    name: "Request",
    component: () => import("../views/Request.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
