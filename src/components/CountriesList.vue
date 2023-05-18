<template>
    <div id="app">
      <div>
        <div class="card-body">
          <div class="card-title">
            Fields to Filter
          </div>
          <div class="row">
          
            <div class="col-9">
              <input 
                type="text" 
                class="form-control" 
                placeholder="Search all values" 
                aria-label="Search all values" 
                aria-describedby="basic-addon2"
                v-model="filters.all"
              >
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
                  Dropdown button
                </button>
                <ul class="dropdown-menu" aria-labelledby="fieldsMenuDropdown">
                  <div v-for="header in headers" :key="header">
                    <li><a class="dropdown-item" @click="SelectedFilterRowsItem(header)">
                      <i 
                        :class=" 
                          filterRow.indexOf(header) != -1 ? 'bi bi-check-lg' : 'bi'
                        "
                        aria-hidden="true"
                      ></i>
                      {{ header }}
                    </a></li>
                  </div>
                </ul>
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
                        <img :src="item.flags.png" class="FlagClass img-fluid mx-auto d-block">
                      </td>
                      <td class="col-2 ">{{ item.name["official"] }}</td>
                      <td class="col-2 ">{{ item.cca2 }}</td>
                      <td class="col-2 ">{{ item.cca3 }}</td>
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
                      <td>{{ item.idd.root }}</td>
                    </tr>
                  <!-- </template> -->

                
                </tbody>
              </table>
            </div>

            

              <nav aria-label="...">
                <ul class="pagination">
                  <li 
                    :class="isDisabledPrevBtn   == true ? 'page-item disabled' : 'page-item'"
                    @click="clickedPrevBtn()"

                  >
                    <a class="page-link" :href="'#'+this.currentPage" tabindex="-1">Previous</a>
                  </li>
                  <li 
                    v-for="pageNumber in totalPage" :key="pageNumber"
                    :class="pageNumber == currentPage ? 'page-item active': 'page-item'"
                    @click="selectItemToList(pageNumber)"

                  >
                    <a class="page-link" :href="'#'+pageNumber">
                    {{ pageNumber }}</a>
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
  //
  export default {
    name: "App",
    components: {},
    data: () => ({
      // filteredItems: "",
      headers: ["No", "Flags", "Name", "CCA2", "CCA3", "Native name", "Alt name", "IDD"],
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
      filterRow: ["capital"],
      filters: {
        all: "",
        name: "",
        capital: "",
        region: "",
        flag: "",
      },
  
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
      getCountries() {
        this.axios.get("/all").then((res) => {
          this.originItem = res.data;
          this.allCountriesCount = this.originItem.length
          this.totalPage = this.allCountriesCount/this.itemsPerPage;
          this.isDisabledPrevBtn = true

          if (this.allCountriesCount > 1) this.isDisabledNextBtn = false
          else this.isDisabledNextBtn = true;

          this.getPaginationItems(1);

          console.log("items type  flage ", typeof(this.items[0].flags))
          console.log("items type  ", typeof(this.items))
          console.log("items length  ", this.items.slice(0,4).length)
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
        this.items = this.originItem.slice((clickedPageNumber - 1)*this.itemsPerPage, clickedPageNumber*this.itemsPerPage)
      },

      selectItemToList(pageNumber) {
        console.log("current page", this.currentPage)
        console.log("clicked  page", pageNumber)
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
  
      SelectedFilterRowsItem(headerName) {
        console.log("click filter dropdown")
        if (this.filterRow.indexOf(headerName) != -1) {
          this.filterRow.splice(this.filterRow.indexOf(headerName), 1);
          this.filters[headerName] = '';
        } else {
          this.filterRow.push(headerName);
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
      // filteredItems() {
      //   if (this.loading) return this.emptyItem;
      // },
      // filteredItems() {
      //   if (this.loading) return this.emptyItem;
  
      //   let filterByColumn = true;
      //   let filtered = [{}];
  
      //   if (this.filters.all != "") filterByColumn = false;
  
      //   function getObjectValuesWithFilter(item, filterCriteria) {
      //     let trueCount = 0;
      //     if (typeof item == "object") {
      //       Object.values(item).some((key) => {
      //         if (typeof key != "object") {
      //           if (String(key).toLowerCase().includes(filterCriteria))
      //             trueCount++;
      //         } else {
      //           trueCount += getObjectValuesWithFilter(key, filterCriteria);
      //         }
      //       });
      //     } else {
      //       if (String(item).toLowerCase().includes(filterCriteria)) trueCount++;
      //     }
      //     return trueCount;
      //   }
  
      //   if (filterByColumn) {
      //     filtered = this.items.filter((item) => {
      //       return Object.keys(this.filters).every((key) =>
      //         String(item[key])
      //           .toLowerCase()
      //           .includes(this.filters[key].toLowerCase())
      //       );
      //     });
      //   } else {
      //     filtered = [{}];
  
      //     filtered = this.items.filter((item) => {
      //       return Object.values(item).some((key) => {
      //         let trueCount = 0;
      //         trueCount += getObjectValuesWithFilter(
      //           key,
      //           this.filters.all.toLowerCase()
      //         );
  
      //         return trueCount > 0 ? true : false;
      //       });
      //     });
      //   }
  
      //   return filtered.length > 0 ? filtered : this.emptyItem;
      // },
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