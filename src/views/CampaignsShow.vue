<template>
  <div class="campaigns-show">
    <div>
      <h2>Name: {{ campaign.name }}</h2>
      <p>Company: {{ campaign.company }}</p>
      <p>
        Conversion Link:
        <router-link
          :to="{
            name: 'conversions-new',
            params: { campaignId: campaign.id },
          }"
        >
          localhost:8080/{{ campaign.id }}/new
        </router-link>
      </p>
      <p>Total Conversions: {{ campaign.total_conversions }}</p>

      <p v-for="conversion in campaign.conversions" :key="conversion.id">Conversions:</p>
      <ul
        style="width: 50%"
        v-for="(conversion, index) in orderBy(campaign.conversions, 'first_name')"
        :key="conversion.id"
      >
        <li>ID: {{ conversion.id }}</li>
        <li>Number: {{ index + 1 }}</li>
        <li>First Name: {{ conversion.first_name }}</li>
        <li>Last Name: {{ conversion.last_name }}</li>
        <li>Email: {{ conversion.email }}</li>
        <li v-if="conversion.referred_by">Referred by: {{ conversion.referred_by.first_name }}</li>
        <hr />
      </ul>
    </div>

    <router-link to="/campaigns">Back to all campaigns</router-link>
  </div>
</template>
<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  data: function () {
    return {
      campaign: {},
      campaignId: parseInt(this.$route.params.id),
    };
  },
  mixins: [Vue2Filters.mixin],
  created: function () {
    axios
      .get(`/campaigns/${this.$route.params.id}`)
      .then((response) => {
        this.campaign = response.data;
        console.log(this.campaign);
      })
      .catch((errors) => {
        console.log(errors.response);
      });
  },
};
</script>
