import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ProductsTable, DeleteDate } from './'

export default class Report extends Component {
  constructor() {
    super();
    this.state = {
      report: '',
      products: {},
      opened: false,
      date: '',
      year: '2019',
      years: [],
      currency: '',
      currencys: {}
    }
    this.report = this.report.bind(this);
    this.handleDeleteForm = this.handleDeleteForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteByDate = this.deleteByDate.bind(this);
  }

  async componentDidMount() {
    const yearArr = [];
    let date = new Date()
    let yearEnd = date.getFullYear() + 50;
    // endpoiunt of the last year will always increase
    for (let i = 2010; i <= yearEnd; i++) {
      yearArr.push(i.toString())
    }
    const currencySymbols = await axios('http://data.fixer.io/api/symbols?access_key=6510a24035a03dfffee8032a766089b0')
    this.setState({
      years: yearArr,
      currencys: currencySymbols.data.symbols
    })
  }

  async report(e) {
    e.preventDefault();
    let val = e.target.value;
    let year = this.state.year;
    let currency = this.state.currency;
    let url = '';
    let dataValue = '';
    if (val === 'all') {
      url = 'http://localhost:5000/products';
    } else {
      url = `http://localhost:5000/products/prod=${year}&curr=${currency}`;
      dataValue = {
        year: this.state.year,
        currency: this.state.currency
      }
    }
    const data = await axios({
      method: 'GET',
      url: url,
      data: dataValue
    }).then(function (response) {
      return response.data
    }).catch(function (error) {
      console.log(error)
    })

    if (typeof data === 'number') {
      this.setState({
        report: data.toFixed(2)
      })
    }
    if (typeof data === 'object') {
      this.setState({
        products: data
      })
    }
  }

  async deleteByDate(e) {
    e.preventDefault();
    let date = this.state.date;
    const data = await axios({
      method: 'DELETE',
      url: 'http://localhost:5000/products/delete',
      data: {
        date: date
      }
    }).then(function (response) {
      return response.data
    }).catch(function (error) {
      console.log(error)
    })

    this.setState({
      products: data
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleDeleteForm() {
    this.setState({
      opened: !this.state.opened
    })
  }

  render() {
    const { report,
            products,
            opened,
            year,
            years,
            currency,
            currencys } = this.state;
console.log(this.state)
    return (
      <div className="d-flex flex-column" style={{height: '100vh'}}>
        <h1 className="text-center bg-dark text-light p-3 mb-5">Report page</h1>
        <div className="container">
          <button type="button" onClick={this.report} value="all" className="btn btn-success mr-2">Get all products</button>
          <div className="btn-group btn-group-sm ml-3">
            <div className="input-group-prepend">
              <select name="year" onChange={this.handleChange}>
                <option value=''>Year...</option>
                {years.map((el, i) => <option key={i}>{el}</option>)}
              </select>
            </div>
            <div className="input-group-prepend">
              <select name="currency" onChange={this.handleChange}>
                <option value=''>Currency...</option>
                {Object.keys(currencys).map(el => <option key={el} title={currencys[el]}>{el}</option>)}
              </select>
            </div>
            <input type="button" onClick={this.report} value="Report" className="btn btn-dark" />
            <span className="px-1 font-weight-bold">&#42;</span>
          </div>
        </div>
        {!Object.keys(products).length ? null : <ProductsTable data={products} />}
        {report === '' ? null : <h2 className="container mt-3">Your purchase in {year} is {report}{currency === '' ? 'UAH' : currency}</h2>}
        {!Object.keys(products).length ? null :
          <div className="container mt-4">
            <button type="button" onClick={this.handleDeleteForm} className="btn btn-light">Delete by Date</button>
            {!opened ? null : <DeleteDate toggleForm={this.handleDeleteForm} submit={this.deleteByDate} change={this.handleChange} />}
          </div>}
        <div className="container mt-5">
          <Link to='/'>Back to HomePage</Link>
          <br />
          <Link to='/purchase'>Add more products...</Link>
        </div>
        <div className="container mt-auto mb-4">
          <span className="px-1 font-weight-bold">&#42;</span>
          <span>Feel free to choose the year and currency than press Report button,<br />
            if you don't, the report will be by the present year and UAH currency)</span>
        </div>
      </div>
    )
  }
}
