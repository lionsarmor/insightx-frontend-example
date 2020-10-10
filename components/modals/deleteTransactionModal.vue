<template>
    <div class="bg">
        <b-row>
            <b-col>
                <!-- Modal Component ADD TO WATCHLIST -->
                <div style="z-index: 99;">
                    <b-modal id="deleteTransaction" v-model="$store.state.modals.deleteTransactionsModal" title="Confirm Deletion" :header-bg-variant="headerBgVariant" :body-bg-variant="bodyBgVariant" :body-text-variant="bodyTextVariant" :footer-bg-variant="footerBgVariant" :footer-text-variant="footerTextVariant" @hide="toggleDeleteModal()">
                        <div slot="modal-footer" class="w-100">
                            <b-btn size="sm" class="float-left btn-fil-yellow" variant="secondary" @click="$root.$emit('bv::hide::modal','deleteTransaction')">Close</b-btn>
                            <button size="sm" class="float-right btn-fil-red" v-on:click="confirm(), $root.$emit('bv::hide::modal','deleteTransaction')">Delete</button>
                        </div>
                        <div slot="modal-header" class="w-100">
                            <h5>Confirm Deletion</h5>
                        </div>
                    </b-modal>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { mapState } from 'vuex'

    export default {
        data() {
            return {
                headerBgVariant: 'black',
                bodyBgVariant: 'black',
                bodyTextVariant: 'light',
                footerBgVariant: 'black',
                footerTextVariant: 'light',
            }
        },
        methods: {
    confirm(){
        this.$nuxt.$emit('confirmDelete');
    },
    toggleDeleteModal(open, data) {
    this.$store.commit('modals/toggledeleteTransactionsModal', open, data);
    this.deleteData = data;
    },
},
mounted() {

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