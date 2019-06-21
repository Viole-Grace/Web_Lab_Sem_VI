var exp=require('express')
var mc= require('mongodb').MongoClient
var app=exp()

mc.connect("mongodb://127.0.0.1/weblab", function(err, db)
{
	if(!err)
	{
		console.log("Connected to db successfully")
		console.log("Visit localhost:5000 to see output")
		
		//db.collection.drop()

		app.get('/', function(req, res)
		{
			res.sendFile(__dirname+"/"+"10b.html")
			console.log("Entered home")
		});

		app.get('/insert', function(req, res)
		{
			var upper_branch=req.query.branch
			console.log(req.branch,upper_branch)
			db.collection('10b').insert({id:req.query.id, title:req.query.title, name:req.query.name, branch:upper_branch.toUpperCase()})
			console.log(req.query)
			console.log("Inserted Successfully")
			res.end("Inserted Successfully!")
		});
		
		app.get('/display', function(req, res)
		{
			console.log("Under Display:\n\n")
			db.collection('10b').find({},{_id:0}).sort().toArray( function(err, data)
			{
				if(!err)
				{
					console.log(data)
					res.end("JSON Stringified : \n"+JSON.stringify(data)+"\n")
				}
				else
					console.log("Error displaying data")
			});
		});

		app.get('/results' , function(req, res)
		{
			console.log("Entered Results")
			db.collection('10b').find({branch:"CSE", title:"Professor"},{_id:0}).sort().toArray( function(err, data)
			{
				if(!err)
				{
					console.log(data)
					res.end("Branch = CSE, Faculty = Professor\n"+JSON.stringify(data)+"\n")
				}
				else
					console.log("Error")
			});
		});

		app.listen(5000)
	}

	else
	{
		console.log("ERROR connecting to db.   :/")
		console.log("Check for running of Mongod server from terminal")
	}
});