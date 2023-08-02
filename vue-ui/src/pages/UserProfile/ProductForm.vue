<template>
  <card>
    <form @submit.prevent="addProduct" enctype="multipart/form-data">
      <div class="row">
        <div class="col-md-6">
          <base-input
            type="text"
            label="Product"
            :disabled="false"
            placeholder="ss"
            v-model="product.name"
          >
          </base-input>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="Category">Category:</label>
            <select class="form-control" v-model="product.category_id" required>
              <option
                v-for="product in dataFromParent"
                :key="product.id"
                :value="product.id"
              >
                {{ product.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="col-md-12">
          <div class="form-group">
            <label for="ProductImage">Picture: &nbsp;</label>
            <input type="file" @change="handleFileUpload" />
          </div>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right">
          Add Product
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
      product: {
        name: "",
        picture: "",
        category_id: "",
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
    async addProduct() {
      const fd = new FormData();
      this.product.file = this.selectedFile;

      // Append properties from categoryData to the FormData
      fd.append("name", this.product.name);
      fd.append("category_id", Number(this.product.category_id));
      fd.append("picture", "rrrrr");
      fd.append("file", this.selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:3000/api/products/",
          fd
        );

        this.$emit("product-created");
        this.product.info = "alert alert-info text-dark";
        this.product.message = "Product Created Successfully!";
        this.product.name = "";
        this.product.category_id = "";
      } catch (error) {
        console.log("Result: ", error);
      }
    },
  },
};
</script>
<style></style>
