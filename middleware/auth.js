import { VUEX_UPDATE_COIN_STATE } from '../store/constants/coins'


export default function ({ store, redirect, app }) {
    // If the user is not authenticated
    function CheckPaid(){
      if (store.state.generalData){
        // redirect to account page if the user has not paid, and they are not super
        if (store.state.superUser != true && store.state.paidMember == false && store.state.currentPage != 'account'){
          store.commit('updatePage', 'account')
          app.$toast.error("Please submit payment.", {icon: 'warning'});
          return redirect('/account')
        }
      }
    }

    if (!process.server){
    if (!store.state.localStorage.authUser || store.state.localStorage.authUser=='loggedOut' ) {
      return redirect('/')
    }
    if (!store.state.generalData) {
      // General Call
      store.commit('updateRetrieving')
      app.$insightfetch("general").then(function(jsonResponse){
      store.dispatch('updateGeneralData', jsonResponse);
      store.dispatch(`coins/${VUEX_UPDATE_COIN_STATE}`, jsonResponse)
      CheckPaid()
      })
      return
    }
    CheckPaid()
  }
}