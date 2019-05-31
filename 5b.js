var express=require('express')
var mc=require('mongodb').MongoClient
var app=express()

mc.connect('mongodb://127.0.0.1/weblab', function(err, db)
{
	if(!err)
	{
		console.log("Connected to the db.")
		console.log("visit localhost:5000 on your browser to exectue / see output")
		app.get('/', function(req, res)
		{
			res.sendFile(__dirname+'/'+'5binsert.html')
			console.log("Entered main page.")
		});
		app.get('/insert' , function(req,res)
		{
			console.log("Insert function entered")
			db.collection('5b').insert({name:req.query.name, usn:req.query.usn, dep:req.query.dep, grade:req.query.grade})
			res.end('\nData Inserted successfully!')
		})
		app.get('/displaydb' , function(req, res)
		{
			console.log("Showing DB");
			console.log(req.query);
			db.collection('5b').find().sort().toArray( function(err, data)
			{
				if(!err)
				{
					console.log(JSON.stringify(data))
					res.end(JSON.stringify(data));
					res.end('/')
				}
				else
				{
					console.log("Error displaying data");
					res.end("Error showing data")
				}
			});
		});
		app.get('/updateform' , function(req, res)
		{
			console.log("Update data entered")
			var name = req.query.name
			var updated_grade = req.query.grade
			db.collection('5b').update({name:name}, {$set:{grade:updated_grade}})
			console.log("Data updated")
			res.end('\n')
			res.end('Updated successfully!')
		});
		app.get('/5bupdate.html', function(req, res)
		{
			res.sendFile(__dirname+'/'+'5bupdate.html');
		});
		app.get('/showans' , function(req, res)
		{
			console.log("Showing query data")
			db.collection('5b').find().sort().toArray( function(err, data)
			{
				if(!err)
				{
					console.log(JSON.stringify(data))
					res.end(JSON.stringify(data))
					res.end('\n')
				}
				else
				{
					console.log("Error showing required data")
					res.end("Error showing query data")
				}
			});
		});

		app.listen(5000)
	}
	else
	{
		console.log("Error connecting to the db.   :/")
	}
});