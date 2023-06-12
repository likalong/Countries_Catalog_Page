<template>
  <div id="main">
    <div class="card">
        <div class="card-title" style="font-size: 2rem; font-weight: bold;">
          Countries Catalog Implementation
        </div>
        <p class="d-flex"><router-link :to="{name:'DashboardPage'}"> Dashboard </router-link></p>
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

    <template v-if="loading">
      <div class="text-center text-info my-2 full-sreen" >
        <div class="spinner-border text-secondary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <span style="padding-left: 1rem;">Fetching countries data...</span>
      </div>
    </template>
    
    <template v-else>
      <div class="TableClass">
        <table
          striped
          hover
          class="table table-sm"
          :itemsInPage="filteredItems"
          :fields="headers"
          :busy="loading"
        >
          <thead>
            <tr>
              <th v-for="header in headers" :key="header">{{ header }}</th>
            </tr>
          </thead>


          <tbody>
            <!-- <template slot="top-row" slot-scope="{ fields }"> -->
              <tr 
                v-for="(item, itemIndex) in itemsInPage" :key="item" 
                @click=" showCountryDetail(item)"
                >
                
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
    </template>
    

    <!-- footer pagination btns -->
    <nav aria-label="..." class="d-flex justify-content-center">
      <ul class="pagination">
        <li 
          :class="isDisabledPrevBtn   == true || loading ? 'page-item disabled' : 'page-item'"
          @click="clickedPrevBtn()"
        >
          <a class="page-link" :href="'#'+this.currentPage" tabindex="-1">Previous</a>
        </li>
        <template v-if="totalPage > 1 && !loading">
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
          :class="isDisabledNextBtn == true || loading ? 'page-item disabled' : 'page-item'"
          @click="clickedNextBtn()"
        >
          <a class="page-link" :href="'#'+this.currentPage">Next</a>
        </li>
      </ul>
    </nav>

  </div>

  <DetailModal
    :prop-show-detail-modal="propShowDetailModal" 
    @update-show-detail-modal="onUpdateshowDetailModal"
    :prop-country-info="countryInfo"
    :prop-is-loading="propIsLoading"
  />

</template>



