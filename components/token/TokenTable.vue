<template> 
<div id="tickerSpaceToken">
<div class="border-set font-style"> 
    <h5 class="title" style="margin-left:-54vh;">Token</h5>
        <b-container>
          <b-row>
            <b-col><span  style="margin-left:20%;" class="token-text2 text-left">Username</span></b-col>
          </b-row>
            <b-row>
                <b-col><span  style="margin-left:68%; text-align: left" class="white token-text inline">{{usernameStars}}</span></b-col>
                <b-col><b-btn  v-if="usernameShow === 'show'" class="btn btn-primary" v-on:click="usernameShow = 'hide', usernameStars = username" style="float:right;">SHOW</b-btn>
                        <b-btn  v-if="usernameShow === 'hide'" class="btn btn-primary" v-on:click="usernameShow = 'show', usernameStars = '', numberStarsUsername()" style="float:right">HIDE</b-btn>  
                </b-col>
                <b-col></b-col>
            </b-row>
            <b-row>
              <b-col><hr class="white-hr"></b-col>
            </b-row>
            <b-row>
              <b-col><span  style="margin-left:20%;" class="token-text2 text-left">Partner Code</span> </b-col>
            </b-row>
            <b-row>
                <b-col cols="4"><span  style="margin-left:68%; text-align: left" class="white token-text inline">{{stars}}</span></b-col>
                <b-col><b-btn  v-if="show === 'show'" class="btn btn-primary" v-on:click="show = 'hide', stars = partnerCode" style="float:right;">SHOW</b-btn>
                        <b-btn  v-if="show === 'hide'" class="btn btn-primary" v-on:click="show = 'show', stars = '', numberStars()" style="float:right">HIDE</b-btn>  
                </b-col>
                <b-col>
                <b-btn class="btn btn-primary" style="float:left; margin-right:10px;" v-on:click="toggleAddTokenModal('open')">CHANGE</b-btn> 
                <b-btn class="btn btn-primary" style="float:left;" v-on:click="wipePromoCode()">WIPE</b-btn>
                </b-col>
            </b-row>
            <b-row>
              <b-col><hr class="white-hr"></b-col>
            </b-row>
            <b-row>
              <b-col>    <span  style="margin-left:20%;" class=" white token-text2 text-left">User Token</span> </b-col>
            </b-row>
            <b-row>
                <b-col cols="4">    <span  style="margin-left:68%;" class=" white token-text inline ">{{tokenStars}}</span> </b-col>
                <b-col>    <b-btn  v-if="tokenShow === 'show'" class="btn btn-primary" v-on:click="tokenShow = 'hide', tokenStars = partnerToken" style="float:right;" >SHOW</b-btn> 
                            <b-btn  v-if="tokenShow === 'hide'" class="btn btn-primary" v-on:click="tokenShow = 'show', tokenStars = '', numberStarsToken()" style="float:right;">HIDE</b-btn> 
                </b-col>
                <b-col>  <!--<b-btn  class="btn btn-primary" style="float:left;" v-on:click="resetPartnerToken()">RESET</b-btn>-->   </b-col>
            </b-row>
        </b-container> 
  </div> 
  </div>
</template> 
<script> 

export default { 
  props: ['userInfo'],
  data () { 
    return { 
      endpoint: this.$store.state.apiEndPoint,
      stars: '',
      tokenStars: '',
      usernameStars: '',
      show: 'show',
      tokenShow: 'show',
      usernameShow: 'show',
      partnerCode: null,
      partnerToken: null,
      newCode: null,
      username: null,
      showMod: false,
                headerBgVariant: 'black',
                headerTextVariant: 'light',
                bodyBgVariant: 'black',
                bodyTextVariant: 'light',
                footerBgVariant: 'black',
                footerTextVariant: 'light'
    } 
  } ,
  methods: {
    toggleAddTokenModal(value){
      this.$store.commit('modals/toggleAddToken', value);
      },
    resetPartnerToken: function (){
        let that = this
        this.$insightfetch('resetpartnertoken', 'GET').then(function(myResponse){
          if (myResponse.result == 'success'){
          that.partnerToken = myResponse.token
          let newUserInfo = that.userInfo
          newUserInfo.partnerToken = myResponse.token
          that.$store.commit('updateKey', {'key': 'userInfo', 'newData': newUserInfo})
          if (that.tokenShow == 'hide'){
            that.tokenStars = myResponse.token
          }
          that.$toast.success(myResponse.result, {icon: 'check'} )
          }
        })
    },
    wipePromoCode: function (){
        let that = this
        this.$insightfetch('wipepartnercode', 'GET', null, 'cors', 'same-origin', true).then(function(myResponse){
          if (myResponse.result == 'success'){
          that.partnerCode = 'none'
          let newUserInfo = that.userInfo
          newUserInfo.partnerCode = 'none'
          that.$store.commit('updateKey', {'key': 'userInfo', 'newData': newUserInfo})
          if (that.show == 'hide'){
            that.stars = 'none'
          }
          }
           return myResponse;
        }).then(function(response){ that.$router.go()})
    },
    numberStars: function (){
    var tokenTemp = this.partnerCode
    if (!tokenTemp) {
      return
    }
    var starlength = tokenTemp.length;
    for (var i=0; i < starlength; i++) {
    this.stars += ('*');
    }
    },
    numberStarsToken: function (){
    var tokenTemp = this.partnerToken
    if (!tokenTemp) {
      return
    }
    var starlength = tokenTemp.length;
    for (var i=0; i < starlength; i++) {
    this.tokenStars += ('*');
    }
    },
    numberStarsUsername: function (){
    var tokenTemp = this.username
    if (!tokenTemp) {
      return
    }
    var starlength = tokenTemp.length;
    for (var i=0; i < starlength; i++) {
    this.usernameStars += ('*');
    }
    }
  },

  mounted () {
      this.partnerCode = this.userInfo.partnerCode
      this.partnerToken = this.userInfo.partnerToken
      this.username = this.userInfo.username
      this.numberStars();
      this.numberStarsToken();
      this.numberStarsUsername();
    }
} 
</script> 
<!-- Add "scoped" attribute to limit CSS to this component only --> 
<style scoped>
.btn-add{
  background: #345278 !important; 
}
 .modal-black{
   background: black;
 }
.dark2{ 
    background-color: black !important; 
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
        font-weight: bolder;
}
.border-set{ 
border-radius: 5px; 
} 

.btn-primary{ 
    background: #345278 !important; 
    border: none;
    padding: 3px;
} 

.font-style{ 
    font-family: 'Montserrat', sans-serif; 
} 
.token-text{
        font-size: 11px;
        float: left;
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
    width:100%;
    height: 250px;
    overflow:hidden !important;
    overflow-y:auto !important;
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
.drop-input{
color:white;
background: #1a1a1a;
border:none;
font-size: 12px;
height:30px;
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