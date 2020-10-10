<template>
    <div >
        <b-row>
            <b-col>
                <b-row>
                    <div style="margin-top:-90px;margin-left:60px;z-index:5;">
                        <div class="float-left d-block d-xl-block">
                            <span class="top-fil" style="font-size:14px;"><a class="thick"> Market cap: </a>
                                <span style="font-weight:normal;">{{Number(totalMarketCap.totalMarketCap).toLocaleString('en', {style: 'currency', currency: fiat})}}&emsp;&emsp;</span>
                                <a class="thick"> BTC Dominance:</a> <span style="font-weight:normal;">{{totalMarketCap.bitcoinPercentageDominance}}%&emsp;&emsp;</span>
                                <a class="thick"> Volume(24h):</a> <span style="font-weight:normal;">{{Number(totalMarketCap.totalVolume24h).toLocaleString('en', {style: 'currency', currency: fiat})}}</span></span>
                        </div>
                    </div>
                </b-row>
             <!--   <b-row>
                    <div class="wrapper pull-right footerStyle" style="font-size:14px;">
                        <span style="color:red;position:relative;right:-25px;">{{failedMessage}}</span>
                        <div>
                            <div class="dropdownTicker">
                                <button class="dropbtnTicker">{{perPageTicker}} &#9660;</button>
                                <div class="dropdown-contentTicker">
                                    <a @click="filterUpdate('perPage', 100)">100</a>
                                    <a @click="filterUpdate('perPage', 50)">50</a>
                                    <a @click="filterUpdate('perPage', 25)">25</a>
                                    <a @click="filterUpdate('perPage', 10)">10</a>
                                </div>
                            </div>
                            <div class="dropdownTicker">
                                <button class="dropbtnTicker">{{interval}} &#9660;</button>
                                <div class="dropdown-contentTicker">
                                    <a @click="filterUpdate('interval', '7 Days')">7 Days</a>
                                    <a @click="filterUpdate('interval', '24Hr')">24Hr</a>
                                    <a @click="filterUpdate('interval', '1Hr')">1Hr</a>
                                </div>
                            </div>
                            <div style="display:inline-block;position:relative;top:5px;">
                                <form>
                                    <input v-model="query" type="search" style="text-indent: 4px;" class="size" placeholder="Search..." />
                                    <button style="position:relative;top:-1px;" class="searchBtn" @click="searchByCoin()" type="button">
                                        <fa icon="search" /></button>
                                    <button style="position:relative;top:-1px;" class="searchBtn" @click="startLoop()" type="button">
                                        <fa icon="redo" /></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </b-row>-->
                <b-row>
                    <span>
                    <tickerScroll  />
                    </span>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import tickerScroll from '../../partials/newTickerDetailed/tickerScroll'
    /* eslint-disable */
    export default {
        data() {
            return {
                fiat: this.$store.state.defaultFiat,
                totalMarketCap: this.$store.state.generalData.globalMarketData.totalMarketCap,
                interval: "24Hr",
                perPageTicker: "25",
                exchangeTicker: "Global",
                query: '',
                failedMessage: "",
                endpoint: this.$store.state.apiEndPoint,
            }
        },
        methods: {
            searchByCoin: function() {
                let url = this.endpoint + 'api/searchTicker?interval=' + this.interval + '&coin=' + this.query.toUpperCase()
                var that = this
                fetch(url)
                    .then(res => res.json())
                    .then((out) => {
                        if (out.result == "failed") {
                            that.failedMessage = out.message
                        }
                        if (out.result == 'success') {
                            that.failedMessage = ""
                            that.$nuxt.$emit('searchedCoin', this.query.toUpperCase(), out.data)
                        }
                    })
                    .catch(err => {
                        throw err
                    })
            },
            filterUpdate: function(menu, action) {
                switch (menu) {
                    case 'perPage':
                        this.perPageTicker = action
                        break;
                    case 'interval':
                        this.interval = action
                        break;
                    case 'exchange':
                        this.exchangeTicker = action
                        break;
                }
                let url = this.endpoint + 'api/tickerfilterbar?menu=' + menu + '&perPage=' + this.perPageTicker + '&exchange=' + this.exchangeTicker + '&interval=' + this.interval
                let that = this
                fetch(url)
                    .then(res => res.json())
                    .then((out) => {
                        if (out.result == 'success') {
                            that.$nuxt.$emit('tickerData', out.data)
                        } else {
                            that.$toast.error("Failed to get json response", {icon: 'warning'} )
                        }
                    })
                    .catch(err => {
                        throw err
                    })
            }
        },
        mounted() {

        },
        components: {
            tickerScroll
        },
    }
</script>
