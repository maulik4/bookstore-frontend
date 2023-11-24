<template>
  <div class="container h-100">
    <div class="row h-100 align-items-center">
      <div class="col-12 col-md-6 offset-md-3">
        <div class="card shadow sm">
          <div class="card-body">
            <h1 class="text-center">Login</h1>
            <hr />
            <form action="javascript:void(0)" class="row" method="post">
              <div class="form-group col-12">
                <label for="email" class="font-weight-bold">Email</label>
                <input
                  type="text"
                  v-model="auth.email"
                  name="email"
                  id="email"
                  class="form-control"
                />
                <p class="text-danger" v-if="errors?.email">{{ errors["email"][0] }}</p>
              </div>
              <div class="form-group col-12 my-2">
                <label for="password" class="font-weight-bold">Password</label>
                <input
                  type="password"
                  v-model="auth.password"
                  name="password"
                  id="password"
                  class="form-control"
                />
                <p class="text-danger" v-if="errors?.password">
                  {{ errors["password"][0] }}
                </p>
              </div>
              <div class="col-12 mb-2 text-center">
                <button
                  type="submit"
                  :disabled="processing"
                  @click="login"
                  class="btn btn-primary btn-block"
                >
                  {{ processing ? "Please wait" : "Login" }}
                </button>
              </div>
              <div class="col-12 text-center">
                <label
                  >Don't have an account?
                  <router-link :to="{ name: 'AdminRegister' }"
                    >Register Now!</router-link
                  ></label
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      auth: {
        email: "",
        password: "",
      },
      errors: {},
      processing: false,
    };
  },
  methods: {
    async login() {
      this.processing = true;
      this.$store
        .dispatch("login", this.auth)
        .then(() => {
          this.$router.push({ name: "AdminBookList" });
        })
        .catch((error) => {
          const errorResponse = error.response;
          this.errors = {};
          if (errorResponse.status === 422) {
            this.errors = errorResponse.data.errors;
          } else {
            this.errors.password = [errorResponse.data.message];
          }
        })
        .finally(() => {
          this.processing = false;
        });
    },
  },
};
</script>
