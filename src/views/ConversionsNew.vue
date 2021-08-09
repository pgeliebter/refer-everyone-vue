<template>
  <div class="conversions-new">
    <h2>{{ conversion.campaign.name }}</h2>
    <h2>{{ conversion.campaign.company }}</h2>
    <p>{{ newConversionParams }}</p>
    <p>{{ messages.noMatch }}</p>
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
</template>
<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newConversionParams: { campaign_id: this.$route.params.campaignId, referred_by: this.$route.query.referredBy },
      messages: { match: true },
      conversion: {},
    };
  },
  watch: {
    newConversionParams: function () {
      console.log(this.newConversionParams);
    },
  },
  created: function () {
    axios.get(`/conversions/${this.$route.params.campaignId}`).then((response) => {
      this.conversion = response.data;
      console.log(this.conversion);
    });
  },
  mounted: function () {
    this.validateCampaign();
  },
  methods: {
    // the below method validates the campaign from the route and make sure it exists
    validateCampaign: function () {
      axios.get(`/campaigns/${this.$route.params.campaignId}`).catch((errors) => {
        console.log(errors.response.status);
        if (errors.response.status != 200) {
          this.messages.match = true;
        }
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
