<template>
<div style="margin-bottom:-10px;">
<b-row>
<b-col cols="12">
 <div  class="float-left">
<div class="btn-group">
<b-button type="button"  v-if="tpNumber >= 2" class="btn-dark" size="sm" v-on:click="tpNumber = tpNumber - 1,sortingOrders()">◄</b-button>
<input v-model="tpNumber" type="text" :placeholder="String(tpNumber)" style="width: 17%; border:none;" />
<b-button v-if="tpNumber < totalPages"  type="button" class="btn btn-dark" size="sm"  v-on:click="tpNumber = Number(tpNumber) + 1,sortingOrders()">►</b-button>
<b-button type="button"  class="btn btn-dark" size="sm" v-on:click="tpNumber = Number(tpNumber),sortingOrders()"><fa icon="fast-forward" /></b-button>
</div>
<div class="float-right" style="position:relative; top:5px; left: 10%;">
<label>Page {{tpNumber}} of {{totalPages}}</label>
    </div>
  </div>
    </b-col>
</b-row>
  </div>
</template>

<script>


export default {
  name: 'TradingChart',
  data () {
    return {
      pageExchange: 'all',
      tpNumber: 1,
      totalRows: 50,
      totalPages: null,
      endpoint: this.$store.state.apiEndPoint,
      directionB: null,
      sortByB: null,
      currency: null,
      searchPage: null,
    }
  },
methods:{
    toggleLoadingModal(value) {
    this.$store.commit('modals/toggleLoadingModal', value);
    },
      sortingOrders(){
          var that = this;
          var source = this.pageExchange
          var token = sessionStorage.getItem('token')
          var url = this.endpoint + 'getorders'
          if (!Number.isInteger(that.tpNumber)) {
              return
          }
          var header =  {          
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Basic '+btoa(token+':unused')}
          fetch(url +'?exchange='+ source +'&page=' + that.tpNumber + '&table=transaction' + '&sortby=' + this.sortByB + '&direction='+this.directionB +'&currency='+this.currency, {
              method: "POST",
              credentials: 'same-origin',
              headers: header,
              mode: 'cors'
              }).then(function (response) {
              return response.json();
              }).then(function (jsonResponse) {
                if (jsonResponse.result == "success") {
                        that.totalPages = jsonResponse.totalpages;
                        that.$nuxt.$emit('TransactionsSortResponse', jsonResponse.editedorders);
                        that.$nuxt.$emit('transactionLoaderOff', (false))
                        that.searchPage = null;
                        that.toggleLoadingModal('off')
                        return jsonResponse;
        }
      })
      }
},
mounted(){
    this.sortingOrders()
     
},
created() {
      this.$nuxt.$on("sortDelete", (data) => {
      this.sortingOrders()
    })
      this.$nuxt.$on("changeSource", (source) => {
      this.pageExchange = source;
      this.sortingOrders()
    })
      this.$nuxt.$on("sortTransactions", (data) => {
        this.directionB = data.direction
        this.sortByB = data.sortby
        this.sortingOrders()
      }),
 this.$nuxt.$on('searchResetPage', (val)=>{
        this.tpNumber = 1;
  })
      this.$nuxt.$on('searchByCoinTransaction', (coin)=>{
        this.currency = coin
        this.sortingOrders()
  })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>