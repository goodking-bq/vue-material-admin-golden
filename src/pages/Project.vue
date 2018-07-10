<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="projects"
      :search="search"
      :pagination.sync="pagination"
      hide-actions
      class="elevation-1"
    >
    </v-data-table>
  </div>
</template>

<script>
  export default {
    name: "Project",
    data() {
      return {
        headers: [{text: "项目名"}],
        projects: [],
        pagination: {}
      }
    }
  }
</script>

<style scoped>

</style>
