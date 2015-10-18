$(document).ready(function() {
	resetGrid(16, "default");
});

function askAndReset() {
	var ans = document.getElementById("dimension").value;
	ans = Number(ans);
	var brush = $('input[name="brush"]:checked').val();
	if (!(ans) || (ans > 80))  {
		alert("Please type a number between 4 and 80.");
		return false;
	};
	$('td').off('mouseenter');
	resetGrid(ans, brush);
}

function resetGrid(dimension, brush) {
	$('#grid').empty();
	var squareWidth = 520/dimension;
	squareWidth = squareWidth.toString() + 'px';
	$('#grid').html(gridHTML(dimension));
	$('#dCss').html('td {width: ' + squareWidth + '; height: ' + squareWidth + ';}');
	$('td').mouseenter(function() {
		switch (brush) {
			case "rainbow":
				$(this).css("background-color", xColor);
				break;
			case "darken":
				var curCell = $(this);
				var dClass = get_dClass(curCell);
				if (dClass < 10) {
					var newClass = "d" + String(dClass + 1);
					$(this).addClass(String(newClass));
				}
				break;
			case "default":
			default:
				$(this).addClass('marked');
		}
	});
}

function gridHTML(dimension) {
	var txt = "";
	var numTimes = 0;
	for (i = 0; i < dimension; i++) {
		for (j = 0; j < dimension; j++) {
			if (j === 0) {
				txt+= '<tr>';
			};
			txt += '<td class="d1"></td>';
			if (j === dimension-1) {
				txt+= '</tr>';
			};			
			numTimes++;
		};
	};
	return txt;
}

var xColor = function() {
	return 'rgb(' + randRgbVal() +',' + randRgbVal() + ',' + randRgbVal() + ')';
}

function randRgbVal() {
	return Math.floor(Math.random() * 255);
}

function get_dClass(curCell) {
	/* for later if we add rainbow darkening 
	var color = $( this ).css( "background-color" );
	var rgb = color.match(/\d+/g); // make array with RGB values
	*/
	var i = 0;
	var has = false;
	do {
		i++;
		has = curCell.hasClass("d" + String(i));
	} while (has === false && i < 10);
	if (has === false) {
		return 0;
	} else {
		if (i < 10 ) {
			curCell.removeClass("d" + String(i)); // make way for darkened class
		}
		return i;
	}
}


