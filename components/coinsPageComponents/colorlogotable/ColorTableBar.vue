<template>

  <div class="font wrapper" >
      <div class="d-block d-xl-block">
    <div class="wrapper-bar">
    <b-row class="wrapper2">
        <b-col cols="12">
            <b-row>
                 <b-col cols="12">
            <div style="float:right; white-space: nowrap;position:relative;top:20px;"><br>
                    <b-form-input v-model="search"  class="search" placeholder=" Search" />
                </div>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
<b-row>
</b-row>
</div>
  </div>
<div>
    <color-table :searchfilter="search" :exchangeData="balanceData" style="position:relative; top:-20px;"></color-table>
</div>
<!-- MODAL -->
<div>
    <b-modal v-model="show"
             title="Filter"
             :header-bg-variant="headerBgVariant"
             :header-text-variant="headerTextVariant"
             :body-bg-variant="bodyBgVariant"
             :body-text-variant="bodyTextVariant"
             :footer-bg-variant="footerBgVariant"
             :footer-text-variant="footerTextVariant">
       <b-container fluid>
            <b-row>
  <b-col cols="12">
      <b-row>
      <h5 class="float-left">Date Range</h5>
      </b-row>
          <b-row>
      <label class="float-left">From:</label>
          </b-row>
          <!--
            <vue-ctk-date-time-picker
                v-model="from"
                    color="black"
                ></vue-ctk-date-time-picker>
            <b-row>
                <label class="float-left">To:</label>
            </b-row>
            <vue-ctk-date-time-picker
                    v-model="to"
                    color="black"
            ></vue-ctk-date-time-picker><br> -->
<b-row>
    <b-container>
    <b-row>
    <h5 class="float-left">Choose Exchange</h5>
    </b-row>
    </b-container>
    <b-col cols="12">
    <b-row>
     <b-form-group style="position: relative; left: 13px;">
      <b-form-checkbox-group v-model="selected"
                             buttons
                             button-variant="info"
                             size="md"
                             name="buttons2"
                             :options="options">
      </b-form-checkbox-group>
    </b-form-group>
    </b-row>
    </b-col>
</b-row>
  </b-col>
  <b-container>
    <b-row>
    <h5 class="float-left">Choose Markets</h5>
    </b-row>
    </b-container>
    <b-row>
        <b-col cols="12">
             <div>
    <b-form inline style="position: relative; right: - 10px;">
      <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0" style="position: relative; right: -13px;">
    <b-form-input v-model="marketModel" type="text" list="markets" placeholder="Markets" ></b-form-input>
    <b-button class="modal-but" variant="primary" v-on:click="addedMarkets.push(marketModel)" style="position:relative; right: -15px;">ADD</b-button>
    <b-button variant="info" v-on:click="addedMarkets = ''" style="position:relative; right: -25px;">&#8634;</b-button>
    <datalist id="markets">
    <option value="BTC" />
    </datalist>
    </b-input-group>
    </b-form>
  </div>
    </b-col>
    </b-row>
    <b-col cols="11"><br>
    <b-row>
    <div class="table-wrapper" style="position: relative; right:  -12px;" >
        <span v-for="element in addedMarkets" :key="element" class="item">
           <span>{{ element }}</span>
           </span>
    </div>
    </b-row>
    </b-col>
        </b-row>
       </b-container>
       <div slot="modal-footer" class="w-100">
         <p class="float-left black">Apply Filter</p>
         <div >
        <div slot="modal-header" class="w-100">
            <h5>Filter</h5>
         </div>
         <b-btn size="sm" class="float-right" variant="danger"  @click="show=false">
           Close
         </b-btn>
         </div>
         <div style="position:relative; left: -10px;">
         <b-btn size="sm" class="float-right modal-but" @click="applyFilter">
            Apply
        </b-btn>
         </div>
       </div>
    </b-modal>
  </div>
  </div>
</template>

<script>
/* eslint-disable */


import ColorTable  from '~/components/coinsPageComponents/colorlogotable/ColorTable'
import { mapState } from 'vuex'

export default {
  name: 'TradeFilterBar',
  computed: {
    ...mapState({
      watchList: state => state.coins.watchList,
      colorBalance: state => state.coins.balanceData.global,
      balanceData: state => state.coins.balanceData
    })
  },
  data () {
    return {
      overview: true,
      filter_time: '24H',
      currency: 'USD',
      addedMarkets: [],
      marketModel: '',
      search: '',
      currency: null,
      from: null,
      to: null,
      show: false,
      variants: [
        'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'
      ],
      headerBgVariant: 'secondary',
      headerTextVariant: 'light',
      bodyBgVariant: 'dark',
      bodyTextVariant: 'light',
      footerBgVariant: 'secondary',
      footerTextVariant: 'light',
      selected: [], // Must be an array reference!
      options: [
        {text: 'BITTREX', value: 'bittrex'},
        {text: 'Coinbase Pro', value: 'coinbase'},
        {text: 'CRYPTOPIA', value: 'cryptopia'},
        {text: 'BINANCE', value: 'binance'}
      ],
  }
  },
    components: {
    ColorTable,
    },
methods:{
    applyFilter(){

    },
isOverviewCoins(val){
   if (val == true){
    this.overview = true;
    this.$nuxt.$emit('overviewCoins', val);
   }else {
    this.overview = false;
   }
}
},
mounted(){
    this.$nuxt.$on("overviewCoins", (val) => { 

     })
    this.$nuxt.$on("overviewReset", (val) => {
     this.isOverviewCoins(val)
    })
      this.$nuxt.$emit('colorLogo', this.colorBalance);
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
.wrapper-bar {
    margin-left:auto;
    margin-right:auto;
    width:300px;
    position: relative;
    left:26%;
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
  height:1px;
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
.table-wrapper
{
    width: 100%;
    height:100px;
    position: relative;
    right:-27px;
    overflow: scroll; 
    overflow-x: hidden; 
    background-color: black; 
}
ul{
    list-style: none;
}
.btn-fil-blue{
    color: white !important;
    background-color: #047ea4 !important; 
    border-style: solid;
    border-width: 2px;
    border-color: #047ea4;
    border-radius: 25px;
    height: 27px;
    position: relative;
    top:3px;
    cursor: pointer;
}
.btn-fil-blue2{
    color: white !important;
    background-color: #000000 !important; 
    border-style: solid;
    border-width: 2px;
    border-color: #047ea4;
    border-radius: 25px;
    height: 27px;
    position: relative;
    top:3px;
    cursor: pointer;
}
</style>
