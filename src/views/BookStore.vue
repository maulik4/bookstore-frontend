<template>
  <div>
    <h1>Book List</h1>

    <div class="container mt-4">
      <div class="row">
        <div class="col-md-4">
          <form @submit.prevent="filterBooks">
            <!-- Filter -->
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input
                v-model="filters.title"
                @input="debouncedFilter"
                type="text"
                class="form-control"
                id="title"
              />
            </div>
            <div class="mb-3">
              <label for="author" class="form-label">Author</label>
              <input
                v-model="filters.author"
                @input="debouncedFilter"
                type="text"
                class="form-control"
                id="author"
              />
            </div>
            <div class="mb-3">
              <label for="author" class="form-label">Publisher</label>
              <input
                v-model="filters.publisher"
                @input="debouncedFilter"
                type="text"
                class="form-control"
                id="author"
              />
            </div>
            <div class="mb-3">
              <label for="author" class="form-label">Published Date</label>
              <input
                v-model="filters.published"
                @input="debouncedFilter"
                type="date"
                class="form-control"
                id="author"
              />
            </div>
            <div class="mb-3">
              <label for="author" class="form-label">ISBN</label>
              <input
                v-model="filters.isbn"
                @input="debouncedFilter"
                type="text"
                class="form-control"
                id="author"
              />
            </div>
            <div class="mb-3">
              <label for="genre" class="form-label">Genre</label>
              <input
                v-model="filters.genre"
                @input="debouncedFilter"
                type="text"
                class="form-control"
                id="genre"
              />
            </div>
          </form>
        </div>

        <div class="col-md-8">
          <div class="row mb-3 g-4">
            <div
              v-if="books.data?.items.length"
              class="col-md-4"
              v-for="book in books.data.items"
              :key="book.id"
            >
              <div class="card">
                <img
                  :src="getImageUrl(book.image.medium)"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <router-link
                    :to="{
                      name: 'BookDetails',
                      params: { id: book.id },
                    }"
                    >{{ book.title }}</router-link
                  >
                  <p class="card-text mb-0 mt-2">Author: {{ book.author }}</p>
                  <p class="card-text m-0">ISBN: {{ book.isbn }}</p>
                  <p class="card-text m-0">Genre: {{ book.genre }}</p>
                </div>
              </div>
            </div>
            <div v-else class="col-md-12 align-self-center">
              <h4 class="text-center">No books found.</h4>
            </div>
          </div>

          <!-- Pagination -->
          <pagination
            v-if="books.data?.items.length"
            :currentPage="books.data.pagination.current_page"
            :totalPages="books.data.pagination.total_pages"
            @pageChange="paginate"
          ></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Pagination from "@/components/common/Pagination.vue";
import _ from "lodash";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      books: {},
      filters: {
        title: "",
        author: "",
        publisher: "",
        published: "",
        isbn: "",
        genre: "",
      },
      activePage: 1,
      debouncedFilter: _.debounce(this.filterBooks, 500),
    };
  },
  methods: {
    getImageUrl(image) {
      return image.includes("http") ? image : this.$imageUrl + "/" + image;
    },
    async fetchBooks() {
      try {
        const nonEmptyFilters = Object.fromEntries(
          Object.entries(this.filters).filter(([_, value]) => value !== "")
        );
        const response = await axios.get("book-store", {
          params: { filters: this.filters, page: this.activePage },
        });
        this.books = response.data;

        this.$router.replace({
          query: { ...nonEmptyFilters, page: this.books.data.pagination.current_page },
        });
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },
    filterBooks() {
      this.activePage = 1;
      this.fetchBooks();
    },
    paginate(page) {
      this.activePage = page;
      this.fetchBooks();
    },
  },
  mounted() {
    // Get query params from the URL and set them as filters
    const { query } = this.$route;
    const filterKeys = ["title", "author", "publisher", "published", "isbn", "genre"];

    filterKeys.forEach((key) => (this.filters[key] = query[key] || ""));
    this.activePage = query.page || 1;

    // Fetch books
    this.fetchBooks();
  },
};
</script>
<style scoped>
.card {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12), 0.3s box-shadow,
    0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}
</style>
