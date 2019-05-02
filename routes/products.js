const express = require('express');
const fs = require('fs');
const axios = require('axios');
const report = require('../utils/report');

const router = express.Router();

let productsJSON = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

router.post('/purchase', function (req, res) {
    try {
        let products = productsJSON.products;
        let data = {};
        data.title = req.body.title;
        data.date = req.body.date;
        data.price = Number(req.body.price);
        data.currency = req.body.currency;
        products.push(data);
        products.sort((a,b)=> a.date>b.date)
        productsJSON.products = products;
        fs.writeFileSync('./data.json', JSON.stringify(productsJSON));
        return res.json(productsJSON);
    } catch (err) {
        return res.status(400).json(err);
    }
})

router.delete('/delete', function (req, res) {
    try {
        let deleteDate = req.body.date;
        let products = productsJSON.products;
        productsJSON.products = products.filter(el => el.date !== deleteDate);
        fs.writeFileSync('./data.json', JSON.stringify(productsJSON));
        return res.json(productsJSON);
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/:options', (req, res) => {
    try {
        const options = req.params.options.split('=')[1];
        
        if (options === 'all') {
            return res.json(productsJSON);
        }

        let endpoint = 'latest'
        let access_key = '6510a24035a03dfffee8032a766089b0';
        axios({
            method: 'get',
            url: 'http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key,

        }).then((result) => {
            const currencyObj = result.data.rates // return obj with all currencys base on EUR
            const resultic = report(productsJSON.products, currencyObj)
            return res.json(resultic)
        }).catch((err) => {
            console.log(err)
            return res.json({"msg": err })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router;