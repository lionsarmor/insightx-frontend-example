<template>
    <div class="bg">
        <b-row>
            <b-col>
                <!-- Modal Component ADD TO WATCHLIST -->
                <div>
                    <b-modal centered id="editWatchlist" v-model="$store.state.modals.editWatchlist" title="Edit Manual Exchange" :header-bg-variant="headerBgVariant" :body-bg-variant="bodyBgVariant" :body-text-variant="bodyTextVariant" :footer-bg-variant="footerBgVariant" :footer-text-variant="footerTextVariant" @hide="toggleEditWatchlistModal()">
                        <b-row>
                            <b-col cols="12">
                                <b-form inline>
                                    <b-container>
                                        <b-container>
                                            <b-row>
                                                <b-col>
                                                    <div style="text-align:left;">Exchange</div><!-- only user added exchanges -->
                                                    <div style="display:inline;">
                                                        <b-input-group>
                                                            <input v-model="exchange" v-on:click="exchange = null, asset = null, balance = null, checkExchange = false" id="exchangeBalance" list="ItemsExchange" size="lg" type="text" style="width:100%;border-radius:5px;border:none;" placeholder="EX: Binance">
                                                            <datalist id="ItemsExchange">
                                                                <option v-for="elem in predictExchangeList" :value="elem" :key="elem" />
                                                            </datalist>
                                                        </b-input-group>
                                                    </div>
                                                    <br>
                                                    <div style="text-align:left;">Asset</div>
                                                    <!--Drop down of ONLY CURRENT assets in the user's balance table for the chosen exchange-->
                                                    <div style="display:inline;">
                                                        <b-input-group>
                                                            <input v-model="asset" id="assetBalance" list="assetItems" size="lg" type="text" style="width:100%;border-radius:5px;border:none;" placeholder="EX: BTC">
                                                            <datalist id="assetItems">
                                                                <option v-for="elem in predictAssetList" :value="elem" :key="elem" />
                                                            </datalist>
                                                        </b-input-group>
                                                    </div>
                                                    <br>
                                                    <div style="text-align:left;">Current Balance</div><!--  The balance that the user is holding for that chose asset on the chosen exchange. Not editable -->
                                                    <div style="display:inline;">
                                                        <input disabled type="text" style="width:100%;border-radius:5px;border:none;" v-model="balance" placeholder="Current Available Balance">
                                                    </div>
                                                    <br>
                                                    <br>
                                                    <div style="text-align:left;">Amount</div>
                                                    <div style="display:inline;">
                                                        <input type="text" style="width:100%;border-radius:5px;border:none;" v-model="amount" placeholder="Edit Balance">
                                                    </div>
                                                </b-col>
                                            </b-row>
                                        </b-container>
                                    </b-container>
                                </b-form>
                            </b-col>
                        </b-row>
                        <br>
                        <div slot="modal-footer" class="w-100">
                            <b-btn size="sm" class="float-left btn-fil-red" variant="secondary" @click="$root.$emit('bv::hide::modal','editWatchlist')">CANCEL</b-btn>
                            <button size="sm" class="float-right btn-fil-blue2" v-on:click="passManualEditData(), toggleConfirmManualModal('open')">EDIT BALANCE</button>
                        </div>
                        <div slot="modal-header" class="w-100">
                            <h5>Edit Maunual Exchange</h5>
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
    } from 'vuex';
    import {
        mapActions
    } from 'vuex';

    export default {
        data() {
            return {
                variants: [
                    'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'black'
                ],
                checkExchange: false,
                exchange: null,
                asset: null,
                balance: null,
                amount: null,
                balancesAssetData: null,
                predictExchangeList: [],
                predictAssetList: [],
                headerBgVariant: 'black',
                bodyBgVariant: 'black',
                bodyTextVariant: 'light',
                footerBgVariant: 'black',
                footerTextVariant: 'light',
            }
        },
        computed: {
            ...mapState({
                watchListVal: state => state.watchList
            }),
        },
        watch: {
            asset: function() {
                this.getAmount();
            },
            exchange: function(){
                this.setPredictiveAssets();
            }
        },
        mounted() {
            this.$nuxt.$on("passBalanceData", (data) => {
                this.setPredictiveLists(data);
                this.balancesAssetData = data;
                this.passManualEditData()
            });
        },
        methods: {
            passManualEditData() {
                let data = {
                    exchange: this.exchange,
                    asset: this.asset,
                    currentAvailableBalance: this.balance,
                    editBalance: this.amount
                }
            this.$store.commit('modals/editManualBalnceData', data);
            },
            toggleEditWatchlistModal(value) {
                this.$store.commit('modals/toggleEditWatchlist');
            },
            toggleConfirmManualModal(value) {
                this.$store.commit('modals/toggleConfirmManualModal');
            },
            setPredictiveAssets() {
                if (this.checkExchange == true) {
                    return
                }
                let that = this;
                for (let asset in this.balancesAssetData) {
                    if (that.predictAssetList.indexOf(this.balancesAssetData[asset].asset) == -1) {
                        if (this.balancesAssetData[asset].exchange == that.exchange) {
                            that.predictAssetList.push(this.balancesAssetData[asset].asset);
                        }
                    }
                }
                that.checkExchange = true;
            },
            setPredictiveLists(data) {
                let that = this;
                for (let elem in data) {
                    if (that.predictExchangeList.indexOf(data[elem].exchange) == -1) {
                        that.predictExchangeList.push(data[elem].exchange);
                    }
                }
            },
            getAmount() {
                let that = this;
                try {
                    for (let asset in this.balancesAssetData) {
                        if (this.balancesAssetData[asset].exchange == that.exchange && this.balancesAssetData[asset].asset == that.asset) {
                            that.balance = this.balancesAssetData[asset].amount;
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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