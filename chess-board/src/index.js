import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
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
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    let moves = history.map((step, move) => {
      let mvIndex = -1;
      step.squares.find((sq) => {
        mvIndex++;
        if (move === 0) { return sq != null; }
        return sq !== history[move-1].squares[mvIndex];
      });
      let desc;
      if (move === this.state.stepNumber) {
        desc = move ?
          <b>{'Go to move #' + move + ' (' + (mvIndex % 3 + 1) + ', ' + (~~(mvIndex / 3) + 1) + ')'}</b>:
          <b>{'Go to game start'}</b>; 
      }
      else {
        desc = move ?
          'Go to move #' + move + ' (' + (mvIndex % 3 + 1) + ', ' + (~~(mvIndex / 3) + 1) + ')':
          'Go to game start';
      }
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    
    let board;
    let status;

    if (history.length === 10 && this.state.stepNumber === 9) {
      status = 'CATS game!';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    board = <Board
      squares={current.squares}
      onClick={(i) => this.handleClick(i)}
    />

    return (
      <div className="game">
        <div className="game-board">
          {board}
        </div>
        <div className="game-info">
          <div>{status}</div>
          {moves}
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
