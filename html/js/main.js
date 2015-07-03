/* jshint strict: true */
/*jslint browser:true */

var zoomObj = document.querySelectorAll(".imageZoom");
var video = document.getElementsByTagName('video')[0];

function switchDisplay(v, i) {
	document.querySelector('.' + v).style.display = this[i];
}

function switchContent(value) {
	var sObj = {'on': ['block', 'inline-block', 'block'], 'off': ['none', 'none', 'none'] };
	['contentColLeft', 'contentColCentre', 'contentColRight'].forEach(switchDisplay, sObj[value]);
}

function generatePDF() {
	'use strict';
	$('a.tooltip').css('display', 'none');
	$('div.positionNav a').css('display', 'none');
	var pdf = new jsPDF('p', 'pt', 'a4');
        
  pdf.addHTML($('div#bodyPage')[0], {'background': '#fff'}, function() {
      pdf.save('UC.pdf');
  });
	$('a.tooltip').css('display', 'inline-block');
	$('div.positionNav a').css('display', 'inline-block');
	return true;
}
function outputPDF(doc) {
	$('a.tooltip').css('display', 'inline-block');
	$('div.positionNav a').css('display', 'inline-block');
}
// as it's a nodeList not an array object
for (var i = 0; i < zoomObj.length; i++) {
	zoomObj[i].addEventListener('click', function(e) {
		switchContent('off');
		if ( document.querySelector('.header') ) {
			document.querySelector('.header').style.display = 'none';
		}
		document.querySelector('img.zoomImg').setAttribute('src', this.src);
		document.querySelector('img.zoomImg').style.display = "block";
	}, false);
}

document.querySelector('img.zoomImg').addEventListener('click', function(e) {
	switchContent('on');
	if ( document.querySelector('.header') ) {
		document.querySelector('.header').style.display = 'block';
	}
	document.querySelector('.zoomImg').style.display = "none";
}, false);

if ( document.querySelector('img.videoIcon') ) {
	
	document.querySelector('img.videoIcon').addEventListener('click', function(e) {
		switchContent('off');
		document.querySelector('.videoPanel').style.display = "block";
	}, false);
}

if( document.querySelector('div.closeIcon') ) {
	document.querySelector('div.closeIcon').addEventListener('click', function(e) {
		switchContent('on');
		var classVal = "." + this.parentNode.getAttribute('class');
		document.querySelector(classVal).style.display = "none";
	}, false);
}

$(document).ready(function() {
	
  $('a.tooltip img[rel]').overlay();
	
	document.querySelector('img.pdfIcon').addEventListener('click', function(e) {
		// pdf generation here
		generatePDF();
	}, false);
	
});