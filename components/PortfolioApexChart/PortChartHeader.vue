<template>
<div>
<div>
    <b-row>
        <b-col  cols="12" class="text-left">
        <div class="white title2 float-left d-none d-md-block" style="margin-top:2.3vh;">
            {{coin}} 
        </div>
        </b-col>
    </b-row>
</div>
    <b-row>
    <b-col>
    <div style="margin-top:-45px;margin-bottom:45px;float:right;margin-right:6%;" >
    <b-form inline>
    <div class="button-hover" v-on:click="filterOrders('ONEDAY')"><a v-bind:style="chartButtonOff" v-if="chartfilter != 'ONEDAY'">1d</a></div>
    <div class="button-hover"><a  class="chart-filter-pad-sel" v-if="chartfilter == 'ONEDAY'" :style="'background-color: #02738d'">1d</a></div>
    <div  class="button-hover" v-on:click="filterOrders('ONEWEEK')"><a v-bind:style="chartButtonOff" v-if="chartfilter != 'ONEWEEK'">7d</a></div>
    <div class="button-hover"><a class="chart-filter-pad-sel" v-if="chartfilter == 'ONEWEEK'" :style="'background-color: #02738d'">7d</a></div>
    <div class="button-hover" v-on:click="filterOrders('ONEMONTH')"><a v-bind:style="chartButtonOff" v-if="chartfilter != 'ONEMONTH'">1m</a></div>
    <div class="button-hover"><a class="chart-filter-pad-sel" v-if="chartfilter == 'ONEMONTH'" :style="'background-color: #02738d'">1m</a></div>
    <div  class="button-hover" v-on:click="filterOrders('THREEMONTHS')"><a v-bind:style="chartButtonOff" v-if="chartfilter != 'THREEMONTHS'">3m</a></div>
    <div  class="button-hover"><a class="chart-filter-pad-sel" v-if="chartfilter == 'THREEMONTHS'" :style="'background-color: #02738d'">3m</a></div>
    <div  class="button-hover" v-on:click="filterOrders('SIXMONTHS')"><a v-bind:style="chartButtonOff" v-if="chartfilter != 'SIXMONTHS'">6m</a></div>
    <div  class="button-hover"><a class="chart-filter-pad-sel" v-if="chartfilter == 'SIXMONTHS'" :style="'background-color: #02738d'">6m</a></div>
    <div class="button-hover" v-on:click="filterOrders('ONEYEAR')"><a v-bind:style="chartButtonOff" v-if="chartfilter != 'ONEYEAR'">1y</a></div>
    <div class="button-hover"><a class="chart-filter-pad-sel" v-if="chartfilter == 'ONEYEAR'" :style="'background-color: #02738d'">1y</a></div>
    <div v-show="overview == true" class="button-hover button-reset-off"><a>Reset</a></div>
    <div v-show="overview == false" class="button-hover button-reset-on"><a v-on:click="resetRefresh()">Reset</a></div>
    </b-form>
    </div>
    </b-col>
    </b-row>
<b-row>
<b-col cols="12">
</b-col>
<span style="position:relative; top:-45px;width:100%; margin-bottom:15px;margin-left:2vh;">
<PortfolioChart ></PortfolioChart>
</span>
</b-row>
</div>
</template>

<script>
/* eslint-disable */
import PortfolioChart from '~/components/PortfolioApexChart/PortfolioChart'
import PageLoader from '~/components/loader/PageLoader'

