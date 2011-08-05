var lastRandom = null;

function go(url) {
	location.href = url;
}

function load() {
	$.ajax({
    	type: "GET",
    	url: "http://50.56.93.249/xdatv/feed.xml",
    	dataType: "xml",
    	success: parseXml
  	});
}

function parseXml(xml) {
	$("#content").css("width", $(window).width() - 262);

	$(xml).find("item").each(function() {
		$("#navScroller").append("<li onClick='select(" + randomString() + ")'><a href='#' class='lstItem'>" + $(this).find("title").text() + "</a></li>");

		$("#contentScroller").append("<span id='" + lastRandom + "' class='hidden'>\n<center><a href='" + $(this).find("enclosure").attr("url") + "'><img src='" + posterImage($(this).find("[nodeName=media:thumbnail]").attr("url")) + "' /></a><br /><br /><div id='descView'><div id='scroller' class='scroll'><marquee scrollamount='1' scrolldelay='10' direction='up' height='100'>" + $(this).find("description").text() + "</marquee></div></div></center>\n</span>\n");
	});

	cleanTitles();
	loaded();
}

function posterImage(img) {
	if(img != null) {
		return img;
	} else {
		return "shared/play-video.png";
	}
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
	var sections = document.getElementsByTagName('span');

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