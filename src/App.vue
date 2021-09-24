<template>
  <div id="app">
    <header
      v-if="
        `${$route.path}` != `/success/${$route.params.id}` &&
        `${$route.path}` != `/${$route.params.campaignId}/new` &&
        `${$route.path}` != `/lookup`
      "
      class="z-index-fixed header-transparent header-absolute-top bg-light"
    >
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container position-relative">
          <div class="d-flex align-items-center navbar-no-collapse-items order-lg-last">
            <button
              class="navbar-toggler order-first"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar-demo-2"
              aria-controls="navbar-demo-2"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon">
                <i></i>
              </span>
            </button>

            <!-- the below is for popup Login modal -->
            <div v-if="!isLoggedIn()" class="nav-item me-3 me-lg-0 dropdown">
              <a
                href="#modalLoginForm"
                data-bs-toggle="modal"
                aria-expanded="false"
                class="btn btn-outline-secondary py-1 px-3"
              >
                Login
              </a>
            </div>
            <!-- the below is for popup SignUp modal -->
            <div v-if="!isLoggedIn()" class="nav-item me-3 me-lg-0">
              <a href="#modalSignUpForm" data-bs-toggle="modal" aria-expanded="false" class="btn btn-primary py-1 px-3">
                Sign Up
              </a>
            </div>
            <!-- the below div is for the logged in user dropdown on menu -->
            <div v-if="isLoggedIn()" class="nav-item me-3 me-lg-0 dropdown">
              <a
                href="/"
                class="btn btn-outline-secondary py-1 px-3"
                data-bs-auto-close="outside"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ localStorage.first_name }}
              </a>
              <div class="dropdown-menu shadow-lg dropdown-menu-end dropdown-menu-xs p-0">
                <a href="#" class="dropdown-header border-bottom p-4">
                  <div class="d-flex align-items-center">
                    <div>
                      <h5 class="mb-0">{{ `${localStorage.first_name} ${localStorage.last_name}` }}</h5>
                      <span class="text-muted d-block mb-2">{{ localStorage.email }}</span>
                    </div>
                  </div>
                </a>
                <a href="/logout" class="dropdown-item p-3">
                  <span class="d-block text-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-box-arrow-right me-2"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                      ></path>
                    </svg>
                    Sign Out
                  </span>
                </a>
              </div>
            </div>
          </div>
          <!-- the below is the home about and campaings in navbar -->
          <div class="collapse navbar-collapse" id="navbar-demo-2">
            <ul class="navbar-nav me-auto">
              <li class="nav-item me-lg-3">
                <a href="/" class="nav-link">Home</a>
              </li>

              <li v-if="isLoggedIn()" class="nav-item dropdown">
                <a class="nav-link" href="/campaigns">Campaigns</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link" href="/lookup">Lookup</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <router-view />
    <!-- signup modal below -->
    <div
      class="modal fade"
      id="modalSignUpForm"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="modalFormLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="position-relative border-0 pe-4">
            <button
              type="button"
              class="
                btn-close
                position-absolute
                end-0
                top-0
                me-3
                mt-3
                size-40
                p-0
                center-both
                rounded-circle
                bg-tint-primary
                z-index-1
              "
              data-bs-dismiss="modal"
              aria-label="Close"
              id="closeSignUp"
            >
              <i class="bi bi-x fs-5"></i>
            </button>
            <button
              type="button"
              data-bs-target="#modalLoginForm"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              id="goToLogin"
              style="display: none"
            ></button>
          </div>
          <div class="modal-body py-5 border-0">
            <div class="px-3">
              <h2 class="mb-1 display-6">Welcome!</h2>
              <h5 class="mb-4 text-muted">Please sign up below...</h5>
              <div class="position-relative">
                <div>
                  <form v-on:submit.prevent="submitSignUp()" class="row g-3">
                    <!--first name input-with-icon-->

                    <div class="input-icon-group mb-3 col-md-6">
                      <span class="input-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          class="bi bi-envelope"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"
                          ></path>
                        </svg>
                      </span>
                      <input
                        type="text"
                        class="form-control"
                        v-model="newUserParams.first_name"
                        autofocus=""
                        placeholder="First name"
                      />
                    </div>
                    <!--last name input-with-icon-->
                    <div class="input-icon-group mb-3 col-md-6">
                      <span class="input-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          class="bi bi-envelope"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"
                          ></path>
                        </svg>
                      </span>
                      <input
                        type="text"
                        class="form-control"
                        v-model="newUserParams.last_name"
                        autofocus=""
                        placeholder="Last name"
                      />
                    </div>
                    <!--email input-with-icon-->
                    <div class="input-icon-group mb-3">
                      <span class="input-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          class="bi bi-envelope"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"
                          ></path>
                        </svg>
                      </span>
                      <input
                        type="email"
                        class="form-control"
                        v-model="newUserParams.email"
                        placeholder="Email address"
                      />
                    </div>
                    <!--phone input-with-icon-->
                    <div class="input-icon-group mb-3">
                      <span class="input-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          class="bi bi-envelope"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M14.911,1.295H5.09c-0.737,0-1.339,0.603-1.339,1.339v14.733c0,0.736,0.603,1.338,1.339,1.338h9.821c0.737,0,1.339-0.602,1.339-1.338V2.634C16.25,1.898,15.648,1.295,14.911,1.295 M15.357,17.367c0,0.24-0.205,0.445-0.446,0.445H5.09c-0.241,0-0.446-0.205-0.446-0.445v-0.893h10.714V17.367z M15.357,15.58H4.644V4.42h10.714V15.58z M15.357,3.527H4.644V2.634c0-0.241,0.205-0.446,0.446-0.446h9.821c0.241,0,0.446,0.206,0.446,0.446V3.527z"
                          ></path>
                        </svg>
                      </span>

                      <input
                        type="text"
                        class="form-control"
                        v-model="newUserParams.phone"
                        placeholder="Mobile number"
                      />
                    </div>
                    <!--password input-with-icon-->
                    <div class="input-icon-group mb-3">
                      <span class="input-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-key"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"
                          ></path>
                          <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                        </svg>
                      </span>

                      <input
                        type="password"
                        class="form-control"
                        v-model="newUserParams.password"
                        placeholder="Enter password"
                      />
                    </div>
                    <!--password confirmation input-with-icon-->
                    <div class="input-icon-group mb-3">
                      <span class="input-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-key"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"
                          ></path>
                          <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                        </svg>
                      </span>

                      <input
                        type="password"
                        class="form-control"
                        v-model="newUserParams.password_confirmation"
                        placeholder="Confirm password"
                      />
                    </div>

                    <div class="d-grid">
                      <button class="btn btn-primary" type="submit">Sign Up</button>
                    </div>
                    <ul v-if="errors.length > 0" class="alert alert-danger mt-3 mb-0">
                      <li v-for="error in errors" v-bind:key="error" class="ms-4 mb-0">{{ error }}</li>
                    </ul>
                    <p class="pt-4 mb-0 text-muted">
                      Already have an account?
                      <a
                        href="#modalLoginForm"
                        data-bs-toggle="modal"
                        data-bs-dismiss="modal"
                        class="ms-2 pb-0 text-dark fw-semibold link-underline"
                      >
                        Login
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- login modal below -->
    <div
      class="modal fade"
      id="modalLoginForm"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="modalFormLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="position-relative border-0 pe-4">
            <button
              type="button"
              class="
                btn-close
                position-absolute
                end-0
                top-0
                me-3
                mt-3
                size-40
                p-0
                center-both
                rounded-circle
                bg-tint-primary
                z-index-1
              "
              data-bs-dismiss="modal"
              aria-label="Close"
              id="closeLogin"
            >
              <i class="bi bi-x fs-5"></i>
            </button>
          </div>
          <div class="modal-body py-5 border-0">
            <div class="px-3">
              <div class="position-relative">
                <div>
                  <form v-on:submit.prevent="submitLogin()">
                    <div>
                      <h3 class="mb-1">Welcome back!</h3>
                      <p class="mb-4 text-muted">Please login...</p>
                    </div>
                    <div class="input-icon-group mb-3">
                      <span class="input-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          class="bi bi-envelope"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"
                          ></path>
                        </svg>
                      </span>
                      <input
                        type="email"
                        v-model="newSessionParams.email"
                        class="form-control"
                        autofocus=""
                        placeholder="Email address"
                      />
                    </div>
                    <div class="input-icon-group mb-3">
                      <span class="input-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          class="bi bi-key"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"
                          ></path>
                          <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                        </svg>
                      </span>
                      <input
                        type="password"
                        v-model="newSessionParams.password"
                        class="form-control"
                        placeholder="Password"
                      />
                    </div>

                    <div class="d-grid">
                      <button class="btn btn-primary btn-hover-arrow" type="submit">
                        <span>Login</span>
                      </button>
                    </div>
                    <ul v-if="errors.length > 0" class="alert alert-danger mt-3 mb-0">
                      <li v-for="error in errors" v-bind:key="error" class="mb-0">{{ error }}</li>
                    </ul>
                    <p class="pt-4 mb-0 text-muted">
                      Don’t have an account yet?
                      <a
                        @click="
                          errors = [];
                          newSessionParams = {};
                        "
                        href="#modalSignUpForm"
                        data-bs-toggle="modal"
                        data-bs-dismiss="modal"
                        class="ms-2 pb-0 text-dark fw-semibold link-underline"
                      >
                        Sign Up
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: function () {
    return {
      localStorage: localStorage,
      newSessionParams: {},
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    isLoggedIn: function () {
      if (localStorage.getItem("jwt")) return true;
      else return false;
    },
    getUserId: function () {
      if (localStorage.getItem("user_id")) return localStorage.getItem("user_id");
      else return "no user_id";
    },
    submitLogin: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("first_name", response.data.first_name);
          localStorage.setItem("last_name", response.data.last_name);
          this.closeModal("closeLogin");
          this.errors = [];
          this.$router.push("/campaigns");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
    submitSignUp: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          document.getElementById(`goToLogin`).click();
          this.errors = [];
          this.newSessionParams.email = this.newUserParams.email;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    closeModal(id) {
      document.getElementById(`${id}`).click();
    },
    loginTestAccount: function () {
      this.newSessionParams = {
        email: "starwars@example.com",
        password: "password",
      };
      this.submitLogin();
    },
  },
};
</script>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
</style>
