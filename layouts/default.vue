<template>
<div class="bg blue" style="font-family: 'Righteous', cursive;">
<b-navbar type="dark" variant="faded" v-if="$store.state.portfolio.isLoading">
<b-navbar-brand class="yellow">
 <nuxt-link to="/"><b-navbar-brand style="margin-left:-34%;margin-top:-1.5%;">
      <img class="noLine brand" style=" 
    position: relative; 
    left:5.4vh;
    top:-0.4vh;
    width:40px;" src="../assets/other/logo.svg" />
      <img  class="noLine newLogo" style="width:200px;" src="../static/other/LOGO.PNG" />
  </b-navbar-brand></nuxt-link>
</b-navbar-brand>
<b-collapse is-nav id="nav_collapse">
<b-navbar-nav  class="pull-right">
</b-navbar-nav>
</b-collapse>
</b-navbar>
    <nuxt/>
  </div>
</template>

<script>

export default {
    data () {
    return {

}
          },
  created(){

  },
  mounted () {
this.$browserDetect();
this.getBrowser();
  },
  methods:{
    getBrowser(){
    if (this.$store.state.currentBrowser != null) {
    document.body.classList.add(this.$store.state.currentBrowser);
    }
    }
  }
}
</script>

<style>
.navbutton{
  color:rgb(165, 182, 212) !important;
font-family: 'Righteous', cursive;
font-size:20px;
position: relative;
top:-5px;
}
.navbutton2{
  color:rgb(0, 0, 0) !important;
font-family: 'Righteous', cursive;
font-size:20px;
position: relative;
top:-5px;
}
.pull-right{
  position: relative;
  margin-left:80%;
}
.yellow{
  color:rgb(255, 174, 0);

}
    .bin {
        top: .5em;
    }

    .card-body {
        background: black !important;
    }

    .bit {
        top: .6em;
    }

    .bitr {
        top: 6px;
    }

    .block {
        background-color: rgb(1, 21, 26);
        opacity: 0.8;
    }

    .p2 {
        font-size: 15px;
        color: white;
    }

    .card-card_title {
        opacity: 0%;
    }

    .card-card_footer {
        opacity: 0%;
    }


    .seethrough {
        opacity: 0%;
    }

    .signin {
        font-family: 'Anton', sans-serif;
        color: orangered;
    }

    .jumbo {
        background-color: transparent;
        top: 60px;

    }

    h1,
    h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }


    #bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -3;
    }

    .modaltitle {
        color: rgb(0, 90, 117);
    }

    .btn-fil-blue {
        color: white !important;
        background-color: #047ea4 !important;
        border-style: solid;
        border-width: 2px;
        border-color: #047ea4;
        border-radius: 25px;
        height: 37px;
        position: relative;
        top: 3px;
        cursor: pointer;
    }

    .btn-fil-blue2 {
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

    input {
        background: #1a1a1a;
        color: white;
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
.bg{
  background-color:#000000;
}
li a {
    text-decoration: none !important;
}
    .noLine {
    text-decoration: none;
    }
    .noLine:hover {
    text-decoration: none;
    }
</style>
