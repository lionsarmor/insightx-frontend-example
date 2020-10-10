<template>
  <div>
    <b-row>  
    <b-col cols="12">   
        <div class="float-right">     
        <mini-filter-bar />
        </div>
        <span v-if="!loading"><page-loader /></span>
        <div class="float-left d-block d-xl-block" style="position:relative; top: -1px; left:10px; margin-bottom:-15px;">
        <span class="top-fil" style="font-size:14px;"><a class="thick"> Market cap: </a>
            <span style="font-weight:normal;">${{numberWithCommas(totalmarketdata.totalMarketCap.totalMarketCap)}}&emsp;&emsp;</span>
           <a class="thick"> BTC Dominance:</a> <span style="font-weight:normal;">{{totalmarketdata.totalMarketCap.bitcoinPercentageDominance}}%&emsp;&emsp;</span> 
             <a class="thick"> Volume(24h):</a> <span style="font-weight:normal;">${{numberWithCommas(totalmarketdata.totalMarketCap.totalVolume24h)}}</span></span>
        </div>
    </b-col>
    </b-row>
    <div>
            <carousel v-if="loading" :scrollPerPage="false" :easing="tmpEasing" :autoplay="autoplayed" :loop="looped" :per-page="slides" :paginationEnabled='false'>
                    <slide  v-for="item in aggChartData" :key="item.volume">
                        <b-container fluid>
                            <b-form-row >
                        <b-col>
                            <MiniBottomTicker :chartData="item"/>
                        </b-col>
                            </b-form-row>
                        </b-container>
                    </slide>
        </carousel>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import MiniBottomTicker from '@/components/miniTicker/MiniBottomTicker'
import MiniFilterBar from '@/components/miniTicker/MiniFilterBar'

export default {
  data () {
    return {
      allData: null,
      slides: 10,
      slide: 0,
      loading:true,
      sliding: null,
      autoplayed: true,
      looped: true,
      window: {
        width: 0,
        height: 0

    },
         tmpEasing: "ease-in-out"
    }
  },
  props: ['aggChartData', 'totalmarketdata'],
  mounted() {
          this.winWidth()
  },
  methods: {
       winWidth: function () {
        setInterval(() => {
            var w = window.innerWidth;
            if (w < 500) {
                this.slides = 1
            } else if (w < 820) {
                this.slides = 2
            } else if (w < 1200) {
                this.slides = 3
            } else {
                this.slides = 7
            }
        }, 100);
    },
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
          numberWithCommas: function(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
  },
  components: {
      MiniBottomTicker,
      MiniFilterBar,
  },
  created(){
      this.$nuxt.$on('startLoop', (data) => {
        this.autoplayed = true
         this.looped = true
      })
      this.$nuxt.$on('tickerData', (tickerdata)=> {
          if (this.loading == false){
              return
          }
          var that = this
          this.loading = false

          this.aggChartData = tickerdata

          setTimeout(function(){that.loading = true}, 1000)
      }),
    this.$nuxt.$on('searchedCoin', (coin, data)=> {
        if (this.loading == false){
              return
          }
         var that = this
         this.loading = false
         this.autoplayed = false
         this.looped = false
         if (coin in this.aggChartData){ 
             delete this.aggChartData[coin.toString()] 
         }
         var tmpObj = Object.entries(this.aggChartData)
         var newData = Object.entries(data)
         tmpObj.unshift(newData[0])
         this.aggChartData = {}
         for (var obj in tmpObj){
             this.aggChartData[tmpObj[obj][0]]= tmpObj[obj][1]
         }
         setTimeout(function(){that.loading = true}, 1000)
    })
  }
}
</script>
<style scoped>
.top-fil{
    font-family: 'Roboto', sans-serif;
    position: relative;
    padding-left: 10px;
}

</style>