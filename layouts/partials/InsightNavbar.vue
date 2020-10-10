<template>
<div> 

<b-navbar  :fixed="fixed" toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse" class="d-none"></b-navbar-toggle>

<b-navbar-brand>
  <span>
      <img class="noLine brand" style=" 
    position: relative; 
    left:5.4vh;
    top:-0.4vh;
    width:40px;" src="../../assets/other/logo.svg" />
      <img  class="noLine newLogo" style="width:200px;" src="../../static/other/LOGO.PNG" />
  </span>
  </b-navbar-brand>
  <b-collapse is-nav id="nav_collapse">

    <!-- Right aligned nav items --> 
    <b-navbar-nav class="ml-auto">

    <b-nav-item v-on:click="viewPage('portfolio')" right style="margin-right:30px;">
    <div>
    <h6 class="white">Portfolio</h6>
    <div v-if="this.$store.state.currentPage=='portfolio'" class="selected"></div>
    </div>
    </b-nav-item>

 <b-nav-item v-on:click="viewPage('analysis')" right style="margin-right:30px;">
    <div >
    <h6 class="white">Analysis</h6>
    <div v-if="$store.state.currentPage=='analysis'" class="selected"></div>
    </div>
    </b-nav-item>

 <b-nav-item v-on:click="viewPage('coins')" right style="margin-right:30px;">
    <div >
    <h6 class="white">Coins</h6>
    <div v-if="$store.state.currentPage=='coins'" class="selected"></div>
    </div>
    </b-nav-item>

 <b-nav-item v-on:click="viewPage('transactions')" id="transactionsButton" right style="margin-right:30px;">
    <div >
    <h6 class="white">Transactions</h6>
    <div v-if="$store.state.currentPage=='transactions'" class="selected"></div>
    </div>
    </b-nav-item>

 <b-nav-item v-on:click="viewPage('account')" right style="margin-right:30px;">
    <div>
    <h6 class="white">Account</h6>
    <div v-if="$store.state.currentPage=='account'" class="selected"></div>
    </div>
    </b-nav-item>

     <b-nav-item class="white"  v-on:click="logout" right>
                <h6 class="white">Logout</h6>
            </b-nav-item>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
</div>
</template>
<script>


