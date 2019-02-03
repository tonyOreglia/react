import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  let background = null;
  if (props.selected) {
    background = 'rgb(255, 246, 124)';
  }
  let button =
  <button className="light-square" onClick={props.onClick} style={{ background: background }}>
    {props.value}
  </button>
  let row = ~~(props.index / 8)
  if ((props.index%2 + (row%2))%2 !== 0) {
    button =
    <button className="dark-square" onClick={props.onClick} style={{ background: background }}>
      {props.value}
    </button>
  }
  return (button);
}

class Board extends React.Component {
  renderSquare(i) {
    let selected = false;
    if (i === this.props.selected) {
      selected = true;
    }
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        index={i}
        selected={selected}
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
      stepNumber: 0,
      selectedSq: null
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step
    });
  }

  handleClick(i) {
    this.setState({
      selectedSq: i
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            selected={this.state.selectedSq}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
