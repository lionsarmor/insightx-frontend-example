<template>
    <div v-if="bannerValues" class="containerBANNER">
        <div class="itemBanner title">
            <h4>{{bannerValues[0].coinName}}</h4>
        </div>
        <div class="itemBanner amountTitle">
            <strong>Amount:</strong>
        </div>
        <div class="itemBanner amountValue">
            <div class="valColor">{{bannerValues[0].amount}}</div>
        </div>
        <div class="itemBanner usdTitle">
            <strong>Value (USD): </strong>
        </div>
        <div class="itemBanner usdValue">
            <div class="valColor">{{bannerValues[0].usdValue}}</div>
        </div>
        <div class="itemBanner btcTitle">
            <strong>Value (BTC): </strong>
        </div>
        <div class="itemBanner btcValue">
            <div class="valColor"> {{bannerValues[0].btcValue}}</div>
        </div>
        <div class="itemBanner changeTitle">
            <strong>% Change:</strong>
        </div>
        <div class="itemBanner changeValue">
            <div class="valColor" :style="getColor(bannerValues[0].change)">{{plusOrMinus}}{{bannerValues[0].change}}%</div>
        </div>
        <div class="itemBanner allocationTitle">
            <strong style="margin-right:5px;">Portfolio Allocation %: </strong>
        </div>
        <div class="itemBanner allocationValue">
            <div class="valColor"> {{bannerValues[0].allocation}}% </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TradingChart',
        data() {
            return {
                plusOrMinus: '',
                bannerValues: null,
                coinBannerData: {
                    'ada': {
                        'coinBannerLogo': 'ada',
                        'coinBannerText': 'Cardano (ADA)',
                        'amount': '24258.58',
                        'costBasisBtc': '020525.257',
                        'valueBtc': '020525.257',
                        'changeBtc': '17.43',
                        'changeUsd': '17.43',
                        'portfolioAllo': '32.54',
                        'costBasisUsd': '514.25',
                        'valueUsd': '7800.35'
                    },
                    'btc': {
                        'coinBannerLogo': 'btc',
                        'coinBannerText': 'Bitcoin (BTC)',
                        'amount': '24258.58',
                        'costBasisBtc': '020525.257',
                        'valueBtc': '020525.257',
                        'changeBtc': '-17.43',
                        'changeUsd': '17.43',
                        'portfolioAllo': '32.54',
                        'costBasisUsd': '514.25',
                        'valueUsd': '7800.35'
                    },
                    'eth': {
                        'coinBannerLogo': 'eth',
                        'coinBannerText': 'Etherium (eth)',
                        'amount': '24258.58',
                        'costBasisBtc': '020525.257',
                        'valueBtc': '020525.257',
                        'changeBtc': '17.43',
                        'changeUsd': '17.43',
                        'portfolioAllo': '32.54',
                        'costBasisUsd': '514.25',
                        'valueUsd': '7800.35'
                    },
                    'dmd': {
                        'coinBannerLogo': 'dmd',
                        'coinBannerText': 'Diamond (DMD)',
                        'amount': '24258.58',
                        'costBasisBtc': '020525.257',
                        'valueBtc': '020525.257',
                        'changeBtc': '17.43',
                        'changeUsd': '17.43',
                        'portfolioAllo': '32.54',
                        'costBasisUsd': '514.25',
                        'valueUsd': '7800.35'
                    },
                    'xrp': {
                        'coinBannerLogo': 'xrp',
                        'coinBannerText': 'Ripple (XRP)',
                        'amount': '24258.58',
                        'costBasisBtc': '020525.257',
                        'valueBtc': '020525.257',
                        'changeBtc': '17.43',
                        'changeUsd': '17.43',
                        'portfolioAllo': '32.54',
                        'costBasisUsd': '514.25',
                        'valueUsd': '7800.35'
                    },
                },
                coinBanner2: [],
            }
        },
        methods: {
            getColor(num) {
                var that = this;
                var iNum = parseFloat(num);
                if (iNum < 0) {
                    that.plusOrMinus = '';
                    return {
                        color: 'red'
                    }
                } else {
                    that.plusOrMinus = '+';
                    return {
                        color: 'green'
                    }
                }
            },
            pushBannerOnLoad() {
                this.coinBanner2 = this.coinBannerData.btc;
            },
            pushBanner(name) {
                this.coinBanner2 = this.coinBannerData[name.toString()];
            },
        },
        created() {
            this.$nuxt.$on("coinsBanner", (data) => {
                if (!data) {
                    return
                }
                this.bannerValues = [];
                this.bannerValues.push({
                    'coinName': data.coinName,
                    'allocation': data.allocation,
                    'btcPrice': data.btcPrice,
                    'btcValue': data.btcValue,
                    'usdValue': data.usdValue,
                    'logo': data.logo,
                    'coins': data.coins,
                    'costBasis': data.costBasis,
                    'costBasisBtc': data.costBasisBtc,
                    'amount': data.amount,
                    'value': data.value,
                    'price': data.price,
                    'change': data.twentyfourChange,
                });
                this.$nuxt.$emit('centerUpdate', this.bannerValues);
            })
        },
    }
</script>