<script>
import Fuse from 'fuse.js';
import _ from 'lodash';
import DetailModal from './DetailModal.vue';
import { RouterLink } from 'vue-router'



  //
  export default {
    name: "App",
    components: {
      DetailModal,
      RouterLink,
    },
    data: () => ({
      searchText: "",
      filteredItems: "",
      isSearching: false,
      // isSorted: false,
      // searchResult: "",
      headers: ["No", "Flags", "Name", "CCA2", "CCA3", "Native name", "Alt name", "IDD"],
      sortItemByList: ["Country Name"],
      sortItemOrder: ["ASC", "DESC"],
      itemsInPage: "",
      allCountries: "",
      allCountriesCount: 0,
      itemsPerPage:25,
      currentPage: 1,
      prevPageNumer: null,
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
      propShowDetailModal: false,
      countryInfo: null,
      clickedCountryName: "",
      propIsLoading: false,
    }),
    created() {
      // console.log("current page: ", this.currentPage) 
      
      let route_page_numb = this.getPageNumberFromUrl()
      this.getCountries(route_page_numb);
    },
    methods: {
      getPageNumberFromUrl(){
        // console.log("current route: on created ", this.$route)

      console.log("current route: ", this.$route) 
        let route_page_numb = null;
        if(this.$route && this.$route.params){
          route_page_numb = this.$route.params.page_number
          this.currentPage = route_page_numb;
        }
        // if(route_page_numb && (route_page_numb != clickedPageNumber)){
        //   this.currentPage = route_page_numb;
        // } else this.currentPage = clickedPageNumber;
        return route_page_numb;
      },
      updateTotalCountriesCount(totalItems){
        // console.log("total length ", totalItems)
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
      getCountries(currentPage=null) {
        this.axios.get("/all?fields=name,altSpellings,cca2,cca3,flags,idd").then((res) => {
          this.allCountries = res.data;
          this.filteredItems = this.allCountries;
          this.updateTotalCountriesCount(this.allCountries.length);
          this.isDisabledPrevBtn = true

          if (this.allCountriesCount > 1) this.isDisabledNextBtn = false
          else this.isDisabledNextBtn = true;

          this.getPaginationItems(currentPage || 1);

          // console.log("items type  flage ", typeof(this.items[0].flags))
          // console.log("items type  ", typeof(this.items))
          // console.log("items length  ", this.items.slice(0,4).length)
          // console.log("get data ", this.itemsInPage.slice(0,4))
          //  this.filteredItems = res.data;
          // this.items.forEach(ele => {
            // console.log("is independent : ", ele.altSpellings)
          // });
          this.loading = false;
        });
      },
      getPaginationItems(clickedPageNumber) {
        // console.log("calling paginationItems, clickedPageNumber :", clickedPageNumber)

        // this.prevPageNumer = this.currentPage;
        this.currentPage = clickedPageNumber
     
        this.itemsInPage = "";
        this.itemsInPage = this.filteredItems.slice((clickedPageNumber - 1)*this.itemsPerPage, clickedPageNumber*this.itemsPerPage)
        
        if(this.isSorted) {
        this.sortByName();
        }
      },

      selectItemToList(pageNumber) {
        // console.log("current page", this.currentPage)
        // console.log("clicked  page", pageNumber)
        // this.filteredItems = this.allCountries;
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
      updateUrlParam(params){
        this.$router.replace({
          name: this.$route.name,
          params,
        })
      },
      fuzzySearch(searchStr){
        this.searchText = searchStr;
        
        if(searchStr && !this.isSearching){
          this.isSearching = true;
          this.prevPageNumer = this.currentPage;
          console.log("searching --------- prevPageNumber ", this.prevPageNumer)
        }
       
        this.currentPage = 1
        this.updateUrlParam({page_number: this.currentPage})
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
        // console.log("search str : ", searchStr)

        const fuse = new Fuse(this.allCountries, options)

        searchRes = fuse.search(searchStr);
        const resLength = searchRes.length;
        // console.log("searchResult length : ", searchRes.length)
        // console.log("searchResult str : ", searchRes)
        searchRes.forEach(data => {
        // console.log("filtered data : ", data.item)
        this.filteredItems.push(data.item);

        // console.log("this.filteredItems 1 : ", this.filteredItems)

        });
        this.temsInPage = this.filteredItems;
        // console.log("this.filteredItems : ", this.filteredItems)

        this.updateTotalCountriesCount(resLength);
        this.getPaginationItems(this.currentPage);


        if(this.searchText == "") {
          
          console.log("no search, origin.length = ", this.allCountries.length)
          this.isSearching = false;
          
          this.filteredItems = this.allCountries;
          this.item = this.allCountries;

          //checking current page from url
          console.log("prev url page numb in empty search ", this.prevPageNumer)
          if(this.prevPageNumer){
            this.currentPage = this.prevPageNumer
            this.updateUrlParam({page_number: this.prevPageNumer})
            console.log("current page, empty in search ", this.currentPage)
          } else this.currentPage = 1

          this.getPaginationItems(this.currentPage);
          this.updateTotalCountriesCount(this.allCountries.length);
          
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
          let sortedItems =  _.orderBy( this.itemsInPage, [item => {
              console.log("sorting item ", item.name.official.toLowerCase())
              return item.name.official.toLowerCase()
            }], [this.sortOrdered ])
            
            this.itemsInPage = sortedItems;
            // console.log("items after sort ", sortedItems)
        }
      },

      getCountrieByName(name) {
        console.log(name)
        // const queryStr = "/name/eesti"
        const queryStr = "/name/"+name
        this.propIsLoading = true;
        this.axios.get(queryStr).then((res) => {
          this.countryInfo = res.data[0];
          this.propIsLoading = false
          // countryInfo
          
          console.log("fetch country data after clicked::::::; ", this.countryInfo)
        
        });
      },

      async showCountryDetail(clickedCountry){
        let clickedName = "";

        if(clickedCountry.name){
          clickedName = clickedCountry.name["common"];
        } else clickedName = clickedCountry.item.name["common"]

        console.log("Clicked country :: ",clickedCountry)
        console.log("Clicked country name :: ",clickedName)

        await this.getCountrieByName(clickedName);
        await this.onUpdateshowDetailModal(true);
        
      },

      onUpdateshowDetailModal(newValue){
        // console.log("on update show detail")
        this.propShowDetailModal = newValue
      }
    },

    computed: {
      isDisabledPrevBtn() {
        if (this.currentPage > 1) return false
        else return true
      },
      isDisabledNextBtn () {
        // console.log("current page in isDisabledNextBtn", this.currentPage)
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

  :global(.FlagClass) {
    width: 100px;
    height: auto;
  }
  </style>