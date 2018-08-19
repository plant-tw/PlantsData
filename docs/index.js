var doc = function() {
  var show = function(key) {
    if (typeof(key) !== "string") {
      document.getElementsByClassName("name")[0].textContent = "Error: not string type";
      document.getElementsByClassName("image")[0].src = "";
      document.getElementsByClassName("description")[0].textContent = "";
      return;
    }
    loadJSON(function(response) {
      var data = JSON.parse(response);
      var obj = data[key];
      if (obj === undefined) {
        document.getElementsByClassName("name")[0].textContent = "Error: not found";
        document.getElementsByClassName("image")[0].src = "";
        document.getElementsByClassName("description")[0].textContent = "";
        return;
      }
      var name = key;
      var img = obj.img;
      var txt = obj.txt;
      document.getElementsByClassName("name")[0].textContent = name;
      document.getElementsByClassName("image")[0].src = img;
      document.getElementsByClassName("description")[0].textContent = txt;
    });
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
    show: show
  };
}();
