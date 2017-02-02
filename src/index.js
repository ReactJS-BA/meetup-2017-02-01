import React from 'react';
import ReactDOM from 'react-dom/lib/ReactDOMFiber';
import ErrorBoundaries from './ErrorBoundaries';
import CoRoutines from './CoRoutines';
import CoRoutinesPinterest from './CoRoutinesPinterest';
import './index.css';

ReactDOM.render(
  <ErrorBoundaries />,
  // <CoRoutines />,
  // <CoRoutinesPinterest />,
  document.getElementById('root')
);
