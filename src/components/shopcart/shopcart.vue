<template>
  <div class="shopcart">
	<div class="content" @click = "show = !show">
	  	<div class="content-left">
	  		<div class="logo-wrapper">
	  			<div class="logo" :class="{'hightlight':totalCount>0}">
			  		<span class="ele-fontshopping_cart"></span>
		  		</div>
		  		<div class="count" v-if="totalCount>0">{{totalCount}}</div>
		  		<transition v-on:before-enter="beforeEnter2" v-on:enter="enter2" name="wrapperDrop">	
			  		<div class="ball-wrapper"  v-show="ballShow">
			  			<transition v-on:before-enter="beforeEnter1" v-on:enter="enter1" name="ballDrop">	
			  				<div class="ball" v-show="ballShow" ></div>
			  			</transition>
			  		</div>
		  		</transition>
		  	</div>
	  		<div class="total" :class="{'hightlight':totalCount>0}">￥{{totalPrice}}</div>
	  		<div class="desc">另需配送费{{deliveryPrice}}元</div>
	  	</div>
	  	<div class="content-right">
	  		<div class="pay" :class="{'enough': decPay==='去结算'}">{{decPay}}</div>
	  	</div>
  	</div>
  	<transition name="slider">
  	<div class="shopcart-list-wrapper" v-show="listShow">
	  		<div class="header">
	  			<span class="name">购物车</span>
	  			<span class="clear" @click="clearShopcart">清空</span>
	  		</div>
			<div class="shopcart-list" ref="shopcartList" >
				<ul>
					<li class="list-item" v-for="food in selectFoods">
						<div class="name">{{food.name}}</div>
						<div class="price">￥{{food.price}}</div>
						<div class="shopcartcontrol-wrapper">
							<controlcart :food="food" :dropEvent="dropEvent"></controlcart>
						</div>
					</li>
				</ul>
			</div>
			<div class="list-bottom"></div>
	  </div>
	  </transition>
  </div>
</template>

<script>
import controlcart from "../controlcart/controlcart.vue"
import BScroll from "better-scroll"
export default {
  name: 'shopcart',
  props: ['minPrice','deliveryPrice','selectFoods', 'dropEvent'],
  components: {controlcart},
  data () {
  	return {
  		ballShow: false,
  		x: 0,
  		y: 0,
  		winHeight: 0,
  		show:　false
  	}
  },
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
  	},
  	listShow () {
  		if (this.show && this.selectFoods.length > 0) {
  			this.$nextTick(() => {
  				if(!this.scroll){
  				this.scroll = new BScroll(this.$refs.shopcartList,{click:true})
  				}else{
  				this.scroll.refresh()
  				}
  			})
  			return true
  		}else if(this.show){
  			this.show = false
  			return false
  		}else{
  			return false
  		}
  	}
  },
  mounted () {
  		if (window.innerHeight){
			this.winHeight = window.innerHeight
		}
		else if ((document.body) && (document.body.clientHeight)){
			this.winHeight = document.body.clientHeight
		}
  		this.dropEvent.$on('drop',(el) => {
  			this.y = -(this.winHeight-el.getBoundingClientRect().top - 22 - 32)
  			this.x = el.getBoundingClientRect().left - 32
  			this.ballShow = !this.ballShow
  		})
  },
  methods: {
  	beforeEnter1 (el) {
  		el.style.webkitTransform = `translate(${this.x}px,0)`
  		el.style.transform = `translate(${this.x}px,0)`
  		},
  	enter1 (el, done) {
  		let rf = el.offsetHeight
  		el.style.webkitTransform = 'translate(0, 0)'
  		el.style.transform = 'translate(0, 0)'
  		window.setTimeout(() => {
  			this.ballShow = !this.ballShow
  		}, 400)
  	},
  	beforeEnter2 (el) {
  		el.style.webkitTransform = `translate(0, ${this.y}px)`
  		el.style.transform = `translate(0, ${this.y}px)`
  		},
  	enter2 (el, done) {
  		let rf = el.offsetHeight
  		el.style.webkitTransform = 'translate(0, 0)'
  		el.style.transform = 'translate(0, 0)'
  	},
  	clearShopcart () {
  		this.$emit('clear')
  	}
  }
}
</script>

<style lang="less">
	@import "../../common/less/mixin.less";

	.shopcart{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 48px;
		background-color: #ccc;
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
					.ball-wrapper{
						position: fixed;
						left: 32px;
						bottom: 22px;
						z-index: 200;
						&.wrapperDrop-enter-active{
							transition: all .4s cubic-bezier(.36,-0.63,.85,.57);
						}
						.ball{
							width: 16px;
							height: 16px;
							border-radius: 50%;
							background-color: rgb(0,160,220);
							&.ballDrop-enter-active{
								transition: all .4s linear ;
							}
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
		.shopcart-list-wrapper{
			position: absolute;
			width: 100%;
			left: 0;
			bottom: 0;
			z-index: -1;
			&.slider-enter-active, &.slider-leave-active{
				transition: all .4s linear;
			}
			&.slider-enter, &.slider-leave-to{
				transform: translateY(100%);
			}
			.header{
				height: 40px;
				width: 100%;
				background-color: #f3f5f7;
				border-bottom: 1px solid rgba(7,17,27,0.1);
				.name{
					font-size: 14px;
					line-height: 40px;
					font-weight: 200;
					color: rgb(7,17,27);
					padding-left: 18px;
				}
				.clear{
					position: absolute;
					font-size: 12px;
					line-height: 40px;
					color: rgb(0,160,220);
					right: 18px;
				}
			}
			.shopcart-list{
				max-height: 205px;
				background-color: #fff;
				overflow: hidden;
				.list-item{
					height: 48px;
					position: relative;
					margin: 0 18px;
					&:last-child{
						margin-bottom: 1px;
					}
					.border-1px(rgba(7,17,27,0.1));
					.name{
						font-size: 14px;
						line-height: 24px;
						color: rgb(7,17,27);
						padding: 12px 0;
					}
					.price{
						position: absolute;
						font-weight: 700;
						font-size: 14px;
						color: rgb(240,20,20);
						line-height: 24px;
						right: 90px;
						top: 12px;
					}
					.shopcartcontrol-wrapper{
						position: absolute;
						right: 0;
						top: 7px;
						border-bottom: 0;

					}
				}
			}
			.list-bottom{
				height: 60px;
				width: 100%;
				background-color: #fff;
			}
		}
	}
</style>
