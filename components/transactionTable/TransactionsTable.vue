<template>
  <div id="tickerSpace" style="font-size:14px;">
    <div style="margin-top:-20px;">
    <b-table class="my-table-scroll2" small @sort-changed="sortingChanged" :fields="fields" :filter="searchfilter" :items="finalList">
    <template slot="delete" scope="item">
    <div v-if="item.item.isManual == 'manual'" class="delete" v-on:click=" toggleDeleteModal('open', item.item.uniqueId, item.item.type, item.index)">
      <img src="/other/delete.svg" style="position: relative; top:-10px; margin-bottom: -22px;" width="30%" />
    </div>
    </template>
<!-- ************************************************* -->
<template slot="HEAD_delete" scope="item">
    <div class="table-labels">
      Delete
    </div>
    </template>
<template slot="HEAD_closed" scope="item">
    <div class="table-labels" style="margin-left:-20px;">
      Trade Date/Time
    </div>
    </template>
<template slot="HEAD_source" scope="item">
    <div class="dropdown">
    <button class="dropbtn nowrap table-labels">Source ▼</button>
    <div class="dropdown-content">
        <a href="#" @click.stop v-on:click="filterBySource('all')">All</a>
        <!--<a href="#" @click.stop v-on:click="filterBySource('bittrex')">Bittrex</a>
        <a href="#" @click.stop v-on:click="filterBySource('coinbase')">Coinbase Pro</a>
        <a href="#" @click.stop v-on:click="filterBySource('binance')">Binance</a>-->
        <a href="#" @click.stop v-for="nick in userWalletNames"  v-on:click="filterBySource(nick)" :key='nick' >{{nick}}</a>
        <a href="#" @click.stop v-for="exchange in $store.state.manualExchanges"  v-on:click="filterBySource(nick)" :key='exchange' >{{exchange}}</a>
    </div>
    </div> 
    </template>

<template slot="HEAD_type" scope="item">
    <div class="table-labels">
    Tx Type
    </div>
    </template>

<template slot="HEAD_incoming" scope="item">
    <div class="table-labels">
    Incoming
    </div>
    </template>

<template slot="HEAD_incoin" scope="item">
    <div class="table-labels">
    Currency
    </div>
    </template>

<template slot="HEAD_historical" scope="item">
    <div class="table-labels"  style="margin-left:-10px;">
    Historical Value
    </div>
    </template>

<template slot="HEAD_currentVal" scope="item">
    <div class="table-labels">
    Current Value
    </div>
    </template>

<template slot="HEAD_currentVal" scope="item">
    <div class="table-labels">
    Current Value
    </div>
    </template>

<template slot="HEAD_change" scope="item">
    <div class="table-labels">
    % Change
    </div>
    </template>

<template slot="HEAD_outgoing" scope="item">
    <div class="table-labels">
    Outgoing
    </div>
    </template>

<template slot="HEAD_outcoin" scope="item">
    <div class="table-labels">
    Currency
    </div>
    </template>

<template slot="HEAD_historicalOut" scope="item">
    <div class="table-labels" style="margin-left:-10px;">
    Historical Value
    </div>
    </template>

<template slot="HEAD_currentValueOut" scope="item">
    <div class="table-labels">
    Current Value
    </div>
    </template>

<template slot="HEAD_percentChangeOut" scope="item">
    <div class="table-labels">
    % Change
    </div>
    </template>

<template slot="HEAD_fees" scope="item">
    <div class="table-labels">
    Fees
    </div>
    </template>

    <template slot="HEAD_commissionAsset" scope="item">
    <div class="table-labels">
    Fees Asset
    </div>
    </template>

<template slot="HEAD_tag" scope="item">
    <div class="table-labels">
    TAG
    </div>
    </template>

<template slot="closed" scope="item">
    <div class="tabletext text-nowrap text-left">
      {{item.value}}
    </div>
    </template>

<template slot="source" scope="item">
    <div class="tabletext">
      {{item.value}}
    </div>
    </template>

<template slot="type" scope="item">
    <div class="tabletext">
    {{item.value}}
    </div>
    </template>

<template slot="incoming" scope="item">
    <div class="tabletext float-right">
    {{item.value}}
    </div>
    </template>

<template slot="incoin" scope="item">
    <div class="tabletext">
    {{item.value}}
    </div>
    </template>

