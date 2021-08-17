/* this page's path is "/signup" */
<template>
  <div class="signup">
    <main>
      <!--page-hero-->
      <section class="bg-white position-relative">
        <div class="bg-pattern text-muted opacity-10 w-100 h-100 start-0 top-0 position-absolute"></div>
        <div class="bg-gradientwhite flip-y w-50 h-100 start-50 top-0 translate-middle-x position-absolute"></div>
        <div class="container py-9 pt-lg-12 position-relative z-index-1">
          <div class="row align-items-center justify-content-center">
            <div class="col-xl-4 col-lg-5 col-md-6 col-sm-8 z-index-2">
              <h2 class="mb-1 display-6">Hello!</h2>
              <p class="mb-4 text-muted">To get started, Please signup with details...</p>
              <div class="position-relative">
                <div>
                  <form class="row g-3">
                    <!--input-with-icon-->
                    <div class="input-icon-group mb-3 col-md-6">
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
                        type="text"
                        class="form-control"
                        id="signUpFirstName"
                        autofocus=""
                        placeholder="First name"
                      />
                    </div>
                    <!--input-with-icon-->
                    <div class="input-icon-group mb-3 col-md-6">
                      <span class="input-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi" viewBox="0 0 16 16">
                          <path
                            d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"
                          ></path>
                        </svg>
                      </span>
                      <input
                        type="text"
                        class="form-control"
                        id="signUpLastName"
                        autofocus=""
                        placeholder="Last name"
                      />
                    </div>
                    <!--input-with-icon-->
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

                      <input type="text" class="form-control" id="signUpMail" placeholder="Your email address" />
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

                      <input type="email" class="form-control" id="signUpPhone" placeholder="Mobile number" />
                    </div>
                    <!--input-with-icon-->
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

                      <input type="password" class="form-control" id="signUpPassword" placeholder="Enter password" />
                    </div>
                    <!--input-with-icon-->
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
                        id="signUpConfirmPassword"
                        placeholder="Confirm password"
                      />
                    </div>

                    <div class="d-grid">
                      <button class="btn btn-dark" type="submit">Sign Up</button>
                    </div>
                  </form>

                  <!---->
                  <p class="pt-3 small text-muted">
                    Already have an account?
                    <a href="page-account-signin.html" class="ms-2 text-dark fw-semibold link-decoration">Sign in</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- OLD stuff <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>First Name:</label>
        <input type="text" v-model="newUserParams.first_name" />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" v-model="newUserParams.last_name" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="newUserParams.email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="newUserParams.password" />
      </div>
      <div>
        <label>Password confirmation:</label>
        <input type="password" v-model="newUserParams.password_confirmation" />
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" v-model="newUserParams.phone" />
      </div>
      <input type="submit" value="Submit" />
    </form> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
