<template>
<div id="tickerSpacePayment">
    <div class="border-set font-style wrapper" style="white-space:nowrap !important; font-size:12px;">

        <h5 class="title" style="margin-right:220px;">Payment Status</h5>
        <strong style="position: relative; padding-left: 30px; top:10px;" class="float-left text-warning">
            <countdown v-if="Number(timeLeft) > 0 && Number(timeLeft) < 604800000" :time=timeLeft>
                <template  slot-scope="props">Time Left - Days:{{ props.days }} Hours:{{ props.hours }} Minutes:{{ props.minutes }}</template>
            </countdown>
            <a v-if="Number(timeLeft) > 604800000">{{timeDict.months}} Month(s) and {{timeDict.days}} Day(s) Remain </a>
            <a v-if="Number(timeLeft) <= 0">Expired</a>
        </strong>
        <div style="position: relative; top:-10px; float:right; padding-right: 15px;">
            <b-btn v-if="pay === true" class="btn btn-success">PAID</b-btn>
            <b-btn v-if="pay === false" class="btn btn-danger" v-on:click="showPay = true">PAY NOW</b-btn>
        </div>
        <br><br>
        <b-row>
            <b-col>
                <div style="margin-left:3%;" class="white"><strong>Recent Payments:</strong></div>
            </b-col>
        </b-row>
        <br>
        <b-row v-for="item in payments" :key="item.createdAt">
            <b-col>
                <div style="min-width:402px;">
                    <div style="margin-left:15%;white-space:nowrap; !important" class="white token-text2">Date: {{item.createdAt}}</div>
                    <div style="margin-left:22%;white-space:nowrap; !important" class="white token-text2">Months: {{item.months}}</div>
                    <div style="margin-left:15%;white-space:nowrap; !important" class="white token-text2">URL: <a :href=item.url target="_blank">Link</a></div><br>
                    <div style="margin-right:15%;white-space:nowrap; !important" class="white token-text2 float-right">Status: <strong style="color: green;">{{item.status}}</strong></div>
                    <hr class="white-hr">
                </div>
            </b-col>
        </b-row>
        <!-- Modal Component -->
        <b-modal v-model="showPay" title="Submit Payment" :header-bg-variant="headerBgVariant" :header-text-variant="headerTextVariant" :body-bg-variant="bodyBgVariant" :body-text-variant="bodyTextVariant" :footer-bg-variant="footerBgVariant" :footer-text-variant="footerTextVariant">
            <b-row>
                <b-col style="float:left;">
                    Payment Processor:<br><br>
                    <div style="text-align:left;float:left;">
                    <input id="coinbase" type="radio" value="coinbase" v-model="middleman" />
                    <label for="coinbase">Coinbase Commerce</label>
                    <br>
                    <input id="coinpayments" type="radio" value="coinpayments" v-model="middleman" />
                    <label for="coinpayments">Coinpayments</label>
                    <br><br>
                    Pay with:
                    <b-form-select class="black-form" v-if="middleman == 'coinbase'" size="sm" v-model="coinbasePaymentCoin" :options="allCoinbasePaymentCoins" />
                    <b-form-select class="black-form" v-if="middleman == 'coinpayments'" size="sm" v-model="coinpaymentsPaymentCoin" :options="allCoinpaymentsPaymentCoins" />
                    <br><br>
                    </div>
                </b-col>
                <b-col>
                    <div style="text-align:left;">
                    Subscription Time:<br><br>
                    </div>
                    <p  v-if="Number(discount) > 0">${{discount}} per month discount applied with partner code. 
                    <br>Thank you {{partnerCode}} member for your support!</p>
                    <p  v-if="Number(discount) == 0 || partnerCode == 'InsightX'">Welcome to the InsightX beta!
                    <br>Thank you for your support!</p>
                    <div style="text-align:left;">
                    <input id="12" type="radio" value="12" v-model="months" />
                    <label for="12">1 Year - ${{Number(allPrices.tweleve) / 12}}/month (${{allPrices.tweleve}} total)</label>
                    <br>
                    <input id="6" type="radio" value="6" v-model="months" />
                    <label for="6">6 Months - ${{Number(allPrices.six) / 6}}/month (${{allPrices.six}} total)</label>
                    <br>
                    <input id="1" type="radio" value="1" v-model="months" />
                    <label for="1">1 Month - ${{Number(allPrices.one) / 1}}/month (${{allPrices.one}} total)</label>
                    <br>
                    </div>
                </b-col>
            </b-row>
            <br><br>
            <b-row class="payBorder">
                <b-col>
                    <h5>Most Recent Invoice Details:</h5>
                    <b-col style="font-size:11px;" ><br>
                        <b-row class="white">
                        <strong>Time: {{invoiceCreatedAt}}</strong><br>
                        </b-row><br>
                        <b-row class="white">
                            <strong>Price: {{invoiceAmount}}</strong>
                        </b-row><br>
                        <b-row class="white">
                            <strong>Payment Processor: {{invoiceMiddleman}}</strong><br>
                        </b-row><br>
                        <b-row class="white">
                            <strong>Months: {{invoiceMonths}}</strong><br>
                        </b-row><br>
                        <b-row class="white">
                            <strong>Status: {{invoiceStatus}}</strong><br>
                        </b-row><br>
                        <b-row class="white">
                            <strong>Address: {{invoiceAddress}}</strong><br>
                        </b-row><br>
                        <b-row class="white">
                            <strong>Payment Coin: {{invoicePaymentCoin}}</strong><br>
                        </b-row><br>
                        <b-row class="white">
                            <strong>URL: <a :href=invoiceURL target="_blank">Link</a></strong><br>
                            <br>
                        </b-row>
                    </b-col>
                </b-col>
            </b-row><br>
            <br>
                      <div slot="modal-header" class="w-100">
            <h5>Submit Payment</h5>
         </div>
            <div slot="modal-footer" class="w-100">
                <button size="sm" class="float-left btn-fil-blue" variant="success" v-on:click="addWatchlist = false, createInvoice()">
                    CREATE INVOICE
                </button>
                <button size="sm" class="float-right btn-fil-red" variant="danger" v-on:click="showPay = false">
                    CLOSE
                </button>
            </div>
        </b-modal>
    </div>
     </div>
