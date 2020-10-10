<template>
<div class="wrapper" style="display:inline-block;">
  <div>
  <span style="color:red">
{{failedMessage}}</span>
<div class="dropdownTicker">
  <button class="dropbtnTicker">{{perPageTicker}}  &#9660;</button>
  <div class="dropdown-contentTicker">
    <a @click="filterUpdate('perPage', 100)" >100</a>
    <a @click="filterUpdate('perPage', 50)" >50</a>
    <a @click="filterUpdate('perPage', 25)" >25</a>
    <a @click="filterUpdate('perPage', 10)" >10</a>
  </div>
</div>

<div class="dropdownTicker">
  <button class="dropbtnTicker">{{interval}} &#9660;</button>
  <div class="dropdown-contentTicker">
    <a @click="filterUpdate('interval', '7 Days')">7 Days</a>
    <a @click="filterUpdate('interval', '24Hr')">24Hr</a>
    <a @click="filterUpdate('interval', '1Hr')">1Hr</a>
  </div>
</div>

<div style="display:inline-block">
  <form>
    <input v-model="query" type="search" style="text-indent: 4px;" class="size" placeholder="Search..." />
    <button style="position:relative;top:-4px;" class="searchBtn" @click="searchByCoin()" type="button"><fa icon="search"/></button> 
    <button  style="position:relative;top:-4px;" class="searchBtn" @click="startLoop()" type="button"><fa icon="redo" /></button>           
  </form> 
</div>    
  </div> 
</div> 
</template>

<script>

export default {
  name: 'FilterBar',
  data () {
    return {
      interval: "24Hr",
      perPageTicker: "25",
      exchangeTicker: "Global",
      query: '',
      endpoint: this.$store.state.apiEndPoint,
      failedMessage: ""
    }
  },
  methods: {
      startLoop(){
        this.$nuxt.$emit('startLoop', true)
      },
      searchByCoin: function(){
            let url = this.endpoint +'api/searchTicker?interval=' + this.interval + '&coin='+ this.query.toUpperCase()
            var that = this
            fetch(url)
            .then(res => res.json())
            .then((out) => {
              if (out.result == "failed"){
                that.failedMessage = out.message
              }
                  if (out.result == 'success') {
                    that.failedMessage = ""
                    that.$nuxt.$emit('searchedCoin', this.query.toUpperCase(),out.data)
          } 
        })
        .catch(err => {
          throw err
        })
      },
      filterUpdate: function(menu, action){
        switch(menu){
          case 'perPage':
            this.perPageTicker = action
            break;
          case 'interval':
           this.interval = action
           break;
          case 'exchange':
          this.exchangeTicker=action
          break;
        }
        let url = this.endpoint +'api/tickerfilterbar?menu=' + menu + '&perPage='+ this.perPageTicker + '&exchange=' + this.exchangeTicker + '&interval=' + this.interval
        let that = this
        fetch(url)
        .then(res => res.json())
        .then((out) => {
          if (out.result == 'success') {
            that.$nuxt.$emit('tickerData', out.data)
          } else {
             that.$toast.error("Failed to get JSON RESPONSE", {icon: 'warning'} )
          }
        })
        .catch(err => {
          throw err
        })
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>/* Style The Dropdown Button */
.wrapper {
    margin-left:auto;
    margin-right:auto;
    width:100%;
}
.searchBtn{
  width: 30px;
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

.search{
  width: 90px;
  border: 2px solid rgb(255, 255, 255);
  background: transparent;
  border-radius: 25px;
  height: 27px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-weight: bold;
  outline-style: none;
  font-size: 12px;
}

.size{
  width: 100px;
position:relative;
left:-1%;
border-radius: 15px;
background: black;
}
.dropdown-contentTicker {
  display: none;
  position: fixed;
  font-weight: 200;
  min-width: 50px;
  height: 50;
  z-index: 100;
  margin-top: -100px !important;
}
</style>
