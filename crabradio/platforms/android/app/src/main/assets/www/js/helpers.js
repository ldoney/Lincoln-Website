function formatNames(name)
{
	var resName = name;
	resName = resName.replace(/\w\S*/g, function(txt){
        	return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
	return resName;
}
function truncate(str)
{
	let length = 30;
	let ending = '...';
	if(str.length > length)
	{
		return str.substring(0, length - ending.length) + ending;
	}
	else
	{
		return str;
	}
}
function find(json, key) {
	for(var i = 0; i < json.length; i++)
	{
		if(json[i].name == key)
		{
			return json[i];
		}
	}
}

function zoomOutMobile() {
  var viewport = document.querySelector('meta[name="viewport"]');

  if ( viewport ) {
    viewport.content = "initial-scale=0.1";
    viewport.content = "width=1200";
  }
}
zoomOutMobile();