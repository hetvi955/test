const express= require("express");
const sweetAuth= require("sweet-auth");
const bodyParser=require("body-parser");
const router= express.Router();
const mongoose=require('mongoose');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

let app=express();
app.use(sweetAuth);
app.use(express.static("public"));

app.set('view engine','ejs');

app.get('/', (req,res)=>{
    if(req.isAuthorized){

        res.sendFile(__dirname + '/intro.html')
    }
    else{

        res.sendFile(__dirname + '/public/index.html')
    }
});

app.get('/signup', (req,res)=>{

    res.sendFile(__dirname + '/public/signup.html')
});

app.get('/api/signup', (req,res)=>{

    let Email = req.query.Email
    let Password = req.query.Password

    req.user.create(Email,Password)
    .then(
        //successful
        ()=>{res.send('Account successfully created! Please login again. ')},
        //err
        (err)=>{res.send(err.message)}
    )
    
});

app.get('/login', (req,res)=>{

    res.sendFile(__dirname + '/public/login.html')
});
app.get('/api/login', (req,res)=>{

    let Email = req.query.Email
    let Password = req.query.Password

    req.user.authenticate(Email,Password)
    .then(
        //successful
        ()=>{res.sendFile(__dirname + '/public/feedback.html')},
        //err
        (err)=>{res.send(err.message)}
    )
    
});
app.get('/feedbacks', (req,res)=>{
    res.render('feedback')
});

app.post('/feedbacks',urlencodedParser, (req,res)=>{
    console.log(req.body);
    res.render('feedback_success', {data: req.body}
    );
});

app.listen(3000)