<template>
  <div class="campaigns-show">
    <div>
      <h2>Name: {{ campaign.name }}</h2>
      <p>Company: {{ campaign.company }}</p>
      <p>Total Conversions: {{ campaign.total_conversions }}</p>

      <p>Conversions:</p>
      <ul>
        <li v-for="conversion in campaign.conversions" :key="conversion.id">
          {{ conversion.first_name }}
          {{ conversion.last_name }}, {{ conversion.email }}
        </li>
      </ul>
    </div>
    <router-link :to="`/campaigns/${campaign.id}/edit`"><button>Fuggehdaboutit</button></router-link>
    <router-link to="/campaigns">Back to all campaigns</router-link>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: function () {
    return {
      campaign: {},
      campaignId: null,
    };
  },
  created: function () {
    axios.get(`/campaigns/${this.$route.params.id}`).then((response) => {
      this.campaign = response.data;
      console.log("Campaign:", this.campaign);
    });
  },
};
</script>
