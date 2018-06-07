import React from 'react';
import ReactDOM from 'react-dom';
import './../index.css';
import { Board } from './board';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history:    [{
                squares: Array(9).fill(null),
                row: 0,
                column: 0,
            }],
            stepNumber: 0,
            xIsNext: true,
            reversed: false,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                row: Math.floor((i / 3)),
                column: (i % 3),
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    reverseOrder() {
        if (this.state.reversed) {
            this.setState({ reversed: false });
        } else {
            this.setState({ reversed: true });
        }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let moveCount = 0;

        let moves = history.map((step, move) => {
            const desc = move ? 
                'Go to move #' + move :
                'Go to game start';
            if (desc === 'Go to game start') {
                return (
                    <li key={move} >
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            } else {
                moveCount++;
                return (
                    <li key={move} >
                        <p>Move Made: {(move % 2) ? 'X' : 'O'} at ({history[move].row}, {history[move].column})</p>
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            }
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            if (moveCount !== 9){
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            } else {
                status = 'Stalemate! Start a new game.';
            }
        }

        if (this.state.reversed) {
            moves = moves.reverse();
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <button onClick={() => this.reverseOrder()}>Reverse Order</button>
                    <div>{status}</div>
                    <ol>{moves}</ol>
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
        const mySq = document.getElementsByClassName('square');
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            mySq[a].style.background = 'lightgray';
            mySq[b].style.background = 'lightgray';
            mySq[c].style.background = 'lightgray';
            return squares[a];
        }
        if (mySq[a]) mySq[a].style.background = 'white';
        if (mySq[b]) mySq[b].style.background = 'white';
        if (mySq[c]) mySq[c].style.background = 'white';
    }
    return null;
}