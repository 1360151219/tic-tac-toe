import React from 'react';

import Board from './Board';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                row: -1,
                col: -1
            }],
            isXNext: true,
            index: 0
        };
        this.handleClick = this.handleClick.bind(this)
        this.jumpTo = this.jumpTo.bind(this)
    }
    handleClick(i) {
        const his = this.state.history.slice(0, this.state.index + 1)
        const newSquare = his[his.length - 1].squares.slice()
        if (calculateWinner(newSquare)?.winner || newSquare[i]) return
        newSquare[i] = this.state.isXNext ? 'X' : 'O'
        this.setState({
            history: his.concat([{ squares: newSquare, row: Math.floor(i / 3), col: i % 3 }]),
            isXNext: !this.state.isXNext,
            index: his.length
        })

    }
    jumpTo(move) {
        this.setState({
            index: move,
            isXNext: !(move & 1)
        })
    }
    render() {
        const his = this.state.history
        // 渲染到
        const cur = his[this.state.index]
        const ans = calculateWinner(cur.squares)
        const winner = ans?.winner
        const winIdxs = ans?.idxs
        let status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
        if (winner) {
            status = 'Winner is ' + winner
        }
        else if (!winner && this.state.index === 9) {
            status = 'Its a tie.'
        }
        // 撤回
        let active = 'active'
        let moves = his.map((step, move) => {
            let desc = move ? 'Go to move #' + move : 'Go to game start#'
            return (
                <li className={this.state.index === move ? active : ''} key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>{` {${step.row},${step.col}}`}
                </li>
            )
        })

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={cur.squares} onClick={this.handleClick} wins={winIdxs} n={3} />
                </div>
                <div className="game-info">
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
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], idxs: [a, b, c] };
        }
    }
    return null;
}