import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Homepage extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center bg-dark text-light p-3 mb-5">Hi, I'm Your Store App</h1>
        <div className="container">
        <p>If you want to add some products click this button below &#8595;</p>
          <Link to='/purchase' className="btn btn-lg btn-primary">Purchase products</Link>
          <br />
          <p className="mt-4">If you want to get report click this button below &#8595;</p>
          <Link to='/products' className="btn btn-lg btn-dark">Get all products</Link>
        </div>
      </div>
    )
  }
}
