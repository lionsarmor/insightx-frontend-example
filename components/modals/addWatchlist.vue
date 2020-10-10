<template>
    <div class="bg">
        <b-row>
            <b-col>
                <!-- Modal Component ADD TO WATCHLIST -->
                <div style="z-index: 99;">
                    <b-modal id="watchlist" v-model="$store.state.modals.AddWatchlistModal" title="Add To Watchlist" :header-bg-variant="headerBgVariant" :body-bg-variant="bodyBgVariant" :body-text-variant="bodyTextVariant" :footer-bg-variant="footerBgVariant" :footer-text-variant="footerTextVariant" @hide="toggleAddWatchlistModal()">
                        <b-row>
                            <b-col cols="12">
                                <b-form inline>
                                    <b-container>
                                        <b-row>
                                            <b-col cols="6">
                                            <b-input-group>    
                                            <input 
                                            v-on:click="predictiveListExchangeMarket = [], exchangeMarket = null"
                                            v-model='watchExchanges' @keyup="predictiveList(watchExchanges)"  list="addExchangeList" size="lg" type="text" class="drop-input" placeholder="Exchange" style="width:90%;height:27px;border-radius:5px;font-size:15px;" />
                                            <datalist  id="addExchangeList">
                                            <option v-for="items in predictiveListExchange" :value="items" :key="items"  />
                                            </datalist>
                                            </b-input-group>    
                                            </b-col>
                                             <b-col cols="6">
                                                <b-input-group>
                                                    <input v-on:keyup="exchangeMarketList(exchangeMarket)" v-model="exchangeMarket" type="text" list="exchangeLists" placeholder="Market" style="width:90%" />
                                                    <datalist id="exchangeLists">
                                                    <option
                                                    v-for="items in predictiveListExchangeMarket"
                                                    :value="items"
                                                    :key="items"
                                                    v-on:click.stop
                                                    />
                                                </datalist>
                                                </b-input-group>
                                            </b-col>
                                        </b-row>
                                    </b-container>
                                </b-form>
                            </b-col>
                        </b-row>
                        <br>
                        <div slot="modal-footer" class="w-100">
                            <b-btn size="sm" class="float-left btn-fil-red" variant="secondary" @click="$root.$emit('bv::hide::modal','watchlist')">Close</b-btn>
                            <button size="sm" class="float-right btn-fil-blue2" v-on:click="addWatchlist = false, addWatchList()">Save</button>
                        </div>
                        <div slot="modal-header" class="w-100">
                            <h5>Add To Watchlist</h5>
                        </div>
                    </b-modal>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                exchangeMarket: null,
                predictiveListExchangeMarket: [],
                predictiveExchangeSymbols: [],
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
                predictiveListExchange: [],
                watchBase: '',
                predictCoinData: null,
                watchCounter: '',
                watchExchanges: null,
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
                supportedExchanges: state => state.supportedExchanges
            }),
        },
    methods: {
    ...mapActions(['getSparklines', 'updateWatchList']),
    exchangeMarketList(newValue) {
      let that = this
      if (newValue != null || undefined || '') {
        let that = this
        let token = sessionStorage.getItem('token')
        let url = 'api/predictiveMarketList';
        let name = this.watchExchanges;
        let exchange = that.predictiveExchangeSymbols[name]
        that
          .$insightfetch(
            url + '?exchange=' + exchange + '&input=' + newValue,
            'GET',
            null,
            'cors',
            'same-origin',
            false
          )
          .then(function(myResponse) {
            let exchanges = Object.keys(myResponse.predictedExchanges)
            for (let exchange in exchanges) {
              if (!that.supportedExchanges.includes(exchanges[exchange])) {
                if (
                  that.predictiveListExchangeMarket.length > 4 &&
                  !that.predictiveListExchangeMarket.includes(
                    exchanges[exchange]
                  )
                ) {
                  that.predictiveListExchangeMarket.pop()
                  that.predictiveListExchangeMarket.unshift(exchanges[exchange])
                } else {
                  if (
                    !that.predictiveListExchangeMarket.includes(
                      exchanges[exchange]
                    )
                  ) {
                    that.predictiveListExchangeMarket.push(exchanges[exchange])
                  }
                }
              }
            }
            return myResponse
          })
      }
    },
        predictiveList(newValue) {
    (newValue);
          let that = this;
          if (newValue != null || undefined || '') {
          let that = this;
          let token = sessionStorage.getItem('token')
          let url = "api/predictiveExchangeList?input=";
          that.$insightfetch(url + newValue, 'GET', null, 'cors', 'same-origin', false).then(function(myResponse) {
          that.predictiveExchangeSymbols = myResponse.predictedExchanges;
          let exchanges = Object.keys(myResponse.predictedExchanges)
          for (let exchange in exchanges ) {
          if (!that.supportedExchanges.includes(exchanges[exchange])){
                if (that.predictiveListExchange.length > 4 && !that.predictiveListExchange.includes(exchanges[exchange])){
                   that.predictiveListExchange.pop()
                   that.predictiveListExchange.unshift(exchanges[exchange])
                } else {
                    if (!that.predictiveListExchange.includes(exchanges[exchange])) {
                            that.predictiveListExchange.push(exchanges[exchange])
                         }        
        }
    }
}
              return myResponse;
             })     
          }},
            toggleAddWatchlistModal(value) {
                this.$store.commit('modals/toggleAddWatchlist');
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
                that.$insightfetch(endPoint, 'POST', body).then(function(response){
                            that.predictCoinData = response.predictedCoins;
                        })
                    }
                }, 500);
            },
            addWatchList() {
                try {
                let that = this;
                let market = that.exchangeMarket.split('/')
                let base = market[0].toUpperCase()
                let counter = market[1].toUpperCase()
                base = base.replace(/\s/g, '');
                counter = counter.replace(/\s/g, '');
                let name = this.watchExchanges;
                let exchange = that.predictiveExchangeSymbols[name]
                let body = {
                    'exchange': exchange,
                    'base': base,
                    'counter': counter,
                    'action': 'add'
                };
                let endPoint = "api/updateWatchlist";
                    this.$insightfetch(endPoint, 'POST', body, 'cors', 'same-origin', true).then(function(jsonResponse) {
                    if (jsonResponse.watchList != null) {
                        that.watchListVal = jsonResponse.watchList;
                        that.$store.commit('updateKey', {
                            'key': 'watchList',
                            'newData': that.watchListVal
                        })
                    that.updateWatchList(jsonResponse.watchList);
                    that.getSparklines(jsonResponse);
                    that.watchExchanges = null
                    that.exchangeMarket = null
                    that.toggleAddWatchlistModal();
                    }
                    })
                    }
                    catch(error) {
                    console.error(error);
                    this.$toast.error('Check "Exchange" and "Market" fields, they must have selections. ', {icon: 'warning'} )
                    }
            },
            mounted() {
                this.watchBase = '',
                    this.watchCounter = '',
                    this.watchExchanges = null
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