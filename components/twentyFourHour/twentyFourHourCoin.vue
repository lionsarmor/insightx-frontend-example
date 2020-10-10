<template>
<div class="tableContainer">
<div class="tableItem titleComponent">
<strong>Asset List</strong>
</div>
<div class="tableItem searchComponent">
<input v-model="filter" class="searchType" placeholder="   Search" />
</div>
<div class="tableItem tableComponent">
<b-table small @sort-changed="sortingChanged" :items="finalList" :fields="fields" :filter="filter" v-on:row-clicked="rowClicked" class="tabletext my-table-scroll4">
                <template slot="HEAD_Coin" slot-scope="item">
                    <div class="table-labels">
                        Asset
                    </div>
                </template>
                <template slot="HEAD_Amount" slot-scope="item">
                    <div class="dropdown">
                        <button class="dropbtn nowrap table-labels" style="font-weight: bold;">{{balOrallo}} ▼</button>
                        <div class="dropdown-content">
                            <a @click.stop v-on:click="allocation_sort('allocation', setFiat )">Allocation%</a>
                            <a @click.stop v-on:click="allocation_sort('balance', setFiat)">Balance</a>
                        </div>
                    </div>
                </template>
                <template slot="HEAD_Price" slot-scope="item">
                    <div class="dropdown">
                        <button class="dropbtn nowrap table-labels" style="font-weight: bold;">Price ({{pick_currency_Price}}) ▼</button>
                        <div class="dropdown-content">
                            <a @click.stop v-on:click="getCurrency('usdprice', 'usdvalue'), setFiat = 'usd'">{{defaultFiat}}</a>
                            <a @click.stop v-on:click="getCurrency('btcprice', 'btcvalue'), setFiat = 'btc'">BTC</a>
                        </div>
                    </div>
                </template>
                <template slot="HEAD_Value" slot-scope="item">
                    <div class="dropdown">
                        <button class="dropbtn nowrap table-labels" style="font-weight: bold;">Value ({{pick_currency_Value}}) ▼</button>
                        <div class="dropdown-content">
                            <a @click.stop v-on:click="getCurrency('usdprice', 'usdvalue')">{{defaultFiat}}</a>
                            <a @click.stop v-on:click="getCurrency('btcprice', 'btcvalue')">BTC</a>
                        </div>
                    </div>
                </template>
                <template slot="HEAD_twentyfourchange" slot-scope="item">
                    <div class="dropdown">
                        <button class="dropbtn nowrap table-labels" style="font-weight: bold;">{{changeLabel}} ▼</button>
                        <div class="dropdown-content">
                            <a @click.stop v-on:click="percentIntervalSet('onehourchange','1h')">1h</a>
                            <a @click.stop v-on:click="percentIntervalSet('twentyfourchange','24h')">24h</a>
                            <a @click.stop v-on:click="percentIntervalSet('sevendaychange', '7d')">7d</a>
                        </div>
                    </div>
                </template>

                <template slot="twentyfourchange" scope="item">
                    <span class="tabletext perLine" :style="getColor(item.value)">{{getPrefix(Number.parseFloat(item.value).toFixed(2))}}%</span>
                </template>

                <template slot="Coin" scope="item">
                    <span :style="{ 'white-space': 'nowrap'}" class="float-left tabletext">
                         <div v-if="mobile1 == false" :style="{'background-color': item.item.block_color, 'float':'left'}" class="square"></div>
                         {{item.value}}
                          </span>
                </template>

                <template slot="Amount" scope="item">
                    <span :style="{ 'white-space': 'nowrap'}" class="float-right tabletext"> {{checkZero(Number.parseFloat(item.value), 'usd')}}<a v-if="balOrallo == 'Allocation%'">%</a> </span>
                </template>

                <template slot="Value" scope="item">
                    <span :style="{ 'white-space': 'nowrap'}" class="float-right tabletext"> {{checkZero(Number.parseFloat(item.value), setFiat)}} </span>
                </template>

                <template slot="Price" scope="item">
                    <span :style="{'white-space': 'nowrap'}" class="float-right tabletext"> {{checkZero(Number.parseFloat(item.value), setFiat)}} </span>
                </template>
            </b-table>
</div>

</div>
</template>

