<template>
<div id="tickerSpaceExchange">
  <div class="bg" style="overflow-x:hidden overflow-y:scroll; margin-top: 6px; white-space: nowrap;">
    <div>
      <b-table small striped hover :fields="fields" :items="exchangeDataTmp"  @sort-changed="sortingChanged" class="tabletext my-table-scrollExchange">
 <template slot="HEAD_Exchange" slot-scope="item">
                    <!-- A custom formatted header cell for field 'name' -->
<div class="table-labels">
  Exchange
</div>
                </template>

<template slot="HEAD_Currencies" slot-scope="item">
  <!-- A custom formatted header cell for field 'name' -->
<div class="table-labels">
  # Currencies
</div>
 </template>

<template slot="HEAD_ValueBTC" slot-scope="item">
  <!-- A custom formatted header cell for field 'name' -->
<div class="table-labels">
  Value BTC
</div>
 </template>

<template slot="HEAD_ValueUSD" slot-scope="item">
  <!-- A custom formatted header cell for field 'name' -->
<div class="table-labels">
  Value {{currentFiat}}
</div>
 </template>

<template slot="HEAD_Allocation" slot-scope="item">
  <!-- A custom formatted header cell for field 'name' -->
<div class="table-labels float-left">
 Allocation
</div>
 </template>

<template slot="Exchange" slot-scope="item" >
      <div class="exchangeEmblem" style="position: relative;top:10px;">
        {{item.item.Exchange}}
      </div>
       </template>
<template slot="Allocation" slot-scope="item">
           <div class="wrapper float-left">
             <span v-if="item.item.Allocation != 100" class="alloPercent">{{item.item.Allocation}}%</span>
             <span v-else class="alloPercent">{{item.item.Allocation}}</span>
          <exchange-allocation-display class="float-right donut-percent" :rowIndex="item.item.row_idx" :desc="item.item.desc" :asc="item.item.asc" :percent="{'percent': item.item.Allocation, 'otherPercent':100 - item.item.Allocation}" />
           </div>
        </template>

<template slot="Currencies" slot-scope="item">
  <!-- A custom formatted header cell for field 'name' -->
<div class="tabletext br">
  {{item.value}}
</div>
 </template>

<template slot="ValueBTC" slot-scope="item">
  <!-- A custom formatted header cell for field 'name' -->
<div class="tabletext br">
  {{item.value}}
</div>
 </template>

<template slot="ValueUSD" slot-scope="item">
  <!-- A custom formatted header cell for field 'name' -->
<div class="tabletext br">
  {{item.value}}
</div>
 </template>


      </b-table>
  </div>
    </div>
</div>
</template>

<script>
/* eslint-disable */

import ExchangeAllocationDisplay from "~/components/exchangeCurrencyTable/ExchangeAllocationDisplay"

export default {
  props: ['exchangesTable', 'defaultFiat'],
  name: 'TradingChart',
    methods: {
      descNumber(count, originalOrder){
        var tmpIndex = originalOrder.sort(function(a,b){return b-a})
        return tmpIndex[count]
      },
      ascNumber(count, originalOrder) {
        var tmpIndex = originalOrder.sort(function(a,b){return a-b})
        return tmpIndex[count]
      },
    getExchange() {
      var count = 0
      var originalOrder = []
      var that = this;
      for (var items in this.exchangesData){
        originalOrder.push(this.exchangesData[items].Allocation)
      }
       for (var items in this.exchangesData) {
         if (this.exchangesData[items].exchange != 'wallets') {
         this.exchangeDataTmp.push({
        'logo': that.exchangesData[items].logoURL,  
        'Exchange': that.exchangesData[items].exchange, 
        'Currencies': that.exchangesData[items].totalCurrencies, 
        'ValueBTC': Number(that.exchangesData[items].BTCValue).toLocaleString('en'),
         'ValueUSD':  Number(this.exchangesData[items][this.currentFiat+'Value']).toLocaleString('en'), 
         'Allocation': that.exchangesData[items].Allocation, 
         'Rest': 100 - that.exchangesData[items].Allocation, 
          _rowVariant: "dark2", 
          'row_idx': count,
        'desc': that.descNumber(count, originalOrder), 
        'asc': that.ascNumber(count, originalOrder)
         })
        count += 1
       }
      }
    },
   sortingChanged (ctx) {
    // ctx.sortBy   ==> Field key for sorting by (or null for no sorting)
    // ctx.sortDesc ==> true if sorting descending, false otherwise
    this.$nuxt.$emit('sortedAllocation', (ctx.sortDesc));
  }
  },
  data () {
    return  {
            currentFiat: null,
            exchangesData: this.exchangesTable,
            exchangeDataTmp:[],

            fields: [
              { key: 'Exchange', 
                label:"Exchange",
              },
              {
                key:'Currencies',
                label:"# Currencies",

              },
              {
                key:"ValueBTC",
                label:"Value BTC",
              },
              {
                key:"ValueUSD",
                label: 'Value '+this.defaultFiat,
              },
              {
                key: "Allocation",
                label: "Allocation",
              },
              ],
    }
  },
  components:{
    ExchangeAllocationDisplay
  },
   mounted (){
     this.currentFiat = this.defaultFiat
      this.getExchange();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alloPercent{
  position: relative;
  z-index: 6;
  font-size: 12px;
  top:12px;
  right: -30px;
}
[v-cloak] > * { display:none }
[v-cloak]::before { content: "loading…" }

.table-dark2:nth-child(odd){
  background-color: rgb(10, 10, 10) !important;
  border: 3px solid rgba(54, 53, 53, 0.815);
  border-right: black;
  border-left: black;
}
.table-dark2:nth-child(even){
  background-color: rgb(0, 0, 0) !important;
  border: 3px solid rgba(54, 53, 53, 0.815);
  border-right: black;
  border-left: black;
}
.table-wrap
{
    height:198px;
    width:100%;
    position: relative;
    overflow: scroll; 
    overflow-x: hidden; 
}
.bg{
  background-color: black;
}
.white{
  color: white;
}
.green{
  color: green;
}
.red{
  color: rgb(0, 17, 255);
}
.square {
  height: 22px;
  width: 7px;
  position:relative;
}
.gray{
  background-color:rgb(32, 32, 32);
}
.search{
  width: 100px;
  border: 2px solid rgb(204, 204, 204);
  background: transparent;
  border-radius: 25px;
  height: 30px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-weight: bold;
  outline-style: none
}
* {
    outline-style: none
}
.borderblack{
  background: black;
  position: relative; 
  margin-top:52px;
  z-index:5;
}
.square2 {
  height: 10px;
  width: 1000px;
  position:relative;
  background: rgb(0, 0, 0);
  top:1px;
  z-index: 5;
}
/* width */
::-webkit-scrollbar {
    width: 7px;
    border-radius: 25px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #1f1d1d; 
        border-radius: 25px;

}
 
/* Handle */
::-webkit-scrollbar-thumb {
    background: rgb(78, 73, 73); 
        border-radius: 25px;

}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: rgb(0, 0, 0); 
}
.binance{
height:100px;
width:100px;
position: relative;
top:-30px;
margin-bottom: -60px;
}
.coinbase{
height:100px;
width:100px;
position: relative;
top:-30px;
margin-bottom: -60px;
}
.bittrex{
height:40px;
width:100px;
}
.cryptopia{
height:40px;
width:80px;
}
.wrapper {
    margin-left:-20px;
    margin-right:auto;
    width:100px; 
}
.donut-percent{
  position: relative;
  z-index: 5;
  margin-top: 3px;
  right: 20px;  
}
.br{
  margin-top:15px;
}
</style>
