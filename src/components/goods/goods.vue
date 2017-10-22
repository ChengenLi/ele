<template>
  <div class="goods">
  	<div class="menu-wrapper" ref="menuWrapper">
		<ul >
			<li class="menu-item " v-for="(item, index) in goods" :class="{'current': index === currentIndex }" @click="selectMenu(index,$event)">
				<div class=" border-1px"><span class="text"><span class="icon" v-if="item.type >= 0" :class="iconMap[item.type]"></span>{{item.name}}</span></div>
			</li>
		</ul>
	</div>
  	<div class="food-wrapper" ref="foodWrapper">
  		<ul >
  			<li class="food-list border-1px food-item-hook " v-for="item in goods">
  				<h1 class="title">{{item.name}}</h1>
				<div class="food-item" v-for="food in item.foods">
					<div class="img" ><img :src="food.icon" width="57" heigth="57"></div>
					<div class="info">
						<h2 class="name">{{food.name}}</h2>
						<div class="p-warpper"><p class="description">{{food.description}}</p></div>
						<p class="extra">
							<span class="count">月售{{food.sellCount}}份</span>
							<span class="rating">好评率{{food.rating}}%</span>
						</p>
						<span class="price">￥{{food.price}}</span><span class="oldPrice" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="controlcart-wrapper">
						<controlcart :food="food" :dropEvent="dropEvent"></controlcart>
					</div>
  				</div>
  			</li>
  		</ul>
  	</div>
  	<shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods" :dropEvent="dropEvent" @clear="clear"></shopcart>
  </div>
</template>

<script>
const ERROK = 0
import BScroll from "better-scroll"
import shopcart from "../shopcart/shopcart.vue" 
import controlcart from "../controlcart/controlcart.vue"
import vue from "vue"
var dropEvent = new vue()
export default {
  name: 'goods',
  props: ['seller'],
  components: {shopcart,controlcart},
  data () {
  	return {
  		goods: [],
  		iconMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
  		foodsHeightList: [],
  		scrollY: 0,
  		dropEvent: dropEvent
  	}
  },
  created () {
  	this.$http.get('/api/goods').then((response) => {
  		response = response.data
  		if(response.errno === ERROK){
  			this.goods = response.data
  		}

	this.$nextTick(() => {
		this._initScroll()
		this.getFoodItemHeight()
	})
  		
  	})
  },
  computed: {
  	currentIndex () {
  		for(let i = 0; i < this.foodsHeightList.length; i++){
  			let height1 = this.foodsHeightList[i]
  			let height2 = this.foodsHeightList[i + 1]
  			if(!height2 || (height1 <= this.scrollY && this.scrollY < height2)){
  				return i
  			}
  		}
  		return 0
  	},
  	selectFoods () {
  		let foodsList = []
  		this.goods.forEach((foods) =>{
  			foods.foods.forEach((food) => {
  				if(food.count){
  					foodsList.push(food)
  				}
  			})
  		})
  		return foodsList
  	}
  },
  methods: {
  	_initScroll () {
  		this.menuScroll = new BScroll(this.$refs.menuWrapper,{ click:true})
  		this.foodScroll = new BScroll(this.$refs.foodWrapper,{
  			probeType: 3,
  			click: true
  		})

  		this.foodScroll.on('scroll', (pos) => {
  			this.scrollY = Math.abs(Math.round(pos.y))
  		})
  	},

    getFoodItemHeight () {
    	let itemList = this.$refs.foodWrapper.getElementsByClassName('food-item-hook')
    	let height = 0
    	this.foodsHeightList.push(height)

    	for(let i = 0; i < itemList.length; i++){
    		height += itemList[i].clientHeight
    		this.foodsHeightList.push(height)
    	}
    },

    selectMenu (index,event) {
    	if(!event._constructed){
    		return
    	}

    	let foodList = this.$refs.foodWrapper.getElementsByClassName('food-item-hook')
    	let el = foodList[index]
    	this.foodScroll.scrollToElement(el,300)
    },

    clear () {
    	this.goods.forEach((foods) =>{
  			foods.foods.forEach((food) => {
  				if(food.count){
  					food.count = 0
  				}
  			})
  		})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

@import "../../common/less/mixin.less";

.bg-image(@url){
		background-image: url("@{url}@2x.png");
		@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
			background-image: url("@{url}@3x.png");
		}
	}

	.goods{
		display: flex;
		position: absolute;
		width: 100%;
		top: 174px;
		bottom: 46px;
		overflow: hidden;
		.menu-wrapper{
			flex: 0 0 80px;
			width: 80px;
			background-color: #f3f5f7;
			.menu-item{
				width: 56px;
				height: 54px;
				font-size: 12px;
				line-height: 54px;
				font-weight: 200;
				padding: 0 12px;
				.border-1px{
					.border-1px(rgba(7,17,27,0.1));
				}
				.text{
					display: inline-block;
					line-height: 14px;
					vertical-align: middle;
				}
				.icon{
						display: inline-block;
						position: relative;
						top: 1px;
						width: 12px;
						height: 12px;
						margin-right: 4px;
						background-size: 12px 12px;
					}
				.decrease{
						.bg-image("decrease_3");
					}
					.discount{
						.bg-image("discount_3");
					}
					.guarantee{
						.bg-image("guarantee_3");
					}
					.invoice{
						.bg-image("invoice_3");
					}
					.special{
						.bg-image("special_3");
					}
			}
			.current{
				background-color: #fff;
				font-weight: 700;
				color: rgb(7,17,27);
				.border-1px{
					.border-1px(rgba(7,17,27,0));
				}
			}
		}
		.food-wrapper{
			flex: 1;
			.food-list{
				.title{
					padding-left: 14px;
					height: 26px;
					line-height: 26px;
					border-left: 2px solid #d9dde1;
					font-size: 12px;
					color: rgb(147,153,159);
					background-color: #f3f5f7;
				}
				.food-item{
					margin: 18px;
					font-size: 0;
					position: relative;
					.border-1px(rgba(7,17,27,0.1));
					& > div{
						display: inline-block;
					}
					.img{
						width: 57px;
						height: 57px;
					}
					.info{
						vertical-align: top;
						margin-left: 10px;
						padding-bottom: 18px;
						.name{
							font-size: 14px;
							color: rgb(7,17,27);
							line-height: 14px;
							margin-top: 4px;
						}
						.p-warpper{
							width: 150px;
						}
						.description,.extra{
							font-size: 10px;
							color: rgb(147,153,159);
							line-height: 10px;
							margin-top: 8px;
						}
						.description{
							line-height: 12px;
						}
						.price{
							font-size: 14px;
							color: rgb(240,20,20);
							line-height: 24px;
						}
						.oldPrice{
								font-size: 10px;
								color: rgb(147,153,159);
								margin-left: 8px;
								text-decoration: line-through;
							}
					}
					.controlcart-wrapper{
						position: absolute;
						right: 0;
						bottom: 12px;
					}
				}
			}
		}
	}
</style>
