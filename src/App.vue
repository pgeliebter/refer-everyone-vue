<template>
  <div id="app">
    <!-- OLD stuff! 
    <div v-if="localStorage.jwt">Logged in: {{ localStorage.email }}</div> 
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
      <router-link to="/login">login</router-link>
      |
      <router-link to="/logout">logout</router-link>
      |
      <router-link to="/signup">signup</router-link>
      |
      <router-link to="/campaigns">campaigns</router-link>
      |
      <router-link to="/campaigns/new">new campaigns</router-link>
    </div> -->
    <router-view />
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      localStorage: localStorage,
    };
  },
};
</script>

<style></style>
