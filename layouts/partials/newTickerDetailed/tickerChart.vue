<template> 
<div>
<b-row>
    <b-col>
<div>
<trend
  style="margin-top:-20px;position:relative;right:150px;"
  :width="210"
  :height="35"
  stroke-width="2"
  :data="this.history"
  :gradient="[this.color]"
  auto-draw
  >
</trend>
</div>
    </b-col>
</b-row>
</div> 
</template> 
<script> 

/* eslint-disable */
export default { 
  data () { 
    return { 
     
    } 
  } ,
  methods: {

  },
  props:['color', 'history'],
  mounted () {
      
  }
} 
</script> 
<!-- Add "scoped" attribute to limit CSS to this component only --> 
<style scoped>

</style> 