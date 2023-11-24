<!-- src/components/AdminHeader.vue -->
<template>
  <header
    class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
  >
    <a
      href="/"
      class="display-6 d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none text-"
    >
      Admin
    </a>
    <div class="col-md-6 text-end">
      <span v-if="isLoggedIn" class="me-2"
        >Logged in as {{ $store.state.auth.user.name }}</span
      >
      <button
        v-if="isLoggedIn"
        type="button"
        class="btn btn-outline-primary me-2"
        @click="logout"
      >
        Logout
      </button>
      <template v-else>
        <router-link :to="{ name: 'Bookstore' }" class="btn btn-outline-secondary me-2"
          >Back To Customer Portal</router-link
        >
        <router-link to="/admin/login" class="btn btn-outline-primary me-2"
          >Login</router-link
        >
        <router-link to="/admin/register" class="btn btn-primary">Register</router-link>
      </template>
    </div>
  </header>
</template>
<script>
// need to create logout method and set parameter if logged in
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      // call logout action from store
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push({ name: "AdminLogin" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
