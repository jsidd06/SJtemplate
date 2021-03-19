require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const https = require("https");
const mongoose = require('mongoose')
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose");
const stripe = require('stripe')('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');

let product = {}
const {
    premium
} = require('./templates/premium')
const {
    free
} = require('./templates/free')
const {
    serialize
} = require("v8");
const app = express();


app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}))

// session initialize
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// 6 creating schema 
const schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String
    },
    number: {
        type: Number,
        required: true,
    }
})

schema.plugin(passportLocalMongoose)

// create a module of collection
const User = mongoose.model('User', schema)
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// home route start
app.get("/food", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("food", {
            isLogin: false
        });
    } else {
        res.redirect("/")
    }
});
// end home route
// free start
app.get("/free", (req, res) => {
    res.render("free",{
        products: free
    });
})
// end free
// createyouracoount start
const contactSchema = new mongoose.Schema({
    firstname: {
        type:"string",
        required: true,
    },
    lastname: {
        type:"string",
        required:true,
    },
    email:{
        type:"string",
        required:true,
    }
})
const contact = mongoose.model("contact",contactSchema)
app.get('/contact', (req, res) => {
    res.render('contact')
})
app.post("/contact", (req, res) => {
    new contact({
       firstname: req.body.firstname,
       lastname:req.body.lastname,
       email:req.body.email
    }).save(err => {
        if(!err){
            res.redirect("food")
        }else {
            res.send('Fail')
        }
    })
})
app.get('/Createyouraccount', (req, res) => {
    res.render('Createyouraccount')
})
app.post('/', (req, res) => {
    User.register(new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        number: req.body.number
    }), req.body.password, (err, user) => {
        if (!err) {
            res.redirect('/Login')
        } else {
            console.log(err)
            res.redirect('Createyouraccount')
        }
    })
})
// createyouraccount end
app.get("/", (req, res) => {
    if (req.isAuthenticated()) {

        res.render("food", {
            isLogin: true,
            firstName: req.user.firstname,
            name: req.user.firstname + req.user.lastname,
            email: req.user.username
        })
    } else {
        res.render("food", {
            isLogin: false
        })
    }
})
// login start
app.get('/Login', (req, res) => {
    res.render('Login')
})
app.post("/Login", (req, res) => {
    req.login(new User({
        username: req.body.username,
        password: req.body.password
    }), (err, user) => {
        if (!err) {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/')
            })
        } else {
            console.log(err);
            res.redirect('Login')
        }
    })
})
// login end
// premium start security
app.get('/premium', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('premium', {
            products: premium
        })
    } else {
        res.redirect('/login')
    }
})
// premium end
// logout start
app.get("/logout", (req, res) => {
    req.logout()
    res.redirect("food")
})

// PAYMENT ROUTES


const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'INR',
          product_data: {
            name: product.name,
            images: ["https://i.imgur.com/EHyR2nP.png"],
          },
          unit_amount: (product.price * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url:  `http://localhost:3000/${product.downloadPath}`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });

  res.json({ id: session.id });
});

app.get('/checkout/:id', (req, res) => {
    const data = premium.filter( x => x.id === Number(req.params.id) )
    product = data[0]
  
    res.render('checkout', {product : product})

})

app.get('/cancel', (req, res) => {
    res.sendFile(__dirname+'/cancel.html')
})
app.get("/terms.html", (req, res) => {
    res.sendFile(__dirname+'/terms.html')
})
// logout end
// server port start
app.listen(3000, function () {
    console.log("sever is ready to start");
})
// end server port


