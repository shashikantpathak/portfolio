"use strict"

var express=require('express');
var router=express.Router();
var nodemailer=require("nodemailer");
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'sasikant00',
	database: 'portfolio'
});

connection.connect();

router.get('/', function(req, res, next) {
    connection.query("SELECT * FROM portfolio", function(err, rows, fields){
    	if(err) throw err;
    	res.render('index', {
    		"portfolio": rows
    	});
    });
});

router.get('/details/:id', function(req, res, next) {
    connection.query("SELECT * FROM portfolio WHERE id = ?", req.params.id, function(err, rows, fields){
    	if(err) throw err;
    	res.render('details', {
    		"portfolio": rows[0]
    	});
    });
});


router.get('/about', function(req, res, next) {
		res.render('about')
});

router.get('/contact', function(req, res, next) {
	res.render('contact')
});
router.post('/contact/send',function(req,res){
    let transporter = nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:req.body.senderemail,
            pass:req.body.password
        }
    });
    const mailOptions={
        from:req.body.senderemail,
        to:req.body.email,
        subject:req.body.subject,
        text:'You have a message from' +req.body.senderemail+'the message is'+req.body.message,
        html:"<div>Suraj, You have message from</div>"+req.body.email+"<div>The message is</div>"+req.body.message+"<div>Sender Name</div>"+req.body.name+' '+req.body.surname
    };
    transporter.sendMail(mailOptions, function(err){
        if(err){
            throw err
        }else{
            res.redirect('/');
        }
    })

})
router.get('/work', function(req, res, next) {
    connection.query("SELECT * FROM portfolio", function(err, rows, fields){
    	if(err) throw err;
    	res.render('work', {
    		"portfolio": rows
    	});
    });
});


module.exports=router;