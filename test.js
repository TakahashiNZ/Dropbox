var dropbox = require('./dropbox.js');

dropbox.getLink("distribution", function(err, link){
	if(err){
		console.log("err", err)
	}else{
		console.log("link", link)
	}
});

setTimeout(function(){
	dropbox.getLink("distribution", function(err, link){
		if(err){
			console.log("err", err)
		}else{
			console.log("link", link)
		}
		console.log(dropbox.ready())
	});
},2000);