<template>
  <div class="container mt-5">
    <div class="row">
      <!-- Left Column: Book Cover -->
      <div class="col-md-6" v-if="book.image">
        <img
          :src="getImageUrl(book.image.large)"
          alt="Book Cover"
          class="img-fluid rounded"
        />
      </div>

      <!-- Right Column: Book Details -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title h3 text-primary mb-3">{{ book.title }}</h2>
            <p class="card-text"><strong>Description</strong> {{ book.description }}</p>
            <p class="card-text"><strong>Author: </strong>{{ book.author }}</p>
            <p class="card-text"><strong>Genre:</strong> {{ book.genre }}</p>
            <p class="card-text"><strong>ISBN:</strong> {{ book.isbn }}</p>
            <p class="card-text"><strong>Publisher:</strong> {{ book.publisher }}</p>
            <p class="card-text"><strong>Published:</strong> {{ book.published }}</p>

            <!-- Buttons for actions -->
            <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
              <button @click="$router.go(-1)" class="btn btn-primary me-md-2">
                Back To Book Store
              </button>
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
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      book: {},
    };
  },
  methods: {
    getData() {
      axios
        .get("book-store/" + this.id)
        .then((response) => {
          this.book = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getImageUrl(thumbnail) {
      return thumbnail.includes("http") ? thumbnail : this.$imageUrl + "/" + thumbnail;
    },
  },
};
</script>
