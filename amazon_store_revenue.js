var sys = require('sys');

var fs = require("fs");
var exec = require('child_process').exec;
var date = require('./datetime');
var parse = require('csv-parse');
var child;

console.log('Starting amazon finance scraper');

try {
  process.chdir('./');
}
catch (err) {
  console.log('chdir: ' + err);
}

function cb(error, stdout, stderr) { 
	sys.puts(stdout) 
	
fs.readFile("curlcommand",function(err,data){
		
		if (err){
			console.log("error opening curl command");
		}
		
		exec(data.toString(), function(err,stdout,stderr){
			
			if (err){
				console.log("error executing curl command ",err);
				return;
			}
			console.log("done executing");
			sys.puts(stdout); 			
		});
		
	});
}


function parseCSV(cb){
	var output = [];
	// Create the parser
	var parser = parse({delimiter: ','});
	// Use the writable stream api
	parser.on('readable', function(){
	  while(record = parser.read()){
	    output.push(record);
	  }
	});
	// Catch any error
	parser.on('error', function(err){
		if (err){
			console.log("error parsing csv amazonstats ",err);
			return cb();
		}
	});
	// When we are done, test that the parsed output matched what expected
	parser.on('finish', function(){
	  cb(output);
	});
	
	fs.readFile("amazonstats.csv",function(err,data){
		
		if (err){
			console.log("error opening amazonstats ",err);
			return cb();
		}
		parser.write(data);
		parser.end();	
	});
}



var from = process.argv[2] || date.getInstance().getDate("%Y/%m/%d");
var to = process.argv[3] || date.getSameDayLastMonth().getDate("%Y/%m/%d");
var reportType =process.argv[4] 
var username =process.argv[5] 
var password =process.argv[6] 

console.log("get stats from ",from," - ",to," type:"+reportType);
console.log("login with user ",username, password);

var command = "casperjs --ssl-protocol=tlsv1 --ignore-ssl-errors=true  --local-to-remote-url-access=yes --web-security=no --cookies-file=customcookie amazon_get_curl.js "+from+" "+to+" "+reportType+" "+username+" "+password;

dbinstance = null;

exec(command, function(error, stdout, stderr) { 
	sys.puts(stdout) 
	
	function curl(cb){
		fs.readFile("curlcommand",function(err,data){
				
				if (err){
					console.log("error opening curl command");
				}
				
				exec(data.toString(), function(err,stdout,stderr){
					
					if (err){
						console.log("error executing curl command ",err);
						return;
					}
					console.log("done executing");
					sys.puts(stdout); 	
					cb();
				});
				
		});
	}
	
	curl(function(){		
		  var addZ = function(n){return n<10? '0'+n:''+n;}
		  
		  parseCSV(function(data){
			  
			  var c = false;
			  var queryCueu = [];
			  
			  for (var i =0; i < data.length-1;i++){
				  
				  console.log("looop data ",data[i]);
				  
			  }
		});
	});
});