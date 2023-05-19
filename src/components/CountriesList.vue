<template>
    <div id="app">
      <div>
        <div class="card">
           <div class="card-title" style="font-size: 2rem; font-weight: bold;">
              Countries Catalog Implementation
            </div>
            <div class="card-body">
              
              <div class="row">
                
                <div class="col-5">
                  <div class="row">
                    <label for="search-field" class="col-lg-6 col-sm-4">Search Country in list using Fuzzy Search:</label>
                    <div class="col-lg-6 col-sm-6">
                      <input
                        id="search-field"
                        type="text" 
                        class="form-control" 
                        placeholder="Input any country's name" 
                        aria-label="Input any country's name" 
                        aria-describedby="basic-addon2"
                        v-model="searchText"
                        @input="event => fuzzySearch(event.target.value)"
                      >
                    </div>
                  </div>
                  
                </div>
                <div class="col-4">
                  <div class="dropdown">
                    <button 
                      class="btn btn-secondary 
                      dropdown-toggle" 
                      type="button" 
                      id="fieldsMenuDropdown" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false"
                    >
                      Sort By
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="fieldsMenuDropdown">
                      <div v-for="sortBy in sortItemByList" :key="sortBy">
                        <li><a class="dropdown-item" @click="selectedSortColItem(sortBy)">
                          <i 
                            :class=" 
                              sortedBy == sortBy.toLowerCase() ? 'bi bi-check-lg' : 'bi'
                            "
                            aria-hidden="true"
                          ></i>
                          {{ sortBy }}
                        </a></li>
                      </div>
                    </ul>
                    <span class="text-nowrap p-1">{{ sortedBy }}</span>
                  </div>
                  
                </div>

                <div class="col-3">
                  <div class="dropdown">
                    <button 
                      class="btn btn-secondary 
                      dropdown-toggle" 
                      type="button" 
                      id="fieldsMenuDropdown" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false"
                    >
                      Sort order
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="fieldsMenuDropdown">
                      <div v-for="sortOrder in sortItemOrder" :key="sortOrder">
                        <li><a class="dropdown-item" @click="selectedSortOrder(sortOrder)">
                          <i 
                            :class=" 
                              sortOrdered == sortOrder ? 'bi bi-check-lg' : 'bi'
                            "
                            aria-hidden="true"
                          ></i>
                          {{ sortOrder }}
                        </a></li>
                      </div>
                    </ul>
                    <span class="text-nowrap p-1">{{ sortOrdered }}</span>
                  </div>
                  
                </div>

              </div>
            </div>
        </div>
        

        <!-- end filter section -->
        <!-- <template> -->
          <div class="TableClass">
              <table
                striped
                hover
                class="table table-sm"
                :items="filteredItems"
                :fields="headers"
                :busy="loading"
              >
                <thead>
                  <tr>
                    <th v-for="header in headers" :key="header">{{ header }}</th>
                  </tr>
                </thead>

                <template>
                  <div class="text-center text-danger my-2" v-if="loading">
                    <div class="spinner-border text-secondary" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                </template>

                <tbody>
                  <!-- <template slot="top-row" slot-scope="{ fields }"> -->
                    <tr v-for="(item, itemIndex) in items" :key="item">
                      
                      <td scope="row" class="col-1 text-center align-middle">{{ itemsPerPage*(currentPage -1) + itemIndex + 1 }}</td>
                      <td class="col-1 text-center align-middle">
                        <img :src="item.flags ? item.flags.png: item.item.flags.png" class="FlagClass img-fluid mx-auto d-block">
                      </td>
                      <td class="col-2 ">{{ item.name ? item.name["official"] : item.item.name["official"] }}</td>
                      <td class="col-2 ">{{ item.cca2 || item.item.cca2 }}</td>
                      <td class="col-2 ">{{ item.cca3  || item.item.cca3}}</td>
                      <td class="col-2 text-wrap ">
                        <ul
                         class="list-unstyled float-start d-flex flex-column"
                        >
                          <li 
                            class="d-flex justify-content-start"
                            v-for="(nativename, key) in item.name.nativeName" :key="nativename">
                            <span class="fw-semibold">{{ key }}:</span> {{ nativename.official }}
                          </li>
                        </ul>
                      </td>
                      <td class="col-2 text-wrap ">
                        <ul class="list-unstyled d-flex flex-column">
                          <li 
                            class="d-flex justify-content-center"
                  
                            v-for="(altname, index) in item.altSpellings" :key="altname">
                            {{ altname }}<span v-if="index <= item.altSpellings.length">,</span>
                          </li>
                        </ul>
                        
                      </td>
                      <td>{{ item.idd.root}}</td>
                    </tr>
                  <!-- </template> -->

                
                </tbody>
              </table>
            </div>

            

              <nav aria-label="..." class="d-flex justify-content-center">
                <ul class="pagination">
                  <li 
                    :class="isDisabledPrevBtn   == true ? 'page-item disabled' : 'page-item'"
                    @click="clickedPrevBtn()"

                  >
                    <a class="page-link" :href="'#'+this.currentPage" tabindex="-1">Previous</a>
                  </li>
                  <template v-if="totalPage > 1">
                    <li
                      v-for="pageNumber in totalPage" :key="pageNumber"
                      :class="pageNumber == currentPage ? 'page-item active': 'page-item'"
                      @click="selectItemToList(pageNumber)"

                    >
                      <a class="page-link" :href="'#'+pageNumber">
                      {{ pageNumber }}</a>
                    </li>
                  </template>
                  <li
                      v-if="totalPage == 1"
                    >
                      <a class="page-link" href="#">
                      {{ 1 }}</a>
                    </li>
                  
                  <li 
                    :class="isDisabledNextBtn == true ? 'page-item disabled' : 'page-item'"
                    @click="clickedNextBtn()"
                  >
                    <a class="page-link" :href="'#'+this.currentPage">Next</a>
                  </li>
                </ul>
              </nav>
            <!-- </template> -->

      </div>
    </div>
