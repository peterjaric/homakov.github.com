var http = require('http');
var https = require('https');
var get = require('get');
var fs = require('fs');
var bounties = require('./bounties.js');

/*
	Actually I am not a programmer so don't tell me how shitty this code is. peace
	Online: http://www.sakurity.com/hustlers
*/
/* 
	 But I call myself a programmer, so I've started to clean up the code a little.
	 @peterjaric
*/
function done(hustlers, aggr, result){
	var 
	  details,
	  filename = process.argv[2] || "../high-lightning-427/hustlers.html"; // Homakov's default target file
	
  hustlers.sort(function(a,b){
    return b.bounties.length-a.bounties.length
  });

  for(var i=0,l=hustlers.length;i<l;i++){
  	details = [];
  	for(var key in hustlers[i].details){
      details.push(key+(hustlers[i].details[key]>1 ? " ("+hustlers[i].details[key]+")" : ''));
  	}
		
    var handle = hustlers[i].handles[0];
    if(handle[0] == '@'){
      handle = handle.substr(1);
      handle = '<a href="http://twitter.com/'+handle+'">@'+handle+"</a>";
    }
    
    result += ("<tr><td>"+(i+1)+"</td><td>" + handle + "</td><td>$" + hustlers[i].reward + "</td><td>" + details.join(', ') + "</td></tr>\n")
  }
	
  result = 
		'<!DOCTYPE html>\n' +
		'<html lang="en">\n' +
		'<head>\n' +
		'<link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css">\n' +
		'</head>\n' +
		'Bounty Hustlers [aggregated from '+aggr+']<br>\n<table border=1><tr><td>#</td><td width=200px>Handle</td><td width=100px>Cash Reward</td><td>Bounties</td></tr>\n' + 
		result +
		'</table>\n' +
		'</html>';
	
  fs.writeFile(filename, result, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("The file was saved to " + filename + "!");
    }
  });
}





function get_bounties() {
	
	var hustlers = [];
	var requested = bounties.length;
	var result = '';
	var aggr = '';
	
	function lookup_hustler(name){
		//normalize twitter handle
		//twitter.com/_RaviRamesh
		tw = /(?:[^a-zA-Z])(twitter\.com\/|@)([A-Za-z0-9_]{1,15})/.exec(name)
		if(tw){
			name = '@'+tw[2];
		}else{
			name = name.replace(/<.*?>/g,'');
			name = name.split(/\s?\(?(of|from)/)[0]    
		}
		name = name.trim();
		
		for(var i=0,l=hustlers.length;i<l;i++){
			if(hustlers[i].handles.indexOf(name) != -1){
				return hustlers[i];
			}
		}
		num = hustlers.push({
			
			handles: [name],
			reward: 0,
			bounties: [],
			details: {}
		});
		return hustlers[num-1];
	}

	function upgrade_hustler(name,id){
		var h = lookup_hustler(name);
		h.bounties.push(id);
		if(bounties[id].found){
			bounties[id].found++;
		}else{
			bounties[id].found=1;
		}
		if(h.details[bounties[id].name]){
			h.details[bounties[id].name] += 1
		}else{
			h.details[bounties[id].name] = 1
		}
		return h;
	}
	
	
	for(id=0,l=bounties.length;id<l;id++){
		var callback = (function(cb,id) {
			return function(err,res) {
				if (err) throw err;
				cb(res,id,upgrade_hustler);
				
				aggr += "| <a href='"+bounties[id].url+"'>"+bounties[id].name+'('+bounties[id].found+')</a> ';
				console.log(bounties[id].name, 'found', bounties[id].found)
				if(--requested == 0) done(hustlers, aggr, result);
			}
    })(bounties[id].cb,id)
		
		//transport = get //bounties[id].url[4] == 's' ? https : http;
		get(bounties[id].url).asString(callback);
	}
}




get_bounties();
