import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Logout from "../views/Logout.vue";
import CampaignsIndex from "../views/CampaignsIndex.vue";
import CampaignsNew from "../views/CampaignsNew.vue";
import CampaignsShow from "../views/CampaignsShow.vue";
import ConversionsShow from "../views/ConversionsShow.vue";
import ConversionsNew from "../views/ConversionsNew.vue";
import ConversionComplete from "../views/ConversionComplete.vue";
import Test from "../views/Test.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    path: "/lookup",
    name: "conversions-show",
    component: ConversionsShow,
  },
  {
    path: "/:campaignId/new/",
    name: "conversions-new",
    component: ConversionsNew,
  },
  {
    path: "/success/:id/",
    name: "conversion-complete",
    component: ConversionComplete,
  },
  {
    path: "/test",
    name: "something",
    component: Test,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
