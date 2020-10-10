<template>
  <div class="bg">
    <!-- Confirm filled modal -->
    <b-modal
      v-model="confirmFilledModal"
      size="md"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      :footer-bg-variant="footerBgVariant"
      :footer-text-variant="footerTextVariant"
    >
      <div slot="modal-header" class="w-100">
        <h5>Confirm Filled Change?</h5>
      </div>
      <div slot="modal-footer" class="w-100">
        <button
          size="sm"
          class="float-left btn-fil-blue2"
          variant="warning"
          @click="cancelFilled()"
        >CANCEL</button>
        <button
          size="sm"
          class="float-right btn-fil-blue2"
          variant="primary"
          @click="confirmFilled()"
        >CONFIRM</button>
      </div>
    </b-modal>
    <!-- Modal ADD manual exchange Component -->
    <!-- End confirm Filled modal -->
    <div>
      <b-table
        style="white-space:nowrap;"
        small
        @sort-changed="sortingChanged"
        :fields="fields"
        :filter="searchfilter"
        :items="finalList"
        caption-top
        id="table"
        class="tabletext my-table-scroll"
        width="100%"
      >
        <template slot="HEAD_Closed" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="table-labels text-nowrap">Trade Date/Time</div>
        </template>
        <template slot="HEAD_Exchange" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="dropdown">
            <button class="dropbtn nowrap table-labels">Exchange {{exchange}} ▼</button>
            <div class="dropdown-content">
              <a href="#" @click.stop v-on:click="filterExchange('all')">All</a>
              <a href="#" @click.stop v-on:click="filterExchange('bittrex')">Bittrex</a>
              <a href="#" @click.stop v-on:click="filterExchange('binance')">Binance</a>
              <a href="#" @click.stop v-on:click="filterExchange('coinbase')">Coinbase Pro</a>
              <span v-for="item in manualExchangeList" :key="item.id">
                <a href="#" :id="item" @click.stop v-on:click="filterExchange(item)">{{item}}</a>
              </span>
            </div>
          </div>
        </template>

        <template slot="HEAD_Market" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="dropdown">
            <button class="dropbtn nowrap table-labels">Market {{market}}</button>
          </div>
        </template>
          <template slot="HEAD_tradeType" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
            <div class="table-labels text-nowrap">Trade Type</div>
        </template>
        <template slot="HEAD_Price" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="dropdown">
            <button class="dropbtn nowrap table-labels">Price ▼</button>
            <div class="dropdown-content">
              <a @click="setExecuted(true)">Executed</a>
              <a @click="setExecuted(false)">Fees Inc.</a>
            </div>
          </div>
        </template>
        <template slot="HEAD_Breakeven" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="dropdown">
            <button class="dropbtn nowrap table-labels">Breakeven ▼</button>
            <div class="dropdown-content">
              <a @click="setTaker(true)">Taker</a>
              <a @click="setTaker(false)">Maker</a>
            </div>
          </div>
        </template>
        <template slot="HEAD_Leverage" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="table-labels text-nowrap">Leverage</div>
        </template>
        <!-- <template slot="HEAD_Filled" slot-scope="item">
          A custom formatted header cell for field 'name' 
          <div class="table-labels text-nowrap">Filled</div>
        </template> -->
        <template slot="HEAD_OrderType" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="table-labels">Order Type</div>
        </template>
        <template slot="HEAD_Amount" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="table-labels">Amount</div>
        </template>
        <template slot="HEAD_newCost" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="table-labels">Cost</div>
        </template>
        <template slot="HEAD_historicalValue" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="table-labels">Historical Value</div>
        </template>
        <template slot="HEAD_currentValue" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="table-labels">CurrentValue</div>
        </template>
        
        <template slot="HEAD_Commission" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="table-labels">Fees</div>
        </template>
         <template slot="HEAD_CommissionAsset" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="table-labels">Fee Asset</div>
        </template>
        <template slot="HEAD_tradechange" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="dropdown">
            <button class="dropbtn nowrap table-labels">% Change ▼</button>
            <div class="dropdown-content">
              <a @click="setPnl(false)">% Change</a>
              <a @click="setPnl(true)">PnL %</a>
            </div>
          </div>  
        </template>
        <template slot="Closed" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="tabletext text-nowrap text-left">{{item.value}}</div>
        </template>
        <template slot="Exchange" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="tabletext">{{item.value}}</div>
        </template>

        <template slot="Market" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="tabletext">{{item.value}}</div>
        </template>

        <template slot="tradeType" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="tabletext">{{item.value}}</div>
        </template>
        <template slot="Price" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="tabletext">{{ getPrice(item) }}</div>
        </template>
        <template slot="Breakeven" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="tabletext">{{ getBreakeven(item) }}</div>
        </template>
        <template slot="Leverage" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="tabletext">{{ getLeverage(item) }}</div>
        </template>
        <template slot="Filled" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="tabletext"> <b-form-checkbox
                      :disabled="getFilled(item)"
                      :checked="getFilled(item)"
                      @change="updateUserBalances(item.item.uniqueId)"
                    ></b-form-checkbox> </div>
        </template>
        <template slot="OrderType" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="tabletext">{{item.value}}</div>
        </template>
        <template slot="Amount" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="tabletext">{{lessThenOneFourDecimals(item.value)}}</div>
        </template>
        <template slot="newCost" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="tabletext float-right">{{item.value}}</div>
        </template>
        <template slot="historicalValue" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="tabletext float-left">{{item.value}}</div>
        </template>
        <template slot="tradeCurrentPrice" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="tabletext float-right">{{ item.value }}</div>
        </template>
        <template slot="tradechange" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="tabletext">
            <span :style="getColor(getPercentageChange(item))">{{ getPercentageChange(item) }}%</span>
          </div>
        </template>
        <template slot="CommissionAsset" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="tabletext">{{item.value}}</div>
        </template>
        <template slot="Commission" slot-scope="item">
          <!-- A custom formatted header cell for field 'name' -->
          <div class="tabletext">{{item.value}}</div>
        </template>
      </b-table>
    </div>
        <div class="loadover">
            <page-loader v-if="loader" />
        </div>
    <br>
  </div>
