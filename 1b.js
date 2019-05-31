var express = require('express')
var app=express()
var mc=require('mongodb').MongoClient

mc.connect('mongodb://127.0.0.1/weblab', function(err, db)
	{
		if(!err)
		{
			console.log("Connected");
			console.log("Please visit url localhost:5000 on the browser to see execution");
			app.get('/', function(req,res)
			{
				res.sendFile(__dirname+'/'+'1b.html');
			});
			app.get('/insert', function(req, res)
			{
				db.collection('1b').insert({usn:req.query.usn, name:req.query.name, sub:req.query.code, marks:req.query.marks});
				res.send("Value inserted!");
				console.log("Val inserted.")
			});
			app.get('/displaydb', function(req, res)
			{
				console.log("Query : "+req.params);
				db.collection('1b').find().sort().toArray( function(err, data)
				{
					if(!err)
					{
						res.end(JSON.stringify(data));
						res.end("\n");
					}
				});
			});
			app.get('/displaycie', function(req, res)
			{
				db.collection('1b').find({marks:{$lt:20}}).sort().toArray( function(err, data)
				{
					console.log("CIE : "+data);
					if(!err)
					{
						res.end(JSON.stringify(data));
						res.end('\n');
					}
				});

			});
			app.listen(5000);
		}
		else
		{
			console.log("Error connecting to db.   :/");
		}
	});