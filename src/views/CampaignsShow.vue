/* this page's path is "/campaigns/:id" */
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
      <p>Incentive: {{ campaign.incentive }}</p>
      <table>
        <thead>
          <tr>
            <th>Number |</th>

            <th>First Name |</th>
            <th>Last Name |</th>
            <th>Email</th>
            <th>| Referred By |</th>
            <th>Total Incentive earned |</th>
            <th>Conversion ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(conversion, index) in orderBy(campaign.conversions, 'id')" v-bind:key="conversion.id">
            <td>{{ index }}</td>
            <td>{{ conversion.first_name }}</td>
            <td>{{ conversion.last_name }}</td>
            <td>{{ conversion.email }}</td>
            <td v-if="conversion.referred_by">{{ conversion.referred_by.first_name }}</td>
            <td v-else>Blank</td>
            <td>{{ conversion.total_incentive }}</td>
            <td>{{ conversion.id }}</td>
          </tr>
        </tbody>
      </table>
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
  mounted: function () {
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
<style></style>
