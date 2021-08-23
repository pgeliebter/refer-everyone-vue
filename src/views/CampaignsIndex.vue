/* this page's path is "/campaigns" */
<template>
  <main class="campaigns-index">
    <!-- <section class="bg-gradient-primary text-white position-relative">
      <div class="container pt-11 pt-lg-15 pb-8 position-relative z-index-1">
        <div class="row align-items-center justify-content-center text-center">
          <div class="col-lg-10 col-xl-7 z-index-2">
            <div class="position-relative">
              <div>
                <nav class="d-flex justify-content-center" aria-label="breadcrumb">
                  <div class="mb-4">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item"><a href="#">Home</a></li>
                      <li class="breadcrumb-item active">Components</li>
                      <li class="breadcrumb-item active" aria-current="page">Tables</li>
                    </ol>
                  </div>
                </nav>
                <h1 class="mb-0 display-4">Tables</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <section class="position-relative">
      <div class="container py-7 py-lg-12">
        <nav class="nav mb-5 nav-pills" id="campaign-table">
          <a href="/campaigns" class="nav-link active">My campaigns</a>
          <a href="/campaigns/new" class="nav-link">New campaign</a>
        </nav>
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="d-flex mb-4 align-items-center">
              <h4 class="mb-0 me-3">Campaigns</h4>
              <div class="pt-1 border-bottom flex-grow-1"></div>
            </div>

            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Company</th>
                    <th scope="col">Campaign</th>
                    <th scope="col">Conversions</th>
                    <th scope="col">Created</th>

                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="campaign in campaigns" :key="campaign.id">
                    <th scope="row">{{ campaign.name }}</th>
                    <td>{{ campaign.company }}</td>
                    <td>{{ campaign.total_conversions }}</td>
                    <td>{{ campaign.created_at }}</td>
                    <td>
                      <router-link :to="`campaigns/${campaign.id}`">
                        <button class="btn btn-info btn-hover-arrow btn-sm mb-1">
                          <span>View</span>
                        </button>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr class="my-7" />
          </div>
        </div>
      </div>
    </section>

    <!-- list -->
    <section class="position-relative">
      <div class="container py-7 py-lg-12">
        <div class="row justify-content-center">
          <div class="col-10">
            <div class="d-flex mb-4 align-items-center">
              <h4 class="mb-0 me-3">Campaigns</h4>
              <div class="pt-1 border-bottom flex-grow-1"></div>
            </div>
            <ul class="list-group">
              <li class="list-group-item list-group-item-action py-3" v-for="campaign in campaigns" :key="campaign.id">
                <div class="d-flex align-items-start">
                  <div class="me-3 me-lg-4"></div>
                  <div class="flex-grow-1">
                    <div class="d-sm-flex align-items-center">
                      <div class="mb-3 mb-sm-0 flex-grow-1">
                        <h6 class="text-dark fs-6">{{ campaign.name }}</h6>
                        <p class="mb-0 small">{{ campaign.company }}</p>
                      </div>
                      <div class="mb-3 mb-sm-0 flex-grow-1">
                        {{ campaign.total_conversions }}
                      </div>
                      <div class="">
                        <div class="d-flex align-items-center">
                          <router-link :to="`campaigns/${campaign.id}`">
                            <button class="btn btn-info btn-hover-arrow btn-sm mb-1">
                              <span>View</span>
                            </button>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
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
      campaigns: [],
    };
  },
  created: function () {
    this.indexCampaigns();
  },
  methods: {
    indexCampaigns: function () {
      axios
        .get("/campaigns")
        .then((response) => {
          this.campaigns = response.data;
          console.log(this.campaigns);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
};
</script>
