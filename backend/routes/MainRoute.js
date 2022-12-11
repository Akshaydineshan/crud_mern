const express = require('express')
const router = express.Router()
const Product = require('../model/Product')

router.post('/addproduct', async (req, res, next) => {
  let product = new Product(req.body)
  try {
    const result = await product.save()
    res.status(200).json({
      message: "product added successfully",
      success: true,
      product: result
    })
  } catch (error) {
    console.log(error);
  }
})

router.get('/allproduct', async (req, res, next) => {
  try {
    const data = await Product.find()
    res.status(200).json({
      success: true,
      message: "get all product successfully",
      product: data
    })
  } catch (err) {

  }
})

router.get('/oneproduct/:id', async (req, res, next) => {
  try {
    const data = await Product.findById({ _id: req.params.id })
    res.status(200).json({
      success: true,
      message: "get  product successfully",
      product: data
    })
  } catch (err) {

  }
})
router.delete('/deleteproduct/:id', async (req, res, next) => {
  try {
    const data = await Product.findByIdAndRemove({ _id: req.params.id })
    res.status(200).json({
      success: true,
      message: "delete product successfully",
      product: data
    })
  } catch (err) {

  }
})

router.put('/update/:id', async (req, res, next) => {
  try {
    console.log("csdbvfjbjdbj")
    const data = await Product.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    res.status(200).json({
      success: true,
      message: "update product successfully",
      product: data
    })

  } catch (err) {
    console.log(err)
  }
})



router.get('/search/:key', async (req, res, next) => {
  try {
   
    const data = await Product.find({
      "$or": [
        { name: { $regex: req.params.key } }
      ]
    })
    res.status(200).json(data)

  } catch (err) {
    console.log(err)
  }

})








module.exports = router