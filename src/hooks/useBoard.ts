import { reactive, toRefs } from 'vue'

// 型定義
type Args = {
	cells?: number,
	threshould?: number,
	interval?: number
}
type Row = Array<{ live: boolean, cellId: string }>
type Board = Row[]
type State = { board: Board, id: number }

// hooks
export function useBoard (args: Args) {
	// 状態
	const state: State = reactive({
		board: [],
		id: 0
	})

	let timer: number = 0;

	// state更新関数
	const updateBoard = (board: Board) => {
		state.board = board
	}

	// 引数展開
	const cells = (args && args.cells) ? args.cells : 8
	const threshould = (args && args.threshould) ? args.threshould : 0.2
	const interval = (args && args.interval) ? args.interval : 200

	// 機能系
	const createRow = (liveThreshould: number): Row => {
		const row = []

		for (let i = 0; i < cells; i++) {
			const live = Math.random() < (liveThreshould || 1)

			row.push({
				cellId: `cell-${state.id++}`,
				live
			})
		}

		return row
	}

	const createBoard = (): Board => {
		const board = []

		for (let i = 0; i < cells; i++) {
			board.push(createRow(threshould))
		}
	
		return board
	}

	const check = (row: number, cell: number) => {
		if (state.board[row] && state.board[row][cell]) {
			return state.board[row][cell].live
		}

		return undefined
	}

	const countLivingNeighbors = (rowIndex: number, cellIndex: number) => {
		return [
			check(rowIndex - 1, cellIndex - 1),
			check(rowIndex - 1, cellIndex),
			check(rowIndex - 1, cellIndex + 1),
			check(rowIndex, cellIndex - 1),
			check(rowIndex, cellIndex + 1),
			check(rowIndex + 1, cellIndex - 1),
			check(rowIndex + 1, cellIndex),
			check(rowIndex + 1, cellIndex + 1)
		].filter(live => live === true).length
	}

	const checkNextLive = (current: boolean, neighborLives: number) => {
		if (current && neighborLives === 2) {
			return true
		}

		if (neighborLives === 3) {
			return true
		}

		return false
	}

	const calcNextBoard = (): Board => {
		const board = createBoard()

		for (let i = 0; i < cells; i++) {
			for (let j = 0; j < cells; j++) {
				board[i][j] = { 
					...board[i][j],
					live: checkNextLive(state.board[i][j].live, countLivingNeighbors(i, j))
				} 
			}
		}

		return board
	}

	// 操作系
	const init = () => {
		updateBoard(createBoard())
	}

	const update = () => {
		updateBoard(calcNextBoard())
	}

	const start = () => {
		timer = setInterval(update, interval)
	}

	const stop = () => {
		clearInterval(timer)
	}

	const reset = () => {
		stop()
		init()
	}

	return {
		...toRefs(state),
		init,
		reset,
		start,
		stop
	}
}