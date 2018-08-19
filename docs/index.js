var doc = function() {
  var obj;
  var show = function(key) {
    if (typeof(key) !== "string") {
      document.getElementsByClassName("name")[0].textContent = "Error: not string type";
      document.getElementsByClassName("description")[0].textContent = "";
      document.getElementsByClassName("image")[0].src = "";
      return;
    }
    loadJSON(function(response) {
      var data = JSON.parse(response);
      obj = data[key];
      if (obj === undefined) {
        document.getElementsByClassName("name")[0].textContent = "Error: not found";
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

  var loadImages = function() {
    if (obj === undefined) {
      document.getElementsByClassName("name")[0].textContent = "Error: not found";
      document.getElementsByClassName("description")[0].textContent = "";
      document.getElementsByClassName("image")[0].src = "";
      return;
    }
    document.getElementsByClassName("image")[0].src = obj.img;
  };

  // See: https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
  var loadJSON = function(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "data.json", true);
    xobj.onreadystatechange = function () {
     if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 };

  return {
    loadImages: loadImages,
    show: show
  };
}();
