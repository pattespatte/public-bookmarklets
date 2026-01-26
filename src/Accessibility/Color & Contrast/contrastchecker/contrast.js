var $Alpha, $colorInputs, $ligSliders, $Hex = [], $Pic = [], $Lig = [], $Err = [], color = [], HSL = [];

$(function() {
	$Alpha = $('#Alpha1');
	$colorInputs = $('#Hex0, #Hex1, #Pic0, #Pic1');
	$ligSliders = $('#Lig0, #Lig1');
	$Hex[0] = $('#Hex0');
	$Hex[1] = $('#Hex1');
	$Pic[0] = $('#Pic0');
	$Pic[1] = $('#Pic1');
	$Lig[0] = $('#Lig0');
	$Lig[1] = $('#Lig1');
	$Err[0] = $('#Err0');
	$Err[1] = $('#Err1');
	
	$ligSliders.on('input', function() {
		changeHue($(this).attr('id').substr(-1));
	});

	$colorInputs.change(function() {
		var $this = $(this),
				thisColor = $this.val(),
				context = $this.attr('id').substr(-1);	// 1 or 0, indicating foreground or background
				alpha = $Hex[1].val().substr(6, 2);
				
		$Err[context].slideUp();
		if (thisColor.substr(0, 1) == '#') thisColor = thisColor.slice(1);	// Remove the # if user typed it in
		if (thisColor.length == 3 || (thisColor.length == 4 && context == 1)) thisColor = thisColor.substr(0, 1).repeat(2) + thisColor.substr(1, 1).repeat(2) + thisColor.substr(2, 1).repeat(2) + thisColor.substr(3, 1).repeat(2);

		if ($this.attr('id') == 'Pic1') {
			thisColor = thisColor + alpha;	// Otherwise, using the color picker wipes out the alpha
		}
		
		validate($this, thisColor, context, alpha);
	});
	
	$(window).on('load', function() {
		var searchParams = new URLSearchParams(window.location.search);
		if (searchParams.get('fcolor')) {
			color[1] = searchParams.get('fcolor').replace('#', '').substring(0, 8).toUpperCase();
		}
		else if($Hex[1].val()) {
			color[1] = $Hex[1].val();
		}
		else{
			color[1] = '0000FF';
		}
		
		if (searchParams.get('bcolor')) {
			color[0]=searchParams.get('bcolor').replace("#","").substring(0,6).toUpperCase();
		}
		else if($Hex[1].val()) {
			color[0]=$Hex[0].val();
		}
		else{
			color[0]="FFFFFF";
		}
		update();
		updateAlpha();
		validate($Hex[0], $Hex[0].val(), 0, '');
		validate($Hex[1], $Hex[1].val(), 1, $Hex[1].val().substr(6, 2));
	});
	
	// When Alpha input changes, update Hex Value input to match, and update the page
	$Alpha.on('input', function() {
		if ($(this).val() > 1) {
			$(this).val(1);
		} else if ($(this).val() < 0) {
			$(this).val(0);
		}
		if ($(this).val() == 1) {
			var hexAlpha = '';	// If alpha is 1, don't bother to show the trailing "FF"
		} else {
			var hexAlpha = ('0' + Math.round($Alpha.val() * 255).toString(16)).slice(-2);
		}
		color[1] = $Hex[1].val().substr(0, 6) + hexAlpha;
		update();
	});

	// Intercept form submit
	$('#contrastForm').submit(function(e) {
		e.preventDefault();
	});
	
});

// Validate
function validate($this, thisColor, context, alpha) {
	if ((thisColor.length !== 6 && thisColor.length !== 8) || isNaN(HexToDec(thisColor)) || (thisColor.length == 4 && context == 0)) {
		$this.attr({'aria-invalid': true, 'aria-describedby': 'Error' + context});
		$Err[context].slideDown('fast', function() {
			$this.focus();
		});
		$Lig[context].parents('label').slideUp();
		$Pic[context].val('#FFFFFF');
		if (context == 1) {
			$Alpha.val('');
		}
	} else {
		$Hex[context].removeAttr('aria-invalid aria-describedby');
		$Err[context].slideUp();
		$Lig[context].parents('label').slideDown();
		color[context] = thisColor.toUpperCase();
		update();
		updateAlpha();
	}
	
	if ($Hex[0].attr('aria-invalid') || $Hex[1].attr('aria-invalid')) {
		$('#resultsContainer').slideUp();
		$('[aria-invalid]').closest('label').next().find('input[type=color]').val('#FFFFFF');
	} else {
		$('#resultsContainer').slideDown();
	}
}

