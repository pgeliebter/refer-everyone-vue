<template>
  <div id="app">
    <header class="z-index-fixed header-transparent header-absolute-top">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container position-relative">
          <div class="d-flex align-items-center navbar-no-collapse-items order-lg-last">
            <button
              class="navbar-toggler order-last"
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
            <div class="nav-item me-3 me-lg-0 dropdown">
              <a
                href="#"
                class="btn btn-secondary rounded-pill py-0 ps-2 pe-2"
                data-bs-auto-close="outside"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Jaquine
              </a>
              <div class="dropdown-menu shadow-lg dropdown-menu-end dropdown-menu-xs p-0">
                <a href="#" class="dropdown-header border-bottom p-4">
                  <div class="d-flex align-items-center">
                    <div>
                      <img src="assets/img/avatar/12.jpg" alt="" class="avatar xl rounded-pill me-3" />
                    </div>
                    <div>
                      <h5 class="mb-0">Jaquine Harnandez</h5>
                      <span class="text-muted d-block mb-2">jaquinehar@domain.com</span>
                      <div class="small d-inline-block link-underline fw-semibold text-muted">View account</div>
                    </div>
                  </div>
                </a>
                <a href="#" class="dropdown-item p-3">
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
          <div class="collapse navbar-collapse" id="navbar-demo-2">
            <ul class="navbar-nav me-auto">
              <li class="nav-item me-lg-3">
                <a href="/" class="nav-link">Home</a>
              </li>
              <li class="nav-item me-lg-3">
                <a href="/about" class="nav-link">About us</a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="index.html"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Campaigns
                  <!--Dropdown menu arrow svg icon-->
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 9" class="dropdown-arrow">
                    <path
                      fill="currentColor"
                      d="M12.25 2.30062L10.8988 0.949371L6.5 5.33854L2.10125 0.949371L0.75 2.30062L6.5 8.05062L12.25 2.30062Z"
                    ></path>
                  </svg>
                </a>
                <div class="dropdown-menu dropdown-menu-start py-0 overflow-hidden">
                  <div class="row">
                    <div class="col-lg-5 ps-lg-4 position-relative">
                      <div class="py-1 py-lg-3 d-lg-flex flex-column">
                        <a href="/campagins" class="dropdown-item">All Campaigns</a>
                        <a href="/campaigns/new" class="dropdown-item">New Campaign</a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <router-view />
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      localStorage: localStorage,
    };
  },
};
</script>

<style></style>
