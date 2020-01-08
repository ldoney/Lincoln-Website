var commandstop = [
	{"hotkey":"^G","desc":"Get Help",},
	{"hotkey":"^O","desc":"Write Out",},
	{"hotkey":"^W","desc":"Where Is",},
	{"hotkey":"^K","desc":"Cut Text",},
	{"hotkey":"^J","desc":"Justify",},
	{"hotkey":"^C","desc":"Cur Pos",},
	{"hotkey":"^Y","desc":"Prev Page",},
	{"hotkey":"M-\~","desc":"First Line",},
	{"hotkey":"M-W","desc":"WhereIs Next",},
	{"hotkey":"^^","desc":"Mark Text",},
	{"hotkey":"M-}","desc":"Indent Text",},
	{"hotkey":"M-U","desc":"Undo",},
	{"hotkey":"^B","desc":"Back",},
	{"hotkey":"^←","desc":"Prev Word",},
	{"hotkey":"^A","desc":"Home",},
	{"hotkey":"^P","desc":"Prev Line",},
	{"hotkey":"^↑","desc":"Prev Block",},
]
var commandsbtm = [
	{"hotkey":"^X","desc":"Exit",},
	{"hotkey":"^R","desc":"Read File",},
	{"hotkey":'^\~',"desc":"Replace",},
	{"hotkey":"^U","desc":"Uncut Text",},
	{"hotkey":"^T","desc":"To Spell",},
	{"hotkey":"^_","desc":"Go To Line",},
	{"hotkey":"^V","desc":"Next Page",},
	{"hotkey":'M-/',"desc":"Last Line",},
	{"hotkey":"M-]","desc":"To Bracket",},
	{"hotkey":"M-^","desc":"Copy Text",},
	{"hotkey":"M-{","desc":"Unindent Text",},
	{"hotkey":"M-E","desc":"Redo",},
	{"hotkey":"^F","desc":"Forward",},
	{"hotkey":"^→","desc":"Next Word",},
	{"hotkey":"^E","desc":"End",},
	{"hotkey":"^N","desc":"Next Line",},
	{"hotkey":"^↓","desc":"Next Block",},
]
window.addEventListener('load',function() {
	var body = document.getElementsByTagName("BODY")[0];
//00960040
	function setBckgrnd()
	{
		var opacitymin = 8;
		var opacitymax = 12;
		var curopacity = opacitymin;
		var up = true;
		var timer = setInterval(function(){
		    setOpacity(curopacity);
		    if(curopacity < opacitymin)
		    {
			up = true;
		    }else if(curopacity > opacitymax)
		    {
			up = false;
		    }
		    if(up)
		    {
			curopacity++;
		    }else
		    {
			curopacity--;
		    }
		}, 25);
	}
	function setOpacity(opacity)
	{
		body.style.backgroundImage = 'radial-gradient(#009600' + parseInt(opacity,16) + ',black 120%)';
	}
	setBckgrnd();

	window.onscroll = function() {
		var header = document.getElementById("Header");

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
		var maxwidth = cmdtbl.clientWidth;
		var width = 175;
		var sections = Math.floor(maxwidth/width);
		tablerowtop.innerHTML = "";
		tablerowbtm.innerHTML = "";

		for(var i = 0; i < sections; i++)
		{
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
})

