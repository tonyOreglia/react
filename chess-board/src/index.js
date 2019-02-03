import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  let button = <button className="light-square" onClick={props.onClick}>
    {props.value}
  </button>
  let row = ~~(props.index / 8)
  if ((props.index%2 + (row%2))%2 !== 0) {
    button = <button className="dark-square" onClick={props.onClick}>
      {props.value}
    </button>
  }
  return (button);
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        index={i}
      />
    );
  }

  render() {
    let sqs;
    let rows = [];
    for (let i = 0; i < 8; i++) {
      sqs = [];
      for (let j = 0; j < 8; j++) {
        sqs.push(this.renderSquare(j + i*8));
      }
      rows.push(
      <div className="board-row">
        {sqs}
      </div>
      )
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    const blackStartingPos = [
      '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
      '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟']
    const whiteStartingPos = [
      '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
      '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
    this.state = {
      history: [{
        squares: blackStartingPos.concat(Array(32).fill(null), whiteStartingPos)
      }],
      stepNumber: 0
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step
    });
  }

  handleClick(i) {
    return;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    let board;

    board = <Board
      squares={current.squares}
      onClick={(i) => this.handleClick(i)}
    />

    return (
      <div className="game">
        <div className="game-board">
          {board}
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
