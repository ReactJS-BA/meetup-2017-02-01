import React, { Component } from 'react';
import { createCoroutine, createYield } from 'react-dom/lib/ReactCoroutine';

function Pin(props) {
  return createYield(
    { height: props.height + 10 },
    () => {
      return (
        <div
          style={{
            flexBasis: props.height,
            padding: 5,
            margin: 5,
            backgroundColor: props.height < 150 ? '#EEDDCC' : '#CCDDEE'
          }}
        >
          Pin ({props.height}px)
        </div>
      )
    }
  );
}

function Board(props) {
  return createCoroutine(
    props.children,
    (props, yields) => {
      let columnHeights = [0, 0, 0, 0];
      let columns = [[], [], [], []];

      yields.forEach((y) => {
        const columnIndex = columnHeights.indexOf(Math.min.apply(null, columnHeights));
        columnHeights[columnIndex] += y.props.height;
        columns[columnIndex].push(<y.continuation />);
      });

      return (
        <div style={{ display: 'flex' }}>
          {columns.map((els) => (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {els}
            </div>
          ))}
        </div>
      );
    },
    props
  )
}


class CoRoutinesPinterest extends Component  {
  state = {
    pins: []
  };

  componentDidMount() {
    setInterval(() => {
      this.setState((state) => ({
        pins: state.pins.concat(50 + Math.floor((Math.random() * 300)))
      }));
    }, 1000);
  }

  render() {
    return [
      <Board>
        {this.state.pins.map((height) => <Pin height={height} />)}
      </Board>
    ];
  }
}

export default CoRoutinesPinterest;