//import { Line} from 'vue-chartjs'
export default {
  data () {
    return {
        chartReady: false,
        currentData: '',
        overview: true,
        oneDayShow: true,
        sevenDayShow: true,
        oneMonthShow: true,
        threeMonthShow: true,
        sixMonthShow: true,
        oneYearShow: true,
        chartfilter: 'ONEDAY',
        coin: 'OVERVIEW',
        coin_image: "total",
        chartButton:{
            'background-color': '#0f8bab',
            'text-decoration': 'none',
            'color': 'white',
            'padding-left': '10px',
            'padding-right': '10px',
            'border-radius' : '25%',
            'cursor' : 'pointer'
        },
        chartButtonOff:{
            'background-color':'#0000',
            'text-decoration': 'none',
            'color': 'white',
            'padding-left': '10px',
            'padding-right': '10px',
            'border-radius' : '25%',
            'cursor' : 'pointer'
        },
    }
  },

computed: {
},
methods:{
    resetRefresh(){
    location.reload();
    },
     resetGraphHome(val){
   if (val == 'reset'){
        this.coin = "OVERVIEW";
        this.overview = true;
        this.chartfilter = 'ONEDAY';
        this.$nuxt.$emit('getNewTimeFrame', 'ONEDAY', 'total');    
   } else {
    this.overview = false;
   }
},
    filterOrders(val){
    if(this.$store.state.allowClick == false){
                    return
                }
    let that = this;
    this.$nuxt.$emit('intervalChange', val);
    if (this.overview == true) {
     this.$nuxt.$emit('getNewTimeFrame', val, 'total');
     this.chartfilter = val;
    }else{
     var filterCoin = this.currentData;
     this.$nuxt.$emit('getNewTimeFrame', val, filterCoin);
     this.chartfilter = val;
     }
    },
},

 mounted(){
 this.$nuxt.$on("getNewTimeFrame", (timeframe, data) => {
       if (data == 'total' || data.symbol == 'total'){
            return
        }
        this.overview = false;
        this.coin = data.Coin;
        this.coin_image = data.symbol.toLowerCase();
        this.currentData = data;
        this.chartfilter = 'ONEDAY';
  })
 },
components:{
PortfolioChart,
PageLoader
}
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto');
.coin-pad{
    margin-right:50%;
}
.home{
    background: black;
    border: none;
}
.crosshairWrapper {
    position: absolute;
    z-index: 5;
    left: 75px;
}
.wrapper {
    margin-left:auto;
    margin-right:auto;
    width:100%;
}
.padding{
    white-space: nowrap;
}
.white3{
    color:white;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 14px;
    margin-right:10px;
}
.white2{
    color:white;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 14px;
    margin-left:10px;
}
.white{
    color:white;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
}
.invert{
    filter: brightness(0);
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
.chart-filter-pad{
background: rgb(0, 0, 0);
text-decoration: none;
color: white;
white-space: nowrap;
padding-left: 15px;
padding-right: 15px;
}
.chart-filter-pad-sel{
text-decoration: none;
color: white;
padding-left: 10px;
padding-right: 10px;
padding-top: 7px;
padding-bottom: 7px;
border-radius: 25%;
}
.dropbtn {
    background-color: black;
    color: white;
    min-width:100px;
    margin: 10px;
    margin-right:0%;
    padding:1px;
    font-size: 11px;
    border-style: solid;
    border-width: 2px;
  border-color: white;
    cursor: pointer;
  -webkit-border-radius: 16px;
  -moz-border-radius: 16px;
  border-radius: 16px;
}
/* The container <div> - needed to position the dropdown content */
.dropdown {
    position: relative;
    display: inline-block;
    padding-top:1%;
    padding-left: 15px;
}
/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    font-size: 11px;
    display: none;
    position: absolute;
    background-color: black;
    min-width: 125px;
        height:90px;
    overflow-y:scroll;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
    color: white;
    padding: 10px 10px;
    text-decoration: none;
    display: block;
}
/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #f1f1f1;
  color:black;
}
/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
    display: block;
}
/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
    background-color: white;
    color: black;
}
.filter-padding{
    padding-top: 1%;
}
.button-hover{
    cursor: pointer;
}
.btn-fil-white{
    padding-bottom:10px;
    padding-left:5px;
    padding-right:5px;
    color: rgb(0, 0, 0) !important;
    background-color: #ffffff !important; 
    border-style: solid;
    border-width: 2px;
    border-color:#ffffff;
    border-radius: 5px;
    height: 27px;
    position: relative;
    top:3px;
    cursor: pointer;
        Margin-right:10px;
}
.btn-fil-white2{
    padding-bottom:10px;
    padding-left:5px;
    padding-right:5px;    
    color: rgb(255, 255, 255) !important;
    background-color: #000000 !important; 
    border-style: solid;
    border-width: 2px;
    border-color:#ffffff;
    border-radius: 5px;
    height: 27px;
    position: relative;
    top:3px;
    cursor: pointer;
    Margin-right:10px;
}
.center{
    margin-left: auto;
    margin-right:auto;
}
.button-reset-on {
    background-color: #ffff;
    color:rgb(0, 0, 0);
    font-weight:bold;
    border:#ffff;
    border-width:2px;
    border-style:solid;
    border-radius:10px;
    padding:3px;
}
.button-reset-off {
    background-color: #000000;
    border:#ffff;
    border-width:2px;
    border-style:solid;
    border-radius:10px;
    padding:3px;
}
</style>