<!-- src/components/AdminLayout.vue -->
<template>
  <div class="container">
    <AdminHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import AdminHeader from "../../components/layouts/AdminHeader.vue";

export default {
  components: {
    AdminHeader,
  },
};
</script>
