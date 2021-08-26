/* this page's path is "/" */
<template>
  <div class="home">
    <section class="position-relative bg-gradient-light">
      <svg
        class="position-absolute end-0 bottom-0"
        preserveAspectRatio="none"
        width="100%"
        height="80"
        viewBox="0 0 1200 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 227.556L50 232.296C100 237.037 200 246.519 300 232.296C400 218.074 500 180.148 600 142.222C700 104.296 800 66.3704 900 42.6667C1000 18.963 1100 9.48148 1150 4.74074L1200 0V256H1150C1100 256 1000 256 900 256C800 256 700 256 600 256C500 256 400 256 300 256C200 256 100 256 50 256H0V227.556Z"
          fill="white"
        ></path>
      </svg>

      <div class="container position-relative py-7">
        <div class="row align-items-center justify-content-around">
          <div class="col-md-6 col-xl-5 mb-5 mb-md-0">
            <h1 class="mb-4 display-2">
              Refer Your
              <br />
              <span
                class="d-inline-block typed-cursor"
                data-typed='{"strings": ["Friends", "Enemies" ,"Frenemies", "Creepy Neighbor", "Padawan","Boss","This one doesn`t fit in the screen and goes on an on and on again, dreamlights" ]}'
              ></span>
              <span class="typed-cursor"></span>
            </h1>

            <a
              v-if="!isLoggedIn()"
              href="#modalSignUpForm"
              data-bs-toggle="modal"
              aria-expanded="false"
              class="btn btn-primary rounded-pill btn-hover-arrow"
            >
              <span>Get started</span>
            </a>
            <router-link v-if="isLoggedIn()" :to="`/campaigns`" class="btn btn-primary rounded-pill btn-hover-arrow">
              <span>My Campaigns</span>
            </router-link>
          </div>
          <div class="col-md-6 col-sm-8">
            <img src="assets/img/graphics/illustration/03.svg" alt="" class="img-fluid" />
          </div>
        </div>
        <!--/.row-->
      </div>
      <!--/.content-->
    </section>
  </div>
</template>

<style></style>

<script>
export default {
  data: function () {
    return {
      message: "Welcome to Vue.js! My dude",
    };
  },
  created: function () {},
  methods: {
    isLoggedIn: function () {
      if (localStorage.getItem("jwt")) return true;
      else return false;
    },
  },
};
</script>