<template slot="historical" scope="item">
    <div class="tabletext">
    {{item.value}}
    </div>
    </template>

<template slot="currentVal" scope="item">
    <div class="tabletext">
    {{item.value}}
    </div>
    </template>

<template slot="change" scope="item">
    <div class="tabletext">
        <span :style="getColor(item.value)">{{item.value}}%</span>
    </div>
    </template>

<template slot="outgoing" scope="item">
    <div class="tabletext float-right">
    {{item.value}}
    </div>
    </template>

<template slot="outcoin" scope="item">
    <div class="tabletext">
    {{item.value}}
    </div>
    </template>

<template slot="historicalOut" scope="item">
    <div class="tabletext">
    {{item.value}}
    </div>
    </template>

<template slot="currentValueOut" scope="item">
    <div class="tabletext">
    {{item.value}}
    </div>
    </template>

<template slot="percentChangeOut" scope="item">
    <div class="tabletext">
    <span :style="getColor(item.value)">{{getPrefix(item.value)}}</span>
    </div>
    </template>

<template slot="fees" scope="item">
    <div class="tabletext float-right">
    {{item.value}}
    </div>
    </template>
<template slot="commissionAsset" scope="item">
    <div class="tabletext float-right">
    {{item.value}}
    </div>
    </template>

<template slot="tag" scope="item">
    <div class="tabletext">
    {{item.value}}
    </div>
    </template>

<!-- ********************************************* -->
<template slot="HEAD_inHistorical" scope="item">
    <div class="table-labels">
    <div class="dropdown table-labels">
    <button class="dropbtn nowrap">Historical Val</button>
    <div class="dropdown-content">
    <a href="#" v-on:click="pick_currency_Price = 'fiat'">FIAT*</a>
    <a href="#"  v-on:click="pick_currency_Price = 'btc'">BTC</a>
    <a href="#" v-on:click="pick_currency_Price = 'bnb'">BNB</a>
    </div>
    </div>     
    </div>
    </template>

<template slot="HEAD_inCurrentVal" scope="item">
    <div class="table-lables">
    <div class="dropdown">
    <button class="dropbtn nowrap">Current Val</button>
    <div class="dropdown-content">
    <a href="#" v-on:click="pick_currency_Price = 'fiat'">FIAT*</a>
    <a href="#"  v-on:click="pick_currency_Price = 'btc'">BTC</a>
    <a href="#" v-on:click="pick_currency_Price = 'bnb'">BNB</a>
    </div>
    </div>     
    </div>
    </template>

<template slot="HEAD_outHistorical" scope="item">
    <div class="table-labels">
    <div class="dropdown">
    <button class="dropbtn nowrap">Historical Val</button>
    <div class="dropdown-content">
    <a href="#" v-on:click="pick_currency_Price = 'fiat'">FIAT*</a>
    <a href="#"  v-on:click="pick_currency_Price = 'btc'">BTC</a>
    <a href="#" v-on:click="pick_currency_Price = 'bnb'">BNB</a>
    </div>
    </div>     
    </div>
    </template>

<template slot="HEAD_outCurrentVal" scope="item">
    <div class="table-labels">
    <div class="dropdown">
    <button class="dropbtn nowrap">Current Val</button>
    <div class="dropdown-content">
    <a href="#" v-on:click="pick_currency_Price = 'fiat'">FIAT*</a>
    <a href="#"  v-on:click="pick_currency_Price = 'btc'">BTC</a>
    <a href="#" v-on:click="pick_currency_Price = 'bnb'">BNB</a>
     </div>
    </div>     
    </div>
    </template>


      </b-table>
  </div>
  <div class="loadover">
  <page-loader v-if="loader" />
  </div>
    </div>
</template>

<script>
import PageLoader from '../loader/PageLoader'

