
const report = function (products, currency) {
    let priceArr = []
    products.map(el => {
        let prodPrice = {}
        prodPrice.price = el.price
        prodPrice.currency = el.currency
        return priceArr.push(prodPrice)
    })
    let EURprice = []
    priceArr.map(el => {
        return EURprice.push((el.price/currency[el.currency]))
    })
    console.log(EURprice)
    let result = EURprice.reduce((acc, val) => acc += val * currency['UAH'], 0)

    return result
}
module.exports = report