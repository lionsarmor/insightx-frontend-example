<template>

  <div class="font wrapper" >
      <div class="d-block d-xl-block">
    <div class="wrapper-bar">
    <b-row class="wrapper2">
        <b-col cols="12">
            <b-row>
            <b-col cols="4">
            <div class="filter-space" style="position: relative; top:-8px;"><br>
            <div class="dropdown">
           <!-- <button class="dropbtn nowrap">24H</button>-->
            <div class="dropdown-content">
                <a href="#" v-on:click="filter_time = '24H'">24H</a>
                <a href="#" v-on:click="filter_time = '7D'">7D</a>
                <a href="#" v-on:click="filter_time = '1M'">1M</a>
                </div>
                </div>                 
                </div>
                </b-col>
                 <b-col cols="4">
            <div style="position: relative; top:-8px;"><br>
            <div class="dropdown">
           <!-- <button class="dropbtn nowrap">USD</button>-->
            <div class="dropdown-content">
                <a href="#" v-on:click="currency = 'USD'">USD</a>
                <a href="#" v-on:click="currency = 'BTC'">BTC</a>
                </div>
                </div>     
            </div>
                </b-col>
                 <b-col cols="4">
            <div style="position: relative; top:-8px;"><br>
                    <b-form-input v-model="search"  class="search" placeholder=" Search" />
                </div>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
<b-row>
</b-row>
</div>
  </div>
<div>
    <div class="hide-head" style="position: relative; top:-3px; z-index:101;"></div>
    <coins-wallet-table :searchFilter="search" :addresses="walletAddress" style="position:relative; top:-20px;"></coins-wallet-table>
</div>

  </div>
</template>

<script>
/* eslint-disable */


    import CoinsWalletTable  from '~/components/coinsPageComponents/coinswallettable/CoinsWalletTable'
    import { mapState } from 'vuex'

    export default {
      name: 'TradeFilterBar',
      data () {
        return {
        search: '',
      }
      },
      computed: {
        ...mapState({
          walletAddress: state => state.coins.walletAddresses
        })
      },
      components: {
        CoinsWalletTable,
      },
      methods:{
        applyFilter () {
        }
    },
    mounted(){
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item + .item:before {
  content: ", ";
}
.drpbut{
    background-color: black !important;

}
.wrapper {
    margin-left:auto;
    margin-right:auto;
    width:100%;
}
.wrapper-bar {
    margin-left:auto;
    margin-right:auto;
    width:300px;
    position: relative;
    left:26%;
    top:47px;
}
.but-space{
        padding-left: 50px;
        padding-right: 10px;
}
.modal-but{
    background-color: black !important;
    border: none !important;
}
.black{
    color: black !important;
}
.hide-head{
  background-color: rgba(0, 0, 0, 0);
  width:100%;
  height:1px;
}

.size{
  width: 50px;
}
.btn-fil{
    color: white !important;
    background-color: black !important; 
    border-style: solid;
    border-width: 2px;
    border-color: rgb(255, 255, 255);
    border-radius: 25px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 11px;
}
.btn-fil{
  height: 27px !important;
}
.search{
  margin-top:-18px;
  width: 80px;
  border: 2px solid rgb(255, 255, 255);
  background: transparent;
  border-radius: 25px;
  height: 27px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-weight: bold;
  outline-style: none;
  font-size: 11px;
}
.table-wrapper
{
    width: 100%;
    height:100px;
    position: relative;
    right:-27px;
    overflow: scroll; 
    overflow-x: hidden; 
    background-color: black; 
}
ul{
    list-style: none;
}

</style>
