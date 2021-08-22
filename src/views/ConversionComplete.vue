/* this page's path is "/success/:id/" */
<template>
  <main class="conversion-complete main-content" id="main-content">
    <section class="position-relative">
      <div class="container pt-12 pb-7 pb-lg-12">
        <div class="row justify-content-center text-center">
          <div class="col-xl-9">
            <div class="size-50 rounded-circle position-relative bg-tint-success text-success center-both mb-4">
              <i class="bi bi-check lh-1 display-5 fw-normal"></i>
            </div>
            <h4 class="mb-4 display-5">{{ conversion.campaign.company + ` thanks you!` }}</h4>
            <div class="d-flex flex-column align-items-begin">
              <h6 class="my-3 mb-4">Refer your friends!</h6>
              <p class="mb-0">Copy and paste this link and send to your friends:</p>
              <router-link
                :to="{
                  name: 'conversions-new',
                  params: { campaignId: conversion.campaign.id },
                  query: { referredBy: conversion.id },
                }"
              >
                localhost:8080/{{ conversion.campaign.id }}/new?referredBy={{ conversion.id }}
              </router-link>
              <br />
              <h6 class="mb-0">Total referrals so far:</h6>
              <p>{{ conversion.total_referrals }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container pb-7 pb-lg-12">
        <div
          class="
            px-5
            rounded-3
            shadow-lg
            py-6
            px-lg-5
            py-lg-7
            bg-gradient-primary
            text-white
            position-relative
            overflow-hidden
            aos-init
          "
          data-aos="fade-up"
          data-aos-duration="400"
        >
          <svg
            class="position-absolute end-0 bottom-0 mb-4 text-white opacity-20"
            width="200"
            height="400"
            preserveAspectRatio="none"
            viewBox="0 0 150 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M150 300C130.302 300 110.796 296.12 92.5975 288.582C74.3986 281.044 57.8628 269.995 43.934 256.066C30.0052 242.137 18.9563 225.601 11.4181 207.403C3.87986 189.204 -6.2614e-07 169.698 0 150C6.2614e-07 130.302 3.87987 110.796 11.4181 92.5975C18.9563 74.3987 30.0052 57.8628 43.934 43.934C57.8628 30.0052 74.3987 18.9563 92.5975 11.4181C110.796 3.87986 130.302 3.51961e-06 150 5.00679e-06L150 37.5C135.226 37.5 120.597 40.4099 106.948 46.0636C93.299 51.7172 80.8971 60.0039 70.4505 70.4505C60.0039 80.8971 51.7172 93.299 46.0636 106.948C40.4099 120.597 37.5 135.226 37.5 150C37.5 164.774 40.4099 179.403 46.0636 193.052C51.7172 206.701 60.0039 219.103 70.4505 229.55C80.8971 239.996 93.299 248.283 106.948 253.936C120.597 259.59 135.226 262.5 150 262.5V300Z"
              fill="currentColor"
            ></path>
          </svg>

          <div class="row align-items-end position-relative">
            <div class="col-lg-6 col-xl-7">
              <h1 class="mb-5 mb-md-0 display-6">Start running beautiful marketing campaigns with ease</h1>
            </div>
            <div class="col-lg-6 col-xl-5 text-lg-end">
              <a
                href="#modalSignUpForm"
                data-bs-toggle="modal"
                aria-expanded="false"
                class="btn btn-white rounded-pill me-2 mb-2 mb-lg-0"
              >
                Sign up now
              </a>
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
      conversion: { campaign: { name: "", company: "" } },
      conversionId: parseInt(this.$route.params.id),
    };
  },

  created: function () {
    axios.get(`/conversions/${this.$route.params.id}`).then((response) => {
      this.conversion = response.data;
      console.log(this.conversion);
    });
  },
};
</script>
