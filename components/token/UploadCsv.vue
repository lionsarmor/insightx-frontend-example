<template>
<div class="border-set" style="padding:33px;">
  <label class="float-left" style="margin-top:5px;"><h6 class="title"><fa icon="upload"/> UPLOAD CSV</h6></label><br>
  <div class="text-left">
  <b-form-select class="black-form" size="sm" v-model="exchange" :options="allExchanges" />
</div>
   <b-form-file  v-model="file" :state="Boolean(file)"  accept="csv/*" class="mt-3 card" style="background:black" plain></b-form-file><br />
<b-button v-show="upload" @click="sendCSV" class="up btn-primary" size="sm">Upload</b-button>
     <button v-show="loadingFade"  class="elementToFadeInAndOut loading" >Loading...</button>
      </div>
</template>
<script>

import FileUpload from 'v-file-upload'

export default {
  
  data () {
    return {
      allExchanges: [
        {
          text:'Choose Exchange',
          value: null
        },
        {
          text: 'Binance',
          value: 'binance'
        },
        {
          text: 'Bittrex',
          value: 'bittrex'
        },
        {
          text: 'Coinbase Pro',
          value: 'coinbase'
        }
      ],
      test: 'test',
      url: '/importcsv',
      headers: {'access-token': '<your-token>'},
      filesUploaded: [],
      file: null,
      loadingFade:false,
      upload: true,
      endpoint: this.$store.state.apiEndPoint,
      exchange: null,
    }
  },
  components:{
    FileUpload
  },
  methods: {
    thumbUrl (file) {
      return file.myThumbUrlProperty
    },
    onFileChange (file) {
      // Handle files like:
      this.fileUploaded = file
    },

    sendCSV: function (){
      let that = this;
    if (this.exchange.length <=0){
      myResponse.result
      that.$toast.error("You must select an exchange.", {icon: 'warning'} )
    }
      var token = sessionStorage.getItem('token')
      var header =  {'Authorization': 'Basic '+btoa(token+':unused')}
      if (this.file === null) {
        that.$toast.error("Please select a CSV", {icon: 'warning'} )
      }
      if (this.file != null) {
        this.upload = false
        this.loadingFade = true
        let formData = new FormData();
        formData.append('file', this.file);
        var tempSplit = this.file.name.split(".");
        this.extention = tempSplit[1];
        let that = this
        fetch(this.endpoint + "importcsv?exchange="+ this.exchange + "&extension=" + this.extention, {
          method:"POST",
          headers: header,
          body: formData
          }).then(function(response){
            that.file = null
            that.upload = true
            that.loadingFade = false
            return response.json();
          }).then(function(response){
            that.$toast.success(response.result, {icon: 'check'} )
             return response;
          })
          .catch(function(response){
            that.upload = true
            that.loadingFade = false
            that.$toast.error(response, {icon: 'warning'} )
            return response;
          })
      }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.elementToFadeInAndOut {
    width:100%;
    height: 40px;
    background: green;
    -webkit-animation: fadeinout 5s linear forwards;
    animation: fadeinout 5s linear forwards;
    animation-iteration-count:infinite;
}

@-webkit-keyframes fadeinout {
  0%,100% { opacity: 0; }
  50% { opacity: 1; }
}

@keyframes fadeinout {
  0%,100% { opacity: 0; }
  50% { opacity: 1; }
}
.text{
  color:rgb(255, 255, 255);
  font-size: 10px;
  padding-right:5%;
  padding-left:5%;
}
.bg-dark{
  background: transparent !important;
}
.prime{
  background-color: #2092ec;
    border: none !important;

}
.prime:hover{
  background-color:  #134f7c;
}

.prime2{
  color: rgb(42, 42, 63);
}
.card{
  background:#151516;
}
label{
  color:white;
}
.blue{
  color:rgb(117, 117, 226);
}
.loading{
background: rgb(27, 216, 27);
color:aliceblue;
font-size:15px;
border:none;
border-radius: 4px;
height: 30px;
width:100%;
}
.up{
background: rgb(224, 154, 23);
color:aliceblue;
font-size:15px;
border:none;
border-radius: 4px;
height: 30px;
width:100%;
}
.card-block{
  background-color:#222128;
  border-radius: 5px;
  border: 0px solid;
  padding: 10px;
  box-shadow: -15px 15px #19171f;
}

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
} 
.pad{ 
padding-left: 30px; 
padding-top:10px; 
} 
.primary{ 
    background-color: #ac1414 !important; 
    border-radius: 5px; 
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
        font-size: 11px;
        float: left;
}
.token-text2{
        font-size: 11px;
        letter-spacing: 2px;
        float: left;
}
.white{ 
    color:white; 
} 
.white-hr{ 
    background: rgb(117, 112, 112); 
    width: 80%;  
} 
.button{
    background: #fe5623;
    border: #fe5623;
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
.btn-primary{ 
    background: #345278 !important; 
    border: none;
    padding: 3px;
}
.black-form {
        background: #1a1a1a;
        color: white;
    }

</style>
