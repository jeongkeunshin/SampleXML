$(document).ready(function() {
	setupMainPage()
});

var setupMainPage = function() {
	$('body').append('<button type = "button" onclick = "SaveXML()">Save</button>')
	$('body').append('<button type = "button" onclick = "LoadXML()">Load</button>')
}

var SaveXML = function() {
	var temp_xml = '<?xml version="1.0"?>'
	temp_xml += '<SampleXML>'
	temp_xml += '<SampleNumber>'
	temp_xml += 26
	temp_xml += '</SampleNumber>'
	temp_xml += '</SampleXML>'

	$.ajax({
		type : "POST",
		url : "/writeXML",
		data : {"deliverXML" : temp_xml},
		error : function(e) {
			console.log("Failed to save the temp xml")
		}, success : function(response) {
			console.log(response);
			alert("Successfully Saved the XML File")
		}
	})
}

var LoadXML = function() {
	$.ajax({
		type : "GET",
		url: "/readXML",
		error : function(e) {
			console.log("Failed to load Level xml");
		}, success: function(response) {
			console.log(response)
		}
	})
}
