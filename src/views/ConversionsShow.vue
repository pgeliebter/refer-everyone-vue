/* this page's route is path: "/conversions/:id" */
<template>
  <div class="conversion-show">
    <h2>{{ conversion.campaign.name }}</h2>
    <h2>{{ conversion.campaign.company }}</h2>
    <div>first_name: {{ conversion.first_name }}</div>
    <div>last name: {{ conversion.last_name }}</div>
    <div>phone: {{ conversion.phone }}</div>
    <div>email: {{ conversion.email }}</div>
    <div>converted at: {{ conversion.created_at }}</div>
    <div>total referrals: {{ conversion.total_referrals }}</div>
    <div>Incentive earned: {{ conversion.total_incentive }}</div>
    <div v-for="referral in limitBy(orderBy(conversion.referrals, 'created_at', -1), 1)" v-bind:key="referral.id">
      Last referral:
      {{ referral.first_name }}
      {{ referral.last_name }}
    </div>
    <label for="link">Link:</label>
    <router-link
      :to="{
        name: 'conversions-new',
        params: { campaignId: conversion.campaign.id },
        query: { referredBy: conversion.id },
      }"
      id="link"
    >
      localhost:8080/{{ conversion.campaign.id }}/new?referredBy={{ conversion.id }}
    </router-link>
    <br />
    <h6>Total Referrals so far:</h6>
    <p>{{ conversion.total_referrals }}</p>
  </div>
</template>
<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
export default {
  data: function () {
    return {
      conversion: { campaign: { name: "" } },
      conversionId: parseInt(this.$route.params.id),
    };
  },
  mixins: [Vue2Filters.mixin],
  created: function () {
    axios.get(`/conversions/${this.$route.params.id}`).then((response) => {
      this.conversion = response.data;
      console.log(this.conversion);
    });
  },
};
</script>
