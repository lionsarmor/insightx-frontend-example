<template>
    <div class="wrapper">
        <b-container>
            <b-container>
                <b-row>
                    <b-col col xs="6" sm="6" md="6" lg="6">
                        <div class="div-block"></div>
                        <strong class="text title" style="position:relative; left:-25%">Top Performers</strong>
                        <b-form class="ul-space">
                            <div class="scrollable">
                                <ul v-for="(item, index) in top_perf" :key="index" style="background: black; margin-bottom: -70px; margin-top: -27px;">
                                    <li>
                                        <p class="usd">{{Number(item.price).toLocaleString('en', {style: 'currency', currency: currentFiat})}}</p>
                                    </li>
                                    <li>
                                        <b-form inline v-on:click="changeParentColor(item.name), barClick(item.name, item.color, 'top'), changeTableRow(item)" class="cursor">
                                            <div v-if="selected == item.name" :style="'background: linear-gradient(to right, rgba('+ item.color +', 0.329) , black)'" class="perf-sel"></div>
                                    <li>
                                        <img v-if="selected == item.name" class="logo"  :src="$emblem(item.name)" onerror="this.src='/cryptocurrency-icons/svg/white/other2.svg'" height="25px;" width="25px;">
                                        <img v-if="selected != item.name" class="logo" :src="$emblem(item.name)" onerror="this.src='/cryptocurrency-icons/svg/white/other2.svg'" height="25px;" width="25px;">
                                    </li>
                                    <li>
                                        <p class="coin">{{item.name}}</p>
                                    </li>
                                    <li :id="item.name" class="bar" :style="{'background':topStyle[index].bg}"></li>
                        </b-form>
                        </li>
                        <li>
                            <p v-if="item.percentChange >= 0" class="change">+{{item.percentChange}}%</p>
                            <p v-if="item.percentChange < 0" class="change2">{{item.percentChange}}%</p>
                        </li>
                        </ul>
    </div>
    </b-form>
    <div style="margin-bottom:25%;"></div>
    </b-col>
    <b-col xs="6" sm="6" md="6" lg="6">
        <span  class="d-block d-md-none">
        </span>
        <strong class="text title" style="position:relative; left:-20%">Bottom Performers</strong>
        <b-form class="ul-space">
            <div class="scrollable">
                <ul v-for="(item, index) in bottom_perf" :key="index" style="background: black; margin-bottom: -70px; margin-top: -27px;">
                    <li>
                        <p class="usd">{{Number(item.price).toLocaleString('en', {style: 'currency', currency: currentFiat})}}</p>
                    </li>
                    <li>
                        <b-form inline v-on:click="changeParentColor(item.name), barClick(item.name, item.color, 'bottom'), changeTableRow(item)" class="cursor">
                            <div v-if="selected == item.name" :style="'background: linear-gradient(to right, rgba('+ item.color +', 0.329) , black)'" class="perf-sel"></div>
                    <li>
                        <img v-if="selected == item.name" class="logo" :src="$emblem(item.name)" onerror="this.src='/cryptocurrency-icons/svg/white/other2.svg'" height="25px;" width="25px;">
                        <img v-if="selected != item.name" class="logo" :src="$emblem(item.name)" onerror="this.src='/cryptocurrency-icons/svg/white/other2.svg'" height="25px;" width="25px;">
                    </li>
                    <li>
                        <p class="coin">{{item.name}}</p>
                    </li>
                    <li :id="item.name" class="bar" :style="{'background':bottomStyle[index].bg}"></li>
        </b-form>
        </li>
        <li>
            <p v-if="item.percentChange >= 0" class="change">+{{item.percentChange}}%</p>
            <p v-if="item.percentChange < 0" class="change2">{{item.percentChange}}%</p>
        </li>
        </ul>
        </div>
            <div style="margin-bottom:25%;"></div>
        </b-form>
    </b-col>
    </b-row>
    </b-container>
    </b-container>
    </div>
</template>

