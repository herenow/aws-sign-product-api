var http = require("http");

var aws = require("./main.js")("YOUR ACCESS KEY", "YOUR SECRET KEY");

var object = aws.sign_url("http://webservices.amazon.com/onca/xml?Service=AWSECommerceService&Operation=ItemLookup&ItemId=0679722769&ResponseGroup=ItemAttributes,Offers,Images,Reviews");

//object
//{
//    url: "signed url"
//    signature: "signature"
//}

http.get(object.url, function(res) {
    
    getBody(res, function(data) {
        
        console.log(data);
        
    });
    
});


function getBody(res, callback) {

    var data = "";

    res.on("data", function(chunk) {
        data += chunk;
    });

    res.on("end", function() {
        callback(data);
    });

}