<template>
  <div class="something">
    <!--Main content-->

    <main class="main-content" id="main-content">
      <section class="position-relative bg-white">
        <div class="container position-relative pt-3 pb-4">
          <div class="row">
            <div class="col-md-6">
              <nav class="d-md-flex" aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <a href="#!">Home</a>
                  </li>
                  <li class="breadcrumb-item active">Profile</li>
                </ol>
              </nav>
            </div>
          </div>
          <!--/.row-->
        </div>
      </section>
      <section class="position-relative">
        <div class="container position-relative">
          <div class="overflow-hidden">
            <!--Profile info header-->
            <div class="position-relative pb-7 pb-lg-12">
              <div class="row">
                <div class="col-lg-3 mb-5 mb-lg-0">
                  <div class="h-100">
                    <div class="card bg-gradient-light h-100 p-3">
                      <div>
                        <h4 class="mb-2">{{ campaign.name }}</h4>
                        <small class="d-block mb-3">Senior Software developer</small>
                        <ul class="list-unstyled border-bottom pb-3 mb-3">
                          <li class="d-flex align-items-stretch mb-2">
                            <i class="bi bi-geo-alt-fill me-2 align-middle text-muted"></i>
                            <span class="small">Barcelona, Spain</span>
                          </li>
                          <li class="d-flex align-items-stretch mb-2">
                            <i class="bi bi-globe me-2 align-middle text-muted"></i>
                            <a href="#!" class="small link-hover-decoration">https://emilydoe.com/</a>
                          </li>
                          <li class="d-flex align-items-stretch mb-2">
                            <i class="bi bi-check fs-5 lh-1 text-success me-2 align-middle"></i>
                            <span class="small">Available for hire</span>
                          </li>
                          <li class="d-flex align-items-stretch mb-2">
                            <i class="bi bi-twitter me-2 align-middle text-muted"></i>
                            <a href="#!" class="small link-hover-decoration">@emily.dev</a>
                          </li>
                          <li class="d-flex align-items-stretch mb-2">
                            <i class="bi bi-linkedin me-2 align-middle text-muted"></i>
                            <a href="#!" class="small link-hover-decoration">emilyatin</a>
                          </li>
                          <li class="d-flex align-items-stretch mb-2">
                            <i class="bi bi-instagram me-2 align-middle text-muted"></i>
                            <a href="#!" class="small link-hover-decoration">emily93</a>
                          </li>
                        </ul>
                        <ul class="list-unstyled border-bottom pb-3 mb-3">
                          <li class="d-flex justify-content-between align-items-center mb-2">
                            <span class="small">Followers</span>
                            <span class="fs-5">134</span>
                          </li>
                          <li class="d-flex justify-content-between align-items-center mb-2">
                            <span class="small">Following</span>
                            <span class="fs-5">23</span>
                          </li>
                        </ul>
                        <div class="d-grid">
                          <button class="btn btn-light border shadow-sm mb-2 py-1" type="button">
                            <i class="bi bi-person-plus fs-6 align-middle lh-1"></i>
                            Follow
                          </button>
                          <button class="btn btn-primary shadow-sm py-1" type="button">
                            <i class="bi bi-envelope fs-6 align-middle lh-1"></i>
                            Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-9">
                  <div class="d-flex flex-column h-100">
                    <nav class="nav mb-5 nav-pills">
                      <a href="page-profile.html" class="nav-link">
                        <i class="bi bi-person-circle me-2 align-middle"></i>
                        My profile
                      </a>
                      <a href="page-profile-dashboard.html" class="nav-link active">
                        <i class="bi bi-diagram-2 me-2 align-middle"></i>
                        Dashboard
                      </a>
                      <a href="page-profile-settings.html" class="nav-link">
                        <i class="bi bi-gear me-2 align-middle"></i>
                        Settings
                      </a>
                      <a href="#" class="nav-link disabled">
                        <i class="bi bi-layers me-2 align-middle"></i>
                        Orders
                      </a>
                      <a href="#" class="nav-link disabled">
                        <i class="bi bi-credit-card me-2 align-middle"></i>
                        Billing
                      </a>
                      <a href="#" class="nav-link disabled">
                        <i class="bi bi-people me-2 align-middle"></i>
                        Followers
                      </a>
                    </nav>
                    <div class="mb-3 d-flex justify-content-between align-items-center">
                      <h5 class="mb-0 me-3">Dashboard</h5>
                      <div>
                        <select data-choices='{"searchEnabled":false}' class="form-control width-160 form-control-sm">
                          <Option selected>Last Week</Option>
                          <Option>Last month</Option>
                          <Option>Last 6 Months</Option>
                          <Option>Last year</Option>
                        </select>
                      </div>
                    </div>
                    <div class="card mb-4">
                      <div class="p-3 d-flex justify-content-between align-items-center">
                        <h6 class="mb-0">Recent Activities</h6>
                      </div>

                      <div id="activity_chart" class="height-350"></div>
                    </div>
                    <div class="row">
                      <div class="col-md-4 mb-4">
                        <!--Stats card-->
                        <div class="card p-3 h-100">
                          <h3
                            data-aos
                            data-aos-id="countup:in"
                            data-to="1648"
                            data-countup='{"startVal":0, "prefix":"$"}'
                          ></h3>
                          <div class="d-flex justify-content-between">
                            <p class="mb-0">Earnings</p>
                            <span class="text-success small">
                              <i class="bi bi-caret-up-fill"></i>
                              4%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 mb-4">
                        <!--Stats card-->
                        <div class="card p-3 h-100">
                          <h3 data-aos data-aos-id="countup:in" data-to="94" data-countup='{"startVal":0}'></h3>
                          <div class="d-flex justify-content-between">
                            <p class="mb-0">Sales</p>
                            <span class="text-success small">
                              <i class="bi bi-caret-up-fill"></i>
                              3%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 mb-4">
                        <!--Stats card-->
                        <div class="card p-3 h-100">
                          <h3
                            data-aos
                            data-aos-id="countup:in"
                            data-to="3647"
                            data-countup='{"startVal":0, "prefix":"+"}'
                          ></h3>
                          <div class="d-flex justify-content-between">
                            <p class="mb-0">Visitors</p>
                            <span class="text-danger small">
                              <i class="bi bi-caret-down-fill"></i>
                              -1%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row g-3">
                      <div class="col-md-5 mb-3 mb-md-0">
                        <div class="card mb-3 p-3 h-100">
                          <h6>Site Traffic</h6>

                          <div id="traffic_chart"></div>
                        </div>
                      </div>
                      <div class="col-md-7">
                        <div class="card overflow-hidden h-100">
                          <div class="p-3 d-flex justify-content-between align-items-center">
                            <h6 class="mb-0">Recent Transections</h6>
                          </div>
                          <table class="table mb-0 table-borderless">
                            <tbody>
                              <tr>
                                <td>
                                  <div
                                    class="
                                      size-30
                                      center-both
                                      bg-tint-primary
                                      rounded-circle
                                      small
                                      fw-bold
                                      text-primary
                                    "
                                  >
                                    VK
                                  </div>
                                </td>
                                <td class="small lh-sm">
                                  <strong>Vivek</strong>
                                  just sent you $200 on Paypal
                                </td>
                                <td><span class="badge bg-success">Completed</span></td>
                              </tr>
                              <tr>
                                <td>
                                  <img
                                    src="assets/img/avatar/2.jpg"
                                    alt=""
                                    class="img-fluid rounded-circle avatar sm"
                                  />
                                </td>
                                <td class="small lh-sm">
                                  <strong>Pamela</strong>
                                  just sent you $87 on Payoneer
                                </td>
                                <td><span class="badge bg-primary">Processing</span></td>
                              </tr>
                              <tr>
                                <td>
                                  <img
                                    src="assets/img/avatar/12.jpg"
                                    alt=""
                                    class="img-fluid rounded-circle avatar sm"
                                  />
                                </td>
                                <td class="small lh-sm">
                                  <strong>Adam</strong>
                                  just sent you $144 on Paypal
                                </td>
                                <td><span class="badge bg-success">Completed</span></td>
                              </tr>
                              <tr>
                                <td>
                                  <img
                                    src="assets/img/avatar/9.jpg"
                                    alt=""
                                    class="img-fluid rounded-circle avatar sm"
                                  />
                                </td>
                                <td class="small lh-sm">
                                  <strong>Jacob</strong>
                                  just sent you $200 on Paypal
                                </td>
                                <td><span class="badge bg-warning">Pending</span></td>
                              </tr>
                              <tr>
                                <td>
                                  <img
                                    src="assets/img/avatar/5.jpg"
                                    alt=""
                                    class="img-fluid rounded-circle avatar sm"
                                  />
                                </td>
                                <td class="small lh-sm">
                                  <strong>Emily</strong>
                                  just sent you $47 on Paypal
                                </td>
                                <td><span class="badge bg-success">Completed</span></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
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
import Vue2Filters from "vue2-filters";

export default {
  data: function () {
    return {
      campaign: {},
      campaignId: parseInt(this.$route.params.id),
    };
  },
  mixins: [Vue2Filters.mixin],
  mounted: function () {
    axios
      .get(`/campaigns/2`)
      .then((response) => {
        this.campaign = response.data;
        console.log(this.campaign);
      })
      .catch((errors) => {
        console.log(errors.response);
      });
  },
};
</script>
