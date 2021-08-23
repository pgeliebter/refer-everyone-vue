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
            <h1 class="display-2 mb-4 me-lg-n8">Hero example with illustration</h1>
            <p class="lead mb-5">Build a stunning website that attract visitors</p>
            <a href="#!" class="btn btn-primary rounded-pill btn-hover-arrow">
              <span>Get started</span>
            </a>
          </div>
          <div class="col-md-6 col-sm-8">
            <img src="assets/img/graphics/illustration/03.svg" alt="" class="img-fluid" />
          </div>
        </div>
        <!--/.row-->
      </div>
      <!--/.content-->
    </section>
    <section
      class="position-relative overflow-hidden bg-dark rounded-top-start-block rounded-bottom-end-block text-white"
    >
      <div class="container py-7 py-lg-12">
        <div class="row align-items-end justify-content-around text-center text-md-start">
          <div class="col-lg-8 col-md-7">
            <h6 data-aos="zoom-in" class="mb-4 text-muted aos-init aos-animate">Design anything</h6>
            <h2 class="mb-4 mb-md-0 display-5 aos-init aos-animate" data-aos="zoom-in-up" data-aos-delay="100">
              Build
              <span
                class="text-warning text-underline-warning fw-light"
                data-typed='{"strings": ["Stunning", "Amazing", "Responsive", "Working"]}'
              >
                Stunning
              </span>
              <span class="typed-cursor typed-cursor--blink">|</span>
              Website
            </h2>
          </div>
          <!--End Col-->
          <div class="col-lg-4 col-md-5 text-md-end">
            <div data-aos="fade-left" data-aos-delay="200" class="aos-init aos-animate">
              <a href="#!" class="btn btn-primary hover-lift rounded-pill">
                Get started
                <svg
                  class="ms-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.937531 2.06247L13.0312 1.98959L12.9583 14.0833L11.3183 14.1006L11.3746 4.7957L1.58515 14.5852L0.435662 13.4357L10.2251 3.64621L0.920252 3.70256L0.937531 2.06247Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <!-- / .row -->
      </div>
      <!-- / .container -->
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
  methods: {},
};
</script>
