import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class AddProducts extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      price: '',
      date: '',
      currency: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();
    const data = {
      title: this.state.title,
      price: this.state.price,
      date: this.state.date,
      currency: this.state.currency
    }
    console.log(data)
    axios.post(' http://localhost:5000/products/purchase', data)
    this.setState({
      title: '',
      price: '',
      date: '',
      currency: ''
    })
  }

  render() {
    const { title, price, date, currency } = this.state
    return (
      <div>
        <h1 className="text-center bg-dark text-light p-3 mb-5">AddProducts</h1>

        <form className="container" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Select purchased product</label>
            <select
              className="form-control"
              id="title"
              name="title"
              value={title}
              onChange={this.onChange}
            >
              <option>Choose...</option>
              <option value="T-Shirt">T-Shirt</option>
              <option value="Clock">Clock</option>
              <option value="Bracelet">Bracelet</option>
              <option value="Ring">Ring</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price">Enter product price</label>
            <input type='number'
              className="form-control"
              id="price"
              name="price"
              min={0}
              value={price}
              onChange={this.onChange}
              autoComplete='of' />
          </div>
          <div className="form-group">
            <label htmlFor="date">Set the date</label>
            <input type="date"
              className="form-control"
              id="date"
              name="date"
              value={date}
              onChange={this.onChange} />

          </div>
          <div className="form-group">
            <label htmlFor="currency">Select product currency</label>
            <select
              className="form-control"
              name="currency"
              id="currency"
              value={currency}
              onChange={this.onChange}
            >
              <option>Choose...</option>
              <option value="UAH">UAH</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="PLN">PLN</option>
              <option value="GBP">GBR</option>
            </select>
          </div>
          <button type="submit" className="btn btn-lg btn-success" value="confirm">Confirm</button>
        </form>
        <div className="container mt-5">
          <Link to='/'>Back to Homepage</Link>
          <br />
          <Link to='/products'>Report</Link>
        </div>
      </div>
    )
  }
}
