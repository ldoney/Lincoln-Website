function sortJSON(cats, json)
{
	sorted = [];
	categories = [];
	for(var i = 0; i < cats.length; i++)
	{
		var cat = {
			"name":cats[i].name,
			"background":cats[i].img,
			"items":[]
			};
		for(var j = 0; j < json.length; j++)
		{
			//Is a part of the category
			useArr = json[j].tags.map(function(x){ return x.toUpperCase() } );
			if(useArr.indexOf(cat.name.toUpperCase()) != -1)
			{
				cat.items.push(json[j]);
			}
		}
		categories.push(cat);
	}
	sorted = categories;
	return sorted;
}

function removeDupes(cats)
{
	let unique = {};
	cats.forEach(function(i) {
		if(!unique[i]){
			unique[i] = true;
		}
	});
	return Object.keys(unique);
}
function getCategories(callback, jsonres)
{
	var json = {};
	var http = new XMLHttpRequest();
	var url = 'js/testtags.json';
	var params = '';
	http.open('GET', url, true);

	http.onreadystatechange = function() {
		if(http.readyState === 4 && http.status === 200) {
			json = JSON.parse(http.responseText);
			callback(sortJSON(json, jsonres))
		}
	}
	http.send(params);
}
function getJsonArray(callback)
{
	var json = {};
	var http = new XMLHttpRequest();
	var url = 'js/testpods.json';
	var params = '';
	http.open('GET', url, true);
	http.setRequestHeader("Pragma", "no-cache");
	http.setRequestHeader("Cache-Control","no-cache");
	http.setRequestHeader("Expires",0);
	http.onreadystatechange = function() {
		if(http.readyState === 4 && http.status === 200) {
			json = JSON.parse(http.responseText);
			getCategories(callback, json);
		}
	}
	http.send(params);
}

