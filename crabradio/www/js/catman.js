window.onload = (event) =>
{
	function makeTable(json)
	{
		for(var i = 0; i < json.length; i++)
		{
			var wrap = document.createElement("tr");
			var name = document.createElement("td");
			var imageurl = document.createElement("td");
			var items = document.createElement("td");
			name.innerHTML = json[i].name;
			imageurl.innerHTML = json[i].background;
			for(var j = 0; j < json[i].items.length; j++)
			{
				if(j != 0)
				{
					items.innerHTML += " ";
				}
				items.innerHTML += json[i].items[j].name;
			}
			wrap.appendChild(name);
			wrap.appendChild(imageurl);
			wrap.appendChild(items);
			document.getElementsByTagName("table")[0].appendChild(wrap);
		}
		console.log(json);
	}
	getJsonArray(makeTable);
}
