<template>
  <card>
    <!-- <pre>
      {{ JSON.stringify(category, null, 2) }}
    </pre> -->
    <form @submit.prevent="addCategory" enctype="multipart/form-data">
      <div class="row">
        <div class="col-12">
          <div v-bind:class="category.info">
            {{ category.message }}
          </div>
        </div>
      </div>

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
            <label for="picture">Picture: &nbsp;</label>
            <input type="file" @change="handleFileUpload" />
          </div>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right">
          Add Parent Category
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
import axios from "axios";
import Card from "src/components/Cards/Card.vue";

export default {
  components: {
    Card,
  },
  data() {
    return {
      category: {
        name: "",
        parent_id: 0,
        picture: "",
        file: "",
      },
      selectedFile: null,
      message: "",
      info: "",
      tableData: [],
      reloadKey: 0,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },

    async fetchCategories() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories"
        );
        this.tableData = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async addCategory() {
      const fd = new FormData();
      this.category.file = this.selectedFile;

      // Append properties from categoryData to the FormData
      fd.append("name", this.category.name);
      fd.append("parent_id", this.category.parent_id);
      fd.append("picture", "rrrrr");
      fd.append("file", this.selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:3000/api/categories/",
          fd
        );

        this.$emit("category-created");
        this.category.info = "alert alert-info text-dark";
        this.category.message = "Category Created Successfully!";
      } catch (error) {
        console.log("Result: ", error);
      }
    },
  },
};
</script>
<style></style>
