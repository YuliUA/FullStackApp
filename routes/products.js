const express = require('express');
const router = express.Router();
const ProductsCtrl = require('../controllers/ProductsCtrl');

router.post('/purchase', async function (req, res) {
    try {
        const createdPurchase = await ProductsCtrl.purchase(req.body);
        return res.json(createdPurchase);
    } catch (err) {
        return res.status(400).json(err);
    }
})

router.delete('/delete', async function (req, res) {
    try {
        const cleared = await ProductsCtrl.delete(req.body.date);
        return res.json(cleared)
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/:options', async function (req, res) {
    try {
        const getReport = await ProductsCtrl.getPurchase(req.params.options);
        return res.json(getReport);
    } catch (err) {
        return res.status(500).json(err);
    }
})

module.exports = router;