<script>
    /* eslint-disable */
    import { mapState } from 'vuex'

    export default {
        name: 'twentyFourHourCoin',
        props: ['balanceData', 'defaultFiat'],
        watch: {
            rawData: function() {
                this.loadTable(this.rawData)
            },
            globalPriceKeyForceRender: function() {
                this.clearTable()
                this.loadTable(this.rawData)
            }
        },
        computed: {
            ...mapState({
                rawData: state => state.generalData.balances.global,
                globalPriceKeyForceRender: state => state.globalPriceKeyForceRender
            }),
        },
        data() {
            return {
                mobile1: false,
                mobileSize: {overflowX : 'scroll', overflowY : 'scroll'},
                setFiat: 'usd',
                charge: '',
                balOrallo: 'Balance',
                choppedName: {},
                pick_currency_Price: this.defaultFiat,
                pick_currency_Value: this.defaultFiat,
                finalList: [],
                temp_list: [],
                fiat: this.defaultFiat,
                filter: null,
                percentInterval: 'twentyfourchange',
                changeLabel: '24h',
                colors: {
                    'red': 'color3'
                },
                rowstyle: {},

                fields: [
                    {
                        key: 'Coin',
                        sortable: true,
                    },
                    {
                        key: 'Amount',
                        sortable: true
                    },
                    {
                        key: 'Value',
                        sortable: true
                    },
                    {
                        key: 'Price',
                        sortable: true
                    },
                    {
                        label: '24H',
                        key: 'twentyfourchange',
                        sortable: true,
                    },
                ]
            }
        },
        created() {

        },
    methods: {
    getColor (num) {
    var iNum = parseFloat(num);
    if (iNum < 0) {
      return {'color': 'red'}
    } else{
      return {'color':'green'}
    }},
            getPrefix(val){
            if(val < 0){
                return val
            }else{
                return '+' + val.toString();
            }
            },
            checkZero(num, type) {
                if (isNaN(num) || num == 0) {
                    return "-"
                }
                let percision = (num < 1  && type != "btc") ?  6 : (type == "btc") ? 8:2;
                let number = num.toLocaleString('en', { maximumFractionDigits: percision, minimumFractionDigits: percision})
                return number
            },
            sortingChanged(ctx) {
                this.sortTable(ctx.sortBy, ctx.sortDesc);
            },
            sortTable(title, order) {
                if (title != 'Coin') {
                    if (order == false) {
                        this.temp_list.sort((a, b) => parseFloat(a[title]) - parseFloat(b[title]));
                    } else {
                        this.temp_list.sort((a, b) => parseFloat(b[title]) - parseFloat(a[title]));
                    }
                } else {
                    if (order == false) {
                        this.temp_list.sort((a, b) => a[title].localeCompare(b[title]));
                    } else {
                        this.temp_list.sort((a, b) => b[title].localeCompare(a[title]));
                    }
                }
            },
            clearTable() {
                this.finalList = []
            },
            getCurrency(price, value) {
                this.finalList = [];
                var color = ''
                let that = this;

                if (that.balOrallo == 'Balance'){
                for (var eachItem in this.rawData) {
                    if (eachItem != 'computed') {
                        if (price == 'btcprice') {
                            that.pick_currency_Price = 'BTC'
                            that.pick_currency_Value = 'BTC'
                            that.setFiat = 'btc'
                            var newprice = "btcprice"
                            var newvalue = "btcvalue"
                            var percentageChange = this.percentInterval
                        } else {
                            var newprice = this.defaultFiat.toLowerCase()+"price"
                            var newvalue = this.defaultFiat.toLowerCase()+"value"
                            that.pick_currency_Price = this.defaultFiat
                            that.pick_currency_Value = this.defaultFiat
                            that.setFiat = 'usd'
                            var percentageChange = this.defaultFiat.toLowerCase()+this.percentInterval
                        }
                        if (this.rawData[eachItem][percentageChange] < 0) {
                            color = 'rgb(255, 73, 73)';
                        } else {
                            color = 'rgb(51, 148, 59)';
                        }
                        that.finalList.push({
                            isActive: true,
                            Coin: this.rawData[eachItem].Coin,
                            symbol: eachItem,
                            Amount: this.rawData[eachItem].Amount,
                            Value: this.rawData[eachItem][newvalue],
                            Price: this.rawData[eachItem][newprice],
                            twentyfourchange:this.rawData[eachItem][percentageChange],
                            color: color,
                            block_color: this.rawData[eachItem].Color,
                            _rowVariant: "dark2"
                        })
                    }
                }
                this.temp_list = (this.finalList);
            } else {
                                for (var eachItem in this.rawData) {
                    if (eachItem != 'computed') {
                        if (price == 'btcprice') {
                            that.pick_currency_Price = 'BTC'
                            that.pick_currency_Value = 'BTC'
                            var newprice = "btcprice"
                            var newvalue = "btcvalue"
                            that.setFiat = 'btc'
                            var percentageChange = this.percentInterval
                        } else {
                            var newprice = this.defaultFiat.toLowerCase()+"price"
                            var newvalue = this.defaultFiat.toLowerCase()+"value"
                            that.pick_currency_Price = this.defaultFiat
                            that.setFiat = 'usd'
                            that.pick_currency_Value = this.defaultFiat
                            var percentageChange = this.defaultFiat.toLowerCase()+this.percentInterval
                        }
                        if (this.rawData[eachItem][percentageChange] < 0) {
                            color = 'rgb(255, 73, 73)';
                        } else {
                            color = 'rgb(51, 148, 59)';
                        }
                        that.finalList.push({
                            isActive: true,
                            Coin: this.rawData[eachItem].Coin,
                            symbol: eachItem,
                            Amount: Number.parseFloat(this.rawData[eachItem].AllocationPercentage).toFixed(2),
                            Value: this.checkZero(Number.parseFloat(this.rawData[eachItem][newvalue]), that.setFiat),
                            Price: this.checkZero(Number.parseFloat(this.rawData[eachItem][newprice]), that.setFiat),
                            twentyfourchange: Number.parseFloat(this.rawData[eachItem][percentageChange]).toFixed(2),
                            color: color,
                            block_color: this.rawData[eachItem].Color,
                            _rowVariant: "dark2"
                        })
                    }
                }
                this.temp_list = (this.finalList);
            }
            },
            percentIntervalSet(interval, label) {
                this.finalList = [];
                var color = ''
                let that = this;
                this.percentInterval = interval
                this.changeLabel = label
                if (that.balOrallo == 'Balance') {
                    var setting = 'Amount'
                } else {
                    var setting = 'AllocationPercentage'
                }
                if (this.setFiat == 'btc'){
                var fiatprice = 'btcprice';
                var fiatvalue = 'btcvalue';
                this.pick_currency_Price = 'BTC'
                var percentageChange = this.percentInterval
                }else{
                var fiatprice = this.defaultFiat.toLowerCase()+"price"
                var fiatvalue = this.defaultFiat.toLowerCase()+"value"
                this.pick_currency_Price = this.defaultFiat;
                var percentageChange = this.defaultFiat.toLowerCase()+this.percentInterval
                }
                for (var eachItem in this.rawData) {
                    if (eachItem != 'computed') {        
                        var thisAmount = this.rawData[eachItem][setting]
                        that.finalList.push({
                            isActive: true,
                            Coin: this.rawData[eachItem].Coin,
                            symbol: eachItem,
                            Amount: thisAmount,
                            Value: this.rawData[eachItem][fiatvalue],
                            Price: this.rawData[eachItem][fiatprice],
                            twentyfourchange: this.rawData[eachItem][percentageChange],
                            block_color: this.rawData[eachItem].Color,
                            _rowVariant: "dark2"
                        })
                    }
                }
                this.temp_list = (this.finalList);
            },
              allocation_sort(settings, fiat) {
                let that = this;
                let thisAmount = 0;
                this.finalList = [];
                var setting = settings
                if (setting == 'balance') {
                    setting = 'Amount'
                    that.balOrallo = 'Balance'
                } else {
                    setting = 'AllocationPercentage'
                    that.balOrallo = 'Allocation%'
                }
                if (fiat == 'btc'){
                var fiatprice = 'btcprice';
                var fiatvalue = 'btcvalue';
                this.pick_currency_Price = 'BTC'
                var percentageChange = this.percentInterval
                }else{
                var fiatprice = this.defaultFiat.toLowerCase()+"price"
                var fiatvalue = this.defaultFiat.toLowerCase()+"value"
                this.pick_currency_Price = this.defaultFiat;
                var percentageChange = this.defaultFiat.toLowerCase()+this.percentInterval
                }
                for (var eachItem in this.rawData) {
                    if (eachItem != 'computed') {
                        if (setting != 'balance'){           
                            thisAmount = this.rawData[eachItem][setting]
                        } else {
                            thisAmount = this.rawData[eachItem][setting]
                        }
                        that.finalList.push({
                            isActive: true,
                            Coin: this.rawData[eachItem].Coin,
                            symbol: eachItem,
                            Amount: thisAmount,
                            Value: this.rawData[eachItem][fiatvalue],
                            Price: this.rawData[eachItem][fiatprice],
                            twentyfourchange: this.rawData[eachItem][percentageChange],
                            block_color: this.rawData[eachItem].Color,
                            _rowVariant: "dark2"
                        })
                    }
                }
                this.temp_list = (this.finalList);
            },
            rowClicked(item, index) {
                if(this.$store.state.allowClick == false){
                    return
                }
                for (var eachItems in this.finalList) {
                    this.finalList[eachItems]._rowVariant = "dark2";
                }
                let hasLongName = this.finalList[index].Coin.indexOf('(');
                if (hasLongName >= 0){
                var symbol1 = this.finalList[index].Coin.split("(");
                var symbol2 = symbol1[1].replace(")", "")
                var name = symbol2;
                }else{
                var symbol2 = this.finalList[index].Coin; 
                var name = symbol2;
                }
                this.$parent.selected = symbol2;
                var color = this.finalList[index].color;            
                var sendData = {
                    'name': name,
                    'color': color
                };
                this.$nuxt.$emit('updateFromAsset', sendData);
                this.$nuxt.$emit('updateFromPerformers', sendData);
                this.$nuxt.$emit('updateFromTwentyFour', sendData);
                this.$nuxt.$emit('getNewTimeFrame', "ONEDAY", this.finalList[index])
                var that = this
            },
            loadTable(payload){
                            let that = this
                            this.$nuxt.$on("getNewTimeFrame", (timeframe, data) => {
                            if(data.symbol == 'total'){
                                for (var eachItems in this.finalList) {
                                    this.finalList[eachItems]._rowVariant = "dark2";
                                }
                            }
                            })
                            this.$nuxt.$on("updateFromAsset", (donutData) => {
                                    for (var eachItems in this.finalList) {
                                    this.finalList[eachItems]._rowVariant = "dark2";
                                if(this.finalList[eachItems].symbol == donutData.symbol){
                                        this.finalList[eachItems]._rowVariant = "dark3";
                                    }
                                }               
                            })
                            this.$nuxt.$on("updateFromPerformers", (perfData) => {
                                for (var eachItems in this.finalList) {
                                    this.finalList[eachItems]._rowVariant = "dark2";
                                }
                                for (var elem in this.finalList) {
                                    if (perfData.name == this.finalList[elem].symbol) {
                                        this.finalList[elem]._rowVariant = "";
                                        this.finalList[elem]._rowVariant = "dark3"
                                    }
                                }
                            })
                            var color = ''
                            var fiatprice = this.defaultFiat.toLowerCase()+"price"
                            var fiatvalue = this.defaultFiat.toLowerCase()+"value"
                            var percentageChange = this.defaultFiat.toLowerCase()+this.percentInterval
                            for (var eachItem in payload) {
                                if (eachItem != 'computed') {
                                    if (payload[eachItem][percentageChange] < 0) {
                                        color = 'rgb(255, 73, 73)';
                                    } else {
                                        color = 'rgb(51, 148, 59)';
                                    }
                                        that.finalList.push({
                                            isActive: true,
                                            Coin: payload[eachItem].Coin,
                                            symbol: eachItem,
                                            Amount: payload[eachItem].Amount,
                                            Value: payload[eachItem][fiatvalue],
                                            Price: payload[eachItem][fiatprice],
                                            twentyfourchange: payload[eachItem][percentageChange],
                                            color: color,
                                            block_color: payload[eachItem].Color,
                                            _rowVariant: "dark2"
                                        })
                                }
                            }
                            this.temp_list = this.finalList;
                }
        },
        mounted() {
            this.loadTable(this.rawData)
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #price {
        z-index: 5;
        position: absolute;
        right: 100px;
        top: 5px;
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
.perLine{
    position: relative;
    top:-3.5px;
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
        left:-10px;
    }

    .gray {
        background-color: rgb(32, 32, 32);
    }

    .searchType {
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

    .borderblck {
      border: red;
      border-width: 1px;
      border-top-width: 4px;
      border-style: solid;
    }

    .square2 {
        height: 10px;
        width: 1200px;
        position: relative;
        background: rgb(0, 0, 0);
        top: 1px;
        z-index: 5;
    }

 
    /* width */
::-webkit-scrollbar {
    width: 7px !important;
}

/* Track */
::-webkit-scrollbar-track {
    background: #000000; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    background: rgb(77, 72, 72); 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: rgb(0, 0, 0); 
}
.wrapper{
    height: 329px;
    overflow: hidden;
}
.tableItem {
    display: grid;
    background-color: rgba(137, 43, 226, 0);
}
    @media (min-width: 1750px) {
        .tableContainer{
          display: grid;
          grid-template-columns: repeat(4, minmax(auto, 1fr));
          grid-template-areas: 
          "titleComponent titleComponent searchComponent searchComponent"
          "tableComponent tableComponent tableComponent tableComponent"
        }
    }
        .titleComponent {
            grid-area: titleComponent;
            position: relative;
            margin-right:auto;
        }
        .searchComponent {
            grid-area: searchComponent;
            position: relative;
            margin-left:auto;
        }
        .tableComponent {
            grid-area: tableComponent;
        }
</style>