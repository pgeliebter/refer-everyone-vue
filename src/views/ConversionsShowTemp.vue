/* this page's route is path: "/conversions/:id" */

<template>
  <div class="conversions-show">
    {{ conversion }}
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
      console.log(this.conversions);
    });
  },
  methods: {},
};
</script>
