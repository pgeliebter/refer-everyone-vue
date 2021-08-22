/* this page's path is "/" */
<template>
  <div class="home">
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
