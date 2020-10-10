<template>
    <div>
        <b-row class="wrapper2">
            <b-col cols="12">
                <b-row>
                    <b-col>
                        <div class="filter-space nowrap"><br>
                            <h5 class="title" style="float:left;">TRANSACTION HISTORY</h5>
                        </div>
                        <div style="float:right;margin-bottom:20px;">
                            <button class="searchBtn" @click="refreshCoin()" type="button">
                                <fa icon="redo" /></button>
                            <input v-model="searchCoin" class="search" placeholder="    Search" type="text">
                            <button class="searchBtn" @click="searchByCoin('search')" type="button">
                                <fa icon="search" /></button>
                        </div>
                        <div style="float:right;white-space:nowrap;margin-right:20px;margin-top:-3px;" class="buttontext">
                            <button type="button" @click="toggleWithdrawDepositModal()" variant="primary" class="btn-fil" style="position:relative; top:5px;">+ Exchange Deposit/Withdrawal</button>
                            <button type="button" @click="toggleManualTradeModal()" variant="primary" class="btn-fil" style="position:relative; top:5px;">+ Manual Trade</button>
                            <button type="button" @click="toggleWalletTransactionModal()" variant="primary" class="btn-fil" style="position:relative; top:5px;">+ Wallet Transaction</button>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <div>
        </div>
        <Transactions :searchfilter="search" :tradeData="history" style="position:relative; top:-20px;margin-bottom:-15px;"></Transactions>
       <div style="position:relative; top:-17px;">
            <paginationTransactions></paginationTransactions>
            </div>
    </div>
</template>

<script>
    import Transactions from '~/components/transactionTable/TransactionsTable'
    import paginationTransactions from '~/components/pagination/paginationTransactions'

    export default {
        name: "transactionFilter",
        props: ['history', 'addresses'],
        data() {
            return {
                tableData: this.history,
                search: '',
                fmAddress: null,
                toAddress: null,
                amount: null,
                items: [],
                searchCoin: null
            }
        },
        components: {
            Transactions,
            paginationTransactions,
        },
        mounted() {
        },
        methods: {
     toggleManualTradeModal(value){
     this.$store.commit('modals/toggleTransactionsModal', value);
            },
     toggleWithdrawDepositModal(value){
     this.$store.commit('modals/togglewithdrawDepositModal', value);
            },
    toggleWalletTransactionModal(value){
     this.$store.commit('modals/toggleWalletTransactionModal', value);
            },
            refreshCoin() {
                this.$nuxt.$emit('searchByCoinTransaction', (null))
                this.searchCoin = null;
            },
            searchByCoin() {
                this.$nuxt.$emit('searchByCoinTransaction', (this.searchCoin))
                this.searchCoin = null;
                this.$nuxt.$emit('searchResetPage', (1))
            },
        },
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
        margin-top: -1%;
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