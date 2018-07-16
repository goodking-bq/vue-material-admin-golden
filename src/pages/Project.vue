<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-data-table
        :headers="headers"
        :items="projects"
        :search="search"
        :pagination.sync="pagination"
        :loading="false"
        hide-actions
        item-key="name"
      >
        <template slot="items" slot-scope="props">
          <tr @click="props.expanded = !props.expanded">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.doc }}</td>
            <td>{{ props.item.description }}</td>
            <td>{{ props.item.version }}</td>
            <td>{{ props.item.author }}</td>
            <td>{{ props.item.create_date }}</td>
            <td class="justify-center">
              <v-btn depressed icon fab dark color="primary" small>
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn depressed icon fab dark color="pink" small>
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-card flat>
            <v-data-table
              :items="props.item.spiders"
              class="elevation-1"
              hide-actions
              hide-headers
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.doc }}</td>
                <td class="justify-center">
                  <v-btn depressed icon fab dark color="primary" small>
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn depressed icon fab dark color="pink" small>
                    <v-icon>delete</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" :length="1" circle></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
  import Api from '@/api'

  export default {
    name: "Project",
    data() {
      return {
        headers: [
          {text: "项目名", value: "name"},
          {text: "说明", value: "doc"},
          {text: "其他", value: "description"},
          {text: "版本", value: "version"},
          {text: "作者", value: "author"},
          {text: "创建时间", value: "create_date"},
          {text: "操作", value: ""},
        ],
        projects: [],
        pagination: {},
        search: '',
      }
    },
    created() {
      this.$nextTick(function () {
        this.$ajax.get(Api.project.project)
          .then((res) => {
            this.projects = res.data
          })
      })
    },
  }
</script>

<style scoped>

</style>
