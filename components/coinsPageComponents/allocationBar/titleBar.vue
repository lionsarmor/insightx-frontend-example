<template>
<div style="min-width:300px;">
        <div class="title text-left" style="position: relative;margin-top:7px;margin-left:auto;">Allocation
            <span style="padding-left:20%;position: relative;color:#616164 !important;top:25px;">% left to target: {{roundNumber(leftToAllocate)}}</span>
            <a style="top:-3px;" class="add" v-on:click="showModal()"><fa  icon="plus" />Add</a>
            <a style="top:-3px;" class="compress" v-on:click="expandTable(false)"><fa  icon="compress" /></a>
            <a style="top:-3px;" class="expand" v-on:click="expandTable(true)"><fa  icon="expand" /></a>
        </div>
        <div class="scrollable" style="height:300px;" v-if="allocationBarData.length">
        <top-level-allocation  v-for="(item, index) in allocationBarData" :elem='item' :indexed="index" :key="index" />
        </div>
        <div id="AddModal">
            <b-modal :header-bg-variant="headerBgVariant" :header-text-variant="headerTextVariant" :body-bg-variant="bodyBgVariant" :body-text-variant="bodyTextVariant" :footer-bg-variant="footerBgVariant" :footer-text-variant="footerTextVariant" class="navbutton2 modaltitle" ref="addModal" hide-footer title="Add Allocation">
                <div class="d-block text-center">
                    Coin Symbol:
                    <b-form-input type="text" id="coinSymbol" style="border:none;" placeholder="Example: BTC"></b-form-input>
                    <button class="btn-fil-blue2" variant="success lg" v-on:click="addAllocation()">ADD</button><br>
                </div>
            </b-modal>
        </div>
    </div>
