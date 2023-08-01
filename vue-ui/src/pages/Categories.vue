<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
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
        <div class="col-6">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Child Category</h4>
              <p class="card-category">Create New Category Links</p>
            </template>
            <div class="col-md-12">
              <category-link-form :dataFromParent="table1.data">
              </category-link-form>
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
            <table class="table">
              <thead>
                <slot name="columns">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Parent</th>
                    <th>Picture</th>
                    <th></th>
                  </tr>
                </slot>
              </thead>
              <tbody>
                <tr v-for="(item, index) in table1.data" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.parent_id }}</td>
                  <td>{{ item.picture }}</td>
                  <td>
                    <button @click="confirmDeleteCategory(item.id)">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- <l-table
              class="table-hover table-striped"
              :columns="table1.columns"
              :data="table1.data"
            >
            </l-table> -->
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LTable from "src/components/Table.vue";
import CategoryForm from "./UserProfile/CategoryForm.vue";
import CategoryLinkForm from "./UserProfile/CategoryLinkForm.vue";
import Card from "src/components/Cards/Card.vue";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

export default {
  components: {
    LTable,
    Card,
    CategoryForm,
    CategoryLinkForm,
  },
  data() {
    return {
      table1: {
        data: [],
      },
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    handleCategoryCreated() {
      this.getCategories();
    },
    async getCategories() {
      console.log(`${process.env.VUE_APP_BASE_URL}/api/categories`);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories/"
        );
        this.table1.data = response.data;
        console.log("Result: ", this.table1.data);
      } catch (error) {
        console.log("Result: ", error);
      }

      // this.category.info = "alert alert-info text-dark";
      // this.category.message = "Category Created Successfully!";
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
  },
};
</script>
<style></style>
