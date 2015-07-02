'use strict';
import _ from 'lodash';
import React, {Component} from "react";

export default
  class Hello extends Component {
    render () {
      let {name, links} = this.props;

      links = _.isArray(links) ? links : [];

      return (
        <div className="app">
          <h1>Hello! {name || "wakizaki"}</h1>

          <ul>{ _.map(links, (link) => <li>{link}</li>) }</ul>
        </div>
      );
    }
  }
