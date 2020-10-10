<template>
<div>
  <div class="bg" style="overflow-x:hidden overflow-y:scroll;">
    <div class="table-wrap">
      <b-table small striped hover :fields="fields" :filter="searchfilter" :items="finalList"  v-on:row-clicked="rowClicked" caption-top class="my-table-scroll9">
 
 <template slot="HEAD_coins" slot-scope="item">
    <!-- A custom formatted header cell for field 'name' -->
<div class="table-labels">
 Coins
</div> 
 </template>
 <template slot="HEAD_amount" slot-scope="item">
                    <!-- A custom formatted header cell for field 'name' -->
                    <!-- A custom formatted header cell for field 'name' -->
                    <div class="dropdown" @click.stop style="font-size:12px;">
                        <button  class="dropbtn nowrap table-labels" style="font-weight: bold;">{{balOrallo}} ▼</button>
                        <div class="dropdown-content">
                            <a v-on:click="allocation_sort('allocation')">Allocation%</a>
                            <a v-on:click="allocation_sort('balance')">Balance</a>
                        </div>
                    </div>
                </template>
<template slot="HEAD_change" slot-scope="item">
    <!-- A custom formatted header cell for field 'name' -->
    <div class="dropdown" @click.stop style="font-size:12px;">
    <button class="dropbtn nowrap table-labels">{{changeLabel}} ▼</button>
     <div class="dropdown-content">
      <a @click.stop v-on:click="percentIntervalSet('onehourchange','1h')">1h</a>
      <a @click.stop v-on:click="percentIntervalSet('twentyfourchange','24h')">24h</a>
      <a @click.stop v-on:click="percentIntervalSet('sevendaychange', '7d')">7d</a>
    </div>
    </div> 
 </template>
<template slot="HEAD_value" slot-scope="item">
    <!-- A custom formatted header cell for field 'name' -->
    <div class="dropdown" @click.stop style="font-size:12px;">
    <button class="dropbtn nowrap table-labels">Value ({{pick_currency_Value}}) ▼</button>
     <div class="dropdown-content">
    <a v-on:click="filterTable('USD')">USD</a>
    <a v-on:click="filterTable('BTC')">BTC</a>
    </div>
   </div> 
 </template>
<template slot="HEAD_price" slot-scope="item">
    <!-- A custom formatted header cell for field 'name' -->
    <div class="dropdown" @click.stop style="font-size:12px;">
    <button class="dropbtn nowrap table-labels">Price ({{pick_currency_Value}}) ▼</button>
     <div class="dropdown-content">
    <a v-on:click="filterTable('USD')">USD</a>
    <a v-on:click="filterTable('BTC')">BTC</a>
    </div>
   </div> 
 </template>
<template slot="coins" scope="item">
      <div style="float:left;position:relative;left:40px;">
        <img :src="$emblem(item.item.logo)" onerror="this.src='/cryptocurrency-icons/svg/black/other.svg'" width="25px">
    </div>
    <div class="tabletext">
        {{item.item.coins}}
    </div>
    </template>
<template slot="change" scope="item">
  <div class="tabletext">
    <div v-if="item.item.change > 0" class="text-center" style="color:green;">{{item.item.change}}%</div>
    <div v-else class="text-center" style="color:#da1e2d">{{item.item.change}}%</div>
  </div>
    </template>

<template slot="amount" slot-scope="item">
  <!-- A custom formatted header cell for field 'name' -->
<div class="tabletext">
 {{item.value}}
</div>
 </template>

<template slot="value" slot-scope="item">
    <!-- A custom formatted header cell for field 'name' -->
    <div class="tabletext">
      {{item.value}}
   </div> 
 </template>
<template slot="price" slot-scope="item">
    <!-- A custom formatted header cell for field 'name' -->
    <div class="tabletext">
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

import { mapState } from 'vuex'

