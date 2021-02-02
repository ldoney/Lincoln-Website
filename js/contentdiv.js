function main() {
  const navbars = (".content-div");
  for (let i = 0; i < navbars.length; i++) {
    handleNavbar(navbars[i]);
  }
}
function handleNavbar(navbar) {
  const body = $(".content-body")[0];
  const bodyDisplay = $(".selected")[0];
  const headers = $(".content-navbar")[0].getElementsByTagName("div");

  let found = -1;

  for (let i = 0; i < headers.length; i++) {
    if (headers[i].className == "checked") {
      found = i;
      break;
    }
  }
  if (found == -1) {
    headers[0].className = "checked";
    found = 0;
  }
  for (let i = 0; i < headers.length; i++) {
    headers[i].contentSelectId = i;
    headers[i].onclick = function () {
      select(this);
    };
  }
  display(bodyDisplay, found);
  selected = headers[found];
}
function display(el, index) {
  el.innerHTML = el.parentElement.getElementsByTagName("div")[
    index + 1
  ].innerHTML;
}
function select(el) {
  display($(".selected")[0], el.contentSelectId);
  $(".checked")[0].className = "";
  el.className = "checked";
}
window.onload = (event) => {
  main();
};
