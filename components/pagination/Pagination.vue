<template>
  <div>
<b-row>
    <b-col>
 <div  class="float-left">
<div class="btn-group">
  <b-button type="button"  v-if="tpNumber >= 2" class="btn btn-dark" size="sm" v-on:click="tpNumber = tpNumber - 1,sortingOrders()" style="height:26px !important"><a style="position:relative; top:-5px;">◄</a></b-button>
<input v-model="tpNumber" type="text" :placeholder="String(tpNumber)" class="input-border"  />
  <button v-if="tpNumber < totalPages"  type="button" class="btn btn-dark"  v-on:click="tpNumber = Number(tpNumber) + 1,sortingOrders()" style="height:26px !important"><a style="position:relative; top:-5px;">►</a></button>
  <b-button type="button" style="height: 26px; position:relative; left: 10px;"  class="btn btn-dark" size="sm" v-on:click="tpNumber = Number(tpNumber),sortingOrders()"><fa icon="fast-forward"/></b-button>

</div>
    <div style="position:relative;right:-30px;" class="float-right table-labels">
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

    }
  },
methods:{
          sortingOrders(){
              var that = this;
              var source = this.pageExchange
              if (!Number.isInteger(that.tpNumber)) {
                  return
              }
                    let endPoint = "getorders"+ '?exchange='+ source +'&page=' + that.tpNumber + '&table=trade' + '&sortby=' + this.sortByB + '&direction='+ this.directionB +'&currency='+this.currency;
                    that.$insightfetch(endPoint, 'POST').then(function(jsonResponse){
                    if (jsonResponse.result == "success") {
                    that.totalPages = jsonResponse.totalpages;
                    that.$nuxt.$emit('tradeDataChange', jsonResponse);
                    that.$nuxt.$emit('tradeLoaderOff', (false))
                    return jsonResponse;
          }

      })
      }
},
mounted(){
        this.sortingOrders()

      this.$nuxt.$on("tradeHistoryExchange", (data) => {
      this.pageExchange = data;
      this.sortingOrders();
    }),
      this.$nuxt.$on('searchByCoinTrade', (coin)=>{
        this.currency = coin
        this.sortingOrders()
  })
},
created() {
        var that = this;
        this.$nuxt.$on("sortTrades", (data) => {
        this.directionB = data.direction
        this.sortByB = data.sortby
        this.sortingOrders()
      })
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-border{
border-color: #332d2d;
height: 26px;
width: 45px;
}
</style>