export default {
  name: 'TradingHistoryChart',
  data () {
    return {
            defaultFiat: "USD",
            behaveData: this.exchangeData,
            globalSort: null,
            balOrallo: 'Balance',
            pick_currency_Value: 'USD',
            finalList: [],
            percentInterval: 'twentyfourchange',
            changeLabel: '24h',
            fields: [
              { key: 'coins',
                label: "Coins",
                sortable: true
              },

              { key: 'amount', 
                label:"Amount",
                sortable: true
              },
              /* {
                key:'costBasis',
                label:"Cost Basis",
                sortable: true
              },*/
              {
                key:"value",
                label: 'Value',
                sortable:  true
              },
              {
                key: "price",
                label: "Price",
                sortable: true
              },
   
                            {
                key: "change",
                label: "% Change",
                sortable: true
              },

              ],
    }
  },
props:['tradeData', 'searchfilter', 'exchangeData'],
  watch: {
      wallets: function() {
          this.refreshTable()
      },
      globalPriceKeyForceRender: function() {
          this.refreshTable()
      }
  },
  computed: {
      ...mapState({
          colorData: state => state.coins.balanceData.global,
          globalPriceKeyForceRender: state => state.portKeyForceRender
      }),
  },
methods: {
  refreshTable(){
      this.finalList = []
          for (var items in colorData){
        count = count + 1;
      if(colorData[items].symbol != null){
        var percentageChange = this.defaultFiat.toLowerCase()+this.percentInterval
      this.finalList.push({
        'allocation' : colorData[items].AllocationPercentage,
        'coinName' : colorData[items].Coin,
        'color' : colorData[items].Color,
        'name' : colorData[items].name,
        'logo': colorData[items].symbol,
        'coins': colorData[items].symbol,
        'costBasis': this.checkZero(Number.parseFloat(colorData[items].costbasis), 'btc'),
        'amount': this.checkZero(Number.parseFloat(colorData[items].Amount), 'usd'),
        'value': this.checkZero(Number.parseFloat(colorData[items].usdvalue), this.pick_currency_Value.toLowerCase()),
        'price':  this.checkZero(Number.parseFloat(colorData[items].usdprice), this.pick_currency_Value.toLowerCase()), 
        'change': Number.parseFloat(colorData[items][percentageChange].toFixed(2)),
        'usdValue':  this.checkZero(Number.parseFloat(colorData[items].usdvalue), this.pick_currency_Value.toLowerCase()),
        'btcValue':  this.checkZero(Number.parseFloat(colorData[items].btcvalue), 'btc'), 
        'twentyfourChange': Number.parseFloat(colorData[items]['usdtwentyfourchange'].toFixed(2)),
        'index': count,
        '_rowVariant': "dark2" });
      }
     }
  },
    checkZero(num, type) {
        if (isNaN(num) || num == 0) {
            return "-"
        }
        let percision = (num < 1  && type != "btc") ?  6 : (type == "btc") ? 8:2;
        let number = num.toLocaleString('en', { maximumFractionDigits: percision, minimumFractionDigits: percision})
        return number
    },
allocation_sort(settings) {
                let that = this;
                this.finalList = [];
                var setting = settings
                if (this.pick_currency_Value == 'BTC'){
                var fiatprice = 'btcprice';
                var fiatvalue = 'btcvalue';
                var percentageChange = this.percentInterval
                }else{
                var fiatprice = this.defaultFiat.toLowerCase()+"price"
                var fiatvalue = this.defaultFiat.toLowerCase()+"value"
                var percentageChange = this.defaultFiat.toLowerCase()+this.percentInterval
                }
                if (setting == 'balance') {
                    setting = 'Amount'
                    that.balOrallo = 'Balance'
                } else {
                    setting = 'AllocationPercentage'
                    that.balOrallo = 'Allocation%'
                }
                for (var items in this.globalSort) {
                    if (items != 'computed') {
                        that.finalList.push({
                    'allocation' : this.globalSort[items].AllocationPercentage,
                    'coinName' : this.globalSort[items].Coin,
                    'color' : this.globalSort[items].Color,
                    'name' : this.globalSort[items].name,
                    'logo': this.globalSort[items].symbol,
                    'coins': this.globalSort[items].symbol,
                    'costBasis': Number.parseFloat(this.globalSort[items].costbasis).toFixed(8),
                    'amount': this.checkZero(Number.parseFloat(this.globalSort[items][setting]), 'usd'),
                    'value': this.checkZero(Number.parseFloat(this.globalSort[items][fiatvalue]), this.pick_currency_Value.toLowerCase()),
                    'price':  this.checkZero(Number.parseFloat(this.globalSort[items][fiatprice]), this.pick_currency_Value.toLowerCase()), 
                    'change': this.globalSort[items][percentageChange].toFixed(2),
                    'usdValue':  this.checkZero(Number.parseFloat(this.globalSort[items].usdvalue), this.pick_currency_Value.toLowerCase()),
                    'btcValue':  this.checkZero(Number.parseFloat(this.globalSort[items].btcvalue), 'btc'), 
                    'twentyfourChange': Number.parseFloat(this.globalSort[items]['twentyfourchange'].toFixed(2)),
                    '_rowVariant': "dark2",
                        })
                    }
                }
                this.temp_list = (this.finalList);
            },
percentIntervalSet(interval, label){
  let that = this;
  let colorData = this.globalSort
  this.temp_list = []
  this.percentInterval = interval
  this.changeLabel = label
  if (that.balOrallo == 'Balance') {
      var setting = 'Amount'
  } else {
      var setting = 'AllocationPercentage'
  }
  if (this.pick_currency_Value == 'BTC'){
  var fiatprice = 'btcprice';
  var fiatvalue = 'btcvalue';
  var percentageChange = this.percentInterval
  }else{
  var fiatprice = this.defaultFiat.toLowerCase()+"price"
  var fiatvalue = this.defaultFiat.toLowerCase()+"value"
  var percentageChange = this.defaultFiat.toLowerCase()+this.percentInterval
  }
    for (var items in colorData){
            if(colorData[items].symbol != null){
      this.temp_list.push({
          'logo': colorData[items].symbol,
          'coins': colorData[items].symbol,
          'costBasis':  this.checkZero(Number.parseFloat(colorData[items].costbasis), 'btc'),
          'amount':  this.checkZero(Number.parseFloat(colorData[items].Amount), 'usd'),
          'value':  this.checkZero(Number.parseFloat(colorData[items][fiatvalue]), this.pick_currency_Value.toLowerCase()),
          'price':  this.checkZero(Number.parseFloat(colorData[items][fiatprice]), this.pick_currency_Value.toLowerCase()),
          'change':  Number.parseFloat(colorData[items][percentageChange]).toFixed(2),
          'usdValue':  this.checkZero(Number.parseFloat(colorData[items].usdvalue), this.pick_currency_Value.toLowerCase()),
          'btcValue':  this.checkZero(Number.parseFloat(colorData[items].btcvalue), 'btc'), 
          'twentyfourChange': Number.parseFloat(colorData[items]['twentyfourchange'].toFixed(2)),
          '_rowVariant': "dark2" });
        }
    }
  this.finalList = this.temp_list
  },
filterTable(val){
  let colorData = this.globalSort
  this.temp_list = []
  if (val === 'USD'){
       this.pick_currency_Value = 'USD'
       var percentageChange = this.defaultFiat.toLowerCase()+this.percentInterval
       for (var items in colorData){
               if(colorData[items].symbol != null){
          this.temp_list.push({
              'logo': colorData[items].symbol,
              'coins': colorData[items].symbol,
              'costBasis':  this.checkZero(Number.parseFloat(colorData[items].costbasis), 'btc'),
              'amount':  this.checkZero(Number.parseFloat(colorData[items].Amount), 'usd'),
              'value':  this.checkZero(Number.parseFloat(colorData[items].usdvalue), this.pick_currency_Value.toLowerCase()),
              'price':  this.checkZero(Number.parseFloat(colorData[items].usdprice), this.pick_currency_Value.toLowerCase()),
              'change':  Number.parseFloat(colorData[items][percentageChange]).toFixed(2),
              'usdValue':  this.checkZero(Number.parseFloat(colorData[items].usdvalue), this.pick_currency_Value.toLowerCase()),
              'btcValue':  this.checkZero(Number.parseFloat(colorData[items].btcvalue), 'btc'), 
              'twentyfourChange': Number.parseFloat(colorData[items]['twentyfourchange'].toFixed(2)),
              '_rowVariant': "dark2" });
            }
       }
     this.finalList = this.temp_list
  }else{
      this.pick_currency_Value = 'BTC'
      this.temp_list = []
      var percentageChange = this.percentInterval
      let count = 0;
      for (var items in colorData){
      count = count + 1;
      if(colorData[items].symbol != null){
      this.temp_list.push({
          'logo': colorData[items].symbol,
          'coins': colorData[items].symbol,
          'costBasis':  this.checkZero(Number.parseFloat(colorData[items].costbasis), 'btc'),
          'amount':  this.checkZero(Number.parseFloat(colorData[items].Amount), 'usd'),
          'value':  this.checkZero(Number.parseFloat(colorData[items].btcvalue), this.pick_currency_Value.toLowerCase()),
          'price':  this.checkZero(Number.parseFloat(colorData[items].btcprice), this.pick_currency_Value.toLowerCase()),
          'change':  Number.parseFloat(colorData[items][percentageChange].toFixed(2)),
          'usdValue':  this.checkZero(Number.parseFloat(colorData[items].usdvalue), this.pick_currency_Value.toLowerCase()),
          'btcValue':  this.checkZero(Number.parseFloat(colorData[items].btcvalue), 'btc'), 
          'twentyfourChange': Number.parseFloat(colorData[items]['twentyfourchange'].toFixed(2)),
          'index': count,
          '_rowVariant': "dark2" });
     }
    }
     this.finalList = this.temp_list
  }
},
onLoadClick(){
var that = this;
that.rowClicked(that.finalList[0], 'clear')
 },
 rowClicked(item, index) {
try {
  if (item){
    this.$nuxt.$emit("updateRadial", item)
    this.$nuxt.$emit("updateExchangeAndWallet", item.coins)
    this.$nuxt.$emit('overviewReset', false);
    this.$nuxt.$emit('tableToDonut', item, index);
    for (var eachItems in this.finalList) {
    this.finalList[eachItems]._rowVariant = "dark2";
    }
    item._rowVariant = 'dark3';
    this.$nuxt.$emit('coinsBanner', item, this.behaveData);
    this.$nuxt.$emit('resortRecentExchange', item);
    if (index != 'none'){
      this.$nuxt.$emit('clearWallet', item.coins);
    }
    this.$nuxt.$emit('sliceUpdate', String(index));
  }
}
catch(error) {
  console.error(error);
}

  }
  },
updated(){
this.onLoadClick();
let data = [];
for(let elem in this.finalList){
 let index = {
    'longName': this.finalList[elem].coinName,
    'coins': this.finalList[elem].coins,
    'index': this.finalList[elem].index
  }
data.push(index);
}
this.$nuxt.$emit('indexList', data);
},
mounted() {
   let that = this;
   this.$nuxt.$on("allocationUpdate", (value) => {
   for (let elem in that.finalList){
     if (that.finalList[elem].coins == value.symbol){
     let index = that.finalList[elem].coins.indexOf(value.symbol);
     that.rowClicked(this.finalList[index], index);
    }
   }
})
   this.$nuxt.$on("colorTableUpdate", (value) => {
     this.rowClicked(this.finalList[value], value);
})
   this.$nuxt.$on("colorTableUpdateAssets", (index) => {
    this.rowClicked(this.finalList[index], index);
})
      this.$nuxt.$on("overviewCoins", (val) => { 
       if (val == true){
       this.allocation_sort('balance')
       this.$nuxt.$emit('coinsBanner', this.finalList[0]);
       }
     })
     this.$nuxt.$on("walletClick", (val) => { 
     var that = this;
     for (var eachItems in this.finalList) {
     that.finalList[eachItems]._rowVariant = "dark2";
     if (that.finalList[eachItems].coins == val.Symbol) {
      that.rowClicked(that.finalList[eachItems], 'none');
     }
    }
    //item._rowVariant = 'dark3';
     })
    this.$nuxt.$on("colorLogo", (colorData) => {
      this.globalSort = colorData;
      let count = 0;
      for (var items in colorData){
        count = count + 1;
      if(colorData[items].symbol != null){
        var percentageChange = this.defaultFiat.toLowerCase()+this.percentInterval
      this.finalList.push({
        'allocation' : colorData[items].AllocationPercentage,
        'coinName' : colorData[items].Coin,
        'color' : colorData[items].Color,
        'name' : colorData[items].name,
        'logo': colorData[items].symbol,
        'coins': colorData[items].symbol,
        'costBasis': this.checkZero(Number.parseFloat(colorData[items].costbasis), 'btc'),
        'amount': this.checkZero(Number.parseFloat(colorData[items].Amount), 'usd'),
        'value': this.checkZero(Number.parseFloat(colorData[items].usdvalue), this.pick_currency_Value.toLowerCase()),
        'price':  this.checkZero(Number.parseFloat(colorData[items].usdprice), this.pick_currency_Value.toLowerCase()), 
        'change': Number.parseFloat(colorData[items][percentageChange].toFixed(2)),
        'usdValue':  this.checkZero(Number.parseFloat(colorData[items].usdvalue), this.pick_currency_Value.toLowerCase()),
        'btcValue':  this.checkZero(Number.parseFloat(colorData[items].btcvalue), 'btc'), 
        'twentyfourChange': Number.parseFloat(colorData[items]['usdtwentyfourchange'].toFixed(2)),
        'index': count,
        '_rowVariant': "dark2" });
      }
     }
     this.$nuxt.$emit('coinsBanner', this.finalList[0]);
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
    width:100%;
    position: relative;
    overflow: hidden; 
    margin-top: 40px;
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

</style>
