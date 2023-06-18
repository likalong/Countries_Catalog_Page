<template>
  <div id="dashboard">
    <div class="card-title" style="font-size: 2rem; font-weight: bold;">
      Dashboard
    </div>
    <button @click="increment">Count is: {{ count }}</button>

    <div class="p-6 max-w-xs mx-auto bg-white rounded-xl shadow-lg flex items-center justify-evenly space-x-4">
      <div class="shrink-0">
        <img class="h-12 w-12" src="@/assets/logo.png" alt="ChitChat Logo">
      </div>
      <div class="text-center">
        <div class="text-xl font-medium text-black">Country Name</div>
        <p class="text-slate-500">Capital name</p>
        <button 
          class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 
            hover:text-white hover:bg-purple-600 hover:border-transparent
            focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
          See more
        </button>
      </div>
      
    </div>

  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>


<script>

  export default {
    name: "DashboardPage",
    // components: {},
    data: () => ({}),
    created() {},
    methods: {},
    computed: {},
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

  