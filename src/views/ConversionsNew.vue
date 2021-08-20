/* this page's path is "/:campaignId/new/" */
<template>
  <main class="conversions-new mt-5">
    <!--page-hero-->
    <section class="bg-white position-relative d-flex justify-content-center align-items-center h-100">
      <div class="bg-dark d-none d-md-flex position-fixed end-0 top-0 w-md-50 w-lg-55 h-100">
        <!--Divider shape-->
        <svg
          class="position-absolute start-0 top-0 h-100 text-white z-index-1"
          width="80"
          height="1096"
          preserveAspectRatio="none"
          viewBox="0 0 58 1096"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.24"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M58 1096L53.2727 1034.97C48.3636 973.947 38.7273 852.719 39.8182 730.667C41.0909 608.614 53.2727 487.386 52 365.333C50.7273 243.281 36.3636 122.053 29.0909 61.0263L21.8182 2.02656e-06H-1.72853e-06L-1.72853e-06 61.0263C-1.72853e-06 122.053 -1.72853e-06 243.281 -1.72853e-06 365.333C-1.72853e-06 487.386 -1.72853e-06 608.614 -1.72853e-06 730.667C-1.72853e-06 852.719 -1.72853e-06 973.947 -1.72853e-06 1034.97L-1.72853e-06 1096H58Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M37 1096L33.9843 1034.97C30.8527 973.947 24.7053 852.719 25.4013 730.667C26.2132 608.614 33.9843 487.386 33.1724 365.333C32.3605 243.281 23.1975 122.053 18.558 61.0263L13.9185 2.02656e-06H1.11014e-06L1.11014e-06 61.0263C1.11014e-06 122.053 1.11014e-06 243.281 1.11014e-06 365.333C1.11014e-06 487.386 1.11014e-06 608.614 1.11014e-06 730.667C1.11014e-06 852.719 1.11014e-06 973.947 1.11014e-06 1034.97L1.11014e-06 1096H37Z"
            fill="white"
          />
        </svg>

        <!--Image-->
        <img src="assets/img/backgrounds/bg3.jpg" alt="" class="bg-image" />
      </div>
      <div class="container z-index-1">
        <div class="row align-items-center">
          <div class="col-lg-4 pt-3 pb-4 pb-lg-5 pt-lg-5 me-auto col-md-6 z-index-2">
            <div>
              <div>
                <h2 class="mb-5 display-4">
                  We make
                  <span class="" data-typed='{"strings": ["Modern", "Good", "Responsive", "Incredible"]}'></span>

                  <br />
                  Designs for Web
                </h2>
                <h2 class="mb-1 display-6">{{ campaign.name }}</h2>
                <h4 class="mb-4 display-5">{{ campaign.company }}</h4>
                <form>
                  <!--input-with-icon-->
                  <div class="mb-3">
                    <label class="small form-label" for="signUpName">Your full name</label>
                    <input type="text" class="form-control" id="signUpName" autofocus />
                  </div>

                  <!--input-with-icon-->
                  <div class="mb-3">
                    <label class="small form-label" for="signUpMail">Your email address</label>
                    <input type="email" class="form-control" id="signUpMail" />
                  </div>
                  <!--input-with-icon-->
                  <div class="mb-3">
                    <label class="small form-label" for="signUpPassword">Enter password</label>
                    <input type="password" class="form-control" id="signUpPassword" />
                  </div>
                  <!--input-with-icon-->
                  <div class="mb-3">
                    <label class="small form-label" for="signUpConfirmPassword">Confirm password</label>
                    <input type="password" class="form-control" id="signUpConfirmPassword" />
                  </div>
                  <!--Checkbox-->
                  <div class="mb-3 d-flex justify-content-between">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label class="form-check-label small text-muted" for="flexCheckDefault">
                        i agree to
                        <a href="#!" class="fw-semibold">Terms & conditions</a>
                      </label>
                    </div>
                  </div>

                  <div class="d-grid">
                    <button class="btn btn-dark" type="submit">Sign Up</button>
                  </div>
                </form>

                <!---->
                <p class="pt-3 small text-muted">
                  Already have an account?
                  <a href="page-account-signin-alt.html" class="ms-2 text-dark fw-semibold link-underline">Sign in</a>
                </p>
                <!--Divider-->
                <div class="d-flex align-items-center pb-3">
                  <span class="flex-grow-1 border-bottom pt-1"></span>
                  <span class="d-inline-flex center-both lh-1 size-30 rounded-circle bg-white text-mono">or</span>
                  <span class="flex-grow-1 border-bottom pt-1"></span>
                </div>
                <div class="d-grid">
                  <a href="#!" class="d-flex hover-lift si-hover-facebook btn position-relative center-both">
                    <!--Main Icon-->
                    <div class="position-relative d-flex align-items-center">
                      <img src="assets/img/brands/Facebook.svg" alt="" class="width-20 me-2" />
                      <span>sign up with facebook</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
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
