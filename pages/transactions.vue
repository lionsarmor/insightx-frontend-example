<template>
  <div v-if="$store.state.generalData" class="containerTRANSACTIONS">
         <div class="item transactionsItem1">
            <transactionFilter :history="$store.state.generalData.transactions" :addresses="$store.state.generalData.walletAddresses"></transactionFilter>
         </div>
     </div>
</template>
<script>
    import paginationTransactions from '~/components/pagination/paginationTransactions'
    import transactionFilter from "~/components/transactionTable/TransactionsFilter"

    export default {
        layout: 'authed',
        middleware: 'auth',
        data() {
            return {
              
            }
        },
        mounted() {
            if (this.$store.state.currentPage == null) {
                this.$store.commit('updatePage', 'transactions')
            }
        },
        components: {
            transactionFilter,
            paginationTransactions,
        },
    }
</script>

<style>
    .font-white {
        color: white;
    }
</style>