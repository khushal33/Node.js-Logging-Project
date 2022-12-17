const express = require('express')
const router = express.Router()
const productController = require('../controller/product')

router.get('/',(req,res)=>{
    productController.getProducts(req).then(data =>{
        res.status(200).send(data)
    }).catch(err=>{
        res.status(400).send(err)
    })
})

router.post('/',(req,res)=>{
    productController.storeProducts(req).then(data =>{
        res.status(200).send(data)
    }).catch(err=>{
        res.status(400).send(err)
    })
})


module.exports = router;