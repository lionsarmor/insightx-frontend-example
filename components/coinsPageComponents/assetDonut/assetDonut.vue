    <template>
    <div class="wrapper">
        <div id="chart">
        <div style="position:relative;top:100px;z-index:-50;">
        <h4 v-if="coinName == null" style="font-weight:bold;">{{numberAssets}} Assets</h4>
        <h4 v-if="coinName != null" style="font-weight:bold;">{{coinName}}</h4>
        <h5><img src="/other/money.png" width="12px" >
        <a style="color:#047ea4;">{{totalUSD}}</a></h5>
        <h5  style=""><img  src="/other/bitcoin.png" width="15px" >
        <a style="color:#047ea4">{{totalBTC}}</a></h5>
        </div>
        <div style="margin-top:-150px;">
        <DonutChart2 v-if="load" :series="series" :colors="colors" :width="350" :height="350" />
        </div>
        </div>
    </div>
</template>

<script>
    import DonutChart2 from '~/components/coinsPageComponents/assetDonut/assetDonutChart'
    import { mapState, mapActions } from 'vuex'
    import { VUEX_SET_SELECTED_COIN } from '~/store/constants/coins'

    export default {
        data() {
            return {
                numberAssets:0,
                totalUSD: 'N/A ',
                totalBTC: 'N/A ',
                loading: false,
                coinName: null,
                barData : this.alloBar,
                load: false,
                series: [50, 50],
                colors: ["green", "blue"],
                }
        },
        computed:{
            ...mapState({
                globalBalances: state => state.coins.globalBalances
            })
        },
        mounted() {
            this.$nuxt.$on("centerUpdate", (data) => {
                this.totalUSD = data[0].usdValue;
                this.totalBTC = data[0].btcValue;
                this.coinName = data[0].coinName;
                this.setSelectedCoin(data[0].logo)
            })
            this.backupColors = []
            var tmp_series = []
            var tmp_colors = []
            for (var coin in this.globalBalances.global){
                if (coin != 'computed'){
                this.numberAssets += 1
                tmp_series.push(this.globalBalances.global[coin].AllocationPercentage)
                let rgbaColor = this.rgbaConvert(this.globalBalances.global[coin].Color);
                tmp_colors.push(rgbaColor);
                this.backupColors.push(rgbaColor);
                }
            }
            this.totalUSD = this.globalBalances.global.computed.combinedusdTotal
            this.totalBTC = this.globalBalances.global.computed.combinedbtcTotal
            this.series = tmp_series
            this.colors = tmp_colors
            this.load = true
            this.$nuxt.$on("sliceUpdate", (index) => {
             let that = this;
            for (var item in that.colors) {
                that.colors[item] = that.backupColors[item];
                }
            for (var elem in that.colors) {
                if ( that.colors[elem] == that.colors[index]){
                that.colors[index] = that.brighten(that.colors[index])
                }
            }
            });
        },
        components: {
            DonutChart2
        },
        methods: {
            ...mapActions({
                setSelectedCoin: `coins/${VUEX_SET_SELECTED_COIN}`
            }),
            brighten(val){
            let a = val.split('(');
            let b = a[1].split(')');
            let c = b[0].split(', 0.5');
            let value = c[0]
            let final = 'rgba('+value+')';
            return final
            },
            rgbaConvert(color){
            let a = color.split('(');
            let b = a[1].split(')');
            let value = b[0];
            let finalColor = 'rgba('+value+', 0.5)';
            return finalColor
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wrapper {
    margin:auto;
    position: relative;
    top:15px;
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
</style>