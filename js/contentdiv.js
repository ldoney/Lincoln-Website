function main()
{
 var navbars = document.getElementsByClassName("content-div");
 for(var i = 0; i < navbars.length; i++)
 {
  handleNavbar(navbars[i], );
 }
}
function handleNavbar(navbar)
{
 var body = navbar.getElementsByClassName("content-body")[0];
 var bodyDisplay = body.getElementsByClassName("selected")[0];
 var headers = navbar.getElementsByClassName("content-navbar")[0].getElementsByTagName("div");
 var found = -1;
 for(var i = 0; i < headers.length; i++) {
    if (headers[i].className == 'checked') {
        found = i;
        break;
    }
 }
 if(found == -1)
 {
	headers[0].className = "checked";
	found = 0;
 }
 for(var i = 0; i < headers.length; i++)
 {
  headers[i].contentSelectId = i;
  headers[i].onclick = function() {
	select(this);
  };
 }
  display(bodyDisplay, found);
  selected = headers[found];
}
function display(el, index)
{
	el.innerHTML = el.parentElement.getElementsByTagName("div")[index + 1].innerHTML;
}
function select(el)
{
	var bar = el.parentElement;
	var wrap = bar.parentElement;
	var body = wrap.getElementsByClassName("content-body")[0];
	display(body.getElementsByClassName("selected")[0], el.contentSelectId);
	bar.getElementsByClassName("checked")[0].className = "";
	el.className = "checked";
}
window.onload = (event) => {
  main();
};

