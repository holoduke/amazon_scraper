var system = require('system');
var args = system.args;
var utils = require('utils');
var casper = require('casper');
var fs = require('fs');
var args = system.args;
var links = [];
var casper = require('casper').create({
	viewportSize: {
        width: 1024,
        height: 768
    },
    clientScripts : ["jquery-2.1.3.min.js"],
	verbose : false,
	logLevel: "debug",
	userAgent : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36'
});

casper.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');

var startDate = args[4] || "2015/01/31";
var endDate = args[5] || "2015/02/20";
var user = args[6];
var pass = args[7];
var productGroup = args[8] || "A31I45LN3W8UUM";

startDate = encodeURIComponent(startDate);
endDate = encodeURIComponent(endDate);

console.log("generating ")
console.log("start data "+startDate);
console.log("end date "+endDate);
console.log("username ",user);
console.log("password ",pass);

console.log('opening page');

var maxLoginTry = 3;
var currentLoginTry = 0;
function start(){

	loggedIn = false;
	
	casper.start("https://developer.amazon.com/rp/sales.html", function(){
		
		console.log('page opened');
					
		var that = this;
		
		loggedIn = this.evaluate(function(){
			return $("#edit-panel").length == 1;
		})
		
		casper.capture("page_before_login.png");
				
		if (loggedIn){
		
			console.log("logged in");
			//pcasper.capture("page_after_login.png");
		
			var sessionID = this.evaluate(function(){
				return jQuery("#sessionId").val();
			})
		
			var cookie = this.evaluate(function(){
				return document.cookie;
			});
				
			var sessionid
			var ubidmain;
			var xmain;
			var atmain;
			var devportalsession;
			
			for (var i=0;i< phantom.cookies.length;i++) {
			
				switch (phantom.cookies[i].name) {
                    case "session-id":
						sessionid =phantom.cookies[i].value;
					break;
                    case "ubid-main":
						ubidmain =phantom.cookies[i].value;
					break;
                    case "x-main":
						xmain = phantom.cookies[i].value;
					break;
                    case "at-main":
						atmain = phantom.cookies[i].value;
					break;
                    case "devportal-session":
						devportalsession = phantom.cookies[i].value;
					break;					
                }
				console.log("--->>"+phantom.cookies[i].name,phantom.cookies[i].value);
            }
			
			//curl 'https://developer.amazon.com/rp/res/sales/csv/appSalesSummary.file'
			//-H 'Pragma: no-cache'
			//-H 'Origin: https://developer.amazon.com'
			//-H 'Accept-Encoding: gzip, deflate'
			//-H 'Accept-Language: nl-NL,nl;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2'
			//-H 'Upgrade-Insecure-Requests: 1'
			//-H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36'
			//-H 'Content-Type: application/x-www-form-urlencoded'
			//-H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
			//-H 'Cache-Control: no-cache'
			//-H 'Referer: https://developer.amazon.com/rp/sales.html'
			//-H 'Cookie: id=019-5911113-7310667;
			//appstore-devportal-locale=en_US;
			//sessionid="178-7618403-5579164";
			//ubidmain="188-0492262-8307219";
			//sessionid="qI5nQUh+dXB5NT23Sxka+uQBjj42EoAB1hvGeC3HuhDcHTDak8bQ7BEp/XUTIaQ+KxCPadSaLIMF3BySL8AKCHitfuIAKrpYdSOLRKmr0uy2kt+fbnTCuXT4nBSl63ka0X9+rd2T7rVaGk2rCMQzgrTWw7TW1kxNFZ2k8x3XiOIUR0I4C292ktEsCmzQasYZYpfrOli7TmMMs7wvYBQHwY76dHys7MrL0a6zo3bZBKs=";
			//xmain="wjQGBUTMsXs6vyyVw1J6k9GbuSmQcsQ?";
			//atmain="5|EKYAgyuxBlkSsYf3E25zyOK2za7AXwgjmLe9qfeih1YNO90JOIxCteniYm051pLcL7iytf/SqCJs2eq75i0g6fjHgFW6Rxy3KWucgp66T0PJ7F4jol2stEaJpvDqT7t2OvCG6tJKV7rtiHSWaj1LP1Ka6PJUXzbkQZnKj+K7WtZdtI6JfANEJOvYCWW8lbcvLUg0hdy7u/R0hZ5ZkwZn9QzsiL534jhQ64XmY2QZ5Rjo7WRCxuwieKlrz6IBNFukaQyYJvjW4uJxf68SWeNSvjv0cnbO5B60";
			//' -H 'Connection: keep-alive'
			//--data 'ProductGroup=A31I45LN3W8UUM
			//&startTime=2016%2F01%2F26
			//&endTime=2016%2F02%2F01
			//&marketplaceId=marketplaceAll
			//&178-7618403-5579164=178-7618403-5579164
			//&groupByCountry=false' --compressed
			
			console.log("LOGGED IN WITH DETAILS");
			console.log("session_id",sessionid)	;
			console.log("ubid-main",ubidmain)	;
			console.log("x-main",xmain)	;
			console.log("at-main",atmain)	;
			console.log("devportal-session",devportalsession)	;
			
			//console.log("theee coooookieeeeee ---------->",phantom.cookies['at-main']);
			
			//console.log(JSON.stringify(phantom.cookies));
			
			
			
			
			
			console.log("cookie ");
			
			function readCookie(cookieName) {
				 var re = new RegExp('[; ]'+cookieName+'=([^\\s;]*)');
				 var sMatch = (' '+cookie).match(re);
				 if (cookieName && sMatch) return unescape(sMatch[1]);
				 return '';
			}
			var cookiecustom  = {};
			
			cookiecustom['session-id'] = sessionid; //ok
			cookiecustom['ubid-main'] = ubidmain //ok
			cookiecustom['x-main'] = xmain;  //ok
			cookiecustom['at-main'] = atmain; //ok
			cookiecustom['devportal-session'] = devportalsession;
			
			cookie = "";
			for (prop in cookiecustom){
				cookie += prop+"="+cookiecustom[prop]+"; "; 	
			}
			cookie = cookie.substring(0, cookie.length - 1);
			
			var url = 'https://developer.amazon.com/rp/res/sales/csv/inAppSalesDetail.file';
			var headers = {};
			headers['Pragma'] = "no-cache";
			headers['Origin'] = "https://developer.amazon.com";
			headers['Accept-Encoding'] = "gzip, deflate";
			headers['Accept-Language'] = "nl-NL,nl;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2";
			headers['Upgrade-Insecure-Requests'] = 1;
			headers['User-Agent'] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36";
			headers['Content-Type'] = "application/x-www-form-urlencoded";
			headers['Accept'] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8";
			headers['Cache-Control'] = "no-cache";
			headers['Referer'] = "https://developer.amazon.com/rp/sales.html";
			headers['Cookie'] = cookie;
			///headers['Cookie'] = '__utma=194891197.997525528.1435772723.1435772723.1435772723.1; x-wl-uid=1AlzLpOjKUkSRuqsuUh/y9UW6E3LwypJppWkr0GiHM0L5pHua/wMpogSbwemFKXxoLDLx3f4qjmBRDgZmTVyqPNeiJ0FmZGYOhZBllRMRp6JEdlTBAH+cKyK2qF5dJD/0vkU9smr1KlQ=; session-id-time=2082787201l; session-id=179-0548590-0612245; csm-sid=019-5911113-7310667; JSESSIONID=2DF038A847FECAE4100F900CF75052D8; ubid-main=188-0492262-8307219; session-token=JXFOlMEBSUSBPWxUhr6qKkjofsRiwnbwR8n/23C4u+gojLZK7v/opVqEmfqQ+9ChBsFm1VXfXuIsc5I7m/ajgkmG0NTQFt4CU3n/uCms2sNYfLxHsDOD6aurjyWbcSmoRzryrKfNQJkkVY0aDuEjgbrZY9Hh3bTgjFBpY8FG6rNoKwteEmNMgeiguWzfvnMWm4lkWPZQcy9lOhvP5+6bm9VNrfeo2HOGOF30XhvQyrATVTzehIrlw7Z4g3X67yB7KCVkXK4hTM6vZ7cMStWPsFe7OnuXyoMH; x-main="71y0TRjt07Ldb1y?0HyNCeFP5qWNyHoM"; at-main=5|s4ldkpfXdp0xvYLAXw42PyjjJOUZqUCs0XfNIUlyMeVIg7+2GZpf3J9bG2JN+72QTrxJu1u4QUjXWS+K6B4Bir4c0ieDc5ObiyW8DMF9jHDj+xjX2x8wIAFgW38jk5Fzo5LHhZiPaOdiSUW2MV7l0KLsQTQ0nOWE5yNJLlKRG38NBmXjMf1bbXEgWPXWoxsNOdXb1l8+IVo3Rh0e9nrkL8VVPaHCO9MtrEW8+wlwfWx47n8KmfIlzSBxkdYgnGc8FZbC7GolLdG836Xi0+nuWwgvF6e370/v; sess-at-main="cFmghSByy2ihXudPKlzRGuUEh1Q2pYN22Glsg2Ku8PA="; devportal-session="wDUU23EHDTPKs0/vNEBXak2z5PFIRYYuZBHlpXT9t4bX6nGvieC3yalg9fkUXfJ/mT8g1DyQyR88Z1ZVinYetexYzyc2TMJLNzqS9IUMWQMZCPGNLUd42+IGq2jxh6op3MKgsIpEYnrS+cpVTL6xjRDTntHhrKqqlqiOzSo5M3Ta7Bwt6AHdram2FFvPrV9Gu3izit5AJfJG8bn+bEBm1e0UfGE2Sf0qYvbhiJqH1k4JdzW6w0Tde38M8IoKogyl0pAjT3F/PgwRaHZw/6bt0sgyj9LdTae+h5Z/Y2HiYz0="; s_cc=true; s_vnum=1454281200525%26vn%3D3; s_sq=%5B%5BB%5D%5D; s_fid=5FDCDB796A14EAF7-1B4DE0A3F8D4D4E9; s_nr=1453900269972-Repeat; s_invisit=true';
			headers['Connection'] = "keep-alive";
			
			var data = {};
			data['ProductGroup'] = "A31I45LN3W8UUM";
			data['startTime'] = startDate;
			data['endTime'] = endDate;
			data['marketplaceId'] = 'marketplaceAll';
			data[sessionid] = sessionid;
			data['groupByCountry'] = 'false';
			
			var extraParams = [];
			extraParams.push("--compressed");
			
			//var command = "curl 'https://developer.amazon.com/rp/res/sales/csv/inAppSalesDetail.file'";
			var command = "curl 'https://developer.amazon.com/rp/res/sales/csv/aggregateSalesSummary.file'";
			
			for (var prop in headers){
				command += " -H '"+prop+": "+headers[prop]+"'";
			}
			command += " --data '";
			for (var prop in data){
				command += prop+"="+data[prop]+"&";
			}
			command = command.substring(0, command.length - 1);
			command += "' ";
			
			for (var i=0; i < extraParams.length;i++){
				command += extraParams[i]+" ";
			}
			
			command += " > amazonstats.csv";
			console.log("generated command",command);
			
			fs.write("curlcommand", command, 'w');
		}
		else{
			casper.capture("page_after_failed_login.png");
			
			if (currentLoginTry > 0) {
                console.log("Aowww failed to login -> retry ",currentLoginTry,"of",maxLoginTry);
            }			
			if (currentLoginTry > 2) {
                console.log("You died -> no more login retries. Did you use proper username and password?");
				casper.exit();
				phantomjs.exit();
            }
			currentLoginTry++;
			console.log("Not logged in -> going to login with ",user,pass);		
			this.fill('form[id="ap_signin_form"]', { email: user, password: pass }, true);
		}	
	});
	
	
	casper.then(function(){
		
		if (!loggedIn){
			start();
		}
		else{
			console.log("done");
			casper.exit();
		}
		
	});
		
	casper.run(function() {});
}

start();

	












