<template>
<div id="tickerSpaceChart">
    <div class="wrapper">
        <div style="position: relative; top: 30px;">
            <strong v-if="balanceTag == 'USD'" style="display:inline-block; float: left; margin-left: 18px; margin-top: 5.9px; position:relative; top:-7px;">{{balanceTag}} Value <div :style="scaleLeft" class="circle"></div></strong>
            <strong v-if="balanceTag != 'USD'" style="display:inline-block; float: right; margin-left: 9px; margin-top: 5.9px; position:relative; top:-7px;">{{balanceTag}} Balance <div :style="scaleLeft" class="circle"></div></strong>
            <strong v-if="balanceTag == 'USD'" style="display:inline-block; float: right;  margin-right: 5px; ">BTC Value<div :style="scaleRight" class="circle"></div></strong>
            <strong v-if="balanceTag != 'USD'" style="display:inline-block; float: left;  margin-left: 25px;">BTC Value<div :style="scaleRight" class="circle"></div></strong>
        </div>
        <div :style="loadingMargin" v-if="$store.state.portfolio.isLoading || options.yaxis==null">
            <span style="position: relative;top:100px;font-size:20px;">Loading..<img class="loading2" src="/other-load.gif" width="5%" /></span>
        </div>
        <div v-if="isData == true">
            <span style="position: absolute;top:100px;font-size:20px;left:10%;">Data Syncing. Take a moment and grab a coffee while we do the hard work! Data will be available momentarily.</span>
        </div>
        <div style="margin-bottom: 40px;left:-5%;">
            <apexchart v-if="!$store.state.portfolio.isLoading && options.yaxis" type="area" :height="tickerSpace" width="112%" :options="options" :series="createMutable($store.state.portfolio.series)"></apexchart>
        </div>

        <div style="position: relative; top: -45px; z-index:100">
            <div class="circle" :style="legendObjectLeft">
                <strong class="text-right table-labels" style="position: relative; left:-145px; top:-25px;" id="left"></strong>
            </div>
            <div :style="legendObjectRight" class="circle">
                <strong class="text-left table-labels" style="position: relative; right:-90px; top:-27px;" id="right"></strong></div>
        </div>
        <div>
            <div class="title" style="position:relative; margin-top: -100px; top:25px; left:-72px;">
                <img :src="legendSymbol('left')" :width="legendSizeLeft" />
            </div>
            <div style="position:relative; right:-92px; top: 0px;">
                <img :src="legendSymbol('right')" :width="legendSizeRight">
            </div>
        </div>
    </div>
</div>
</template>

