<template>
    <div class="wrapper">
        <b-row>
            <b-col col sm="6">
                <div class="title" style="margin-left:-85%;margin-top:-25px;margin-bottom:45px;white-space:nowrap;position:relative;top:20px;">Top 10 Allocated Assets</div>
                <div style="position:relative; top: -25px; left: -25%;">
                    <div class="container2">
                        <div class="center">
                            <span class="innerImg">
                                <label v-show="label == false" class="exchangeEmblem">{{coin}}</label>
                            </span>
                            <div class="all">
                                <div class="circle2 circlein"></div>
                                <PieChart :pieChartData="allocationData" style="width: 250px;" />
                            </div>
                        </div>
                    </div>

                </div>
            </b-col>
            <b-col col sm="6" style="position:relative; margin-top:70px;z-index:100;">
                <b-row>
                    <b-col col sm="6" xl="6" class="assetSpace">
                        <div class="space" v-if="0 in allocationData" v-on:click="updateGraph(allocationData[0]), changeTableRow(allocationData[0])">
                            <CoinAllocationDisplay style="cursor:pointer" :highlight="'false'" :logoSide="'left'" :coinData="allocationData[0]"></CoinAllocationDisplay>
                        </div>
                        <div class="space" v-if="1 in allocationData" v-on:click="updateGraph(allocationData[1]), changeTableRow(allocationData[1])">
                            <CoinAllocationDisplay style="cursor:pointer" :highlight="'false'" :logoSide="'left'" :coinData="allocationData[1]"></CoinAllocationDisplay>
                        </div>
                        <div class="space" v-if="2 in allocationData" v-on:click="updateGraph(allocationData[2]), changeTableRow(allocationData[2])">
                            <CoinAllocationDisplay style="cursor:pointer" :highlight="'false'" :logoSide="'left'" :coinData="allocationData[2]"></CoinAllocationDisplay>
                        </div>
                        <div class="space" v-if="3 in allocationData" v-on:click="updateGraph(allocationData[3]), changeTableRow(allocationData[3])">
                            <CoinAllocationDisplay style="cursor:pointer" :highlight="'false'" :logoSide="'left'" :coinData="allocationData[3]"></CoinAllocationDisplay>
                        </div>
                        <div class="space" v-if="4 in allocationData" v-on:click="updateGraph(allocationData[4]), changeTableRow(allocationData[4])">
                            <CoinAllocationDisplay style="cursor:pointer" :highlight="'false'" :logoSide="'left'" :coinData="allocationData[4]"></CoinAllocationDisplay>
                        </div>
                    </b-col>
                    <b-col col sm="6" xl="6" style="padding-left:30%;">
                        <div class="space" v-if="5 in allocationData" v-on:click="updateGraph(allocationData[5]), changeTableRow(allocationData[5])">
                            <CoinAllocationDisplay style="cursor:pointer" :highlight="'false'" :logoSide="'left'" :coinData="allocationData[5]"></CoinAllocationDisplay>
                        </div>
                        <div class="space" v-if="6 in allocationData" v-on:click="updateGraph(allocationData[6]), changeTableRow(allocationData[6])">
                            <CoinAllocationDisplay style="cursor:pointer" :highlight="'false'" :logoSide="'left'" :coinData="allocationData[6]"></CoinAllocationDisplay>
                        </div>
                        <div class="space" v-if="7 in allocationData" v-on:click="updateGraph(allocationData[7]), changeTableRow(allocationData[7])">
                            <CoinAllocationDisplay style="cursor:pointer" :highlight="'false'" :logoSide="'left'" :coinData="allocationData[7]"></CoinAllocationDisplay>
                        </div>
                        <div class="space" v-if="8 in allocationData" v-on:click="updateGraph(allocationData[8]), changeTableRow(allocationData[8])">
                            <CoinAllocationDisplay style="cursor:pointer" :highlight="'false'" :logoSide="'left'" :coinData="allocationData[8]"></CoinAllocationDisplay>
                        </div>
                        <div class="space" v-if="9 in allocationData" v-on:click="updateGraph(allocationData[9]), changeTableRow(allocationData[9])">
                            <CoinAllocationDisplay style="cursor:pointer" :highlight="'false'" :logoSide="'left'" :coinData="allocationData[9]"></CoinAllocationDisplay>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <div v-if="10 in allocationData" style="white-space:nowrap;  font-style: italic; margin-top:-5.5%;margin-left:-67%;z-index:50;" class="title">
                    <span v-if="allocationData[10].AllocationPercentage > 0.99">Other: {{allocationData[10].AllocationPercentage}}% ({{allocationData[10].assetsInOther}} Assets)</span>
                </div>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    /* eslint-disable */
    import PieChart from "~/components/assetAllocationChart/AssetAllocationChart"
    import CoinAllocationDisplay from "~/components/assetAllocationChart/CoinAllocationDisplay"


    export default {
        name: 'AssetAllocation',
        data() {
            return {
                label: false,
                mobileSize: {
                    'position': 'relative',
                    "font-size": "21px",
                    top: '0px',
                    fontColor: 'white'
                },
                donutConfig: false,
                biggerAllocationRow: 6,
                loading: false,
                coinUrl: '/cryptocurrency-icons/svg/color/btc.svg',
                coin: "BTC",
                color: "test",
                assets: [],
                assetNumbers: 0,
                allocationData: null,
            }
        },
        components: {
            PieChart,
            CoinAllocationDisplay
        },
        methods: {
            toggleMobile(value) {
                this.$store.commit('toggleMobile', value);
            },
            updateGraph(data) {
                this.coin = data.symbol;
                if (this.$store.state.allowClick == false) {
                    return
                }
                let that = this;
                if (that.loading == true) {
                    return
                }
                var sendData = {
                    'block_color': data.Color,
                    'Coin': data.Coin,
                    'symbol': data.symbol
                };
                that.loading = true;
                that.$nuxt.$emit('getNewTimeFrame', "ONEDAY", sendData);
                that.$nuxt.$emit('updateFromAsset', data);
                that.coinUrl = '/cryptocurrency-icons/svg/color/' + data.symbol.toLowerCase() + '.svg';
                setTimeout(function() {
                    that.loading = false;
                }, 4000)
            },
            changeTableRow(data) {
                if (this.$store.state.allowClick == false) {
                    return
                }
                let that = this;
                if (that.loading == true) {
                    return
                }
                that.loading = true;
                let sendData = {
                    coin: data.Coin,
                    color: data.Color,
                    name: data.symbol
                };
                that.$nuxt.$emit('updateFromPerformers', sendData);
                setTimeout(function() {
                    that.loading = false;
                }, 4000)
            },
            getAssets() {
                for (var elem in this.allocationData) {
                    if (this.allocationData[elem].AllocationPercentage <= 0 && this.allocationData[elem].symbol != 'Other') {
                        this.assets.push(this.allocationData[elem].AllocationPercentage);
                    }
                }
            }
        },
        created() {
            this.$nuxt.$on("donutDataUpdate", (donutData) => {
                this.coinUrl = '/cryptocurrency-icons/svg/color/' + donutData.name.toLowerCase() + '.svg'
                this.coin = donutData.name
                this.color = donutData.color
            });
            this.allocationData = JSON.parse(JSON.stringify(this.$store.state.generalData.coinAllocation));
            this.getAssets()
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .center {
        text-align: center;
    }

    .donuthor {
        position: relative;
        right: -20%;
    }

    .wrapper {
        margin-left: auto;
        margin-right: auto;
        max-width: 80%;

    }

    .wrapper2 {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
    }

    .all {
        margin-top: 16px;
    }

    .text {
        font-family: 'Montserrat', sans-serif;
        font-size: 13px;
        font-weight: bold;
        color: white;
        z-index: 6;
        white-space: nowrap;
        margin-left: 0%;
    }

    .imgSize {
        height: 160%;
        width: 160%;
    }

    .pushBack {
        z-index: -1;
    }

    .leftT {
        position: relative;
        top: -25px;
        left: -15%;
        padding-left: 11%;
        z-index: 5;
    }

    .circle2 {
        position: absolute;
        background: rgba(0, 0, 0, 0.904);
        width: 200px;
        height: 200px;
        border-radius: 50%;
        z-index: 3;
        left: 66px;
        top: 83px;
    }

    .innerImg {
        font-weight: bolder;
        font-size: 25px;
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        z-index: 15;
        display: inline-block;
    }

    .outerText {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 115px;
        top: 138px;
        font-weight: bold;
        z-index: 8;
        font-size: 20px;
    }

    .box {
        background: rgba(0, 0, 0, 0.568);
    }

    .space {
        margin-bottom: 5px;
    }

    .container2 {
        display: block;
        width: 256px;
        height: 260px;
        overflow: hidden;
        position: relative;
    }

    .container2 .center {
        display: block;
        padding: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        -o-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background: rgb(0, 0, 0);
        text-align: center;
    }

    .exchangeEmblem {
        top: 7.5rem;
        left: -45%;
    }
</style>