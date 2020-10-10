<template>
    <div class="analysisContainer" v-if="$store.state.generalData">
    
 <!--       
     <trading-view-chart></trading-view-chart>
            <watch-list  
            :key="$store.state.watchListComponent"
            style="position:relative;top:1px;z-index:50;"
            v-show="chartSize == null || chartSize == 'expanded' || chartSize == 'closed'"
            :balanceData="createMutable($store.state.generalData.balances)"
            :balanceColumns="createMutable($store.state.generalData.balanceColumns)"
            :defaultFiat="createMutable($store.state.defaultFiat)"
            ></watch-list>
    <trade-filter-bar  v-show="chartSize == null || chartSize == 'closed'"
    :style="tradeStyle"
    :history="createMutable($store.state.generalData.transactions)"
    ></trade-filter-bar>

-->

<div class="item tradingViewContainer"> 
 <trading-view-chart></trading-view-chart>
</div>
<div class="item watchListContainer"> 
<watch-list  
            :key="$store.state.watchListComponent"
            style="position:relative;top:1px;z-index:50;"
            v-show="chartSize == null || chartSize == 'expanded' || chartSize == 'closed'"
            :balanceData="createMutable($store.state.generalData.balances)"
            :balanceColumns="createMutable($store.state.generalData.balanceColumns)"
            :defaultFiat="createMutable($store.state.defaultFiat)"
            ></watch-list>
</div>
<div class="item tradeHistoryContainer"> 
<trade-filter-bar  v-show="chartSize == null || chartSize == 'closed'"
    :style="tradeStyle"
    :history="createMutable($store.state.generalData.transactions)"
    ></trade-filter-bar>
</div>
    </div>
</template>

<script>
import TradingViewChart from "~/components/tradingViewChart/TradingViewChart"
import WatchList from "~/components/watchlist/WatchList"
import TradeFilterBar from "~/components/tradeHistoryChart/TradeFilterBar"
import ExchangeCurrencyTable from "~/components/exchangeCurrencyTable/ExchangeCurrencyTable"
import { mapState } from 'vuex'

export default {
    layout: 'authed',
    middleware: 'auth',
    data() {
    return {
       
    }
    },
    mounted() {

    },
    computed: {
        ...mapState({
            watchListData: state => state.watchList
        })
    },
    methods:{
        createMutable(data){
            let mutableData = JSON.parse(JSON.stringify(data))
            return mutableData
        }
        },
    components: {
    TradingViewChart,
    WatchList,
    TradeFilterBar,
    ExchangeCurrencyTable,
},
}
</script>
