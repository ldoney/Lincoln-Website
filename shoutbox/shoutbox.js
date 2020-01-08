var name = "user";
var intro = true;
window.addEventListener('load', function() {
	askName();
});
function askName()
{
	var text = new TypeIt('#prompt', {
		afterComplete: (instance) => {
			document.getElementById("prompt").getElementsByClassName("ti-cursor")[0].style.visibility = "hidden";
		},
		lifeLike: true,
	})
	.type('What is your name?')
	text.go();
}
function confirmName()
{
	var inpt = document.getElementById("name-input");
	if(!(inpt.value == "" || inpt.value == " " || inpt.value == null))
	{
		name = inpt.value;
		setup();
	}else
	{
		var prompt = document.getElementById("prompt");
		prompt.innerHTML = "";
		prompt.className = "redspan";
		var text = new TypeIt('#prompt', {
			afterComplete: (instance) => {
				document.getElementById("prompt").getElementsByClassName("ti-cursor")[0].style.visibility = "hidden";
			},
			lifeLike: true,
		})
		.type('Enter a valid name!')
		text.go();
	}
}
function setup()
{
	intro = false;
	name = censor(name);
	document.getElementById("unloadedwrapper").style.display = "none";
	document.getElementById("loadedwrapper").style.display = "block";
	document.getElementById("welcomediv").innerHTML = "Welcome, "+name;
	getMessages();
	setInterval(spin, 500);
	document.getElementById("input-box").focus();

}
window.addEventListener('click', function(event)
{
	if(!intro)
	{
		document.getElementById("input-box").focus();
	}else
	{
		document.getElementById("name-input").focus();
	}
});
var iteration = 0;
function spin()
{
	var iterations = ["\\" , `\|`, "\/" , "\-"];
	if(iteration >= (iterations.length - 1))
	{
		iteration = 0;
	}else
	{
		iteration++;
	}
	document.getElementById("loadingdisp").innerHTML = iterations[iteration];
}
function getMessages() {
	var http = new XMLHttpRequest();
	var url = '/shoutbox/src/messages.json';
	var params = '';
	http.open('GET',url,true);
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			parseMessages(JSON.parse(http.responseText));
		}
	}
	http.send(params);
}
function sanitize(data)
{
	var options = {
	whiteList: {
	     a: ["href", "title", "target"]
	   }
	};
	return filterXSS(data, options);
}
function addNewMessage(el)
{
		var p = document.createElement("p");
		var time = document.createElement("span");
		var messager = document.createElement("span");
		var message = document.createElement("span");
		time.className = "greenspan";
		messager.className = "bluespan";
		var tm = new Date(el.time);
		var tmdisp = "(" + (tm.getMonth() + 1) + "/" + tm.getDate() + "/" + tm.getFullYear() + "|" + tm.toLocaleTimeString('en-US') + ")";
		time.innerHTML = tmdisp + " ";
		messager.innerHTML = sanitize(el.messager) + " ";
		message.innerHTML = sanitize(el.message) + " ";
		p.appendChild(time);
		p.appendChild(messager);
		p.appendChild(message);
		messagediv.appendChild(p);
		messagediv.scrollTop = messagediv.scrollHeight;
}
function parseMessages(json)
{
	var messagediv = document.getElementById("messagediv");
	for(var i = 0; i < json.length; i++)
	{
		addNewMessage(json[i]);
	}
	document.getElementById("loadingdisp").style.display = "none";
}
function sendNewText()
{
	var http = new XMLHttpRequest();
	var url = '/shoutbox/send.php';
	var date = (new Date().toJSON());
	var text = censor(document.getElementById("input-box").value);
	if(text == "" || text == " " || text == null)
	{
		alert("Send a text bruv!");
	}else if (name == null)
	{
		alert("Make a name!");
	}else
	{
		if(name == "" || name == "null")
		{
			name = "user";
		}
		var json = {};
		json.time = date;
		json.messager = censor(name);
		json.message = censor(text);
		doSend(JSON.stringify(json));
		addNewMessage(json);
		document.getElementById("loadingdisp").style.display = "block";
		var params = 'time=' + date + '&messager='+name + '&message=' + text;
		http.open('GET',url+"?"+params,true);
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
				console.log(http.responseText);
			}
		}
		http.send();
	}
}

function send()
{
	sendNewText();
	document.getElementById("input-box").value = "";
}
document.addEventListener("keyup", function(event)
{
    event.preventDefault();
    if (event.keyCode === 13) {
	if(!intro){
		send();
	}else
	{
		confirmName();
	}
    }
});


function censor(content)
{
	var badWords = [""];
//	var badWords = ["fuck", "bitch", "cunt", "nigger", "nigga", "shit", "dick", "penis", "sex", "p3n1s", "n1gger", "n1gga", "f4ck","cunt","pen15","sh1t","sh!t","faggot", "pen1s"];
	return star(content, badWords);
}
function star(string, filters)
{
	var regex = new RegExp(filters.join("|", "gi"));
	return string.replace(regex, function(match) {
		var stars = '';
		for(var i = 0; i < match.length; i++) {
			stars += "*";
		}
		return stars;
	});
}
