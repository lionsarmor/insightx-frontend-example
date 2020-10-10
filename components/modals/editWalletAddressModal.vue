<template>
    <div>
        <!-- EDIT Modal Component -->
        <b-modal v-model="$store.state.modals.editWalletAddressModal" id="editWallet" title="EDIT Wallet" class="table-labels" :header-bg-variant="headerBgVariant" :header-text-variant="headerTextVariant" :body-bg-variant="bodyBgVariant" :body-text-variant="bodyTextVariant" :footer-bg-variant="footerBgVariant" :footer-text-variant="footerTextVariant" @hide="toggleEditWalletAddressModal()">
            <b-container>
                <b-row class="my-1">
                    <b-col sm="2">
                    </b-col>
                </b-row><br />
                <b-row class="my-1">
                    <b-col sm="2">
                        <label for="input-large">Wallet nickname:</label></b-col>
                    <b-col sm="10">
                        <b-form-input v-model="newNickname" class="drop-input" id="input-large" size="lg" type="text" placeholder="Nickname" style="width:50%; margin-left:10%;"></b-form-input>
                    </b-col>
                </b-row>
                <br><br>
                <b-row class="my-1">
                    <b-col sm="2">
                        <label for="input-large">Address:</label></b-col>
                    <b-col sm="10">
                        <b-form-input class="drop-input" v-model="newAddress" id="input-large" size="lg" type="text" placeholder="Wallet Address" style="width:50%; margin-left:10%;"></b-form-input>
                    </b-col>
                </b-row>
                <br>
                 <b-row class="my-1">
                    <b-col>
                        <label style="float:left;" for="input-large">Time:</label></b-col>
                    <b-col>
                        <datetime 
                        type="datetime"
                        :phrases="{ok: 'Continue', cancel: 'Exit'}"
                        placeholder="Date"
                        v-model="time"
                        input-class="drop-input" 
                        input-style="border:none;width:89%;border-radius:3px;float:left;margin-left:-120px;"
                        >
                        </datetime>
                        <br> 
                    </b-col>
                </b-row>

            </b-container>
            <div slot="modal-footer" class="w-100">
                <button size="sm" class="btn-fil-red float-left" style="font-size:17px;" variant="primary" @click="$root.$emit('bv::hide::modal','editWallet')">
                    Close
                </button>
                <button size="sm" style="font-size:17px;" class="btn-fil-blue float-right" variant="primary" @click="edit_wallet()">
                    Edit
                </button>
            </div>
            <div slot="modal-header" class="w-100">
                <h5>Edit Wallet</h5>
            </div>
        </b-modal>
    </div>
</template>
<script>
    export default {
        data() {
            return {
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
            }
        },
        methods: {
            toggleEditWalletAddressModal() {
                this.$store.commit('modals/toggleEditWalletModal');
            },
            editWallet(idx) {
                var addrObj = this.wallets[idx]
                this.originalNickname = addrObj.Nickname
                this.originalAddress = addrObj.Address
                this.newNickname = addrObj.Nickname
                this.newAddress = addrObj.Address
                this.showEDIT = true
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
                    'newAddress': that.newAddress,
                    //'newDate' : that.time,
                }
                that.$insightfetch(url, 'POST', body, 'cors', 'same-origin', true).then(function(myResponse) {
                    if (myResponse.result === "success") {
                        that.showEDIT = false;
                        that.refreshwallet_EDIT()
                        let newData = JSON.parse(JSON.stringify(that.wallets))
                        that.$store.commit('updateKey', {
                            'key': 'accountWallets',
                            'newData': newData
                        })
                    }
                    return myResponse;
                })
            },
        },
        props: ['addresses'],
        mounted() {}
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
        border: 5px solid rgb(37, 36, 36);
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
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        height: 250px;
        overflow: hidden;
        overflow-y: scroll;
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