<template>
    <div>
            <apexchart v-if="loading" height=90 type=bar :options="chartOptions" :series="series" />

    </div>
</template>

<script>
    export default {
        name: 'allocationBar',

        data() {
            return {
                loading: false,
                barData : this.alloBar,
                series:
                [
                   {data: []},
                   {data: []}
                ],
                chartOptions: {
                    fill: {
                        colors: ['#001718', '#222224'],
                        opacity: 1,
                        type: 'solid',
                        gradient: {
                            shade: 'dark',
                            type: "horizontal",
                            shadeIntensity: 1,
                            gradientToColors: ['#001718'],
                            inverseColors: false,
                            opacityFrom: 1,
                            opacityTo: 1,
                            stops: [60, 95]
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
        this.chartOptions.fill.colors = [this.colorToHex(this.barData.colorBlock), '#1c1b23'];
        this.chartOptions.fill.gradient.gradientToColors = [this.barData.toGradient, '#1c1b23'];
        this.series[0].data = [this.barData.allocation];
        this.series[1].data = [this.barData.remainder];
        this.loading = true;
        },
        components: {
        },
        methods: {
                colorToHex(color) {
                    if (color.substr(0, 1) === '#') {
                    return color;
                    }
                    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
                    var red = parseInt(digits[2]);
                    var green = parseInt(digits[3]);
                    var blue = parseInt(digits[4]);
                    var rgb = blue | (green << 8) | (red << 16);
                    return digits[1] + '#' + rgb.toString(16).padStart(6, '0');
                    }

        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>