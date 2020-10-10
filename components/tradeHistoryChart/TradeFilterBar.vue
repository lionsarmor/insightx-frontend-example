<template>
  <div class="font wrapper">
      <div class="d-block d-xl-block">
    <b-row class="wrapper2">
        <b-col cols="12">
            <b-row>
            <b-col cols="6">
              <div style="float:left;padding-left:25px;"> 
              <h5 class="title">TRADE HISTORY</h5>
              </div>
            </b-col>
            <b-col cols="6">
            <div style="float:right">
            <div class="input-group-append">
            <button type="button" @click="toggleManualTradeModal('open')" variant="primary" class="btn-fil" style="margin-right:10px;">+ Manual Trade</button>
            <button class="searchBtn" @click="refreshCoin()" type="button"><fa icon="redo"/></button>
            <input v-model="searchCoin" class="search" placeholder="    Search"  type="text">
            <button class="searchBtn" @click="searchByCoin()" type="button"><fa icon="search"/></button>
                      <div style="margin-left:10%;margin-top:1px;" class="d-block d-xl-block" v-if="displayBar != false">
                      <button class="size-button" v-on:click="tvChartLarge('lg')"><fa icon="compress"/></button>
                      <button class="size-button" v-on:click="tvChartLarge('xl')"><fa icon="expand"/></button>
                      <button class="size-button" v-on:click="tvChartLarge('xxl')"><fa icon="expand-arrows-alt"/></button>
                    </div>
            </div>
            </div>
            </b-col>
            </b-row>
        </b-col>
    </b-row>
<b-row>
</b-row>
</div>
     <br>
     <b-row>
    <TradeHistoryChart :searchfilter="search"  :tradeDataHistory="history" style="position:relative; top:-22px;"></TradeHistoryChart>
      <span  id="pagination" class="paginationShift"><pagination></pagination></span>
     </b-row>
  </div>
</template>
<script>
import TradeHistoryChart from '~/components/tradeHistoryChart/TradeHistoryChart'
import Pagination from '~/components/pagination/Pagination'


export default {
  props: ['history'],
  name: 'TradeFilterBar',
  data () {
    return {
      bigPagination: true,
      displayBar: false,
      tradeMenuBar: false,
      endpoint: this.$store.state.apiEndPoint,
      exchangeModel: null,
      feesModel: null,
      costsModel: null,
      amounteModel: null,
      addedMarkets: [],
      marketModel: '',
      searchCoin: null,
      search: '',
      currency: null,
      from: null,
      to: null,
      show: false,
      show2: false,
       variants: [
                    'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'black'
                ],
                headerBgVariant: 'black',
                headerTextVariant: 'light',
                bodyBgVariant: 'black',
                bodyTextVariant: 'light',
                footerBgVariant: 'black',
                footerTextVariant: 'light',
      selected: [], // Must be an array reference!
      options: [
        {text: 'BITTREX', value: 'bittrex'},
        {text: 'COINBASE PRO', value: 'coinbase'},
        {text: 'CRYPTOPIA', value: 'cryptopia'},
        {text: 'BINANCE', value: 'binance'}
      ],
  }
  },
    components: {
    TradeHistoryChart,
    Pagination
    },
    mounted(){
    this.$nuxt.$on("enlargeTvChart", (size) => {
    let that = this;
 if (size == 'none') {
    document.getElementById('pagination').classList.remove('paginationShift');
    document.getElementById('pagination').classList.add('paginationShift2'); 
    }else{
    document.getElementById('pagination').classList.remove('paginationShift2');
    document.getElementById('pagination').classList.add('paginationShift'); 
    }
  })
    this.$nuxt.$on("tradeMenu", (val) => {
    let that = this;
    if (val == true){
      that.bigPagination = false;
     that.displayBar = true
    }else{
      that.bigPagination = true;
      that.displayBar = false
    }
  })
    },
methods:{
     toggleManualTradeModal(value){
     this.$store.commit('modals/toggleTransactionsModal', value);
            },
     tvChartLarge(val){
     this.$nuxt.$emit('enlargeTvChart', val);
     },
    refreshCoin(){
        this.$nuxt.$emit('searchByCoinTrade', (null))
        this.searchCoin = null;
    },
    searchByCoin(){
        this.$nuxt.$emit('searchByCoinTrade', (this.searchCoin))
        this.searchCoin = null;
    },
    applyFilter () {
      var that = this;
      var token = sessionStorage.getItem('token');
      var url = this.endpoint + 'getorders';
      var header =  {          
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Basic '+btoa(token+':unused')}
      fetch(url, {
        method: "POST",
       // body: JSON.stringify({'exchange': this.watchExchanges, 'base': base, 'counter': counter, 'action': 'add'}),
        credentials: 'same-origin',
        headers: header,
        mode: 'cors'
      }).then(function (response) {
       return response.json();
      }).then(function (jsonResponse) {
      that.watchListVal = jsonResponse.watchList;
      return jsonResponse;
      })
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item + .item:before {
  content: ", ";
}
.drpbut{
    background-color: black !important;

}
.wrapper {
    margin-left:auto;
    margin-right:auto;
    width:100%;
}
.but-space{
        padding-left: 50px;
        padding-right: 10px;
}
.modal-but{
    background-color: black !important;
    border: none !important;
}
.black{
    color: black !important;
}
.hide-head{
  background-color: rgb(0, 0, 0);
  width:100%;
  height:5px;
}

.size{
  width: 50px;
}
.btn-fil{
    color: white !important;
    background-color: black !important; 
    border-style: solid;
    border-width: 2px;
    border-color: rgb(255, 255, 255);
    border-radius: 25px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 11px;
}
.btn-fil{
  height: 27px !important;
}
.search{
  width: 80px;
  border: 2px solid rgb(255, 255, 255);
  background: transparent;
  border-radius: 25px;
  height: 27px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-weight: bold;
  outline-style: none;
  font-size: 11px;
}

.searchBtn{
  width: 30px;
  border: 2px solid rgb(255, 255, 255);
  background: transparent;
  border-radius: 25px;
  height: 27px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-weight: bold;
  outline-style: none;
  font-size: 11px;
}
.table-wrapper
{
    height:100px;
    position: relative;
    right:-27px;
    overflow: scroll; 
    background-color: black; 
}
ul{
    list-style: none;
}
.title{
 float:left;
}
.size-button{
  background-color:#1941af00;
  border: 1px solid #2e2b3000;
  color: rgb(110, 110, 110);
  padding-top:7px;
  padding-bottom:7px;
  margin-top:-2px;
  border-top:none;
  border-bottom: none;
  border-left: none;
}
    .drop-input {
        color: white;
        background: #1a1a1a;
        border: none;
        font-size: 12px;
        height: 30px;
    }
    
    .btn-fil-blue {
        color: white !important;
        background-color: #000000 !important;
        border-style: solid;
        border-width: 2px;
        border-color: #047ea4;
        border-radius: 25px;
        height: 37px;
        position: relative;
        top: 3px;
        cursor: pointer;
    }

    .btn-fil-yellow {
        color: white !important;
        background-color: #000000 !important;
        border-style: solid;
        border-width: 2px;
        border-color: #a3972d;
        border-radius: 25px;
        height: 37px;
        position: relative;
        top: 3px;
        cursor: pointer;
    }

    .btn-fil-red {
        color: white !important;
        background-color: #000000 !important;
        border-style: solid;
        border-width: 2px;
        border-color: #a41704;
        border-radius: 25px;
        height: 37px;
        position: relative;
        top: 3px;
        cursor: pointer;
    }
</style>
