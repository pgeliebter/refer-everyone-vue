<template>
  <div class="conversion-complete">
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
      console.log("Conversion:", this.conversions);
    });
  },
  methods: {},
};
</script>
