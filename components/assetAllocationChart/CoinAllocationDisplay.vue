<template>
    <div v-if="coin != null" class="Allocation">
        <b-container style="position:relative;top:-33px;">
            <b-row>
                <div class="nowrap" v-show="select_coin===false">
                    <b-col v-show="side === 'left'">
                        <img style="right: 95%;" class="Logo" :src="$emblem(coin.symbol)" onerror="this.src='/cryptocurrency-icons/svg/white/other2.svg'" width="32px;" />
                    </b-col>
                    <b-col>
                        <div>
                            <div style="float:left;">
                                <span style="float:left;" class="Percent">{{coin.AllocationPercentage}}%</span>
                                <br>
                                <span style="float:left;" v-if="coin.symbol != 'Other'">{{coin.symbol}}</span>
                                <span style="float:left;" v-else>{{coin.symbol}}</span>
                            </div>
                            <br>
                            <div v-show="highlight === 'false'" :style="grad" style="margin-top:15px;" class="bar"></div>
                        </div>
                        <div v-show="highlight === 'true'" :style="full" style="margin-top:15px;" class="bar"></div>
                    </b-col>
                    <div class="logoWrap">
                        <b-col v-show="side === 'right'">
                            <img v-show="coin.symbol != 'Other'" class="Logo2" :src="$emblem(coin.symbol)" onerror="this.src='/cryptocurrency-icons/svg/white/other2.svg'" width="32px" />
                        </b-col>
                    </div>
                </div>
                <div class="nowrap" v-if="select_coin===true">

                    <b-col v-show="side === 'left'">
                        <img style="right: 95%;" class="Logo" :src="$emblem(coin.symbol)" onerror="this.src='/cryptocurrency-icons/svg/color/other2.svg'" width="32px;" />
                    </b-col>
                    <b-col>
                        <div>
                            <div style="float:left;">
                                <span style="float:left;" class="Percent">{{coin.AllocationPercentage}}%</span>
                                <br>
                                <span style="float:left;" v-if="coin.symbol != 'Other'">{{coin.symbol}}</span>
                                <span style="float:left;" v-else>{{coin.symbol}}</span>
                            </div>
                            <br>
                            <div v-show="highlight === 'false'" :style="grad2" style="margin-top:15px;" class="bar"></div>
                        </div>
                        <div v-if="highlight === 'true'" :style="full" style="margin-top:15px;" class="bar"></div>
                    </b-col>
                    <div class="logoWrap">
                        <b-col v-if="side === 'right'">
                            <img v-show="coin.symbol != 'Other'" class="Logo2" :src="$emblem(coin.symbol)" onerror="this.src='/cryptocurrency-icons/svg/white/other2.svg'" width="32px" />
                        </b-col>
                    </div>
                </div>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    /* eslint-disable */
    export default {
        props: ['coinData', 'logoSide', 'highlight'],
        watch: {
            highlight() {
                if (this.alertVisible && !this.visible) this.show()
                else if (!this.alertVisible && this.visible) this.hide()
            }
        },
        name: 'CoinAllocationDisplay',
        data() {
            return {
                select_coin: false,
                coin: null,
                side: null,
                full: null,
                grad: null,
                grad2: null
            }
        },
        mounted() {
            this.coin = this.coinData,
                this.side = this.logoSide,
                this.full = "background: " + this.coinData.Color + ";",
                this.grad = "background: linear-gradient(270deg, rgb(0, 0, 0) 0, rgb(0, 0, 0) 20%, " + this.coinData.Color + ", " + this.coinData.Color + " 100%), rgb(0,0,0);",
                this.grad2 = "background: " + this.coinData.Color
            this.$nuxt.$on("donutDataUpdate", (donutData) => {
                if (donutData.name == this.coin.symbol) {
                    this.select_coin = true;
                } else {
                    this.select_coin = false;
                }
            })
            this.$nuxt.$on("updateFromPerformers", (donutData) => {
                if (donutData.name == this.coin.symbol) {
                    this.select_coin = true;
                } else {
                    this.select_coin = false;
                }
            })
            this.$nuxt.$on("updateFromAsset", (donutData) => {

                if (donutData.symbol == this.coin.symbol) {
                    this.select_coin = true;
                } else {
                    this.select_coin = false;
                }
            })
            this.$nuxt.$on("getNewTimeFrame", (timeframe, data) => {
                if (data.symbol == 'total') {
                    this.select_coin = false;
                }
            })
        },
        created() {

        },
        methods: {

        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .logoWrap {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
    }

    #wrapper {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
    }

    .Allocation {
        font-family: 'Roboto', sans-serif;
        font-size: 11px;
        color: white;
        text-align: left;
    }

    .Percent {
        font-size: 14px;
        position: relative;
        top: 5px;
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-weight: bold;
    }

    .Name {
        position: relative;
    }

    .Logo {
        position: absolute;
        top: 8px;
    }

    .Logo2 {
        position: relative;
        top: -40px;

    }

    .bar {
        top: 3px;
        width: 75px;
        height: 5px;
        border: none;
        position: relative;
        -webkit-border-radius: 56px;
        border-radius: 56px;
        color: rgba(255, 255, 255, 1);
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        z-index: 6;
    }

    .nowrap {
        white-space: nowrap;
    }

    .space {
        margin-bottom: -25px;
    }
</style>