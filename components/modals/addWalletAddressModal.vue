<template>
    <div>
        <!-- ADD Modal Component -->
        <b-modal v-model="$store.state.modals.addWalletAddressModal" id="addWallet"
         :header-bg-variant="headerBgVariant"
          :header-text-variant="headerTextVariant"
           :body-bg-variant="bodyBgVariant" 
           :body-text-variant="bodyTextVariant" 
           :footer-bg-variant="footerBgVariant"
            :footer-text-variant="footerTextVariant"
            @hide="toggleAddWalletAddressModal()"
            >
            <b-container style="font-size:12px;">
                <br />
                <br />
                <b-row style="white-space: nowrap;" class="my-1">
                    <b-col sm="2">
                        <label for="input-large">Coin Symbol: </label></b-col>
                    <b-col sm="10">
                        <b-form-input v-model="coinsymbol" id="input-large" size="sm" type="text" class="drop-input" style="width:50%;margin-left:30px;border-radius:5px;" placeholder="EX:BTC"></b-form-input>
                    </b-col>
                </b-row>
                <b-row style="white-space: nowrap;" class="my-1">
                    <b-col sm="2">
                        <label for="input-large">Wallet nickname:</label></b-col>
                    <b-col sm="10">
                        <b-form-input v-model="nickname" id="input-large" size="lg" type="text" class="drop-input" style="width:50%;margin-left:30px;" placeholder="EX:Bitcoin1"></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="my-1">
                    <b-col sm="2">
                        <label for="input-large">Address:</label></b-col>
                    <b-col sm="10">
                        <b-form-input v-model="address" id="input-large" size="lg" type="text" class="drop-input" style="width:50%;margin-left:30px;" placeholder="wallet address"></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="my-1">
                    <b-col sm="2">
                        <label for="input-large">Balance:</label></b-col>
                    <b-col sm="10">
                        <b-form-input v-model="balance" id="input-large" size="lg" type="text" class="drop-input" style="width:50%;margin-left:30px;" placeholder="address balance"></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="my-1">
                    <b-col sm="2">
                        <label style="float:left;" for="input-large">Time:</label></b-col>
                    <b-col sm="10">
                       
                        <datetime 
                        type="datetime"
                        :phrases="{ok: 'Continue', cancel: 'Exit'}"
                        v-model="time"
                        placeholder="Date"
                        input-class="drop-input" 
                        input-style="border:none;width:50%;border-radius:3px;float:left;margin-left:30px;"
                        >
                        </datetime>
                        
                        <br> 
                    </b-col>
                </b-row>

            </b-container>
            <div slot="modal-footer" class="w-100">
                <button size="sm" class="float-left btn-fil-red" variant="primary" @click="$root.$emit('bv::hide::modal','addWallet')">CLOSE</button>
                <button size="sm" class="float-right btn-fil-blue" variant="primary" @click="add_wallet()">
                    ADD
                </button>
            </div>
             <div slot="modal-header" class="w-100">
                 <h5>Add Wallet Address</h5>
            </div>
        </b-modal>
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
            deleteWallet(idx) {
                var addrObj = this.wallets[idx]
                this.deleteAddr = addrObj.Address
                this.delete_Wallet()
                //this.deleteAddr = null

            },
            editWallet(idx) {
                var addrObj = this.wallets[idx]
                this.originalNickname = addrObj.Nickname
                this.originalAddress = addrObj.Address
                this.newNickname = addrObj.Nickname
                this.newAddress = addrObj.Address
                this.showEDIT = true
            },
            refreshwallet_TABLE() {
                this.wallets = [];
                var that = this;
                for (var elem in this.addresses) {
                    that.wallets.push({
                        'Symbol': that.addresses[elem].Symbol,
                        'Address': that.addresses[elem].Address,
                        'Nickname': that.addresses[elem].Nickname,
                    });
                }
            },
            refreshwallet_ADD() {
                var that = this;
                that.wallets.push({
                    'Symbol': this.coinsymbol,
                    'Address': this.address,
                    'Nickname': this.nickname,
                });
            },
            add_wallet: function() {
                if (this.time == null || this.time == "") {
                    this.$toast.error("You must specify a time.", {icon: 'warning'});
                    return
                }
                var token = sessionStorage.getItem('token')
                var header = {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(token + ':unused')
                }
                var url = "api/addWallet"
                var body = {
                    'currency': this.coinsymbol,
                    'address': this.address,
                    'nickname': this.nickname,
                    'balance': this.balance,
                    'time': new Date(this.time).getTime()
                }
                var that = this;
                that.$insightfetch(url, 'POST', body, 'cors', 'same-origin', true).then(function(myResponse) {
                    if (myResponse.result === "success") {
                        that.showADD = false;
                        that.refreshwallet_ADD()
                        let newData = JSON.parse(JSON.stringify(that.wallets))
                        that.$store.commit('updateKey', {'key': 'accountWallets', 'newData': newData})
                    that.coinsymbol = ''
                    that.address = ''
                    that.nickname = ''
                    that.balance = ''
                    that.time = ''
                    that.$nuxt.$emit('refreshWalletTable');
                    that.$root.$emit('bv::hide::modal','addWallet')
                    }
                })
            },
        },
        props: ['addresses'],
        mounted() {
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