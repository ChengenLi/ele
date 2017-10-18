<template>
  <div class="shopcart">
	<div class="content">
	  	<div class="content-left">
	  		<div class="logo-wrapper">
	  			<div class="logo" :class="{'hightlight':totalCount>0}">
			  		<span class="ele-fontshopping_cart"></span>
		  		</div>
		  		<div class="count" v-if="totalCount>0">{{totalCount}}</div>
		  	</div>
	  		<div class="total" :class="{'hightlight':totalCount>0}">￥{{totalPrice}}</div>
	  		<div class="desc">另需配送费{{deliveryPrice}}元</div>
	  	</div>
	  	<div class="content-right">
	  		<div class="pay" :class="{'enough': decPay==='去结算'}">{{decPay}}</div>
	  	</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'shopcart',
  props: ['minPrice','deliveryPrice','selectFoods'],
  computed: {
  	totalPrice () {
  		let price = 0
  		this.selectFoods.forEach((food) =>　{
  			price += food.price * food.count
  		})
  		return price
  	},
  	totalCount () {
  		let count = 0
  		this.selectFoods.forEach((food) => {
  			count += food.count
  		})
  		return count
  	},
  	decPay () {
  		let diff = this.minPrice - this.totalPrice
  		if(diff === this.minPrice){
  			return `￥${this.minPrice}起送`
  		}else if(diff > 0){
  			return `还差${diff}起送`
  		}else{
  			return '去结算'
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.shopcart{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 48px;
		background-color: #ccc;
		z-index: 50;
		.content{
			display: flex;
			background-color: #141d27;
			color: rgba(255,255,255,0.4);
			.content-left{
				flex: 1;
				font-size: 0;
				.logo-wrapper{
					display: inline-block;
					position: relative;
					top: -10px;
					width: 56px;
					height: 56px;
					padding: 6px;
					box-sizing: border-box;
					margin: 0 12px;
					background-color: #141d27;
					border-radius: 50%;
					text-align: center;
					.logo{
						display: inline-block;
						width: 44px;
						height: 44px;
						font-size: 24px;
						color: rgba(255,255,255,0.4);
						background-color: #2b343c;
						&.hightlight{
							background-color: rgb(0,160,220);
							color: #fff;
						}
						border-radius: 50%;
						text-align: center;
						line-height: 44px;

					}
					.count{
						position: absolute;
						top: 0;
						right: 0;
						width: 24px;
						height: 16px;
						line-height: 16px;
						text-align: center;
						border-radius: 16px;
						font-size: 9px;
						font-weight: 700;
						color: #fff;
						background-color: rgb(240,20,20);
						box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
						&.hightlight{
							color: #fff;
						}
					}
				}
				.total{
					display: inline-block;
					vertical-align: top;
					margin: 12px;
					line-height: 24px;
					padding-right: 12px;
					box-sizing: border-box;
					border-right: 1px solid rgba(255, 255, 255, 0.1);
					font-size: 16px;
					font-weight: 700;
					&.hightlight{
						color: #fff;
					}
				}
				.desc{
					display: inline-block;
					vertical-align: top;
					margin: 12px 0 012px;
					font-size: 13px;
					line-height: 24px;
				}
			}
			.content-right{
				flex: 0 0 105px;
				width: 105px;
				.pay{
					height: 48px;
					line-height: 48px;
					text-align: center;
					font-size: 12px;
					font-weight: 700;
					background-color: #2b333b;
					&.enough{
						background-color: #00b43c;
						color: #fff;}
				}
			}
		}
	}
</style>
