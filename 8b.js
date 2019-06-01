var exp=require('express')
var mc=require('mongodb').MongoClient
var app=exp()

mc.connect('mongodb://127.0.0.1/weblab' , function(err, db)
{
	if(!err)	
	{	
		console.log("Connected to DB.")
		console.log("visit localhost:5000 on your browser to view output")
		app.get('/' ,function(req, res)
		{
			console.log("Entered main page")
			res.sendFile(__dirname+'/'+'8b.html')
		});
		app.get('/insert', function(req,res)
		{
			console.log("Entered insert page")
			var name=req.query.name
			var usn=req.query.usn
			var cname=req.query.companyname
			db.collection('8b').insert({usn:usn, name:name, company:cname})
			console.log(req.query)
			console.log("Inserted Successfully!")
			res.end('Inserted Successfully!\nWould you like to insert again?')

		});
		app.get('/displaydb' , function(req,res)
		{
			console.log("DB : ")
			db.collection('8b').find().sort().toArray( function(err, data)
			{
				if(!err)
				{
					//res.end('Data in the db :\n')
					console.log(req.query)
					console.log(JSON.stringify(data))
					res.end(JSON.stringify(data)+'\n')
				}
				else
				{
					console.log("Error displaying db")
					res.end('Error displaying db.')
				}
			});
		});
		app.get('/displaycompany' , function(req,res)
		{
			console.log("Students selected for the company 'Infosys' : ")
			db.collection('8b').find({company:'Infosys'}).sort().toArray(function(err, data)
			{
				if(!err)
				{
					console.log(data)
					console.log(JSON.stringify(data))
					res.end(JSON.stringify(data)+'\n')
				}
			});
		});


		app.listen(5000)
	}
	else
	{
		console.log("Error connecting to db.   :/")
	}
});