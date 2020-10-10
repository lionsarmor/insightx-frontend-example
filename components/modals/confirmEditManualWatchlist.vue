<template>
    <div class="bg">
        <b-row>
            <b-col>
                <!-- Modal Component ADD TO WATCHLIST -->
                <div style="z-index: 99;">
                    <b-modal id="confirmManualModal" v-model="$store.state.modals.confirmManualModal" title="Edit Manual Exchange" :header-bg-variant="headerBgVariant" :body-bg-variant="bodyBgVariant" :body-text-variant="bodyTextVariant" :footer-bg-variant="footerBgVariant" :footer-text-variant="footerTextVariant" :no-close-on-backdrop="true" :no-close-on-esc="true">
                        <b-row>
                            <b-col cols="12">
                                <b-form inline>
                                    <b-container>

                                    </b-container>
                                </b-form>
                            </b-col>
                        </b-row>
                        <br>
                        <div slot="modal-footer" class="w-100">
                            <b-btn size="sm" class="float-left btn-fil-red" variant="secondary" @click="$root.$emit('bv::hide::modal','confirmManualModal')">EDIT</b-btn>
                            <button size="sm" class="float-right btn-fil-blue2" v-on:click="editManualBalance()">CONFIRM</button>
                        </div>
                        <div slot="modal-header" class="w-100">
                            <h5>Confirm Maunual Exchange Change</h5>
                        </div>
                    </b-modal>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex';
    import {
        mapActions
    } from 'vuex';

    export default {
        data() {
            return {
                variants: [
                    'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'black'
                ],
                headerBgVariant: 'black',
                bodyBgVariant: 'black',
                bodyTextVariant: 'light',
                footerBgVariant: 'black',
                footerTextVariant: 'light',
            }
        },
        computed: {
            ...mapState({
                manualBalancesData: state => state.modals.editManualBalnce,
            }),
        },
        methods: {
            toggleEditWatchlistModal(value) {
                this.$store.commit('modals/toggleEditWatchlist');
            },
            toggleConfirmManualModal(value) {
                this.$store.commit('modals/toggleConfirmManualModal');
            },
            editManualBalance() {
                try {
                    let that = this;
                    let body = {
                        'exchange': this.manualBalancesData.exchange,
                        'asset': this.manualBalancesData.asset,
                        'currentAvailableBalance': this.manualBalancesData.currentAvailableBalance,
                        'editBalance': this.manualBalancesData.editBalance
                    };
                    let endPoint = "api/editManualExchangeBalance";
                    this.$insightfetch(endPoint, 'POST', body, 'cors', 'same-origin', true).then(function(jsonResponse) {
                     that.toggleEditWatchlistModal();
                     that.toggleConfirmManualModal();
                    })
                } catch (error) {
                    console.error(error);
                }
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .filter-button {
        padding-left: 5px;
        padding-right: 5px;
        cursor: pointer;
    }

    .filter-button2 {
        padding-left: 20px;
        padding-right: 5px;
        cursor: pointer;
    }

    .filter-button3 {
        padding-left: 5px;
        padding-right: 50px;
        position: relative;
        left: -30%;
        cursor: pointer;
    }

    .hide-head {
        background-color: rgb(0, 0, 0);
        width: 100%;
        height: 9px;
    }

    .btn-fil {
        height: 27px !important;
        cursor: pointer;
    }

    .wrap-bar {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        margin-bottom: -20px;
        margin-top: 115px;
        z-index: 99;
    }

    .modal-but {
        background-color: black !important;
        border: none !important;
    }

    .black {
        color: black !important;
    }

    .watchlist-star {
        height: 15px;
        width: 15px;
    }

    [v-cloak]>* {
        display: none
    }

    [v-cloak]::before {
        content: "loading…"
    }

    .table-dark2:nth-child(odd) {
        background-color: rgb(10, 10, 10) !important;
        border: 3px solid rgba(54, 53, 53, 0.815);
        border-right: black;
        border-left: black;
    }

    .table-dark2:nth-child(even) {
        background-color: rgb(0, 0, 0) !important;
        border: 3px solid rgba(54, 53, 53, 0.815);
        border-right: black;
        border-left: black;
    }

    .bg {
        background-color: black;
    }

    .white {
        color: white;
    }

    .green {
        color: green;
    }

    .red {
        color: rgb(0, 17, 255);
    }

    .btn-custom-primary {
        background: #047ea4;
        color: white;
    }

    .square {
        height: 22px;
        width: 7px;
        position: relative;
    }

    .gray {
        background-color: rgb(32, 32, 32);
    }

    .search {
        width: 100px;
        border: 2px solid rgb(204, 204, 204);
        background: transparent;
        border-radius: 25px;
        height: 25px;
        font-family: 'Montserrat', sans-serif;
        color: white;
        font-weight: bold;
        outline-style: none;
        position: relative;
        top: -18px !important;
        right: -8px;
        font-size: 11px !important;
        width: 80px !important;

    }

    .watchlist-search {
        position: relative;
        top: 2px;
        border: 2px solid rgb(255, 255, 255);
        background: black;
        border-radius: 25px;
        height: 25px;
        font-family: 'Montserrat', sans-serif;
        color: white;
        font-weight: bold;
        outline-style: none;
        font-size: 11px !important;
        width: 80px !important;
    }

    * {
        outline-style: none
    }

    .borderblack {
        background: black;
        position: relative;
        margin-top: 52px;
        z-index: 5;
    }

    .square2 {
        height: 10px;
        width: 1000px;
        position: relative;
        background: rgb(0, 0, 0);
        top: 1px;
        z-index: 5;
    }

    .nowrap {
        white-space: nowrap;
    }

    .cursor {
        cursor: pointer;
    }

    input {
        border-radius: 5px;
        border-width: 1px;
        border: none;
    }

    .black-form {
        background: #1a1a1a;
        color: white;
    }
</style>