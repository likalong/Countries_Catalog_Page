<template>
  <n-modal v-model:show="isShowModal" block-scroll="false"> 
    <n-card
      style="width: 700px;"
      :title="countryInfo != null ? countryInfo.name.common + ', (' +countryInfo.name.official  + ')': 'Country Detail'"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <n-button @click='$emit("updateShowDetailModal", false)'>
        X
        </n-button>
      </template>

      <!-- modal content -->
      <template v-if="propIsLoading">
        <div class="text-center text-info my-2 full-sreen" >
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <span style="padding-left: 1rem;">Fetching a country detail...</span>
        </div>
      </template>

      <template v-else>

        
        <n-space vertical size="large" v-if="countryInfo != null">
          <!-- header info -->
          <div class="row">
            <div class="col-4">

              <div class="p-3" >
                <img :src="countryInfo.flags ? countryInfo.flags.png: countryInfo.item.flags.png" class="FlagClass img-fluid mx-auto d-block">
              </div>

            </div>

            <div class="col-8 d-flex flex-column justify-content-around">
                <div class="col-12">
                  <span style="font-weight: 700;" type="info"> {{ countryInfo.independent ? 'Independent': 'Dependent' }} </span> 
                  <span class="ps-3" style="font-weight: 700;">Timezones: </span> {{ countryInfo.timezones[0] }}
                </div>

                <div class="col-12">
                  <span  style="font-weight: 700;" type="info">Capital: </span>
                  {{countryInfo.capital ? countryInfo.capital[0]: N/A}}

                  <span class="ps-3" style="font-weight: 700;">Capital Lat-Lng: </span> {{ countryInfo.capitalInfo.latlng }}

                </div>

                <div class="col-12">
                  <span  style="font-weight: 700;" type="info">Population: </span>
                  {{countryInfo.population ? countryInfo.population: N/A}}

                  <span class="ps-3" style="font-weight: 700;">Area: </span> {{ countryInfo.area }}

                </div>

            </div>
          </div>
          <!-- end header info -->

          <!-- <template> -->
            <n-card title="Detail Information" class="overflow-scroll">
              <n-layout>
                <!-- <n-layout-header>Currency</n-layout-header> -->
                <n-layout has-sider>
                  <n-layout-sider content-style="padding: 24px;" class="fw-semibold">
                    Currency
                  </n-layout-sider>
                  <n-layout-content content-style="padding: 24px;">
                    <ul
                      class="list-unstyled float-start d-flex flex-column"
                    >
                      <li 
                        class="justify-content-start col-12"
                        v-for="(currency, key) in countryInfo.currencies" :key="currency">
                        <div class="row">
                          <div class="col-8">
                            <span class="fw-semibold">{{ key }}:</span> {{ currency.name }}
                          </div>
                          <div class="col-4">
                            <span class="fw-semibold">symbol: </span> {{ currency.symbol }}
                          </div>
                        
                        
                        </div>

                        
                      </li>
                    </ul>
                  </n-layout-content>
                </n-layout>
              </n-layout>

              <n-layout>
                <n-layout has-sider>
                  <n-layout-sider content-style="padding: 24px;">
                    CCA2: {{ countryInfo.cca2 }}
                  </n-layout-sider>

                  <n-layout-content content-style="padding: 24px;">
                    CCN3: {{ countryInfo.ccn3 }}
                  </n-layout-content>

                  <n-layout-content content-style="padding: 24px;">
                    CCA3: {{ countryInfo.cca3 }}
                  </n-layout-content>
                </n-layout>
              </n-layout>



              <n-layout>
                <n-layout has-sider>
                  <n-layout-sider content-style="padding: 24px;">
                    Language:
                  </n-layout-sider>

                  <n-layout-content content-style="padding: 24px;">
                    <ul
                      class="list-unstyled float-start d-flex flex-row"
                    >
                      <li 
                        v-for="(lang) in countryInfo.languages" :key="lang">
                        <span class="fw-semibold">{{ lang }}, </span>
                      </li>
                    </ul>
                  </n-layout-content>
                </n-layout>
              </n-layout>


              <n-layout>
                <n-layout has-sider>
                  <n-layout-sider content-style="padding: 24px;">
                    Idd (Calling Code):
                  </n-layout-sider>

                  <n-layout-content content-style="padding: 24px;">
                    <ul
                      class="list-unstyled float-start d-flex flex-row justify-content-center"
                    > 
                    <li style="padding-right: 24px;" class="d-flex flex-row">
                      <span class="fw-semibold">root: </span> <span>{{ countryInfo.idd.root }}</span>
                    </li>
                    <span class="fw-semibold">suffixes:  </span> 
                      <li 
                        class="d-flex flex-row"
                        v-for="(suff) in countryInfo.idd.suffixes" :key="suff">
                        <span>{{ suff }}, </span>
                      </li>
                    </ul>
                  </n-layout-content>
                </n-layout>
              </n-layout>


              <n-layout>
                <n-layout has-sider>
                  <n-layout-sider content-style="padding: 24px;">
                    Region:
                  </n-layout-sider>

                  <n-layout-content content-style="padding: 24px;">
                    {{ countryInfo.region }}
                  </n-layout-content>
                </n-layout>
              </n-layout>


              <n-layout>
                <n-layout has-sider>
                  <n-layout-sider content-style="padding: 24px;">
                    SubRegion:
                  </n-layout-sider>

                  <n-layout-content content-style="padding: 24px;">
                    {{ countryInfo.subregion }}
                  </n-layout-content>
                </n-layout>
              </n-layout>
              
              <n-layout>
                <n-layout has-sider>
                  <n-layout-sider content-style="padding: 24px;">
                    continents:
                  </n-layout-sider>

                  <n-layout-content content-style="padding: 24px;">
                    {{ countryInfo.continents  ? countryInfo.continents[0]: 'N/A' }}
                  </n-layout-content>
                </n-layout>
              </n-layout>

              <n-layout>
                <n-layout has-sider>
                  <n-layout-sider content-style="padding: 24px;">
                    Car:
                  </n-layout-sider>

                  <n-layout-content content-style="padding: 24px;">
                    Side: {{ countryInfo.car  ? countryInfo.car.side: 'N/A' }}
                    <span class="ps-3">
                      Signs: {{ countryInfo.car  ? countryInfo.car.signs[0]: 'N/A' }}

                    </span>
                  </n-layout-content>
                </n-layout>
              </n-layout>
            </n-card>
          <!-- </template> -->

          
          
        </n-space>

      </template>
        

      <template #footer>
        country api: https://restcountries.com/
      </template>
    </n-card>
  </n-modal>
