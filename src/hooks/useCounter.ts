import { reactive, toRefs } from 'vue'

export function useCounter () {
	const state = reactive({
		count: 0
	})

	const increment = () => {
		state.count++
	}

	return {
		...toRefs(state),
		increment
	}
}