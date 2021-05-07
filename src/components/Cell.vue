<template>
	<div 
		class="cell"
		:class="live"
	>
	</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		live: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		return {
			live: props.live && 'live'
		}
	},
})
</script>

<style scoped>
.cell {
	width: 1rem;
	height: 1rem;
}

.live {
	background: #333;
}
</style>
