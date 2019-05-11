const { isEmpty } = require('./common');
const PurchaseEnum = require('../enumErr/purchase');
const { ValidationError } = require('../errors/Errors');

module.exports = function validateInputPurchase(data) {
    const errors = {};

    if (isEmpty(data.title)) {
        errors.title = PurchaseEnum.error.titleEmpty;
    }
    if (isEmpty(data.date)) {
        errors.date = PurchaseEnum.error.dateEmpty;
    }
    if (isEmpty(data.price)) {
        errors.price = PurchaseEnum.error.priceEmpty;
    }
    if (isEmpty(data.currency)) {
        errors.currency = PurchaseEnum.error.currencyEmpty;
    }

    if (!isEmpty(errors)) {
        throw new ValidationError('Errors during validation input fields', errors)
    }
};