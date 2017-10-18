<template>
  <div class="header">
    <div class="content-wrapper">
    	<div class="avatar">
    		<img width="64" height="64" :src="seller.avatar" >
    	</div>
    	<div class="content">
    		<div class="title">
    			<span class="brand"></span>
    			<span class="name">{{seller.name}}</span>
    		</div>
    		<div class="service">
    			{{seller.description}}/{{seller.deliveryTime}}分钟送达
    		</div>
    		<div v-if="seller.supports" class='supports'>
    			<span class="icon" :class="iconMap[seller.supports[0].type]"></span>
    			<span class="text">{{seller.supports[0].description}}</span>
    		</div>
    		<div v-if="seller.supports" class="count" @click = "detailShow = true">
    			<span class="length">{{seller.supports.length}}个</span>
    			<span class="ele-fontkeyboard_arrow_right"></span>
    		</div>
    	</div>
    </div>
    <div class="bulletin-wapper" @click="detailShow = true">
    	<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
		<span class="ele-fontkeyboard_arrow_right"></span>
    </div>
    <div class="background">
    	<img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
    <div class="detail clear" v-show="detailShow">
		<div class="detail-wrapper">
    		<div class="detail-main">
    			<h1 class="title">{{seller.name}}</h1>
    			<star :size="48" :score="seller.score" class="star"></star>
    			<div class="favorable">
    				<div class="line"></div>
    				<div class="title">优惠信息</div>
    				<div class="line"></div>
    			</div>
    			<ul class="favorableInfo" v-if="seller.supports">
    				<li class="favorable-item" v-for="(item,index) in seller.supports">
    					<span class="icon" :class="iconMap[seller.supports[index].type]"></span>
    					<span class="description">{{seller.supports[index].description}}</span>
    				</li>
    			</ul>
    			<div class="favorable">
    				<div class="line"></div>
    				<div class="title">商家公告</div>
    				<div class="line"></div>
    			</div>
    			<p class="bulletin">{{seller.bulletin}}</p>
    		</div>
    	</div>
    	<div class="detail-footer"><span class="ele-fontclose" @click="detailShow=false"></span></div>
    </div>
    </transition>
  </div>
</template>

<script>
import star from '@/components/star/star.vue'
export default {
  name: 'header',
  data () {
    return {
      iconMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      detailShow: false
    }
  },
  props: ['seller'],
  components: { star }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.bg-image(@url){
		background-image: url("@{url}@2x.png");
		@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
			background-image: url("@{url}@3x.png");
		}
	}
	.header{
		position: relative;
		text-align: left;
		overflow: hidden;
		color: #fff;
		background-color: rgba(7,17,27,0.4);
		.content-wrapper{
			position: relative;
			padding: 24px 12px 18px 24px;
			font-size: 0;
			& > div{
				display: inline-block;
				font-size: 12px;
                vertical-align: top;
			}
			.avatar{
				border-radius: 2px;
			}
			.content{
				margin: 2px 0 2px 16px;
				.title{
					font-size: 16px;
					font-weight: bold;
					line-height: 18px;
					.brand{
						display: inline-block;
						width: 30px;
						height: 18px;
						.bg-image("brand");
						background-size: 30px 18px;
						background-repeat: no-repeat;
					}
					.name{
						vertical-align: top;
						margin-left: 6px;
					}
				}
				.service{
					font-size: 12px;
					font-weight: 200;
					line-height: 12px;
					margin: 8px 0 10px 0;
					vertical-align: top;
				}
				.supports{
					font-size: 10px;
					font-weight: 200;
					line-height: 12px;
					.icon{
						display: inline-block;
						width: 12px;
						height: 12px;
						margin-right: 4px;
						background-size: 12px 12px;
						background-repeat: no-repeat;
						vertical-align: top;
					}
					.decrease{
						.bg-image("decrease_1");
					}
					.discount{
						.bg-image("discount_1");
					}
					.guarantee{
						.bg-image("guarantee_1");
					}
					.invoice{
						.bg-image("invoice_1");
					}
					.special{
						.bg-image("special_1");
					}
				}
				.count{
					position: absolute;
					height: 24px;
					right: 12px;
					bottom: 23px;
					border-radius: 14px;
					text-align: center;
					line-height: 24px;
					font-size: 10px;
					font-weight: 200;
					padding: 0 8px;
					background-color: rgba(0,0,0,0.2);
				}
				.ele-fontkeyboard_arrow_right{
					line-height: 24px;
				}
			}
		}
		.bulletin-wapper{
			position: relative;
			height: 28px;
			background-color: rgba(7,17,27,0.2);
			font-size: 10px;
			padding-left: 12px;
			padding-right: 22px;
			line-height: 28px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			.bulletin-title{
				display: inline-block;
				width: 22px;
				height: 12px;
				.bg-image("bulletin");
				background-size: 22px 12px;
				background-repeat: no-repeat;
				margin-right: 4px;
				margin-top: 8px;
				vertical-align: top;
		    }
		    .ele-fontkeyboard_arrow_right{
		    	display: block;
		    	position: absolute;
		    	right: 12px;
		    	bottom: 7px;
		    }
		
		}
		.background{
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			filter: blur(10px);
			z-index: -1;
		}
		.fade-enter-active, .fade-leave-active {
		  transition: opacity .5s
		}
		.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
		  opacity: 0
		}
		.detail{
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			overflow: auto;
			background-color: rgba(7,17,27,0.8);
			backdrop-filter: blur(10px);
			z-index: 200;
			.detail-wrapper{
				min-height: 100%;
				width: 100%;
				.detail-main{
					padding: 64px 36px;
					text-align: center;
					font-size: 16px;
					font-weight: 700;
					line-height: 16px;
					.title{
						
					}
					.star{
						margin: 16px 0 18px 0;
					}
					.favorable{
						display: flex;
						width: 100%;
						height: 16px;
						.line{
							position: relative;
							top: 8px;
							flex: 1;
							border-top: 1px solid rgba(255, 255, 255,0.2);

						}
						.title{
							font-weight: bold;
							font-size: 16px;
							margin: 0 12px 24px 12px;
						}
					}
					.favorableInfo{
						padding-top: 24px;
						text-align: left;
						margin: 0 12px 28px 12px;
						margin-bottom: 28px;
						.favorable-item{
							margin-bottom: 12px;
							font-size: 0;
							line-height: 12px;
							font-weight: 200;
							.icon{
								position: relative;
								display: inline-block;
								width: 16px;
								height: 16px;
								background-size: 16px 16px;
								background-repeat: no-repeat;
								top: 3px;
								margin-right: 6px;

							}
							.decrease{
							    .bg-image("decrease_2");
							}
							.discount{
								.bg-image("discount_2");
							}
							.guarantee{
								.bg-image("guarantee_2");
							}
							.invoice{
								.bg-image("invoice_2");
							}
							.special{
								.bg-image("special_2");
							}
							.description{
								display: inline-block;
								font-size: 12px;
							}
						}
					}
					.bulletin{
						font-size: 12px;
						font-weight: 200;
						line-height: 24px;
						margin: 24px 12px 0 12px;
						text-align: left;
					}
				}
			}
			.detail-footer{
				height: 32px;
				width: 32px;
				margin: -64px auto 0 auto;
				font-size: 32px;
			}


		}

	}
</style>
