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
      year: '2019'
    }
    this.report = this.report.bind(this);
    this.handleDeleteForm = this.handleDeleteForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteByDate = this.deleteByDate.bind(this);
  }

  async report(e) {
    e.preventDefault();
    let val = e.target.value;
    let year = this.state.year;
    let url = '';
    if(val=== 'all'){
      url = `http://localhost:5000/products/prod=${val}`
    } else {
      url = `http://localhost:5000/products/prod=${year}`
    }
    const data = await axios({
      method: 'GET',
      url: url,
      data: {
        year: this.state.year
      }
    }).then(function (response) {
      return response.data
    })
      .catch(function (error) {
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
    })
      .catch(function (error) {
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
    const { report, products, opened, year } = this.state
    return (
      <div>
        <h1 className="text-center bg-dark text-light p-3 mb-5">Report page</h1>
        <div className="container">
          <button type="button" onClick={this.report} value="all" className="btn btn-success mr-2">Get all products</button>
          <div className="btn-group btn-group-sm ml-3">
            <div className="input-group-prepend">
              <input type="number" name="year" className="input-group-text" max={2025} min={2016} onChange={this.handleChange} placeholder="Year..." />
            </div>
            <input type="button" onClick={this.report} value="Report" className="btn btn-dark" />
          </div>
        </div>
        {!Object.keys(products).length ? null : <ProductsTable data={products} />}
        {report === '' ? null : <h2>Your purchase in {year} is {report}UAH</h2>}
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
      </div>
    )
  }
}
