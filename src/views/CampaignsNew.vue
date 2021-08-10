/* this page's path is "/campaigns/new" */

<template>
  <div class="movies-new">
    <form v-on:submit.prevent="newCampaign()">
      <div>
        Name:
        <input type="text" v-model="newCampaignParams.name" />
      </div>
      <div>
        Company:
        <input type="text" v-model="newCampaignParams.company" />
      </div>

      <div>
        <input type="submit" value="Create Campaign" />
      </div>
      <hr style="width: 25%" />
      <div>
        <input type="reset" />
      </div>
    </form>
    <img v-if="errorStatus" :src="`https://http.cat/${errorStatus}`" />
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newCampaignParams: {},
      errors: [],
      errorStatus: "",
    };
  },
  methods: {
    newCampaign: function () {
      console.log(this.newCampaignParams);
      axios
        .post("/campaigns", this.newCampaignParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/campaigns/${response.data.newCampaign.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.errorStatus = error.response.status;
        });
    },
  },
};
</script>
