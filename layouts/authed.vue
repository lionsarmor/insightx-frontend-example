<template>
    <div v-if="loading && $store.state.localStorage.authUser != 'loggedOut'">
        <navbar class="alert" style="margin-bottom:-20px;" />
        <page-loader v-if="!$store.state.generalData" />
        <nuxt />
        <ManualTrade />
        <withdrawDeposit />
        <deleteTransactionModal />
        <walletTransaction v-if="$store.state.generalData"/>
        <addWatchlist />
        <editWatchlistModal />
        <manualExchangeModal />
        <manualApiKeysModal />
        <deleteApiKeysModal />
        <addTokenModal />
        <addWalletAddressModal />
        <editWalletAddressModal />
        <loadingModal />
        <confirmEditManualWatchlist />
        <footer class="fixed-bottom d-none d-md-block">
        <div style="background:black;width:100%;height:40px;color:transparent;"  v-if="$store.state.generalData && $store.state.localStorage.miniTickerShow == true" :agChartData="$store.state.localStorage.tickerData" :totalmarketdata="$store.state.generalData.globalMarketData.totalMarketCap">footer</div>
        <div style="background:black;width:100%;height:72px;color:transparent;" v-if="$store.state.generalData && $store.state.localStorage.detailedTickerShow == true" :aggChartData="$store.state.localStorage.tickerData" :totalmarketdata="$store.state.generalData.globalMarketData.totalMarketCap">footer</div>
        <miniTicker v-if="$store.state.generalData && $store.state.localStorage.miniTickerShow == true" :agChartData="$store.state.localStorage.tickerData" :totalmarketdata="$store.state.generalData.globalMarketData.totalMarketCap" />
        <detailedTicker  v-if="$store.state.generalData && $store.state.localStorage.detailedTickerShow == true" :aggChartData="$store.state.localStorage.tickerData" :totalmarketdata="$store.state.generalData.globalMarketData.totalMarketCap" />
        </footer>
        </div>
</template>

<script>
    import { mapActions } from 'vuex'

    import tickerChart from './partials/newTicker/tickerChart'
    import miniTicker from './partials/newTicker/tickerTopBar'
    import detailedTicker from './partials/newTickerDetailed/tickerTopBar'
    import navbar from './partials/InsightNavbar.vue'
    import PageLoader from '~/components/loader/PageLoader'
    import ManualTrade from '~/components/modals/ManualTrade'
    import withdrawDeposit from '~/components/modals/withdrawDeposit'
    import walletTransaction from '~/components/modals/walletTransaction'
    import addWatchlist from '~/components/modals/addWatchlist'
    import editWatchlistModal from '~/components/modals/editWatchlistModal'
    import manualExchangeModal from '~/components/modals/manualExchangeModal'
    import manualApiKeysModal from '~/components/modals/manualApiKeysModal'
    import deleteApiKeysModal from '~/components/modals/deleteApiKeysModal'
    import addTokenModal from '~/components/modals/addTokenModal'
    import addWalletAddressModal from '~/components/modals/addWalletAddressModal'
    import editWalletAddressModal from '~/components/modals/editWalletAddressModal'
    import deleteTransactionModal from '~/components/modals/deleteTransactionModal'
    import confirmEditManualWatchlist from '~/components/modals/confirmEditManualWatchlist'

    import loadingModal from '~/components/modals/loadingModal'

    import { VUEX_UPDATE_COIN_STATE } from '~/store/constants/coins'

    export default {
        data() {
            return {
                loading: false,
            }


        },
        methods: {
            ...mapActions({
                updateGeneralData: 'updateGeneralData',
                updateCoinState: `coins/${VUEX_UPDATE_COIN_STATE}`
            }),
            getBrowser(){
            if (this.$store.state.currentBrowser != null) {
            document.body.classList.add(this.$store.state.currentBrowser);
            }
            }
        },
        components: {
            ManualTrade,
            navbar,
            PageLoader,
            withdrawDeposit,
            walletTransaction,
            addWatchlist,
            manualExchangeModal,
            manualApiKeysModal,
            deleteApiKeysModal,
            addTokenModal,
            addWalletAddressModal,
            editWalletAddressModal,
            miniTicker,
            detailedTicker,
            tickerChart,
            deleteTransactionModal,
            loadingModal,
            editWatchlistModal,
            confirmEditManualWatchlist

  },
  created(){

  },
        mounted() {

            this.$store.commit('storeUserWatchlist');
            let socket = this.$socket()
            socket.emit('subscribe', {'uniqueId': '123', 'subscriptionDict': {'bittrex': ['btc/usd']}})
            socket.on('balanceChange', (data) => {
                that.$store.commit('websocketUpdateBalance', data.exchange, data.tickers, data.amount)
            })
            socket.on('response', (data) => {
            })
            socket.on('exchangeUpdateAlert', (exchange) => {
                
                if (exchange=='global'){
                   socket.emit('requestExchangeTickers', {'exchange': exchange, 'tickers': 'all'})
                }
            })
            socket.on('exchangeData', (data) => {
                that.$store.commit('websocketUpdateTickerData', data.tickers)
                that.$store.commit('websocketUpdateGlobalPortfolioTickers', data.tickers)
            })
            socket.on('balanceUpdate', (data) => {
                that.$store.commit('websocketUpdateBalance', data.exchange, data.coin, data.amount)
            })
            let that = this;
            if (this.$store.state.retrieving == false) {
                this.$store.commit('updateRetrieving')
                this.$insightfetch("general").then(function(jsonResponse) {
                    that.updateGeneralData(jsonResponse)    
                    that.updateCoinState(jsonResponse)
                })
            }
            if (this.$store.state.localStorage.authUser == 'loggedOut') {
                this.$router.push('/')
            } else {
                this.loading = true
            }
        },
    }
</script>


<style>
    /* width */
    ::-webkit-scrollbar {
        width: 7px !important;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #00000000 !important
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: rgb(56, 55, 55) !important;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: rgb(34, 33, 33) !important;
    }

    .title {
        font-size: 14px !important;
        font-weight: bold;
    }

    .title2 {
        font-size: 20px !important;
    }

    .table-labels {
        font-size: 12px !important;
        font-weight: bold;
    }

    .tabletext {
        font-size: 11px !important;
    }

    .buttontext {
        font-size: 14px !important;
    }

    .inverted {
        -webkit-filter: invert(100%);
        filter: invert(100%);
    }

    /* width */
    ::-webkit-scrollbar {
        width: 7px;
        height: 7px;
        border-radius: 25px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #000000;
        border-radius: 25px;

    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: rgb(78, 73, 73);
        border-radius: 25px;

    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: rgb(121, 120, 120);
    }

    ::-webkit-scrollbar-corner {
        background: rgb(0, 0, 0);
    }
</style>