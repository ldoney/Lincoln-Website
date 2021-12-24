var name = "user";
var intro = true;

var websocket = new WebSocket("ws://127.0.0.1:2345");
websocket.onopen = function (evt) {
  console.log("Opened websocket!");
  console.log(evt.data);
};
websocket.onclose = function (evt) {
};
websocket.onmessage = function (evt) {
  let res = JSON.parse(evt.data);
  console.log(res);
  if(res == undefined) {
    // Idk what to do, malformed message probably?
  } else if(res["user_count"] != null) {
    $("#user_count")[0].innerHTML = res["user_count"];
  } else if(res["from"] != null) {
    addNewMessage(res);
  }
};
websocket.onerror = function (evt) {
  writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
};

window.addEventListener("load", function () {
  typeMessage("What is your name?");
});

function typeMessage(msg) {
  new TypeIt("#prompt", {
    afterComplete: (instance) => {
      $("#prompt")[0].getElementsByClassName("ti-cursor")[0].style.visibility = "hidden";
    },
    lifeLike: true,
  }).type(msg).go();
}
function confirmName() {
  let input = $("#name-input")[0].value;
  if (input != "" && input != " " && input != null) {
    name = input;
    intro = false;
    name = censor(name);
    $("#unloadedwrapper")[0].style.display = "none";
    $("#loadedwrapper")[0].style.display = "block";
    $("#username-display")[0].innerHTML = name;
    setInterval(spin, 500);
    $("#input-box")[0].focus();
  } else {
    let prompt = $("#prompt")[0];
    prompt.innerHTML = "";
    prompt.className = "redspan";
    typeMessage("Enter a valid name!");
  }
}

window.addEventListener("click", function (event) {
  if (!intro) {
    $("#input-box")[0].focus();
  } else {
    $("#name-input").focus();
  }
});
var iteration = 0;
function spin() {
  var iterations = ["\\", `\|`, "/", "-"];
  if (iteration >= iterations.length - 1) {
    iteration = 0;
  } else {
    iteration++;
  }
  $("#loadingdisp").innerHTML = iterations[iteration];
}
function sanitize(data) {
  var options = {
    whiteList: {
      a: ["href", "title", "target"],
    },
  };
  return filterXSS(data, options);
}
function addNewMessage(el) {
  var p = document.createElement("p");
  var time = document.createElement("span");
  var messager = document.createElement("span");
  var message = document.createElement("span");
  time.className = "greenspan";
  messager.className = "bluespan";
  var tm = new Date(el.time);
  var tmdisp =
    "(" +
    (tm.getMonth() + 1) +
    "/" +
    tm.getDate() +
    "/" +
    tm.getFullYear() +
    "|" +
    tm.toLocaleTimeString("en-US") +
    ")";
  time.innerHTML = tmdisp + " ";
  messager.innerHTML = sanitize(el.messager) + " ";
  message.innerHTML = sanitize(el.message) + " ";
  p.appendChild(time);
  p.appendChild(messager);
  p.appendChild(message);
  messagediv.appendChild(p);
  messagediv.scrollTop = messagediv.scrollHeight;
}
function parseMessages(json) {
  var messagediv = $("#messagediv")[0];
  for (var i = 0; i < json.length; i++) {
    addNewMessage(json[i]);
  }
  $("#loadingdisp")[0].style.display = "none";
}
function send() {
  var http = new XMLHttpRequest();
  var date = new Date().toJSON();
  var text = censor($("#input-box")[0].value);
  if (text == "" || text == " " || text == null) {
    alert("Send a text bruv!");
  } else if (name == null) {
    alert("Make a name!");
  } else {
    if (name == "" || name == "null") {
      name = "user";
    }
    var json = {
      time: date,
      from: name,
      message: text
    };
    websocket.send(JSON.stringify(json));
  }
  $("#input-box")[0].value = "";
}

document.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    if (!intro) {
      send();
    } else {
      confirmName();
    }
  }
});

function censor(content) {
  var badWords = [""];
  return star(content, badWords);
}
function star(string, filters) {
  var regex = new RegExp(filters.join("|", "gi"));
  return string.replace(regex, function (match) {
    var stars = "";
    for (var i = 0; i < match.length; i++) {
      stars += "*";
    }
    return stars;
  });
}

function writeToScreen(message) {
  var pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
}