export default {
    name: 'TransactionsTable',
  components: {
      PageLoader
  },
  data () {
    return {
      userWalletNames: [],
      deleteData: null,
        loader: false,
          source: "All",
   finalList: [],
            charge: '',
            fields: [
              { key: 'closed',
                label: "Trade Date/Time",
                sortable: true,
              },
              { key: 'source', 
                label:"Source",
                sortable:true,
              },
              { key: 'type', 
                label:"Tx Type",
                sortable:true

              },
                { key: 'incoming', 
                label:"Incoming",
                sortable:true

              },
              { key: 'incoin', 
                label:"Currency",
                sortable:true
              },

              {
                key:'historical',
                label:"Historical Value",
                sortable:true

              },
              {
                key:"currentVal",
                label:"Current Value",
                sortable:true
              },
              {
                key:"change",
                label: '% Change',
                sortable:  true
              },
               {
                key: "outgoing",
                label: "Outgoing",
                sortable: true
              },
              { key: 'outcoin', 
                label:"Currency",
                sortable:true
              },
              {
                key:'historicalOut',
                label:"Historical Value",
                sortable:true

              },
              {
                key:"currentValueOut",
                label:"Current Value",
                sortable:true
              },
              {
                key:"percentChangeOut",
                label: '% Change',
                sortable:  true
              },
             
              {
                key: "fees",
                label: "Fees",
                sortable: true
              },
              {
                key:"commissionAsset",
                label: "Fee Asset",
                sortable: true

              },
                {
                key: "tag",
                label: "TAG",
                sortable: true
              },
              {
                key: "delete",
                label: "Hide/Delete",
              },
              ],
              tradeDataEdited: [],
    }
  },
props:['tradeData', 'searchfilter', 'addresses'],
created() {
 this.$nuxt.$on('pushWalletTransaction', () => {

 }),
  this.$nuxt.$on("confirmDelete", () =>{
    this.deleteTransaction(this.deleteData);
}),
 this.$nuxt.$on("transactionLoaderOff", (data) =>{
     this.loader = data
 }),
 this.$nuxt.$on("TransactionsSortResponse", (data) => {
      this.tradeDataEdited = [];
      this.tradeDataEdited = data;
      this.pushTableDataSorted();
    })
  },
mounted(){

this.sourceDropdown();
  },
methods: {
  toggleDeleteModal(open, id, type, index) {
    let data = {
      'id' : id,
      'type': type,
      'index': index
    }
    this.$store.commit('modals/toggledeleteTransactionsModal', open, id);
    this.deleteData = data;
    },
  sourceDropdown(){
for (let elem in this.$store.state.generalData.walletAddresses) {
this.userWalletNames.push(this.$store.state.generalData.walletAddresses[elem].Nickname);
}

  },
      getPrefix(val){
            if(val < 0){
                return val
            }else{
                return '+' + val.toString();
            }
            },
      getColor (num) {
    var iNum = parseFloat(num);
    if (iNum < 0) {
      return {'color': 'red'}
    } else{
      return {'color':'green'}
    }},
    sortingChanged(ctx){
        this.finalList = []
        this.loader = true
        var direction = ""
        var sortby = ctx.sortBy
        if (ctx.sortDesc == true) {
            direction = "down"
        } else {
            direction = "up"
        }
        var sortObj = { 'direction': direction, "sortby": sortby }
        this.$nuxt.$emit("sortTransactions", (sortObj) )
        return
    },
    deleteTransaction(data) {
        var that = this;
        var manualEndpoint = "api/deleteManualTransaction"
        let depositOrWithdrawEndpoint = "api/deleteWalletDepositOrWithdrawal"
        let url = null;
        let body = null;
        let id = data.id;
        let type = data.type;
        let index = data.index;
        if (type == 'DEPOSIT' || type == 'WITHDRAWAL'){
          url = depositOrWithdrawEndpoint;
          body = {
            'transactions': [{
            'uniqueId': this.tradeDataEdited[index].uniqueId,
            'exchange' : this.tradeDataEdited[index].source,
             'coin': this.tradeDataEdited[index].incoin,
             'fee' : this.tradeDataEdited[index].fee,
             'amount' : this.tradeDataEdited[index].amount,
             'tradeTime' : this.tradeDataEdited[index].date,
             'fundType' : this.tradeDataEdited[index].txType
             }]
            }
        }else{
          url = manualEndpoint;
          body = {"uniqueId": id}
        }
        that.$insightfetch(url, 'POST', body, 'cors', 'same-origin', true).then(function(myResponse) {
        if (myResponse.result == 'success'){
        that.$nuxt.$emit('sortDelete', 'delete');
      } 
    })
    },
  checkZero(num){
    if (isNaN(num)|| num == 0){
        return "-"
      }
      var number = num.toLocaleString('en')
      if (number.includes(".")){
          var parts = number.split(".")
          parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          return parts.join(".")
      } else {
          return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
  },
   pushTableDataSorted(){
     this.finalList = [];
    for(var element in this.tradeDataEdited){
        try {

    let source = (this.tradeDataEdited[element].displayName != undefined) ? this.truncate(this.tradeDataEdited[element].displayName) : this.truncate(this.tradeDataEdited[element].source)
    this.finalList.push({
        'closed': this.tradeDataEdited[element].date, 
        'source': source, 
        'type':this.tradeDataEdited[element].txType,
        "incoming": this.checkZero(Number.parseFloat(this.tradeDataEdited[element].incoming).toFixed(8)), 
        "incoin":this.tradeDataEdited[element].incoin, 
        "historical": this.checkZero(Number.parseFloat(this.tradeDataEdited[element].historicalValue).toFixed(2)), 
        "currentVal": this.checkZero(Number.parseFloat(this.tradeDataEdited[element].currentValue).toFixed(2)), 
        "change": this.checkZero(Number.parseFloat(this.tradeDataEdited[element].percentChange).toFixed(2)), 
        "outgoing": this.checkZero(Number.parseFloat(this.tradeDataEdited[element].outgoing).toFixed(8)), 
        "fees": this.checkZero(Number.parseFloat(this.tradeDataEdited[element].fee).toFixed(8)),
        "tag": this.tradeDataEdited[element].tag, 
        "uniqueId": this.tradeDataEdited[element].uniqueId,
        "isManual": this.tradeDataEdited[element].isManual,
        _rowVariant: "dark2",
        "commissionAsset": this.tradeDataEdited[element].CommissionAsset,
        "percentChangeOut": this.checkZero(Number.parseFloat(this.tradeDataEdited[element].percentChangeOut).toFixed(2)),
        "currentValueOut": this.checkZero(Number.parseFloat(this.tradeDataEdited[element].currentValueOut).toFixed(2)),
        'historicalOut': this.checkZero(Number.parseFloat(this.tradeDataEdited[element].historicalValueOut).toFixed(2)),
        'outcoin': this.tradeDataEdited[element].outcoin})
    } catch (e) {
      console.log(e)
    }

  }
  },
    filterBySource(source){
        this.source = source
        this.$nuxt.$emit("changeSource", this.source)
    },
    truncate(input) {
      if (input.length > 10)
          return input.substring(0,10) + '...';
      else
          return input;
}
}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

[v-cloak] > * { display:none }
[v-cloak]::before { content: "loading…" }
.delete{
  cursor: pointer;
}
.table-dark2:nth-child(odd){
  background-color: rgb(10, 10, 10) !important;
  border: 3px solid rgba(54, 53, 53, 0.815);
  border-right: black;
  border-left: black;
}
.table-dark2:nth-child(even){
  background-color: rgb(0, 0, 0) !important;
  border: 3px solid rgba(54, 53, 53, 0.815);
  border-right: black;
  border-left: black;
}

.hide-head{
  background-color: rgb(0, 0, 0);
  width:100%;
  height:5px;
}
.bg{
  background-color: black;
}
.white{
  color: white;
}
.green{
  color: green;
}
.red{
  color: rgb(0, 17, 255);
}
.square {
  height: 22px;
  width: 7px;
  position:relative;
}
.gray{
  background-color:rgb(32, 32, 32);
}
.search{
  width: 100px;
  border: 2px solid rgb(204, 204, 204);
  background: transparent;
  border-radius: 25px;
  height: 30px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-weight: bold;
  outline-style: none
}
* {
    outline-style: none
}
.borderblack{
  background: black;
  position: relative; 
  margin-top:52px;
  z-index:5;
}
.square2 {
  height: 10px;
  width: 1000px;
  position:relative;
  background: rgb(0, 0, 0);
  top:1px;
  z-index: 5;
}
/* width */
::-webkit-scrollbar {
    width: 7px;
    height:7px;
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
    background: rgb(19, 18, 18); 
}
::-webkit-scrollbar-corner {
        background: rgb(0, 0, 0); 
}
#price{
z-index: 5;
position: absolute;
right: 100px;
top: 5px;
}

.table-labels{
    white-space: nowrap;
    font-weight: bold;
}
</style>
