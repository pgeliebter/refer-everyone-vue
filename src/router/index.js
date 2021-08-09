import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import CampaignsIndex from "../views/CampaignsIndex.vue";
import CampaignsNew from "../views/CampaignsNew.vue";
import CampaignsShow from "../views/CampaignsShow.vue";
import ConversionsShow from "../views/ConversionsShow.vue";
import ConversionsNew from "../views/ConversionsNew.vue";
import ConversionComplete from "../views/ConversionComplete.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "/campaigns",
    name: "campaigns-index",
    component: CampaignsIndex,
  },
  {
    path: "/campaigns/new",
    name: "campaigns-new",
    component: CampaignsNew,
  },
  {
    path: "/campaigns/:id",
    name: "campaigns-show",
    component: CampaignsShow,
  },
  {
    path: "/conversions/:id",
    name: "conversions-show",
    component: ConversionsShow,
  },
  {
    path: "/:campaign_id/new/",
    name: "conversions-new",
    component: ConversionsNew,
  },
  {
    path: "/success/:id/",
    name: "conversion-complete",
    component: ConversionComplete,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
