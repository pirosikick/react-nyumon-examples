'use strict';
import React, {Component} from 'react';
import Router, {Route, DefaultRoute, NotFoundRoute, Link, RouteHandler} from 'react-router';

class Hello extends Component {
  render () {
    let {name} = this.props.params || {};

    return <h1>Hello! {name || "wakizaki"}</h1>;
  }
}

class NotFound extends Component {
  render () {
    return <h1>そんなやつはおらん！</h1>;
  }
}

class App extends Component {
  render () {
    return (
      <div>
        <RouteHandler/>

        <ul>
          <li><Link to="/hello/shibe">柴田さん</Link></li>
          <li><Link to="/hello/morimoto">森本さん</Link></li>
          <li><Link to="/yamada">山田さん</Link></li>
        </ul>
      </div>
    );
  }
}

const routes = (
  <Route handler={App}>
    <DefaultRoute handler={Hello}/>
    <Route path="/hello/:name" handler={Hello}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
