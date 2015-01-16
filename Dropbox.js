var fs = require('fs');

var request = require('request');
var myToken = {};

var standardheaders = {
    'User-Agent' : 'Super Agent/0.0.1',
    'Content-Type' : 'application/x-www-form-urlencoded'
};

//var main = function (token) {
//    
//
//    processAction(accountInfoOptions, function (err, body) {
//        if (err) {
//            console.log(err);
//        } else {
//            console.log(body);
//        }
//    });
//    
//    processAction(new ShareLinkOptions("distribution"), function (err, body) {
//        if (err) {
//            console.log(err);
//        } else {
//            console.log(body);
//        }
//    });   
//    processAction(new ShareLinkOptions("apps"), function (err, body) {
//        if (err) {
//            console.log(err);
//        } else {
//            console.log(body);
//        }
//    });     
//};

var processAction = function (optionSet, cb) {
    request(optionSet, function (error, response, body) {
        if (error) {
            console.log("request error:", error);
            cb("error");
        } else if (response.statusCode === 200) {
            //console.log("correct response:", body);
            cb(null, body);
        } else {
            console.log("unusual response:", response);
            cb("unusual response:");
        }
    });
};

var tokenManager = (function () {
    var token;
    var requestToken = function () {
        var saveToken = function (newToken) {
            token = JSON.parse(newToken);
            fs.writeFile("token.json", newToken, function (err) {
                if (err) {
                    console.log("writeFile Error:", err);
                } else {
                    standardheaders.Authorization = "Bearer " + token.access_token;
                }
            });
        };
        
        fs.readFile("settings.json", function (err, data) {
            if (err) {
                console.log("readFile Error:", err);

            } else {
                var settings = JSON.parse(data);
                var options = {
                    url : 'https://api.dropbox.com/1/oauth2/token',
                    method : 'POST',
                    headers : standardheaders,
                    form : {
                        'grant_type' : 'authorization_code',
                        'code' : settings.authCode
                    },
                    auth : {
                        username : settings.appKey,
                        password : settings.appSecret
                    }
                };
                processAction(options, function (err, body) {
                    if (err) {
                        console.log("Request token Error:", err);
                    } else {
                        saveToken(body);
                    }
                });
            }
        });
    };

    fs.readFile("token.json", function (err, data) {
        if (err) {
            console.log("readFile Error:", err);
            requestToken();
        } else {
            token = JSON.parse(data);
            standardheaders.Authorization = "Bearer " + token.access_token;
        }
    });
    return {
        ready : function () {
            if (token) {
                return true;
            }
            return false;
        }
    };
})();
exports.ready = tokenManager.ready;

//var accountInfoOptions = {
//    url : 'https://api.dropbox.com/1/account/info',
//    method : 'GET',
//    headers : standardheaders,
//    rejectUnauthorized : false
//};

var ShareLinkOptions = function (path) {
    var options = {
        url : 'https://api.dropbox.com/1/shares/auto/' + path,
        method : 'POST',
        headers : standardheaders,
        rejectUnauthorized : false
    };
    return options;
};

var getLink = function (path, cb) {
    if (tokenManager.ready()) {
        processAction(new ShareLinkOptions(path), function (err, body) {
            if (err) {
                console.log("processAction Error:", err);
            } else {
                cb(null, JSON.parse(body).url);
            }
        });
    } else {
        cb("Not Ready");
    }
};
exports.getLink = getLink;
