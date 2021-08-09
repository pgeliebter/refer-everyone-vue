<template>
  <div class="campaigns-show">
    <div>
      <h2>Name: {{ campaign.name }}</h2>
      <p>Company: {{ campaign.company }}</p>
      <p>
        Conversion Link:
        <router-link :to="{ name: 'conversions-new', params: { campaignId: campaign.id } }">
          localhost:8080/{{ campaign.id }}/new
        </router-link>
      </p>
      <p>Total Conversions: {{ campaign.total_conversions }}</p>

      <p>Conversions:</p>
      <ul>
        <li v-for="conversion in campaign.conversions" :key="conversion.id">
          {{ conversion.first_name }}
          {{ conversion.last_name }}, {{ conversion.email }}
          <p>{{ conversion.referred_by.first_name }}</p>
        </li>
      </ul>
    </div>

    <router-link to="/campaigns">Back to all campaigns</router-link>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: function () {
    return {
      campaign: { hello: "sadfa" },
      campaignId: parseInt(this.$route.params.id),
    };
  },

  created: function () {
    axios.get(`/campaigns/${this.$route.params.id}`).then((response) => {
      this.campaign = response.data;
      console.log("Campaign:", this.campaign);
    });
  },
  methods: {},
};
</script>