</template>
<script>
    import topLevelAllocation from '~/components/coinsPageComponents/allocationBar/topLevelAllocation'
    
    import { VUEX_ALLOCATION_BAR_DATA,
             VUEX_ALLOCATION_TOTAL_BAR_DATA,
             VUEX_UPDATE_TARGETS } from '~/store/constants/coins'
    
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'titleBar',
        data() {
            return {
                loading: false,
                endpoint: this.$store.state.apiEndPoint,
                variants: [
                    'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'black'
                ],
                headerBgVariant: 'black',
                headerTextVariant: 'light',
                bodyBgVariant: 'black',
                bodyTextVariant: 'light',
                footerBgVariant: 'black',
                footerTextVariant: 'light',
                allocationBarData: [],
                deleteDelay: false,
                leftToAllocate: 0.0,
                barTableHeight: {'height': '280px'}
            }
        },
        mounted() {
            this.$nuxt.$on('lockAlloTarget', symbol => {
                this.lockTarget(symbol)
            })
            this.$nuxt.$on('sendTarget',  payload =>{
                this.updateTarget(payload.symbol, payload.lock, payload.target)
            })
            this.$nuxt.$on('deleteTarget', payload => {
                if (this.deleteDelay == true ){
                    return
                }
                this.leftToAllocate += payload.allocation
                this.deleteDelay = true
                let that = this
                var token = sessionStorage.getItem('token');
                var  alloSymbol = payload.symbol;
                var headers =  {          
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+btoa(token+':unused')}
                let url = this.endpoint + 'api/deleteTargetAllocation'
                fetch(url, {
                        method:"POST",
                        mode: 'cors',
                        headers: headers,
                        credentials: 'same-origin',
                        body: JSON.stringify({symbol: alloSymbol})
                    })
                    .then(function(response) {
                        return response.json();
                    })
                    .then((out) => {
                        var idx = 0
                        if (out.result == 'success' || out.reason == "Symbol does not exist in targets."){
                            that.$toast.success("Target deleted.", {icon: 'check'} )
                            that.allocationBarData = that.allocationBarData.filter(function(value, index, arr){
                                return value.symbol != alloSymbol
                            })
                            let newTargets = that.targets
                            delete newTargets[alloSymbol]
                            that.$store.commit('updateKey', {'key': 'targets', 'newData': newTargets})
                            that.updateTargetsInStore(newTargets)
                        
                        }
                    })
                    .catch(err => {
                        that.$toast.error(err, {icon: 'warning'} )
                        throw err
                    })
                    setTimeout(function() {
                    that.deleteDelay = false
                            , 1200});
            }),
            
            this.pushGlobal();
        },
        computed: {
            ...mapState({
                targets: state => state.coins.targets,
                globalBalances: state => state.coins.globalBalances
            })
        },
        methods: {
            ...mapActions({
                updateAllocationBarData: `coins/${VUEX_ALLOCATION_BAR_DATA}`,
                updateTotalAllocationBarData: `coins/${VUEX_ALLOCATION_TOTAL_BAR_DATA}`,
                updateTargetsInStore: `coins/${VUEX_UPDATE_TARGETS}`
            }),
            expandTable(val){
            this.$nuxt.$emit("allocationBarExpand", val);
            },
                    roundNumber(number){
                return Math.round(number * 100) / 100
                },

                lockTarget(val) {
                let url = this.endpoint + 'api/lockTargetAllocation';
                let that = this;
                var alloSymbol = val;
                var token = sessionStorage.getItem('token');
                var headers =  {          
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+btoa(token+':unused')};
                var bodies = JSON.stringify({symbol: alloSymbol});
                fetch(url, {
                      method:"POST",
                        mode: 'cors',
                        headers: headers,
                        credentials: 'same-origin',
                        body: bodies
                    })
                    .then(function(response) {
                        return response.json();
                    })
                    .then((out) => {
                        if (out.result == "success") {
                            that.$toast.success("Lock updated.", {icon: 'check'});
                            let newTargets = that.targets
                            newTargets[alloSymbol]["locked"] = !(newTargets[alloSymbol]["locked"])
                            that.$store.commit('updateKey', {'key': 'targets', 'newData': newTargets})
                            that.updateTargetsInStore(newTargets)
                        } else {
                            that.$toast.error(out.message, {icon: 'warning'});
                        }
                    })
                    .catch(err => {
                        throw err
                    })
            },sendTargetApi(targetObjects){
                 var token = sessionStorage.getItem('token');
                let url = this.endpoint + 'api/updateTargetAllocation';
                var headers =  {          
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+btoa(token+':unused')}
                let that = this
                fetch(url, {
                        method:"POST",
                        mode: 'cors',
                        headers: headers,
                        credentials: 'same-origin',
                        body: JSON.stringify({'targets':targetObjects})
                    })
                    .then(function(response) {
                        return response.json();
                    })
                    .then((out) => {
                        if (out.result == 'success'){
                            that.$toast.success("Updated target.", {icon: 'check'});
                            let newTargets = that.targets
                            for (var eachTarget in targetObjects) {
                                newTargets[eachTarget]["target"] = targetObjects[eachTarget]
                            }
                            that.$store.commit('updateKey', {'key': 'targets', 'newData': newTargets})
                            that.updateTargetsInStore(newTargets)
                        }
                        if (out.result == 'failed'){
                            that.$toast.error("Failed to update target", {icon: 'warning'});
                        }
                    })
                    .catch(err => {
                        throw err
                    })
            },  changeTargetInMemory(symbol, target){
                    for (var idx in this.allocationBarData){
                        if (this.allocationBarData[idx].symbol == symbol){
                            this.allocationBarData[idx].target = target
                            this.allocationBarData[idx].targetRemainder = 100-target
                            this.$nuxt.$emit('updateRadialBasedOnElements',this.allocationBarData[idx].symbol)
                            break
                        }
                    }
            },
                updateTarget(symbol, locked, allocationTarget) {
                    let totalUnlocked = 0.0
                    let totalLocked = 0.0
                    let extra = this.leftToAllocate
                    let targetObjects = {}
                    let currentAllocation = 0.0
                    let that = this

                    that.allocationBarData.forEach(function(coin){
                    // get current allocation for given symbol
                    if (coin.symbol == symbol){
                        that.currentAllocation = Number(coin.target)
                    }
                    // Calculate all locked, and unlocked target excluding the coin being updated
                    if (coin.symbol !=  symbol){
                    if (coin.targetLock == false){
                        totalUnlocked += Number(coin.target)
                        // Add coins to targetObjects that we can potentially pull allocations from
                        if (coin.target > 0){
                            targetObjects[coin.symbol] = coin.target
                        }
                    }
                    if (coin.targetLock == true){
                        totalLocked += Number(coin.target)
                    }
                  }
                })
                // do nothing if they didn't update
                if (allocationTarget == this.currentAllocation){
                    that.$toast.error("No change detected.", {icon: 'warning'});
                    return
                }
                // if adjusting down make the adjustment
                if (allocationTarget < this.currentAllocation){
                    let realDecrease = this.currentAllocation - allocationTarget
                    // make sure it is not less than zero
                    if (that.currentAllocation - allocationTarget < 0){
                        that.$toast.error("Allocation target cannot be below 0%", {icon: 'warning'});
                    }
                    that.leftToAllocate += realDecrease
                    targetObjects[symbol] = allocationTarget
                    targetObjects['extra'] = that.leftToAllocate
                    that.$nuxt.$emit("updateTarget", targetObjects)
                    that.sendTargetApi(targetObjects)
                    that.changeTargetInMemory(symbol, allocationTarget)
                    return
                }
                let realIncrease = allocationTarget - this.currentAllocation
                // check if they exceed 100%
                if ((totalLocked+realIncrease) > 100 ){
                    that.$toast.error("Allocation targets would exceed 100%", {icon: 'warning'});
                    return
                }
                // allocation is going up on target here
                // check if they have enough available in extra to pull from
                if (extra >= realIncrease){
                    that.leftToAllocate -= realIncrease
                    targetObjects[symbol] = allocationTarget
                    targetObjects['extra'] = this.leftToAllocate
                    that.$nuxt.$emit("updateTarget", targetObjects)
                    that.sendTargetApi(targetObjects)
                    that.changeTargetInMemory(symbol, allocationTarget)
                    return
                }
                // last condition if there is not enough in the extra pull from unlocked
                // check if enough unlocked to pull from
                if (extra == 0) {
                    extra = Math.abs(100-totalLocked-totalUnlocked)
                    if (extra == 100) {
                        extra = 0
                    }
                }
                if (extra+totalUnlocked < realIncrease){
                    that.$toast.error("Not enough free allocation. Unlock a target to adjust.", {icon: 'warning'});
                    return
                }
                if (extra > 0){
                    this.leftToAllocate = 0
                    targetObjects['extra'] = 0
                    realIncrease -= extra
                }
                let subtractionTotal = realIncrease
                let availableCoinsToSubtract = Object.keys(targetObjects).length
                let subtractionPerCoin = Number(subtractionTotal/availableCoinsToSubtract)
                subtractionPerCoin = (Math.round(subtractionPerCoin * 4) / 4).toFixed(2);
                while (subtractionTotal > 0.1) {
                    let remainingTargetPercentages = 0
                    for (var coin in targetObjects){
                        if (coin != symbol) {
                            remainingTargetPercentages += targetObjects[coin]
                        }
                    }
                    if (remainingTargetPercentages < 0.01) {
                        break
                    }
                    for (var coin in targetObjects){
                        if (targetObjects[coin] - subtractionPerCoin > 0){
                            targetObjects[coin] -=subtractionPerCoin
                            subtractionTotal -= subtractionPerCoin
                            that.changeTargetInMemory(coin, targetObjects[coin])

                        } else {    
                            let subAmount = Math.abs(0-targetObjects[coin])
                            subtractionTotal -= subAmount
                            targetObjects[coin] = 0
                            that.changeTargetInMemory(coin, 0)
                        }
                    }
                }
                targetObjects[symbol] = allocationTarget
                that.$nuxt.$emit("updateTarget", targetObjects)
                that.sendTargetApi(targetObjects)
                that.changeTargetInMemory(symbol, allocationTarget)
            },
                addAllocation() {
                let token = sessionStorage.getItem('token');
                let alloSymbol = document.getElementById('coinSymbol').value;
                if (alloSymbol != undefined) {
                    alloSymbol = alloSymbol.toUpperCase()
                }
                    var headers =  {          
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+btoa(token+':unused')}
                let url = this.endpoint + 'api/addTargetAllocation';
                let that = this;
                fetch(url, {
                        method:"POST",
                        mode: 'cors',
                        headers: headers,
                        credentials: 'same-origin',
                        body: JSON.stringify({ 'symbol': alloSymbol }),
                        credentials: 'same-origin'
                    })
                    .then(function(response) {
                        return response.json();
                    })
                    .then((out) => {
                        if (out.result == 'success'){
                            try{
                            var newCoin = {
                                'symbol': alloSymbol,
                                'coinName': out.name,
                                'allocation': 0.0,
                                'remainder': 100,
                                'colorBlock': '#7dd4fc',
                                'toGradient': '#7dd4fc',
                                'target': 0.0,
                                'targetRemainder': 100,
                                'targetLock': false
                            }
                            that.allocationBarData.push(newCoin)
                            that.$toast.success("Added new target.", {icon: 'check'});
                            let newTargets = that.targets
                            newTargets[alloSymbol] =  {
                                "target": 0, 
                                "locked": false, 
                                "simulated": true
                            }
                            that.$store.commit('updateKey', {'key': 'targets', 'newData': newTargets})
                            that.updateTargetsInStore(newTargets)

                            } catch (e){
                            }
                            document.getElementById('coinSymbol').value = '';
                            that.$refs.addModal.hide()

                        }
                        if (out.result == 'failed'){
                             document.getElementById('coinSymbol').value = '';
                            that.$toast.error(out.reason, {icon: 'warning'});
                        }
                    })
                    .catch(err => {
                        throw err
                    })
            },

            showModal() {
                this.$refs.addModal.show()
            },
            hideModal() {
                this.$refs.addModal.hide()
            },
            pushGlobal() {
                let that = this;
                var lockedTarg = 0.0
                var unlockedTarg = 0.0
                for (var elem in this.globalBalances.global) {
                    if (elem != 'computed') {
                            if(this.targets[elem].locked == true){
                                  lockedTarg += this.targets[elem].target
                            } else {
                                unlockedTarg += this.targets[elem].target
                            }
                            var remainderPercent = (100 - this.globalBalances.global[elem].AllocationPercentage);
                            var targetRemainder = (100 - this.targets[this.globalBalances.global[elem].symbol].target)
                            that.allocationBarData.push({
                               'longName': this.globalBalances.global[elem].Coin,
                                'symbol': this.globalBalances.global[elem].symbol,
                                'coinName': this.globalBalances.global[elem].Coin,
                                'allocation': this.globalBalances.global[elem].AllocationPercentage,
                                'remainder': remainderPercent,
                                'colorBlock': this.globalBalances.global[elem].Color,
                                'toGradient': '#7dd4fc',
                                'target': this.targets[this.globalBalances.global[elem].symbol].target,
                                'targetRemainder': targetRemainder,
                                'targetLock': this.targets[this.globalBalances.global[elem].symbol].locked
                            })
                        }

                }
                for (var targetCoin in this.targets){
                    if (!(targetCoin in this.globalBalances.global) && targetCoin != 'extra'){
                       if(this.targets[targetCoin].locked == true){
                                  lockedTarg += this.targets[targetCoin].target
                            } else {
                                unlockedTarg += this.targets[targetCoin].target
                            }
                    var remainderTarg = 100-this.targets[targetCoin].target
                    that.allocationBarData.push({
                        'symbol': targetCoin.toUpperCase(),
                        'coinName': targetCoin.toUpperCase(),
                        'allocation': 0.0,
                        'remainder': 0.0,
                        'colorBlock': '#7dd4fc',
                        'toGradient': '#7dd4fc',
                        'target': this.targets[targetCoin].target,
                        'targetRemainder': remainderTarg,
                        'targetLock': this.targets[targetCoin].locked
                        })
                    }
                }
                
                this.leftToAllocate = Number(Number(100-(lockedTarg+unlockedTarg)).toFixed(3))
                var extra = this.leftToAllocate
                if (this.targets['extra'].target != extra){
                    this.targets['extra'].target
                    var targetObjects = {'extra':extra}
                    this.sendTargetApi(targetObjects)
                    this.changeTargetInMemory('extra', extra)
                }
                if (this.allocationBarData[0]){
                    var data = {}
                    data['longName'] = this.allocationBarData[0].coinName
                    data['symbol'] = this.allocationBarData[0].symbol
                    data['target'] = this.allocationBarData[0].target
                    data['targetRemainder'] = this.allocationBarData[0].targetRemainder
                    data['allocation'] = this.allocationBarData[0].allocation
                    data['colorBlock'] = this.allocationBarData[0].colorBlock
                    //this.$nuxt.$emit('radialData', data)
                    this.updateAllocationBarData(data)
                }
                this.updateTotalAllocationBarData(this.allocationBarData)
            }
        },
        components: {
            topLevelAllocation
        }

    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    a:hover {
        color: rgb(255, 255, 255) !important;
        border-color: white !important;
    }

    .add {
        cursor: pointer;
        color: #616164 !important;
        font-size: 10px;
        position: absolute;
        right: 70px;
        top: -10px;
        border-color: #616164;
        border-style: solid;
        border-width: 2px;
        padding-top: 3px;
        padding-bottom: 3px;
        padding-right: 5px;
        padding-left: 5px;
        border-radius: 10px;
    }
      .compress {
        cursor: pointer;
        color: #616164 !important;
        font-size: 12px;
        position: absolute;
        right: 50px;
        margin-top:3px;
    }
      .expand {
        cursor: pointer;
        color: #616164 !important;
        font-size: 12px;
        position: absolute;
        right: 30px;
        margin-top:3px;
    }
    .square {
        height: 15px;
        width: 7px;
        position: relative;
    }


