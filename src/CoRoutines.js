import React, { Component } from 'react';
import { createCoroutine, createYield } from 'react-dom/lib/ReactCoroutine';

function Item(props) {
  return createYield(
    { width: props.children.length },
    ({ isVertical }) => {
      return (
        <li
          style={{
            flex: 1,
            padding: 5,
            margin: 3,
            backgroundColor: isVertical ? '#EEDDCC' : '#CCDDEE'
          }}
        >
          {props.children}
        </li>
      )
    }
  );
}

function List(props) {
  return createCoroutine(
    props.children,
    (props, yields) => {
      let totalWidth = 0;

      yields.forEach(({ props }) => {
        totalWidth += props.width;
      });
      const isVertical = totalWidth > 20;

      return [
        <h1>{isVertical ? 'Vertical' : 'Horizontal'}</h1>,
        <ul
          style={{
            display: 'flex',
            flexDirection: isVertical ? 'column' : 'row',
            width: totalWidth * 20,
            listStyleType: 'none'
          }}
        >
          {yields.map((y) => (
            <y.continuation isVertical={isVertical} />
          ))}
        </ul>
      ]
    },
    props
  )
}


class CoRoutinesExample extends Component  {
  render() {
    return [
      <List>
        <Item>Un</Item>
        <Item>Par</Item>
        <Item>De</Item>
        <Item>Items</Item>
      </List>,
      <List>
        <Item>Una</Item>
        <Item>Larga</Item>
        <Item>Lista</Item>
        <Item>De</Item>
        <Item>Items</Item>
        <Item>Por</Item>
        <Item>Aqui</Item>
      </List>
    ];
  }
}

export default CoRoutinesExample;
