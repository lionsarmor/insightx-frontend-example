<template>
  <div>
    <!-- Modal Derivative confirm Component -->
    <b-modal
      v-model="confirmDerivative"
      size="md"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      :footer-bg-variant="footerBgVariant"
      :footer-text-variant="footerTextVariant"
    >
      <b-container>
        <b-row>
          <b-col cols="6">
            <div style="inline">
              <div style="float: left;font-weight:bold;margin-right:48px;">Exchange:</div>
              <div  style="margin-left:50px;float: left;color:#65cdfa;">{{exchange}}</div>
            </div>
            <br>
            <br>
            <div>
              <div style="float: left;font-weight:bold;margin-right:5px;">Market:</div>
              <div style="float: left;color:#65cdfa;margin-left:110px;">{{exchangeMarket}}</div>
            </div>
            <br>
            <br>
            <div style="inline,">
              <div style="float: left;font-weight:bold;margin-right:5px;">Type:</div>
              <div style="float: left;color:#65cdfa;margin-left:130px;">{{transactionType}}</div>
            </div>
            <br>
            <br>
            <div>
              <div style="float: left;font-weight:bold;margin-right:5px;">Entry Price:</div>
              <div style="float: left;color:#65cdfa;margin-left:83px;">{{price}}</div>
            </div>
            <br>
            <br>
            <div style="inline,">
              <div style="float: left;font-weight:bold;margin-right:5px;">Fees Included:</div>
              <div style="float: left;color:#65cdfa;margin-left:27px;">{{ feeIncluded }}</div>
            </div>
            <br>
            <br>
            <div style="inline,">
              <div style="float: left;font-weight:bold;margin-right:5px;">Breakeven</div><br>
              <div style="float: left;font-weight:bold;margin-right:5px;">Maker:</div>
              <div style="float: left;color:#65cdfa;margin-left:27px;">{{ breakeven.maker }}</div><br>
              <div style="float: left;font-weight:bold;margin-right:5px;">Taker:</div>
              <div style="float: left;color:#65cdfa;margin-left:27px;">{{ breakeven.taker }}</div>
            </div>
            <br>
            <br>
            <div style="inline,">
              <div style="float: left;font-weight:bold;margin-right:5px;">Amount/Position:</div>
              <div style="float: left;color:#65cdfa;margin-left:27px;">{{amount}} Contracts</div>
            </div>
            <br>
            <br>
            <div style="inline,">
              <div style="float: left;font-weight:bold;margin-right:48px;">Leverage:</div>
              <div style="float: left;color:#65cdfa;margin-left:57px;">{{leverage}}x</div>
            </div>
            <br>
            <br>
            <div style="inline,">
              <div style="float: left;font-weight:bold;margin-right:-1px;">Equity/Margin:</div>
              <div v-if="crossMargin == 'false'" style="float: left;color:#65cdfa;margin-left:57px;">{{equity}} {{baseCurrency}}</div>
              <div v-if="crossMargin == 'true'" style="float: left;color:#65cdfa;margin-left:57px;">{{baseBalance}} {{baseCurrency}}</div>
            </div>
            <br>
            <br>
            <div style="inline,">
              <div style="float: left;font-weight:bold;margin-right:5px;">Fee/Rebate</div>
              <br>
              <div style="color:white;text-align:left;color:#65cdfa;margin-left:20px;">
                <span style="color:white;">Fee/Rebate:</span>
                <a style="margin-left:67px;"><span v-if="feeNotIncluded > 0">+</span>{{ feeNotIncluded }}</a>
              </div>
              <div style="color:white;text-align:left;color:#65cdfa;margin-left:20px;">
                <span style="color:white;">Currency:</span>
                <a style="margin-left:37px;">{{ baseCurrency }}</a>
              </div>
              <br>
            </div>

            <div style="inline,">
              <div style="float: left;font-weight:bold;margin-right:5px;">Date/Time:</div>
              <div style="float: left;color:#65cdfa;margin-left:37px;">{{dateTime}}</div>
            </div>
            <br>
          </b-col>
        </b-row>
      </b-container>


      <div slot="modal-header" class="w-100">
        <h5>Confirm Derivative Trade</h5>
      </div>
      <div slot="modal-footer" class="w-100">
        <button
          size="sm"
          class="float-right btn-fil-blue2"
          variant="primary"
          @click="addDerivativeTransaction()"
        >CONFIRM</button>
        <button
          size="sm"
          class="float-left btn-fil-yellow"
          variant="primary"
          @click="toggleConfirm(tab),toggleManualTradeModal()"
        >EDIT</button>
      </div>
    </b-modal>
    <!-- Modal confirm Component -->
    <b-modal
      v-model="confirmTradeMod"
      size="md"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      :footer-bg-variant="footerBgVariant"
      :footer-text-variant="footerTextVariant"
    >
      <b-container>
        <b-row>
          <b-col>
            <div style="inline">
              <div style="float: left;font-weight:bold;margin-right:5px;">Exchange:</div>
              <div style="margin-left:50px;float: left;color:#65cdfa;">{{exchange}}</div>
            </div>
            <br>
            <br>
            <div>
              <div style="float: left;font-weight:bold;margin-right:5px;">Market:</div>
              <div style="float: left;color:#65cdfa;margin-left:68px;">{{exchangeMarket}}</div>
            </div>
            <br>
            <br>
            <div>
              <div style="float: left;font-weight:bold;margin-right:5px;">Price:</div>
              <div style="float: left;color:#65cdfa;margin-left:83px;">{{price}}</div>
            </div>
            <br>
            <br>
            <div style="inline,">
              <div style="float: left;font-weight:bold;margin-right:5px;">Amount:</div>
              <div style="float: left;color:#65cdfa;margin-left:57px;">{{amount}}</div>
            </div>
            <br>
            <br>
            <div style="inline,">
              <div style="float: left;font-weight:bold;margin-right:5px;">Fees</div>
              <br>
              <div style="color:white;text-align:left;color:#65cdfa;margin-left:20px;">
                <span style="color:white;">Fee</span>
                <a style="margin-left:67px;">{{ fees }}</a>
              </div>
              <div style="color:white;text-align:left;color:#65cdfa;margin-left:20px;">
                <span style="color:white;">Currency:</span>
                <a style="margin-left:37px;">{{feeCurrency}}</a>
              </div>
              <br>
            </div>

            <div style="inline,">
              <div style="float: left;font-weight:bold;margin-right:5px;">Date/Time:</div>
              <div style="float: left;color:#65cdfa;margin-left:37px;">{{dateTime}}</div>
            </div>
            <br>
            <div style="inline,">
              <div style="float: left;font-weight:bold;margin-right:5px;">Type:</div>
              <div style="float: left;color:#65cdfa;margin-left:83px;">{{transactionType}}</div>
            </div>
            <br>
          </b-col>
        </b-row>
      </b-container>
      <div slot="modal-header" class="w-100">
        <h5>Confirm Spot Trade</h5>
      </div>
      <div slot="modal-footer" class="w-100">
        <button
          size="sm"
          class="float-right btn-fil-blue2"
          variant="primary"
          @click="addManualTransaction()"
        >CONFIRM</button>
        <button
          size="sm"
          class="float-left btn-fil-yellow"
          variant="primary"
          @click="toggleConfirm(tab),toggleManualTradeModal()"
        >EDIT</button>
      </div>
    </b-modal>
    <!-- Modal ADD manual exchange Component -->
    <b-modal
      id="manualTrade"
      v-model="$store.state.modals.transactionsModal"
      @hide="toggleManualTradeModal()"
      size="lg"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      :footer-bg-variant="footerBgVariant"
      :footer-text-variant="footerTextVariant"
    >
      <div>
        <b-tabs content-class="mt-3" class="mytabs">
          <b-tab
            title="Spot Trade"
            active
            title-item-class="tab-title-class"
            v-on:click="tab = 'spot', clearFields()"
          >
            <b-container>
              <b-row>
                <b-col>
                  <div style="text-align:left;">Exchange</div>
                  <div>
                    <b-input-group>
                      <input
                        v-model="exchange"
                        v-on:click="predictiveListExchangeMarket = [], exchangeMarket = null"
                        @keyup="predictiveList(exchange)"
                        id="input-large"
                        list="exchangeItems"
                        size="lg"
                        type="text"
                        class="drop-input inputFix"
                        placeholder="Exchange"
                      >
                      <datalist id="exchangeItems">
                        <option v-for="items in manualExchangeList" :value="items" :key="items"/>
                      </datalist>
                    </b-input-group>
                  </div>
                  <br>
                  <div style="text-align:left;">Market</div>
                  <div>
                    <b-input-group>
                      <b-input
                        v-model="exchangeMarket"
                        @keyup="exchangeMarketList(exchangeMarket)"
                        id="large"
                        list="exchangeList"
                        size="lg"
                        type="text"
                        class="drop-input"
                        placeholder="Exchange Market"
                      ></b-input>
                      <datalist id="exchangeList">
                        <option
                          v-for="items in predictiveListExchangeMarket"
                          :value="items"
                          :key="items"
                          v-on:click.stop
                        />
                      </datalist>
                    </b-input-group>
                  </div>
                  <br>
                  <div style="text-align:left;">Amount</div>
                  <div style="display:inline;">
                    <input
                      type="text"
                      style="width:100%;border-radius:5px;border:none;"
                      v-model="amount"
                      placeholder="Amount in base currency"
                    >
                  </div>
                  <br>
                  <br>
                  <div style="text-align:left;">Price</div>
                  <div style="display:inline;">
                    <input
                      type="text"
                      style="width:100%;border-radius:5px;border:none;"
                      v-model="price"
                      placeholder="Market Price in Counter currency"
                    >
                  </div>
                  <br>
                  <br>
                  <div style="text-align:left;">Fees</div>
                  <div style="display:inline;">
                    <input
                      type="text"
                      style="margin-left:20px;margin-right:20px;border-radius:5px;border:none;"
                      v-model="fees"
                      placeholder="Fees"
                    >
                    <input
                      type="text"
                      style="margin-left:20px;margin-right:20px;border-radius:5px;border:none;"
                      v-model="feeCurrency"
                      placeholder="Currency"
                    >
                  </div>
                  <br>
                  <br>
                  <div style="text-align:left;">Date/Time</div>
                  <div>
                    <datetime
                      type="datetime"
                      :phrases="{ok: 'Continue', cancel: 'Exit'}"
                      v-model="dateTime"
                      input-style="border:none;width:100%;border-radius:3px;float:left;"
                    ></datetime>
                    <!--<br>
                    <div style="float: left;">
                    <b-form-checkbox
                      id="spot-filled"
                      v-model="spotFilled"
                      name="spot-filled"
                      :value='true'
                      :unchecked-value='false'
                    >Filled</b-form-checkbox> 
                  </div>
                  <br> 
                  <br> -->
                  <br>
                  </div>
                  <br>
                  <br>
                  <div style="text-align:left;">Type</div>
                  <div>
                    <b-form-select
                      v-model="transactionType"
                      :options="typeOptions"
                      class="mb-3 drop-input"
                      size="sm"
                    />
                  </div>
                </b-col>
              </b-row>
            </b-container>
          </b-tab>
          <b-tab title="Derivative Trade" v-on:click="tab = 'derivative', clearFields()">
            <b-container>
              <b-row>
                <b-col cols="6">
                  <div style="text-align:left;">Exchange</div>
                  <div>
                     <b-input-group>
                      <input
                        v-model="exchange"
                        v-on:click="predictiveListExchangeMarket = [], exchangeMarket = null"
                        @keyup="predictiveList(exchange)"
                        id="input-large"
                        list="exchangeItems"
                        size="lg"
                        type="text"
                        class="drop-input inputFix"
                        placeholder="Exchange"
                      >
                      <datalist id="exchangeItems">
                        <option v-for="items in manualExchangeList" :value="items" :key="items"/>
                      </datalist>
                    </b-input-group>
                  </div>
                  <br>
                  <div style="text-align:left;">Market</div>
                  <div>
                    <b-input-group>
                      <b-input
                        v-model="exchangeMarket"
                        @keyup="exchangeMarketList(exchangeMarket)"
                        id="large"
                        list="exchangeList"
                        size="lg"
                        type="text"
                        class="drop-input"
                        placeholder="Exchange Market"
                      ></b-input>
                      <datalist id="exchangeList">
                        <option
                          v-for="items in predictiveListExchangeMarket"
                          :value="items"
                          :key="items"
                          v-on:click.stop
                        />
                      </datalist>
                    </b-input-group>
                    <label
                      class="derivative-label"
                      for="market"
                      v-if="exchange == null"
                    >Please select an exchange first</label>
                  </div>
                  <br>
                  <div style="text-align:left;">Date/Time</div>
                  <div>
                    <datetime
                      type="datetime"
                      :phrases="{ok: 'Continue', cancel: 'Exit'}"
                      v-model="dateTime"
                      input-style="border:none;width:100%;border-radius:3px;float:left;"
                    ></datetime>
                    <br>
                  </div>
                  <br>
                  <div style="text-align:left;">Trade Type</div>
                  <div>
                    <b-form-select
                      style="padding-bottom:-10px"
                      name="tradeType"
                      :disabled="exchangeMarket == null || dateTime == null"
                      @change="getDerivativeFee()"
                      v-model="transactionType"
                      :options="tradeOptions"
                      class="drop-input"
                      size="sm"
                    />
                    <label
                      class="derivative-label"
                      for="tradeType"
                      v-if="exchangeMarket == null"
                    >Please select a market first</label>
                  </div>
                  <br>
                  <div style="text-align:left;">Position Type</div>
                  <div>
                    <b-form-select
                      v-model="positionType"
                      :options="positionOptions"
                      class="mb-3 drop-input"
                      size="sm"
                      @change="getCoinBalance()"
                    />
                  </div>
                  <br>

                
                </b-col>
                <b-col cols="6">
  <div style="text-align:left;">Entry Price</div>
                  <div style="display:inline;">
                    <input
                      type="text"
                      style="width:100%;border-radius:5px;border:none;"
                      v-model="price"
                      placeholder="Market Price in Counter currency"
                    >
                  </div>
                  <br>
                  <br>
                  <div style="text-align:left;">Amount/Position</div>
                  <div style="display:inline;">
                    <input
                      type="text"
                      style="width:100%;border-radius:5px;border:none;"
                      v-model="amount"
                      placeholder="Amount in base currency"
                    >
                  </div>
                  <br>
                  <br>
                  <div  v-if="positionType != null && realBalance == false">
                  <div style="text-align:left;">Simulated Balance</div>
                    <div style="display:inline;">
                      <input
                        type="text"
                        style="width:100%;border-radius:5px;border:none;"
                        v-model="baseBalance"
                        placeholder="Simulated Balance"
                      >
                    </div>
                  <br>
                  <br>
                  </div>

                  <div style="text-align:left;">Leverage</div>
                  <div style="display:inline;">
                    <input
                      type="text"
                      style="width:100%;border-radius:5px;border:none;"
                      v-model="leverage"
                      :disabled="crossMargin == 'true'"
                      :placeholder="(crossMargin == 'false') ? 'Leverage in base currency' : 'Cross'"
                    >
                  </div>
                  <div v-if="exchangeMarket != null" style="float: left;">
                    <b-form-checkbox
                      id="cross-margin"
                      v-model="crossMargin"
                      name="cross-margin"
                      value="true"
                      unchecked-value="false"
                    >CROSS MARGIN</b-form-checkbox>
                  </div>
                  <br>
                  <div>
                    <!--                  <br>
                    <div style="float: left;">
                    <b-form-checkbox
                      id="derivative-filled"
                      v-model="derivativeFilled"
                      name="derivative-filled"
                      :value='true'
                      :unchecked-value='false'
                    >Filled</b-form-checkbox> 
                  </div>
                  <br>
                  <br> -->
   
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                <br>
                    <p>SUMMARY</p>
                    <div style="text-align:left; font-size: 12px;">
                      EQUITY/MARGIN:
                      <span v-if="crossMargin == 'false'">
                        {{ equity }} {{ baseCurrency }}
                        <b>|</b>
                        {{ leverage }}x
                      </span>
                      <span
                        v-if="crossMargin == 'true'"
                      >{{ baseBalance }} {{ baseCurrency}} | {{ cross }}x</span>
                      <br>
                      FEE/REBATE: {{ feeNotIncluded }}
                      <br>BREAKEVEN PRICE
                      <i
                        style="font-size: 11px"
                      >*This includes the entry price with fees.</i>
                      <br>
                      <span class="tab">
                        MAKER: {{ breakeven.maker }}
                        <br>
                      </span>
                      <span class="tab">
                        TAKER: {{ breakeven.taker }}
                        <br>
                      </span>
                      AVAILABLE BALANCE: {{ baseBalance }}
                    </div>
                    <br>
                    <span>
                       <div style="text-align:left; font-size: 12px;">
                    EXECUTED: {{ price }}
                    <br>
                    FEES INCLUDED: {{ feeIncluded }}
                    <br>
                  </div>
                    </span>
                </b-col>
              </b-row>
            </b-container>
          </b-tab>
        </b-tabs>
      </div>

      <div slot="modal-footer" class="w-100">
        <button
          :disabled="fees == null && tab != 'spot'"
          size="sm"
          :class="['float-right', (fees == null ) ? 'btn-fil-grey': 'btn-fil-blue2']"
          variant="primary"
          @click="toggleConfirm(tab)"
        >ADD Trade</button>
        <button
          size="sm"
          class="float-left btn-fil-red"
          variant="primary"
          @click="$root.$emit('bv::hide::modal','manualTrade')"
        >CLOSE</button>
      </div>
      <div slot="modal-header" class="w-100"></div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'manualTrade',
  data() {
    return {
      tab: 'spot',
      predictiveListExchangeMarket: [],
      predictiveExchangeSymbols: [],
      manualTradeMod: false,
      derivativeFilled: true,
      spotFilled: true,
      positionType: null,
      amount: null,
      makerFee: null,
      takerFee: null,
      leverage: null,
      price: null,
      indicativeSettlePrice: null,
      crossMargin: 'false',
      exchangeMarket: null,
      counter: null,
      base: null,
      exchange: null,
      dateTime: null,
      feeCurrency: null,
      fees: null,
      confirmDerivative: false,
      confirmTradeMod: false,
      transactionType: null,
      transactionTime: null,
      baseBalance: null,
      baseCurrency: null,
      realBalance: null,
      positionCurrency: null,
      typeOptions: [
        {
          value: null,
          text: 'Select Type'
        },
        {
          value: 'buy',
          text: 'Buy'
        },
        {
          value: 'sell',
          text: 'Sell'
        }
      ],
      tradeOptions: [
        {
          value: null,
          text: 'Select an option'
        },
        {
          value: 'maker',
          text: 'Maker'
        },
        {
          value: 'taker',
          text: 'Taker'
        }
      ],
      positionOptions: [
        {
          value: null,
          text: 'Select an option'
        },
        {
          value: 'long',
          text: 'Long'
        },
        {
          value: 'short',
          text: 'Short'
        }
      ],
      transactionOptions: [
        {
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
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'light',
        'dark',
        'black'
      ],
      headerBgVariant: 'black',
      headerTextVariant: 'light',
      bodyBgVariant: 'black',
      bodyTextVariant: 'light',
      footerBgVariant: 'black',
      footerTextVariant: 'light'
    }
  },
  components: {},
  computed: {
    ...mapState({
      manualExchangeList: state => state.manualExchanges,
      supportedExchanges: state => state.supportedExchanges
    }),
    equity: function() {
      if (this.amount == 0 || this.leverage == null || this.price == 0) {
        return 0
      } else {
        if (this.exchangeMarket == "ETH/USD" && this.exchange == "bitmex"){
          if (this.crossMargin == 'true') {
            return this.baseBalance
          } else {
            return (Number.parseFloat(this.amount)*(this.indicativeSettlePrice*0.000001))/Number.parseFloat(this.leverage)
          }
        }
        if (this.positionCurrency != "USD") {
            return (
              Number.parseFloat(this.amount) /
              Number.parseFloat(this.leverage) *
              Number.parseFloat(this.price)
            ).toFixed(8)
        } else {
              return (
                Number.parseFloat(this.amount) /
                Number.parseFloat(this.leverage) /
                Number.parseFloat(this.price)
            ).toFixed(8)
        }

      }
    },
    feeNotIncluded: function() {
      if (this.transactionType == null || this.positionType == null) {
        return 0
      }
      if (this.fees == null || this.price == null || this.amount == null) {
        return 0
      }
      if (this.positionCurrency != "USD") {
        if (this.transactionType.toUpperCase() == 'TAKER') {
          return (-(this.amount * this.fees) * this.price).toFixed(8)
        }
        if (this.transactionType.toUpperCase() == 'MAKER') {
          return ((this.amount * this.fees) * this.price).toFixed(8)
        } 
      } else {
        if (this.transactionType.toUpperCase() == 'TAKER') {
          return (-(this.amount * this.fees) / this.price).toFixed(8)
        }
        if (this.transactionType.toUpperCase() == 'MAKER') {
          return ((this.amount * this.fees) / this.price).toFixed(8)
        } 
      }
    },
    feeIncluded: function() {
      if (this.transactionType == null || this.positionType == null) {
        return 0
      }
      if (this.fees == null || this.price == null) {
        return 0
      }

      if (this.price != '.' && isNaN(this.price)) {
        this.$toast.error('Price must be a number', {
          icon: 'warning'
        })
        return 0
      }
      let tradeType = this.transactionType.toUpperCase()
      let positionType = this.positionType.toUpperCase()
      let price = Number.parseFloat(this.price)
      let fees = Number.parseFloat(this.fees)
      if (tradeType == 'MAKER' && positionType == 'LONG') {
        return (price - fees * price).toFixed(8)
      }
      if (tradeType == 'MAKER' && positionType == 'SHORT') {
        return (price + fees * price).toFixed(8)
      }
      if (tradeType == 'TAKER' && positionType == 'LONG') {
        return (price + fees * price).toFixed(8)
      }
      if (tradeType == 'TAKER' && positionType == 'SHORT') {
        return (price - fees * price).toFixed(8)
      }
    },
    cross: function() {
      if (
        this.baseBalance == null ||
        this.amount == null ||
        this.price == null
      ) {
        return 0
      } else {
        if (this.baseBalance <= 0) {
          return 0
        }
        if (this.exchangeMarket == "ETH/USD" && this.exchange == "bitmex"){
          return (this.amount * (this.indicativeSettlePrice*0.000001))/this.baseBalance
        }
        return ((this.amount * this.price) / this.baseBalance).toFixed(2)
      }
    },
    breakeven: function() {
      let maker = 0
      let taker = 0

      if (
        this.fees != null &&
        this.transactionType != null &&
        this.positionType != null
      ) {
        let tradeType = this.transactionType.toUpperCase()
        let positionType = this.positionType.toUpperCase()
        let makerFee = Math.abs(this.makerFee)
        let takerFee = Math.abs(this.takerFee)
        let feeIncluded = Number.parseFloat(this.feeIncluded)
        if (positionType == 'LONG') {
          maker = (feeIncluded - (makerFee * feeIncluded)).toFixed(8)
          taker = (feeIncluded + (takerFee * feeIncluded)).toFixed(8)

        }
        if (positionType == 'SHORT') {
          maker = (feeIncluded + (makerFee * feeIncluded)).toFixed(8)
          taker = (feeIncluded - (takerFee * feeIncluded)).toFixed(8)
        }
      }
      return { maker: maker, taker: taker }
    }
  },
  mounted() {
    for (var wallet in this.addresses) {
      this.walletsAddress.push(this.addresses[wallet].Nickname)
    }
  },
  methods: {
  toLowerCaseKeys(obj) {
  return Object.keys(obj).reduce(function(accum, key) {
    accum[key.toLowerCase()] = obj[key];
    return accum;
  }, {});
},
    predictiveList(newValue) {
          let that = this;
          if (newValue != null || undefined || '') {
          let that = this;
          let token = sessionStorage.getItem('token')
          let url = "api/predictiveExchangeList?input=";
          that.$insightfetch(url + newValue, 'GET', null, 'cors', 'same-origin', false).then(function(myResponse) {
          let caseChangedExchange = that.toLowerCaseKeys(myResponse.predictedExchanges);
          that.predictiveExchangeSymbols = caseChangedExchange;
              return myResponse;
             })     
          }},
    exchangeMarketList(newValue) {
      let that = this
      if (newValue != null || undefined || '') {
        let that = this
        let token = sessionStorage.getItem('token')
        let url = 'api/predictiveMarketList';
        let exchange = this.exchange;
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
    clearFields() {
      this.predictiveListExchangeMarket = []
      this.positionType = null
      this.amount = null
      this.leverage = null
      this.price = null
      this.exchangeMarket = null
      this.counter = null
      this.base = null
      this.exchange = null
      this.dateTime = null
      this.feeCurrency = null
      this.fees = null
    },
    toggleManualTradeModal(value) {
      this.$store.commit('modals/toggleTransactionsModal')
    },
    toggleConfirm(val) {
      let that = this
      if (this.leverage <= 0 && this.crossMargin == 'true') {
        this.leverage = Number.parseFloat(this.cross).toFixed(2)
      }
      if (val == 'derivative') {
        if (
          that.positionType == null ||
          that.amount == null ||
          that.leverage == null ||
          that.equity == null ||
          that.price == null ||
          that.exchangeMarket == null ||
          that.exchange == null ||
          that.dateTime == null ||
          that.transactionType == null ||
          that.dateTime.length < 1
        ) {
          that.$toast.error('Please, fill in required sections to Add.', {
            icon: 'warning'
          })
          return null
        } else if (that.leverage <= 0 && that.crossMargin == 'false') {
          that.$toast.error('Leverage must be greater than 0.', {
            icon: 'warning'
          })
        } else {
          that.$root.$emit('bv::hide::modal', 'manualTrade')
          that.confirmDerivative = !that.confirmDerivative
        }
      } else if ('spot') {
        if (
          that.amount == null ||
          that.price == null ||
          that.exchangeMarket == null ||
          that.exchange == null ||
          that.dateTime == null ||
          that.transactionType == null ||
          that.dateTime.length < 1
        ) {
          that.$toast.error('Please, fill in required sections to Add.', {
            icon: 'warning'
          })
          return null
        } else {
          that.$root.$emit('bv::hide::modal', 'manualTrade')
          that.confirmTradeMod = !that.confirmTradeMod
        }
      }
    },
    getCoinBalance() {
      this.leverage = null
      let that = this
      let url = 'api/getBalance'
      let body = {
        exchange: this.exchange,
        market: this.exchangeMarket
      }
      this.$insightfetch(url, 'POST', body).then(function(myResponse) {
        if (myResponse.result == 'success') {
          that.baseBalance = Number.parseFloat(myResponse.balance).toFixed(8)
          that.baseCurrency = myResponse.baseCurrency
          if (that.baseBalance > 0) {
            that.realBalance = true
          } else {
            that.realBalance = false
          }
        } else {
          that.$toast.error(myResponse.reason, {
            icon: 'warning'
          })
        }
      })
    },
    addDerivativeTransaction() {
      let that = this
      let exchange = that.exchange
      let exchangeMarket = that.exchangeMarket
      if (!this.manualExchangeList.includes(exchange.toLowerCase())) {
        this.$toast.error('Please choose a valid exchange from the dropdown.', {
          icon: 'warning'
        })
        return
      }
      if (
        !this.predictiveListExchangeMarket.includes(
          exchangeMarket.toUpperCase()
        )
      ) {
        this.$toast.error('Please choose a valid market from the dropdown.', {
          icon: 'warning'
        })
        return
      }
      let amount = that.amount
      let price = that.price
      let fee = that.feeNotIncluded
      let feeAsset = that.feeCurrency
      let leverage = that.leverage
      let equity = that.equity
      let time = that.dateTime
      let tradeType = that.transactionType
      let positionType = that.positionType
      let filled = that.derivativeFilled
      let url = 'api/addDerivativeTransaction'
      let body = {
        exchange: exchange,
        leverage: leverage,
        equity: equity,
        market: exchangeMarket,
        amount: amount,
        entryPrice: price,
        fee: fee,
        feeAsset: that.baseCurrency,
        tradeTime: time,
        tradeType: tradeType,
        positionType: positionType,
        breakevenTaker: that.breakeven['taker'],
        breakevenMaker: that.breakeven['maker'],
        availableBalance: that.baseBalance,
        cross: that.cross,
        feeIncluded: that.feeIncluded,
        filled: filled
      }
      that.$insightfetch(url, 'POST', body).then(function(myResponse) {
        if (myResponse.result == 'success') {
          that.$toast.success(myResponse.result, {
            icon: 'success'
          })
          that.confirmDerivative = false
        } else {
          that.$toast.error(myResponse.reason, {
            icon: 'warning'
          })
        }
        let sortTable = (that.$router.currentRoute.name == "analysis") ? 'sortTrades' : 'sortTransactions'
        that.$nuxt.$emit(sortTable, {
          direction: 'down',
          sortby: 'closed'
        })
        return myResponse
      })
    },
    addManualTransaction() {
      let that = this
      let exchange = that.exchange
      let exchangeMarket = that.exchangeMarket
      if (!this.manualExchangeList.includes(exchange.toLowerCase())) {
        this.$toast.error('Please choose a valid exchange from the dropdown.', {
          icon: 'warning'
        })
        return
      }
      if (
        !this.predictiveListExchangeMarket.includes(
          exchangeMarket.toUpperCase()
        )
      ) {
        this.$toast.error('Please choose a valid exchange from the dropdown.', {
          icon: 'warning'
        })
        return
      }
      let splitMarket = exchangeMarket.split('/')
      let base = splitMarket[0]
      let counter = splitMarket[1]
      let amount = that.amount
      let price = that.price
      let fee = that.fees
      let feeCurrency = that.feeCurrency
      let time = that.dateTime
      let tradeType = that.transactionType
      let filled = that.spotFilled
      let url = 'api/addManualTransaction'
      let body = {
        exchange: exchange,
        base: base,
        counter: counter,
        amount: amount,
        price: price,
        fee: fee,
        time: time,
        tradeType: tradeType,
        feeAsset: feeCurrency,
        filled: filled
      }
      that.$insightfetch(url, 'POST', body).then(function(myResponse) {
        if (myResponse.result == 'success') {
          that.$toast.success(myResponse.result, {
            icon: 'success'
          })
          that.confirmTradeMod = false
        } else {
          that.$toast.error(myResponse.reason, {
            icon: 'warning'
          })
        }
        let sortTable = (that.$router.currentRoute.name == "analysis") ? 'sortTrades' : 'sortTransactions'
        that.$nuxt.$emit(sortTable, {
          direction: 'down',
          sortby: 'closed'
        })
        return myResponse
      })
    },
    getDerivativeFee() {
      let url = 'api/derivativeFee'
      let that = this
      let body = {
        exchange: this.exchange,
        market: this.exchangeMarket,
        tradeType: this.transactionType,
        time: this.dateTime
      }
      that.$insightfetch(url, 'POST', body).then(function(myResponse) {
        if (myResponse.result == 'failed') {
          that.$toast.error(myResponse.reason, {
            icon: 'warning'
          })
        }
        that.fees = Math.abs(Number.parseFloat(myResponse.fee.fee))
        that.makerFee = (Number.parseFloat(myResponse.fee.maker))
        that.takerFee = (Number.parseFloat(myResponse.fee.taker))
        that.indicativeSettlePrice = (Number.parseFloat(myResponse.fee.indicativeSettlePrice))
        that.feeCurrency = myResponse.fee.currency
        that.positionCurrency = myResponse.fee.positionCurrency
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item + .item:before {
  content: ', ';
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
.inputFix {
  width: 100%;
  border-radius: 5px;
}
</style>
