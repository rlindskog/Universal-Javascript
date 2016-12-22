import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Universal React Starter</h1>
        <ul role="nav">
          <li><Link to="/" onlyActiveOnIndex activeClassName="active">Home</Link></li>
          <li><Link to="/about" activeClassName="active">About</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
