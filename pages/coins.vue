<template>
    <div class="containerCOINS" v-if="$store.state.generalData">
        <div class="item COINSItem1">
            <coins-banner></coins-banner>
        </div>
        <div class="item COINSItem2">
            <div class="mini-tables">
                <button v-if="exOrWallet == true" type="button" v-on:click="exOrWallet = true" variant="primary" class="exchangeButton btn-fil-blue3">Exchange</button>
                <button v-if="exOrWallet == false" type="button" v-on:click="exOrWallet = true" variant="primary" class="exchangeButton btn-fil-blue4">Exchange</button>
                <button v-if="exOrWallet == true" type="button" v-on:click="exOrWallet = false" variant="primary" class="walletButton btn-fil-blue4">Wallet</button>
                <button v-if="exOrWallet == false" type="button" v-on:click="exOrWallet = false" variant="primary" class="walletButton btn-fil-blue3">Wallet</button>
            <mini-exchange class="miniTable" v-show="exOrWallet == true"></mini-exchange>
            <Address class="miniTable" v-show="exOrWallet == false"></Address>
        </div>
        </div>
        <div class="item COINSItem3">
            <asset-donut></asset-donut>
        </div>
        <div class="item COINSItem4">
            <div class="asset-table-container">
                <button v-if="assetOrWallet == true" type="button" v-on:click="assetOrWallet = true" variant="primary" class="btn-fil-blue3 asset-button">Assets</button>
                <button v-if="assetOrWallet == false" type="button" v-on:click="assetOrWallet = true" variant="primary" class="btn-fil-blue4 asset-button">Assets</button>
                <button  v-if="assetOrWallet == true" type="button" v-on:click="assetOrWallet = false" variant="primary" class="btn-fil-blue4 wallet-button">Wallets</button>
                <button v-if="assetOrWallet == false" type="button" v-on:click="assetOrWallet = false" variant="primary" class="btn-fil-blue3 wallet-button">Wallets</button>
            <color-table-bar class="color-table" v-show="assetOrWallet == true"></color-table-bar>
            <WalletBar class="color-table" v-show="assetOrWallet == false"></WalletBar>
        </div>
        </div>
        <div class="item COINSItem5">
            <title-bar :style="assetAllocationShift"></title-bar>
        </div>
        <div class="item COINSItem6">
            <RadialBar></RadialBar>
        </div>
    </div>

</template>

<script>
    import RadialBar from '~/components/coinsPageComponents/radialBar'
    import TitleBar from '~/components/coinsPageComponents/allocationBar/titleBar'
    import AssetDonut from '~/components/coinsPageComponents/assetDonut/assetDonut'
    import WalletBar from '~/components/coinsPageComponents/coinswallettable/WalletBar'
    import ColorTableBar from '~/components/coinsPageComponents/colorlogotable/ColorTableBar'
    import MiniExchange from '~/components/coinsPageComponents/miniExchange/MiniExchange'
    import Address from '~/components/coinsPageComponents/addresslist/Address'
    import CoinsBanner from '~/components/coinsPageComponents/coinsbanner/CoinsBanner'
    export default {
        layout: 'authed',
        middleware: 'auth',
        data() {
            return {
                scrollSwitch: {
                    marginBottom: '-30px'
                },
                allocationSize: 3,
                radialSize: 3,
                miniExchange: {
                    width: '100%'
                },
                assetAllocationShift: {
                    marginTop: '6%'
                },
                assetDonutGrid: {
                    marginLeft: '30%'
                },
                centerStyle: {
                    marginTop: '6.5%'
                },
                topStyle: {
                    marginTop: '9%',
                },
                exOrWallet: true,
                assetOrWallet: true,
            }
        },
        created() {

        },
        mounted() {
    
        },
        methods: {
            createMutable(data) {
                let mutableData = JSON.parse(JSON.stringify(data))
                return mutableData
            }
        },
        components: {
            RadialBar,
            TitleBar,
            AssetDonut,
            WalletBar,
            ColorTableBar,
            MiniExchange,
            Address,
            CoinsBanner
        },
    }
</script>

<style>
/* ************** ASSET TABLES ************* */
    .btn-fil-blue3 {
        color: white !important;
        background-color: #047ea4 !important;
        border-style: solid;
        border-width: 2px;
        border-color: #047ea4;
        border-radius: 25px;
        height: 27px !important;
        position: relative;
        top: 3px;
        cursor: pointer;
    }

    .btn-fil-blue4 {
        color: white !important;
        background-color: #000000 !important;
        border-style: solid;
        border-width: 2px;
        border-color: #047ea4;
        border-radius: 25px;
        height: 27px !important;
        position: relative;
        top: 3px;
        cursor: pointer;
    }

    a {
        color: white !important;
    }

    .radialStyle {
        margin-left: 12%;
        position: relative;
        top: 20vh;
    }
.asset-table-container {
    border: 0px solid rgb(218, 11, 11);
    height: 27.8rem;
    display: grid;
    grid-row-gap:0;
    grid-template-columns: repeat(16, minmax(1fr, 1fr));
     grid-template-areas:
              "asset-button asset-button wallet-button wallet-button . . . . . . . . . . . ."
              "color-table color-table color-table color-table color-table color-table color-table color-table color-table color-table color-table color-table color-table color-table color-table color-table"
}
.asset-button {
width: 90px;
grid-area: asset-button;

}
.wallet-button {
width: 90px;
grid-area: wallet-button;
position: relative;
left:-3vh;
}
.color-table {
grid-area: color-table;
margin-top:-11vh;
}
</style>