<template>
    <div>
        <!-- Modal DELETE API KEY Component -->
        <b-modal id="api" v-model="$store.state.modals.deleteApiKeysModal" title="DELETE API KEYS" @hide="toggleDeleteApiKeysModal()" :header-bg-variant="headerBgVariant" :header-text-variant="headerTextVariant" :body-bg-variant="bodyBgVariant" :body-text-variant="bodyTextVariant" :footer-bg-variant="footerBgVariant" :footer-text-variant="footerTextVariant">
            <b-container>
                <br />
                <div>
                    <b-form-select multiple :select-size="3" :options="options" class="mb-3 drop-input" v-model="selected">
                    </b-form-select>
                </div>
                <br />
            </b-container>
                      <div slot="modal-header" class="w-100">
            <h5>DELETE API Keys</h5>
         </div>
            <div slot="modal-footer" class="w-100">
                <button size="sm" class="float-right btn-fil-blue" variant="primary" @click="delete_api_keys()">
                    DELETE
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
            toggleDeleteApiKeysModal(value) {
                this.$store.commit('modals/toggleDeleteApiKeys');
            },
            delete_api_keys: function() {
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
                });
                let url = "api/wipeapikeys"
                let body = {
                    'exchange': exchange,
                }
                that.$insightfetch(url, 'POST', body, 'cors', 'same-origin', true).then(function(myResponse) {

                    if (myResponse.result == 'success') {
                        that.$store.commit('updateSupportedExchanges', exchange)
                        that.$root.$emit('bv::hide::modal','api')
                        that.showMod = false;
                        that.$toast.success("API key removed successfully.", {icon: 'check'} )
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
