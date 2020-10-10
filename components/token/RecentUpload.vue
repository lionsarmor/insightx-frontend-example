<template> 
<div>
<div class="border-set font-style wrapper"> 
<b-row>
    <b-col>
<h5 class="text-left title" style="white-space: nowrap;padding-left:120px;margin-left:auto;">Recent Uploads</h5> 
    </b-col>
</b-row>
<b-row>
    <b-col>
<div>
<div class="white float-left" style="display:inline-block; margin-top:5px; margin:5px;"><strong>Date</strong></div> 
<div class="white float-right" style="display:inline-block; margin-top:5px; margin:5px;"><strong>Exchange</strong></div> 
<div class="white float-right" style="display:inline-block; margin-top:5px; margin:5px;"><strong>State</strong></div>
<div class="white float-right" style="display:inline-block; margin-top:5px; margin:5px;"><strong>Total</strong></div>  
<div class="white float-right" style="display:inline-block; margin-top:5px; margin:5px;"><strong>Repeats</strong></div>  
</div>
</b-col>
</b-row>

<b-row v-for="item in recent" :key="item.date">
<b-col>
<div >
<div class="white float-left" style="display:inline-block; margin-top:5px; margin-left:15px;">{{item.createdAt}}</div> 
<div class="white float-right" style="display:inline-block; margin-top:5px;  margin-right:15px;">{{item.exchange}}</div> 
<div class="white float-right" style="display:inline-block; margin-top:5px;  margin-right:15px;">{{item.state}}</div>
<div class="white float-right" style="display:inline-block; margin-top:5px;  margin-right:15px;">{{item.total}}</div>
<div class="white float-right" style="display:inline-block; margin-top:5px;  margin-right:15px;">{{item.duplicate}}</div></div>
<br>
<hr class="white-hr">
</b-col>
</b-row>
 
  </div> 
</div>
</template> 
<script> 

export default { 
  data () { 
    return { 
      recent: [
          {'file' : 'Sample.csv', 'date' : '02-05-2018'},
          {'file' : 'Sample.csv', 'date' : '02-05-2018'},
          {'file' : 'Sample.csv', 'date' : '02-05-2018'},
          {'file' : 'Sample.csv', 'date' : '02-05-2018'},
          {'file' : 'Sample.csv', 'date' : '02-05-2018'},
          {'file' : 'Sample.csv', 'date' : '02-05-2018'},
          ],
    } 
  } ,
  mounted(){
  },
  methods: {
  
  },
    props: ['uploadHistory'],
  beforeMount () {
      this.recent = this.uploadHistory
  }
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
} 
.pad{ 
padding-left: 30px; 
padding-top:10px; 
} 
.btn-primary{ 
    background: #345278 !important; 
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
    width: 92%;  
} 
.wrapper {
    margin-left:auto;
    margin-right:auto;
    width:100%;
    height: 250px;
    overflow:hidden;
    overflow-y:auto;
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