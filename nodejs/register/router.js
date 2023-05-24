const express = require('express');
const router = express.Router();
const controller = require('../register/controller');

router.post('/register', async (req, res, next)=> {
  try {
    console.log(req.body)
    await controller.register(req.body, res);
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
   return res.status(500).json({
    message:"Internal server error"
   })
  }
});

router.post('/login', async (req, res, next)=>{
  try {
    console.log(req.body)
    await controller.login(req, res);
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message:"Internal server error"
     })
  }
});

router.post('/verify', async (req, res, next)=>{
  try {
    console.log(req.body)
    await controller.verifycode(req, res);
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message:"Internal server error"
     })
  }
});

router.post('/sendmail',async (req, res, next)=> {
  try {
    await controller.sendmail(req);
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message:"Internal server error"
     })
  }
})

router.post('/forgotPassword', async (req, res, next)=> {
  try {
    console.log(req.body)
    await controller.forgotPassword(req, res);
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message:"Internal server error"
     })
  }
});

module.exports = router;