<template>
<div>
  <div class="bg" style="overflow-x:hidden overflow-y:scroll; z-index:100;">
    <div class="table-wrap">
      <b-table small striped hover :fields="fields"  :filter="searchFilter" :items="items"  v-on:row-clicked="rowClicked" caption-top class="my-table-scroll9">
   <template slot="HEAD_Value" slot-scope="item">
  <!-- A custom formatted header cell for field 'name' -->
 <div class="dropdown">
    <button class="dropbtn nowrap table-labels">Value ({{currency}}) ▼</button>
     <div style="font-size: 12px;" class="dropdown-content">
    <a v-on:click="filterTable('USD')">USD</a>
    <a v-on:click="filterTable('BTC')">BTC</a>
    </div>
   </div> 
 </template>
   <template slot="HEAD_Price" slot-scope="item">
  <!-- A custom formatted header cell for field 'name' -->
 <div class="dropdown">
    <button class="dropbtn nowrap table-labels">Price ({{currency}}) ▼</button>
     <div style="font-size: 12px;" class="dropdown-content">
    <a v-on:click="filterTable('USD')">USD</a>
    <a v-on:click="filterTable('BTC')">BTC</a>
    </div>
   </div> 
 </template>
<template slot="HEAD_Balance" slot-scope="item">
  <!-- A custom formatted header cell for field 'name' -->
<div class="table-labels">
  Balance
</div>
 </template>

<template slot="HEAD_Nickname" slot-scope="item">
  <!-- A custom formatted header cell for field 'name' -->
<div class="table-labels">
  Nickname
</div>
 </template>

<template slot="HEAD_Symbol" slot-scope="item">
  <!-- A custom formatted header cell for field 'name' -->
<div class="table-labels">
  Symbol
</div>
 </template>
<template slot="Balance" slot-scope="item">
  <!-- A custom formatted header cell for field 'name' -->
<div class="tabletext">
  {{item.value}}
</div>
 </template>

<template slot="Nickname" slot-scope="item">
  <!-- A custom formatted header cell for field 'name' -->
<div class="tabletext">
  {{item.value}}
</div>
 </template>
<template slot="Value" slot-scope="item">
  <!-- A custom formatted header cell for field 'name' -->
<div class="tabletext">
  {{item.value}}
</div>
 </template>
 <template slot="Price" slot-scope="item">
  <!-- A custom formatted header cell for field 'name' -->
<div class="tabletext">
  {{item.value}}
</div>
 </template>
<template slot="Symbol" slot-scope="item">
  <!-- A custom formatted header cell for field 'name' -->
<div class="tabletext">
         <div class="nowrap" style="float:left;position:relative;left:40px;">
     <span><img :src="$emblem(item.item.Symbol)" class="watchlist-icons" onerror="this.src='/cryptocurrency-icons/svg/black/other.svg'" width="25px" /></span>
     </div>
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
  name: 'CoinsWalletTable',
  data () {
    return  {
      currency: '',
      items: [],
      searchItems: this.searchFilter,
      //wallets: this.addresses,
      fields: [
              { key: 'Symbol', 
                label:"Symbol",
                sortable:  true
              },
                { key: 'Nickname', 
                label:"Nickname",
                sortable:  true
              },
              { key: 'Balance', 
                label:"Balance",
                sortable:  true
              },
              { key: 'Value', 
                label:"Value",
                sortable:  true
              },
              { key: 'Price', 
                label:"Price",
                sortable:  true
              },
              ],
    }
  },
  props: ['addresses', 'searchFilter'],
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
          wallets: state => state.coins.walletAddresses,
          globalPriceKeyForceRender: state => state.portKeyForceRender
      }),
  },
  mounted(){
  this.$nuxt.$on("overviewCoins", (val) => { 
  this.items = [];
  this.getTable();
     })
  this.$nuxt.$on("clearWallet", (val) => {
  var that = this; 
  this.items = [];
  this.getTable();
  for (var elem in that.wallets){
    if (val == that.wallets[elem].Symbol){
    that.rowClicked(that.items[elem], 'clear');
    }
  }
  })
  this.getTable();
  },
   methods:{
    getTable(){
    this.currency = 'USD';
    for (var elem in this.wallets){
    this.items.push({
    'Address': this.wallets[elem].Address,
    '_rowVariant': "dark2",
    'Balance': Number.parseFloat(this.wallets[elem].Balance), 
    'Nickname': this.wallets[elem].Nickname,
    'Symbol' : this.wallets[elem].Symbol,
     'Value' : this.checkZero(Number.parseFloat(this.wallets[elem].Value.USD), 'usd'), 
      'Price' : this.checkZero(Number.parseFloat(this.wallets[elem].Price.USD), 'usd'), 
      });
    }
     },
    refreshTable(){
    this.items = []
    for (var elem in this.wallets){
    this.items.push({
    'Address': this.wallets[elem].Address,
    '_rowVariant': "dark2",
    'Balance': Number.parseFloat(this.wallets[elem].Balance), 
    'Nickname': this.wallets[elem].Nickname,
    'Symbol' : this.wallets[elem].Symbol,
     'Value' : this.checkZero(Number.parseFloat(this.wallets[elem].Value.USD), 'usd'), 
      'Price' : this.checkZero(Number.parseFloat(this.wallets[elem].Price.USD), 'usd'), 
      });
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
 rowClicked(item, index) {
     this.$nuxt.$emit('overviewReset', false);
    for (var eachItems in this.wallets) {
    this.items[eachItems]._rowVariant = "dark2";
    }
    item._rowVariant = 'dark3';
    this.$nuxt.$emit('walletClick', item);
  },
filterTable(val){
  if (val === 'USD'){
    this.items = [];
      for (var elem in this.wallets){
      this.items.push({
      'Address': this.wallets[elem].Address,
      'Balance': Number(this.wallets[elem].Balance).toFixed(4),
      'Nickname': this.wallets[elem].Nickname,
      'Symbol' : this.wallets[elem].Symbol,
      'Value' : this.checkZero(Number(this.wallets[elem].Value.USD), 'usd'),
      'Price' : this.checkZero(Number(this.wallets[elem].Price.USD), 'usd'),
      '_rowVariant': "dark2" });
     }
  } 
  else if(val === 'BTC') {
        this.items = [];
      this.currency = 'BTC'
      for (var elem in this.wallets){
      this.items.push({
        'Address': this.wallets[elem].Address,
        'Balance': Number(this.wallets[elem].Balance).toFixed(4),
        'Nickname': this.wallets[elem].Nickname,
        'Symbol' : this.wallets[elem].Symbol,
        'Value' : this.checkZero(Number(this.wallets[elem].Value.BTC), 'btc'),
        'Price' : this.checkZero(Number(this.wallets[elem].Price.BTC), 'btc'),
        '_rowVariant': "dark2" });
            }
          }
        }
      }
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
  outline-style: none;
}
* {
    outline-style: none
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
.table-wrap {
  margin-top:45px;
}
</style>
