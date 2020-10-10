<template>
  <div :style="mobile">
<b-container class="d-block d-md-none" style="white-space:nowrap;margin-left:20%;">
	<b-row>
		<b-col cols="8">
			<b-row>
		<div class="TopLabel">
          Value ({{currentFiat}})
		</div>
			</b-row>
						<b-row>
		<div class="TopLabel">
          Value (BTC)
		</div>
			</b-row>
						<b-row>
		<div class="TopLabel">
			{{changeTitle}}
		</div>
			</b-row>
						<b-row>
		<div class="TopLabel">
         Exchanges
		</div>
			</b-row>
						<b-row>
		<div class="TopLabel">
         Wallets
		</div>
			</b-row>
		<b-row>
		<div class="TopLabel">
         Exchange Value
		</div>
			</b-row>
					<b-row>
		<div class="TopLabel">
          Allocation %
		</div>
			</b-row>
					<b-row>
		<div class="TopLabel">
          Wallet Value
		</div>
			</b-row>
		</b-col>
		<b-col cols="4">
			<b-row>
		<div class="Data" style="margin-bottom:10px;">
            {{Number(valueusd).toLocaleString('en', {style: 'currency', currency: currentFiat})}}
		</div>
			</b-row>
				<b-row>
<div class="Data" style="margin-bottom:10px;">
			<img class="btcicon" :src="'/other/bitcoin.png'" width="11px" >{{Number(valuebtc).toFixed('4')}}
		</div>
			</b-row>
				<b-row>
		<div class="Data" style="margin-bottom:10px;">
  	{{Number(twentyFourChange).toLocaleString('en', {style: 'currency', currency: currentFiat})}}
	<span :style="percentColor">({{Number(twentyFourChangePercent).toFixed('2')}}%)</span>
			</div>
			</b-row>
				<b-row>
		<div class="Data" style="margin-bottom:5px;">
              {{exchanges}}
		</div>
			</b-row>
				<b-row>
		<div class="Data" style="margin-bottom:5px;">
			{{Number(wallets).toLocaleString('en', {useGrouping:true})}}
		</div>
			</b-row>
				<b-row>
		<div class="Data" style="margin-bottom:10px;">
         {{Number(exchangeValue).toLocaleString('en', {style: 'currency', currency: currentFiat})}}
		</div>
			</b-row>
				<b-row>
		<div class="Data" style="margin-bottom:10px;">
			{{Number(exchangeAllocationPercent).toLocaleString('en', {useGrouping:true})}}%/{{Number(walletAllocationPercent).toLocaleString('en', {useGrouping:true})}}%
		</div>
			</b-row>
				<b-row>
		<div class="Data" style="margin-bottom:10px;">
         {{Number(walletValue).toLocaleString('en', {style: 'currency', currency: currentFiat})}}
		</div>
			</b-row>
		</b-col>
	</b-row>
</b-container>