// Update all when one is changed
function update() {
	$Hex[0].val(color[0]);
	$Hex[1].val(color[1]);
	
	if ($('#Hex0').attr('aria-invalid') != 'true') {
		$Pic[0].val('#' + color[0]);
	}
	if ($('#Hex1').attr('aria-invalid') != 'true') {
		$Pic[1].val('#' + color[1].substr(0, 6));  // Trim off alpha value
	}
	$('#normal, #big, #ui').css({'color': '#' + color[1], 'background-color': '#' + color[0]});
	$('#uibox').css({'border-color': '#' + color[1]});
	$('.permalink').attr('href', './?fcolor=' + color[1] + '&bcolor=' + color[0]);
	$('a[href*="linkcontrastchecker"]').attr('href', '/resources/linkcontrastchecker/?fcolor=' + color[1] + '&bcolor=' + color[0]);
	$('.apilink').attr('href', './?fcolor=' + color[1] + '&bcolor=' + color[0] + '&api');
	$('.apilink').text('https://webaim.org/resources/contrastchecker/?fcolor=' + color[1] + '&bcolor=' + color[0] + '&api');
	
	// Update Lightness sliders
	var fHSL = RGBtoHSL(HexToDec(color[1].substr(0, 2)), HexToDec(color[1].substr(2, 2)), HexToDec(color[1].substr(4, 2)));
	var bHSL = RGBtoHSL(HexToDec(color[0].substr(0, 2)), HexToDec(color[0].substr(2, 2)), HexToDec(color[0].substr(4, 2)));
	$Lig[1].val(Math.round(fHSL[2]))
		.parent().css('background', 'linear-gradient(to right, #000, hsl(' + fHSL[0] + ',' + fHSL[1] + '%,50%), #FFF)');
	$Lig[0].val(Math.round(bHSL[2]))
		.parent().css('background', 'linear-gradient(to right, #000, hsl(' + bHSL[0] + ',' + bHSL[1] + '%,50%), #FFF)');

	// Update contrast ratio
	checkContrast();
}

// Update Alpha input to match the alpha specified in the foreground hex value
function updateAlpha() {
	var alpha = $Hex[1].val().substr(6, 2);
	if (alpha == '') {
		$Alpha.val(1);
	} else {
		$Alpha.val((parseInt($Hex[1].val().substr(6, 2), 16) / 255).toFixed(2));
	}
}

// Calculation Functions

// Adapted from https://marcodiiga.github.io/rgba-to-rgb-conversion
function RGBAtoRGB(fc, bc) {	// fc and bc are hex values, without the leading #
	const fa = {r:HexToDec(fc.substr(0, 2)), g:HexToDec(fc.substr(2, 2)), b:HexToDec(fc.substr(4, 2)), a:HexToDec(fc.substr(6, 2)) / 255};
	const ba = {r:HexToDec(bc.substr(0, 2)), g:HexToDec(bc.substr(2, 2)), b:HexToDec(bc.substr(4, 2))};
	var a = fa.a;
	if (isNaN(a)) a = 1;
	var modR = Math.round((1 - a) * ba.r + a * fa.r);
	var modG = Math.round((1 - a) * ba.g + a * fa.g);
	var modB = Math.round((1 - a) * ba.b + a * fa.b);
	var modColor = ('0' + modR.toString(16)).slice(-2) + ('0' + modG.toString(16)).slice(-2) + ('0' + modB.toString(16)).slice(-2);
	return modColor;
}

function changeHue(context) {
	HSL = RGBtoHSL(HexToDec(color[context].substr(0, 2)), HexToDec(color[context].substr(2, 2)), HexToDec(color[context].substr(4, 2)));
	RGB = HSLtoRGB(HSL[0], HSL[1], $Lig[context].val());
	for (var i = 0; i < 3; i++) {
		RGB[i] = (RGB[i] >= 16) ? RGB[i].toString(16) : '0' + RGB[i].toString(16);
	}
	color[context] = (RGB[0] + RGB[1] + RGB[2] + color[context].substr(6, 2)).toUpperCase();
	update();
}

