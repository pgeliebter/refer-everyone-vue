/* this page's route is path: "/lookup" */
<template>
  <main>
    <section class="position-relative">
      <div class="container pt-7 pt-lg-9 pb-5 pb-lg-9"></div>
    </section>
    <section class="conversion-show mt-10">
      <div class="container w-lg-85 mx-auto">
        <div
          class="
            rounded-1
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
              <h2 class="mb-0 fs-1 row justify-content-center">
                Lookup your conversion
              </h2>
            </div>

            <form>
              <div class="row g-2 justify-content-center w-100">
                <div class="col-md-6 mb-3 mb-lg-0 col-lg-4">
                  <input
                    type="text"
                    placeholder="Phone number"
                    class="form-control form-control-lg shadow-none border-0"
                    v-model="lookupPhoneParams"
                  />
                </div>

                <div class="col-md-12 col-lg-4">
                  <button
                    type="button"
                    class="btn btn-primary btn-lg w-100"
                    @click="conversionLookup()"
                    href="#modalLookup"
                    data-bs-toggle="modal"
                    aria-expanded="false"
                  >
                    Lookup
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- modal for all conversions -->
    <div
      class="modal fade"
      id="modalLookup"
      tabindex="-1"
      aria-labelledby="modalBasicLabel"
      data-bs-backdrop="static"
      style="display: none"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content border-0">
          <div class="modal-header border-0 bg-light">
            <h5 class="modal-title">Submissions</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="bi bi-x fs-5 lh-1"></i>
            </button>
          </div>

          <ul v-if="allConversions.length >= 1" class="list-group">
            <li
              class="list-group-item py-3"
              v-for="conversion in allConversions"
              :key="conversion.id"
            >
              <div class="d-flex align-items-start">
                <div class="flex-grow-1">
                  <div class="d-sm-flex align-items-center">
                    <div class="mb-3 mb-sm-0 flex-grow-1">
                      <h6 class="text-dark fs-3">
                        {{ conversion.campaign.name }}
                      </h6>
                      <h6>&nbsp;&nbsp;{{ conversion.campaign.company }}</h6>
                    </div>
                    <div class="">
                      <div class="d-flex align-items-center">
                        <a
                          v-bind:href="`/success/${conversion.id}`"
                          aria-label="Close"
                          class="ms-2 pb-0 text-dark fw-semibold link-underline"
                        >
                          <div
                            class="
                              btn btn-sm btn-outline-light
                              border
                              text-secondary
                              shadow-sm
                            "
                          >
                            <i class="me-1 bi bi-check fs-6 lh-1"></i>
                            See stats
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div v-else class="container pt-12 pb-7">
            <div class="row">
              <div
                class="col-md-10 col-lg-8 mx-auto text-center position-relative"
              >
                <div class="position-relative z-index-1">
                  <div class="text-danger mb-2">
                    <img
                      src="/assets/img/graphics/illustration/404.svg"
                      class="width-220 mx-auto"
                      alt=""
                    />
                  </div>

                  <h2 class="mb-4">Oops! No submissions found</h2>

                  <span class="block">
                    <a href="index.html" class="fw-semibold">
                      <i class="bi bi-arrow-left fs-4 me-1 align-middle"></i>
                      Back to Home
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from 'axios'
import Vue2Filters from 'vue2-filters'
export default {
  data: function () {
    return {
      conversionId: null,
      lookupPhoneParams: null,
      allConversions: [],
      errors: [],
    }
  },
  mixins: [Vue2Filters.mixin],
  methods: {
    conversionLookup: function () {
      axios
        .get(`/conversions/lookup/${this.lookupPhoneParams}`)
        .then((response) => {
          this.allConversions = response.data
          console.log(this.allConversions)
        })
        .catch((error) => {
          this.errors = error.response.data
        })
    },
  },
}
</script>
