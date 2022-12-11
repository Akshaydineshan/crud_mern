const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../model/User')


router.post('/signup', async (req, res, next) => {
   let existingUser
   let { name, email, password } = req.body

   const salt = await bcrypt.genSalt(10);

   password = await bcrypt.hash(password, salt);
   try {
      existingUser = await User.findOne({ email })
   } catch (error) {
      console.log(error)
   }
   if (!existingUser) {
      const user = new User()
      user.name = name
      user.email = email
      user.password = password
      try {
         await user.save()
         const token = jwt.sign({ user }, "secretkey")
         res.status(200).json({
            success: true,
            message: "user registered successfully",
            user,
            token

         })
      } catch (error) {
         console.log(error)
      }
   } else {
      res.status(400).json({
         success: false,
         message: "user already exist"
      })
   }

})
//signin
router.post('/signin', async (req, res, next) => {
   console.log("signin")
   let user
   try {
      user = await User.findOne({ email: req.body.email })

   } catch (error) {
      console.log(error)
   }
   if (!user) {
      res.status(400).json({
         message: "email not found",
         success: false
      })
   } else if (user) {
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
         res.status(400).json({
            message: "password mismatch",
            success: false
         })
      } else {
         const token = jwt.sign({ user }, "secretkey")
         res.status(200).json({
            message: "login success",
            success: true,
            user,
            token
         })
      }


   }



})


module.exports = router