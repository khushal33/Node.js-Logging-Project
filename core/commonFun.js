exports.getIp = function(req) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    return ip;
}
exports.isset=function(object){
    var value= (typeof object !=='undefined' && object !==null && object !=="" && object !=='null' && object !=='undefined')?true:false;
    return value;
}
exports.sqlstring = function(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}


var cap= function(string) 
{
    if(string!=null && string!=''){
        string = string.toLowerCase();
        string = string.trim();
        // console.log("cap",string)
        return string[0].toUpperCase() + string.slice(1);
    } else {
        return null;
    }
}
exports.capitalize= cap;

exports.uniqueBy=function(arr, fn) {
    var unique = {};
    var distinct = [];
    arr.forEach(function (x) {
        var key = cap(fn(x));
        if (!unique[key] && key!=null) {
            distinct.push(key);
            unique[key] = true;
        }
    });
    return distinct;
}
exports.varSlug=function(str){
        var slug = '';
        var trimmed = str.trim();
        slug = trimmed.replace(/[^a-z0-9-]/gi, '_').
        replace(/_+/g, '_').
        replace(/^_|_$/g, '');
        return slug.toLowerCase();
}
exports.slug=function(str){
        var slug = '';
        var trimmed = str.trim();
        slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
        replace(/-+/g, '-').
        replace(/^-|-$/g, '');
        return slug.toLowerCase();
}

exports.generateCode = function(NO,DIGIT) {
    var result=0;
    switch(DIGIT) {
        case 2:
            result = 10+parseInt(NO);
            break;
        case 3:
            result = 100+parseInt(NO);
            break;
        case 4:
            result = 1000+parseInt(NO);
            break;
        case 5:
            result = 10000+parseInt(NO);
            break;
        case 6:
            result = 100000+parseInt(NO);
            break;
        default:
            result = 100+parseInt(NO);
    }
    return result;
}