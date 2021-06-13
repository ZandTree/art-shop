import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import SignUp from "@/views/auth/SignUp";
import ConfirmEmail from '@/views/auth/ConfirmEmail'
import Login from '@/views/auth/Login'
import Activate from '@/views/auth/Activate'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/confirm-email-link/",
    name: "confirmEmail",
    component: ConfirmEmail,
  },
  {
    path: "/activate/:uid/:token",
    name: "activate",
    component: Activate,
    props:true
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;