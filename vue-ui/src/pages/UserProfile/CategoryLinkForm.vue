<template>
  <card>
    <form>
      <div class="row">
        <div class="col-md-6">
          <base-input
            type="text"
            label="Category"
            :disabled="false"
            placeholder="ss"
            v-model="category.name"
          >
          </base-input>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="parentCategory">Parent Category:</label>
            <select
              class="form-control"
              v-model="selectedParentCategory"
              required
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label for="categoryImage">Picture: &nbsp;</label>
            <input type="file" @change="handleFileUpload" />
          </div>
        </div>
      </div>

      <div class="text-center">
        <button
          type="submit"
          class="btn btn-info btn-fill float-right"
          @click.prevent="updateProfile"
        >
          Add Child Category
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
import Card from "src/components/Cards/Card.vue";

export default {
  components: {
    Card,
  },
  data() {
    return {
      category: {
        name: "Category",
        picture: "picture",
      },
    };
  },
  computed: {
    categories() {
      // Assuming you have fetched the categories data from the API and stored it in 'this.categories'
      // Replace this with your actual categories data fetched from the backend API
      return [
        { id: 1, name: "Category 1" },
        { id: 2, name: "Category 2" },
        // Add more categories here...
      ];
    },
  },
  methods: {
    updateProfile() {
      alert("Your data: " + JSON.stringify(this.user));
    },
  },
};
</script>
<style></style>
