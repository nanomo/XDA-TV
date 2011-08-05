var scrollContent;
var scrollNav;

function loaded() {
	scrollNav = new iScroll('navWrapper', { hideScrollbar: true, fadeScrollbar: true });
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);