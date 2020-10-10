export const state = () => ({
    authUser: null,
    tickerData: null,
    totalMarketCap: null,
    tickerShow: true,
    miniTickerShow: true,
    detailedTickerShow: false,
    tickerButtonFill: null,
  })

export const mutations = {
    SET_USER: function (state, user) {
        if (user == 'logout'){
            state.authUser = 'loggedOut'
        } else {    
            state.authUser = user
        }
        },
        updateTickerData(state, payload){
        state.tickerData = payload
        },
        updateTotalMarketCap(state, payload){
        state.totalMarketCap = payload
        },
        // GENERAL DATA 
        updateGeneral (state, page) {
            state.generalData = page
          },
        toggleBottomTickerComponent(state, value) {
            if (value == 'off'){
                state.detailedTickerShow = false;
                state.miniTickerShow = false;
                state.tickerButtonFill = 'off'
            }else if (value == 'big') {
                state.detailedTickerShow = true;
                state.miniTickerShow = false;
                state.tickerButtonFill = 'big'
            }else if (value == 'mini'){
                state.detailedTickerShow = false;
                state.miniTickerShow = true;
                state.tickerButtonFill = 'mini'
            }
          },
    }