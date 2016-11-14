var express = require('express')
	path     = require('path'),
 	bodyParser = require('body-parser'),
 	app = express();
 	expressValidator = require('express-validator');
//var mysql = require('mysql'); 
//var app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

var connection  = require('express-myconnection'),
    mysql = require('mysql');

app.use(
	 connection(mysql,{
	connectionLimit: 50,
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'resta',
	port: 3307,
	debug: false
	},'request')
);
// connection.connect(function(error){ //callback function
// 	if(!!error) {
// 		console.log('Error');
// 	} else {
// 		console.log('Connected');
// 	}
// });
app.get('/',function(req,res){
    res.send('Welcome');
});

var router = express.Router();

router.use(function(req, res, next) {
     console.log(req.method, req.url);
     next();
});
//app.get('/', function(req, resp){
var app = router.route('/contactlist');

	app.get(function(req,res,next){

		req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM crud',function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.render('user',{title:"RESTful Crud Example",data:rows});

         });

    });

});


	app.post(function(req,res,next){

		var data = {
        id:req.body.id
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,	
        email:req.body.email,
        ContactNo:req.body.ContactNo
     };

     req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("INSERT INTO crud set ? ",data, function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          res.sendStatus(200);

        });

     });

});
	var app2 = router.route('/contactlist/:id');

	app2.all(function(req,res,next){
    	console.log("You need to smth about curut2 Route ? Do it here");
    	console.log(req.params);
    	next();
	});

	app2.get(function(req,res,next){

    var user_id = req.params.user_id;

    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT * FROM crud WHERE user_id = ? ",[user_id],function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("User Not found");

            res.render('edit',{title:"Edit user",data:rows});
        });

    });

});

	app2.put(function(req,res,next){
    	var user_id = req.params.user_id;
    	var data = {
        	id:req.body.id
       	 	FirstName:req.body.FirstName,
        	LastName:req.body.LastName,	
        	email:req.body.email,
        	ContactNo:req.body.ContactNo
     	};
    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("UPDATE crud set ? WHERE user_id = ? ",[data,user_id], function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          res.sendStatus(200);

        });

     });

});
    //validation
    // req.assert('name','Name is required').notEmpty();
    // req.assert('email','A valid email is required').isEmail();
    // req.assert('password','Enter a password 6 - 20').len(6,20);

    // var errors = req.validationErrors();
    // if(errors){
    //     res.status(422).json(errors);
    //     return;
    // }


	// app.put(function(req,res,next){
    // var user_id = req.params.user_id;

    // //validation
    // req.assert('name','Name is required').notEmpty();
    // req.assert('email','A valid email is required').isEmail();
    // req.assert('password','Enter a password 6 - 20').len(6,20);

    // var errors = req.validationErrors();
    // if(errors){
    //     res.status(422).json(errors);
    //     return;
    // }

    //get data
   

    //inserting into mysql
   

//delete data
app.delete(function(req,res,next){

    //var user_id = req.params.user_id;

     req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query("DELETE FROM crud  WHERE user_id = ? ",[user_id], function(err, rows){

             if(err){
                console.log(err);
                return next("Mysql error, check your query");
             }

             res.sendStatus(200);

        });
        //console.log(query.sql);

     });
});

//now we need to apply our router here
app.use('/contactlist', router);

//start Server
var server = app.listen(3010,function(){

   console.log("Listening to port %s",server.address().port);


    //validation
    // req.assert('id','id is required').notEmpty();
    // req.assert('FirstName','Name is required').notEmpty();
    // req.assert('FirstName','Name is required').notEmpty();
    // req.assert('email','A valid email is required').isEmail();
    // req.assert('password','Enter a password 6 - 20').len(6,20);

    // var errors = req.validationErrors();
    // if(errors){
    //     res.status(422).json(errors);
    //     return;
    // }

    //get data
    
	// connection.getConnection(function(error, conn){
	// 	if(!!error){
	// 		conn.release();
	// 		console.log('Error in the query');
	// 	} else {
	// 		console.log('Connected');

	// 		conn.query("SELECT * FROM crud", function(error, rows, fields){
	// 			conn.release();
	// 			if(!!error){
	// 				console.log('Error in the query');
	// 			} else {
	// 				resp.json(rows);
	// 			}
	// 		});
			//console.log(rows);

		//}
	//connection.query("SELECT * FROM crud", function(error, rows, fields){
		//callback
		
			
		
// 	});
// })


// 
// 

// app.get(function(req,res,next){


//     req.getConnection(function(err,conn){

//         if (err) return next("Cannot Connect");

//         var query = conn.query('SELECT * FROM crud',function(err,rows){

//             if(err){
//                 console.log(err);
//                 return next("Mysql error, check your query");
//             }

//             res.render('user',{title:"RESTful Crud Example",data:rows});

//          });

//     });
// });

app.listen(3010);