</template>




<script>
import { defineComponent } from 'vue'
import { NButton , NCard, NModal, NSpace, 
  NLayout, 
  // NLayoutHeader, 
  NLayoutContent, 
  // NLayoutFooter, 
  NLayoutSider,
  // NText,
  // NRow,
  // NCol,
} from 'naive-ui'


export default defineComponent({
  name: 'DetailModal',
  components: {
    NButton,
    NCard,
    NModal,
    NSpace,
    NLayout, 
    // NLayoutHeader, 
    NLayoutContent, 
    // NLayoutFooter, 
    NLayoutSider,
    // NText,
    // NRow,
    // NCol,
  },
  props: {
    propShowDetailModal: Boolean,
    propIsLoading: Boolean,
    propCountryInfo: Object,
  },
  computed:{
    isShowModal () {
      // console.log("compute modal child ::::  prop show modal : ", this.propShowDetailModal)
      return this.propShowDetailModal;
    },
    isLoading () {
      return this.propIsLoading;
    },
    countryInfo () {
      // console.log("in child get country info ", this.propCountryInfo)
      if(this.propCountryInfo != null) {
        return this.propCountryInfo
      } else return null;
    }
  },
})
</script>


<style scoped>
.n-layout-header,
.n-layout-footer {
  background: rgba(128, 128, 128, 0.2);
  padding: 24px;
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  background: rgba(128, 128, 128, 0.4);
}
</style>
