<template>
  <card>
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
          <td><button>Delete</button></td>
        </tr>
      </tbody>
    </table>
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
      id: "",
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
  },
};
</script>
<style></style>
