<template>
    <div>
        <div id="tvchart" :style="tvstyle"></div>
    </div>
</template>

<script>
    export default {
        components: {},
        name: 'TradingVieChart',
        data() {
            return {
                loading: true,
                grabClass: '',
                defaultSymbol: 'BTCUSD',
                defaultTheme: 'dark',
                defaultStyle: '1',
                tvstyle: {
                    zIndex: '1',
                    position: 'relative',
                    top: '20px',
                    height: '480px'
                },
                endpoint: this.$store.state.apiEndPoint,
                menu: true,
            }
        },
        created() {
            this.get_presets();
        },
        mounted() {
            this.$nuxt.$on("enlargeTvChart", (size) => {
                if (size == 'lg') {
                    this.tvstyle.height = '450px';
                    this.menu = true;
                    this.$nuxt.$emit('tradeMenu', false);
                } else if (size == 'xl') {
                    this.tvstyle.height = '690px';
                    this.menu = true;
                    this.$nuxt.$emit('tradeMenu', false);
                } else if (size == 'xxl') {
                    this.tvstyle.height = '695px';
                    this.menu = true;
                    this.$nuxt.$emit('tradeMenu', false);
                } else if (size == 'none') {
                    this.tvstyle.height = '0px';
                    this.menu = false;
                    this.$nuxt.$emit('tradeMenu', true);
                }
            })
        },
        methods: {
            mountChart() {
                new TradingView.widget({
                    "symbol": this.defaultSymbol,
                    "interval": "D",
                    "timezone": 'Etc/UTC',
                    "theme": this.defaultTheme,
                    "style": this.defaultStyle,
                    "locale": "en",
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": true,
                    "allow_symbol_change": true,
                    "autosize": true,
                    "autoscale": true,
                    "allow_symbol_change": true,
                    "container_id": 'tvchart',
                    "hide_side_toolbar": false,
                    "hideideas": false,
                    "lock": true
                })
            },
            tvChartLarge(val) {
                this.$nuxt.$emit('enlargeTvChart', val);
            },
            lightor() {
                if (this.defaultTheme == 'light') {
                    this.defaultTheme = 'dark'
                } else {
                    this.defaultTheme = 'light'
                }
            },
            save() {
                var dfin = document.getElementsByClassName("input-3lfOzLDc-")
                //this.defaultSymbol = dfin.value
                var token = sessionStorage.getItem('token')
                var that = this;
                var header = {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(token + ':unused')
                }
                fetch(this.endpoint + "api/saveAnalysisPresets", {
                    method: "POST",
                    mode: 'cors',
                    headers: header,
                    body: JSON.stringify({
                        'market': 'BTCUSD',
                        'theme': this.defaultTheme,
                        'style': this.defaultStyle
                    })
                }).then(function(response) {
                    return response.json();
                }).then(function(response) {
                    that.mountChart();
                    return response;
                })
            },
            get_presets() {
                var token = sessionStorage.getItem('token')
                let that = this;
                var header = {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(token + ':unused')
                }
                fetch(this.endpoint + "api/analysisPresets", {
                    method: "GET",
                    mode: 'cors',
                    headers: header,
                }).then(function(response) {
                    return response.json();
                }).then(function(response) {
                    that.defaultSymbol = response.tvoptions.market;
                    that.defaultTheme = response.tvoptions.theme;
                    that.defaultStyle = response.tvoptions.style;
                    that.mountChart();
                    return response;
                })
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .iframe-container {
        overflow: hidden;
        overflow-y: hidden;
        position: relative;
        width: 100%;
        height: 440px;
        border: none;
        z-index: 99;
    }

    .size-button {
        background-color: #1941af00;
        border: 1px solid #2e2b3000;
        color: rgb(110, 110, 110);
        padding-top: 7px;
        padding-bottom: 7px;
        margin-top: -2px;
        border-top: none;
        border-bottom: none;
        border-left: none;
    }

    .fonts {
        font-family: 'Montserrat', sans-serif;
    }

    button {
        background: #ffffff;
        color: rgb(0, 0, 0);
        border: none;
    }

    .white {
        color: white;
        font-size: 11px;
        border: 1px solid#363c4e;
        padding: 11px;
        margin-right: 1px;
        position: relative;
        top: -2px;
    }

    .pad {
        margin-top: 8px;
    }

    .bar {
        background-color: #131722;
        width: 100%;
        z-index: 10;
        height: 40px;
        margin-left: 0px;
    }

    .screen {
        height: 100%
    }

    .input {
        margin-top: 1px;
        color: white;
        background-color: #131722;
        border: 1px solid#363c4e;
        height: 38px;
    }

    input[type="text"],
    textarea {
        background-color: #131722;
    }

    .save {
        color: white;
        background: #131722;
        cursor: pointer;
        border: 1px solid#363c4e;
        margin-right: 1px;
        font-size: 11px;
        height: 38px;
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .wrapper-def {
        margin-left: auto;
        margin-right: auto;
        width: 600px;
        height: 900px;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 130px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 12px 16px;
        z-index: 1;
        font-size: 11px;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }
</style>