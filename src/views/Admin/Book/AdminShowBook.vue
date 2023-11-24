<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <h2 class="text-primary text-center mb-4">View Book</h2>

        <table class="table">
          <tbody>
            <tr v-for="(value, key) in book" :key="key">
              <th class="text-uppercase fw-bold" scope="row">{{ key.toUpperCase() }}</th>
              <td v-if="key === 'image'">
                <img
                  class="img-fluid rounded"
                  :src="getThumbnailUrl(value.thumbnail)"
                  alt="Book Cover"
                />
              </td>
              <td v-else>{{ value }}</td>
            </tr>
          </tbody>
        </table>
        <div class="text-center mt-4">
          <router-link :to="{ name: 'AdminBookList' }" class="btn btn-secondary"
            >Go Back</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      book: {
        title: "",
        author: "",
        genre: "",
        description: "",
        isbn: "",
        file: "",
        published: "",
        publisher: "",
      },
      errors: [],
    };
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    getThumbnailUrl(thumbnail) {
      return thumbnail.includes("http") ? thumbnail : this.$imageUrl + "/" + thumbnail;
    },
    async getData() {
      try {
        const response = await axios.get(`books/${this.id}`);

        if (response.data.success) {
          this.book = response.data.data;
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    },
  },
};
</script>
