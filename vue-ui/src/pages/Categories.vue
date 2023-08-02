<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-4">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Parent Category</h4>
              <p class="card-category">Create New Category</p>
            </template>
            <div class="col-md-12">
              <category-form @category-created="handleCategoryCreated">
              </category-form>
            </div>
          </card>
        </div>
        <div class="col-4">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Child Category</h4>
              <p class="card-category">Create New Category Links</p>
            </template>
            <div class="col-md-12">
              <category-link-form
                :dataFromParent="table1.data"
                @category-created="handleCategoryCreated"
              >
              </category-link-form>
            </div>
          </card>
        </div>

        <div class="col-4">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Product</h4>
              <p class="card-category">Create New Product Links</p>
            </template>
            <div class="col-md-12">
              <product-form
                :dataFromParent="table1.data"
                @product-created="handleProductCreated"
              >
              </product-form>
            </div>
          </card>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Category Tree</h4>
              <p class="card-category">Categories, Parents & Product Count</p>
            </template>
            <table class="table table-hover table-striped">
              <thead>
                <slot name="columns">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Parent</th>
                    <th>Picture</th>
                    <th>Product Count</th>
                    <th></th>
                  </tr>
                </slot>
              </thead>
              <tbody>
                <tr v-for="(item, index) in table1.data" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <a
                      href="#sec"
                      title="Click to view Product Below"
                      @click="filterCategoryProducts(item.id)"
                      >{{ item.name }}</a
                    >
                  </td>
                  <td>{{ item.parent }}</td>
                  <td>{{ item.picture }}</td>
                  <td>{{ item.products.length }}</td>
                  <td>
                    <button @click="confirmDeleteCategory(item.id)">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </card>
        </div>
      </div>
      <div class="row">
        <div class="col-12" id="sec">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Products</h4>
              <p class="card-category">Products & Category</p>
            </template>
            <table class="table table-hover table-striped">
              <thead>
                <slot name="columns">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Picture</th>
                    <th></th>
                  </tr>
                </slot>
              </thead>
              <tbody>
                <tr v-for="(item, index) in table1.data2" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.categoryName }}</td>
                  <td>{{ item.picture }}</td>
                  <td>
                    <button @click="confirmDeleteProduct(item.id)">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CategoryForm from "./UserProfile/CategoryForm.vue";
import CategoryLinkForm from "./UserProfile/CategoryLinkForm.vue";
import ProductForm from "./UserProfile/ProductForm.vue";
import Card from "src/components/Cards/Card.vue";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

export default {
  components: {
    Card,
    CategoryForm,
    CategoryLinkForm,
    ProductForm,
  },
  data() {
    return {
      table1: {
        data: [],
        data2: [],
      },
    };
  },
  mounted() {
    this.getCategories();
    this.getProducts();
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    handleCategoryCreated() {
      this.getCategories();
      this.getProducts();
    },
    handleProductCreated() {
      this.getCategories();
      this.getProducts();
    },
    async getCategories() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories/categoryWithProductCount"
        );
        this.table1.data = response.data;
      } catch (error) {
        console.log("Result: ", error);
      }
    }, //filterCategoryProducts
    async filterCategoryProducts(categoryId) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/products/" + categoryId
        );
        this.table1.data2 = response.data;
      } catch (error) {
        console.log("Result: ", error);
      }
    },
    async getProducts() {
      try {
        const response = await axios.get("http://localhost:3000/api/products/");
        this.table1.data2 = response.data;
      } catch (error) {
        console.log("Result: ", error);
      }
    },
    async deleteCategory(categoryId) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/categories/${categoryId}`
        );
        if (response.data.message === "Category deleted successfully") {
          await Swal.fire({
            title: "Deleted!",
            text: "The category has been deleted.",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          this.getCategories();
        }
      } catch (error) {
        console.error("Error deleting category", error);
        await Swal.fire({
          title: "Error",
          text: "Failed to delete the category.",
          icon: "error",
        });
      }
    },
    async confirmDeleteCategory(categoryId) {
      try {
        const isConfirmed = await Swal.fire({
          title: "Are you sure?",
          text: "This action cannot be undone!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
        });

        if (isConfirmed.isConfirmed) {
          await this.deleteCategory(categoryId);
        }
      } catch (error) {
        console.error("Error deleting category", error);
      }
    },
    async deleteProduct(productId) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/products/${productId}`
        );
        if (response.data.message === "Product deleted successfully") {
          await Swal.fire({
            title: "Deleted!",
            text: "The product has been deleted.",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          this.getProducts();
        }
      } catch (error) {
        console.error("Error deleting product", error);
        await Swal.fire({
          title: "Error",
          text: "Failed to delete the product.",
          icon: "error",
        });
      }
    },
    async confirmDeleteProduct(productId) {
      try {
        const isConfirmed = await Swal.fire({
          title: "Are you sure?",
          text: "This action cannot be undone!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
        });

        if (isConfirmed.isConfirmed) {
          await this.deleteProduct(productId);
        }
      } catch (error) {
        console.error("Error deleting product", error);
      }
    },
  },
};
</script>
<style></style>
