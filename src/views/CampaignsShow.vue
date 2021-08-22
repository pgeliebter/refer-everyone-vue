/* this page's path is "/campaigns/:id" */
<template>
  <div class="campaigns-show">
    <section class="position-relative border-top">
      <div class="container py-7 py-lg-12">
        <div class="row justify-content-center">
          <div class="col-12">
            <h4 class="mb-0 me-3 py-2">{{ campaign.name }}</h4>
            <div class="d-flex mb-4 align-items-center">
              <h6 class="mb-0 me-3">{{ campaign.company }}</h6>
              <div class="pt-1 border-bottom flex-grow-1"></div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 col-xl-3 mb-4 mb-xl-0">
            <div class="card bg-dark text-white border-0 hover-lift hover-shadow-lg">
              <!-- Card body -->
              <div class="card-body p-4">
                <span class="center-both mb-3 size-40 bg-primary text-white rounded-circle">
                  <i class="icon-Folder fs-5"></i>
                </span>
                <h2 class="h1 mb-2">
                  <span
                    data-countup='{"startVal":0}'
                    data-aos=""
                    data-aos-id="countup:in"
                    data-to="3210"
                    class="aos-init aos-animate"
                  >
                    {{ campaign.total_conversions }}
                  </span>
                </h2>
                <p class="mb-3">Total Conversions</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xl-3 mb-4 mb-xl-0">
            <div class="card bg-secondary text-white border-0 hover-lift hover-shadow-lg">
              <!-- Card body -->
              <div class="card-body p-4">
                <span class="center-both mb-3 size-40 bg-warning text-white rounded-circle">
                  <i class="icon-Full-Cart fs-5"></i>
                </span>
                <h2 class="h1 mb-2">
                  <span
                    data-countup='{"startVal":0}'
                    data-aos=""
                    data-aos-id="countup:in"
                    data-to="164"
                    class="aos-init aos-animate"
                  >
                    164
                  </span>
                </h2>
                <p class="mb-3">Total Sales</p>
                <div class="progress bg-secondary" style="height: 4px">
                  <div
                    class="progress-bar bg-warning aos-init aos-animate"
                    role="progressbar"
                    data-aos=""
                    data-aos-id="progress:in"
                    aria-valuenow="65"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="width: 65%; transition-delay: 0.4s; transition-duration: 0.8s"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xl-3 mb-4 mb-md-0">
            <div class="card border-0 bg-info rounded-l hover-lift">
              <!-- Card body -->
              <div class="card-body p-4">
                <span class="center-both mb-3 size-40 bg-danger text-white rounded-circle">
                  <i class="icon-Life-Safer fs-5"></i>
                </span>
                <h2 class="h1 mb-2">
                  <span
                    data-countup='{"startVal":0}'
                    data-aos=""
                    data-aos-id="countup:in"
                    data-to="44"
                    class="aos-init aos-animate"
                  >
                    44
                  </span>
                </h2>
                <p class="mb-3">Support tickets</p>
                <div class="progress bg-tint-danger" style="height: 4px">
                  <div
                    class="progress-bar bg-danger aos-init aos-animate"
                    role="progressbar"
                    data-aos=""
                    data-aos-id="progress:in"
                    aria-valuenow="65"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="width: 65%; transition-delay: 0.4s; transition-duration: 0.8s"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xl-3 mb-4 mb-md-0">
            <div class="card border-0 shadow-lg hover-lift rounded-l">
              <!-- Card body -->
              <div class="card-body p-4">
                <span class="center-both mb-3 size-40 bg-success text-white rounded-circle">
                  <i class="icon-Inbox fs-5"></i>
                </span>
                <h2 class="h1 mb-2">
                  <span
                    data-countup='{"startVal":0}'
                    data-aos=""
                    data-aos-id="countup:in"
                    data-to="68"
                    class="aos-init aos-animate"
                  >
                    68
                  </span>
                </h2>
                <p class="mb-3">Inbox</p>
                <div class="progress bg-tint-success" style="height: 4px">
                  <div
                    class="progress-bar bg-success aos-init aos-animate"
                    role="progressbar"
                    data-aos=""
                    data-aos-id="progress:in"
                    aria-valuenow="65"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="width: 65%; transition-delay: 0.4s; transition-duration: 0.8s"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <router-link
      :to="{
        name: 'conversions-new',
        params: { campaignId: campaign.id },
      }"
    >
      localhost:8080/{{ campaign.id }}/new
    </router-link>
    <section class="position-relative">
      <div class="container py-7 py-lg-1">
        <div class="d-flex justify-content-end mb-3">
          <!-- <label>Search:</label> -->
          <div class="col-4">
            <label for="search" class="form-label">Search</label>
            <div>
              <input id="search" type="email" class="form-control form-control-sm" v-model="conversionsFilter" />
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col"></th>

                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col-2">Email</th>
                    <th scope="col">Referred By</th>
                    <th scope="col">Earned</th>
                    <th scope="col">ID</th>

                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <!-- not sure how to search one field deeper in the filter -->
                  <tr
                    v-for="(conversion, index) in orderBy(
                      filterBy(
                        campaign.conversions,
                        conversionsFilter,
                        'first_name',
                        'last_name',
                        'id',
                        'email',
                        'referred_by'
                      ),
                      'id'
                    )"
                    v-bind:key="conversion.id"
                  >
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ conversion.first_name }}</td>
                    <td>{{ conversion.last_name }}</td>
                    <td>{{ conversion.email }}</td>
                    <td v-if="conversion.referred_by">{{ conversion.referred_by.first_name }}</td>
                    <td v-else>Blank</td>
                    <td>${{ parseFloat(conversion.total_incentive).toFixed(2) }}</td>
                    <td>{{ conversion.id }}</td>
                    <td>
                      <a
                        href="#modalBasic"
                        data-bs-toggle="modal"
                        aria-expanded="false"
                        v-on:click="showConversionModal(conversion)"
                      >
                        <button class="btn btn-info btn-hover-arrow btn-sm mb-1">
                          <span>View</span>
                        </button>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr class="my-7" />
          </div>
        </div>
      </div>
      <div class="modal fade" id="modalBasic" tabindex="-1" aria-labelledby="modalBasicLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content border-0">
            <div class="modal-header border-0 bg-info">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i class="bi bi-x fs-5 lh-1"></i>
              </button>
            </div>
            <div class="modal-body py-1 border-start border-end border-2 border-info">
              <div class="d-flex px-4">
                <div class="flex-grow-1">
                  <ol class="list-unstyled my-4">
                    <li class="d-flex mb-4">
                      <div class="flex-grow-1">
                        <div class="d-flex mb-0 justify-content-between">
                          <div class="d-flex align-items-center">
                            <h6 class="mb-0 me-3">Name</h6>
                          </div>
                        </div>
                        <p class="mb-0">
                          {{ `${currentConversion.first_name} ${currentConversion.last_name}` }}
                        </p>
                      </div>
                    </li>

                    <li class="d-flex mb-4">
                      <div class="flex-grow-1">
                        <div class="d-flex mb-0 justify-content-between">
                          <div class="d-flex align-items-center">
                            <h6 class="mb-0 me-3">Email</h6>
                          </div>
                        </div>
                        <p class="mb-0">
                          {{ currentConversion.email }}
                        </p>
                      </div>
                    </li>
                    <li class="d-flex mb-4">
                      <div class="flex-grow-1">
                        <div class="d-flex mb-0 justify-content-between">
                          <div class="d-flex align-items-center">
                            <h6 class="mb-0 me-3">Cell</h6>
                          </div>
                        </div>
                        <p class="mb-0">
                          {{ currentConversion.phone }}
                        </p>
                      </div>
                    </li>
                    <li class="d-flex mb-4">
                      <div class="flex-grow-1">
                        <div class="d-flex mb-0 justify-content-between">
                          <div class="d-flex align-items-center">
                            <h6 class="mb-0 me-3">Converted Time</h6>
                          </div>
                        </div>
                        <p class="mb-0">
                          {{ currentConversion.created_at }}
                        </p>
                      </div>
                    </li>
                    <li class="d-flex mb-4">
                      <div class="flex-grow-1">
                        <div class="d-flex mb-0 justify-content-between">
                          <div class="d-flex align-items-center">
                            <h6 class="mb-0 me-3">Campaign Link</h6>
                          </div>
                        </div>
                        <p class="mb-0">fix</p>
                      </div>
                    </li>

                    <li class="d-flex mb-4">
                      <div class="flex-grow-1">
                        <div class="d-flex mb-0 justify-content-between">
                          <div class="d-flex align-items-center">
                            <h6 class="mb-0 me-3">Total Referrals</h6>
                          </div>
                        </div>
                        <p class="mb-0">
                          {{ currentConversion.total_referrals }}
                        </p>
                      </div>
                    </li>
                    <li v-if="currentConversion.referred_by" class="d-flex mb-4">
                      <div class="flex-grow-1">
                        <div class="d-flex mb-0 justify-content-between">
                          <div class="d-flex align-items-center">
                            <h6 class="mb-0 me-3">Referred By</h6>
                          </div>
                        </div>
                        <p v-on:click="showConversionModal(currentConversion.referred_by)" class="mb-0">
                          {{ currentConversion.referred_by.first_name + " " + currentConversion.referred_by.last_name }}
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <div class="modal-footer bg-info border-0">
              <button type="button" class="btn btn-white btn-sm" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary btn-sm">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <router-link to="/campaigns">Back to all campaigns</router-link>
  </div>
</template>
<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  data: function () {
    return {
      campaign: {},
      campaignId: parseInt(this.$route.params.id),
      currentConversion: {},
      conversionsFilter: "",
    };
  },
  mixins: [Vue2Filters.mixin],
  mounted: function () {
    axios
      .get(`/campaigns/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.campaign = response.data;
        console.log(this.campaign);
      })
      .catch((errors) => {
        console.log(errors.response);
      });
  },
  methods: {
    showConversionModal: function (conversion) {
      console.log(conversion);
      this.currentConversion = conversion;
    },
  },
};
</script>
<style>
/* #magnifyingGlass {
  height: 1.5rem;
  width: 1.5rem;
} */
</style>
