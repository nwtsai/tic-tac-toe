## Tic Tac Toe
A React web application that implements a customizable NxN game of Tic Tac Toe.

Features:
* Set a custom NxN size of the board
* Travel in time throughout the history of the current game
* Efficiently determine a winner with dynamic programming
	* BONUS: Determining a winner of an NxN Tic Tac Toe board is a common interview question
	* Theoretically, my application supports `N = [0, 2^53 - 1]`, the largest 64-bit floating point value that JavaScript can handle
	* I've limited the maximum dimension to 45 so that the board can fit on a standard screen
* Replay a specific set of moves
* Keep track of whose turn it is

## Screenshots
![3x3](https://i.imgur.com/0oCedwh.png)
![7x7](https://i.imgur.com/Qigqh8X.png)
![6x6](https://i.imgur.com/q7hbXDY.png)

## Dependencies
* react => `16.5.0`
* react-dom => `16.5.0`
* react-scripts => `1.1.5`
