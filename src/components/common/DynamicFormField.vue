<template>
  <div class="form-group mt-2">
    <label :for="id">{{ label }}:</label>
    <input
      v-if="type === 'file'"
      @change="handleFileChange"
      :id="id"
      type="file"
      class="form-control"
      :class="{ 'is-invalid': errors?.[id] }"
    />
    <textarea
      v-else-if="type === 'textarea'"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
      :id="id"
      class="form-control"
      :class="{ 'is-invalid': errors?.[id] }"
    ></textarea>
    <input
      v-else
      :value="value"
      :type="type"
      @input="$emit('update:value', $event.target.value)"
      :id="id"
      class="form-control"
      :class="{ 'is-invalid': errors?.[id] }"
    />
    <p class="text-danger" v-if="errors?.[id]">{{ errors[id][0] }}</p>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    label: String,
    type: String,
    value: [String, Number],
    errors: Object,
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      this.$emit("update:value", file);
    },
  },
};
</script>
