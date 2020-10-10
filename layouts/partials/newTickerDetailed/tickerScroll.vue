<template> 
<div>
<b-row>
<b-col>
<div class="ticker-wrap">
<div class="ticker">
<div v-for="(value, key, index) in aggregatedTickerData" :key="index.id" class="ticker__item" >
<tickerBody :tickerDataProfile="value" :indexValue="index" style="margin-left:0%;" />
</div>
</div>
</div>     
</b-col>
</b-row>
</div> 
</template> 
<script> 
import tickerBody from '../../partials/newTickerDetailed/tickerBody'
/* eslint-disable */
export default { 
  data () { 
    return { 
     aggregatedTickerData: this.$store.state.generalData.data,
    } 
  } ,
  methods: {
     
  },
  mounted () {
  },
components: {
  tickerBody,
  },
} 
</script> 
<style scoped lang="scss">


$duration: 1000s;

@keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Internet Explorer */
@-ms-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.fadein {
  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
     -moz-animation: fadein 2s; /* Firefox < 16 */
      -ms-animation: fadein 2s; /* Internet Explorer */
       -o-animation: fadein 2s; /* Opera < 12.1 */
          animation: fadein 2s;
}
@keyframes ticker {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}

.ticker-wrap {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 7rem;
  padding-left: -100%;
  box-sizing: content-box;
  .ticker {

    display: inline-block;
    height: 7rem;
    line-height: 4rem;  
    white-space: nowrap;
    padding-right: 0%;
    box-sizing: content-box;

    -webkit-animation-iteration-count: infinite; 
            animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
   -webkit-animation-name: ticker;
           animation-name: ticker;
    -webkit-animation-duration: $duration;
            animation-duration: $duration;

    &__item {
      display: inline-block;
      padding: 0 2rem;
      font-size: 2rem;
      color: white;   

    }

  }

}
.ticker-wrap2 {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 7rem;
  padding-left: -210%;
  box-sizing: content-box;

  .ticker {
      background:rgb(0, 0, 0);

    display: inline-block;
    height: 4rem;
    line-height: 4rem;  
    white-space: nowrap;
    padding-right: 100%;
    box-sizing: content-box;
    -webkit-animation-iteration-count: infinite; 
            animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
   -webkit-animation-name: ticker;
           animation-name: ticker;
    -webkit-animation-duration: $duration;
            animation-duration: $duration;

    &__item {
      display: inline-block;
      padding: 0 2rem;
      font-size: 2rem;
      color: white;   

    }

  }

}
</style>