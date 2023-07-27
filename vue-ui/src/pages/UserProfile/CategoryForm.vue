<template>
  <card>
    <form>
      <div class="row">
        <div class="col-md-12">
          <base-input
            type="text"
            label="Category"
            :disabled="false"
            placeholder=""
            v-model="category.name"
          >
          </base-input>
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
          Add Parent Category
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
  methods: {
    updateProfile() {
      alert("Your data: " + JSON.stringify(this.user));
    },
    async addCategory() {
      try {
        // Prepare the category data
        const categoryData = {
          name: this.name,
          image: this.picture,
        };

        // Add Parent Category
        const response = await axios.post("/api/categories", categoryData);

        console.log("Category added successfully:", response.data);
        this.name = "";
        this.picture = null;
      } catch (error) {
        console.error("Error adding category:", error);
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.$emit("file-selected", file); // Emit an event to the parent component with the selected file
    },
  },
};
</script>
<style></style>
