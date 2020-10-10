<template>
     <div>
         <!-- MODAL -->
         <div>
             <b-modal id="deposit" size="lg" centered v-model="$store.state.modals.withdrawDepositModal" title="Add Exchange Deposit/Withdrawal" :header-bg-variant="headerBgVariant" :header-text-variant="headerTextVariant" :body-bg-variant="bodyBgVariant" :body-text-variant="bodyTextVariant" :footer-bg-variant="footerBgVariant" :footer-text-variant="footerTextVariant" @hide="toggleWithdrawDepositModal()">
                 <span v-if="transactions != 0">
                 <b-row>
                     <b-col class="modalTable">
                <span  style="margin-left:20%;">
                    <b-table striped hover  small :items="transactions" style="color:white;"></b-table>
                     </span>
                     </b-col>
                </b-row>
                    <br><br>
                 </span>
                 <b-row class="my-1">
                     <b-col sm="2">
                         <label style="white-space:nowrap;" for="input-large">Coin symbol:</label>
                     </b-col>
                     <b-col sm="10">
                         <input v-model="symbol" id="input-large" size="lg" type="text" class="drop-input" placeholder="Coin Symbol" />
                     </b-col>
                 </b-row>

                 <b-row class="my-1">
                     <b-col sm="2">
                         <label style="white-space:nowrap;" for="input-large">Exchange:</label>
                     </b-col>
                     <b-col sm="10">
                    <b-input-group>
                    <input v-model="exchange" id="input-large" list="exchangeItems" size="lg" type="text" class="drop-input" placeholder="Exchange" />
                    <datalist id="exchangeItems">
                    <option v-for="items in manualExchangeList" :value="items" :key="items" />
                    </datalist>
                    </b-input-group>    
                    </b-col>
                 </b-row>

                 <b-row class="my-1">
                     <b-col sm="2">
                         <label style="white-space:nowrap;" for="input-large">Amount:</label>
                     </b-col>
                     <b-col sm="10">
                         <input v-model="amount" id="input-large" size="lg" type="text" class="drop-input" placeholder="amount of transaction" />
                     </b-col>
                 </b-row>

                 <b-row class="my-1">
                     <b-col sm="2">
                         <label style="white-space:nowrap;" for="input-large">Fee:</label>
                     </b-col>
                     <b-col sm="10">
                         <input class="drop-input" placeholder="*optional" v-model="fee" id="input-large" size="sm" type="text" />
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
                 <div slot="modal-header" class="w-50">
                     <h5>Add Exchange Deposit/Withdrawal</h5>
                 </div>
                 <div slot="modal-footer" class="w-50">
                     <b-row class="my-1">
                         <b-col>
                             <button class="btn-fil-red" style="float:left;margin-left:-100%;" @click="$root.$emit('bv::hide::modal','deposit')">Close</button>
                             <button class="btn-fil-yellow" @click="addDepositWithdrawel()">Add</button>
                             <button class="btn-fil-red" @click="clear()">Clear</button>
                             <button class="btn-fil-blue" @click="updateTransactions()">Update</button>
                         </b-col>
                     </b-row>
                 </div>
             </b-modal>
         </div>
     </div>
 </template>

 <script>
     import { mapState } from 'vuex'

     export default {
         name: "withdrawDeposit",
         data() {
             return {
                 activateUpdateButton: false,
                 predictiveListExchange: [],
                 transactions: [],
                 amount: null,
                 exchange: null,
                 currency: null,
                 symbol: null,
                 transactionType: null,
                 fee: null,
                 transactionTime: null,
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
         components: {

         },
         mounted() {

         },
         computed: {
            ...mapState({
                manualExchangeList: state => state.manualExchanges
            })
        },
        watch: {

         },
         methods: {
             toggleLoadingModal(value) {
                 this.$store.commit('modals/toggleLoadingModal', value);
             },
             toggleWithdrawDepositModal() {
                 this.$store.commit('modals/togglewithdrawDepositModal');
             },
             clear() {
                 this.exchange = [];
                 this.transactions = [];
                 this.predictiveListExchange = [],
                 this.amount = null,
                 this.currency = null,
                 this.symbol = null,
                 this.transactionType = null,
                 this.fee = null,
                 this.transactionTime = null
             },
             addDepositWithdrawel() {
                 let that = this;
                 if ( 
                 this.exchange == null || 
                 this.symbol == null || 
                 this.amount == null || 
                 this.transactionTime == null || 
                 this.transactionType == null) {
                      that.$toast.error('Please, fill in required sections to Add.', {
                             icon: 'warning'
                         });
                 this.activateUpdateButton = false
                     return null;
                 }else{
                if (!this.manualExchangeList.includes(this.exchange.toLowerCase())){
                        this.$toast.error("Please choose a valid exchange from the dropdown.", {
                            icon: 'warning'
                    });
                    return
                }
                    this.activateUpdateButton = true
                    this.transactions.push(
                { 
                 'exchange': this.exchange,
                 'coin': this.symbol,
                 'amount': this.amount,
                 'fee': this.fee,
                 'tradeTime': this.transactionTime,
                 'fundType': this.transactionType
                 });
                 }
             },
            updateTransactions() {
                 let that = this;
                 let url = "api/manualExchangeDepositOrWithdrawal"
                 let body = {
                 'transactions': this.transactions
                 }
                 if (this.activateUpdateButton == true) {
                 that.toggleLoadingModal('on')
                 that.$insightfetch(url, 'POST', body).then(function(myResponse) {
                     if (myResponse.result == 'success') {
                         that.$toast.success(myResponse.result, {
                         });
                         that.toggleLoadingModal('off');
                       // that.$root.$emit('bv::hide::modal','loadingModal')
                        that.$root.$emit('bv::hide::modal','deposit')   
                     } else {
                         that.toggleLoadingModal('off');
                         that.$toast.error(myResponse.reason, {
                             icon: 'warning'
                         });
                     }
                      that.$nuxt.$emit('sortTransactions', {
                        'direction': "down",
                        'sortby': 'closed'
                    })
                     return myResponse;
                 })
                 }else{
                        that.$toast.error('Please, fill in required sections to Update.', {
                             icon: 'warning'
                         });
                 }
            },
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
         background: #1a1a1a !important;
         border: none;
         font-size: 12px;
         height: 30px;
         width: 100%;
         border-radius: 3px;
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
     .modalTable{
         max-height: 250px;
         overflow-x: hidden;
        overflow-y: scroll;
     }
 </style>