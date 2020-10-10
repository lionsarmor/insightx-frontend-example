<template>
  <div>
<b-container>
    <b-row>
        <b-col cols="12"><br><br><br><br>
          <div>
            <h4 class="loading">LOADING...<img src="/other-load.1.gif" width="5%" /></h4>
          </div>
            </b-col>
    </b-row>
</b-container>

  </div>
</template>

<script>
export default {
  name: 'PageLoader',
  data () {
    return {
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto');
/*font-family: 'Montserrat', sans-serif;
font-family: 'Roboto', sans-serif;*/

.loading{
font-family: 'Roboto', sans-serif;
color: rgb(255, 255, 255);
}
</style>
