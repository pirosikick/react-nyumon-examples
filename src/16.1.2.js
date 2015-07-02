'use strict';
import $ from 'jquery';
import React, {Component} from 'react';
import Aviator from 'aviator';
import Hello from './components/Hello.jsx';

Aviator.pushStateEnabled = false;
Aviator.root = location.pathname;

const links = [
  <a className="navigate" href={Aviator.hrefFor('/hello/morimoto')}>森本さん</a>,
  <a className="navigate" href={Aviator.hrefFor('/hello/shibata')}>柴田くん</a>
];

const RouteTraget = {
  hello: (req) => {
    React.render(<Hello name={req.params.name} links={links}/>, document.body);
  }
}

Aviator.setRoutes({
  target: RouteTraget,
  '/': 'hello',
  '/hello/:name': 'hello'
});

$(() => {
  Aviator.dispatch()
});
