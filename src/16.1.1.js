'use strict';
import $ from 'jquery';
import Backbone from 'backbone';
import React, {Component} from 'react';
import Hello from './components/Hello.jsx';


const links = [
  <a href='#/hello/morimoto'>森本さん</a>,
  <a href='#/hello/shibata'>柴田くん</a>
];

let Router = Backbone.Router.extend({
  routes: {
    "": "hello",
    "hello": "hello",
    "hello/:name": "hello"
  },

  hello: (name) =>
    React.render(<Hello name={name} links={links}/>, document.body)
});

$(() => {
  new Router();
  Backbone.history.start()
});
