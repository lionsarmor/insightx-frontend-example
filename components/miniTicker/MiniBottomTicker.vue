<template>
<div id="bottomticker">
<b-container id="labels" class="Chart">
    <b-row>
        <b-col cols="1" style="z-index: 50;">
            <span style="white-space:nowrap;font-size:13px;">
                <img :src="insightImgUrl+chartData.market.toLowerCase()+'.svg'" class="svg" style="width:20px;height:20px; color:white;" onerror="this.src='/cryptocurrency-icons/svg/white/other2.svg'" />
                <a class="thick"> {{ chartData.market }}</a>
                <span style="padding-right:80px;">
                    ${{priceLength(chartData.price)}}</span> </span>
                    <br><span style="font-size:12px; position:relative; top: -25px; right:-200px;"
                     :style="{'color': chartData.color}">
                     ({{Number(chartData.pricePercentChange)}}%){{Number(chartData.priceChange)}}</span>
                     </b-col>
   </b-row>
   <b-row>
       <b-col cols="1">        
            <span id="overlay" style="white-space:nowrap;font-size:12px;">
            <a class="thick">H: </a>${{priceLength(chartData.high_24)}}&emsp;&emsp;
            <a class="thick">L: </a>${{priceLength(chartData.low_24)}}&emsp;&emsp;
            <a class="thick">V: </a>${{chartData.volume_24h}}
            </span>
       </b-col>
   </b-row>
</b-container>
    </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'BottomTicker',
  data () {
    return {
        high: 456.75,
        low: 371.1,
        volume: 15041,
        symbol: "BTC",
        pricePercentage: "+5.34(.05%)",
        xAxisDatas: [6854, 6480, 6225, 4124, 4345, 3423, 4442,6743],
        increased: true,
        color: this.chartData.color,
        insightImgUrl: "/cryptocurrency-icons/svg/white/",
        datacollection: {
        labels: this.chartData.labels
      }
    }
  },
  methods: {
      priceLength(val){
          if (val < 1){
        return val.toFixed(6);
          }else if (val > 1){
        return val.toFixed(2);
          }
      }
  },
  components:{
  },
    props: ['chartData'],
}
</script>

<style scoped>
#bottomticker {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 300px;
  z-index: 1;
  position: relative;
}
#labels{
    color: white;
    }
.Chart {
  background: rgb(0, 0, 0);
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.27);
  margin:  0px 0;
}

.Chart h2 {
  margin-top: 0;
  color:  rgba(255, 0,0, 0.5);
  border-bottom: 1px solid #323d54;
}

#overlay {
    position: absolute;
    top: 30px;
    left: 100%;
    font-size: 2px;
    word-spacing: 5px;
    background-color:transparent;
}

</style>
