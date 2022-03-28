/* eslint-disable react/jsx-no-bind */
import React from 'react';

import Square from './Square';
export default class Board extends React.Component {
    renderSquare(i) {
        const wins = this.props.wins
        const isArray = Array.isArray(wins)
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            className={isArray && wins.includes(i) ? 'win-square' : ''}
        />;
    }
    render() {
        let element = new Array(this.props.n).fill(0).map((el, i) => {
            return (
                <div className="board-row" style={}>
                    {new Array(this.props.n).fill(0).map((e, j) => (this.renderSquare(i * 3 + j)))}
                </div>
            )
        })
        return (
            <div>
                {element}
            </div>
        );
    }
}