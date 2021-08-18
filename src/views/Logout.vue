/* this page's path is "/logout" */
<template>
  <div class="logout"></div>
</template>

<script>
import axios from "axios";

export default {
  created: function () {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("email");
    localStorage.removeItem("user_id");
    localStorage.removeItem("last_name");
    localStorage.removeItem("first_name");
    this.$router.push("/");
  },
};
</script>