</template>

<script>
import PageLoader from '../loader/PageLoader'

export default {
  name: 'TradingHistoryChart',
  components: {
    PageLoader
  },
  data() {
    return {
      manualExchangeList: [],
      tableheight: {
        marginBottom: '0px'
      },
      globalVar: this.$store.state.apiEndPoint,
      tradeData: this.tradeDataHistory,
      loader: false,
      market: '',
      taker: true,      tableheight: {
        marginBottom: '0px'
      },
      exchange: '',
      confirmFilledModal: false,
      executed: true,
      resetData: null,
      pnl: false,
      uniqueIdToUpdate: null,
      finalList: [],
      headerBgVariant: 'black',
      headerTextVariant: 'light',
      bodyBgVariant: 'black',
      bodyTextVariant: 'light',
      footerBgVariant: 'black',
      footerTextVariant: 'light',
      fields: [
        {
          key: 'Closed',
          label: 'Trade Date/Time',
          sortable: true
        },
        {
          key: 'Exchange',
          label: 'Exchange'
        },
        {
          key: 'Market',
          label: 'Market'
        },

        {
          key: 'OrderType',
          label: 'OrderType',
          sortable: true
        },
        {
          key: 'tradeType',
          label: 'Trade Type',
          sortable: false
        },
        {
          key: 'Amount',
          label: 'Amount'
        },
        {
          key: 'Price',
          label: 'Price',
          sortable: true
        },
        {
          key: 'Breakeven',
          label: 'Breakeven',
          sortable: false
        },
        {
          key: 'Leverage',
          label: 'Leverage'
        },
        {
          key: 'newCost',
          label: 'Cost'
        },
        {
          key: 'tradeCurrentPrice',
          label: 'Current Price',
          sortable: true
        },
        {
          key: 'tradechange',
          label: '% Change',
          sortable: true
        },
        {
          key: 'Commission',
          label: 'Fees',
          sortable: true
        },
        {
          key: 'CommissionAsset',
          label: 'Fee Asset',
          sortable: true
        }
      ]
    }
  },
  mounted() {
    for (let elem in this.$store.state.manualExchanges) {
      if (
        this.$store.state.manualExchanges[elem] != 'bittrex' &&
        this.$store.state.manualExchanges[elem] != 'bittrex' &&
        this.$store.state.manualExchanges[elem] != 'coinbase'
      ) {
        this.manualExchangeList.push(this.$store.state.manualExchanges[elem])
      }
    }
  },
  created() {
    this.$nuxt.$on('tradeLoaderOff', data => {
      this.loader = data
    })

    this.$nuxt.$on('tradeDataChange', val => {
      this.tradeData = val
      this.updateTable()
    })
  },
  props: ['tradeDataHistory', 'searchfilter'],
  methods: {
      lessThenOneFourDecimals(value){
    if (value >= 1){
      let adjusted = Number(value).toFixed(4);
      return adjusted;
    }else if (value == '-'){
      return value
    }
    else{
      let adjusted = Number(value).toFixed(8);
      return adjusted;
    }
  },
    setPnl(value) {
      this.pnl = value
    },
    setExecuted(value) {
        this.executed = value
    },
    updateUserBalances(data){
      this.confirmFilledModal = true
      this.uniqueIdToUpdate = data
    },
    cancelFilled(){
      this.confirmFilledModal = false
      this.uniqueIdToUpdate = null
    },
    confirmFilled() {
      let url = 'api/updateCoinBalances'
      let that = this
      let body = {
        uniqueId: this.uniqueIdToUpdate
      }
      this.$insightfetch(url, 'POST', body, 'cors', 'same-origin', true).then(function(myResponse) {
            that.confirmFilledModal = false
      })
    },
    getFilled(data) {
      if (data.item.orderDetails != null) {
        if (data.item.orderDetails.filled == true) {
          return true
        } else {
          return false
        }
      }
      if (data.item.spotOrderDetails != null){
        if (data.item.spotOrderDetails.filled == true) {
          return true
        } else {
          return false
        }
      }
      return true
    },
    getPrice(data){
        if (data.item.orderDetails == null) {
            return data.item.Price
        }
        if (this.executed == true) {
            return data.item.orderDetails.executed
        } else {
            return data.item.orderDetails.feesIncluded
        }
    },
    setTaker(value) {
        this.taker = value
    },
    getBreakeven(data){
        if (data.item.spotOrderDetails != null) {
          return data.item.spotOrderDetails.breakeven
        }
        if (this.taker == true) {
            return data.item.breakevenTaker
        } else {
            return data.item.breakevenMaker
        }
    },
    getLeverage(data) {
        if (data.item.orderDetails != null) {
          return data.item.orderDetails.leverage
        }
        return "-"
    },
    getPercentageChange(data) {
      if (data.item.orderDetails == null) {
            return Number.parseFloat(data.item.tradechange).toFixed(2)
      }
      if (this.pnl == false) {
        if (this.executed == true) {
            return Number.parseFloat(data.item.orderDetails.pricePercentageExecuted).toFixed(2)
        } else {
            return Number.parseFloat(data.item.orderDetails.pricePercentageFeesIncluded).toFixed(2)
        }
      } 
      else {
        if (this.executed == true) {
          return Number.parseFloat(data.item.orderDetails.pnlExecuted).toFixed(2)
        } else {
          return Number.parseFloat(data.item.orderDetails.pnlFeesIncluded).toFixed(2)
        }
      }
    },
    getColor(num) {
      var iNum = parseFloat(num)
      if (iNum < 0) {
        return {
          color: 'red'
        }
      } else {
        return {
          color: 'green'
        }
      }
    },
    sortingChanged(ctx) {
      this.finalList = []
      this.loader = true
      var direction = ''
      var sortby = ctx.sortBy
      if (ctx.sortDesc == true) {
        direction = 'down'
      } else {
        direction = 'up'
      }
      var sortObj = {
        direction: direction,
        sortby: sortby
      }
      this.$nuxt.$emit('sortTrades', sortObj)
      return
    },
    filterExchange(exchange) {
      this.$nuxt.$emit('tradeHistoryExchange', exchange)
    },
    checkZero(num) {
      if (isNaN(num) || num == 0) {
        return '-'
      }
      var number = num.toLocaleString('en')
      if (number.includes('.')) {
        var parts = number.split('.')
        parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return parts.join('.')
      } else {
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    },
    updateTable() {
      this.finalList = []
      try {
        for (var element in this.tradeData.editedorders) {
          let priceFixed =
            this.tradeData.editedorders[element].Market.substring(
              this.tradeData.editedorders[element].Market.length - 3,
              this.tradeData.editedorders[element].Market.length
            ) == 'USD' ||
            this.tradeData.editedorders[element].Market.substring(
              this.tradeData.editedorders[element].Market.length - 4,
              this.tradeData.editedorders[element].Market.length
            ) == 'USDT'
              ? 2
              : 8
          let cost = this.checkZero(
            Number.parseFloat(
              this.tradeData.editedorders[element].Cost
            ).toFixed(8)
          )
          let currentTradePrice = this.checkZero(
            Number.parseFloat(
              this.tradeData.editedorders[element].TradeCurrentPrice
            ).toFixed(priceFixed)
          )
          let tradeChangeCur = this.checkZero(
            Number.parseFloat(
              this.tradeData.editedorders[element].percentChange
            ).toFixed(2)
          )
          let breakevenTaker =
            this.tradeData.editedorders[element].orderDetails != null
              ? this.tradeData.editedorders[element].orderDetails.breakevenTaker
              : '-'
          let breakevenMaker =
            this.tradeData.editedorders[element].orderDetails != null
              ? this.tradeData.editedorders[element].orderDetails.breakevenMaker
              : '-'
          let feesIncluded =
            this.tradeData.editedorders[element].orderDetails != null
              ? this.tradeData.editedorders[element].orderDetails.feesIncluded
              : '-'
          let executed =
            this.tradeData.editedorders[element].orderDetails != null
              ? this.tradeData.editedorders[element].orderDetails.executed
              : '-'
          this.finalList.push({
            Closed: this.tradeData.editedorders[element].Closed,
            Exchange: this.tradeData.editedorders[element].Exchange,
            Market: this.tradeData.editedorders[element].Market,
            OrderType: this.tradeData.editedorders[element].OrderType,
            Amount: this.checkZero(
              Number.parseFloat(
                this.tradeData.editedorders[element].Amount
              ).toFixed(8)
            ),
            Price: this.checkZero(
              Number.parseFloat(
                this.tradeData.editedorders[element].Price
              ).toFixed(priceFixed)
            ),
            newCost: cost,
            Commission: this.checkZero(
              Number.parseFloat(
                this.tradeData.editedorders[element].Commission
              ).toFixed(8)
            ),
            tradechange: tradeChangeCur,
            tradeCurrentPrice: currentTradePrice,
            CommissionAsset: this.tradeData.editedorders[element]
              .CommissionAsset,
            breakevenTaker: breakevenTaker,
            breakevenMaker: breakevenMaker,
            executed: executed,
            feesIncluded: feesIncluded,
            tradeType: this.tradeData.editedorders[element].txType,
            uniqueId: this.tradeData.editedorders[element].uniqueId,
            orderDetails: this.tradeData.editedorders[element].orderDetails,
            spotOrderDetails: this.tradeData.editedorders[element].spotOrderDetails,
            _rowVariant: 'dark2'
          })
        }
      } catch (e) {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
[v-cloak] > * {
  display: none;
}

[v-cloak]::before {
  content: 'loading…';
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

.table-wrap {
  width: 100%;
  position: relative;
  margin-top: 16px;
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
  height: 30px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-weight: bold;
  outline-style: none;
}

* {
  outline-style: none;
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


</style>