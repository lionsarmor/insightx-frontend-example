<template>
<div v-if="$store.state.generalData" class="portfolioContainer">
<div class="item portfolioChartComponent">
<PortChartHeader></PortChartHeader>
</div>
<div class="item twentyFourComponent">
    <twentyFourHourCoin :balanceData="$store.state.generalData.filteredBalances" :defaultFiat="$store.state.defaultFiat"></twentyFourHourCoin>
</div>
<div class="item totalsComponent">
    <totals></totals>
</div>
<div class="item performersComponent">
 <performers v-if="$store.state.generalData"></performers>
</div>
<div class="item assetsComponent">
<asset-allocation style="margin-left:11%;float:left;"></asset-allocation> 
</div>
</div>
</template>

<script>
    import twentyFourHourCoin from "~/components/twentyFourHour/twentyFourHourCoin"
    import PortChartHeader from "~/components/PortfolioApexChart/PortChartHeader"
    import Totals from "~/components/PortfolioTotals/Totals"
    import Performers from "~/components/performers/Performers"
    import AssetAllocation from "~/components/assetAllocationChart/AssetAllocation"
    import PageLoader from "~/components/loader/PageLoader"

    export default {
        layout: 'authed',
        middleware: 'auth',
        data() {
            return {

            }
        },
        methods: {},
        components: {
            twentyFourHourCoin,
            PortChartHeader,
            Totals,
            Performers,
            AssetAllocation,
            PageLoader
        },
    }
</script>

<style>
    .apexcharts-tooltip {
        font-size: 17px !important;
        font-weight: bold;
        background: #ff000000 !important;
        color: rgba(255, 255, 255, 0) !important;
        border: none !important;
        border-bottom: black !important;
        width: 100% !important;
        border-radius: 0px !important;
        outline: none !important;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
    }

    .apexcharts-xaxistooltip {
        background: #00000073;
        color: #fff;
        border: none;
    }

    .apexcharts-yaxistooltip {
        background: #096ff5;
        color: #fff;
        border: none;
    }
</style>