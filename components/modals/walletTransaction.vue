<template>
    <div>
        <!-- MODAL -->
        <div>
            <b-modal id="wallet" size="lg" centered v-model="$store.state.modals.walletTransactionModal" title="Add Wallet Transaction" :header-bg-variant="headerBgVariant" :header-text-variant="headerTextVariant" :body-bg-variant="bodyBgVariant" :body-text-variant="bodyTextVariant" :footer-bg-variant="footerBgVariant" :footer-text-variant="footerTextVariant" @hide="toggleWalletTransactionModal()">
                <b-row class="my-1">
                    <b-table striped hover :items="items"></b-table>
                </b-row>
                <b-row class="my-1">
                    <b-col sm="2">
                        <label style="white-space:nowrap;" for="input-large">Coin symbol:</label>
                    </b-col>
                    <b-col sm="10">
                        <b-form-select v-model="symbol" :options="symbolOptions" class="mb-3 drop-input" size="sm" />
                    </b-col>
                </b-row>

                <b-row class="my-1">
                    <b-col sm="2">
                        <label style="white-space:nowrap;" for="input-large">Nickname:</label>
                    </b-col>
                    <b-col sm="10">
                        <b-form-select v-model="nickname" :options="addressOptions" class="mb-3 drop-input" size="lg" />
                    </b-col>
                </b-row>

                <b-row class="my-1">
                    <b-col sm="2">
                        <label style="white-space:nowrap;" for="input-large">Amount:</label>
                    </b-col>
                    <b-col sm="10">
                        <b-form-input v-model="amount" id="input-large" size="lg" type="text" class="drop-input" placeholder="amount of transaction"></b-form-input>
                    </b-col>
                </b-row>

                <b-row class="my-1">
                    <b-col sm="2">
                        <label style="white-space:nowrap;" for="input-large">Fee:</label>
                    </b-col>
                    <b-col sm="10">
                        <b-form-input class="drop-input" placeholder="*optional" v-model="fee" id="input-large" size="sm" type="text"></b-form-input>
                    </b-col>
                </b-row>

                <b-row class="my-1">
                    <b-col sm="2">
                        <label style="white-space:nowrap;" for="input-large">Transacted time:</label>
                    </b-col>
                    <b-col sm="10" style="white-space: wrap !important;">
                        <datetime type="datetime" :phrases="{ok: 'Continue', cancel: 'Exit'}" v-model="transactionTime" input-style="border:none;width:100%;border-radius:3px;float:left;"></datetime><br>
                    </b-col>
                </b-row>
                <b-row class="my-1">
                    <b-col sm="2">
                        <label style="white-space:nowrap;" for="input-large">Transaction type:</label>
                    </b-col>
                    <b-col sm="6">
                        <b-form-select v-model="transactionType" :options="transactionOptions" class="mb-3 drop-input" size="sm" />
                    </b-col>
                    <b-col sm="2">
                        <span style="white-space:nowrap;">Selected: <strong style="color:#25b154" v-show="transactionType == 'deposit'">{{ transactionType }}</strong>
                            <strong style="color:#da1e2d" v-show="transactionType != 'deposit'">{{ transactionType }}</strong></span>
                    </b-col>
                </b-row>
                <div slot="modal-footer" class="w-50">
                    <b-row class="my-1">
                        <b-col>
                            <button class="btn-fil-red" style="float:left;margin-left:-100%;" @click="$root.$emit('bv::hide::modal','wallet')">Close</button>
                            <button class="btn-fil-yellow" @click="addTransactions()">Add</button>
                            <button class="btn-fil-red" @click="clearTransactions()">Clear</button>
                            <button class="btn-fil-blue" @click="updateTransactions()">Update</button>
                        </b-col>
                    </b-row>
                </div>
                <div slot="modal-header" class="w-50">
                    <h5>Add Wallet Transaction</h5>
                </div>
            </b-modal>
        </div>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'

    export default {
        data() {
            return {
                amount: null,
                nickname: null,
                currency: null,
                symbol: null,
                transactionType: null,
                fee: null,
                transactionTime: null,
                items: [],
                addedMarkets: [],
                endpoint: this.$store.state.apiEndPoint,
                fmAddress: null,
                toAddress: null,
                items: [],
                addWalletTransaction: false,
                from: null,
                to: null,
                walletsAddress: [],
                addressOptions: [],
                selected: [],
                transactionOptions: [{
                        value: null,
                        text: 'Select an option'
                    },
                    {
                        value: 'withdraw',
                        text: 'Withdrawal'
                    },
                    {
                        value: 'deposit',
                        text: 'Deposit'
                    }
                ],
                transactionOptions: [{
                        value: null,
                        text: 'Select an option'
                    },
                    {
                        value: 'withdraw',
                        text: 'Withdrawal'
                    },
                    {
                        value: 'deposit',
                        text: 'Deposit'
                    }
                ],
                variants: [
                    'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'black'
                ],
                headerBgVariant: 'black',
                headerTextVariant: 'light',
                bodyBgVariant: 'black',
                bodyTextVariant: 'light',
                footerBgVariant: 'black',
                footerTextVariant: 'light',
            }
        },
        components: {},
        computed: {
            ...mapState({
                addresses: state => state.generalData.walletAddresses
            }),
            symbolOptions() {
                let symbols = [{
                    value: null,
                    text: 'Select an a coin'
                }]
                for (var wallet in this.addresses) {
                    symbols.push({
                        'value': this.addresses[wallet].Symbol,
                        'text': this.addresses[wallet].Symbol
                    })
                }
                return symbols
            } 
        },
        methods: {
              	pushNicknames() {
	                this.toAddress = null;
	                this.addressOptions = [{
	                value: null,
	                text: 'Select an address'
	                }]
	                for (var wallet in this.addresses) {
	                    if (this.addresses[wallet].Symbol === this.symbol) {
	                        this.addressOptions.push({
	                            'value': this.addresses[wallet].Nickname,
	                            'text': this.addresses[wallet].Nickname
	                        })
	                    }
	                }
	            },
             clear() {
                     this.amount = null,
                     this.exchange = null,
                     this.currency = null,
                     this.symbol = null,
                     this.transactionType = null,
                     this.fee = null,
                     this.transactionTime = null
             },
              addTransactions() {
                let that = this;
                 if ( 
                 this.amount == null ||  
                 this.symbol == null || 
                 this.nickname == null ||
                 this.transactionType == null ||
                 this.transactionTime == null 
                 ) {
                      that.$toast.error('Please, fill in required sections to Add.', {
                             icon: 'warning'
                         });
                     return null;
                 }
                for (var wallet in this.addresses) {
                    if (this.addresses[wallet].Symbol === this.symbol) {
                        this.toAddress = this.addresses[wallet].Address
                    }
                }
                this.items.push({
                    "coin": this.symbol,
                    "address": this.toAddress,
                    "nickname": this.nickname,
                    "fee": this.fee,
                    "amount": this.amount,
                    "type": this.transactionType,
                    'time': new Date(this.transactionTime).getTime()
                })
            },
            clearTransactions() {
                this.items = []
            },
            updateTransactions() {
                if (!Array.isArray(this.items) || !this.items.length) {
                this.$toast.error('Please, fill in required sections to Update.', {
                             icon: 'warning'
                         });
                         return
                }
                var url = "api/wallettransactions"
                var that = this
                var body = {
                    'transactions': this.items
                }
                this.$insightfetch(url, 'POST', body, 'cors', 'same-origin', true).then(function(jsonResponse) {
                    that.addWalletTransaction = false
                    that.items = []
                    that.transactionTime = null
                    that.fee = null
                    that.amount = null;
                    that.NickName = null;
                    that.toAddress = null
                    that.symbol = null
                    that.transactionType = null
                    if (jsonResponse.result == 'success') {
                        that.$toast.success(jsonResponse.result, {
                            icon: 'check'
                        });
                        that.confirmTradeMod = false;
                    } else {
                        that.$toast.error(jsonResponse.reason, {
                            icon: 'warning'
                        });
                    }
                    that.$nuxt.$emit('sortTransactions', {
                        'direction': "down",
                        'sortby': 'closed'
                    })
                    return jsonResponse;
                })
            },
            toggleWalletTransactionModal() {
                this.$store.commit('modals/toggleWalletTransactionModal');      
        }
         },
        watch: {
            symbol: function(val) {
                this.pushNicknames()
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .item+.item:before {
        content: ", ";
    }

    .drpbut {
        background-color: black !important;
    }

    .wrapper {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
    }

    .wrapper2 {
        margin-left: auto;
        margin-right: auto;
        margin-top: 1%;
        width: 100%;
        position: relative;
        padding-bottom: 10px;
    }

    .but-space {
        padding-left: 50px;
        padding-right: 10px;
    }

    .modal-but {
        background-color: black !important;
        border: none !important;
    }

    .black {
        color: black !important;
    }

    .dropbtn {

        background-color: black;
        color: white;
        min-width: 90px;
        padding: 1px;
        margin: 10px;
        border-style: solid;
        border-width: 2px;
        border-color: white;
        cursor: pointer;
        -webkit-border-radius: 16px;
        -moz-border-radius: 16px;
        border-radius: 16px;
        position: relative;
        top: -6px;
        font-size: 14px;
    }

    /* Dropdown Content (Hidden by Default) */
    .dropdown-content {
        display: none;
        position: absolute;
        top: 32px;
        background-color: black;
        min-width: 125px;
        height: 90px;
        overflow-y: scroll;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
    }

    /* Links inside the dropdown */
    .dropdown-content a {
        color: white;
        text-decoration: none;
        display: block;
    }

    /* Change color of dropdown links on hover */
    .dropdown-content a:hover {
        background-color: #f1f1f1;
        color: black;
    }

    /* Show the dropdown menu on hover */
    .dropdown:hover .dropdown-content {
        display: block;
    }

    /* Change the background color of the dropdown button when the dropdown content is shown */
    .dropdown:hover .dropbtn {
        background-color: white;
        color: black;
    }

    .size {
        width: 50px;
    }

    .btn-fil {
        color: white !important;
        background-color: black !important;
        border-style: solid;
        border-width: 2px;
        border-color: rgb(255, 255, 255);
        border-radius: 25px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .search {
        width: 90px;
        border: 2px solid rgb(255, 255, 255);
        background: transparent;
        border-radius: 25px;
        height: 27px;
        font-family: 'Montserrat', sans-serif;
        color: white;
        font-weight: bold;
        outline-style: none;
        font-size: 12px;
    }

    ul {
        list-style: none;
    }


    .searchBtn {
        width: 30px;
        border: 2px solid rgb(255, 255, 255);
        background: transparent;
        border-radius: 25px;
        height: 27px;
        font-family: 'Montserrat', sans-serif;
        color: white;
        font-weight: bold;
        outline-style: none;
        font-size: 11px;
    }

    input {
        background: #1a1a1a;
        color: white;
    }

    textarea {
        background: #1a1a1a;
        color: white;
    }

    textarea:focus {
        background: #1a1a1a;
        color: white;
    }

    input:focus {
        background: #1a1a1a;
        color: white;
    }

    .drop-input {
        color: white;
        background: #1a1a1a;
        border: none;
        font-size: 12px;
        height: 30px;
    }

    .btn-fil-blue {
        color: white !important;
        background-color: #000000 !important;
        border-style: solid;
        border-width: 2px;
        border-color: #047ea4;
        border-radius: 25px;
        height: 37px;
        position: relative;
        top: 3px;
        cursor: pointer;
    }

    .btn-fil-yellow {
        color: white !important;
        background-color: #000000 !important;
        border-style: solid;
        border-width: 2px;
        border-color: #a3972d;
        border-radius: 25px;
        height: 37px;
        position: relative;
        top: 3px;
        cursor: pointer;
    }

    .btn-fil-red {
        color: white !important;
        background-color: #000000 !important;
        border-style: solid;
        border-width: 2px;
        border-color: #a41704;
        border-radius: 25px;
        height: 37px;
        position: relative;
        top: 3px;
        cursor: pointer;
    }
</style>