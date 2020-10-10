export const state = () => ({
  withdrawDepositModal: false,
  transactionsModal: false,
  walletTransactionModal: false,
  AddWatchlistModal: false,
  editWatchlist: false,
  confirmManualModal: false,
  manualExchangeModal: false,
  manualApiKeysModal: false,
  deleteApiKeysModal: false,
  addTokenModal: false,
  addWalletAddressModal: false,
  editWalletAddressModal: false,
  deleteTransactionsModal: false,
  loadingModal: false,
  editManualBalnce: null
})

export const mutations = {
  toggledeleteTransactionsModal(state) {
    state.deleteTransactionsModal = !state.deleteTransactionsModal;
  },
  toggleLoadingModal(state, value) {
    
    if (value == 'on') {
      state.loadingModal = true;
    }else{
      state.loadingModal = false;
    }
  },
  toggleTransactionsModal(state) {
    state.transactionsModal = !state.transactionsModal;
  },
  togglewithdrawDepositModal(state) {
    state.withdrawDepositModal = !state.withdrawDepositModal;
  },
  toggleWalletTransactionModal(state) {
    state.walletTransactionModal = !state.walletTransactionModal;
  },
  toggleAddWatchlist(state) {
    state.AddWatchlistModal = !state.AddWatchlistModal
  },
  toggleEditWatchlist(state) {
    state.editWatchlist = !state.editWatchlist
  },
  toggleConfirmManualModal(state) {
    state.confirmManualModal = !state.confirmManualModal
  },
  toggleManualExchange(state) {
    state.manualExchangeModal = !state.manualExchangeModal;

  },
  toggleManualApiKeys(state) {
    state.manualApiKeysModal = !state.manualApiKeysModal;
  },
  toggleDeleteApiKeys(state) {
    state.deleteApiKeysModal = !state.deleteApiKeysModal;
  },
  toggleAddToken(state) {
    state.addTokenModal = !state.addTokenModal;

  },
  toggleAddWalletModal(state) {
    state.addWalletAddressModal = !state.addWalletAddressModal;
  },
  toggleEditWalletModal(state) {
    state.editWalletAddressModal = !state.editWalletAddressModal;
},
editManualBalnceData(state, data){
state.editManualBalnce = data;
}
}