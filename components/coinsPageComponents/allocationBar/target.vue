<template>
    <div>
            <apexchart v-if="loading" height=75 type=bar :options="chartOptions" :series="series" />
    </div>
</template>

<script>

    export default {
        name: 'target',
        data() {
            return {
                loading: false,
                barData : this.alloBar,
                allocationPercent: Number(this.alloBar.allocation),
                remainderPercent: Number(this.alloBar.remainder),
                series:
                [
                   {data: []},
                   {data: []}
                ],
                chartOptions: {
                    fill: {
                        colors: [],
                        opacity: 1,
                        type: 'solid',
                        gradient: {
                            shade: 'light',
                            type: "horizontal",
                            shadeIntensity: 1,
                            gradientToColors: [],
                            inverseColors: false,
                            opacityFrom: 1,
                            opacityTo: 0.5,
                            stops: [1, 95]
                        },
                    },
                    grid: {
                        show: false,
                    },
                    chart: {
                        stacked: true,
                        stackType: '100%',
                        toolbar: {
                            show: false
                        }
                    },
                    legend: {
                        show: false,
                    },
                    tooltip: {
                        enabled: false,
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true,
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    xaxis: {
                        axisBorder: {
                            show: false,
                        },
                        axisTicks: {
                            show: false,
                        },
                        labels: {
                            show: false,
                        },
                    },
                    yaxis: {
                        axisBorder: {
                            show: false,
                        },
                        axisTicks: {
                            show: false,
                        },
                        labels: {
                            show: false,
                        },
                    }
                },
            }
        },
        props: ['alloBar'],
        mounted() {
        this.$nuxt.$on("updateTarget", targets  => {
            if (this.alloBar.symbol in targets){
                this.series[0].data = [Number(targets[this.alloBar.symbol])]
                this.series[1].data = [Number(100-targets[this.alloBar.symbol])]
                this.series = this.series
            }
        })
        this.chartOptions.fill.colors = ['#e1da25', '#000000'];
        this.series[0].data = [Number(this.barData.target)];
        this.series[1].data = [Number(this.barData.targetRemainder)];
        this.loading = true;
        },
        methods: {

        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>