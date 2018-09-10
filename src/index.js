import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

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

	return (
		<div>
			<div className="board-row">
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
			</div>
			<div className="board-row">
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</div>
			<div className="board-row">
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>
		</div>
	);
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [
				{
					squares: Array(9).fill(null)
				}
			],
			turn: "X",
			step: 0
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.step + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		const turn = this.state.turn;
		squares[i] = turn;
		this.setState({
			history: history.concat([{
				squares: squares
			}]),
			turn: turn === "X" ? "O" : "X",
			step: history.length
		});
	}

	jumpTo(step) {
		this.setState({
			turn: step % 2 === 0 ? 'X' : 'O',
			step: step
		});
	}

	render() {
		// Shallow copies of current state
		const history = this.state.history.slice();
		const turn = this.state.turn;
		const step = this.state.step;

		// Deciding which step to show
		const boardAtStep = history[step];
		const squares = boardAtStep.squares.slice();
		const winner = calculateWinner(squares);

		// A list of all the moves made so far
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
		
		let status = winner ? "Winner: " + winner : "Next player: " + turn;

		return (
			<div>
				<h2>Tic Tac Toe</h2>
				<div className="game">
					<div className="game-board">
						<Board
							squares={squares}
							onClick={(i) => this.handleClick(i)}
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

function calculateWinner(squares) {
 	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById("root")
);
