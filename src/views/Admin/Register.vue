<template>
  <div class="container d-flex align-items-center justify-content-center mt-5">
    <div class="shadow-lg p-3 mb-5 bg-body rounded col-md-6">
      <h2 class="text-center">Register</h2>
      <hr />
      <form @submit.prevent="submitRegisterForm()">
        <div class="form-group mt-3">
          <label for="name">Name:</label>
          <input type="name" class="form-control" v-model="form.name" id="name" />
          <p class="text-danger" v-if="errors?.name">{{ errors["name"][0] }}</p>
        </div>
        <div class="form-group mt-3">
          <label for="email">Email Address:</label>
          <input type="email" class="form-control" v-model="form.email" id="email" />
          <p class="text-danger" v-if="errors?.email">{{ errors["email"][0] }}</p>
        </div>
        <div class="form-group mt-3">
          <label for="password">Password:</label>
          <input
            type="password"
            class="form-control"
            v-model="form.password"
            id="password"
          />
          <p class="text-danger" v-if="errors?.password">{{ errors["password"][0] }}</p>
        </div>
        <div class="form-group mt-3">
          <label for="password_confirmation">Confirm Password:</label>
          <input
            type="password"
            class="form-control"
            v-model="form.password_confirmation"
            id="password_confirmation"
          />
          <p class="text-danger" v-if="errors?.password_confirmation">
            {{ errors["password_confirmation"][0] }}
          </p>
        </div>
        <div class="col-12 text-center mb-3">
          <button type="submit" class="btn btn-primary mt-3">Register</button>
        </div>
        <div class="col-12 text-center">
          <label
            >Already have an account?
            <router-link :to="{ name: 'AdminLogin' }">Login Now!</router-link></label
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      processing: false,
      errors: [],
    };
  },
  methods: {
    async submitRegisterForm() {
      this.processing = true;
      this.$store
        .dispatch("register", this.form)
        .then(() => {
          this.$router.push({ name: "AdminBookList" });
        })
        .catch((error) => {
          const errorResponse = error.response;
          this.errors = {};
          this.errors = errorResponse.data.errors;
        })
        .finally(() => {
          this.processing = false;
        });
    },
  },
};
</script>
