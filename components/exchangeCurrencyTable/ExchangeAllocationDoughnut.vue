<script>
import { Doughnut } from 'vue-chartjs'


export default {
  extends: Doughnut,
  props: ['percent', 'row_index', 'desc', 'asc'],
    data () {
    return {
        idx:this.row_index,
        data: {
          datasets: [
            {
              backgroundColor: ['rgba(0, 255, 0, 1)', 'rgba(128, 128, 128, 0.4)'],
              borderWidth: 0,
              data: [this.percent.percent, this.percent.otherPercent]
            }
          ]
        },
        options: {
            cutoutPercentage: 80,
            responsive: false,
            tooltips: {
              enabled: false
            },
            animation: {
              duration: 0
            },
        }
      }
          },
  mounted () {
    this.renderChart(this.data, this.options)
  },
   created(){
     this.$nuxt.$on('sortedAllocation2', (data)=>{
       if (data == true){
         this.data.datasets[0].data = this.calculateValues(this.desc)
         this.renderChart(this.data, this.options)
       } 
       if (data == false) {
         this.data.datasets[0].data = this.calculateValues(this.asc)
         this.renderChart(this.data, this.options)
       }

     });
  },
  methods:{
    calculateValues(n){
        return [n, 100-n]
    }
  }
}
</script>