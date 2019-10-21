var doc = (function () {
    "use strict";
    var dataString;
    var obj;
    var type;

    // See: https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
    var loadJSON = function (callback) {
        if (dataString !== undefined) {
            callback(dataString);
            return;
        }
	var urlParams = new URLSearchParams(window.location.search);
	var dataLocation;
	if (urlParams.get("type") === "swcp") {
	  type = "swcp";
	  dataLocation = "swcp.json";
	} else {
	  type = "daan-park";
	  dataLocation = "data.json";
        }
        var request = new XMLHttpRequest();
        request.overrideMimeType("application/json");
        request.open("GET", dataLocation, true);
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
	        if (type === "swcp") {
		  errMsg = "無法辨識或非水土保持植物"
		} else {
                  errMsg = "我不認得或沒看到花...";
		}
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
