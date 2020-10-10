<template>
    <div class="bg">
        <b-row>
            <b-col>
                <div style="float:left;position:relative; top:16px;z-index:100;white-space:nowrap;">
                    <button v-if="watchorbal == true" type="button" @click.stop v-on:click="watchorbal = true,swapTableCSS('watchlist'), switchTable(fields), getWatchList()" variant="primary" class="btn-fil-blue">Watchlist</button>
                    <button v-if="watchorbal == false" type="button" @click.stop v-on:click="watchorbal = true,swapTableCSS('watchlist'),  switchTable(fields), getWatchList()" variant="primary" class="btn-fil-blue2">Watchlist</button>
                    <button v-if="watchorbal == true && isLoading == false" type="button" @click.stop v-on:click="getBalanceTableData()" variant="primary" class="btn-fil-blue2">Balances</button>
                    <button v-if="watchorbal == false" type="button" @click.stop v-on:click="getBalanceTableData()" variant="primary" class="btn-fil-blue">Balances</button>
                    <button v-if="watchorbal == true && isLoading == true" type="button" @click.stop variant="primary" class="btn-fil-blue">Loading...</button>
                    <button v-if="watchorbal == false && balanceMode == 'ExchangeValue'" type="button" @click.stop v-on:click="balanceMode = 'ExchangeValue', getBalances()" variant="primary" class="btn-fil-white2">Exchange Value</button>
                    <button v-if="watchorbal == false && balanceMode != 'ExchangeValue'" type="button" @click.stop v-on:click="balanceMode = 'ExchangeValue', getBalances()" variant="primary" class="btn-fil-white">Exchange Value</button>
                    <button v-if="watchorbal == false && balanceMode == 'GlobalValue'" type="button" @click.stop v-on:click="balanceMode = 'GlobalValue', getBalances()" variant="primary" class="btn-fil-white2">Global Value</button>
                    <button v-if="watchorbal == false && balanceMode != 'GlobalValue'" type="button" @click.stop v-on:click="balanceMode = 'GlobalValue', getBalances()" variant="primary" class="btn-fil-white">Global Value</button>
                    <button v-if="watchorbal == false && balanceMode == 'Price'" type="button" @click.stop v-on:click="balanceMode = 'Price', getBalances()" variant="primary" class="btn-fil-white2">Price</button>
                    <button v-if="watchorbal == false && balanceMode != 'Price'" type="button" @click.stop v-on:click="balanceMode = 'Price', getBalances()" variant="primary" class="btn-fil-white">Price</button>
                    <button style="position:relative;top:3px;font-size:11px;" v-if="watchorbal == true" type="button" @click="toggleAddWatchlistModal('open');" variant="primary" class="btn-fil">Add</button>
                    <input v-if="watchorbal == true" v-model="search" class="watchlist-search" placeholder="Search" />
                    <input v-if="watchorbal == false" v-model="search" class="watchlist-search" style="top:3px;" placeholder="Search" />
                    <button style="position:relative;top:3px;font-size:11px;" v-if="watchorbal == false" type="button" @click="toggleEditWatchlistModal('open');" variant="primary" class="btn-fil">Edit Manual Balance</button>

                </div>
                <div style="position: relative; top:10px;">

                    <!--- ************watchlist Table******************* -->
                    <div>
                        <b-table id="watch" small striped hover :items="items" :fields="modField" :filter="search" hover1 class="tabletext my-table-scroll5" style="white-space: nowrap;">

                            <template slot="HEAD_Market" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="table-labels">
                                    Markets
                                </div>
                            </template>

                            <template slot="HEAD_Exchange" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="dropdown">
                                    <button class="dropbtn nowrap table-labels">Exchange ▼</button>
                                    <div class="dropdown-content">
                                        <a href="#" @click.stop v-on:click="getWatchList()">All</a>
                                        <!-- <a href="#" @click.stop v-on:click="filterExchange('bittrex')">Bittrex</a>
                                        <a href="#" @click.stop v-on:click="filterExchange('binance')">Bittrex</a>
                                        <a href="#" @click.stop v-on:click="filterExchange('coinbase')">Coinbase Pro</a>-->
                                        <a href="#" v-for="item in dropdownExchanges" :key="item.id" @click.stop v-on:click="filterExchange(item)">{{item}}</a>
                                    </div>
                                </div>
                            </template>
                            <template slot="HEAD_Price" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="dropdown">
                                    <button class="dropbtn nowrap table-labels" style="position:relative; top:5px; background-color: transparent;">Price</button>
                                </div>
                            </template>

                            <template slot="HEAD_Change" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="table-labels">
                                    Change
                                </div>
                            </template>

                            <template slot="HEAD_Trend" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="table-labels float-left">
                                    7-Day Trend
                                </div>
                            </template>

                            <template slot="Icons" scope="item">
                                <div class="nowrap">
                                    <img :src="$emblem(item.item.Icons)" onerror="this.src='/cryptocurrency-icons/svg/white/other.svg'" width="20px" />
                                </div>
                            </template>
                            <template slot="Coins" scope="item">
                                <div class="nowrap float-left tabletext">
                                    {{item.item.Coins}}
                                </div>
                            </template>
                            <template slot="Market" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="nowrap">
                                    <span style="float:left;position:relative;left:0px;"><img :src="$emblem(item.item.icons)" class="watchlist-icons" onerror="this.src='/cryptocurrency-icons/svg/black/other.svg'" width="25px" /></span>
                                </div>
                                <div class="tabletext text-right">
                                    {{item.value}}
                                </div>
                            </template>
                            <template slot="Exchange" scope="item">
                                <div class="nowrap float-right tabletext">
                                    {{item.item.Exchange}}
                                </div>
                            </template>
                            <template slot="Price" scope="item">
                                <div class="nowrap tabletext float-right">
                                    {{ifUSD(item)}}
                                </div>
                            </template>
                            <template slot="Change" scope="item">
                                <div class="nowrap float-right tabletext">
                                    {{item.item.Change}}
                                </div>
                            </template>
                            <template slot="delete" scope="item">
                                <div class="nowrap" style="position:relative;float:left;">
                                    <span v-on:click="watchExchanges = item.item.Exchange, watchBase = item.item.Market, deleteWatchList()" style="cursor: pointer;"><img :src="'/other/delete.svg'" class="watchlist-icons" width="30px" /></span>
                                </div>
                            </template>
                            <template slot="Change" scope="item">
                                <div class="nowrap tabletext">
                                    <span :style="getColor(item.value)">{{ifPercent(item.value)}}</span>
                                </div>
                            </template>
                            <template slot="Trend" scope="item">
                                <trend v-if="item.item.Change < 0" class="trends" stroke-width="3" :data="item.item.trends" :gradient="['#da1e2d', '#da1e2d', '#da1e2d']" :height="25" :width="77" auto-draw>
                                </trend>
                                <trend v-if="item.item.Change >= 0" class="trends" stroke-width="3" :data="item.item.trends" :gradient="['#00b672', '#00b672', '#00b672']" :height="25" :width="77" auto-draw>
                                </trend>
                            </template>
                            <!-- ************************ balances ************************ -->
                            <template slot="HEAD_coins" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="table-labels">
                                    Coins
                                </div>
                            </template>
                            <template slot="HEAD_exchangeBal" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="table-labels">
                                    Exchange
                                </div>
                            </template>
                            <template slot="HEAD_amount" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="table-labels">
                                    Amount
                                </div>
                            </template>

                            <template slot="HEAD_btcvalue" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="dropdown">
                                    <button class="dropbtn nowrap table-labels">{{column1}} ▼</button>
                                    <div class="dropdown-content">
                                        <!--<a href="#" @click.stop v-for="i in balanceColumns.one" :key="i" v-on:click="getBalances(i,'one')">{{i}}</a>-->
                                    </div>
                                </div>
                            </template>

                            <template slot="HEAD_ethvalue" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="dropdown">
                                    <button class="dropbtn nowrap table-labels">{{column2}} ▼</button>
                                    <div class="dropdown-content">
                                        <a href="#" @click.stop v-for="i in balanceColumns.two" :key="i" v-on:click="getBalances(i, 'two')">{{i}}</a>
                                    </div>
                                </div>
                            </template>

                            <template slot="HEAD_usdtvalue" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="dropdown">
                                    <button class="dropbtn nowrap table-labels">{{column3}} ▼</button>
                                    <div class="dropdown-content">
                                        <a href="#" @click.stop v-for="i in balanceColumns.three" :key="i" v-on:click="getBalances(i, 'three')">{{i}}</a>
                                    </div>
                                </div>
                            </template>

                            <template slot="HEAD_usdvalue" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="dropdown">
                                    <button class="dropbtn nowrap table-labels">{{column4}} ▼</button>
                                    <div class="dropdown-content">
                                        <a href="#" @click.stop v-for="i in balanceColumns.four" :key="i" v-on:click="getBalances(i, 'four')">{{i}}</a>
                                    </div>
                                </div>
                            </template>

                            <template slot="coins" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="nowrap" style="float:left;">
                                    <span><img :src="$emblem(item.item.coins)" class="watchlist-icons" onerror="this.src='/cryptocurrency-icons/svg/black/other.svg'" width="25px" /></span>
                                </div>
                                <div class="tabletext">
                                    {{item.value}}
                                </div>
                            </template>
                            <template slot="exchangeBal" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="tabletext">
                                    {{item.value}}
                                </div>
                            </template>
                            <template slot="amount" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="tabletext float-right">
                                    {{item.value}}
                                </div>
                            </template>

                            <template slot="btcvalue" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="tabletext float-right">
                                    {{item.value}}
                                </div>
                            </template>

                            <template slot="ethvalue" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="tabletext float-right">
                                    {{item.value}}
                                </div>
                            </template>

                            <template slot="usdtvalue" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="tabletext float-right">
                                    {{item.value}}
                                </div>
                            </template>

                            <template slot="usdvalue" slot-scope="item">
                                <!-- A custom formatted header cell for field 'name' -->
                                <div class="tabletext float-right">
                                    {{item.value}}
                                </div>
                            </template>
                        </b-table>
                    </div>
                </div>

                <!-- Modal Component ADD TO WATCHLIST -->
                <div style="z-index: 99;">
                    <b-modal v-model="addWatchlist" title="Add To Watchlist" :header-bg-variant="headerBgVariant" :body-bg-variant="bodyBgVariant" :body-text-variant="bodyTextVariant" :footer-bg-variant="footerBgVariant" :footer-text-variant="footerTextVariant">
                        <b-row>
                            <b-col cols="12">
                                <b-form inline>
                                    <b-container>
                                        <b-row>
                                            <b-col cols="4">
                                                <b-input-group>
                                                    <input v-on:keyup="predictiveBase('base')" v-model="watchBase" type="text" list="coins" placeholder="BASE" style="width:70%" />
                                                    <datalist id="coins">
                                                        <option v-for="items in predictCoinData" :value="items" :key="items" />
                                                    </datalist>
                                                </b-input-group>
                                            </b-col>

                                            <b-col cols="4">
                                                <b-input-group>
                                                    <input v-on:keyup="predictiveBase('counter')" v-model="watchCounter" type="text" list="coins" placeholder="COUNTER" style="width:70%" />
                                                    <datalist id="coins">
                                                        <option v-for="items in predictCoinData" :value="items" :key="items" />
                                                    </datalist>
                                                </b-input-group>
                                            </b-col>
                                            <b-col cols="4">
                                                <b-form-select class="black-form" size="sm" v-model="watchExchanges" :options="allExchanges" />
                                            </b-col>
                                        </b-row>
                                    </b-container>
                                </b-form>
                            </b-col>
                        </b-row>
                        <br>
                        <div slot="modal-header" class="w-100">
                            <h5>Add To Watchlist</h5>
                        </div>
                        <div slot="modal-footer" class="w-100">
                            <!--  <b-btn size="sm" class="float-left" variant="secondary" v-on:click="addWatchlist = false">
                        CLOSE
                    </b-btn>-->
                            <button size="sm" class="btn-fil-blue2" v-on:click="addWatchlist = false, addWatchList()"><span style="padding:5px;">SAVE</span></button>
                        </div>
                    </b-modal>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import {
        mapActions
    } from 'vuex'

    export default {
        props: ['balanceData', 'balanceColumns', 'defaultFiat'],
        name: 'Watchlist',

        data() {
            return {
                allExchanges: [{
                        text: 'EXCHANGE',
                        value: null
                    },
                    {
                        text: 'Bittrex',
                        value: 'Bittrex'
                    },
                    {
                        text: 'Coinbase Pro',
                        value: 'Coinbase'
                    },
                    {
                        text: 'Binance',
                        value: 'binance'
                    },

                ],
                isLoading: false,
                firstBalanceTableSwitch: true,
                dropdownExchanges: this.$store.state.userAddedExchanges,
                manualExchangeList: [],
                currentFiat: null,
                endpoint: this.$store.state.apiEndPoint,
                watchListTable: [],
                balances: this.balanceData,
                predictCoinData: null,
                // coinList: this.allTheCoins,
                modField: null,
                from: '',
                addWatchlist: false,
                watchBase: '',
                watchCounter: '',
                watchExchanges: null,
                to: '',
                search: '',
                watchorbal: true,
                show: false,
                filter: null,
                balanceMode: "ExchangeValue",
                column1: this.balanceColumns.one[0],
                column2: this.balanceColumns.two[0],
                column3: this.balanceColumns.three[0],
                column4: this.balanceColumns.four[0],
                fields: [{
                        key: 'Market',
                        label: "Markets",
                        sortable: true
                    },
                    {
                        key: "Exchange",
                        label: "Exchange",
                        sortable: true
                    },
                    {
                        key: "Price",
                        label: 'Price',
                        sortable: true
                    },
                    {
                        key: "Change",
                        label: "Change",
                        sortable: true
                    },
                    {
                        key: "Trend",
                        label: "7-day Trend",
                    },
                    {
                        key: 'delete',
                        label: "",
                        sortable: true
                    },

                ],

                items: [],
                variants: [
                    'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'black'
                ],
                addedMarkets: [],
                marketModel: '',
                headerBgVariant: 'black',
                bodyBgVariant: 'black',
                bodyTextVariant: 'light',
                footerBgVariant: 'black',
                footerTextVariant: 'light',
                selected: [], // Must be an array reference!
                options: [{
                        text: 'BITTREX',
                        value: 'bittrex'
                    },
                    {
                        text: 'Coinbase Pro',
                        value: 'coinbase'
                    },
                    {
                        text: 'CRYPTOPIA',
                        value: 'cryptopia'
                    },
                    {
                        text: 'BINANCE',
                        value: 'binance'
                    }
                ],
            }
        },
        computed: {
            ...mapState({
                watchListVal: state => state.watchList
            }),
        },
        watch: {
            watchListVal: function() {
                this.getWatchList();
            }
        },
        methods: {
            createMutable(data){
                let mutableData = JSON.parse(JSON.stringify(data))
                return mutableData
            },
            toggleAddWatchlistModal(value) {
                this.$store.commit('modals/toggleAddWatchlist', value);
            },
            toggleEditWatchlistModal(value) {
                let balanceList = [];
                this.$store.commit('modals/toggleEditWatchlist', value);
                for (let elem in this.items) {
                    balanceList.push({
                        exchange: this.items[elem].exchangeBal,
                        asset: this.items[elem].coins,
                        amount: this.items[elem].amount,
                    });
                }
                this.$nuxt.$emit('passBalanceData', balanceList);
            },
            getBalanceTableData() {
            if (this.firstBalanceTableSwitch==true){
            this.isLoading = true
            let endPoint = "exchangeBalanceTable";
            let that = this;
            this.$insightfetch(endPoint).then(function(response) {
                that.$store.commit('updateBalanceTableObject', response.balanceChartData)
                that.balances = that.createMutable(that.$store.state.generalData.balances)
                that.firstBalanceTableSwitch = false
                that.watchorbal = false,
                that.isLoading = false
                that.swapTableCSS('balances')
                that.switchTable(that.getBalanceColumns())
                that.getBalances()
                })
            } else {
                let that = this
                that.watchorbal = false,
                that.swapTableCSS('balances')
                that.switchTable(that.getBalanceColumns())
                that.getBalances()
            }
            },            
            swapTableCSS(val) {
                if (val === 'watchlist') {
                    document.getElementById('watch').classList.remove('my-table-scroll12');
                    document.getElementById('watch').classList.add('my-table-scroll5');
                } else {
                    document.getElementById('watch').classList.remove('my-table-scroll5');
                    document.getElementById('watch').classList.add('my-table-scroll12');
                }
            },
            getBalanceColumns() {
                return [{
                        key: 'coins',
                        label: "Coins",
                    },
                    {
                        key: 'exchangeBal',
                        label: "Exchange",
                    },
                    {
                        key: 'amount',
                        label: "Amount",
                        sortable: true
                    },
                    {
                        key: "btcvalue",
                        label: this.column1,
                        sortable: true
                    },
                    {
                        key: "ethvalue",
                        label: this.column2,
                        sortable: true
                    },
                    {
                        key: "usdtvalue",
                        label: this.column3,
                        sortable: true
                    },
                    {
                        key: "usdvalue",
                        label: this.column4,
                        sortable: true
                    },

                ]
            },
            ifUSD(val) {
                if (val.item.icons == 'usd' || val.item.icons == 'usdt') {
                    if (val.item.Price == 0) {
                        return '-'
                    } else {
                        var newPrice = Number(val.item.Price).toFixed(2);
                    }
                    return newPrice
                } else {
                    return val.item.Price
                }
            },
            getColor(val) {
                if (val < 0) {
                    return {
                        'color': 'red',
                        'white-space': 'nowrap'
                    }
                } else if (val > 0) {
                    return {
                        'color': 'green',
                        'white-space': 'nowrap'
                    }
                } else {
                    return {
                        'color': 'white',
                        'white-space': 'nowrap'
                    }
                }
            },
            ifPercent(val) {
                if (val === 0) {
                    return '-'
                } else if (val != 0) {
                    if (val < 0) {
                        return Number(val.toFixed(2)) + '%'
                    } else {
                        return '+' + Number(val.toFixed(2)) + '%';
                    }
                }
            },
            checkZero(num) {
                if (isNaN(num) || num == 0) {
                    return "-"
                }
                if (num > 1) {
                    var percision = 4
                } else {
                    var percision = 8
                }
                return num.toLocaleString('en', {
                    maximumFractionDigits: percision,
                    minimumFractionDigits: percision
                })
            },
            checkZeroFiat(num) {
                if (isNaN(num) || num == 0) {
                    return "-"
                }
                return num.toLocaleString('en', {
                    style: 'currency',
                    currency: this.currentFiat
                })
            },
            filterExchange(val) {
                this.items = [];
                for (var exchange in this.watchListVal) {
                    for (var coin in this.watchListVal[exchange]) {
                        if (this.watchListVal[exchange][coin].exchange === val) {
                            this.items.push({
                                'icons': this.watchListVal[exchange][coin].symbol.toLowerCase(),
                                'Market': this.watchListVal[exchange][coin].market,
                                'Exchange': this.watchListVal[exchange][coin].displayName,
                                'Price': this.watchListVal[exchange][coin].price,
                                'Change': this.watchListVal[exchange][coin].priceChangePercent,
                                'favorite': this.watchListVal[exchange][coin].favorite,
                                _rowVariant: "dark2",
                                'trends': this.watchListVal[exchange][coin].trend
                            })
                        }
                    }
                }
            },
            predictiveBase(coinType) {
                let that = this;
                var toSend = null
                if (coinType === 'base') {
                    toSend = this.watchBase.toUpperCase()
                } else {
                    toSend = this.watchCounter.toUpperCase()
                }
                this.predictCoinData = [];
                var body = JSON.stringify({
                    'coin': toSend
                });
                setTimeout(function() {
                    if (that.watchBase.length > 0) {
                        let endPoint = "api/predictiveCoinList";
                        that.$insightfetch(endPoint, 'POST', body).then(function(response) {
                            that.predictCoinData = response.predictedCoins;
                        })
                    }
                }, 500);
            },
            deleteWatchList() {
                var that = this;
                var temp = this.watchBase.split("/");
                var base = temp[0].toUpperCase();
                var counter = temp[1].toUpperCase();
                var body = {
                    'exchange': this.watchExchanges,
                    'base': base,
                    'counter': counter,
                    'action': 'delete'
                }
                let endPoint = "api/updateWatchlist";
                this.$insightfetch(endPoint, 'POST', body, 'cors', 'same-origin', true).then(function(jsonResponse) {
                    that.watchListVal = jsonResponse.watchList;
                    that.getWatchList();
                    that.$store.commit('updateKey', {
                        'key': 'watchList',
                        'newData': that.watchListVal
                    })
                })
            },
            switchTable(val) {
                this.modField = val;
                return val;
            },
            sendStar(market, exchange) {
                var that = this;
                var body = {
                    'exchange': exchange,
                    'market': market
                };
                let endPoint = "api/updateFavorite";
                this.$insightfetch(endPoint, 'POST', body).then(function(jsonResponse) {
                    that.watchListVal = jsonResponse.watchList;
                    that.getWatchList();
                    that.$store.commit('updateKey', {
                        'key': 'watchList',
                        'newData': that.watchListVal
                    })
                })
            },
            applyFilter() {},
            getBalances(coin, column) {
                if (column == 'one') {
                    this.column1 = coin
                }
                if (column == 'two') {
                    this.column2 = coin
                }
                if (column == 'three') {
                    this.column3 = coin
                }
                if (column == 'four') {
                    this.column4 = coin
                }
                this.items = [];
                for (var exchange in this.balances) {
                    if (exchange != 'wallets' && exchange != 'global') {
                        for (var balance in this.balances[exchange]) {
                            try {
                                if (this.balanceMode != 'GlobalValue') {
                                    this.items.push({
                                        'coins': balance,
                                        'exchangeBal': exchange,
                                        'amount': this.checkZero(Number.parseFloat(this.balances[exchange][balance].Balance)),
                                        'usdvalue': this.checkZero(Number.parseFloat(this.balances[exchange][balance][this.balanceMode][this.column4])),
                                        'usdtvalue': this.checkZero(Number.parseFloat(this.balances[exchange][balance][this.balanceMode][this.column3])),
                                        'btcvalue': this.checkZero(Number.parseFloat(this.balances[exchange][balance][this.balanceMode][this.column1])),
                                        'ethvalue': this.checkZero(Number.parseFloat(this.balances[exchange][balance][this.balanceMode][this.column2])),
                                        _rowVariant: "dark2"
                                    })
                                } else {
                                    this.items.push({
                                        'coins': balance,
                                        'exchangeBal': exchange,
                                        'amount': this.checkZero(Number.parseFloat(this.balances[exchange][balance].Balance)),
                                        'usdvalue': this.checkZeroFiat(Number.parseFloat(this.balances[exchange][balance][this.balanceMode][this.defaultFiat][this.column4])),
                                        'usdtvalue': this.checkZeroFiat(Number.parseFloat(this.balances[exchange][balance][this.balanceMode][this.defaultFiat][this.column3])),
                                        'btcvalue': this.checkZeroFiat(Number.parseFloat(this.balances[exchange][balance][this.balanceMode][this.defaultFiat][this.column1])),
                                        'ethvalue': this.checkZeroFiat(Number.parseFloat(this.balances[exchange][balance][this.balanceMode][this.defaultFiat][this.column2])),
                                        _rowVariant: "dark2"
                                    })
                                }
                            } catch (e) {}
                        }
                    }
                }
            },
            getWatchList() {
                this.items = []
                this.modField = this.fields;
                for (let exchange in this.watchListVal) {
                    for (let coin in this.watchListVal[exchange]) {
                        try {
                            this.items.push({
                                'icons': this.watchListVal[exchange][coin].symbol.toLowerCase(),
                                'Market': this.watchListVal[exchange][coin].market,
                                'Exchange': this.watchListVal[exchange][coin].exchange,
                                'Price': this.watchListVal[exchange][coin].price,
                                'Change': this.watchListVal[exchange][coin].priceChangePercent,
                                'favorite': this.watchListVal[exchange][coin].favorite,
                                _rowVariant: "dark2",
                                'trends': this.watchListVal[exchange][coin].trend
                            })
                        } catch (e) {}
                    }
                }
            }
        },
        mounted() {
            this.currentFiat = this.defaultFiat
            this.getBalances('', '');
            this.getWatchList();
            this.switchTable(this.fields);
            for (let elem in this.$store.state.manualExchanges) {
                if (
                    this.$store.state.manualExchanges[elem] != 'bittrex' &&
                    this.$store.state.manualExchanges[elem] != 'bittrex' &&
                    this.$store.state.manualExchanges[elem] != 'coinbase'
                ) {
                    this.manualExchangeList.push(this.$store.state.manualExchanges[elem]);
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .btn-fil-white2 {
        color: rgb(0, 0, 0) !important;
        font-size: 10px !important;
        font-weight: bold;
        background-color: #ffffff !important;
        border-style: solid;
        border-width: 2px;
        border-color: #ffffff;
        border-radius: 25px;
        height: 27px;
        position: relative;
        top: 3px;
        cursor: pointer;
    }

    .btn-fil-white {
        color: white !important;
        background-color: #000000 !important;
        font-size: 10px !important;
        border-style: solid;
        border-width: 2px;
        border-color: #ffffff;
        border-radius: 25px;
        height: 27px;
        position: relative;
        top: 3px;
        cursor: pointer;
    }

    .btn-fil-blue {
        color: white !important;
        background-color: #047ea4 !important;
        font-size: 11px !important;
        border-style: solid;
        border-width: 2px;
        border-color: #047ea4;
        border-radius: 25px;
        height: 27px;
        position: relative;
        top: 3px;
        cursor: pointer;
    }

    .btn-fil-blue2 {
        color: white !important;
        background-color: #000000 !important;
        font-size: 11px !important;
        border-style: solid;
        border-width: 2px;
        border-color: #047ea4;
        border-radius: 25px;
        height: 27px;
        position: relative;
        top: 3px;
        cursor: pointer;
    }

    .filter-button {
        padding-left: 5px;
        padding-right: 5px;
        cursor: pointer;
    }

    .filter-button2 {
        padding-left: 20px;
        padding-right: 5px;
        cursor: pointer;
    }

    .filter-button3 {
        padding-left: 5px;
        padding-right: 50px;
        position: relative;
        left: -30%;
        cursor: pointer;
    }

    .hide-head {
        background-color: rgb(0, 0, 0);
        width: 100%;
        height: 9px;
    }

    .btn-fil {
        height: 27px !important;
        cursor: pointer;
    }

    .wrap-bar {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        margin-bottom: -20px;
        margin-top: 115px;
        z-index: 99;
    }

    .modal-but {
        background-color: black !important;
        border: none !important;
    }

    .black {
        color: black !important;
    }

    .watchlist-star {
        height: 15px;
        width: 15px;
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

    .btn-custom-primary {
        background: #047ea4;
        color: white;
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
        height: 25px;
        font-family: 'Montserrat', sans-serif;
        color: white;
        font-weight: bold;
        outline-style: none;
        position: relative;
        top: -18px !important;
        right: -8px;
        font-size: 11px !important;
        width: 80px !important;

    }

    .watchlist-search {
        position: relative;
        top: 2px;
        border: 2px solid rgb(255, 255, 255);
        background: black;
        border-radius: 25px;
        height: 25px;
        font-family: 'Montserrat', sans-serif;
        color: white;
        font-weight: bold;
        outline-style: none;
        font-size: 11px !important;
        width: 80px !important;
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
        width: 1000px;
        position: relative;
        background: rgb(0, 0, 0);
        top: 1px;
        z-index: 5;
    }

    .nowrap {
        white-space: nowrap;
    }

    .cursor {
        cursor: pointer;
    }

    input {
        border-radius: 5px;
        border-width: 1px;
        border: none;
    }

    .black-form {
        background: #1a1a1a;
        color: white;
    }
</style>