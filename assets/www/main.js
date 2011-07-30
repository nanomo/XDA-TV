var lastRandom = null;

function load() {
	$.ajax({
    	type: "GET",
    	url: "http://feeds.feedburner.com/XdaTv?format=xml",
    	dataType: "xml",
    	success: parseXml
  	});
}

function parseXml(xml) {
	$(xml).find("item").each(function() {
		$("#navScroller").append("<li onClick='select(" + randomString() + ")'><a href='#' class='lstItem'>" + $(this).find("title").text() + "</a></li>");
		$("#detailView").append("<article id='" + lastRandom + "' class='hidden'>\n<center><a href='" + $(this).find("enclosure").attr("url") + "'><img src='shared/play-video.png' /></a><br /><br /><h1 id='videoTitle'>" + clnTitle($(this).find("title").text()) + "</h1></center>\n</article>\n");
	});

	cleanTitles()
	loaded();
}

function cleanTitles() {
	$(".lstItem").each(function() {
		// Clean up the titles
		$(this).html(
			$(this).html().replace(/(\s\[(.*)\])|(\s\-\sXDA\sTV)/g, "")
		);
	});
}

function clnTitle(title) {
	return title.replace(/(\s\[(.*)\])|(\s\-\sXDA\sTV)/g, "");
}

function randomString() {
	var chars = "abcdefghiklmnopqrstuvwxyz";
	var rlength = 5;
	var random = "";

	for (var i = 0; i < rlength; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		random += chars.substring(rnum, rnum + 1);
	}

	lastRandom = random;
	return random;
}

function hideAll() {
	var sections = document.getElementsByTagName('article');

	for (var i = 0; i < sections.length; i++) {
		var section = sections[i];
		section.setAttribute('class', 'hidden');
	}
}

function select(item) {
	var selectedItem = $(item);
	hideAll();

	selectedItem.removeClass("hidden");
}