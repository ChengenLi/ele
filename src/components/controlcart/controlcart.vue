<template>
  <div class="controlcart">
  	<transition>
  		<div class="remove" @click="removeFoods" v-show="food.count>0">
  			<transition>
  				<span class="ele-fontremove_circle_outline icon" v-show="food.count>0"></span>
  			</transition>
  		</div>
  	</transition> 	
  	<div class="count" v-show="food.count>0">{{food.count}}</div>
  	<div class="add ele-fontadd_circle" @click="addFoods" ></div>

  </div>
</template>

<script>
import vue from 'vue'
export default {
  name: 'controlcart',
  props: ['food', 'dropEvent'],
  created () {
  	vue.set(this.food,'count',0)
  },
  methods: {
  	addFoods (event) {
  		if(!event._constructed){
  			return
  		}
  		this.food.count++

  		this.dropEvent.$emit('drop', event.target)
  	},
  	removeFoods (event) {
  		if(!event._constructed){
  			return
  		}
  		this.food.count--
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.controlcart{
		font-size: 0px;
		.remove,.add{
			display: inline-block;
			padding: 6px;
			color: rgb(0,160,220);
			font-size: 24px;
			line-height: 24px;
		}
		.count{
			display: inline-block;
			vertical-align: top;
			width: 12px;
			padding-top: 6px;
			line-height: 24px;
			text-align: center;
			font-size: 10px;
			color: rgb(147,153,159);
		}
		.remove{
			&.v-enter-active{
				transition: all .4s linear;
				}
				&.v-leave-active {
				  transition: all .4s linear;
				}
				&.v-enter, &.v-leave-to{
				  opacity: 0;
				  transform: translate(24px);
				}
			.icon{
				display: inline-block;
				&.v-enter-active{
				transition: all .5s linear;
				}
				&.v-leave-active {
				  transition: all .5s linear;
				}
				&.v-enter , &.v-leave-to{
				  opacity: 0;
				  transform: rotate(180deg);
				}

			}
		}
		
	}
</style>
