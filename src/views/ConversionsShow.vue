/* this page's route is path: "/conversions/show" */
<template>
  <main>
    <section class="position-relative">
      <div class="container pt-7 pt-lg-9 pb-5 pb-lg-9"></div>
    </section>
    <section class="conversion-show mt-10">
      <div class="container w-lg-85 mx-auto">
        <div
          class="
            py-5
            px-4
            py-lg-7
            px-xl-9 px-lg-7 px-md-5
            overflow-hidden
            bg-shade-primary
            shadow-lg
            text-white
            position-relative
            mt-n12
            z-index-1
            justify-content-center
            align-items-end
          "
        >
          <svg
            class="position-absolute bottom-0 start-0 text-white"
            width="100%"
            height="75%"
            preserveAspectRatio="none"
            viewBox="0 0 498 168"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity=".1"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 149.333L20.75 152.444C41.5 155.556 83 161.778 124.5 152.444C166 143.111 207.5 118.222 249 93.3333C290.5 68.4444 332 43.5556 373.5 28C415 12.4444 456.5 6.22222 477.25 3.11111L498 0V168H477.25C456.5 168 415 168 373.5 168C332 168 290.5 168 249 168C207.5 168 166 168 124.5 168C83 168 41.5 168 20.75 168H0V149.333Z"
              fill="currentColor"
            ></path>
          </svg>

          <div class="position-relative">
            <div class="mb-3">
              <h2 class="mb-0 fs-1 row justify-content-center">Lookup your conversion</h2>
            </div>

            <form>
              <div class="row g-2 justify-content-center w-100">
                <div class="col-md-6 mb-3 mb-lg-0 col-lg-4">
                  <input
                    type="text"
                    placeholder="Conversion number"
                    class="form-control form-control-lg shadow-none border-0"
                    v-model="conversionId"
                  />
                </div>

                <div class="col-md-12 col-lg-4">
                  <button type="button" class="btn btn-primary btn-lg w-100" @click="conversionLookup()">Lookup</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
export default {
  data: function () {
    return {
      conversion: { campaign: { name: "" } },
      conversionId: null,
    };
  },
  mixins: [Vue2Filters.mixin],
  methods: {
    conversionLookup: function () {
      axios.get(`/conversions/${this.conversionId}`).then((response) => {
        this.conversion = response.data;
        console.log(this.conversion);
      });
    },
  },
};
</script>
