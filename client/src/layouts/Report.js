import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ProductsTable, DeleteDate } from './'

export default class Report extends Component {
  constructor() {
    super();
    this.state = {
      report: 0,
      products: {},
      opened: false,
      date: ''
    }
    this.report = this.report.bind(this);
    this.handleDeleteForm = this.handleDeleteForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteByDate = this.deleteByDate.bind(this);
  }

  async report(e) {
    e.preventDefault();
    let val = e.target.value;
    const data = await axios.get(`http://localhost:5000/products/prod=${val}`)
      .then(function (response) {
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
  
  handleChange(e){
    this.setState({
      date: e.target.value
    })
  }
  
  handleDeleteForm() {
    this.setState({
      opened: !this.state.opened
    })
  }

  render() {
    const { report, products, opened } = this.state
    return (
      <div>
        <h1 className="text-center bg-dark text-light p-3 mb-5">Report page</h1>
        <div className="container text-center">
          <button type="button" onClick={this.report} value="all" className="btn btn-success btn-lg m-2">Get all products</button>
          <button type="button" onClick={this.report} value="report" className="btn btn-dark btn-lg m-2">Report</button>
        </div>
        {!Object.keys(products).length ? null : <ProductsTable data={products} />}
        {report > 0 ? <h2>Your purchase is {report}UAH</h2> : null}
        <div className="container mt-4">
          <button type="button" onClick={this.handleDeleteForm} className="btn btn-light">Delete by Date</button>
          {!opened ? null : <DeleteDate toggleForm={this.handleDeleteForm} submit={this.deleteByDate} change={this.handleChange}/>}
        </div>
        <div className="container mt-5">
          <Link to='/'>Back to HomePage</Link>
          <br />
          <Link to='/purchase'>Add more products...</Link>
        </div>
      </div>
    )
  }
}
