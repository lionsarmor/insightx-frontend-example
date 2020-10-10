<template>
    <div>
        <!-- Modal ADD API KEY Component -->
        <b-modal id="api" v-model="$store.state.modals.manualApiKeysModal" title="ADD API KEYS" @hide="toggleManualApiKeysModal()" :header-bg-variant="headerBgVariant" :header-text-variant="headerTextVariant" :body-bg-variant="bodyBgVariant" :body-text-variant="bodyTextVariant" :footer-bg-variant="footerBgVariant" :footer-text-variant="footerTextVariant">
            <b-container>
                <br />
                <div>
                    <b-form-select multiple :select-size="3" :options="options" class="mb-3 drop-input" v-model="selected">
                    </b-form-select>
                    <div>Selected: <strong>{{ selected[0]}}</strong></div>
                </div>
                <br />
                <b-row class="my-1">
                    <b-col sm="2"><label style="font-size: 12px;" for="input-large">Key:</label></b-col>
                    <b-col sm="10">
                        <b-form-input class="drop-input" v-model="keys" id="input-large" size="lg" type="text" placeholder="Enter your Key"></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="my-1">
                    <b-col sm="2"><label style="font-size: 12px; white-space: nowrap;" for="input-large">Secret-Key:</label></b-col>
                    <b-col sm="10">
                        <b-form-input class="drop-input" v-model="secret" id="input-large" size="lg" type="text" placeholder="Enter your Secret Key"></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="my-1" v-if="selected[0] == 'coinbase'">
                    <b-col sm="2"><label style="font-size: 12px;" for="input-large">Passphrase:</label></b-col>
                    <b-col sm="10">
                        <b-form-input class="drop-input" v-model="passphrase" id="input-large" size="lg" type="text" placeholder="Enter your Passphrase"></b-form-input>
                    </b-col>
                </b-row><br />
            </b-container>
                      <div slot="modal-header" class="w-100">
            <h5>Add API Keys</h5>
         </div>
            <div slot="modal-footer" class="w-100">
                <button size="sm" class="float-right btn-fil-blue" variant="primary" @click="add_api_keys()">
                    ADD
                </button>
                <button size="sm" class="float-left btn-fil-red" variant="primary" @click="$root.$emit('bv::hide::modal','api')">CLOSE</button>
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
                dateTime: null,
                chooseExchange: null,
                endpoint: this.$store.state.apiEndPoint,
                passphrase: null,
                keys: '',
                secret: '',
                showConfirmation: false,
                showEXMOD: false,
                showMod: false,
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
                    },
                    {
                        value: 'bitmex',
                        text: 'Bitmex'
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
                exchangesWeSupport: state => state.exchangesWeSupport
            })
        },
        methods: {
            toggleManualApiKeysModal(value) {
                this.$store.commit('modals/toggleManualApiKeys');
            },
            add_api_keys: function() {
                var that = this;
                var token = sessionStorage.getItem('token')
                let exchange = this.selected[0].toLowerCase()
                if (!this.exchangesWeSupport.includes(exchange)){
                        this.$toast.error("Please choose a valid exchange from the dropdown.", {
                            icon: 'warning'
                    });
                    return
                }
                var test = JSON.stringify({
                    'exchange': this.selected[0].toLowerCase(),
                    'key': this.keys,
                    'secret': this.secret,
                    'passphrase': this.passphrase
                });
                let url = "addapikey"
                let body = {
                    'exchange': exchange,
                    'key': this.keys,
                    'secret': this.secret,
                    'passphrase': this.passphrase
                }
                that.$insightfetch(url, 'POST', body, 'cors', 'same-origin', true).then(function(myResponse) {

                    if (myResponse.result == 'success') {
                        that.$store.commit('updateSupportedExchanges', exchange)
                        that.$root.$emit('bv::hide::modal','api')
                        let isItNew = true
                        for (var i = 0; i < that.all_keys.length; i++) {
                            if (that.all_keys[i]['exchange'] == exchange) {
                                isItNew = false
                                that.all_keys[i]['key'] = that.keys
                                let newKeys = that.all_keys
                                that.$store.commit('updateKey', {
                                    'key': 'apikeys',
                                    'newData': newKeys
                                })
                            }
                        }
                        if (isItNew == true) {
                            that.all_keys[that.all_keys.length] = {
                                'exchange': exchange,
                                'key': that.keys
                            }

                            let newKeys = that.all_keys
                            that.$store.commit('updateKey', {
                                'key': 'apikeys',
                                'newData': newKeys
                            })
                        }
                        that.showMod = false;
                    }
                    return myResponse;
                })
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