export default {

  name: 'navbar',
  data () {
    return {
      fixed: 'top'
    }
  },
  mounted(){
      this.navbarFixedToggle();
  },
methods:{
    navbarFixedToggle(){
            if(window.innerWidth < 800){
                this.fixed = 'none'
            }else{
                this.fixed = "top"
            }
            },
     logout: function(){
            try {
                sessionStorage.removeItem("token");
                this.$store.commit('localStorage/SET_USER', 'logout');
                this.$store.commit('clearGeneralData')
                this.$router.go("/");
            }
              catch(error) {
                console.error(error);
                that.$toast.error(error, {icon: 'warning'} )
                this.$store.commit('localStorage/SET_USER', 'logout');
                this.$router.go("/");
                 }
        },
            viewPage: function(page) {
              this.$store.commit('updatePage', page)
              this.$router.push('/'+ page)
        },
},

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.selected {
  margin-top:-5px;
  height: 3px;
  width: 85%;
  background-image: linear-gradient(-90deg, rgb(0, 0, 0), rgb(77, 77, 83),  rgb(106, 108, 129),  rgb(175, 180, 219), rgb(255, 255, 255));
  border-radius: 10%;
}
.navbar-bar{
    height:50px;
    background-color: black;
    width: 100%;
    z-index:99;
    }
.navbar-dark{
    background: #000000 !important;
}
.img {
height: 12%;
width: 12%;
min-width: 10%;
}

.nowrap{
    white-space: nowrap;
}
.white{
    color:white;
    font-family: 'Montserrat', sans-serif;
}
.logo{
    position: relative;
    left:-10px;
    top:-5px;
}
.nav{
    white-space: nowrap;
}
.insight{
font-weight:bolder;
position: relative;
top:3px;
}
.item1{
  position: relative;
  top:8px;
  left: 75%;
}
.item2{
  position: relative;
  top:8px;
  right: 55%;
}
.bar-port{
  height: 25px;
  width: 65px;
  position: relative;
  z-index: 99;
  border-radius: 3px;
  background: linear-gradient( -180deg, rgb(0, 0, 0), rgb(0, 0, 0) 90%, rgb(255, 255, 255) 30%, rgb(4, 2, 8) 50%, #0f8cab94 90% ); 
  /*background: url('/static/bar.svg');*/
  background-repeat: no-repeat;
  background-position: right top;
 }
 .bar-anal{
  height: 25px;
  width: 65px;
  position: relative;
  z-index: 99;
  border-radius: 3px;
  background: linear-gradient( -180deg, rgb(0, 0, 0), rgb(0, 0, 0) 90%, rgb(255, 255, 255) 30%, rgb(4, 2, 8) 50%, #0f8cab94 90% ); 
  /*background: url('/static/bar.svg');*/
  background-repeat: no-repeat;
  background-position: right top;
 }
 .bar-coins{
  height: 25px;
  width: 43px;
  position: relative;
  z-index: 99;
  border-radius: 3px;
  background: linear-gradient( -180deg, rgb(0, 0, 0), rgb(0, 0, 0) 90%, rgb(255, 255, 255) 30%, rgb(4, 2, 8) 50%, #0f8bab 90% ); 
  /*background: url('/static/bar.svg');*/
  background-repeat: no-repeat;
  background-position: right top;
 }
 .bar-trans{
  height: 25px;
  width: 102px;
  position: relative;
  z-index: 99;
  border-radius: 3px;
  background: linear-gradient( -180deg, rgb(0, 0, 0), rgb(0, 0, 0) 90%, rgb(255, 255, 255) 30%, rgb(4, 2, 8) 50%, #0f8bab 90% ); 
  /*background: url('/static/bar.svg');*/
  background-repeat: no-repeat;
  background-position: right top;
 }
 .bar-acc{
  height: 25px;
  width: 68px;
  position: relative;
  z-index: 99;
  border-radius: 3px;
  background: linear-gradient( -180deg, rgb(0, 0, 0), rgb(0, 0, 0) 90%, rgb(255, 255, 255) 30%, rgb(4, 2, 8) 50%, #0f8bab 90% ); 
  /*background: url('/static/bar.svg');*/
  background-repeat: no-repeat;
  background-position: right top;
 }
 .bar-port-b{
  height: 25px;
  width: 65px;
  position: relative;
  z-index: 99;
  border-radius: 3px;
  background: linear-gradient( -180deg, rgb(0, 0, 0), rgb(0, 0, 0) 90%, rgb(255, 255, 255) 30%, rgb(4, 2, 8) 50%, #0000 90% ); 
  /*background: url('/static/bar.svg');*/
  background-repeat: no-repeat;
  background-position: right top;
 }
 .bar-anal-b{
  height: 25px;
  width: 65px;
  position: relative;
  z-index: 99;
  border-radius: 3px;
  background: linear-gradient( -180deg, rgb(0, 0, 0), rgb(0, 0, 0) 90%, rgb(255, 255, 255) 30%, rgb(4, 2, 8) 50%, #0000 90% ); 
  /*background: url('/static/bar.svg');*/
  background-repeat: no-repeat;
  background-position: right top;
 }
 .bar-coins-b{
  height: 25px;
  width: 43px;
  position: relative;
  z-index: 99;
  border-radius: 3px;
  background: linear-gradient( -180deg, rgb(0, 0, 0), rgb(0, 0, 0) 90%, rgb(255, 255, 255) 30%, rgb(4, 2, 8) 50%, #0000 90% ); 
  /*background: url('/static/bar.svg');*/
  background-repeat: no-repeat;
  background-position: right top;
 }
 .bar-trans-b{
  height: 25px;
  width: 102px;
  position: relative;
  z-index: 99;
  border-radius: 3px;
  background: linear-gradient( -180deg, rgb(0, 0, 0), rgb(0, 0, 0) 90%, rgb(255, 255, 255) 30%, rgb(4, 2, 8) 50%, #0000 90% );
  /*background: url('/static/bar.svg');*/
  background-repeat: no-repeat;
  background-position: right top;
 }
 .bar-acc-b{
  height: 25px;
  width: 68px;
  position: relative;
  z-index: 99;
  border-radius: 3px;
  background: linear-gradient( -180deg, rgb(0, 0, 0), rgb(0, 0, 0) 90%, rgb(255, 255, 255) 30%, rgb(4, 2, 8) 50%, #000000 90% ); 
  /*background: url('/static/bar.svg');*/
  background-repeat: no-repeat;
  background-position: right top;
 }
.noLine {
    text-decoration: none;
    }
.noLine:hover {
    text-decoration: none;
    }
</style>