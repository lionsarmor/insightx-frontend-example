<template>
     <div class="containerACCOUNT">
         <div class="item accountItem1">
            <token-table :userInfo="createMutable($store.state.generalData.userInfo)"></token-table>
         </div>
         <div class="item accountItem2">
            <manual-exchange :all_keys="createMutable($store.state.generalData.apikeys)" />
         </div>
         <div class="item accountItem3">
            <PaymentStatus :paymentHistory="createMutable($store.state.generalData.paymentHistory)"></PaymentStatus>
         </div>
         <div class="item accountItem4">
            <RecentUpload :uploadHistory="createMutable($store.state.generalData.uploadHistory)"></RecentUpload>
         </div>
         <div class="item accountItem5">
            <UploadCsv></UploadCsv>
         </div>
         <div class="item accountItem6">
            <wallet-table :addresses="createMutable($store.state.generalData.accountWallets)"></wallet-table>
         </div>
         <div class="item accountItem7">
            <ConfigureUserOptions :userOptions="createMutable($store.state.generalData.userOptions)"></ConfigureUserOptions>
         </div>
     </div>
</template>

<script>
    import TokenTable from '~/components/token/TokenTable'
    import WalletTable from '~/components/token/WalletTable'
    import RecentUpload from '~/components/token/RecentUpload'
    import UploadCsv from '~/components/token/UploadCsv'
    import PaymentStatus from '~/components/token/PaymentStatus'
    import ConfigureUserOptions from '~/components/token/ConfigureUserOptions'
    import manualExchange from '~/components/token/manualExchange'

    export default {
        layout: 'authed',
        middleware: 'auth',
        data() {
            return {
                scrollSwitch: {
                    marginBottom: '-60px'
                },
                walletWidth: {
                    marginBottom: '12px',
                    width: '162.4%',
                    zIndex: '100',
                    marginTop: '-30px'
                },
            }
        },
        mounted() {
            if (this.$store.state.currentPage == null) {
                this.$store.commit('updatePage', 'account')
            }
            let that = this;
            if (window.innerWidth < 1200) {
                that.walletWidth.width = '100%'
            } else {
                that.walletWidth.width = '162.4%'
            }
            window.addEventListener("resize", function() {
                if (window.innerWidth < 1200) {
                    that.walletWidth.width = '100%'
                } else {
                    that.walletWidth.width = '162.4%'
                }
            })
        },
        methods: {
            createMutable(data) {
                let mutableData = JSON.parse(JSON.stringify(data))
                return mutableData
            }
        },
        components: {
            TokenTable,
            WalletTable,
            RecentUpload,
            UploadCsv,
            PaymentStatus,
            ConfigureUserOptions,
            manualExchange
        },
    }
</script>

<style>
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

    .drop-input:focus {
        color: white;
        background: #1a1a1a;
        border: none;
        font-size: 12px;
        height: 30px;
    }

    .drop-button {
        color: white !important;
        background: #000000;
        border: none;
        font-size: 12px;
    }

    .btn-fil-blue {
        color: white !important;
        background-color: #000000 !important;
        border-style: solid;
        border-width: 2px;
        border-color: #047ea4;
        border-radius: 25px;
        height: 37px;
        position: relative;
        top: 3px;
        cursor: pointer;
    }

    .btn-fil-yellow {
        color: white !important;
        background-color: #000000 !important;
        border-style: solid;
        border-width: 2px;
        border-color: #a3972d;
        border-radius: 25px;
        height: 37px;
        position: relative;
        top: 3px;
        cursor: pointer;
    }

    .btn-fil-red {
        color: white !important;
        background-color: #000000 !important;
        border-style: solid;
        border-width: 2px;
        border-color: #a41704;
        border-radius: 25px;
        height: 37px;
        position: relative;
        top: 3px;
        cursor: pointer;
    }

    input {
        background: #1a1a1a;
        color: white;
    }
</style>