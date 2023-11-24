<!-- src/components/CustomerHeader.vue -->
<template>
  <header
    class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
  >
    <a
      href="/"
      class="display-6 d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none text-"
    >
      Customer Portal
    </a>
    <div class="col-md-3 text-end">
      <router-link :to="{ name: 'AdminLogin' }" class="btn btn-primary me-2"
        >Admin Login</router-link
      >
    </div>
  </header>
</template>