<div class="container-fluid d-none d-md-block">
	<div class="row">
		<div class="col-md-4 col-sm-4 TopLabel">
          Value ({{currentFiat}})
		</div>
		<div class="col-md-4 col-sm-4 TopLabel">
			Value (BTC)
		</div>
		<div class="col-md-4  col-sm-4 TopLabel">
			{{changeTitle}}
		</div>
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-4 Data">
            {{Number(valueusd).toLocaleString('en', {style: 'currency', currency: currentFiat})}}
		</div>
		<div class="col-md-4 col-sm-4 Data">
			<img class="btcicon" :src="'/other/bitcoin.png'" width="11px" >{{Number(valuebtc).toFixed('4')}}
		</div>
		<div class="col-md-4 col-sm-4 Data">
  	       {{Number(twentyFourChange).toLocaleString('en', {style: 'currency', currency: currentFiat})}}
            <span :style="percentColor">({{Number(twentyFourChangePercent).toFixed('2')}}%)</span>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-4 LowerLabel">
         Exchanges
		</div>
		<div class="col-md-4 col-sm-4">
		</div>
		<div class="col-md-4 col-sm-4 LowerLabel">
        Wallets
		</div>
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-4 Data">
         {{exchanges}}
		</div>
		<div class="col-md-4 col-sm-4">
		</div>
		<div class="col-md-4 col-sm-4 Data">
			{{Number(wallets).toLocaleString('en', {useGrouping:true})}}
		</div>
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-4 LowerLabel">
     Exchange Value
		</div>
		<div class="col-md-4 col-sm-4 LowerLabel">
     Allocation %
		</div>
		<div class="col-md-4 col-sm-4 LowerLabel">
     Wallet Value 
		</div>
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-4 Data">
         {{Number(exchangeValue).toLocaleString('en', {style: 'currency', currency: currentFiat})}}
		</div>
		<div class="col-md-4 col-sm-4 Data">
			{{Number(exchangeAllocationPercent).toLocaleString('en', {useGrouping:true})}}%/{{Number(walletAllocationPercent).toLocaleString('en', {useGrouping:true})}}%
		</div>
		<div class="col-md-4 col-sm-4 Data">
         {{Number(walletValue).toLocaleString('en', {style: 'currency', currency: currentFiat})}}
		</div>
	</div>
</div>
  </div>

</template>

