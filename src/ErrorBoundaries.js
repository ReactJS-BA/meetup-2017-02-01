import React, { Component } from 'react';

class ComponentThatErrors extends Component {
  state = {
    willError: false
  };

  componentWillUnmount() {
    throw new Error('Error desde el unmount!');
  }

  render() {
    if (this.state.willError) {
      throw new Error('Error en el render!');
    }

    return (
      <button onClick={() => { this.setState({ willError: true }); }}>
        Cause error
      </button>
    );
  }
}

class CatchErrors extends Component {
  state = {
    lastErrorThrown: null
  };

  static defaultProps = {
    shouldCatch: true
  };

  unstable_handleError(e) {
    if (this.props.shouldCatch) {
      this.setState({ lastErrorThrown: e });
    } else {
      throw e;
    }
  }

  render() {
    if (this.state.lastErrorThrown) {
      return (
        <p>
          Caught by {this.props.name}: {this.state.lastErrorThrown.message}
        </p>
      );
    }

    return this.props.children;
  }
}


class ErrorBoundariesExample extends Component  {
  state = { showComponentThatErrors: true }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showComponentThatErrors: false });
    }, 5000);
  }

  render() {
    return (
      <CatchErrors name="Outer CatchErrors">
        <CatchErrors name="Inner CatchErrors" shouldCatch={false}>
          {this.state.showComponentThatErrors && <ComponentThatErrors />}
        </CatchErrors>
      </CatchErrors>
    );
  }
}

export default ErrorBoundariesExample;
