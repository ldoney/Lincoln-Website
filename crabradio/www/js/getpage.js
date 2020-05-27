function getHTML() { 
	var xmlhttp = new XMLHttpRequest(); 
	xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
		var list = returnList(this.responseText);
		createCookie("podcasts", list, 1);
            }
        };
        xmlhttp.open("GET", "https://lincolndoney.com/crabradio/www/download.php", true);
        xmlhttp.send();
}
function createCookie(cname, cvalue, exdays)
{
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function getPodcasts()
{
	if(getCookie("podcasts") == null || getCookie("podcasts") == "")
	{
		getHTML();
	}
	return getCookie("podcasts");
}
function returnList(dom)
{
	var text = dom;
	var doc = new DOMParser().parseFromString(text, "text/html");
	console.log(doc);
	var li = doc.getElementsByClassName("ui-articles")[0];
	var jli = [];
	var le = li.getElementsByTagName("li");
	for(var i = 0; i < le.length; i++)
	{
		var el = le[i];
		var tel = {};
		tel.title = el.getElementsByTagName("span")[0].innerHTML;
		jli.push(tel);
	}
	return JSON.stringify(jli);
}
getPodcasts();
