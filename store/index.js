import CoinGeckoClient from '~/plugins/coingekko.js'

export const strict = false

export const state = () => ({
  // Use var below this comment for local pycharm api
  apiEndPoint: process.env.API_URL,
  wsEndPoint: process.env.WS_URL,
  // Fetch Variables
  authUser: null,
  currentBrowser : null,
  currentPage: null,
  tickerLoading: false,
  generalData: null,
  defaultFiat: null,
  superUser: null,
  retrieving: false,
  paidMember: null,
  accountType: null,
  watchList: null,
  allowClick: false,
  mobile: false,
  walletsAddress: [],
  symbolOption: [],
  manualExchanges: [],
  apiKeys:[],
  supportedExchanges:[],
  exchangesWeSupport: ['bittrex', 'binance', 'coinbase', 'bitmex'],
  userAddedExchanges:[]
})

export const mutations = {
 

  SET_USER: function(state, user) {
      state.authUser = user
  },
  websocketUpdateTickerData(state, tickers){
    let newData = state.generalData.data
    let allTickers = Object.keys(tickers)
    for (var eachTicker in allTickers){
        let thisTicker = allTickers[eachTicker]
        if (thisTicker.includes("/USD")) {
            var split = thisTicker.split('/')
            if (split[0] in newData){
                newData[split[0]]['price'] = tickers[thisTicker]
            }
        }
    }
    state.generalData.data = newData
    },
    websocketUpdateGlobalPortfolioTickers(state, tickers){
        let newData = state.generalData.balances.global
        let allBalances = Object.keys(newData)
        for (let eachValue in allBalances){
            try{
            let eachCoin = allBalances[eachValue]
            let btcPrice = 1
            let usdPrice = 1
            if (eachCoin!="computed"){
                console.log(eachCoin)
                if (eachCoin!="BTC") {
                    btcPrice = tickers[eachCoin+'/BTC']
                }
                if (eachCoin!="USD") {
                    usdPrice = tickers[eachCoin+'/USD']
                } 
                console.log(btcPrice)
                console.log(usdPrice)
                if (btcPrice != null && usdPrice != null){
                newData[eachCoin]['btcprice'] = btcPrice
                newData[eachCoin]['usdprice'] = usdPrice
                newData[eachCoin]['btcvalue'] = Number(btcPrice)*newData[eachCoin]['Amount']
                newData[eachCoin]['usdvalue'] = Number(usdPrice)*newData[eachCoin]['Amount']
                }
                
            }
            } catch(err) {
                console.log(err)
            }
        }
        state.generalData.balances.global = newData
        state.globalPriceKeyForceRender += 1
        console.log("global update")
        },
    websocketUpdateBalance(state, exchange, coin, amount) {
        currentBalances = state.generalData.balances
        currentBalances[exchange][coin]['Balance'] = Number(currentBalances[exchange][coin]['Balance']) + Number(amount)
        state.generalData.balances = newBalances
    },
  updateBalances(state, newBalances) {
      state.generalData.balances = newBalances
  },
  updateBalanceTableObject(state, tableData) {
    let balanceData = state.generalData.balances
    for (let eachExchange in balanceData){
        if (eachExchange != 'wallets' && eachExchange != 'global'){
            for (let eachCoin in balanceData[eachExchange]){
                balanceData[eachExchange][eachCoin]["ExchangeValue"] = tableData[eachExchange][eachCoin]["ExchangeValue"]
                balanceData[eachExchange][eachCoin]["Price"] = tableData[eachExchange][eachCoin]["Price"]
                balanceData[eachExchange][eachCoin]["GlobalValue"] = tableData[eachExchange][eachCoin]["GlobalValue"]
            }
        }
    }
    state.generalData.balances = balanceData
},
  updateKey(state, kargs) {
      let key = kargs['key']
      state.generalData[key] = kargs['newData']
  },
  updatePage(state, page) {
      state.currentPage = page
  },
  updateRetrieving(state) {
      state.retrieving = true
  },
  updateTickerLoader(state) {
      state.tickerLoading = !state.tickerLoading
  },
  updateValidToken(state) {
      state.hasValidToken = true;
  },
  updateBrowser(state, value){
    state.currentBrowser = value
  },
  storeUserWatchlist(state){
    let exchangeNames = state.watchList
        for(let elem  in  exchangeNames){
        if (elem != "null") {
            state.userAddedExchanges.push(elem);
        }
        }
  },
  clearGeneralData(state) {
      state.generalData = null
      state.defaultFiat = null
      state.superUser = null
      state.paymentStatus = null
      state.retrieving = false
      state.tickerLoading = false
      state.accountType = null
      state.manualExchanges = null
      state.apiKeys = null
      state.watchList = null
  },
  updateGeneralData(state, data) {  
      state.generalData = data;
      state.defaultFiat = data.userOptions.fiat
      state.superUser = data.userInfo.superUser
      state.paidMember = data.userInfo.paidMember
      state.accountType = data.userInfo.accountType
      state.apiKeys = data.apikeys
      for(let item in state.apiKeys){
        state.supportedExchanges.push(state.apiKeys[item].exchange);
      }
      for (let exchange in data.manualExchanges) {
        if (!state.supportedExchanges.includes(data.manualExchanges[exchange])){
            state.manualExchanges.push(data.manualExchanges[exchange])    
        }
    }
    state.manualExchanges = state.manualExchanges.sort()
  },

  allowClickEvent(state, value) {
      state.allowClick = value
  },
  toggleMobile(state, value) {
      state.mobile = value
  },
  createModalList(state, value) {
      for (var wallet in state.generalData.walletsAddress) {
          state.walletsAddress.push(state.generalData.walletAddresses[wallet].Nickname)
      }
      this.symbolOption = [{
          value: null,
          text: 'Select an a coin'
      }]
      for (var wallet in state.generalData.walletAddresses) {
          this.symbolOption.push({
              'value': state.generalData.walletAddresses[wallet].Symbol,
              'text': state.generalData.walletAddresses[wallet].Symbol
          })
      }
  },
  updateSupportedExchanges(state, exchange) {
    state.supportedExchanges.push(exchange)
    if (state.manualExchanges.includes(exchange)){
        state.manualExchanges.filter(function(item) { 
            return item !== exchange
        })
    }
  },
  removeSupportedExchanges(state, exchange) {
    state.supportedExchanges = state.supportedExchanges.filter(e => e !== exchange)
  },
  setSparkline(state, data) {
      state.watchList = data
  }
}

