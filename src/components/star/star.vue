<template>
  <div class="star" :class="starType">
  	 <span class="star-item" v-for="starClass in starClasses" :class="starClass"></span>
  </div>
</template>

<script>
export default {
  name: 'star',
  props: ['size', 'score'],
  data () {
    return {
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    starClasses () {
      let classes = []
      let score = parseFloat(this.score)
      let len = Math.floor(score * 2) / 2
      let isDecical = len % 1 !== 0
      
      if (isDecical) {
      	for (let i = 0; i < Math.floor(len); i++){
      			classes.push('on')
      		}
      	classes.push('half')
      	for (let i = 0; i < 5-Math.ceil(len); i++){
      			classes.push('off')
      		}
      	}else{
      	for (let i = 0; i < len; i++){
      			classes.push('on')
      		}
      	for (let i = 0; i < 5 - len; i++){
      			classes.push('off')
      		}
      }
      return classes
    }
  }
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
	.star{
		font-size: 0;
		.star-item{
			display: inline-block;
			background-repeat: no-repeat;
		}
	}
	.star-48{
        .star-item{
			width: 20px;
			height: 20px;
			background-size: 20px 20px;
			margin-right: 22px;
			&:last-child{
				margin-right: 0;
			}
		}
		.on{
			.bg-image("star48_on")
		}
		.half{
			.bg-image("star48_half")
		}
		.off{
			.bg-image("star48_off")
		}
	}
	.star-36{
	    .star-item{
			width: 15px;
			height: 15px;
			background-size: 15px 15px;
			margin-right: 6px;
			&:last-child{
				margin-right: 0;
			}
		}
		.on{
			.bg-image("star36_on")
		}
		.half{
			.bg-image("star36_half")
		}
		.off{
			.bg-image("star36_off")
		}
	}
	.star-24{
	    .star-item{
			width: 10px;
			height: 10px;
			background-size: 10px 10px;
			margin-right: 3px;
			&:last-child{
				margin-right: 0;
			}
		}
		.on{
			.bg-image("star24_on")
		}
		.half{
			.bg-image("star24_half")
		}
		.off{
			.bg-image("star24_off")
		}
	}
</style>
