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
      currency: '',
      currencys: {},
      empty: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  async componentDidMount() {
    const data = await axios('http://data.fixer.io/api/symbols?access_key=6510a24035a03dfffee8032a766089b0')
    this.setState({
      currencys: data.data.symbols
    })
  }

  close() {
    this.setState({
      empty: !this.state.empty
    })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();
    const { title, price, date, currency } = this.state;
    //validation if user leave empty fields in form
    if (title === '' || price === '' || date === '' || currency === '') {
      this.setState({
        empty: true
      })
      return
    }

    const data = {
      title: title,
      price: price,
      date: date,
      currency: currency
    }
    console.log(data)
    axios.post(' http://localhost:5000/products/purchase', data)
    this.setState({
      title: '',
      price: '',
      date: '',
      currency: '',
      empty: false
    })
  }

  render() {
    const { title, price, date, currency, currencys, empty } = this.state
    return (
      <div>
        <h1 className="text-center bg-dark text-light p-3 mb-5">AddProducts</h1>

        {empty ? <div className="w-50 m-auto">
          <button type="button" className="close" aria-label="Close" onClick={this.close}>
            <span aria-hidden="true">&times;</span>
          </button>
          <p className="text-danger text-center">All fields must be filled in</p>
        </div> : null}
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
              {Object.keys(currencys).map((el,i)=><option key={i} title={currencys[el]}>{el}</option>)}
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
