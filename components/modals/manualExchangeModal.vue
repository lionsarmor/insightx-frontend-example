<template>
    <div>
        <!-- Modal ADD manual exchange Component -->
        <b-modal v-model="showConfirmation" size="sm" :header-bg-variant="headerBgVariant" :header-text-variant="headerTextVariant" :body-bg-variant="bodyBgVariant" :body-text-variant="bodyTextVariant" :footer-bg-variant="footerBgVariant" :footer-text-variant="footerTextVariant">
            <b-container>
                <b-row>
                    <b-col>
                        <h5>Confirm</h5>
                        <br>
                        <div style="text-align:left;font-weight:bold;">Exchange:</div>
                        <div style="text-align:left;">
                            <br>
                            {{exchange}}
                        </div>
                        <br>
                        <div style="text-align:left;font-weight:bold;">Balances: </div>
                        <br>
                        <div v-for="item in exchangeArray" :key="item.id" style="text-align:left;">
                            {{item.symbol}} <span style="text-align:right;color:#3f51b5;">{{item.balance}}</span>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        <div slot="modal-header" class="w-100">
         </div>
            <div slot="modal-footer" class="w-100">
                <button size="sm" class="float-right btn-fil-blue" variant="primary" @click="addManualExchange(exchangeArray, dateTime)">Confirm</button>
                <button size="sm" class="float-left btn-fil-red" variant="primary" @click="toggleManualExchangeModal()">Edit</button>

            </div>
        </b-modal>

        <!-- Modal ADD manual exchange Component -->
        <b-modal id="manualExchange" v-model="$store.state.modals.manualExchangeModal" size="lg" title="ADD API KEYS" @hide="toggleManualExchangeModal()" :header-bg-variant="headerBgVariant" :header-text-variant="headerTextVariant" :body-bg-variant="bodyBgVariant" :body-text-variant="bodyTextVariant" :footer-bg-variant="footerBgVariant" :footer-text-variant="footerTextVariant">
            <b-container>
                <b-row>
                    <b-col>
                        <h5>Manual Exchange</h5>
                        <br>
                        <div>
                            <div style="text-align:left;">Date/Time</div>
                            <div>
                                <datetime type="datetime" :phrases="{ok: 'Continue', cancel: 'Exit'}" v-model="dateTime" input-style="border:none;width:100%;border-radius:3px;float:left;"></datetime><br>
                            </div>
                        </div>
                        <br>
                        <div>
                            <div style="text-align:left;">Exchange</div>
                            <div>
                                 <b-input-group>
                                 <b-input v-model='exchange' @keyup="predictiveList(exchange)" id="large" list="exchangeListAddModal" size="lg" type="text" class="drop-input" placeholder="Exchange"></b-input>
                                 <datalist  id="exchangeListAddModal">
                                 <option v-for="items in predictiveListExchange" :value="items" :key="items" />
                                 </datalist>
                                 </b-input-group>    
                            </div>
                            <br>
                            <div class="wrapperExchange">
                                <b-row v-for="item in exchangeArray" :key="item.id">
                                    <br><br>
                                    <div style="display:inline;">
                                        <span style="margin-left:10px;">
                                            <button v-on:click="addRow()" style="background:transparent;color:white;border:none;">
                                                <fa icon="plus-circle" style="margin-right:10px;" /></button>
                                            Symbol:<input type="text" placeholder="EX:BTC" v-model="item.symbol" style="margin-left:20px;margin-right:20px;border-radius:5px;border:none;" /></span>
                                        <span style="margin-left:20px;">Balance:<input v-model="item.balance" type="text" placeholder="EX:0.5689" style="margin-left:20px;border-radius:5px;border:none;" /></span>
                                    </div>
                                </b-row>
                            </div>
                            <br>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
                      <div slot="modal-header" class="w-100">
            <h5></h5>
         </div>
            <div slot="modal-footer" class="w-100">
                <button size="sm" class="float-right btn-fil-blue" variant="primary" @click="$root.$emit('bv::hide::modal','manualExchange'),toggleConfirmation(true);">ADD Exchange</button>
                <button size="sm" class="float-left btn-fil-red" style="margin-right:10px;" variant="primary" @click="$root.$emit('bv::hide::modal','manualExchange')">CLOSE</button>
                <button size="sm" class="float-left btn-fil-yellow" variant="primary" @click="clear()">CLEAR</button>
            </div>
        </b-modal>
    </div>
</template>
<script>
    /* eslint-disable */
