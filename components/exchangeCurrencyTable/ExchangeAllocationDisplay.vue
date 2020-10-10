<template>
  <div>
<ExchangeAllocationDoughnut :desc=desc :asc=asc :row_index=rowIndex class="space" :width="50" :height="50" :percent=percent></ExchangeAllocationDoughnut>
  </div>
</template>

<script>
import ExchangeAllocationDoughnut from "~/components/exchangeCurrencyTable/ExchangeAllocationDoughnut"

export default {
  props: ['percent', 'rowIndex', 'asc', 'desc'],
  name: 'ExchangeAllocationDisplay',
  data () {
    return {
       stuff: null
    }
  },
  components:{
      ExchangeAllocationDoughnut
  },
     created(){
     this.$nuxt.$on('sortedAllocation', (data)=>{
        this.$nuxt.$emit('sortedAllocation2', (data))
     });
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#number {
    font-family: 'Roboto', sans-serif;
}
.space{
  position: relative;
  top: -10px;
  margin-bottom: -10px;
}
</style>
