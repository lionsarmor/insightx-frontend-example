import {
    VUEX_UPDATE_COIN_STATE,
    VUEX_ALLOCATION_BAR_DATA,
    VUEX_ALLOCATION_TOTAL_BAR_DATA,
    VUEX_UPDATE_ALLOCATION_BAR_BY_SYMBOL,
    VUEX_SET_SELECTED_COIN,
    VUEX_UPDATE_TARGETS
} from '@/store/constants/coins'


export const state = () => ({
    targets: null,
    globalBalances: null,
    walletAddresses: null,
    exchangeData: null,
    exchangeCoinData: null,
    balanceData: null,
    watchList: null,
    selectedCoin: null,
    selectedExchange: null,
    allocationBarData: null,
    totalAllocationBarData: null,
    selectedCoin: null,
    keyForceRender:0
})

export const getters = {

}

export const actions = {
    [VUEX_UPDATE_COIN_STATE]: async ( {commit}, data) => {
        commit(VUEX_UPDATE_COIN_STATE, data)
    },

    [VUEX_ALLOCATION_BAR_DATA]: async ({commit}, data) => {
        commit(VUEX_ALLOCATION_BAR_DATA, data)
    },

    [VUEX_SET_SELECTED_COIN]: async ({commit}, data) => {
        commit(VUEX_UPDATE_ALLOCATION_BAR_BY_SYMBOL, data)
    },

    [VUEX_ALLOCATION_TOTAL_BAR_DATA]: async ({commit}, data) => {
        commit(VUEX_ALLOCATION_TOTAL_BAR_DATA, data)
    },

    [VUEX_UPDATE_TARGETS]: async({ commit }, data) => {
        commit(VUEX_UPDATE_TARGETS, data)
    }

}

export const mutations = {
 
    [VUEX_UPDATE_COIN_STATE]: (state, data) => {
        state.targets = data.targets
        state.globalBalances = data.filteredBalances
        state.walletAddresses = data.walletAddresses
        state.exchangeData = data.exchangeData
        state.exchangeCoinData = data.exchangeCoinData
        state.balanceData = data.balances
        state.watchList = data.watchList
    },

    [VUEX_ALLOCATION_BAR_DATA]: (state, data) => {
        state.allocationBarData = data
    },

    [VUEX_UPDATE_ALLOCATION_BAR_BY_SYMBOL]: (state, data) => {
        if (state.selectedCoin != data) {
            state.selectedCoin = data
            if (state.totalAllocationBarData != null) {
                state.allocationBarData = state.totalAllocationBarData.filter(barData => {
                    return barData.symbol == data
                })[0]
            }
        }
    },

    [VUEX_ALLOCATION_TOTAL_BAR_DATA]: (state, data) => {
        state.totalAllocationBarData = data
    },

    [VUEX_UPDATE_TARGETS]: (state, data) => {
        state.targets = data
        state.totalAllocationBarData.forEach(element => {
            if (element.symbol in state.targets) {
                element.target = state.targets[element.symbol].target
            }
        })
        state.keyForceRender += 1
    }
}
