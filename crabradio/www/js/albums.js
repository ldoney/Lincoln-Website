const pause_img = "https://pngriver.com/wp-content/uploads/2018/04/Download-Pause-Button-Png-Image-80705-For-Designing-Projects.png";
const play_img  = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/emojidex/59/black-right-pointing-triangle_25b6.png";
const HEIGHT_DIFF = 120;
window.onload = (event) =>
{
	document.getElementById("pause").getElementsByTagName("img")[0].src = play_img;
	document.getElementById("back").getElementsByTagName("img")[0].onclick = function(){window.location.href = "index.html";};
	function findDiff(str1, str2){
	  let diff= "";
	  str2.split('').forEach(function(val, i){
	    if (val != str1.charAt(i))
	      diff += val ;
	  });
	  return diff;
	}
	function insertAfter(newNode, existingNode) {
	    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
	}
	function isIn(arr, str){
		for(var i = 0; i < arr.length; i++)
		{
			if(findDiff(arr[i].toLowerCase(), str.toLowerCase()).length < 2)
			{
				return true;
			}
		}
		return false;
	}
	function handleTag(json)
	{
		var name = decodeURI(window.location.hash.substring(1));
		var category = find(json, name);
		var nameEl = document.getElementById("name").getElementsByTagName("tr")[0].getElementsByTagName("td");
		window.category = name;
		nameEl[1].getElementsByTagName("h2")[0].innerHTML = formatNames(name);
		if(category != null)
		{
			nameEl[0].getElementsByTagName("img")[0].src = category.background;
		}
		var grouptemp = {"name":"", "content":[]};
		var groups = [];
		var ungrouped = [];
		var cattemp = document.getElementById("sample-sorter");
		var template = document.getElementById("sample");
		var table = template.parentElement;
		for(var i = 0; i < category.items.length; i++)
		{
			var nm = category.items[i].name;
			var sub = nm.split(":");
			if(sub.length > 1)
			{
				if(!isIn(groups, sub[0]))
				{
					groups.push(sub[0]);
				}
			}
		}
		for(var i = 0; i < groups.length; i++)
		{
			var cscat = cattemp.cloneNode();
			cscat.innerHTML = cattemp.innerHTML;
			cscat.style.display = "table-row";
			cscat.subname = groups[i];
			var title = cscat.getElementsByTagName("td")[0].getElementsByTagName("h2")[0];
			title.innerHTML = formatNames(cscat.subname);
			cscat.onclick = function(e) {
				onscatClick(e, this);
			}
			table.appendChild(cscat);
			var breaker = document.createElement("hr");
			breaker.className = "breaker";
			table.appendChild(breaker);
		}
		var breaker = document.createElement("hr");
 		breaker.className = "breaker";
		table.appendChild(breaker);
		for(var i = 0; i < category.items.length; i++)
		{
			var clone = template.cloneNode();
			clone.innerHTML = template.innerHTML;
			clone.style.display = "table-row";
			clone.getElementsByClassName("album-img")[0].getElementsByTagName("img")[0].src = play_img;
			var title = clone.getElementsByClassName("track-name")[0];
			clone.fullName = category.items[i].name;
			if(clone.fullName.split(":").length > 1)
			{
				title.innerHTML = formatNames(truncate(clone.fullName.split(":")[1]));
			}
			else {
				title.innerHTML = formatNames(truncate(clone.fullName));
			}
			clone.aud = category.items[i].audurl;
			clone.onclick = function(e) {
				onClick(e, this);
			};
			var upGroups = groups.map(function(x){ return x.toUpperCase() });
			if(upGroups.includes(clone.fullName.split(":")[0].toUpperCase()))
			{
				clone.style.display = "none";
			}
			table.appendChild(clone);
		}
	}
	document.getElementById("progress-bar").onclick = function(e) {onProgressClick(e);};
	function onProgressClick(loc)
	{
		var canvas = document.getElementById("progress-bar");
		var perc = loc.clientX / canvas.clientWidth;
		if(perc > 1) { perc = 1; }
		if(perc < 0) { perc = 0; }
		a.currentTime = Math.round(a.duration * perc);
	}
	function onscatClick(loc, el)
	{
		var im = el.getElementsByClassName("sorter-status")[0].getElementsByTagName("img")[0];
		if(im.rot == null)
		{
			im.rot = 0;
		}
		im.rot += 180;
		if(im.visible == null)
		{
			im.visible = false;
		}
		im.style.webkitTransform="rotate("+ im.rot + "deg)";
		var template = document.getElementById("sample");
		var table = template.parentElement;
		var entries = table.getElementsByClassName("album-row-outer");
		for(var i = 0; i < entries.length; i++)
		{
			if(entries[i].fullName != null)
			{
				var scatname = entries[i].fullName.split(":")[0];
				if(entries[i].id == "sample" && scatname.toUpperCase() == el.subname.toUpperCase())
				{
					if(im.visible)
					{
						entries[i].style.display="none";
					}else
					{
						entries[i].style.display="table-row";
						insertAfter(entries[i], el);
					}
				}
			}
		}
		if(im.visible)
		{
			im.visible = false;
		}else
		{
			im.visible = true;
		}
	}
	var playing;
	var a;
	function onClick(loc, el)
	{
		if(playing != el)
		{
			if(a != null)
			{
				a.pause();
			}
			a = new Audio(el.aud);
			reformatDisps();
			setPauseDisp(el);
			el.style.backgroundColor = SELECTED_COL;
			document.getElementById("pause").getElementsByTagName("img")[0].src = pause_img;
			var nameToDisp = el.fullName;
			if(nameToDisp.split(":").length > 1)
			{
				nameToDisp = el.fullName.split(":")[1];
			}
			nameToDisp = formatNames(truncate(nameToDisp));
			document.getElementById("cur-title").innerHTML = nameToDisp;
			a.onloadedmetadata = function() {
				document.getElementById("time-cntrls").getElementsByClassName("total")[0].innerHTML = formatTime(a.duration);
			        a.play();
				playing = el;
			};
			a.addEventListener('timeupdate',updateProgressBar, false);
		}else
		{
			Pause();
		}
	}
	function makeShift(el)
	{
		setInterval(function()
		{
			var text = el.getElementsByClassName("track-name")[0];
			var curMargin = text.style.right;
			curMargin++;
			text.style.right = curMargin;
		},100, el)
	}
	function setPauseDisp(el)
	{
		el.getElementsByTagName("img")[0].src = pause_img;
	}
	function reformatDisps()
	{
		var tracks = document.getElementById("tracks").getElementsByClassName("album-row-outer");
		for(var i = 0; i < tracks.length; i++)
		{
			if(tracks[i].id == "sample")
			{
				tracks[i].getElementsByTagName("img")[0].src = play_img;
				tracks[i].style.backgroundColor = "#FFFFFF";
			}
		}
	}
	function formatTime(time)
	{
		let min = Math.floor(time / 60);
		let sec = Math.floor(time % 60);
		return min + ":" + zeroPad(sec,2);
	}
	function zeroPad(num, places) {
	  	return String(num).padStart(places, '0')
	}
	function updateProgressBar()
	{
	    var elapsedTime = Math.round(a.currentTime);
	    var totalTime = Math.round(a.duration);
	    var canvas = document.getElementById("progress-bar");
	    ctx = canvas.getContext("2d");
	    ctx.fillStyle = "#000000"
	    var tipBack = 3;
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    ctx.fillRect(0,0, (elapsedTime / totalTime) * canvas.width, canvas.height);
	    ctx.stroke();
	    ctx.fillStyle = "#FF0000"
	    ctx.fillRect((elapsedTime/totalTime)*canvas.width - tipBack, 0, tipBack, canvas.height);
	    ctx.stroke();
	    updateTimes();
	}
	function updateTimes()
	{
		var cntrls = document.getElementById("time-cntrls").getElementsByClassName("time-reading");
		var current = cntrls[0];
		var time = a.currentTime;
		current.innerHTML = formatTime(time);
	}
	const SELECTED_COL = "#CCCCCC";
	document.getElementById("pause").getElementsByTagName("img")[0].onclick = Pause;
	function Pause()
	{
		reformatDisps();
		var pause = document.getElementById("pause").getElementsByTagName("img")[0];
		playing.style.backgroundColor = SELECTED_COL;
		if(a != null)
		{
			if(!a.paused)
			{
				a.pause();
				pause.src = play_img;
			}else
			{
				a.play();
				pause.src = pause_img;
				setPauseDisp(playing);
			}
		}
	}
	function adjustSizes()
	{
		var cntrl = document.getElementById("controls");
		var trck = document.getElementById("trckwrp");
		var wrap = document.getElementById("wrapper");
		var tbl = document.getElementById("name");
		trck.style.height = wrap.clientHeight - cntrl.clientHeight - tbl.clientHeight - HEIGHT_DIFF;
	}
	adjustSizes();
	getJsonArray(handleTag);
}
