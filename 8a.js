function vowelCount(st)
{
	var ca=0,ce=0,ci=0,co=0,cu=0;
	for(var i=0;i<st.length;i++)
	{
		switch(st[i])
		{
			case 'a' : ca++;break;
			case 'e' : ce++;break;
			case 'i' : ci++;break;
			case 'o' : co++;break;
			case 'u' : cu++;break;
		}
	}
	console.log("For the string '"+st+"' :\nNumber of vowels are as follows -")
	console.log("a : "+ca+"\ne : "+ce+"\ni : "+ci+"\no : "+co+"\nu : "+cu)
}
vowelCount('This is Sparta')