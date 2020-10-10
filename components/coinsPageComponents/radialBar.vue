<template>
    <div class="radial-item">
        <div class="coin-price item-1 square" :style="{'background-color': colorBlock,'font-size':'16px'}"><a style="padding-left:10px;margin-top:-4px;">{{longName}} - ${{coinPrice}}</a></div> 
        <div class="status item-1" style="font-size:16px; font-wieght:bold;"><b>Asset Status</b></div>
        <div class="portfolioTitle item-1">Portfolio Value:</div>
        <div class="portfolioValue item-1"><a style="color:#65cdfa;">${{portfolioValue}}</a></div>
        <div class="allocationTitle item-1">Allocation Value:</div>
        <div class="allocationValue item-1"><a style="color:#65cdfa;">${{coinValue}}</a></div>
        <div class="targetedTitle item-1">Targeted Value:</div>
        <div class="targetedValue item-1"><a style="color:#65cdfa;">${{targetValue}}</a></div>
        <div class="fromTargetTitle item-1">Value from target:</div>
        <div class="fromTargetValue item-1"><a style="color:#65cdfa;">${{Math.abs(valueFromTarget)}}</a></div>
        <div class="action item-1">Action Required:</div>
        <div class="actionValue item-1 outer"><a style="color:#65cdfa;"><span :style="{'color':buyColor}">{{buyOrSell}}</span> {{prefix(buyOrSell)}}{{tradeAmount}} ({{coinName}})</a></div>
       <div class="wrapper radial-chart">
        <div class="item-1" style="margin-left:-250px;"><apexchart v-if="chartOptions" type="radialBar" :options="chartOptions" :series="series" width="390" height="200"></apexchart></div>
        <label class="exchangeEmblem item-1" style="position:relative;top:-165px;">{{this.coinName}}</label>
      </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        watch: {
         allocationBarData: function() {
             this.updateChartData(this.allocationBarData)
         },
         keyForceRender: function() {
             this.updateChartData(this.allocationBarData)
         }
        },
        computed: {
            ...mapState({
                globalBalances: state => state.coins.globalBalances,
                allocationBarData: state => state.coins.allocationBarData,
                totalAllocationBarData: state=> state.coins.totalAllocationBarData,
                keyForceRender: state => state.coins.keyForceRender
            }),
        },
        methods: {
            updateChartData(payload){
                    this.portfolioValue = this.globalBalances.global.computed.combinedusdTotal
                    if (this.globalBalances.global[payload.symbol]) {
                        this.longName = payload.longName
                        this.coinValue = this.globalBalances.global[payload.symbol].usdvalue
                        this.coinPrice = this.globalBalances.global[payload.symbol].usdprice
                        this.updateAllocationData(this.allocationBarData)
                    } else {
                        this.longName = payload.symbol
                        let url = "coinPrice"
                        let that = this
                        let body = {
                            'symbol': payload.symbol
                        }
                        this.$insightfetch(url, 'POST', body, 'cors', 'same-origin', false).then(function(jsonResponse) {
                            that.coinValue = 0
                            that.coinPrice = jsonResponse.symbolUsdValue
                            that.updateAllocationData(that.allocationBarData)
                        })

                    }
            },
            updateAllocationData(payload) {
                if (payload.targetRemainder == undefined) {
                    return
                }
                let allocationColor = this.colorToHex(payload.colorBlock);
                this.coinName = payload.symbol
                this.colorBlock = payload.colorBlock
                if (payload.target == undefined || payload.target == null) {
                    payload.target = 0
                }
                if (payload.allocation == undefined || payload.allocation == null) {
                    payload.allocation = 0
                }
                this.targetValue = Number((Number(payload.target) / 100) * Number(this.portfolioValue)).toFixed(2)
                this.allocation = Number(payload.allocation).toFixed(2)
                this.valueFromTarget = Number(Number(this.targetValue) - Number(this.coinValue)).toFixed(2)
                if (Number(this.valueFromTarget) < 0) {
                    this.buyOrSell = "SELL"
                    this.buyColor = 'red'
                } else {
                    this.buyColor = "green"
                    this.buyOrSell = "BUY"
                }
                this.tradeAmount = Number(Number(this.valueFromTarget) / Number(this.coinPrice)).toFixed(8)
                this.series = [Number(payload.allocation).toFixed(2), Number(payload.target).toFixed(2)]

                this.chartOptions = {
                    legend: {
                        onItemHover: {
                            highlightDataSeries: false
                        },
                        horizontalAlign: 'left',
                        floating: true,
                        show: true,
                        labels: {
                            colors: ['#ffffff'],
                            useSeriesColors: false
                        },
                        position: "left",
                        offsetX: 0,
                        offsetY: 20,
                        containerMargin: {
                            right: 0,
                            left: 0
                        },
                        itemMargin: {
                            horizontal: 0,
                            vertical: 0
                        },
                        formatter: function(val, opts) {
                            return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%";
                        }
                    },
                    fill: {
                        opacity: 1,
                        type: 'gradient',
                        gradient: {
                            shade: 'dark',
                            type: "horizontal",
                            shadeIntensity: 1,
                            gradientToColors: [allocationColor, '#ffc222'],
                            inverseColors: true,
                            opacityFrom: 1,
                            opacityTo: 1,
                            stops: [1, 100]
                        },
                    },
                    plotOptions: {
                        radialBar: {
                            size: 100,
                            inverseOrder: false,
                            startAngle: 0,
                            endAngle: 360,
                            offsetX: 100,
                            offsetY: -0,
                            hollow: {
                                margin: 5,
                                size: '50%',
                                background: 'transparent',
                                image:undefined,
                                imageWidth: 150,
                                imageHeight: 150,
                                imageOffsetX: 0,
                                imageOffsetY: 0,
                                imageClipped: false,
                                position: 'front',
                                dropShadow: {
                                    enabled: false,
                                    top: 0,
                                    left: 0,
                                    blur: 3,
                                    opacity: 0.5
                                }
                            },
                            track: {
                                show: true,
                                background: "#40475D",
                                strokeWidth: "10%",
                                opacity: 1,
                                margin: 3 // margin is in pixels 
                            },
                            dataLabels: {
                                show: false,
                                name: {
                                    show: true,
                                    fontSize: '22px',
                                    fontFamily: undefined,
                                    color: undefined,
                                    offsetY: 0
                                },
                                value: {
                                    show: false,
                                    fontSize: '16px',
                                    fontFamily: undefined,
                                    color: '#ffff',
                                    offsetY: 0,
                                    formatter: function(val) {
                                        return val + '%'
                                    }
                                },
                                total: {
                                    show: false,
                                    label: 'BTC',
                                    color: '#F0F8FF',
                                    offsetY: 10,
                                    offsetX: 0,
                                    formatter: function(w) {
                                        console.log(w);
                                        return w
                                    }
                                }
                            }
                        }
                    },
                    colors: [allocationColor, '#ded727'],
                    labels: ['Allocation', 'Target'],
                }
            },
            prefix(purchaseType) {
                let prefix = (purchaseType == "SELL") ? "" : "+";
                return prefix
            },
            colorToHex(color) {
                if (color.substr(0, 1) === '#') {
                    return color;
                }
                var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

                var red = parseInt(digits[2]);
                var green = parseInt(digits[3]);
                var blue = parseInt(digits[4]);

                var rgb = blue | (green << 8) | (red << 16);
                return digits[1] + '#' + rgb.toString(16).padStart(6, '0');
            },
        },
        data: function() {
            return {
                // **************** */
                longName: null,
                portfolioValue: null,
                coinPrice: null,
                coinValue: null,
                colorBlock: 'red',
                coinName: 'Bitcoin (BTC)',
                buyColor: 'green',
                value: 'N/A',
                buyOrSell: "BUY",
                valueFromTarget: null,
                tradeAmount: null,
                targetValue: 'N/A',
                allocation: 'N/A',
                etc: 'N/A',
                // **************** */
                series: [80, 20],
                chartOptions: null,
            }
        }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
    .logo {
        position: relative;
        top: 20%;
        left: 20%;
    }

    .box .apexcharts-xaxistooltip {
        background: #1b213b;
        color: #fff;
    }

    .content-area {
        max-width: 1280px;
        margin: 0 auto;
    }

    .columnbox {
        padding-right: 15px;
    }

    .radialbox {
        max-height: 333px;
        margin-bottom: 60px;
    }

    .apexcharts-legend-series tspan:nth-child(3) {
        font-weight: bold;
        font-size: 20px;
    }

    .square {
        height: 15px;
        width: 7px;
        position: relative;
    }

    .pointer {
        cursor: pointer;
        z-index: 10;
    }

    .square {
        height: 15px;
        width: 7px;
        position: relative;
    }

    /* webkit solution */
    ::-webkit-input-placeholder {
        text-align: right;
    }

    /* mozilla solution */
    input:-moz-placeholder {
        text-align: right;
    }

    .scrollable {
        border: rgb(0, 0, 0);
        border-style: solid;
        height: 210px;
        overflow-x: hidden;
        overflow-y: scroll;
    }

   .innerImg {
        font-weight: bolder;
        font-size:25px;
        position: absolute;
        text-align: center;
        top: 3.1em;
        margin-left: auto;
        margin-right: auto;
        left: 365px;
        right: 0;
        z-index: 15;
    }
    
#container {
    margin: 0 auto;
    padding: 0;
    position: relative;
}
#myid {
    position: absolute;
    left: 50%;
    right: 50%;
    margin-left: -1280px;
    margin-right: -1280px;
}
#fast-back {
    position: relative;
    margin-left: 15%;
    /*it moves even using pixel*/
    top: 72px;
    text-align: center;
    width: 126px;
}
    .wrapper {
    margin:auto;
    position: relative;
    top:-65px;
    }

</style>