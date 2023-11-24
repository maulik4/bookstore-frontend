<template>
  <nav
    v-if="totalPages > 1"
    aria-label="Page navigation"
    class="d-flex justify-content-center"
  >
    <ul class="pagination">
      <li :class="{ disabled: currentPage === 1 }">
        <a
          class="page-link"
          @click="paginate(currentPage - 1)"
          href="#"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <template v-for="page in visiblePages" :key="page">
        <li v-if="page === 'ellipsis'" class="page-item disabled">
          <span class="page-link">...</span>
        </li>
        <li v-else :class="{ active: page === currentPage }">
          <a class="page-link" @click="paginate(page)" href="#">{{ page }}</a>
        </li>
      </template>

      <li :class="{ disabled: currentPage === totalPages }">
        <a
          class="page-link"
          @click="paginate(currentPage + 1)"
          href="#"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    maxPages: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    // Returns an array of page numbers to display in the pagination bar
    visiblePages() {
      const { currentPage, totalPages, maxPages } = this;
      const startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
      const endPage = Math.min(startPage + maxPages - 1, totalPages);

      // If there are more pages than the maximum number of pages to display,
      // calculate the start and end pages based on the current page and the
      // maximum number of pages to display

      return [
        ...(startPage > 1 ? [1, ...(startPage > 2 ? ["ellipsis"] : [])] : []),
        ...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i),
        ...(endPage < totalPages ? ["ellipsis", totalPages] : []),
      ];
    },
  },
  methods: {
    // Emits the pageChange event with the page number
    paginate(page) {
      if (page !== "ellipsis" && page !== this.currentPage) {
        this.$emit("pageChange", page);
      }
    },
  },
};
</script>