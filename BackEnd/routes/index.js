var express = require('express');
const StudentData = require('../models/studentData');
const bcrypt = require("bcrypt");
const Joi = require("joi");
const multer = require('multer');
var nodemailer = require('nodemailer');
const validator = require('express-joi-validation').createValidator({})
var router = express.Router();
let demo;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/\s+/g, ''))
  }
})

const upload = multer({ storage: storage })

var insertCheck = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string(),
  mobile: Joi.number().integer().required(),
  gender: Joi.string().required(),
  hobby: Joi.array().required(),
  division: Joi.string().required()
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get', async function (req, res) {
  try {

    const data = await StudentData.find();

    res.status(200).json({
      status: "Success",
      data
    })
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      error
    })
  }
})

// Create a new API endpoint to serve the image
router.get('/image/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = `./public/images/${imageName}`;
  res.sendFile(imagePath);
});

router.post('/add', upload.single('image'), async function (req, res) {
  // console.log(req.file.originalname);
  console.log(req.body);
  try {

    const crypted = await bcrypt.hash(req.body.password, 10);

    const image = req.file.originalname;
    const removeSpace = image.replace(/\s+/g, '');
    
    const obj = {
      "name": req.body.name,
      "email": req.body.email,
      "mobile": req.body.mobile,
      "gender": req.body.gender,
      "hobby": req.body.hobby,
      "password": crypted,
      "division": req.body.division,
      "image": removeSpace
    }
    
    const data = await StudentData.create(obj);
    res.status(201).json({
      ststus: "Success",
      data
    })
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      error
    })
  }
})

router.delete('/delete/:id', async function (req, res) {
  try {
    await StudentData.findByIdAndDelete(req.params.id)
    res.status(201).json({
      status: "Success"
    })
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      error
    })
  }
})

router.get('/find/:id', async function (req, res) {
  try {
    const data = await StudentData.findById(req.params.id)

    res.status(201).json({
      status: "Success",
      data
    })
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      error
    })
  }
})

router.post('/findEmail/', async function (req, res) {
  try {
    var data = await StudentData.find({ $and: [{ name: req.body.name }, { email: req.body.email }] })

    res.status(201).json({
      status: "Success",
      data
    })
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      error
    })
  }
})

router.post('/loginEmail', async function (req, res) {
  try {
    const data = await StudentData.find({ email: req.body.email })
    const thePassword = data[0].password;
    // const theEmail = req.params.email;

    const isValidPassword = await bcrypt.compare(req.body.password, thePassword)

    if (isValidPassword) {
      res.status(201).json({
        status: "Success",
        data
      })
    }
    else {
      res.status(401).json({
        status: "Failed"
      })
    }
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      error
    })
  }
})

router.post('/loginMobile', async function (req, res) {
  try {
    const data = await StudentData.find({ mobile: req.body.mobile })
    const thePassword = data[0].password;

    const isValidPassword = await bcrypt.compare(req.body.password, thePassword)

    if (isValidPassword) {
      res.status(201).json({
        status: "Success",
        data
      })
    } else {
      res.status(401).json({
        status: "Failed",
        message: "Invalid password"
      })
    }
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      error
    })
  }
})

router.patch('/update/:id', async function (req, res) {
  try {
    const obj = {
      "name": req.body.name,
      "email": req.body.email,
      "mobile": req.body.mobile,
      "gender": req.body.gender,
      "hobby": req.body.hobby,
      "division": req.body.division
    }
    var data = await StudentData.findByIdAndUpdate(req.params.id, obj)
    res.status(201).json({
      status: "Success",
      data
    })
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      error
    })
  }
})

// mmvr qvih zobd vwxe
// hery ohef mure rctq

router.get('/verification/:verificationToken', function (req, res) {
  try {

    if (!req.params.verificationToken) {
      res.status(400).json({
        status: "Failed",
        error: "No email address provided"
      });
    }

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kazutokirigaya2908@gmail.com',
        pass: 'mmvr qvih zobd vwxe'
      }
    });

    demo = Math.floor((Math.random() * 1000000) + 1);

    // otps[req.params.verificationToken] = demo;

    var mailOptions = {
      from: 'kazutokirigaya2908@gmail.com',
      to: `${req.params.verificationToken}`,
      subject: 'Sending Email using Node.js',
      text: `this otp for you ${demo}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json({
      status: "Success",
    })

  } catch (error) {
    res.status(401).json({
      status: "Failed",
      error
    })
  }
})

router.post('/verifyOTP/', function (req, res) {
  try {

    var theCode = req.body.otp;

    // console.log(otps);

    if (demo === parseInt(theCode)) {
      // delete otps[email];
      res.status(201).json({
        status: "Success",
      })
    } else {
      res.status(401).json({
        status: "Failed",
        error: "Invalid OTP"
      })
    }

  } catch (error) {
    res.status(401).json({
      status: "Failed",
      error
    })
  }
})

router.patch('/passChange/:email', async function (req, res) {
  try {

    const crypted = await bcrypt.hash(req.body.password, 10);

    const obj = {
      "password": crypted
    }

    await StudentData.findOneAndUpdate({ email: req.params.email }, obj);
    res.status(201).json({
      status: "Success"
    })
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      error
    })
  }
})

module.exports = router;
