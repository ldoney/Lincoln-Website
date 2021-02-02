var commandstop = [
  { hotkey: "^G", desc: "Get Help" },
  { hotkey: "^O", desc: "Write Out" },
  { hotkey: "^W", desc: "Where Is" },
  { hotkey: "^K", desc: "Cut Text" },
  { hotkey: "^J", desc: "Justify" },
  { hotkey: "^C", desc: "Cur Pos" },
  { hotkey: "^Y", desc: "Prev Page" },
  { hotkey: "M-~", desc: "First Line" },
  { hotkey: "M-W", desc: "WhereIs Next" },
  { hotkey: "^^", desc: "Mark Text" },
  { hotkey: "M-}", desc: "Indent Text" },
  { hotkey: "M-U", desc: "Undo" },
  { hotkey: "^B", desc: "Back" },
  { hotkey: "^←", desc: "Prev Word" },
  { hotkey: "^A", desc: "Home" },
  { hotkey: "^P", desc: "Prev Line" },
  { hotkey: "^↑", desc: "Prev Block" },
];
var commandsbtm = [
  { hotkey: "^X", desc: "Exit" },
  { hotkey: "^R", desc: "Read File" },
  { hotkey: "^~", desc: "Replace" },
  { hotkey: "^U", desc: "Uncut Text" },
  { hotkey: "^T", desc: "To Spell" },
  { hotkey: "^_", desc: "Go To Line" },
  { hotkey: "^V", desc: "Next Page" },
  { hotkey: "M-/", desc: "Last Line" },
  { hotkey: "M-]", desc: "To Bracket" },
  { hotkey: "M-^", desc: "Copy Text" },
  { hotkey: "M-{", desc: "Unindent Text" },
  { hotkey: "M-E", desc: "Redo" },
  { hotkey: "^F", desc: "Forward" },
  { hotkey: "^→", desc: "Next Word" },
  { hotkey: "^E", desc: "End" },
  { hotkey: "^N", desc: "Next Line" },
  { hotkey: "^↓", desc: "Next Block" },
];

function fadeOut(el) {
  el.style.transition = "opacity 0.5s linear 0s";
  el.style.opacity = 0;
}
function fadeIn(el) {
  el.style.transition = "opacity 0.5s linear 0s";
  el.style.opacity = 1;
}

function distanceBetweenElems(elem1, elem2) {
  var div1rect = elem1.getBoundingClientRect();
  var div2rect = elem2.getBoundingClientRect();
  var div1x = div1rect.left + div1rect.width / 2;
  var div1y = div1rect.top + div1rect.height / 2;

  var div2x = div2rect.left + div2rect.width / 2;
  var div2y = div2rect.top + div2rect.height / 2;

  var distanceSquared = Math.pow(div1x - div2x, 2) + Math.pow(div1y - div2y, 2);
  var distance = Math.sqrt(distanceSquared);
  return distance;
}

window.addEventListener("load", function () {
  const body = $("body")[0];
  //00960040
  function setBckgrnd() {
    const opacitymin = 8;
    const opacitymax = 12;
    let curopacity = opacitymin;
    let up = true;

    const timer = setInterval(function () {
      setOpacity(curopacity);
      if (curopacity < opacitymin) {
        up = true;
      } else if (curopacity > opacitymax) {
        up = false;
      }
      if (up) {
        curopacity++;
      } else {
        curopacity--;
      }
    }, 25);
  }
  function setOpacity(opacity) {
    body.style.backgroundImage =
      "radial-gradient(#009600" + parseInt(opacity, 16) + ",black 120%)";
  }
  setBckgrnd();

  window.onscroll = function () {
    var header = ("#header");

    var sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
  };
  function resize() {
    var cmdtbl = document.getElementById("commands-list");
    var tablerowtop = document.getElementById("commands-top");
    var tablerowbtm = document.getElementById("commands-btm");

    var content = document.getElementsByClassName("content")[0];
    var cmddiv = document.getElementById("commands-container");
    var dist = distanceBetweenElems(content, cmddiv);
    var offsets = (cmddiv.offsetHeight + content.offsetHeight) / 2;
    if (dist < offsets) {
      cmddiv.style.opacity = "" + dist / offsets / 4 + "";
    } else {
      cmddiv.style.opacity = 1.0;
    }
    var maxwidth = cmdtbl.clientWidth;
    var width = 175;
    var sections = Math.floor(maxwidth / width);
    tablerowtop.innerHTML = "";
    tablerowbtm.innerHTML = "";

    for (var i = 0; i < sections; i++) {
      var tdt = document.createElement("td");
      var spant = document.createElement("span");
      spant.class = "hotkey";
      spant.innerHTML = commandstop[i].hotkey;
      tdt.appendChild(spant);

      tdt.innerHTML += " " + commandstop[i].desc;

      tablerowtop.appendChild(tdt);

      var tdb = document.createElement("td");
      var spanb = document.createElement("span");
      spanb.class = "hotkey";
      spanb.innerHTML = commandsbtm[i].hotkey;
      tdb.appendChild(spanb);

      tdb.innerHTML += " " + commandsbtm[i].desc;

      tablerowbtm.appendChild(tdb);
    }
  }
  resize();
  body.onresize = resize;
});