<script>
    export default {
        methods: {
            resetBarColor() {
                let that = this;
                if (that.loading == false) {
                    for (var item in that.top_perf) {
                        that.topStyle.push({
                            'bg': 'linear-gradient(to left, rgba(' + that.top_perf[item].color + ', 0.329) , black)'
                        });
                    }
                    for (var item in that.bottom_perf) {
                        that.bottomStyle.push({
                            'bg': 'linear-gradient(to left, rgba(' + that.bottom_perf[item].color + ', 0.329) , black)'
                        });
                    }
                }
            },
            barClick(name, color, val) {
                if(this.$store.state.allowClick == false){
                    return
                }
                let that = this;
                if (that.loading == false) {
                    if (val == 'other') {
                        for (let elem in that.top_perf) {
                            if ( that.top_perf[elem] != undefined && that.top_perf[elem].name == name) {
                                that.topClick(name, color, val);
                                that.bottomClick('none', 'none', 'none');
                            } else if (that.bottom_perf[elem] != undefined && that.bottom_perf[elem].name == name) {
                                that.bottomClick(name, color, val);
                                that.topClick('none', 'none', 'none');
                            }
                        }
                    }
                }
            },
            topClick(name, color, val) {
                let that = this;
                for (let item in that.top_perf) {
                    this.selected = name;
                    var top = document.getElementById(that.top_perf[item].name);
                    if (that.top_perf[item].name == name) {
                        top.style['background'] = 'rgba(' + that.top_perf[item].color + ')'
                    }else{
                        top.style['background'] = 'linear-gradient(to left, rgba(' + that.top_perf[item].color + ', 0.329) , black)'
                }
                }
            },
            bottomClick(name, color, val) {
                let that = this;
                for (let item in that.bottom_perf) {
                    var bot = document.getElementById(that.bottom_perf[item].name);
                    if (that.bottom_perf[item].name == name) {
                        bot.style['background'] = 'rgba(' + that.bottom_perf[item].color + ')'
                    }else{
                        bot.style['background'] = 'linear-gradient(to left, rgba(' + that.top_perf[item].color + ', 0.329) , black)'
                    }
                }
            },
            changeParentColor(val) {
                if(this.$store.state.allowClick == false){
                    return
                }
                let that = this;
                if (that.loading == false) {
                    this.selected = val.name;
                }
            },
            changeTableRow(data) {
                if(this.$store.state.allowClick == false){
                    return
                }
                let that = this;
                if (that.loading == false) {
                    var sendData = {
                        'block_color': 'rgb('+data.color+')',
                        'Coin': data.coin,
                        'symbol': data.name
                    };
                    that.$nuxt.$emit('updateFromPerformers', data);
                    that.$nuxt.$emit('donutDataUpdate', data);
                    that.$nuxt.$emit('getNewTimeFrame', "ONEDAY", sendData);
                }
            }
        },
        created() {

        },
        mounted() {
            let ws = window.innerWidth;
            let that = this;
            if (ws < 1800 && ws > 1200) {
                that.performerBreak = 12
            }else {
                 that.performerBreak = 6
            }
            window.addEventListener("resize", function () {
            let ws = window.innerWidth;
            if (ws < 1800 && ws > 1200) {
                that.performerBreak = 12
                }else {
                that.performerBreak = 6
            }
            })
            this.perfDataTop = this.$store.state.generalData.topPerformers;
            this.perfDataBottom = this.$store.state.generalData.bottomPerformers;
            this.defaultFiat = this.$store.state.defaultFiat;
            this.currentFiat = this.defaultFiat
            this.top_perf = this.perfDataTop;
            this.bottom_perf = this.perfDataBottom;
            this.resetBarColor();
            this.$nuxt.$on("updateFromAsset", (data) => {
                var sendData = {
                'color': data.Color,
                'coin': data.Coin,
                'name': data.symbol,
                };
                this.bottomClick(data.name, data.color, 'other');
                this.topClick(data.name, data.color, 'other');
                this.$nuxt.$emit('updateFromPerformers', sendData);
                this.changeParentColor(sendData);
                })
            this.$nuxt.$on("updateFromPerformers", (data) => {
                this.changeParentColor(data);
                this.barClick(data.name, data.color, 'other');
            })
            this.$nuxt.$on("donutDataUpdate", (donutData) => {
                this.selected = donutData.name;
            })
            this.$nuxt.$on("getNewTimeFrame", (timeframe, data) => {
                if (data.symbol == 'total') {
                    this.selected = '';
                }
            })
        },
        data() {
            return {
                performerBreak: 6,
                loading: false,
                topStyle: [],
                bottomStyle: [],
                defaultFiat: null,
                perfDataTop: null,
                perfDataBottom: null,
                selected: '',
                top_perf: null,
                bottom_perf: null,
                currentFiat: null,
                perfSelect1: {
                    'background': 'linear-gradient(to right, rgba(27, 177, 102, 0.329) , black)',
                },
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto');

    /*font-family: 'Montserrat', sans-serif;
font-family: 'Roboto', sans-serif;*/
    .text {
        font-family: 'Montserrat', sans-serif;
        font-size: 13px;
        font-weight: bold;
        color: white;
        z-index: 6;
        white-space: nowrap;
        margin-left: 43%;
    }

    .text2 {
        font-family: 'Montserrat', sans-serif;
        font-size: 13px;
        font-weight: bold;
        color: white;
        z-index: 6;
        white-space: nowrap;
        margin-left: 43%;
    }

    ul {
        list-style: none;
    }

    .usd {
        font-family: 'Roboto', sans-serif;
        font-size: 11px;
        padding-top: 25px;
        color: #76daee;
        margin-left: 115px;
        position: relative;
        z-index: 6;

    }

    .coin {
        font-family: 'Montserrat', sans-serif;
        font-size: 12px;
        font-weight: bold;
        padding-left: 30px;
        position: relative;
        top: -36px;
        left: -5px;
        margin-bottom: -55px;
        z-index: 6;

    }

    .logo {
        position: relative;
        right: -15px;
        top: -25px;
        z-index: 6;
    }

    .change {
        font-family: 'Roboto', sans-serif;
        color: #25b154;
        margin-left: 130px;
        font-size: 11px;
        position: relative;
        top: -41px;
        z-index: 6;

    }

    .change2 {
        font-family: 'Roboto', sans-serif;
        color: #b12a25;
        margin-left: 130px;
        font-size: 11px;
        position: relative;
        top: -41px;
        z-index: 6;

    }

    .bar {
        width: 75px;
        height: 5px;
        border: none;
        position: relative;
        top: -45px;
        margin-left: 105px;
        -webkit-border-radius: 56px;
        border-radius: 56px;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        z-index: 6;
    }

    .bar-sel {
        width: 75px;
        height: 5px;
        border: none;
        position: relative;
        top: -45px;
        margin-left: 105px;
        -webkit-border-radius: 56px;
        border-radius: 56px;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        background: #b12a25;
        z-index: 6;
    }

    .ul-space {
        margin-bottom: -60px;
    }

    .perf-se {
        height: 100%;
        width: 60%;
        z-index: 5;
        position: sticky;
        /*newly added*/
        left: 60px;
        /*newly added*/
        margin-top: -23px;
    }

    .perf-sel2 {
        height: 55px;
        width: 55%;
        z-index: 5;
        position: absolute;
        /*newly added*/
        right: 45px;
        /*newly added*/
        top: 130px;
        /*newly added*/
    }

    .perf-sel3 {
        height: 55px;
        width: 55%;
        z-index: 5;
        position: absolute;
        /*newly added*/
        right: 45px;
        /*newly added*/
        top: 210px;
        /*newly added*/
    }

    .cursor {
        cursor: pointer
    }

    .scrollable {
        border-width: 0px;
        border-color: #25b154;
        border-style: solid;
        overflow-x: hidden;
        overflow-y: auto;
        padding-right: 5px;
        padding-bottom: 15px;
        height: 145px;
    }
.wrapper {
    max-width: 39rem;
    margin-left:auto;
    margin-right:auto;
}
</style>