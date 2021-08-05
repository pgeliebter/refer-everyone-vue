<template>
  <div class="campaigns-index">
    <div v-for="campaign in campaigns" :key="campaign.id">
      <div v-text="`Campaign: ${campaign.name}`"></div>
      <div v-text="`Company: ${campaign.company}`"></div>
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
