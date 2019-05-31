var express=require('express')
var mc=require('mongodb').MongoClient
var app=express()

mc.connect('mongodb://127.0.0.1/weblab', function(err, db)
{
	if(!err)
	{
		console.log("Connected to db")
		console.log("Visit localhost:5000 on your browser to view output")
		
		db.collection('3b').remove()

		db.collection('3b').insert({party:'con', vote:0})
		db.collection('3b').insert({party:'bjp', vote:0})
		db.collection('3b').insert({party:'oth', vote:0})
		app.get('/', function(req, res)
		{
			res.sendFile(__dirname+'/'+'3b.html')
		});
		app.get('/insert', function(req, res)
		{
			console.log("Val inserted.")
			var val=req.query.party;
			console.log("Party selected : "+val);
			db.collection('3b').update({party:val},{$inc:{vote:1}});
			res.end('Voted successfully!')
			res.end('\n',JSON.stringify(req.query))
		});
		app.get('/displayvotes', function(req, res)
		{
			db.collection('3b').find().sort().toArray( function(err, data)
			{
				if(!err)
				{
					console.log(data)
					res.end(JSON.stringify(data));
					res.end('\n');
				}
			});
		});
		//db.close()
		app.listen(5000);
	}
	else
	{
		console.log("Error connecting to db.   :/")
	}
});