</template>
<script>
    export default {
        data() {
            return {
                allCoinbasePaymentCoins: ["BTC", "LTC", "ETH"],
                allCoinpaymentsPaymentCoins: ["BTC", "ETH", "LTC", "USDC", "USDT"],
                all_tokens: {
                    'user_token': '52342435234523452435234dsfgsdgr45624356gdfsgf'
                },
                endpoint: this.$store.state.apiEndPoint,
                stars: '',
                middleman: "coinpayments",
                months: "1",
                coinbasePaymentCoin: "BTC",
                coinpaymentsPaymentCoin: "BTC",
                partnerCode: "InsightX",
                timeLeft: null,
                timeDict: null,
                discount: null,
                allPrices: null,
                invoiceURL: null,
                invoiceAddress: null,
                invoiceAmount: null,
                invoiceCreatedAt: "No Invoices created yet.",
                invoiceMiddleman: null,
                invoiceMonths: null,
                invoiceStatus: null,
                invoicePaymentCoin: null,
                show: 'show',
                pay: false,
                showPay: false,
                payStat: [{
                    'payStat': 'null',
                    'elapsed': '12 minutes'
                }],
                tempPay: [{
                    'tempAddess': 'Choose options:'
                }],
                recentPay: [{
                        'date': '12-31-99'
                    },
                    {
                        'date': '12-31-99'
                    },
                    {
                        'date': '12-31-99'
                    },
                    {
                        'date': '12-31-99'
                    },
                    {
                        'date': '12-31-99'
                    },
                ],
                variants: [
                    'primary', 'black', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'dark4'
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
        
        methods: {
   createInvoice: function() {
                var token = sessionStorage.getItem('token')
                var url = ""
                var header = {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(token + ':unused')
                }
                //let that = this
                var that = this
                if (that.middleman == "coinbase") {
                    url = that.endpoint + "createcoinbasetx?months=" + that.months + "&coin=" + that.coinbasePaymentCoin
                } else if (that.middleman == "coinpayments") {
                    url = that.endpoint + "createcoinpaymenttx?months=" + that.months + "&coin=" + that.coinpaymentsPaymentCoin
                }
                fetch(url, {
                    method: "GET",
                    mode: 'cors',
                    headers: header,
                }).then(function(response) {
                    const contentType = response.headers.get('Content-Type')
                    if (contentType && contentType.indexOf('application/json') !== -1) {
                        return response.json()
                    } else {
                        that.$router.push('/')
                    }
                }).then(function(jsonResponse) {
                    if (that.middleman=="coinbase"){
                         that.invoiceAmount = jsonResponse.transaction.coin
                    } else {
                         that.invoiceAmount = jsonResponse.transaction.amount
                    }
                    that.invoiceAddress = jsonResponse.transaction.address
                    that.invoiceURL = jsonResponse.transaction.url
                    that.invoiceStatus = jsonResponse.transaction.status
                    that.invoiceMonths = jsonResponse.transaction.months
                    that.invoiceMiddleman = jsonResponse.transaction.middleman
                    that.invoiceCreatedAt = jsonResponse.transaction.createdAt
                    that.invoicePaymentCoin = jsonResponse.transaction.coin
                })
            },
            get_token: function() {
                var token = sessionStorage.getItem('token')
                var header = {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(token + ':unused')
                }
                //let that = this
                fetch(this.endpoint + "token", {
                    method: "POST",
                    mode: 'cors',
                    headers: header,
                    body: JSON.stringify({
                        exchange: this.selected[0].toLowerCase(),
                        key: this.keys,
                        secret: this.secret
                    })
                }).then(function(response) {}).then(function(response) {})
            },
        },
        props: ['tokens', 'paymentHistory'],
        beforeMount() {
            if (Object.keys(this.paymentHistory.pastInvoices).length > 0) {
                this.invoiceAmount = this.paymentHistory.pastInvoices[0].amount
                this.invoiceAddress = this.paymentHistory.pastInvoices[0].address
                this.invoiceCreatedAt = this.paymentHistory.pastInvoices[0].createdAt
                this.invoiceMonths = this.paymentHistory.pastInvoices[0].months
                this.invoiceStatus = this.paymentHistory.pastInvoices[0].status
                this.invoiceMiddleman = this.paymentHistory.pastInvoices[0].middleman
                this.invoiceURL = this.paymentHistory.pastInvoices[0].url
                this.invoicePaymentCoin = this.paymentHistory.pastInvoices[0].coin
            }
            this.payments = this.paymentHistory.pastInvoices
            this.timeLeft = this.paymentHistory.timeLeft
            this.allPrices = this.paymentHistory.prices
            this.discount = this.paymentHistory.discount
            this.timeDict = this.paymentHistory.timeDict
            this.partnerCode = this.paymentHistory.partnerCodeLabel
        },
        mounted() {
        },
        watch: {
            invoiceAmount: function(val) {
                this.invoiceAmount = val;
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    }

    .payBorder {
        border-radius: 5px;
        border: 3px solid rgb(255, 255, 255);
        margin-right: -2%;
        margin-left: -2%;
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

    .red {
        color: rgb(197, 53, 53);
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
        font-size: 11px;
        float: left;
    }

    .token-text2 {
        font-size: 11px;
        letter-spacing: 2px;
        float: left;
        white-space:nowrap;
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
        width: 100%;
        height: 250px;
        overflow: hidden;
        overflow-y: auto;
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
        font-size: 11px;
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

    input {
        background: #1a1a1a;
        color: white;
    }
    .nowrap{
        width:100px;
    }
    .black-form {
    background: #1a1a1a; 
    color: white;
}
</style>