<script>
/* eslint-disable */
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
    data () {
    return {
      longNames: null,
      names: null,
      colors: null,
      donutData2: null,
        data: {
       datasets: [{
    }]}, 
    options:{
       legend: {display:false},
           tooltips: {
         enabled: false
    },

        onClick: this.graphClickEvent
    }
      }
          },
  created(){
    this.$nuxt.$on('updateFromTwentyFour', (data) => {
        this.changeChart({'name':data.name, 'color':data.color})
    } )
  },
  props: ['pieChartData'],
  mounted () {
          var colors = []
          var data = []
          var names = []
          var longName =[]
          //this.donutData2 = {'colors':['red', 'green', 'blue'], 'data': [10, 20, 30] 
          for(var items in this.pieChartData){
           names.push(this.pieChartData[items].symbol)
           colors.push(this.pieChartData[items].Color)
           data.push(this.pieChartData[items].AllocationPercentage)
           longName.push(this.pieChartData[items].Coin)
          }
          this.names = names
          this.colors = colors
          this.longNames = longName
          this.data.datasets = [{backgroundColor: colors , data:data ,borderColor:'black'}]
          this.renderChart(this.data, this.options)
  },
  methods:{
    graphClickEvent(event, array){
      if(this.$store.state.allowClick == false){
                    return
                }
      if (array[0]._index != 10){
      let idx = array[0]._index
      let sendData = {'color': this.colors[idx],'block_color': this.colors[idx], 'name': this.names[idx], 'Coin':this.longNames[idx], 'symbol': this.names[idx]};
      this.$nuxt.$emit('updateFromAsset', sendData);
      this.$nuxt.$emit('getNewTimeFrame', "ONEDAY", sendData)
      this.changeChart(sendData)
      }
    },
    changeChart(data){
        this.$nuxt.$emit("donutDataUpdate", data);
    },
  }
}
</script>