.wrapperALL{
            width:100%;
            overflow-x: hidden;
}
    .pointer {
        cursor: pointer;
        z-index: 10;
    }

    /* webkit solution */
    ::-webkit-input-placeholder {
        text-align: left;
    }

    /* mozilla solution */
    input:-moz-placeholder {
        text-align: right;
    }

    .scrollable {
        overflow-y: auto;
        overflow-x: hidden
        
    }
    .bin {
        top: .5em;
    }
    .card-body {
        background: black !important;
    }

    .bit {
        top: .6em;
    }

    .bitr {
        top: 6px;
    }

    .block {
        background-color: rgb(1, 21, 26);
        opacity: 0.8;
    }

    .p2 {
        font-size: 15px;
        color: white;
    }

    .card-card_title {
        opacity: 0%;
    }

    .card-card_footer {
        opacity: 0%;
    }

    @import url('https://fonts.googleapis.com/css?family=Anton|Open+Sans+Condensed:300|Righteous|Shrikhand');

    .seethrough {
        opacity: 0%;
    }

    .signin {
        font-family: 'Anton', sans-serif;
        color: orangered;
    }

    .jumbo {
        background-color: transparent;
        top: 60px;

    }

    h1,
    h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    #bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -3;
    }

    .blue {
        color: rgb(204, 223, 255) !important;
        font-family: 'Righteous', cursive;
        font-size: 20px;
        position: relative;
    }

    .modaltitle {
        color: rgb(0, 90, 117);
    }

    .btn-fil-blue {
        color: white !important;
        background-color: #047ea4 !important;
        border-style: solid;
        border-width: 2px;
        border-color: #047ea4;
        border-radius: 25px;
        height: 37px;
        position: relative;
        top: 3px;
        cursor: pointer;
    }

    .btn-fil-blue2 {
        color: white !important;
        background-color: #000000 !important;
        border-style: solid;
        border-width: 2px;
        border-color: #047ea4;
        border-radius: 25px;
        height: 37px;
        position: relative;
        top: 3px;
        cursor: pointer;
    }

    input {
        background: #1a1a1a;
        color: white;
    }

    textarea {
        background: #1a1a1a;
        color: white;
    }

    textarea:focus {
        background: #1a1a1a;
        color: white;
    }

    input:focus {
        background: #1a1a1a;
        color: white;
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