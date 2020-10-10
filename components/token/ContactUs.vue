<template> 
<div class="border-set font-style wrapper">
<h5 class="text-left pad title">Contact Us</h5>
<b-row>
    <b-col>
<div class="container" style="background-color:black;">
    <input type="text" id="fname" name="firstname" placeholder="Email (Optional)" style="background-color:#151516; border: black;">
    <label for="subject">Subject</label>
    <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px background-color:#151516 !important;"></textarea>
    <input type="submit" value="Submit">
</div>
    </b-col>
</b-row>
</div>
</template> 
<script> 

export default { 
  data () { 
    return { 
      all_tokens: {'user_token' : '52342435234523452435234dsfgsdgr45624356gdfsgf'},
      endpoint: this.$store.state.apiEndPoint,
      stars: '',
      show: 'show',
      pay: false,
      daysLeft: [
          {'daysLeft': '4',}
      ], 
      recentPay: [
          {'date': '12-31-99'},
          {'date': '12-31-99'},
          {'date': '12-31-99'},          
          {'date': '12-31-99'},
          {'date': '12-31-99'},
      ],
    } 
  } ,
  methods: {
       get_token: function (){
        var token = sessionStorage.getItem('token')
         var header =  {          
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Basic '+btoa(token+':unused')}
          //let that = this
         fetch(this.endpoint + "token", {
          method:"POST",
          mode: 'cors',
          headers: header,
          body: JSON.stringify({exchange: this.selected[0].toLowerCase(), key: this.keys, secret: this.secret})
          }).then(function(response){
          }).then(function(response){
        })
    },
    numberStars: function (){
    var tokenTemp = this.all_tokens.user_token
    if (!tokenTemp) {
      return
    }
    var starlength = tokenTemp.length;
    for (var i=0; i < starlength; i++) {
    this.stars += ('*');
    }
    this.hidden = this.stars;
    }
  },
    props: ['tokens'],
  mounted () {
      this.numberStars();
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
.border-set{ 
border-radius: 5px; 
  border: 5px solid rgb(37, 36, 36); 
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
.wrapper {
    margin-left:auto;
    margin-right:auto;
    width:100%; 
    height: 385px;
    overflow: hidden;
    overflow-y: scroll;
}
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}

input[type=text], select, textarea {
    width: 100%;
    padding: 12px;
    background: #000000;
    border: 2px solid #151516;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
    color: white;
}

input[type=submit] {
    background-color:#345278;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

input[type=submit]:hover {
    background-color: #345278;
}

.container {
    border-radius: 5px;
    background-color: #000000;
    padding: 20px;
}
</style> 