<template>
<div id="tickerSpaceWalletTable">
    <div class="border-set wrapper font-style">
        <div class="row">
            <div class="col-6">
                <h5 class="title" style="amrgin-left:auto;">Wallet Addresses</h5>
            </div>
            <div class="col-6" style="position: relative; top:5px; right: -10%;">
            <input v-model="filter" class="search" placeholder="   Search" />
                <b-btn @click="toggleAddWalletAddressModal()" class="btn btn-primary">ADD</b-btn>
            </div>
        </div><br>
        <b-table :fields="fields" :items="wallets" :filter="filter" ref="table" class="tabletext my-table-scroll11">
            <template slot="Edit" slot-scope="data">
                <div class="nowrap">
                    <span @click="toggleEditWalletAddressModal()" style="cursor: pointer;"><img :src="'/other/edit.svg'" class="watchlist-icons inverted" width="20px" /></span>
                </div>
            </template>
            <template slot="Remove" slot-scope="data2">
                <div class="nowrap">
                    <span v-on:click="deleteWallet(data2.index)" style="cursor: pointer;"><img :src="'/other/delete.svg'" class="watchlist-icons" width="30px" /></span>
                </div>
            </template>
        </b-table>
    </div>
</div>
</template>
<script>
    export default {
        data() {
            return {
                all_tokens: {
                    'user_token': '52342435234523452435234dsfgsdgr45624356gdfsgf'
                },
                endpoint: this.$store.state.apiEndPoint,
                wallets: [],
                filter: null,
                newWallets: [],
                showADD: false,
                showEDIT: false,
                nicknameEdit: '',
                deleteAddr: '',
                coinsymbol: '',
                nickname: '',
                address: '',
                time: '',
                balance: '',
                show: false,
                originalNickname: '',
                newNickname: '',
                originalAddress: '',
                newAddress: '',
                variants: [
                    'primary', 'black', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'dark4'
                ],
                headerBgVariant: 'black',
                headerTextVariant: 'light',
                bodyBgVariant: 'black',
                bodyTextVariant: 'light',
                footerBgVariant: 'black',
                footerTextVariant: 'light',
                fields: [{
                        key: "Symbol",
                        label: "Symbol",
                        sortable: true
                    },

                    {
                        key: "Address",
                        label: "Address",
                        sortable: true
                    },
                    {
                        key: "Nickname",
                        label: "Nickname",
                        sortable: true
                    },
                    {
                        key: "Edit",
                        label: "Edit",
                        sortable: false
                    },
                    {
                        key: "Remove",
                        label: "Delete",
                        sortable: false
                    },
                ]
            }
        },
        methods: {
            toggleAddWalletAddressModal(){
              this.$store.commit('modals/toggleAddWalletModal');
            },
            toggleEditWalletAddressModal(){
              this.$store.commit('modals/toggleEditWalletModal');
            },
            refreshwallet_TABLE() {
                this.wallets = [];
                 var that = this;
                for (var elem in that.$store.state.generalData.accountWallets) {
                    that.wallets.push({
                        'Symbol': that.$store.state.generalData.accountWallets[elem].Symbol,
                        'Address': that.$store.state.generalData.accountWallets[elem].Address,
                        'Nickname': that.$store.state.generalData.accountWallets[elem].Nickname,
                    });
                }
              
            },
         refreshwallet_newEntry() {
                 var that = this;
                for (var elem in that.$store.state.generalData.accountWallets) {
                    that.wallets.push({
                        'Symbol': that.$store.state.generalData.accountWallets[elem].Symbol,
                        'Address': that.$store.state.generalData.accountWallets[elem].Address,
                        'Nickname': that.$store.state.generalData.accountWallets[elem].Nickname,
                    });
                }
            },

            refreshwallet_DELETE(deletedAddress) {
                var that = this;
                var tmp_wallet = []
                for (var elem in that.wallets) {
                    if (that.wallets[elem].Address != deletedAddress) {
                        tmp_wallet.push(that.wallets[elem])
                    }
                }
                this.wallets = []
                this.wallets = tmp_wallet

            },
            refreshwallet_EDIT() {
                var that = this;
                for (var elem in that.wallets) {
                    if (that.wallets[elem].Nickname == that.originalNickname) {
                        that.wallets[elem].Nickname = that.newNickname;
                    }
                    if (that.wallets[elem].Address == that.originalAddress) {
                        that.wallets[elem].Address = that.newAddress;
                    }
                }
            },
            get_token: function() {
                var token = sessionStorage.getItem('token')
                var header = {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(token + ':unused')
                }
                fetch(this.endpoint + "token", {
                    method: "POST",
                    mode: 'cors',
                    headers: header,
                    body: JSON.stringify({
                        exchange: this.selected[0].toLowerCase(),
                        key: this.keys,
                        secret: this.secret
                    })
                }).then(function(response) {}).then(function(response) {})
            },
           
            edit_wallet: function() {
                var token = sessionStorage.getItem('token')
                var header = {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(token + ':unused')
                }
                var url = "api/editWallet"
                var that = this;
                let body = {
                        'originalNickname': that.originalNickname,
                        'newNickname': that.newNickname,
                        'originalAddress': that.originalAddress,
                        'newAddress': that.newAddress
                    }
                that.$insightfetch(url, 'POST', body, 'cors', 'same-origin', true).then(function(myResponse) {
                    if (myResponse.result === "success") {
                        that.showEDIT = false;
                        that.refreshwallet_EDIT()
                        let newData = JSON.parse(JSON.stringify(that.wallets))
                        that.$store.commit('updateKey', {'key': 'accountWallets', 'newData': newData})
                    }
                    return myResponse;
                })
            },
            delete_Wallet: function() {
                var token = sessionStorage.getItem('token')
                var header = {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(token + ':unused')
                }
                var url = "api/deleteWallet"
                var body = {
                    'address': this.deleteAddr
                }
                var that = this
                that.$insightfetch(url, 'POST', body, 'cors', 'same-origin', true).then(function(myResponse) {
                    if (myResponse.result === "success") {
                        that.refreshwallet_DELETE(that.deleteAddr)
                        let newData = JSON.parse(JSON.stringify(that.wallets))
                        that.$store.commit('updateKey', {'key': 'accountWallets', 'newData': newData})
                    }
            })
        }
        },
        props: ['addresses'],
        mounted() {
            let that = this;
            this.refreshwallet_TABLE();
            this.$nuxt.$on("refreshWalletTable", () => {
            that.refreshwallet_newEntry();
            });
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .inline {
        float: left;
    }

    .btn-add {
        background: #345278 !important;
    }

    .modal-black {
        background: black;
    }

    .dark2 {
        background-color: black !important;
    }

    .border-set {
        border-radius: 5px;
    }

    .pad {
        padding-left: 30px;
        padding-top: 10px;
    }

    .btn-primary {
        background: #345278 !important;
        border: none;
    }

    .button-pad {
        position: relative;
        top: 10px;
        left: 100px;
    }

    .inverted {
        filter: invert(100%);
    }

    .blue-text {
        color: #7648eb;
        font-family: 'Montserrat', sans-serif;
        font-weight: bolder;

    }

    .font-style {
        font-family: 'Montserrat', sans-serif;
    }

    .token-text {
        font-size: 9px;
        float: left;
        position: relative;
        left: -50px;
    }

    .token-text2 {
        font-size: 13px;
        letter-spacing: 1px;
        float: left;
        color: #7648eb !important;
        position: relative;
        left: -50px;
    }

    .white {
        color: white;
    }

    .white-hr {
        background: rgb(117, 112, 112);
        width: 80%;
    }

    .wrapper {
        height: 232px !important;
        overflow: hidden;
    }

    /* width */
    ::-webkit-scrollbar {
        width: 5px;
        height: 10%;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #2b2a2a00;

    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 25px;
        height: 10%;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
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
        .search {
        width: 90px;
        border: 2px solid rgb(204, 204, 204);
        background: transparent;
        border-radius: 25px;
        height: 30px;
        font-family: 'Montserrat', sans-serif;
        color: white;
        font-weight: bold;
        outline-style: none;
        font-size: 12px;
    }

</style>