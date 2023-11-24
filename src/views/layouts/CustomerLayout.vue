<!-- src/components/CustomerLayout.vue -->
<template>
  <div class="container">
    <CustomerHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import CustomerHeader from "../../components/layouts/CustomerHeader.vue";
export default {
  components: {
    CustomerHeader,
  },
};
</script>
