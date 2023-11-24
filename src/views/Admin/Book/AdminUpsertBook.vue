<template>
  <div class="container">
    <div class="row justify-content-center mt-4">
      <div class="col-sm-6">
        <h2 class="text-primary text-center">
          {{ editMode ? "Edit Book" : "Add Book" }}
        </h2>
        <form enctype="multipart/form-data" @submit.prevent="upsertBook" class="mt-3">
          <!-- Form Fields -->
          <template v-for="field in formFields" :key="field.id">
            <DynamicFormField
              :id="field.id"
              :label="field.label"
              :type="field.type"
              :value="form[field.id]"
              :errors="errors"
              @update:value="updateFormFieldValue(field.id, $event)"
            />
            <template v-if="field.id == 'image' && bookImage">
              <img
                width="200"
                class="img-fluid rounded"
                :src="bookImage"
                alt="Book Cover"
              />
            </template>
          </template>
          <!-- Submit and Go Back Buttons -->
          <div class="mt-4 text-center">
            <button type="submit" class="btn btn-primary me-2">
              {{ editMode ? "Update" : "Submit" }}
            </button>
            <button type="button" class="btn btn-secondary" @click="goBack">
              {{ editMode ? "Cancel" : "Go Back" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DynamicFormField from "@/components/common/DynamicFormField.vue";

export default {
  components: {
    DynamicFormField,
  },
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      bookImage: "",
      editMode: false,
      formFields: [
        { id: "title", label: "Title", type: "text" },
        { id: "author", label: "Author Name", type: "text" },
        { id: "genre", label: "Genre", type: "text" },
        { id: "description", label: "Description", type: "textarea" },
        { id: "isbn", label: "ISBN", type: "number" },
        { id: "published", label: "Published Date", type: "date" },
        { id: "publisher", label: "Publisher Name", type: "text" },
        { id: "image", label: "Image", type: "file" },
      ],
      form: {
        title: "",
        author: "",
        genre: "",
        description: "",
        isbn: "",
        image: "",
        published: "",
        publisher: "",
      },
      errors: [],
    };
  },
  watch: {
    "form.image": {
      handler(newFile) {
        this.previewImage(newFile);
      },
      immediate: true, // Trigger the watch handler immediately
    },
  },
  methods: {
    previewImage(file) {
      if (file instanceof File) {
        this.bookImage = URL.createObjectURL(file);
      } else if (file.thumbnail) {
        this.bookImage = file.thumbnail.includes("http")
          ? file.thumbnail
          : this.$imageUrl + "/" + file.thumbnail;
      }
    },
    /**
     * Submit the form to create or update a book
     */
    async upsertBook() {
      this.errors = [];

      try {
        // Create form data
        const formData = new FormData();

        // Append form data
        for (const key in this.form) {
          if (key === "image") {
            if (this.form[key] instanceof File) {
              formData.append(key, this.form[key]);
              continue;
            }
          } else {
            formData.append(key, this.form[key]);
          }
        }

        let response;

        // Add / update book
        if (this.editMode) {
          formData.append("_method", "PUT");
          response = await axios.post("books/" + this.id, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } else {
          response = await axios.post("books", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }

        // Check if the request was successful
        if (response.data.success) {
          this.goBack();
        } else {
          console.error("Error submitting form:", error);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        this.errors = error.response.data.errors;
      }
    },
    uploadFile(e) {
      this.form.file = e.target.files[0];
    },
    goBack() {
      this.$router.push({ path: "/admin/books" });
    },
    updateFormFieldValue(fieldId, value) {
      // Update the form field value in the parent component
      this.form[fieldId] = value;
    },
    async getBook() {
      try {
        this.editMode = true;
        const response = await axios.get("books/" + this.id);
        const apiResponse = response.data;
        this.form = apiResponse.data;
        this.editMode = true;
      } catch (error) {
        console.error("Error fetching book:", error);
        // Handle error (show a message to the user, retry, etc.)
      }
    },
  },
  mounted() {
    // Check if we are in edit mode then get book using id and fill value in input
    if (this.id) {
      this.getBook();
    }
  },
};
</script>