<script>
export default {
  name: 'Totals',
  data () {
    return {
		mobile: {marginTop : '0px'},
	  currentFiat: null,
	  valueusd: null,
	  exchanges: null,
	  exchangeValue: null,
	  valuebtc: null,
	  exchangeAllocationPercent: null,
	  walletAllocationPercent: null,
	  twentyFourChange: null,
	  twentyFourChangePercent: null,
	  percentPositive: null,
	  wallets: null,
	  walletValue: null,
	  differenceVariable: null,
	  percentageDifferenceVariable: null,
	  walletVariable: null,
	  exchangeVariable: null,
	  combinedVariable: null,
	  combinedOverviewVariable: null,
	  balanceData: null,
	  defaultFiat: null,
	  changeTitle: '24H change',
	  percentColor: {color : '#25b154'}
    }
  },
	props: [],
	methods:{
		getPercentageChange(newNumber, oldNumber){
        var decreaseValue = oldNumber - newNumber;
        return (decreaseValue / oldNumber) * 100;
		},
		getTotalDifference(oldNumber, newNumber){
			let total = newNumber - oldNumber;
			return total
		},
		titleSwap(val){
		this.changeTitle = val
		},
		getOverviewTotal(){
			if (Number(this.balanceData.global.computed[this.percentageDifferenceVariable]) >= 0){
			this.percentPositive = true
		} else {
			this.percentPositive = false
		}
		this.valueusd = this.balanceData.global.computed[this.combinedOverviewVariable]
		this.exchanges = this.balanceData.global.computed.exchangeTotal
		this.exchangeValue = this.balanceData.global.computed[this.exchangeVariable]
		this.valuebtc = this.balanceData.global.computed.combinedbtcTotal
		this.exchangeAllocationPercent = this.balanceData.global.computed.totalExchangeAllocation
		this.walletAllocationPercent = this.balanceData.global.computed.totalWalletAllocation
		this.wallets = this.balanceData.global.computed.walletCoins
		this.walletValue = this.balanceData.global.computed[this.walletVariable]
		}
	},
	mounted(){
		if (window.innerWidth < 500) {
    this.mobile.marginTop = '35px';
}
     this.$nuxt.$on('intervalChange', (value) => {
	 if (value == 'ONEDAY'){
	 this.titleSwap('24H Change');
	 }else if (value == 'ONEWEEK') {
	 this.titleSwap('7D Change');
	 }else if (value == 'ONEMONTH') {
	 this.titleSwap('1M Change');
	 }else if (value == 'THREEMONTHS') {
	 this.titleSwap('3M Change');
	 }else if (value == 'SIXMONTHS') {
	 this.titleSwap('6M Change');
	 }else if (value == 'ONEYEAR') {
	 this.titleSwap('1Y Change');
	 }
	 })
	 this.$nuxt.$on('newPercentageChange', (total, percent) => {
	 this.twentyFourChangePercent = null;
	 this.twentyFourChangePercent = percent;
     if (this.twentyFourChangePercent < 0) {
	 this.percentColor.color = '#da1e2d'
	 }else{
	 this.percentColor.color = '#25b154'
	 }
	 this.twentyFourChange = null;
	 this.twentyFourChange = total;
	 })
	},
	created(){
		this.balanceData = JSON.parse(JSON.stringify(this.$store.state.generalData.balances));
		this.defaultFiat = this.$store.state.defaultFiat;
		this.currentFiat = this.defaultFiat
		var fiat = this.defaultFiat.toLowerCase()
		this.differenceVariable = fiat+'Difference'
		this.percentageDifferenceVariable = fiat+'PercentageDifference'
		this.walletVariable = 'wallet'+fiat+'Value'
		this.exchangeVariable = 'exchange'+fiat+'Value'
		this.combinedVariable = fiat+'value'
		this.combinedOverviewVariable = 'combined'+fiat+'Total'
		this.getOverviewTotal();
		this.$nuxt.$on('getNewTimeFrame', (timeframe, coinsymbol) => {
			var thisCoin = coinsymbol.symbol;
			if (coinsymbol == 'total'){
			this.getOverviewTotal()
			}else{
			if (Number(this.balanceData.global[thisCoin][this.percentageDifferenceVariable]) >= 0){
				this.percentPositive = true
			} else {
				this.percentPositive = false
			}
			var exchangeAndWallet = Number(this.balanceData.global[thisCoin][this.walletVariable]) + Number(this.balanceData.global[thisCoin][this.exchangeVariable])
			var exchangePercent = 100*(Number(this.balanceData.global[thisCoin][this.exchangeVariable])/exchangeAndWallet)
			var walletPercent = 100*(Number(this.balanceData.global[thisCoin][this.walletVariable])/exchangeAndWallet)
			this.valueusd = this.balanceData.global[thisCoin][this.combinedVariable]
			this.exchanges = this.balanceData.global[thisCoin].howManyExchanges
			this.exchangeValue = this.balanceData.global[thisCoin][this.exchangeVariable]
			this.valuebtc = this.balanceData.global[thisCoin].btcvalue
			this.exchangeAllocationPercent = exchangePercent
			this.walletAllocationPercent = walletPercent
			//this.twentyFourChange = this.balanceData.global[thisCoin][this.differenceVariable]
			var percentDif = "0"
			if (Number(this.balanceData.global[thisCoin][this.percentageDifferenceVariable]) >= 1000){
				percentDif = ">1,000"
			} else if (Number(this.balanceData.global[thisCoin][this.percentageDifferenceVariable]) <= -1000){
				percentDif = ">1,000"
			} else {
				percentDif = this.balanceData.global[thisCoin][this.percentageDifferenceVariable]
			}
			//this.twentyFourChangePercent = percentDif
			this.wallets = this.balanceData.global[thisCoin].howManyWallets
			this.walletValue = this.balanceData.global[thisCoin].walletusdValue
			}
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btcicon{
  filter: invert(100%);
  margin-right:4px;
}
.wrapper {
    margin-left:auto;
    margin-right:auto;
    width:700px;
}
.All {
  background: black;
  font-family: 'Roboto', sans-serif;
  text-align: left;
  white-space: nowrap;
}
.Data {
 font-family: 'Roboto', sans-serif;
 font-size: 15px;
 color: #7FD6FE;
 margin-top: 2px;
 white-space: nowrap;
padding-right: 80px;
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
 padding-bottom: 8px;
 white-space: nowrap;
 padding-right: 80px;
}

.LowerLabel {
 font-family: 'Montserrat', sans-serif;
 font-size: 11px;
 font-weight: bold;
 color: white;
 padding-top: 8px;
  padding-right: 80px;
 white-space: nowrap;
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