<script>
    /* eslint-disable */
    export default {
        id: 'new',
        components: {},
        props: ['Data'],
        mounted() {
            this.legendToggle()
            this.$nuxt.$on("getNewTimeFrame", (time, name) => {
                this.isData = null,
                    this.$store.commit('portfolio/loader', true);
                this.$store.commit('allowClickEvent', false);
                let that = this;
                var coin = name.symbol;
                let assetColor = '#ded727'
                if (name == "total" || name.symbol == "total") {
                    that.balanceTag = "USD"
                    coin = 'total'
                } else {
                    that.balanceTag = name.symbol
                    that.newColors(name.block_color);
                }
                /**************************** */
                that.options = {}
                let timeframe = time; //*
                let endPoint = "balancechart" + "?coin=" + coin.toLowerCase() + "&timeframe=" + timeframe.toLowerCase();
                this.$insightfetch(endPoint).then(function(response) {
                    let newTimeFrame = response.chartData;
                    let first = null;
                    let last = null;
                    if (name == 'total') {
                        first = newTimeFrame[1].data[0].y
                        last = newTimeFrame[1].data[newTimeFrame[1].data.length - 1].y
                    } else {
                        first = newTimeFrame[0].data[0].y
                        last = newTimeFrame[0].data[newTimeFrame[1].data.length - 1].y
                    }
                    if (!Array.isArray(newTimeFrame[0].data) || !newTimeFrame[0].data.length || newTimeFrame[0].data.length < 2) {
                        that.$toast.error("Sync in progress. No data on this interval.", {
                            icon: 'warning'
                        });
                    }
                    if (newTimeFrame[0].data.length < 2) {
                        that.isData = true;
                        that.newTimeFrame = false;
                    } else {
                        that.isData = false;
                        that.newTimeFrame = true;
                    }
                    for (var elem in newTimeFrame) {
                        for (var item in newTimeFrame[elem].data) {
                            newTimeFrame[elem].data[item].y = Number(newTimeFrame[elem].data[item].y);
                        }
                    }
                    that.series = [];
                    if (that.isData == true) {
                        var yMin = 0;
                        var yMax = 0;
                        var yMin2 = 0;
                        var yMax2 = 0;
                    } else {
                        var yMin = 999999999999999;
                        var yMax = -1;
                        var yMin2 = 999999999999999;
                        var yMax2 = -1;
                    }
                    for (var items in newTimeFrame) {
                        for (var next in newTimeFrame[items].data) {
                            if (yMin > newTimeFrame[0].data[next].y) {
                                yMin = newTimeFrame[0].data[next].y;
                            }
                            if (yMax < newTimeFrame[0].data[next].y) {
                                yMax = newTimeFrame[0].data[next].y;
                            }
                            if (yMin2 > newTimeFrame[1].data[next].y) {
                                yMin2 = newTimeFrame[1].data[next].y;
                            }
                            if (yMax2 < newTimeFrame[1].data[next].y) {
                                yMax2 = newTimeFrame[1].data[next].y;
                            }
                        }
                    }
                    var percentageBuffer = 1;
                    var percentageBuffer2 = 10;
                    that.startOptions.yaxis[0].min = (yMin - ((percentageBuffer / 100) * yMin));
                    that.startOptions.yaxis[0].max = (yMax + ((percentageBuffer / 100) * yMax));
                    that.startOptions.yaxis[1].min = (yMin2 - ((percentageBuffer2 / 100) * yMin2));
                    that.startOptions.yaxis[1].max = (yMax2 + ((percentageBuffer2 / 100) * yMax2));
                    that.options = that.startOptions;
                    that.$nuxt.$emit('intervalChange', time);
                    that.$nuxt.$emit('newPercentageChange', response.totalDifference, response.totalPercentChange);
                    if (newTimeFrame != false) {
                        that.initGraph(newTimeFrame, name);
                    }
                    that.$store.commit('allowClickEvent', true);
                })
            })
            this.home();
        },
        beforeMount() {},
        watch: {},
        methods: {
            legendToggle() {
                if (window.innerWidth < 800) {
                    this.startOptions.legend.show = false;
                } else {
                    this.startOptions.legend.show = true;
                }
            },
            newColors(fillColor) {
                let assetColor = this.colorToHex(fillColor);
                let strokeColor = fillColor;
                this.startOptions.colors = ['#d3cd1f', assetColor];
                this.startOptions.fill.colors = ['#d3cd1f', assetColor];
                this.startOptions.fill.gradient.gradientToColors = ['#d3cd1f', assetColor];
                this.startOptions.fill.gradient.opacityFrom = 0.5;
                this.startOptions.fill.gradient.opacityTo = 0;
                this.startOptions.fill.gradient.stops = [0, 90];
                this.startOptions.stroke.colors = ['#d3cd1f', fillColor];
                this.startOptions.markers.colors = ['#d3cd1f', fillColor];
                this.scaleLeft.backgroundColor = fillColor;
                this.scaleRight.backgroundColor = '#d3cd1f';
            },
            colorBrighten(hex, lum) {
                // validate hex string
                hex = String(hex).replace(/[^0-9a-f]/gi, '');
                if (hex.length < 6) {
                    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                }
                lum = lum || 0;
                // convert to decimal and change luminosity
                var rgb = "#",
                    c, i;
                for (i = 0; i < 3; i++) {
                    c = parseInt(hex.substr(i * 2, 2), 16);
                    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                    rgb += ("00" + c).substr(c.length);
                }
                return rgb;
            },
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
            },
            iterationCopy(src) {
                let target = {};
                for (let prop in src) {
                    if (src.hasOwnProperty(prop)) {
                        target[prop] = src[prop];
                    }
                }
                return target;
            },
            createMutable(data) {
                let mutableData = JSON.parse(JSON.stringify(data))
                return mutableData
            },
            legendSymbol(val) {
                var that = this;
                if (val == 'right') {
                    if (that.balanceTag == 'USD') {
                        that.legendSizeRight = '12px';
                        return that.$emblem('btc')
                    } else {
                        that.legendSizeRight = '17px';
                        return that.$emblem(that.balanceTag.toLowerCase());
                    }
                } else if (val == 'left') {
                    if (that.balanceTag == 'USD') {
                        that.legendSizeLeft = '10px';
                        return '/other/money.png'
                    } else {
                        that.legendSizeLeft = '12px';
                        return that.$emblem('btc');
                    }
                }
            },
            home() {
                this.$nuxt.$emit("getNewTimeFrame", 'oneday', 'total')
            },
            swapColor(a, b, color) {
                this.ledgend1 = this.legend2;
                this.ledgend2 = this.legend1;
                var stroke = ['#4674e2', color];
                var colors = ['#101a38', color];
                this.startOptions.fill.gradient.gradientToColors[0] = colors[a];
                this.startOptions.fill.gradient.gradientToColors[1] = colors[b]
                this.startOptions.fill.colors[0] = colors[a];
                this.startOptions.fill.colors[1] = colors[b]
                this.startOptions.stroke.colors[0] = stroke[a];
                this.startOptions.stroke.colors[1] = stroke[b]
                this.startOptions.markers.colors[0] = stroke[a];
                this.startOptions.markers.colors[1] = stroke[b];
            },
            initGraph(data, name) {
                this.series.splice(0, this.series.length)
                for (var item in data) {
                    this.series.push({
                        'color': data[item].color,
                        'data': data[item].data,
                        'name': data[item].name
                    });
                }
                let seriesCopy = this.createMutable(this.series)
                this.$store.commit('portfolio/updateSeries', seriesCopy)
                this.$store.commit('portfolio/loader', false);
            },
        },
        data: function() {
            return {
                loadingMargin: {marginBottom : '61.8vh'},
                tickerSpace: 540,
                isData: false,
                legendSizeLeft: '9',
                legendSizeRight: '12',
                legendObjectLeft: {
                    position: 'absolute',
                    top: '-6px',
                    marginLeft: '-39px',
                    backgroundColor: 'black'
                },
                legendObjectRight: {
                    position: 'absolute',
                    top: '-6px',
                    marginLeft: '14px',
                    backgroundColor: "black"
                },
                scaleLeft: {
                    backgroundColor: "#4674e2",
                    position: 'absolute',
                    top: '20px',
                    marginLeft: '-42px',
                    width: '85px !important'
                },
                scaleRight: {
                    backgroundColor: "#e2db20",
                    position: 'absolute',
                    top: '20px',
                    marginLeft: '-82px',
                    width: '85px !important'
                },
                leftSymbol: 'DOLL',
                rightSymbol: 'BTC',
                balanceTag: 'USD',
                scaleVal: 'USD',
                scaleBal: 'BTC',
                newTimeFrame: [],
                mainCoin: 'BTC',
                altCoin: 'USD',
                series: [],
                loading: true,
                options: {},
                startOptions: {
                    colors: ['#4674e2', '#e2db20'],
                    stroke: {
                        show: true,
                        curve: 'straight',
                        lineCap: 'butt',
                        colors: ['#4674e2', '#e2db20'],
                        width: 3.5,
                        dashArray: 0,
                    },

                    markers: {
                        size: 0,
                        colors: ['#4674e2', '#e2db20'],
                        strokeColor: '#fff',
                        strokeWidth: 2,
                        strokeOpacity: 0.9,
                        fillOpacity: 1,
                        shape: "circle",
                        radius: 2,
                        offsetX: 0,
                        offsetY: 0,
                        hover: {
                            size: 6
                        },
                    },

                    fill: {
                        colors: ['#101a38', '#464a17'],
                        opacity: 1,
                        type: 'gradient',
                        gradient: {
                            shade: 'dark',
                            type: "vertical",
                            shadeIntensity: 1,
                            gradientToColors: ['#101a38', '#464a17'],
                            inverseColors: false,
                            opacityFrom: 1,
                            opacityTo: 0,
                            stops: [0, 95]
                        },
                        pattern: {
                            style: 'slantedLines',
                            width: 6,
                            height: 6,
                            strokeWidth: 2,
                        },
                    },
                    legend: {
                        show: true,
                        showForSingleSeries: false,
                        position: 'bottom',
                        horizontalAlign: 'center',
                        verticalAlign: 'middle',
                        floating: false,
                        fontSize: '14px',
                        fontFamily: '14px',
                        offsetX: 0,
                        offsetY: 0,
                        formatter: undefined,
                        textAnchor: 'start',
                        labels: {
                            colors: ['#fffff'],
                            useSeriesColors: false
                        },
                        markers: {
                            width: 12,
                            height: 12,
                            strokeWidth: 0,
                            strokeColor: '#fff',
                            radius: 12,
                            customHTML: undefined,
                            onClick: undefined,
                            offsetX: 0,
                            offsetY: 0
                        },
                        itemMargin: {
                            horizontal: 20,
                            vertical: 5
                        },
                        containerMargin: {
                            left: 5,
                            top: 0,
                        },
                        onItemClick: {
                            toggleDataSeries: true
                        },
                        onItemHover: {
                            highlightDataSeries: true
                        },
                    },
                    tooltip: {
                        enabled: true,
                        shared: true,
                        followCursor: true,
                        intersect: false,
                        inverseOrder: false,
                        custom: function({
                            series,
                            seriesIndex,
                            dataPointIndex
                        }) {
                            function getCoinValues(number, side) {
                                if (number.includes(".")) {
                                    var parts = number.split(".")
                                    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    var sideSeries = parts.join(".")
                                } else {
                                    var sideSeries = number
                                }
                                if (side == "left") {
                                    var leftTip = document.getElementById("left");

                                    if (leftTip.innerText != 'undefined') {
                                        leftTip.innerText = sideSeries;
                                    } else {
                                        leftTip.innerText = '';
                                    }
                                } else {
                                    var rightTip = document.getElementById("right")
                                    if (rightTip.innerText != 'undefined') {
                                        rightTip.innerText = sideSeries;
                                    } else {
                                        rightTip.innerText = "";
                                    }
                                }
                            }
                            getCoinValues(series[0][dataPointIndex].toString(), "left");
                            getCoinValues(series[1][dataPointIndex].toString(), "right")
                        },
                        fillSeriesColor: true,
                        onDatasetHover: {
                            highlightDataSeries: true,
                        },
                        x: {
                            show: true,
                            format: 'dd MMM',
                            formatter: undefined,
                        },
                        y: {
                            formatter: undefined,
                            title: {
                                //formatter: (seriesName) => seriesName,
                            },
                        },
                        z: {
                            formatter: undefined,
                            title: 'Size: '
                        },
                        marker: {
                            show: false,
                        },
                        items: {
                            // display: flex,
                        },
                        fixed: {
                            enabled: true,
                            position: 'BottomLeft',
                            offsetX: -2000,
                            offsetY: 0,
                        },
                    },
    chart: {
    events: {
    updated: function(chartContext, config) {

    },
    selection: function(chartContext, { xaxis, yaxis }) {
      
    },
      mounted: function(ctx, config) {
        let blue = '#00';
        let symbolSwitch = '';
        let backgroundColor = blue;
        let lowest = ctx.getLowestValueInSeries(0);
        let highest = ctx.getHighestValueInSeries(0);
        let symbol = ctx.series.w.config.series[0].name;
        if (symbol != 'USD') {
            symbolSwitch = 'BTC: '
        }else {
            symbolSwitch = 'USD: '
        }
        ctx.addPointAnnotation({
          x: new Date(ctx.w.globals.seriesX[0][ctx.w.globals.series[0].indexOf(lowest)]).getTime(),
          y: lowest,
          marker: {
          size: 5,
          fillColor: "#d12525ee",
          strokeColor: "#000",
          shape: 'square',
        },
            label: {
              borderColor: '#00',
              borderWidth: 0,
              text: symbolSwitch + lowest,
              textAnchor: 'start',
              position: 'left',
              offsetX: -55,
              offsetY: 0,
              style: {
                  background: backgroundColor,
                  color: '#fff',
                  fontSize: '12px',
                  cssClass: undefined,
                  padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }
              },
          },
        });

        ctx.addPointAnnotation({
          x: new Date(ctx.w.globals.seriesX[0][ctx.w.globals.series[0].indexOf(highest)]).getTime(),
          y: highest,
          marker: {
          size: 5,
          fillColor: "#0a830a",
          strokeColor: "#000",
          shape: 'square',
        },
            label: {
              borderColor: '#fff',
              borderWidth: 0,
              text: symbolSwitch + highest,
              textAnchor: 'start',
              position: 'left',
              offsetX: -55,
              offsetY: 0,
              style: {
                  background: backgroundColor,
                  color: '#fff',
                  fontSize: '12px',
                  cssClass: undefined,
                  padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }
              },
          },
        });

        this.$store.commit('allowClickEvent', true);
      }
                        },
                        id: "idChart",
                        toolbar: {
                            show: true,
                            tools: {
                                download: false,
                                selection: false,
                                zoom: true,
                                zoomin: false,
                                zoomout: false,
                                pan: true,
                                reset: true
                            },
                            autoSelected: 'zoom'
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },

                    grid: {
                        show: true,
                        borderColor: 'rgba(255,255,255,0.1)',
                        strokeDashArray: 0,
                        position: 'back',
                        clipMarkers: false,
                        xaxis: {
                            lines: {
                                show: true,
                                offsetX: 0,
                                offsetY: 0
                            }
                        },
                        yaxis: {
                            lines: {
                                show: false,
                                offsetX: 0,
                                offsetY: 0
                            }
                        },
                        row: {
                            colors: '',
                            opacity: 0.1
                        },
                        column: {
                            colors: '',
                            opacity: 0.1
                        },
                        padding: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 30
                        },
                    },
                    xaxis: {
                        type: 'datetime',
                        axisBorder: {
                            show: false,
                            color: '#78909C',
                            height: 1,
                            width: '100%',
                            offsetX: 0,
                            offsetY: 0
                        },
                        crosshairs: {
                            show: true,
                            width: 1,
                            position: 'back',
                            opacity: 0,
                            stroke: {
                                color: '#b6b6b6',
                                width: 0.5,
                                dashArray: 5,
                            },
                        },
                        tooltip: {
                            enabled: true,
                            formatter: function(val, opts) {
                                var unix = val;
                                var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                var date = new Date(val);
                                var year = date.getFullYear();
                                var month = months_arr[date.getMonth()];
                                var day = date.getDate();
                                var hours = date.getHours();
                                var minutes = "0" + date.getMinutes();
                                var seconds = "0" + date.getSeconds();
                                var convdataTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                                return convdataTime
                            }
                        },
                        axisTicks: {
                            show: false,
                            borderType: 'solid',
                            color: '#78909C',
                            height: 6,
                            offsetX: 0,
                            offsetY: 0
                        },
                        tickAmount: 10,
                        min: undefined,
                        max: undefined,
                        range: undefined,
                        floating: false,
                        position: 'bottom',
                        title: {
                            text: undefined,
                            offsetX: 0,
                            offsetY: 0,
                            style: {
                                color: undefined,
                                fontSize: '12px',
                                cssClass: 'apexcharts-xaxis-title',
                            },
                            dropShadow: {
                                enabled: false,
                                top: 0,
                                left: 0,
                                blur: 1,
                                opacity: 0.4,
                            },
                        },
                    },

                    yaxis: [{
                            tickAmount: 9,
                            decimalsInFloat: 2,
                            min: 0,
                            max: 1,
                            seriesName: '',
                            axisTicks: {
                                show: false,
                            },

                            crosshairs: {
                                show: true,
                                opacity: 1,
                                position: 'front',
                                stroke: {
                                    color: '#b6b6b6',
                                    width: 1,
                                    dashArray: 5,
                                },
                            },

                            tooltip: {
                                enabled: false,
                                offsetX: -85,
                            },
                            labels: {
                                offsetX: 30,
                                offsetY: 0,
                                style: {
                                    color: '#ffffff',
                                }
                            },
                        },
                        {
                            tickAmount: 9,
                            decimalsInFloat: 2,
                            min: 0,
                            max: 1,
                            seriesName: '',
                            opposite: true,
                            axisTicks: {
                                show: false,
                            },

                            axisBorder: {
                                show: false,
                                color: '#ffffff',
                                height: 1,
                                width: '100%',
                                offsetX: 0,
                                offsetY: 0
                            },

                            labels: {
                                offsetX: 0,
                                offsetY: 0,
                                style: {
                                    color: '#ffffff',
                                }
                            },
                        }
                    ]
                },
                
            }
        },
    }




