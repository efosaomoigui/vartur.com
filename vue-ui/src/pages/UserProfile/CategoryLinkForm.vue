<template>
  <card>
    <form @submit.prevent="addCategoryLink" enctype="multipart/form-data">
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
            <select class="form-control" v-model="category.parent_id" required>
              <option
                v-for="category in dataFromParent"
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
        <button type="submit" class="btn btn-info btn-fill float-right">
          Add Parent Category
        </button>
      </div>

      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
import Card from "src/components/Cards/Card.vue";
import axios from "axios";

export default {
  components: {
    Card,
  },
  data() {
    return {
      category: {
        name: "",
        picture: "",
        parent_id: "",
        reloadKey: 0,
      },
    };
  },
  props: {
    dataFromParent: {
      required: true,
    },
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      console.log("file", this.selectedFile);
    },
    async addCategoryLink() {
      const fd = new FormData();
      this.category.file = this.selectedFile;

      // Append properties from categoryData to the FormData
      fd.append("name", this.category.name);
      fd.append("parent_id", Number(this.category.parent_id));
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
