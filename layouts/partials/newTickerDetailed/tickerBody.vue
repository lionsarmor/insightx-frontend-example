<template>
    <div>
        <b-row>
            <b-col style="margin-top:70px;font-size:12px;">
                <tickerChart style="position:absolute;top:-10px;left:205px;" :color="tickerData.color" :history="tickerData.history_close_24h" />
                <div style="position:relative;z-index:2;">
                    <span style="white-space:nowrap;;">
                        <span style="position:relative;top:-52px;right:-40.5px;color:#65cdfa;z-index:3 !important;padding-right:10px;">#{{indexVal+1}}</span>
                        <img :src="$emblem(tickerData.market)" class="svg" style="width:12px;height:12px; color:white;position:relative;top:-53px;left:40px;" onerror="this.src='/cryptocurrency-icons/svg/white/other2.svg'" />
                        <a class="thick" style="position:relative;left:40px;top:-51px;">{{ tickerData.market }}</a>
                        <span style="position:relative;right:-50px;top:-51px;">
                            {{Number(tickerData.price).toLocaleString('en', {style: 'currency', currency: fiat})}}</span>
                    </span>
                    <span style="position:relative;top:-51.5px;left:62px;" :style="{'color': tickerData.color}">
                        {{Number(tickerData.priceChange).toFixed(2)}}({{Number(tickerData.pricePercentChange)}}%)
                    </span>
                </div>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import tickerChart from '../../partials/newTickerDetailed/tickerChart'

    /* eslint-disable */
    export default {
        data() {
            return {
                indexVal: this.indexValue,
                rank: null,
                fiat: this.$store.state.defaultFiat,
                tickerData: {
                    'market': 'BTC',
                    'price': '000.00',
                    'pricePercentChange': '25.00',
                    'priceChange': '06.5',
                    'color': 'green',
                    'volume_24h': '0000345',
                    'high_24': '0000345',
                    'low_24': '0000345'
                }
            }
        },
        methods: {
            rankValue() {
                let value = 0;
                while (value < 12) {
                    return value++;
                }
            }
        },
        props: ['tickerDataProfile', 'indexValue'],
        mounted() {
            this.tickerData = this.tickerDataProfile;
            this.rankValue();
        },
        created() {

        },
        components: {
            tickerChart
        },
    }
</script>