</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wrapper {
        margin-left: 11px;
        margin-right: auto;
        width: 92%;
    }

    .circle {
        display: inline-block;
        border-radius: 20%;
        width: 50px;
        height: 2.5px;

        /* width and height can be anything, as long as they're equal */
    }

    .All {
        background: black;
        font-family: 'Roboto', sans-serif;
        text-align: left;
    }

    .Data {
        font-family: 'Roboto', sans-serif;
        font-size: 15px;
        color: #7FD6FE;
        margin-top: 2px;

    }

    .Data2 {
        font-family: 'Roboto', sans-serif;
        font-size: 15px;
        color: rgb(0, 0, 0);
        margin-top: 2px;

    }

    .TopLabel {
        font-family: 'Montserrat', sans-serif;
        font-size: 13px;
        font-weight: bold;
        color: white;
        margin-top: 5px;
        padding-bottom: 15px;
    }

    .LowerLabel {
        font-family: 'Montserrat', sans-serif;
        font-size: 11px;
        font-weight: bold;
        color: white;
        padding-top: 30px;
    }

    .LowerLabel3 {
        font-family: 'Montserrat', sans-serif;
        font-size: 11px;
        font-weight: bold;
        color: white;
        padding-top: 25px;
    }

    .LowerLabel2 {
        font-family: 'Montserrat', sans-serif;
        font-size: 11px;
        font-weight: bold;
        padding-top: 30px;
        color: rgb(0, 0, 0);
    }

    .Green {
        color: green;
    }

    .Red {
        color: red;
    }
</style>

