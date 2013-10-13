var http = require("http");
var crypto = require('crypto');

var aws_access_key, aws_secret_key;


module.exports = main;
module.exports.sign_url = sign_url;


function main(access_key, secret_key) {
    
    if(!access_key || !secret_key) throw new Error('You pass the AWS_ACCESS_KEY and AWS_SECRET_KEY to generate signatures!');
    
    aws_access_key = access_key;
    aws_secret_key = secret_key;
    
    return module.exports;
}

function sign_url(uri) {
    
    var parameters = [];
    var string = "";
    var signature = "";
    var url = "";
    
    var date = new Date();
    date.setMinutes(date.getMinutes() + 300000);
    var timestamp = date.toISOString();
    
    var match = uri.match(/(https?:\/\/)(([a-z0-9]+\.?)*)(\/[a-z0-9]+[^w\?]+)?(\?)?(.*)?/);
    
    var protocol = match[1];
    var server = match[2];
    var path = match[4] || "/";
    var query = match[6];
    
    
    /* Build the string */
    
    query = query + (!query ? "" : "&") + "AWSAccessKeyId=" + aws_access_key + "&Version=2009-01-06&Timestamp=" + timestamp;
    
    string = (
        "GET\n" +
        server + "\n" +
        path + "\n"
    );
    
    (query.split("&")).forEach(function(value) {
        value = value.split("=");
        parameters.push( value[0] + "=" + encodeURIComponent(value[1]) );
    });
    
    parameters = parameters.sort();
    
    for(var i = 0; i < parameters.length; i++) {
        string += parameters[i] + (i+1 < parameters.length ? "&" : "");
    }
    
    //console.log(string)
    
    /* Now get signature */
    
    signature = crypto.createHmac('sha256', aws_secret_key).update(string).digest('base64');
    signature = encodeURIComponent(signature);
    
    /* Rebuild the uri */
    url = protocol + server + path + "?" + query + "&Signature=" + signature;
    
    return {url: url, signature: signature};
    
}