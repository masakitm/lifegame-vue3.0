<template>
  <LifeGame />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LifeGame from './components/LifeGame.vue'

export default defineComponent({
  name: 'App',
  components: {
    LifeGame
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
