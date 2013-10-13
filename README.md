AWS-Product-Advertising-API-Signature
=====================================

This is a signature creator for the AWS Product Advertising REST API. Dont try to use this signature method for other AWS API's!!! It won't work.



Usage
--------------
``````
var http = require("http");
var generator = require("aws-prod-adv-signature")("YOUR ACCESS KEY", "YOUR SECRET KEY");

var url = "http://webservices.amazon.com/onca/xml?Service=AWSECommerceService&Operation=ItemLookup&ItemId=0679722769&ResponseGroup=ItemAttributes,Offers,Images,Reviews";

var object = generator.sign_url(url);

//object.url => signed url
//object.signature => signature

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
``````
