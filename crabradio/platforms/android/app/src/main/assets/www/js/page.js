const default_image = "https://images.template.net/wp-content/uploads/2016/02/23092145/Blank-CD-Cover-Design-Template.jpg";
window.onload = (event) =>
{
	function addImages(catl,catr, album)
	{
		var imgl = album.getElementsByClassName("left")[0].getElementsByTagName("img")[0];
		var imgr = album.getElementsByClassName("right")[0].getElementsByTagName("img")[0];
		var dflt = default_image;
		if(catl == null)
		{
			imgl.src = dflt;
		}else {
			var bckgrndl = catl.background;
			if(bckgrndl == "")
			{
				imgl.src = dflt;
			}else
			{
				imgl.src = bckgrndl;
			}
		}
		if(catr == null)
		{
			imgr.src = dflt;
		}
		else {
			var bckgrndr = catr.background;
			if(bckgrndr == "")
			{
				imgr.src = dflt;
			}else
			{
				imgr.src = bckgrndr;
			}
		}
	}
	function onClick(element)
	{
		var category = element.jsonElement;
		window.location = "album.html#" + category.name;
	}
	function handleTags(json)
	{
		var template = document.getElementById("sample");
		for(var i = 0; i < json.length; i+=2)
		{
			while(json[i].items.length == 0)
			{
				i++;
			}
			var l = json[i];
			while(json[i+1].items.length == 0)
			{
				i++;
			}
			var r = json[i + 1];
			var clone = template.cloneNode();
			clone.innerHTML = template.innerHTML;
			clone.style.display = "table-row";
			addImages(l, r, clone);
			var left = clone.getElementsByClassName("left")[0];
			left.jsonElement = l;
			left.getElementsByClassName("title")[0].innerHTML = formatNames(l.name);
			left.addEventListener('click', function(){onClick(this)});
			if(r != null)
			{
				var right = clone.getElementsByClassName("right")[0];
				right.jsonElement = r;
				right.getElementsByClassName("title")[0].innerHTML = formatNames(r.name);
				right.onclick = function(){
								onClick(this)
				};
			}
			template.parentElement.appendChild(clone);
		}
	}
	getJsonArray(handleTags);
}