export const actions = {

    updateGeneralData( {dispatch, commit }, data){
        commit('updateGeneralData', data)
        dispatch('getSparklines', data)
    },

    updateWatchList({ commit }, data){
        commit('setSparkline', data);
    },

    getSparklines({ commit }, data) {
        let makeCall = async (data) => {
        let geckoCoins = await CoinGeckoClient.coins.list();
        let marketList = []
        for (var eachExchange in data.watchList) {
            for (var eachWatchList in data.watchList[eachExchange]) {
                if (eachWatchList.includes('/')){
                    marketList.push(eachWatchList)
                }
            }
        }
        let idList = ''
        let trendDict = {}
        for (var eachItem in marketList){
            let split = marketList[eachItem].split('/')
            let inputName = split[0].toLowerCase()
            for (var eachDict in geckoCoins.data){
                var eachSymbol = geckoCoins.data[eachDict]['symbol']
                if (eachSymbol==inputName) {
                    idList = idList + ',' + geckoCoins.data[eachDict]['id']
                    trendDict[eachSymbol] = []
                } 
            }
        }
        idList = idList.substr(1)
        let geckoReturn = await CoinGeckoClient.coins.markets({'sparkline':true, 'ids': idList, 'vs_currency': 'btc'});
        let geckoData = geckoReturn.data
        for (var eachCoin in geckoData){
            let rawTrend = geckoData[eachCoin]['sparkline_in_7d']['price']
            let finalTrend = []
            let delta = 10
            for (var i = 0; i < rawTrend.length; i=i+delta) {
              finalTrend.push(rawTrend[i]);
            }
            trendDict[geckoData[eachCoin]['symbol']] = finalTrend
        }
        let rawWatchList = JSON.parse(JSON.stringify(data.watchList))
        for (var eachListExchange in rawWatchList) {
            for (var eachMarket in rawWatchList[eachListExchange]){
                let thisCoin = rawWatchList[eachListExchange][eachMarket]['symbol'].toLowerCase()
                rawWatchList[eachListExchange][eachMarket]['trend'] = trendDict[thisCoin]
            }

        }

        commit('setSparkline', rawWatchList)
        }
        makeCall(data)

    }
}