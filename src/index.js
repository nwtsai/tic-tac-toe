import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const DIMENSION_MIN = 3;
const DIMENSION_MAX = 45;

function Square(props) {
	return (
		<button
			className="square"
			onClick={props.onClick}
		>
			{props.value}
		</button>
	);
}

function Board(props) {
	function renderSquare(i) {
		return (
			<Square
				value={props.squares[i]}
				onClick={props.onClick.bind(null, i)}
			/>
		);
	}

	var board = [];
	const dimension = props.dimension;
	for (var row = 0; row < dimension * dimension; row += dimension) {
		var boardRow = [];
		for (var col = row; col < row + dimension; col++) {
			boardRow.push(
				renderSquare(col)
			);
		}
		board.push(
			<div className="board-row">
				{boardRow}
			</div>
		);
	}

	return (
		<div>
			{board}
		</div>
	);
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dimension: DIMENSION_MIN,
			history: [
				{
					squares: Array(DIMENSION_MIN * DIMENSION_MIN).fill(null),
					winState: Array(DIMENSION_MIN * 2 + 2).fill(0),
				}
			],
			turn: "X",
			step: 0
		};
	}

	calculateWinner(dimension, winState) {
		for (var i = 0; i < winState.length; i++) {
			if (winState[i] === dimension) {
				return 'X';
			} else if (winState[i] === -1 * dimension) {
				return 'O';
			}
		}
		return null;
	}

	jumpTo(step) {
		this.setState({
			turn: step % 2 === 0 ? 'X' : 'O',
			step: step
		});
	}

	updateDimension(evt) {
		var dimension = Number(evt.target.value);
		this.setState({
			dimension: dimension,
			history: [
				{
					squares: Array(dimension * dimension).fill(null),
					winState: Array(dimension * 2 + 2).fill(0)
				}
			],
			turn: "X",
			step: 0
		});
	}

	updateWinState(i, dimension, turn, winState) {
		let row = Math.floor(i / dimension);
		let col = i % dimension;
		let diag1 = row === col;
		let diag2 = row + col === dimension - 1;

		let point = 0;
		if (turn === "X") {
			point = 1;
		} else if (turn === 'O') {
			point = -1;
		}
		winState[row] += point;
		winState[dimension + col] += point;
		if (diag1 === true) {
			winState[dimension * 2] += point;
		}
		if (diag2 === true) {
			winState[dimension * 2 + 1] += point;
		}
		return winState;
	}

	handleClick(i, dimension, history, turn, step, squares, winState) {
		history = history.slice(0, step + 1);
		if (this.calculateWinner(dimension, winState) || squares[i]) {
			return;
		}
		squares[i] = turn;
		this.setState({
			history: history.concat([{
				squares: squares,
				winState: this.updateWinState(i, dimension, turn, winState)
			}]),
			turn: turn === "X" ? "O" : "X",
			step: history.length
		});
	}

	render() {
		const dimension = this.state.dimension;
		const history = this.state.history.slice();
		const turn = this.state.turn;
		const step = this.state.step;

		// Showing the board state at a specified point in time
		const squares = history[step].squares.slice();
		const winState = history[step].winState.slice();

		// Defining the right game status
		const winner = this.calculateWinner(dimension, winState);
		const status = winner ? "Winner: " + winner : "Next player: " + turn;

		// Listing out all past moves
		const moves = history.map((board, step) => {
			const label = step ? "Go to move #" + step : "Go to game start";
			return (
				<li key={step}>
					<button onClick={() => this.jumpTo(step)}>
						{label}
					</button>
				</li>
			);
		});

		return (
			<div>
				<h1>Tic Tac Toe</h1>
				<div id="dimension-label">Dimension: {dimension}</div>
				<input
					value={dimension}
					onChange={(evt) => this.updateDimension(evt)}
					id="dimension"
					type="range"
					min={DIMENSION_MIN}
					max={DIMENSION_MAX}
				/>
				<div className="game">
					<div className="game-board">
						<Board
							dimension={dimension}
							squares={squares}
							onClick={(i) => this.handleClick(i, dimension, history, turn, step, squares, winState)}
						/>
					</div>
					<div className="game-info">
						<div>{status}</div>
						<ul>{moves}</ul>
					</div>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById("root")
);
