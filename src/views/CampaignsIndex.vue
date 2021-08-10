/* this page's path is "/campaigns" */
<template>
  <div class="campaigns-index">
    <div v-for="campaign in campaigns" :key="campaign.id">
      <div v-text="`ID: ${campaign.id}`"></div>
      <div v-text="`Campaign: ${campaign.name}`"></div>
      <div v-text="`Company: ${campaign.company}`"></div>
      <div v-text="`Conversions: ${campaign.total_conversions}`"></div>
      <router-link :to="`${campaign.id}/new`">Link: localhost:8080/{{ campaign.id }}/new</router-link>
      <br />
      <router-link :to="`campaigns/${campaign.id}`"><button>View more detail</button></router-link>
      <hr />
      <div></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: function () {
    return {
      campaigns: [],
    };
  },
  created: function () {
    this.indexCampaigns();
  },
  methods: {
    indexCampaigns: function () {
      axios
        .get("/campaigns")
        .then((response) => {
          this.campaigns = response.data;
          console.log(this.campaigns);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
};
</script>
