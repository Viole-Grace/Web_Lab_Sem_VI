var exp=require('express')
var mc=require('mongodb').MongoClient
var app=exp()

mc.connect('mongodb://127.0.0.1/weblab' ,function(err, db)
{
	if(!err)
	{
		db.collection.drop()
		
		console.log("DB connected successfully")
		console.log("Visit localhost:5000 on your browser to run /see output")
		app.get('/' ,function(req, res)
		{

			res.sendFile(__dirname+'/'+'9b.html')
			console.log("Entered form page")
		});
		app.get('/insert' ,function(req, res)
		{
			console.log("Inserted successfully")
			console.log("DB : ")
			db.collection('9b').insert({name:req.query.name, branch:req.query.branch, sem:req.query.sem})
			console.log(req.query)
			res.end("Inserted successfully!")
			console.log(JSON.stringify(req.query))
		});
		app.get('/displaydb' ,function(req,res)
		{
			console.log("DB : ")
			db.collection('9b').find({},{_id:0}).sort().toArray( function(err, data)
			{
				if(!err)
				{
					console.log(data)
					res.end(JSON.stringify(data))
				}
			});
		});
		app.get('/result' , function(req, res)
		{
			console.log("DB : ")
			db.collection('9b').find({sem:'6'},{_id:0}).sort().toArray( function(err, data)
			{
				if(!err)
				{
					console.log(data)
					res.end(JSON.stringify(data)+'\n')	
				}
			});

		});
		app.listen(5000)
	}
	else
	{
		console.log("Error connecting to DB")
		console.log("Check if server is up and running using the 'mongod' command.")
	}
});