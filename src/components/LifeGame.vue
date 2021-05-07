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

      <div class="buttons">
        <button @click="start">start</button>
        <button @click="stop">stop</button>
        <button @click="reset">reset</button>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import Cell from './Cell.vue'
import { useBoard } from '../hooks/useBoard'

export default defineComponent({
  components: {
    Cell
  },
  setup() {
    const { board, init, reset, start } = useBoard({ cells: 32 })

    onMounted(() => {
      init()
    })

    return {
      board,
      reset,
      start,
      stop
    }
  },
})
</script>

<style scoped>
.row {
  display: flex;
  justify-content: center;
}

.buttons {
  text-align: center;
}
</style>