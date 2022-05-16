const express =require('express');
const path =require('path');
const app1 =express();
const http = require('http');
const bodyparser = require("body-parser")
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance');
 const hostname='127.0.0.1';
const port =3000
;

// define mogoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    address: String,
    desc: String,

  });
  const contact = mongoose.model('contact', contactSchema);

app1.use('/static',express.static('static'));
app1.use(express.urlencoded());// import if error in this message you will not able to run this

app1.set('view engine','pug');
app1.set('views',path.join(__dirname,'views'));

app1.get('/',(req, res)=>{
    const con='';
    // const para =;
    res.status(200).render('home.pug')
});
app1.get('/contact',(req, res)=>{
    const con='';
    // const para =;
    res.status(200).render('contact.pug')
});

app1.post('/contact',(req, res)=>{
    var myData =  new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been save to database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the databases")
    })
    // res.status(200).render('contact.pug')
});




app1.listen(port, ()=>{
    console.log(`the applicatin start successful on port http://${hostname}:${port}/`)
});