function checkContrast() {
	var fMod = RGBAtoRGB(color[1], color[0]);	//fMod is the color you get when you put color[1] on top of color[0] and take into account the alpha value of color[1]
	var L1 = getL(fMod), L2 = getL(color[0]), ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
	// Dec2() truncates the number to 2 decimal places without rounding.
	$('#ratio').html('<b>' + Dec2((ratio * 100) / 100) + '</b>:1');
	if (ratio >= 4.5) {
		$('#normalAA, #bigAAA').attr('class', 'pass').text('Pass');
		$('#ratioContainer').attr('class', 'pass');
	} else {
		$('#normalAA, #bigAAA').attr('class', 'fail').text('Fail');
		$('#ratioContainer').removeClass('pass');
	}
	if (ratio >= 3) {
		$('#bigAA').attr('class', 'pass').text('Pass');
		$('#uiAA').attr('class', 'pass').text('Pass');
	} else {
		$('#bigAA').attr('class', 'fail').text('Fail');
		$('#uiAA').attr('class', 'fail').text('Fail');
	}
	if (ratio >= 7) {
		$('#normalAAA').attr('class', 'pass').text('Pass');
	} else {
		$('#normalAAA').attr('class', 'fail').text('Fail');
	}
}

function HexToDec(c) {
	if (RegExp(/^[a-f|0-9]+$/i).test(c)) {
		return parseInt(c, 16);
	}
}

function HSLtoRGB(H, S, L) {
	var p1, p2;
	L /= 100;
	S /= 100;
	if (L <= 0.5) p2 = L * (1 + S);
	else p2 = L + S - (L * S);
	p1 = 2 * L - p2;
	if (S == 0) {
		R = G = B = L;
	} else {
		R = findRGB(p1, p2, H + 120);
		G = findRGB(p1, p2, H);
		B = findRGB(p1, p2, H - 120);
	}
	return [Math.round(R *= 255), Math.round(G *= 255), Math.round(B *= 255)];
};

function RGBtoHSL(r, g, b) {
	var Min, Max;
	r = (r / 51) * 0.2;
	g = (g / 51) * 0.2;
	b = (b / 51) * 0.2;
	if (r >= g) {
		Max = r;
	} else {
		Max = g;
	}
	if (b > Max) {
		Max = b;
	}
	if (r <= g) {
		Min = r;
	} else {
		Min = g;
	}
	if (b < Min) {
		Min = b;
	}
	L = (Max + Min) / 2;
	if (Max == Min) {
		S = H = 0;
	} else {
		if (L < 0.5) {
			S = (Max - Min) / (Max + Min);
		} else {
			S = (Max - Min) / (2 - Max - Min);
		}
		if (r == Max) {
			H = (g - b) / (Max - Min);
		}
		if (g == Max) {
			H = 2 + ((b - r) / (Max - Min));
		}
		if (b == Max) {
			H = 4 + ((r - g) / (Max - Min));
		}
	}
	H = Math.round(H * 60);
	if (H < 0) {
		H += 360;
	}
	if (H >= 360) {
		H -= 360;
	}
	return [H, Math.round(S * 100), Math.round(L * 100)];
}

function findRGB(q1, q2, hue) {
	if (hue > 360) hue -= 360;
	if (hue < 0) hue += 360;
	if (hue < 60) return (q1 + (q2 - q1) * hue / 60);
	else if (hue < 180) return(q2);
	else if (hue < 240) return(q1 + (q2 - q1) * (240 - hue) / 60);
	else return(q1);
}

function getsRGB(c) {
	c = HexToDec(c) / 255;
	c = (c <= 0.03928) ? c / 12.92 : Math.pow(((c + 0.055) / 1.055), 2.4);
	return c;
}

function getL(c) {
	return (0.2126 * getsRGB(c.substr(0, 2)) + 0.7152 * getsRGB(c.substr(2, 2)) + 0.0722 * getsRGB(c.substr(4, 2)));
}

function Dec2(num) {
  num = String(num);
  if(num.indexOf('.') !== -1) {
	var numarr = num.split(".");
	if (numarr.length == 1) {
	  return Number(num);
	}
	else {
	  return Number(numarr[0]+"."+numarr[1].charAt(0)+numarr[1].charAt(1));
	}
  }
  else {
	return Number(num);
  }  
}