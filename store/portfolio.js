export const state = () => ({
    isLoading : false,
    options: {},
    series: [],
  })

export const mutations = {
  loader(state, value){
    state.isLoading = false;
    },
  updateSeries(state, value){
    state.series = false
  },
  updateOptions(state, value){
    state.options = false
  },
}
