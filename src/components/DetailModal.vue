<template>
  <n-modal v-model:show="isShowModal">
    <n-card
      style="width: 600px"
      :title="countryInfo != null ?countryInfo.name.common: 'Country Detail'"
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

      <!-- <template> -->
        <n-space vertical size="large" v-if="countryInfo != null">
          <n-layout has-sider>
            <n-layout-sider content-style="padding: 24px;">
              <img :src="countryInfo.flags ? countryInfo.flags.png: countryInfo.item.flags.png" class="FlagClass img-fluid mx-auto d-block">
            </n-layout-sider>
            <n-layout>
              <n-layout-content><n-text type="info" content-style="font-weigth: 700;">Full name:</n-text> 
                {{ countryInfo.name.official }}
              </n-layout-content>
              <n-layout-content>
                <n-text type="info">Capital: </n-text>
                  {{countryInfo.capital[0]}}
              </n-layout-content>
            </n-layout>
          </n-layout>

          <!-- <template> -->
            <n-card title="Detail Information">
              <n-layout>
                <!-- <n-layout-header>Currency</n-layout-header> -->
                <n-layout has-sider>
                  <n-layout-sider content-style="padding: 24px;" class="fw-semibold">
                    Currency
                  </n-layout-sider>
                  <n-layout-content content-style="padding: 24px;">
                    <ul
                      class="list-unstyled float-start d-flex flex-row"
                    >
                      <li 
                        class="justify-content-start"
                        v-for="(currency, key) in countryInfo.currencies" :key="currency">
                        <span class="fw-semibold">{{ key }}:</span> {{ currency.name }} 
                        <span class="fw-semibold">symbol: </span> {{ currency.symbol }}
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

                  <n-layout-content content-style="padding: 0px;">
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
              
            </n-card>
          <!-- </template> -->

          
          
        </n-space>
      <!-- </template> -->

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
  NText,
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
    NText,
  },
  props: {
    propShowDetailModal: Boolean,
    propCountryInfo: Object,
  },
  computed:{
    isShowModal () {
      // console.log("compute modal child ::::  prop show modal : ", this.propShowDetailModal)
      return this.propShowDetailModal
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