import { mapState } from 'vuex'

    export default {
        data() {
            return {
                apiKeysList: this.$store.state.apiKeys,
                dateTime: null,
                predictiveListExchange: [],
                endpoint: this.$store.state.apiEndPoint,
                passphrase: null,
                exchange: '',
                keys: '',
                secret: '',
                showConfirmation: false,
                selected: [""],
                exchangeArray: [{
                    'symbol': '',
                    'balance': ''
                }, ],
                variants: [
                    'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'dark4', 'black'
                ],
                options: [{
                        value: 'bittrex',
                        text: 'Bittrex'
                    },
                    {
                        value: 'binance',
                        text: 'Binance'
                    },
                    {
                        value: 'coinbase',
                        text: 'Coinbase Pro'
                    }
                ],
                headerBgVariant: 'black',
                headerTextVariant: 'light',
                bodyBgVariant: 'black',
                bodyTextVariant: 'light',
                footerBgVariant: 'black',
                footerTextVariant: 'light'
            }
        },
          computed: {
            ...mapState({
                supportedExchanges: state => state.supportedExchanges
            }),
        },
        methods: {
          toggleLoadingModal(value) {
            this.$store.commit('modals/toggleLoadingModal', value);
            //this.$root.$emit('bv::hide::modal','addWallet')

        },
          predictiveList(newValue) {
          let that = this;
          if (newValue != null || undefined || '') {
          let that = this;
          let token = sessionStorage.getItem('token')
          let url = "api/predictiveExchangeList?input=";
          that.$insightfetch(url + newValue, 'GET', null, 'cors', 'same-origin', false).then(function(myResponse) {
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
            toggleConfirmation(value) {
                this.showConfirmation = value;
            },
            toggleManualExchangeModal(value) {
                this.$store.commit('modals/toggleManualExchange');

            },
            addManualExchange(coinBalance, time) {
            this.toggleLoadingModal('on');
                let exchange = this.exchange
                if (!this.predictiveListExchange.includes(exchange)){
                        this.toggleLoadingModal('off');
                        this.$toast.error("Please choose a valid exchange from the dropdown.", {
                            icon: 'warning'
                        });
                        return
                }
                let that = this;
                let exchanges = [];
                var obj = {};
                var obj2 = {};
                obj[exchange] = exchange;
                for (var elem in coinBalance) {
                    let symbol = coinBalance[elem].symbol;
                    let balance = coinBalance[elem].balance;
                    obj2[symbol] = symbol;
                    obj2[symbol] = balance;
                }
                obj[exchange] = obj2
                exchanges.push(obj);
                let url = "api/addManualExchange"
                let body = {
                    'exchanges': {
                        exchanges,
                        "time": time
                    }
                }
                that.$insightfetch(url, 'POST', body).then(function(myResponse) {
                    if (myResponse.result == 'success') {
                        that.$toast.success("Exchange Added!", {icon: 'check'} )
                        that.toggleLoadingModal('off');
                        that.toggleConfirmation(false);
                        that.$nuxt.$emit('resetAvailableExchanges', body);
                    } else if (myResponse.result != 'success'){
                        that.toggleLoadingModal('off');
                        that.$toast.error(myResponse.message, {
                            icon: 'warning'
                        });

                    }
                    return myResponse;
                })
            },
            addRow() {
                this.exchangeArray.push({
                    'symbol': '',
                    'balance': ''
                }, );
            },
            clear() {
                this.exchangeArray = [{
                    'symbol': '',
                    'balance': ''
                }, ];
                this.dateTime = null;
                this.exchange = null;
            },
        },
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .inline {
        float: left;
    }

    .btn-add {
        background: #345278 !important;
    }

    .modal-black {
        background: black;
    }

    .dark2 {
        background-color: black !important;
    }

    .border-set {
        border-radius: 5px;
        border: 5px solid rgb(39, 39, 39);
        height: 202px;
        margin-bottom: 40px;
    }

    .border-seet {
        border-radius: 5px;
        border: 5px solid rgb(39, 39, 39);
    }

    .pad {
        padding-left: 30px;
        padding-top: 10px;
    }

    .btn-primary {
        background: #345278 !important;
        border: none;
    }

    .button-pad {
        position: relative;
        top: 10px;
        left: 100px;
    }

    .blue-text {
        color: #7648eb;
        font-family: 'Montserrat', sans-serif;
        font-weight: bolder;

    }

    .font-style {
        font-family: 'Montserrat', sans-serif;
    }

    .token-text {
        font-size: 9px;
        float: left;
        position: relative;
        left: -50px;
    }

    .token-text2 {
        font-size: 13px;
        letter-spacing: 1px;
        float: left;
        color: #7648eb !important;
        position: relative;
        left: -50px;
    }

    .white {
        color: white;
    }

    .white-hr {
        background: rgb(117, 112, 112);
        width: 80%;
    }

    .wrapper {
        margin-left: auto;
        margin-right: auto;
        width: 99%;
        height: 125px;
        overflow: hidden !important;
        overflow-y: scroll !important;
    }

    /* width */
    ::-webkit-scrollbar {
        width: 5px;
        height: 10%;

    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #2b2a2a00;

    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 25px;
        height: 10%;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .wrapperExchange {
        height: 360px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .exchangeWrap {
        height: 150px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>