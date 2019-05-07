const fs = require('fs');
const axios = require('axios');
const report = require('../utils/report');


class ProductsCtrl {
    /**
    * Creates user new purchase .
    * @param {Object} reqData - new product`s data(incl.: tittle,price,date,currency)
    */
    static purchase(reqData) {
        try {
            let productsJSON = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
            let products = productsJSON.products;
            const { title, date, price, currency } = reqData;
            let data = {};
            data.title = title;
            data.date = date;
            data.price = Number(price);
            data.currency = currency;
            products.push(data);
            products.sort((a, b) => a.date > b.date)
            productsJSON.products = products;
            fs.writeFileSync('./data.json', JSON.stringify(productsJSON));
            return productsJSON;
        } catch (err) {
            throw new Error(err.message || JSON.stringify(err));
        }
    }
    /**
    * Delete all purchase by date.
    * @param {String} date - req.body.date
    */
    static delete(date) {
        try {
            let productsJSON = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
            let deleteDate = date;
            let products = productsJSON.products;
            productsJSON.products = products.filter(el => el.date !== deleteDate);
            fs.writeFileSync('./data.json', JSON.stringify(productsJSON));
            return productsJSON;
        } catch (err) {
            throw new Error(err.message || JSON.stringify(err));
        }
    }

    /**
    * Either get all products or report sum at UAH 
    * @param {String} param - req.params.options
    */
    static async getPurchase(param) {
        try {
            let productsJSON = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
            const options = param.split('=')[1];

            if (options === 'all') return productsJSON;

            let endpoint = 'latest';
            let access_key = process.env.FIXER_KEY;
            let reported = await axios({
                method: 'get',
                url: 'http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key,
            }).then((result) => {
                const currencyObj = result.data.rates; // return obj with all currencys base on EUR
                const resultic = report(productsJSON.products, currencyObj, options);
                return resultic;
            }).catch((err) => {
                console.log(err);
                return res.json({ "msg": err });
            })
            return reported;
        } catch (err) {
            throw new Error(err.message || JSON.stringify(err));
        }
    }
}

module.exports = ProductsCtrl;