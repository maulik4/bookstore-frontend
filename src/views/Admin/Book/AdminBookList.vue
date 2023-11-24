<template>
  <div class="container">
    <h1 class="text-primary">Book List</h1>
    <div class="d-flex justify-content-end mb-3">
      <router-link :to="{ name: 'AdminUpsertBook' }" class="btn btn-primary"
        >Add Book</router-link
      >
    </div>
    <!-- Book List -->
    <table class="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <td>Image</td>
          <th>Author</th>
          <th>Genre</th>
          <th>ISBN</th>
          <th>Published</th>
          <th>Publisher</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="books.length" v-for="book in books" :key="book.id">
          <td>{{ book.id }}</td>
          <td>{{ book.title }}</td>
          <td>
            <img :src="getThumbnailUrl(book.image.thumbnail)" />
          </td>
          <td>{{ book.author }}</td>
          <td>{{ book.genre }}</td>
          <td>{{ book.isbn }}</td>
          <td>{{ book.published }}</td>
          <td>{{ book.publisher }}</td>
          <td>
            <router-link
              :to="{ name: 'AdminShowBook', params: { id: book.id } }"
              class="btn btn-info m-1 btn-sm"
              >View</router-link
            >
            <router-link
              :to="{ name: 'AdminEditBook', params: { id: book.id } }"
              class="btn btn-secondary m-1 btn-sm"
              >Edit</router-link
            >
            <button
              type="button"
              class="m-1 btn btn-danger btn-sm"
              @click="openDeleteModal(book)"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr v-else>
          <td colspan="9" class="text-center">No books found.</td>
        </tr>
      </tbody>
    </table>

    <pagination
      :currentPage="currentPage"
      :totalPages="total_pages"
      @pageChange="changePage"
    ></pagination>

    <!-- Delete Confirmation Modal -->
    <Modal v-if="deleteModal" @close="deleteModal = false" name="Confirm Delete">
      <p>Are you sure you want to delete this book?</p>
      <template #footer>
        <button type="button" class="btn btn-primary" @click="deleteBook">Yes</button>
        <button type="button" class="btn btn-secondary" @click="deleteModal = false">
          No
        </button>
      </template>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/common/Modal.vue";
import Pagination from "@/components/common/Pagination.vue";
import axios from "axios";
export default {
  components: {
    Modal,
    Pagination,
  },
  data() {
    return {
      deleteModal: false,
      books: [],
      currentPage: 1,
      total_pages: 1,
      errors: [],
      url: "books",
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    openDeleteModal(book) {
      this.selectedBook = book;
      this.deleteModal = true;
    },
    async fetchBooks() {
      try {
        const response = await axios.get(this.url, {
          params: {
            page: this.currentPage,
          },
        });
        const apiResponse = response.data;

        this.books = apiResponse.data.items;
        this.currentPage = apiResponse.data.pagination.current_page;
        this.total_pages = apiResponse.data.pagination.total_pages;
      } catch (error) {
        console.error("Error fetching books:", error);
        // Handle error (show a message to the user, retry, etc.)
      }
    },
    changePage(page) {
      // Handle page change
      this.currentPage = page;
      this.fetchBooks();
    },
    getThumbnailUrl(thumbnail) {
      return thumbnail.includes("http") ? thumbnail : this.$imageUrl + "/" + thumbnail;
    },
    async deleteBook() {
      // Implement delete functionality
      console.log("Delete book with ID:", this.selectedBook);
      try {
        const deleteResponse = await axios.delete(this.url + "/" + this.selectedBook.id);
        if (deleteResponse.status === 204) {
          this.deleteModal = false;
          this.fetchBooks();
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        // Handle error (show a message to the user, retry, etc.)
      }
    },
  },
};
</script>
