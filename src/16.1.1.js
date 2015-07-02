'use strict';
import $ from 'jquery';
import Backbone from 'backbone';
import React, {Component} from 'react';

class Hello extends Component {
  render () {
    let {name} = this.props;

    return (
      <div className="app">
        <h1>Hello! {name || "wakizaki"}</h1>

        <ul>
          <li>
            <a href="#/hello/shibata">柴田くん</a>
          </li>
          <li>
            <a href="#/hello/morimoto">森本さん</a>
          </li>
        </ul>
      </div>
    );
  }
}

let Router = Backbone.Router.extend({
  routes: {
    "": "hello",
    "hello": "hello",
    "hello/:name": "hello"
  },
  hello: (name) => {
    React.render(
      <Hello name={name}/>,
      document.body
    );
  }
});

$(() => {
  new Router();
  Backbone.history.start()
});
