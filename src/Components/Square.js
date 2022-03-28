/* eslint-disable react/jsx-no-bind */
import React from 'react';

export default class Square extends React.Component {
    render() {
        const className = `square ${this.props.className}`;
        return (
            <button
                className={className}
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}