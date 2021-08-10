/* this page's path is "/:campaignId/new/" */
<template>
  <div class="conversions-new">
    <div v-if="match">
      <h2>{{ campaign.name }}</h2>
      <h2>{{ campaign.company }}</h2>
      <p>{{ newConversionParams }}</p>

      <form v-on:submit.prevent="newConversion()">
        <div>
          First Name:
          <input type="text" v-model="newConversionParams.first_name" />
        </div>
        <div>
          Last Name:
          <input type="text" v-model="newConversionParams.last_name" />
        </div>
        <div>
          Email:
          <input type="text" v-model="newConversionParams.email" />
        </div>
        <div>
          Phone:
          <input type="text" v-model="newConversionParams.phone" />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
    <div v-else>hllo</div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newConversionParams: { campaign_id: this.$route.params.campaignId, referred_by: this.$route.query.referredBy },
      match: false,
      campaign: {},
    };
  },
  watch: {
    newConversionParams: function () {
      console.log(this.newConversionParams);
    },
  },
  mounted: function () {
    this.validateCampaign();
  },
  methods: {
    // the below method validates the campaign from the route and make sure it exists
    validateCampaign: function () {
      axios
        .get(`/campaign/${this.$route.params.campaignId}`)
        .then((response) => {
          console.log(response.data);
          this.campaign = response.data.campaign;
          this.match = true;
        })
        .catch((errors) => {
          console.log(errors.response.status);
        });
    },

    newConversion: function () {
      axios.post(`/conversions`, this.newConversionParams).then((response) => {
        console.log(response);
        this.$router.push(`/success/${response.data.conversionId}`);
      });
    },
  },
};
</script>
