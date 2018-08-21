var doc = (function () {
    "use strict";
    var dataString;
    var obj;

    // See: https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
    var loadJSON = function (callback) {
        if (dataString !== undefined) {
            callback(dataString);
            return;
        }
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open("GET", "data.json", true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState === 4 && xobj.status === 200) {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                dataString = xobj.responseText;
                callback(dataString);
            }
        };
        xobj.send(null);
    };

    var show = function (key) {
        var errMsg = "";
        if (typeof(key) !== "string") {
            errMsg = "Error: not string type";
            document.getElementsByClassName("name")[0].textContent = errMsg;
            document.getElementsByClassName("description")[0].textContent = "";
            document.getElementsByClassName("image")[0].src = "";
            return;
        }
        loadJSON(function (dataString) {
            var dataDict = JSON.parse(dataString);
            obj = dataDict[key];
            if (obj === undefined) {
                errMsg = "Error: not found";
                document.getElementsByClassName("name")[0].textContent = errMsg;
                document.getElementsByClassName("description")[0].textContent = "";
                document.getElementsByClassName("image")[0].src = "";
                return;
            }
            var name = key;
            var txt = obj.txt;
            document.getElementsByClassName("name")[0].textContent = name;
            document.getElementsByClassName("description")[0].textContent = txt;
            document.getElementsByClassName("image")[0].src = "";
        });
    };

    var loadImages = function () {
        var errMsg = "";
        if (obj === undefined) {
            errMsg = "Error: run show() before loadImages()";
            document.getElementsByClassName("name")[0].textContent = errMsg;
            document.getElementsByClassName("description")[0].textContent = "";
            document.getElementsByClassName("image")[0].src = "";
            return;
        }
        document.getElementsByClassName("image")[0].src = obj.img;
    };

    return {
        loadImages: loadImages,
        show: show
    };
}());
