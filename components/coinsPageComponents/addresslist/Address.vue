<template>
  <div class="bg">
        <!--<div class="hide-head"></div>-->
    <div>
     <div style="position: relative; top: 5px;  margin-top: -6px; white-space: nowrap;"> 
       <b-table v-if="walletData" small striped hover :fields="fields" :items="walletData" class="tabletext my-table-scroll10">

        <template slot="HEAD_Nickname" slot-scope="item">
              <!-- A custom formatted header cell for field 'name' -->
            <div class="table-labels">
              Nickname
            </div>
        </template>

        <template slot="HEAD_Address" slot-scope="item">
            <!-- A custom formatted header cell for field 'name' -->
            <div class="table-labels">
              Address
            </div>
        </template>

        <template slot="HEAD_Balance" slot-scope="item">
              <!-- A custom formatted header cell for field 'name' -->
            <div class="table-labels">
              Balance
            </div>
        </template>
        <template slot="HEAD_Value" slot-scope="item">
              <!-- A custom formatted header cell for field 'name' -->
                    <div class="dropdown" @click.stop>
                        <button class="dropbtn nowrap table-labels" style="font-weight: bold;">Value ({{valueCounter}}) ▼</button>
                        <div class="dropdown-content">
                            <a v-on:click="value_sort('USD')">USD</a>
                            <a v-on:click="value_sort('BTC')">BTC</a>
                        </div>
                    </div>
        </template>

        <template slot="HEAD_Price" slot-scope="item">
              <!-- A custom formatted header cell for field 'name' -->
                    <div class="dropdown" @click.stop>
                        <button class="dropbtn nowrap table-labels" style="font-weight: bold;">Price ({{priceCounter}}) ▼</button>
                        <div class="dropdown-content">
                            <a v-on:click="price_sort('USD')">USD</a>
                            <a v-on:click="price_sort('BTC')">BTC</a>
                        </div>
                    </div>
        </template>

        <template slot="Nickname" slot-scope="item">
              <!-- A custom formatted header cell for field 'name' -->
            <div class="tabletext">
              {{item.value}}
            </div>
        </template>

        <template slot="Address" slot-scope="item">
              <!-- A custom formatted header cell for field 'name' -->
            <div class="tabletext">
              {{item.value}}
            </div>
        </template>

        <template slot="Balance" slot-scope="item">
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

      </b-table>
        </div>
      </div>
    </div>
</template>

<script>
/* eslint-disable */
import { mapState } from 'vuex'

export default {
  name: 'Address',
  data () {
    return  {
      valueCounter: "USD",
      priceCounter: "USD",
      addressSymbol: '',
      walletData: null,
      items: [],
      fields: [
                { key: 'Nickname', 
                  label:"Nickname",
                  sortable:  true
                },
               /* { key: 'Address', 
                  label:"Address",
                  sortable:  true
                },*/
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
  created() {
    this.$nuxt.$on("coinsBanner", (data) => {
      if(!data) {
        return
      }
        this.addressSymbol = data.coins;
        this.sortAddressBySymbol();
    })
  },
  computed: {
    ...mapState({
        addresses: state => state.coins.walletAddresses
      })
    },
  mounted(){

    if (this.addresses[0]){
        this.items.push({
          'Address': this.addresses[0].Address,
          'Balance': Number.parseFloat(this.addresses[0].Balance).toFixed(4), 
          'Nickname': this.addresses[0].Nickname,
          'Value': this.checkZero(Number.parseFloat(this.addresses[0].Value.USD), 'usd'),
          'Price' : this.checkZero(Number.parseFloat(this.addresses[0].Price.USD), 'usd'),
          'ValueUSD': this.checkZero(Number.parseFloat(this.addresses[0].Value.USD), 'usd'),
          'ValueBTC': this.checkZero(Number.parseFloat(this.addresses[0].Value.BTC), 'btc'),
          'PriceUSD': this.checkZero(Number.parseFloat(this.addresses[0].Price.USD), 'usd'),
          'PriceBTC': this.checkZero(Number.parseFloat(this.addresses[0].Price.BTC), 'btc'),
          _rowVariant: "dark2"
    })
    this.walletData = this.items 
    }
    this.$nuxt.$on("updateExchangeAndWallet", (coin) => {
      this.walletData = []
      this.items = []
          for (var wallet in this.addresses){
            if (this.addresses[wallet].Symbol == coin){
                this.items.push({
                    'Address': this.addresses[wallet].Address,
                    'Balance': Number.parseFloat(this.addresses[wallet].Balance).toFixed(4), 
                    'Nickname': this.addresses[wallet].Nickname,
                    'Value': this.checkZero(Number.parseFloat(this.addresses[wallet].Value.USD), 'usd'),
                    'Price' : this.checkZero(Number.parseFloat(this.addresses[wallet].Price.USD), 'usd'),
                    'ValueUSD': this.checkZero(Number.parseFloat(this.addresses[wallet].Value.USD), 'usd'),
                    'ValueBTC': this.checkZero(Number.parseFloat(this.addresses[wallet].Value.BTC), 'btc'),
                    'PriceUSD': this.checkZero(Number.parseFloat(this.addresses[wallet].Price.USD), 'usd'),
                    'PriceBTC': this.checkZero(Number.parseFloat(this.addresses[wallet].Price.BTC), 'btc'),
                    _rowVariant: "dark2"
              })
            }
          }
        this.walletData = this.items
    })
  },
  methods: {
    value_sort(currency)
    {
      this.valueCounter = currency;
      for (var wallet in this.walletData){
        this.walletData[wallet].Value = (currency == "USD") ? this.walletData[wallet].ValueUSD : this.walletData[wallet].ValueBTC
      }
    },
    price_sort(currency){
            this.priceCounter = currency;
            for (var wallet in this.walletData){
        this.walletData[wallet].Price = (currency == "USD") ? this.walletData[wallet].PriceUSD : this.walletData[wallet].PriceBTC
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
    sortAddressBySymbol(){
    let that = this;
    that.items = [];
    for (var elem in that.addresses){
    if (that.addresses[elem].Symbol == that.addressSymbol){
          that.items.push({
              'Address': that.addresses[elem].Address,
              'Balance': this.checkZero(Number.parseFloat(that.addresses[elem].Balance).toFixed(4)), 
              'Nickname': that.addresses[elem].Nickname,
              'Symbol' : that.addresses[elem].Symbol,
              _rowVariant: "dark2"
          });
        }
      } 
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hide-head{
  background-color: rgb(0, 0, 0);
  width:100%;
  height:6px;
  z-index: 100;
  position: absolute;
  top:20;
}
.alloPercent{
  position: relative;;
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
.wrap
{
    height:140px;
    width:111%;
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
.gdax{
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
    margin-left:auto;
    margin-right:auto;
    width:100px; 
}
.donut-percent{
  position: relative;
  z-index: 5;
  margin-top: 3px;
  right: 20px;  
}
</style>
