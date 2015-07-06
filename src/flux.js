'use strict';
import React, {Component} from 'react';
import {Dispatcher} from 'flux';
import EventEmitter from 'wolfy87-eventemitter';

const dispatcher = new Dispatcher();

class CountStore extends EventEmitter {
  constructor (dispatcher, count = 0) {
    super();

    this.count = count;

    dispatcher.register(this.callback.bind(this));
  }

  callback (payload) {
    if (payload.actionType === 'increment') {
      this.count++;
      this.emitEvent('change');
    } else if (payload.actionType == 'decrement') {
      this.count--;
      this.emitEvent('change');
    }
  }

  addChangeListener (listener) {
    this.addListener('change', listener);
  }

  removeChangeListener (listener) {
    this.removeListener('change', listener);
  }
}

const countStore = new CountStore(dispatcher);

class Counter extends Component {
  constructor (props) {
    super(props);

    this.onPlus = props.onPlus.bind(this);
    this.onMinus = props.onMinus.bind(this);
  }

  render () {
    let {count} = this.props;

    return (
      <div>
        <p>now: {count}</p>
        <p>
          <button onClick={this.onPlus}>+</button>
          <button onClick={this.onMinus}>-</button>
        </p>
      </div>
    );
  }
}

class ControllerView extends Component {
  constructor (props) {
    super (props);

    this.store = props.store;
    this.dispatcher = props.dispatcher;

    this.state = { count: this.store.count };
    this._onChange = this.onChange.bind(this);
  }

  componentDidMount () {
    this.store.addChangeListener(this._onChange);
  }

  componentWillUnount () {
    this.store.removeChangeListener(this._onChange);
  }

  onChange () {
    this.setState({ count: this.store.count });
  }

  onPlus () {
    this.dispatcher.dispatch({ actionType: 'increment' });
  }

  onMinus () {
    this.dispatcher.dispatch({ actionType: 'decrement' });
  }

  render () {
    let {count} = this.state;

    return (
      <div>
        <h1>Counter App</h1>
        <Counter
          count={count}
          onPlus={this.onPlus.bind(this)}
          onMinus={this.onMinus.bind(this)}/>
      </div>
    );
  }
}

React.render(
  <ControllerView store={countStore} dispatcher={dispatcher}/>,
  document.body
);
