function getErrorType() {
	const queryString = window.location.search;
	if(window.location.search != null) {
		const urlParams = new URLSearchParams(queryString);
		var errt = urlParams.errtype;
		if(errt == "" || errt == null || errt == "undefined")
			return "ERROR";

		return urlParams.errtype;
	}else
	{
		return "ERROR";
	}
}

alert(getErrorType());
