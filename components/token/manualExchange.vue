<template> 
<div class="border-set font-style"> 
<b-col cols="12">
<b-row>
<b-col cols="6">
<div style="font-weight:bold;float:left;">Exchanges</div>
<br>
<div>
<div style="font-size:14px;float:left;">API Keys</div>
<b-btn @click="toggleManualApiKeysModal('open')" size="sm" class="btn btn-primary">ADD</b-btn>
<b-btn @click="toggleDeleteApiKeysModal('open')" size="sm" class="btn btn-aux">DELETE</b-btn>
<br>
</div>
<div  class="exchangeWrap" style="margin-top:10px;">
<div  v-for="item in AvailableExchangeArray" :key="item.id">
<div style="color:#65cdfa;font-weight:bold;text-align:left;text-transform:capitalize;">{{item.exchange}}</div>
<fa  :icon="item.checked" :style="item" style="position:relative;top:-23px;"  />
</div>
</div>
</b-col>
<b-col cols="6">
<div style="display:inline;">
<div style="margin-top:25px;font-size:14px;float:left;">Manual Exchange</div>
<br>
<b-btn @click="toggleManualExchangeModal('open')" size="sm" class="btn btn-primary">ADD</b-btn> 
</div>
<div class="exchangeWrap" style="margin-top:10px;">
<div style="display:inline" v-for="item in exchanges" :key="item.id">
<div style="color:#65cdfa;font-weight:bold; text-align:left;text-transform:capitalize;">{{item}}</div>
<div style="margin-top:25px;"></div>
</div>
</div>
</b-col>
</b-row>
</b-col>
</div> 
</template> 
<script> 
/* eslint-disable */
import { mapState } from 'vuex'

export default { 
  data () { 
    return { 
       checkedColor: {'position':'relative','top':'-23px', 'color':'#ff0001'},
       availableExchanges: [],
       addedExchange: this.$store.state.apiKeys,
       exchanges: this.$store.state.manualExchanges,
  }

  },
  computed: {
    ...mapState({
        supportedExchanges: state => state.supportedExchanges,
        exchangesWeSupport: state => state.exchangesWeSupport

    }),
    AvailableExchangeArray() {
    let supportArray = []
    let exchangesWeSupport = this.exchangesWeSupport;
    for (let exchange in exchangesWeSupport){
        if (this.supportedExchanges.includes(exchangesWeSupport[exchange].toLowerCase())){
            supportArray.push({'checked':'check', 'exchange': exchangesWeSupport[exchange], 'color':'green'})            
        } 
        else{
            supportArray.push({'checked':'times', 'exchange': exchangesWeSupport[exchange], 'color':'#ff0001'})
        }    
    }
    return supportArray
},
},
  mounted(){
    let that = this;
    this.$nuxt.$on("resetAvailableExchanges", (data) => {
      that.reset(data);
    });
  },
    methods: {
            toggleManualExchangeModal(value){
              this.$store.commit('modals/toggleManualExchange', value);
            },
             toggleManualApiKeysModal(value){
              this.$store.commit('modals/toggleManualApiKeys', value);
            },
             toggleDeleteApiKeysModal(value){
              this.$store.commit('modals/toggleDeleteApiKeys', value);
            },
            reset(data) {
            this.exchanges.push(Object.keys(data.exchanges.exchanges[0])[0]);
            },
  },
} 
</script> 
<!-- Add "scoped" attribute to limit CSS to this component only --> 
<style scoped>
.inline { float:left; }
.btn-add{
  background: #345278 !important; 
}
 .modal-black{
   background: black;
 }
.dark2{ 
    background-color: black !important; 
} 
.border-set{ 
border-radius: 5px; 
  height: 15rem;
} 
.border-seet{ 
border-radius: 5px; 
  border: 5px solid rgb(39, 39, 39); 
} 
.pad{ 
padding-left: 30px; 
padding-top:10px; 
} 
.btn-primary{ 
    background: #345278 !important; 
    border: none; 
} 
.btn-aux{ 
    background: rgb(197, 53, 53)!important; 
    border: none; 
} 
.button-pad{ 
    position: relative; 
    top:10px; 
    left:100px; 
} 
.blue-text{ 
color:#7648eb; 
font-family: 'Montserrat', sans-serif; 
    font-weight: bolder; 
 
} 
.font-style{ 
    font-family: 'Montserrat', sans-serif; 
} 
.token-text{
        font-size: 9px;
        float: left;
        position: relative;
        left: -50px;
}
.token-text2{
        font-size: 13px;
        letter-spacing: 1px;
        float: left;
        color:#7648eb !important; 
                position: relative;
        left: -50px;
}
.white{ 
    color:white; 
} 
.white-hr{ 
    background: rgb(117, 112, 112); 
    width: 80%;  
} 
.wrapper {
    margin-left:auto;
    margin-right:auto;
    width:99%;
    height: 125px;
    overflow:hidden !important;
    overflow-y:scroll !important;
}
/* width */
::-webkit-scrollbar {
    width: 5px;
    height:10%;
}

/* Track */
::-webkit-scrollbar-track {
    background: #2b2a2a00; 
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 25px;
    height:10%;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555; 
}
.wrapperExchange{
height: 360px;
overflow-y: scroll;
overflow-x: hidden;
}
.exchangeWrap{
height: 130px;
overflow-y: scroll;
overflow-x: hidden;  
}
</style> 