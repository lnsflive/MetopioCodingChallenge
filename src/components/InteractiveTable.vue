<template>
    <v-container>
        <v-card>
            <v-tabs
            v-model="tab"
            grow
            >
                <v-tab
                v-for="item in items"
                :key="item"
                >
                {{item}} 
                </v-tab>
                <v-tab-item>
                    <v-col><h1 class="pt-6 text-center">Categories</h1></v-col>
                    <v-expansion-panels
                      focusable
                      hover
                    >
                        <v-expansion-panel
                          v-for="(item, i) in categoriesItems"
                          :key="i"
                        >
                            <v-expansion-panel-header class="text-center">
                                <div><font-awesome-icon :icon="item.icon" />  {{item.name}}</div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-col>
                                    <v-chip 
                                    v-for="(category, j) in item.subcategories"
                                    :key="j"
                                    @click="openTable(category.name)"
                                    class="ma-3 white--text"
                                    color="blue"
                                    >
                                    {{category.name}}
                                    </v-chip>
                                </v-col>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-tab-item>
                <v-tab-item>
                    <v-col><h1 class="pt-6 text-center">Topics</h1></v-col>
                    <v-card>
                        <v-card-title>
                            <v-col>
                                <v-row>
                                    <v-text-field
                                    v-model="topicsSearch"
                                    append-icon="mdi-magnify"
                                    label="Search by Name"
                                    single-line
                                    hide-details
                                    clearable
                                    ></v-text-field>
                                </v-row>
                                <v-row>
                                    <v-select
                                    v-model="categoryFilter"
                                    :items="topicsFilter"
                                    prepend-inner-icon="mdi-magnify"
                                    label="Filter by Category"
                                    clearable
                                    ></v-select>
                                    <v-select
                                    v-model="subCategoryFilter"
                                    :items="topicsFilter2"
                                    prepend-inner-icon="mdi-magnify"
                                    label="Filter by Subcategory"
                                    clearable
                                    class="ml-2"
                                    ></v-select>
                                </v-row>
                            </v-col>
                        </v-card-title>
                        <v-data-table
                          :headers="topicsHeaders"
                          :items="topicsItems"
                          :search="topicsSearch"
                          :items-per-page="itemsPerPage"
                          hide-default-footer
                          :page.sync="page"
                          sort-by="name"
                          @page-count="pageCount = $event"
                        >
                        <template v-slot:[`item.name`]="{item}">
                             <router-link :to="`/topics/${item.key}`">{{item.name}}</router-link>
                        </template>
                        </v-data-table>
                        <div class="text-center pt-2">
                            <v-pagination
                              v-model="page"
                              :length="pageCount"
                              :total-visible="7"
                            ></v-pagination>
                        </div>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-container>
</template>

<script>
export default {
  name: "InteractiveTable",
  data: ()=>({
      items: ["Categories", "Topics"],
      categoriesHeaders: [
          {text: 'Name', align: 'center', value: 'name'}
      ],
      categoriesSearch: '',
      subcategoriesSearch: '',
      topicsSearch: '',
      categoriesItems: [],
      subcategoriesItems: [],
      topicsItems: [],
      tab: 0,
      page: 1,
      pageCount: 1,
      itemsPerPage: 10,
      topicsFilter: [{"text": "All" ,"value": null}],
      topicsFilter2: [{"text": "All" ,"value": null}],
      categoryPages: 25,
      categoryFilter: null,
      subCategoryFilter: null
  }),
  mounted () {
    this.axios
      .get('/api/v1/categories/')
      .then(response => {
          this.categoriesItems = response.data.results;
          this.categoriesItems.forEach(element => {
              this.topicsFilter.push({"text": element.name, "value": element.name})
              element['subcategories'].forEach(e => {
                if(!this.subcategoriesItems.some(({name}) => name === e.name))
                    this.subcategoriesItems.push(e)
                    this.topicsFilter2.push({"text": e.name, "value": e.name})
              });
          });
      })
      .catch(error => console.log(error))
    this.axios
    .get('/api/v1/topics/?limit=999')
    .then(response => {
        let tmp = response.data.results
        tmp.forEach(element => {
            if(element['subcategories'].length > 1){
                for(var i =0; i< element['subcategories'].length;i++){
                    let tempArr = {...element}
                    let tempSub = element.subcategories[i]
                    tempArr.subcategories = []
                    tempArr.subcategories.push(tempSub)
                    this.topicsItems.push(tempArr)
                }
            }else{
                this.topicsItems.push(element)
            }
        });
    })
    .catch(error => console.log(error))
  },
  methods:{
      checkCategory(items, type){
          let tmp = []
          items.forEach(element => {
              if(tmp[0] !== element[type])
                tmp.push(element[type])
          });
          return tmp.toString()
      },
      customCategoryFilter(value, search, filter){
          
          if(!this.categoryFilter) return true
          value = ''
          search = ''
          return filter.subcategories[0].category === this.categoryFilter
      },
      customSubCategoryFilter(value, search, filter){
          
          if(!this.subCategoryFilter) return true
          value = ''
          search = ''
          return filter.subcategories[0].name === this.subCategoryFilter
      },
      openTable(ref){
          this.subCategoryFilter = ref
          this.tab = 1
      }
  },
  computed:{
      topicsHeaders(){
          return [
            {text: 'Name', align: 'start', value: 'name'},
            {text: 'Key', align: 'start', value: 'key', sortable: false},
            {text: 'Description', align: 'start', value: 'description', sortable: false},
            {text: 'Units', align: 'start', value: 'units', sortable: false},
            {text: 'Subcategories', align: 'start', value: 'subcategories[0].name', filter: this.customSubCategoryFilter},
            {text: 'Categories', align: 'start', value: 'subcategories[0].category', filter: this.customCategoryFilter}
          ]
      }
  }
};
</script>

<style>
tr:nth-child(even){
    background-color: #dce4ef;
}
</style>
