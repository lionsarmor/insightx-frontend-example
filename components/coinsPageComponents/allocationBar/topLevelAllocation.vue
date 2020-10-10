<template>
<div style="margin-bottom: -240px; margin-top:-50px;" v-on:click="updateComponents(elem.coinName)">   
        <div :style="{'background-color': elem.colorBlock}" style="position: relative; left: 12px; top:80px;" class="square"></div>
        <span class="title text-left" style="margin-left:auto;padding-left:30px;position:relative; top:60px;display: block;">{{elem.coinName}}</span>
        <span class="title targetPOS" style="position:relative; top:75px;left:-15%">Target:</span>
        <span style="z-index:1;position:relative;left:-60px;top:75px;"><input style="width:60px;color:#0f8bab;background-color:transparent;border:none;" type="number"  min="0" max="100" pattern="^\d*(\.\d{0,2})?$" step="0.01"  :placeholder="elem.target + '%'" v-on:keyup.enter="sendNewTarget(elem.symbol, elem.targetLock)"  :id="elem.symbol" /><fa @click="sendNewTarget(elem.symbol, elem.targetLock)" icon="sync" :id="elem.symbol"/></span>
        <allocation-bar :alloBar="elem"></allocation-bar>
        <target :alloBar="elem" style="position: relative; top:-90px"></target>
        <div class="pointer" v-on:click="lockAlloTargets(elem.symbol), elem.targetLock = !elem.targetLock">
            <fa class="pointer" v-if="elem.targetLock" style="font-size:11px; position:relative;top:-150px; left:100px;color:#616164;"  icon="lock" />
            <fa class="pointer" v-if="!elem.targetLock" style="font-size:11px; position:relative;top:-150px; left:100px;color:#616164;"  icon="lock-open" />
        </div>
            <fa v-if="elem.allocation == 0" class="pointer"  style="position:relative;top:-175px;right:-170px;color:white;font-size:11px;" @click="trash(elem.symbol, elem.target)" icon="trash" />
            <fa v-if="elem.allocation > 0" class="pointer"  style="position:relative;top:-175px;right:-170px;color:#616164;font-size:11px;"   icon="trash" />

</div>
</template>

<script>
import target from '~/components/coinsPageComponents/allocationBar/target'
import allocationBar from '~/components/coinsPageComponents/allocationBar/allocationBar'
import { VUEX_ALLOCATION_BAR_DATA } from '~/store/constants/coins'

import { mapState, mapActions } from 'vuex'

export default {
            props: ['elem','indexed'],

            mounted(){
                this.$nuxt.$on('updateRadialBasedOnElements', symbol => {
                    if (this.elem.symbol == symbol){
                        this.updateAllocationBarData(this.elem)
                    }
                })
                 this.$nuxt.$on('indexList', data => {
                     this.indexList = data;
                })
            },
            methods:{
                ...mapActions({
                    updateAllocationBarData: `coins/${VUEX_ALLOCATION_BAR_DATA}`
                }),
                lockAlloTargets(symbol){
                    this.$nuxt.$emit('lockAlloTarget', symbol)
                },
                updateComponents(coin) {
                    this.updateAllocationBarData(this.elem)
                    let index = null;
                    let that = this;
                    for (let item in that.indexList){
                        if (coin == that.indexList[item].longName){
                            index = that.indexList[item].index - 1;
                        }
                    }
                    this.$nuxt.$emit('colorTableUpdateAssets', index);
                },
                sendNewTarget(symbol, lock){
                        let alloTarget = document.getElementById(symbol);
                        if (alloTarget.value == null || alloTarget.value == ""){
                            return
                        }
                        this.$nuxt.$emit('sendTarget', {'symbol' :symbol, 'lock':lock, 'target': Number(alloTarget.value)})
                        alloTarget.value = null
                },
                           trash(symbol, allocation) {
                            this.$nuxt.$emit('deleteTarget', {'symbol':symbol, 'allocation':allocation})
                           }
            },

            components:{ 
                target,
                allocationBar
            },
            data() {
            return {
                indexList: [],
                loading: true,
                series:
                [
                   {data: [50]},
                   {data: [50]}
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
                            barHeight: "10%",
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
        }
}
</script>

<style>
    .square {
        height: 15px;
        width: 10px;
        position: relative;
    }
        .pointer {
        cursor: pointer;
        z-index: 10;
    }

        /* For Firefox */
    input[type='number'] {
        -moz-appearance:textfield;
    }

    /* Webkit browsers like Safari and Chrome */
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>
