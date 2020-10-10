<template> 
<div>
<b-row>
    <b-col>
<div>
<trend
  style="margin-top:-20px;position:relative;right:150px;"
  :width="180"
  :height="50"
  stroke-width="2"
  :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
  :gradient="['#da1e2d']"
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
  mounted () {
      
  }
} 
</script> 
<!-- Add "scoped" attribute to limit CSS to this component only --> 
<style scoped>

</style> 