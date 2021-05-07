<template>
		<div class="lifegame">
			<div class="board">
				<div 
					v-for="(row, i) in board"
					:key="i"
					class="row"
				>
					<Cell
						v-for="cell in row"
						:key="cell.cellId"
						:live="cell.live"
					/>
				</div>
			</div>
			<button @click="start">start</button>
			<button @click="update">update</button>
			<button @click="init">reset</button>
		</div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import Cell from './Cell.vue'
import { useBoard } from '../hooks/useBoard'

export default defineComponent({
	components: {
		Cell
	},
	setup() {
		const { board, init, updateBoard, calcNextBoard } = useBoard({ cells: 32 })

		const update = () => {
			updateBoard(calcNextBoard())
		}

		const start = () => {
			setInterval(update, 200)
		}

		onMounted(() => {
			init()
		})

		return {
			board,
			init,
			update,
			start
		}
	},
})
</script>

<style scoped>
.row {
	display: flex;
}
</style>