</template>

<script>
import Fuse from 'fuse.js';
import _ from 'lodash';
  //
  export default {
    name: "App",
    components: {},
    data: () => ({
      searchText: "",
      filteredItems: "",
      isSearching: false,
      // isSorted: false,
      // searchResult: "",
      headers: ["No", "Flags", "Name", "CCA2", "CCA3", "Native name", "Alt name", "IDD"],
      sortItemByList: ["Country Name"],
      sortItemOrder: ["ASC", "DESC"],
      items: "",
      originItem: "",
      allCountriesCount: 0,
      itemsPerPage:25,
      currentPage: 1,
      totalPage: 1,
      // isDisabledPrevBtn: true,
      // isDisabledNextBtn: false,
      loading: true,
      NA: "N/A",
      filterRow: ["Name"],
      filters: {
        all: "",
        name: "",
        altSpellings: "",
        cca2: "",
        cca3: "",
        flags: "",
        idd:""
      },
      searchKey: ['name.common', 'name.official'],

      sortedBy: "",
      sortOrdered: "asc",
  
      emptyItem: [{}],
    }),
    created() {
      this.getCountries();
    },
    methods: {
      CreateEmptyItem() {
        for (let i = 0; i < this.headers.length; i++) {
          this.emptyItem[this.headers[i]] = "";
        }
      },
      updateTotalCountriesCount(totalItems){
        console.log("total length ", totalItems)
        // this.allCountriesCount = 75;
        this.allCountriesCount = totalItems;
        let countTotalPage = this.allCountriesCount/this.itemsPerPage;
        let remainder = countTotalPage % 1;
        let actualNumber =  Math.floor(countTotalPage)
        if(countTotalPage > 1){
          if(remainder != 0){
            this.totalPage = actualNumber + 1;
          } else this.totalPage = actualNumber;
        } else this.totalPage = 1;
      },
      getCountries() {
        this.axios.get("/all?fields=name,altSpellings,cca2,cca3,flags,idd").then((res) => {
          this.originItem = res.data;
          this.filteredItems = this.originItem;
          this.updateTotalCountriesCount(this.originItem.length);
          this.isDisabledPrevBtn = true

          if (this.allCountriesCount > 1) this.isDisabledNextBtn = false
          else this.isDisabledNextBtn = true;

          this.getPaginationItems(1);

          // console.log("items type  flage ", typeof(this.items[0].flags))
          // console.log("items type  ", typeof(this.items))
          // console.log("items length  ", this.items.slice(0,4).length)
          console.log("get data ", this.items.slice(0,4))
          //  this.filteredItems = res.data;
          // this.items.forEach(ele => {
            // console.log("is independent : ", ele.altSpellings)
          // });
          this.loading = false;
        });
      },
      getPaginationItems(clickedPageNumber) {
        console.log("calling paginationItems, clickedPageNumber :", clickedPageNumber)
        // this.prevPageNumer = this.currentPage;
        this.currentPage = clickedPageNumber;
        this.items = "";
        if(this.isSearching){
          this.filteredItems = this.fuzzySearch(this.searchText);
        }

        

        this.items = this.filteredItems.slice((clickedPageNumber - 1)*this.itemsPerPage, clickedPageNumber*this.itemsPerPage)
        
        if(this.isSorted) {
        this.sortByName();
        }
      },

      selectItemToList(pageNumber) {
        console.log("current page", this.currentPage)
        console.log("clicked  page", pageNumber)
        // this.filteredItems = this.originItem;
        this.getPaginationItems(pageNumber);
      },
      clickedNextBtn(){
        this.currentPage = this.currentPage + 1;
        this.getPaginationItems(this.currentPage);

      },
      clickedPrevBtn(){
        this.currentPage = this.currentPage - 1;
        this.getPaginationItems(this.currentPage);
      },
      fuzzySearch(searchStr){
        this.searchText = searchStr;

        this.currentPage = 1;
        let searchRes = "";
        this.filteredItems = []
        const options = {
          includeScore: false,
          includeMatches: false,
          minMatchCharLength: 1,
          isCaseSensitive: false,
          threshold:0.2,
          // Search in `author` and in `tags` array
          keys: this.searchKey
        }
        console.log("search str : ", searchStr)

        const fuse = new Fuse(this.originItem, options)

        searchRes = fuse.search(searchStr);
        const resLength = searchRes.length;
        console.log("searchResult length : ", searchRes.length)
        console.log("searchResult str : ", searchRes)
        searchRes.forEach(data => {
        console.log("filtered data : ", data.item)
        this.filteredItems.push(data.item);

        console.log("this.filteredItems 1 : ", this.filteredItems)

        });
        this.items = this.filteredItems;
        console.log("this.filteredItems : ", this.filteredItems)

        this.updateTotalCountriesCount(resLength);
        this.getPaginationItems(1);


        if(this.searchText == "") {
          console.log("no search, origin.length = ", this.originItem.length)
          this.isSearching = false;
          
          this.filteredItems = this.originItem;
          this.item = this.originItem;
          this.getPaginationItems(1);
          this.updateTotalCountriesCount(this.originItem.length);
          
        }


        // return searchRes;
      },

      selectedSortColItem(sortBy) {
        this.sortedBy = sortBy
        console.log("sort by ", sortBy)
        this.sortByName();

      },

      selectedSortOrder(sortOrder) {
        this.sortOrdered = sortOrder.toLowerCase();
        console.log("sortOrder ", this.sortOrdered)
        this.sortByName();
      },

      sortByName() {
        if(this.sortOrdered && this.sortedBy){
          let sortedItems =  _.orderBy( this.items, [item => {
              // console.log("sorting item ", item.name.official.toLowerCase())
              return item.name.official.toLowerCase()
            }], [this.sortOrdered ])
            
            this.items = sortedItems;
            // console.log("items after sort ", sortedItems)
        }
      },
    },


  
    computed: {
      isDisabledPrevBtn() {
        if (this.currentPage > 1) return false
        else return true
      },
      isDisabledNextBtn () {
        console.log("current page  isDisabledNextBtn", this.currentPage)
        if (this.currentPage < this.allCountriesCount/this.itemsPerPage) return false
        else return true;
      },
      isSorted () {
        if (!this.sortedBy) {
          return false;
        } else return true;
      }
    },
  };
  </script>
  
  <style scoped>
  .TableClass {
    margin: calc(2vw);
  }

  .FlagClass {
    width: 100px;
    height: auto;
  }
  </style>