<template>
    <div class="bg" style="font-size: 14px;">
        <div class="hide-head" style="margin-top: 40px;"></div>
        <div v-if="exchangeData">
            <b-table small striped hover :fields="fields" :items="exchangeData" style="white-space: nowrap;" class="my-table-scrollMini">
                <template slot="Exchange" slot-scope="item">
                     <div class="exchangeEmblem">
        {{item.item.Exchange}}
      </div>
                </template>
                <template slot="Balance" slot-scope="item">
                    <!-- A custom formatted header cell for field 'name' -->
                    <div class="tabletext br"  style="position: relative;top:-7px;">
                        {{item.item.Balance}}
                    </div>
                </template>
                <template slot="CounterValue" slot-scope="item">
                    <!-- A custom formatted header cell for field 'name' -->
                    <div class="tabletext br" style="position: relative;top:-7px;">
                        {{item.value}}
                    </div>
                </template>
                <template slot="Price" slot-scope="item">
                    <!-- A custom formatted header cell for field 'name' -->
                    <div class="tabletext br" style="position: relative;top:-7px;">
                        {{item.item.Price}}
                    </div>
                </template>
                <template slot="Change" slot-scope="item">
                    <!-- A custom formatted header cell for field 'name' -->
                    <div class="tabletext br" style="position: relative;top:-7px;">
                        <span :style="{'color': getColor(item.item.PercentChange)}">{{item.item.PercentChange}}%</span>
                    </div>
                </template>
                <template slot="HEAD_Exchange" slot-scope="item">
                  <div class="table-labels">
                  Exchange
                  </div>
                </template>
                <template slot="HEAD_Change" slot-scope="item">
                    <!-- A custom formatted header cell for field 'name' -->
                    <div class="table-labels">
                        %Change
                    </div>
                </template>
                <template slot="HEAD_Balance" slot-scope="item">
                    <div class="table-labels">
                        Balance
                    </div>
                </template>
                <template slot="HEAD_CounterValue" slot-scope="item">
                    <div class="dropdown" @click.stop>
                        <button class="dropbtn nowrap table-labels" style="font-weight: bold;">Value ({{valueCounter}}) ▼</button>
                        <div class="dropdown-content">
                            <a v-on:click="value_sort('USD')">USD</a>
                            <a v-on:click="value_sort('BTC')">BTC</a>
                        </div>
                    </div>
                </template>
                <template slot="HEAD_Price" slot-scope="item">
                    <div class="dropdown" @click.stop>
                        <button class="dropbtn nowrap table-labels" style="font-weight: bold;">Price ({{priceCounter}}) ▼</button>
                        <div class="dropdown-content">
                            <a v-on:click="price_sort('USD')">USD</a>
                            <a v-on:click="price_sort('BTC')">BTC</a>
                        </div>
                    </div>
                </template>
            </b-table>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'

    export default {
        name: 'TradingChart',
        computed: {
            ...mapState({
                exchangesData: state => state.coins.exchangeData,
                exchangeCoinData: state => state.coins.exchangeCoinData,
                balances: state => state.coins.balanceData
            })
        },
        methods: {
            sortExchanges(value) {
                let temp_exchangeData = [];
                let that = this;
                temp_exchangeData.push(this.exchangeData);
                for (let item in that.temp_exchangeData) {
                    if (that.temp_exchangeData[item].Exchange == value) {
                        that.exchangeData.push(that.temp_exchangeData[item]);
                    }
                }
            },
            getColor(value) {
                if (value == '-') {
                    return
                }
                if (value >= 0) {
                    return 'green'
                } else {
                    return 'red'
                }
            },
            getBtcValue(exchange, coin = null) {
                if (!coin) {
                    coin = Object.keys(this.exchangeCoinData[exchange.toString()])[0]
                }
                let btcValue = Number(this.exchangeCoinData[exchange.toString()][coin]['Value']['BTC'])
                return Number.parseFloat(btcValue).toFixed(8)
            },
            getUsdValue(exchange, coin = null) {
                if (!coin) {
                    coin = Object.keys(this.exchangeCoinData[exchange.toString()])[0]
                }
                let usdValue = Number(this.exchangeCoinData[exchange.toString()][coin]['Value']['USD'])
                let fixed = (usdValue < 1) ? 4 : 2;
                return Number.parseFloat(usdValue).toFixed(fixed)
            },
            getPercentChange(exchange, coin = null) {
                if (!coin) {
                    coin = Object.keys(this.exchangeCoinData[exchange.toString()])[0]
                }
                let percentChange = Number(this.exchangeCoinData[exchange.toString()][coin]['PercentChange'])
                return Number.parseFloat(percentChange).toFixed(2)
            },
            getExchangeBalance(exchange, counter, coin = null) {
                if (!coin) {
                    coin = Object.keys(this.exchangeCoinData[exchange.toString()])[0]
                }
                let balance = Number(this.exchangeCoinData[exchange.toString()][coin]['Balance'])
                let fixed = (balance < 1 && counter != "BTC") ? 6 : (counter == "BTC") ? 8 : 2;
                return Number.parseFloat(balance).toFixed(fixed)
            },
            getPrice(exchange, counter, coin = null) {
                if (!coin) {
                    coin = Object.keys(this.exchangeCoinData[exchange.toString()])[0]
                }
                let price = Number(this.exchangeCoinData[exchange.toString()][coin]['Price'][counter.toString()])
                let fixed = (price < 1 && counter != "BTC") ? 6 : (counter == "BTC") ? 8 : 2;
                return Number.parseFloat(price).toFixed(fixed)
            },
            value_sort(val) {
                this.valueCounter = val
                for (var item in this.exchangeData) {
                    if (val == 'USD') {
                        this.exchangeData[item].CounterValue = this.exchangeData[item].ValueUSD
                    } else {
                        this.exchangeData[item].CounterValue = this.exchangeData[item].ValueBTC
                    }
                }
                if (this.priceCounter != val) {
                    this.price_sort(val)

                }
            },
            price_sort(val) {
                this.priceCounter = val
                for (var item in this.exchangeData) {
                    if (val == 'USD') {
                        this.exchangeData[item].Price = this.exchangeData[item].PriceUSD
                    } else {
                        this.exchangeData[item].Price = this.exchangeData[item].PriceBTC
                    }
                }
                if (this.valueCounter != val) {
                    this.value_sort(val)
                }
            },
            checkZero(num) {
                if (isNaN(num) || num == 0) {
                    return "-"
                }
                var number = num.toLocaleString('en')
                if (number.includes(".")) {
                    var parts = number.split(".")
                    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    return parts.join(".")
                } else {
                    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
            },
            pushToTmpData(logo, ex, vusd, vbtc, balance, price, percentChange, priceBtc) {
                this.exchangeDataTmp.push({
                    'logo': logo,
                    'Exchange': ex,
                    'CounterValue': vusd,
                    'ValueBTC': vbtc,
                    'ValueUSD': vusd,
                    'Balance': balance,
                    'Price': price,
                    'PriceUSD': price,
                    'PriceBTC': priceBtc,
                    'PercentChange': percentChange,
                    _rowVariant: "dark2"
                })
            },

            getExchange() {
                this.exchangeDataTmp = []
                for (var items in this.exchangesData) {
                    if (this.exchangesData[items].exchange != 'wallets') {
                        this.exchangeUrls[this.exchangesData[items].exchange] = this.exchangesData[items].logoURL
                        this.pushToTmpData(
                            this.exchangesData[items].logoURL,
                            this.exchangesData[items].exchange,
                            this.getUsdValue(this.exchangesData[items].exchange),
                            this.getBtcValue(this.exchangesData[items].exchange),
                            this.getExchangeBalance(this.exchangesData[items].exchange, 'BTC'),
                            this.getPrice(this.exchangesData[items].exchange, 'USD'),
                            this.getPercentChange(this.exchangesData[items].exchange),
                            this.getPrice(this.exchangesData[items].exchange, 'BTC'),
                        )
                        break;
                    }
                }
                this.exchangeData = this.exchangeDataTmp;
            },
        },
        data() {
            return {
                manualExchangeList: [],
                valueCounter: 'USD',
                priceCounter: 'USD',
                walletData: [],
                exchangeData: null,
                miniExchangeCoin: null,
                exchangeUrls: {},
                exchangeDataTmp: null,
                fields: [{
                        key: 'Exchange',
                        label: "Exchange",
                        sortable: true
                    },
                    {
                        key: 'Balance',
                        label: "Balance",
                        sortable: true
                    },
                    {
                        key: "CounterValue",
                        sortable: true
                    },
                    {
                        key: "Price",
                        label: 'Price',
                        sortable: true
                    },
                    {
                        key: "Change",
                        label: '%Change',
                        sortable: true
                    },
                ],
            }
        },
        mounted() {
            for (let elem in this.$store.state.manualExchanges) {
                if (
                    this.$store.state.manualExchanges[elem] != 'bittrex' &&
                    this.$store.state.manualExchanges[elem] != 'bittrex' &&
                    this.$store.state.manualExchanges[elem] != 'coinbase'
                ) {
                    this.manualExchangeList.push(this.$store.state.manualExchanges[elem]);
                }
            }
            this.$nuxt.$on("updateExchangeAndWallet", (coin) => {
                this.exchangeDataTmp = []
                this.exchangeData = []
                for (var exchange in this.exchangeCoinData) {
                    if (coin in this.exchangeCoinData[exchange]) {
                        let fileType = (exchange == 'bittrex') ? '.png' : '.svg';
                        this.pushToTmpData(
                            "/exchangelogos/" + exchange + fileType,
                            exchange,
                            this.getUsdValue(exchange, coin),
                            this.getBtcValue(exchange, coin),
                            this.getExchangeBalance(exchange, 'BTC', coin),
                            this.getPrice(exchange, 'USD', coin),
                            this.getPercentChange(exchange, coin),
                            this.getPrice(exchange, 'BTC', coin),
                        )
                    }
                }
                this.exchangeData = this.exchangeDataTmp
                this.value_sort('USD')
                this.price_sort('USD')
            })
            this.getExchange();

        },
        created() {},
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hide-head {
        background-color: rgb(0, 0, 0);
        width: 110%;
        height: 3px;
        position: absolute;
        top: -35px;
        z-index: 99;
    }

    .alloPercent {
        position: relative;
        ;
        z-index: 6;
        font-size: 12px;
        top: 12px;
        right: -30px;
    }

    [v-cloak]>* {
        display: none
    }

    [v-cloak]::before {
        content: "loading…"
    }

    .table-dark2:nth-child(odd) {
        background-color: rgb(10, 10, 10) !important;
        border: 3px solid rgba(54, 53, 53, 0.815);
        border-right: black;
        border-left: black;
    }

    .table-dark2:nth-child(even) {
        background-color: rgb(0, 0, 0) !important;
        border: 3px solid rgba(54, 53, 53, 0.815);
        border-right: black;
        border-left: black;
    }

    .table-wrap {
        height: 140px;
        width: 100%;
        position: relative;
        overflow: scroll;
        overflow-x: hidden;
        z-index: 1;
    }

    .bg {
        background-color: black;
    }

    .white {
        color: white;
    }

    .green {
        color: green;
    }

    .red {
        color: rgb(0, 17, 255);
    }

    .square {
        height: 22px;
        width: 7px;
        position: relative;
    }

    .gray {
        background-color: rgb(32, 32, 32);
    }

    .search {
        width: 100px;
        border: 2px solid rgb(204, 204, 204);
        background: transparent;
        border-radius: 25px;
        height: 30px;
        font-family: 'Montserrat', sans-serif;
        color: white;
        font-weight: bold;
        outline-style: none
    }

    * {
        outline-style: none
    }

    .br {
        margin-top: 12px;
    }

    .borderblack {
        background: black;
        position: relative;
        margin-top: 52px;
        z-index: 5;
    }

    .square2 {
        height: 10px;
        width: 1000px;
        position: relative;
        background: rgb(0, 0, 0);
        top: 1px;
        z-index: 5;
    }

    .binance {
        height: 100px;
        width: 100px;
        position: relative;
        top: -30px;
        margin-bottom: -60px;
    }

    .coinbase {
        height: 100px;
        width: 100px;
        position: relative;
        top: -30px;
        margin-bottom: -60px;
    }

    .bittrex {
        height: 40px;
        width: 100px;
    }

    .cryptopia {
        height: 40px;
        width: 80px;
    }

    .wrapper {
        margin-left: auto;
        margin-right: auto;
        width: 100px;
    }

    .donut-percent {
        position: relative;
        z-index: 5;
        margin-top: 3px;
        right: 20px;
    }

    <style scoped>#price {
        z-index: 5;
        position: absolute;
        right: 100px;
        top: 5px;
    }

    .wrapper {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
    }

    .font-sm {
        font-size: 13px;
        white-space: initial;
    }

    .bg {
        background-color: black;
    }

    .white {
        color: white;
    }

    .green {
        color: green;
    }

    .red {
        color: rgb(0, 17, 255);
    }

    .square {
        height: 22px;
        width: 7px;
        position: relative;
    }

    .gray {
        background-color: rgb(32, 32, 32);
    }

    .search {
        width: 90px;
        border: 2px solid rgb(204, 204, 204);
        background: transparent;
        border-radius: 25px;
        height: 30px;
        font-family: 'Montserrat', sans-serif;
        color: white;
        font-weight: bold;
        outline-style: none;
        font-size: 12px;
    }

    * {
        outline-style: none
    }

    .borderblack {
        background: black;
        position: relative;
        margin-top: 52px;
        z-index: 5;
    }

    .square2 {
        height: 10px;
        width: 1200px;
        position: relative;
        background: rgb(0, 0, 0);
        top: 1px;
        z-index: 5;
    }
</style>