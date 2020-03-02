function getHTML(url, cFunction) {
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this.responseText);
    }
 };
  xhttp.open("GET", url, true);
  xhttp.send();
}
function toObject(s) {
	var parser = new DOMParser()
	var el = parser.parseFromString(s, "text/html");
	var ul = el.getElementsByClassName("ui-articles")[2];
	var li = el.getElementsByTagName("li");
	console.log(li.innerHTML);
}
getHTML("aacps_test/5690", toObject);
