
const report = function (products, currency, year) {
    let priceArr = []
    if (year==='') {
        let date = new Date()
        year = date.getFullYear().toString()
    }
    let data = products.filter(el => el.date.split('-')[0] === year)
    data.map(el => {
        let prodPrice = {}
        prodPrice.price = el.price
        prodPrice.currency = el.currency
        return priceArr.push(prodPrice)
    })
    let EURprice = []
    priceArr.map(el => {
        return EURprice.push((el.price / currency[el.currency]))
    })
    
    let result = EURprice.reduce((acc, val) => acc += val * currency['UAH'], 0)

    return result
}
module.exports = report