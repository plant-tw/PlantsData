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
        var request = new XMLHttpRequest();
        request.overrideMimeType("application/json");
        request.open("GET", "data.json", true);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                dataString = request.responseText;
                callback(dataString);
            }
        };
        request.send(null);
    };

    var show = function (key) {
        var errMsg = "";
        if (typeof(key) !== "string") {
            errMsg = "Error: not string type";
            document.getElementsByClassName("name")[0].textContent = errMsg;
            document.getElementsByClassName("description")[0].textContent = "";
            document.getElementsByClassName("image")[0].src = "#";
            return;
        }
        loadJSON(function (dataString) {
            var dataDict = JSON.parse(dataString);
            obj = dataDict[key];
            if (obj === undefined) {
                errMsg = "我不認得或沒看到花...";
                document.getElementsByClassName("name")[0].textContent = errMsg;
                document.getElementsByClassName("description")[0].textContent = "";
                document.getElementsByClassName("image")[0].src = "#";
                return;
            }
            var name = key;
            var txt = obj.Txt;
            document.getElementsByClassName("name")[0].textContent = name;
            document.getElementsByClassName("description")[0].textContent = txt;
            document.getElementsByClassName("image")[0].src = "#";
        });
    };

    var loadImages = function () {
        // TODO: developer mode
        // var errMsg = "";
        if (obj === undefined) {
            // errMsg = "Error: run show() before loadImages()";
            // document.getElementsByClassName("name")[0].textContent = errMsg;
            document.getElementsByClassName("description")[0].textContent = "";
            document.getElementsByClassName("image")[0].src = "#";
            return;
        }
        document.getElementsByClassName("image")[0].src = obj.Img;
    };

    return {
        loadImages: loadImages,
        show: show
    };
}());
