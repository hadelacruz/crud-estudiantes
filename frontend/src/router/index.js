import Vue from "vue";
import Router from "vue-router";
import Students from "../views/Students.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "students",
      component: Students,
    },
    {
      path: "/students",
      name: "students-alias",
      component: Students,
    },
  ],
});

export default router;
