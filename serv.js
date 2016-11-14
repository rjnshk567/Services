var express = require('express'); //call express
// var mongoose = require('mongoose');
// var bodyParser = require('body-parser');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');
// app.get('/', function(req, res){
// 	res.send("hello")
// });

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function(req, res){
	console.log("I received request")

	//server find database
	db.contactlist.find(function(err, docs){
		console.log(docs);
		res.json(docs);//sends data back to controller
	});
});
app.post('/contactlist', function(req,res){
	console.log(req.body);//print data it receives to cmd prompt
	db.contactlist.insert(req.body,function(err, doc){
		res.json(doc);
	})
});

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;//get value of id from url
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});
app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.FirstName);
	db.contactlist.findAndModify({query: {_id:mongojs.ObjectId(id)},
		update: {$set: {FirstName: req.body.FirstName, LastName: req.body.LastName, Email: req.body.Email, ContactNumber: req.body.ContactNumber}},
		new: true}, function(err, doc) {
			res.json(doc);
	});
});
app.listen(3031);
console.log("Server running on port 3031");

// person1 = { 
	// 	FirstName: 'Roman',
	// 	LastName: 'Reigns',
	// 	Email: 'rr@gmail.com',
	// 	ContactNumber: '9841949493'
	// };

	// person2 = {
	// 	FirstName: 'Amar',
	// 	LastName: 'Shrestha',
	// 	Email: 'as1@gmail.com',
	// 	ContactNumber: '9841649493'
	// };

	// person3 = {
	// 	FirstName: 'Roshan',
	// 	LastName: 'Raut',
	// 	Email: 'rR@gmail.com',
	// 	ContactNumber: '9801494932'
	// };

	// var contactlist =[person1, person2, person3];
	// res.json(contactlist);