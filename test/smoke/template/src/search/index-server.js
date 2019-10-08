'use strict';

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './search.less';
// import logo from './images/logo.jpg';
// import '../../common';
// import {
//   a
// } from './tree-shaking';
const React = require('react');
const logo = require('./images/logo.jpg');
require('./search.less');



class Search extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      Text: null
    };
  }
  loadComponent() {
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default
      })
    });
  }
  render() {

    const {
      Text
    } = this.state;
    return <div class = "search-text" > {
      Text ? < Text / > : null
    }
    搜索文字的内容很少 < img src = {
      logo
    }
    onClick = {
      this.loadComponent.bind(this)
    }
    /> < /div > ;
  }
}

module.exports = < Search / > ;