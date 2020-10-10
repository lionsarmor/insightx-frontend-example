<script>
    import {
        Doughnut
    } from 'vue-chartjs'

    export default {
        extends: Doughnut,
        props: ['series', 'colors'],
        data() {
            return {
                sliceIndex: null,
                data: {
                    datasets: [{
                        backgroundColor: this.colors,
                        borderWidth: 0,
                        data: this.series
                    }]
                },
                options: {
                    cutoutPercentage: 90,
                    responsive: false,
                    tooltips: {
                        enabled: false
                    },
                    animation: {
                        duration: 0
                    },
                    onClick: this.graphClickEvent
                }
            }
        },
        created(){
            this.$nuxt.$on("tableToDonut", (item, index) => {
                this.tableClick(index);
            });
        },
        mounted() {
            this.renderChart(this.data, this.options)
            this.$nuxt.$emit('sliceUpdate', String(0));
            this.renderChart(this.data, this.options)
        },
    watch: {
    sliceIndex: function (val) {
        if (val == 'none'){
            this.$nuxt.$emit('sliceUpdate', String(0));
        }else{
            this.$nuxt.$emit('sliceUpdate', String(val));
        }
            this.renderChart(this.data, this.options)
    }
    },
        methods: {
            tableClick(index){
                this.sliceIndex =  String(index);
            },
            graphClickEvent(event, array) {
                this.$nuxt.$emit('sliceUpdate', String(array[0]._index));
                this.$nuxt.$emit('colorTableUpdate', String(array[0]._index));
                this.renderChart(this.data, this.options)
            }
        },
    }
</script>