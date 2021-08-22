/* this page's path is "/campaigns/new" */
<template>
  <div class="movies-new">
    <main>
      <!--page-hero-->
      <div class="container pt-11 pt-lg-15 pb-8 position-relative z-index-1">
        <div class="row align-items-center justify-content-center text-center">
          <div class="col-lg-10 col-xl-7 z-index-2">
            <div class="position-relative">
              <div>
                <nav aria-label="breadcrumb" class="d-flex justify-content-center">
                  <div class="mb-4">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item"><a href="#">Home</a></li>
                      <li class="breadcrumb-item active">Components</li>
                      <li aria-current="page" class="breadcrumb-item active">Tables</li>
                    </ol>
                  </div>
                </nav>
                <h1 class="mb-0 display-4">Tables</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="bg-white position-relative">
        <div class="container py-7 py-lg-12">
          <nav class="nav mb-5 nav-pills">
            <a href="/campaigns" class="nav-link">My campaigns</a>
            <a href="/campaigns/new" class="nav-link active">New campaign</a>
          </nav>

          <div class="container position-relative z-index-1">
            <div class="row align-items-center justify-content-center">
              <div class="col-xl-4 col-lg-5 col-md-6 col-sm-8 z-index-2">
                <h2 class="mb-4 display-6 text-danger">Create a new campaign!</h2>

                <div class="position-relative">
                  <div>
                    <form v-on:submit.prevent="newCampaign()">
                      <!--input-with-icon-->
                      <div class="mb-3">
                        <h5 class="text-danger">Campaign name:</h5>
                        <input type="text" class="form-control" autofocus v-model="newCampaignParams.name" />
                      </div>
                      <div class="mb-3">
                        <h5 class="text-danger">Company:</h5>
                        <input type="text" class="form-control" v-model="newCampaignParams.company" />
                      </div>
                      <div class="mb-3">
                        <h5 class="text-danger">Referral payment:</h5>
                        <input type="number" class="form-control" v-model="newCampaignParams.incentive" />
                      </div>

                      <div class="d-grid">
                        <button class="btn btn-dark" type="submit">Create campaign</button>
                      </div>

                      <ul v-if="errors.length > 0" class="alert alert-danger mt-3 mb-0">
                        <li v-for="error in errors" v-bind:key="error" class="ms-4 mb-0">{{ error }}</li>
                      </ul>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newCampaignParams: {},
      errors: [],
      errorStatus: "",
    };
  },
  methods: {
    newCampaign: function () {
      console.log(this.newCampaignParams);
      axios
        .post("/campaigns", this.newCampaignParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/campaigns/${response.data.newCampaign.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.errorStatus = error.response.status;
        });
    },
  },
};
</script>
