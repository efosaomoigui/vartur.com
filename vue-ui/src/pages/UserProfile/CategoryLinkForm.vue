<template>
  <card>
    <!-- <pre>
      {{ JSON.stringify(category, null, 2) }}
    </pre> -->

    <form @submit.prevent="addCategory">
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
      },
    };
  },
  computed: {
    categories() {
      return [
        { id: 1, name: "Category 1" },
        { id: 2, name: "Category 2" },
      ];
    },
  },
  methods: {
    handleFileUpload() {
      alert("Your data: " + JSON.stringify(this.user));
    },
  },
};
</script>
<style></style>
