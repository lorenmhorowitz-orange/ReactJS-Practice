import React from 'react';
import ReactDOM from 'react-dom';
import './../index.css';
import { Square } from './square';

export class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]}
                onClick = { () => this.props.onClick(i) }
            />
        );
    }

    render() {
        let myRet = [];
        for (let row = 0; row < 3; row++) {
            let sub = [];
            for (let col = 0; col < 3; col++) {
                let entry = this.renderSquare(row * 3 + col);
                sub.push(entry);
            }
            myRet.push(<div className="board-row">{sub}</div>);
        }
        return (
            <div>{myRet}</div>
        );
    }
}