/* this page's path is "/success/:id/" */
<template>
  <div class="conversion-complete">
    <h2>{{ conversion.campaign.name }}</h2>
    <h2>{{ conversion.campaign.company }}</h2>
    <div>
      <h6>Refer your friends!</h6>
      <h6>Copy and paste this link and send to your friends:</h6>
      <router-link
        :to="{
          name: 'conversions-new',
          params: { campaignId: conversion.campaign.id },
          query: { referredBy: conversion.id },
        }"
      >
        localhost:8080/{{ conversion.campaign.id }}/new?referredBy={{ conversion.id }}
      </router-link>
      <br />
      <h6>Total Referrals so far:</h6>
      <p>{{ conversion.total_referrals }}</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: function () {
    return {
      conversion: {},
      conversionId: parseInt(this.$route.params.id),
    };
  },
  created: function () {
    axios.get(`/conversions/${this.$route.params.id}`).then((response) => {
      this.conversion = response.data;
      console.log(this.conversion);
    });
  },
};
</script>
