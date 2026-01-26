(function () {
	var constrastletelem = document.getElementById("contrastletdragable");
	if (constrastletelem == null) {
		var contrastletdragable = document.createElement("div");
		contrastletdragable.id = "contrastletdragable";
		contrastletdragable.style.width = "425px";
		contrastletdragable.style.position = "absolute";
		contrastletdragable.style.right = "20px";
		contrastletdragable.style.top = window.pageYOffset + 20 + "px";
		contrastletdragable.style.zIndex = "10000";
		contrastletdragable.style.boxSizing = "content-box";

		var contrastletdragzone = document.createElement("div");
		contrastletdragzone.id = "contrastletdragzone";
		contrastletdragzone.style.width = "100%";
		contrastletdragzone.style.height = "15px";
		contrastletdragzone.style.cursor = "move";
		contrastletdragzone.style.backgroundColor = "#0f2c65";
		contrastletdragzone.style.boxSizing = "content-box";
		contrastletdragable.appendChild(contrastletdragzone);

		document.body.appendChild(contrastletdragable);

		var contrastletclose = document.createElement("button");
		contrastletclose.id = "contrastletclose";
		contrastletclose.style.width = "15px";
		contrastletclose.style.height = "15px";
		contrastletclose.style.float = "right";
		contrastletclose.style.padding = "0";
		contrastletclose.style.border = "0";
		contrastletclose.style.backgroundColor = "#777";
		contrastletclose.style.color = "#fff";
		contrastletclose.style.borderTop = "1px solid #0f2c65";
		contrastletclose.style.borderRight = "1px solid #0f2c65";
		contrastletclose.setAttribute("aria-label", "Close Contrast Checker");
		contrastletclose.addEventListener(
			"click",
			function () {
				contrastletdragable.remove();
			},
			false,
		);

		var contrastletclosetext = document.createTextNode("X");
		contrastletclose.appendChild(contrastletclosetext);

		contrastletdragzone.appendChild(contrastletclose);

		// Create an iframe element
		var contrastlet = document.createElement("iframe");
		contrastlet.style.width = "421px";
		contrastlet.style.height = "438px";
		contrastlet.style.margin = "0px";
		contrastlet.style.borderStyle = "solid";
		contrastlet.style.borderColor = "#0f2c65";
		contrastlet.style.boxSizing = "content-box";
		contrastlet.style.background = "#fafafa";

		// Add the iframe to the DOM first
		contrastletdragable.appendChild(contrastlet);

		// This is the HTML content for our contrast checker
		var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>WebAIM Contrast Checker</title>
  <style>
    * {margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif;}
    body {color: #333; background: #fafafa; padding: 10px;}
    #contrastForm {text-align: center;}
    #contrastForm fieldset {
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 8px;
      width: 42%;
      margin: 0 0.5em;
      padding: 10px;
      display: inline-block;
    }
    #contrastForm input {
      color: #333;
      border: 1px solid #888;
      border-radius: 3px;
      font-family: Arial, sans-serif;
    }
    #contrastForm input[type=text] {
      text-transform: uppercase;
      vertical-align: top;
      padding: 0 4px;
      font-size: 1.5em;
    }
    #contrastForm input[type=color] {
      cursor: pointer;
      width: 100%;
      height: 34px;
      padding: 0;
      display: block;
    }
    #contrastForm input[type=range] {
      width: 100%;
      height: 8px;
      margin-right: 15px;
    }
    #contrastForm label {
      vertical-align: top;
      margin-top: 0.7em;
      display: inline-block;
    }
    #contrastForm input[type=number] {
      width: 60px;
      min-height: 32px;
      padding-left: 4px;
      display: block;
    }
    #Hex1 {width: 5.8em;}
    #Hex0 {width: 4.3em;}
    #Err0, #Err1 {
      display: none;
      color: red;
      font-size: 12px;
      margin-bottom: 5px;
    }
    #ratioContainer {
      text-align: center;
      padding-top: 0.6em;
    }
    #ratio {
      font-size: 3em;
      display: block;
    }
    .results {
      text-align: left;
      margin-top: 10px;
    }
    .results p {
      padding-bottom: 2px;
    }
    .results span {
      float: right;
      text-align: center;
      margin: 0 0.5em;
      padding: 0 0.5em;
      font-weight: 700;
    }
    span.pass {
      color: #fff;
      background-color: #080;
      border-radius: 1em;
    }
    span.fail {
      color: #c00;
    }
    .gradient {
      position: relative;
      width: 100%;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
    }
    @media only screen and (max-width: 670px) {
      #contrastForm fieldset {
        width: 93%;
        margin: 0;
      }
      #contrastForm input[type=color] {
        width: 60px;
      }
      #contrastForm input[type=text] {
        width: 130px;
      }
      #ratio {
        font-size: 1.5em;
      }
    }
  </style>
</head>
<body>
  <main id="maincontainer">
    <article id="maincontent">
      <form id="contrastForm">
        <fieldset>
          <legend>Foreground</legend>
          <p class="error" id="Err1">Please enter a valid hex value (alpha value optional), or use the color picker.</p>
          <label>
            Hex Value
            <div>#<input id="Hex1" type="text" maxlength="9" required></div>
          </label>
          <label>
            Picker
            <input id="Pic1" type="color">
          </label>
          <label>
            Alpha
            <input id="Alpha1" type="number" value="1.00" step="0.01" min="0" max="1">
          </label>
          <label class="lum">
            Luminance
            <div class="gradient"><input id="Lig1" type="range" min="0" max="100" step="1"></div>
          </label>
        </fieldset>
        <fieldset>
          <legend>Background</legend>
          <p class="error" id="Err0">Please enter a valid hex value, or use the color picker.</p>
          <label>
            Hex Value
            <div>#<input id="Hex0" type="text" maxlength="7" required></div>
          </label>
          <label>
            Picker
            <input id="Pic0" type="color">
          </label>
          <label class="lum">
            Luminance
            <div class="gradient"><input id="Lig0" type="range" min="0" max="100" step="1"></div>
          </label>
        </fieldset>
      </form>
      <div id="ratioContainer">
        <span>
          <span id="ratio" aria-live="polite" aria-atomic="false"></span>
        </span>
      </div>
      <div class="results">
        <p>Normal Text (AA): <span id="normalAA"></span></p>
        <p>Large Text (AA): <span id="bigAA"></span></p>
        <p>Non-text Elements (AA): <span id="uiAA"></span></p>
        <p>Normal Text (AAA): <span id="normalAAA"></span></p>
      </div>
      <p class="footer">Powered by WebAIM</p>
    </article>
  </main>

  <script>
    var $Alpha, $colorInputs, $ligSliders;
    var $Hex = [], $Pic = [], $Lig = [], $Err = [], color = [], HSL = [];

    function validate(r, t, o, e) {
      if (6 !== t.length && 8 !== t.length || isNaN(HexToDec(t)) || (4 == t.length && 0 == o)) {
        r.setAttribute("aria-invalid", true);
        r.setAttribute("aria-describedby", "Error" + o);
        $Err[o].style.display = "block";
        r.focus();
        $Lig[o].parentNode.style.display = "none";
        $Pic[o].value = "#FFFFFF";
        if (1 == o) $Alpha.value = "";
      } else {
        $Hex[o].removeAttribute("aria-invalid");
        $Hex[o].removeAttribute("aria-describedby");
        $Err[o].style.display = "none";
        $Lig[o].parentNode.style.display = "block";
        color[o] = t.toUpperCase();
        update();
        updateAlpha();
      }

      if ($Hex[0].getAttribute("aria-invalid") || $Hex[1].getAttribute("aria-invalid")) {
        document.getElementById("ratioContainer").style.display = "none";
        document.querySelectorAll("[aria-invalid]").forEach(function(el) {
          el.closest("label").nextElementSibling.querySelector("input[type=color]").value = "#FFFFFF";
        });
      } else {
        document.getElementById("ratioContainer").style.display = "block";
      }
    }

    function update() {
      $Hex[0].value = color[0];
      $Hex[1].value = color[1];
      
      if ($Hex[0].getAttribute("aria-invalid") !== "true") {
        $Pic[0].value = "#" + color[0];
      }
      
      if ($Hex[1].getAttribute("aria-invalid") !== "true") {
        $Pic[1].value = "#" + color[1].substr(0, 6);
      }

      var r = RGBtoHSL(
        HexToDec(color[1].substr(0, 2)), 
        HexToDec(color[1].substr(2, 2)), 
        HexToDec(color[1].substr(4, 2))
      );
      
      var t = RGBtoHSL(
        HexToDec(color[0].substr(0, 2)), 
        HexToDec(color[0].substr(2, 2)), 
        HexToDec(color[0].substr(4, 2))
      );
      
      $Lig[1].value = Math.round(r[2]);
      $Lig[1].parentNode.style.background = "linear-gradient(to right, #000, hsl(" + r[0] + "," + r[1] + "%,50%), #FFF)";
      
      $Lig[0].value = Math.round(t[2]);
      $Lig[0].parentNode.style.background = "linear-gradient(to right, #000, hsl(" + t[0] + "," + t[1] + "%,50%), #FFF)";
      
      checkContrast();
    }

    function updateAlpha() {
      if ($Hex[1].value.substr(6, 2) === "") {
        $Alpha.value = 1;
      } else {
        $Alpha.value = (parseInt($Hex[1].value.substr(6, 2), 16) / 255).toFixed(2);
      }
    }

    function RGBAtoRGB(r, t) {
      let o = {
        r: HexToDec(r.substr(0, 2)),
        g: HexToDec(r.substr(2, 2)),
        b: HexToDec(r.substr(4, 2)),
        a: HexToDec(r.substr(6, 2)) / 255
      };
      
      let e = {
        r: HexToDec(t.substr(0, 2)),
        g: HexToDec(t.substr(2, 2)),
        b: HexToDec(t.substr(4, 2))
      };
      
      var a = o.a;
      if (isNaN(a)) a = 1;
      
      var l = Math.round((1 - a) * e.r + a * o.r);
      var s = Math.round((1 - a) * e.g + a * o.g);
      var i = Math.round((1 - a) * e.b + a * o.b);
      
      return padHex(l.toString(16)) + padHex(s.toString(16)) + padHex(i.toString(16));
    }

    function padHex(hex) {
      return ("0" + hex).slice(-2);
    }

    function changeHue(r) {
      HSL = RGBtoHSL(
        HexToDec(color[r].substr(0, 2)),
        HexToDec(color[r].substr(2, 2)),
        HexToDec(color[r].substr(4, 2))
      );
      
      RGB = HSLtoRGB(HSL[0], HSL[1], $Lig[r].value);
      
      var hexColor = "";
      for (var t = 0; t < 3; t++) {
        hexColor += RGB[t] >= 16 ? RGB[t].toString(16) : "0" + RGB[t].toString(16);
      }
      
      color[r] = (hexColor + color[r].substr(6, 2)).toUpperCase();
      update();
    }

    // This is the fixed checkContrast function
    function checkContrast() {
      try {
        var r = RGBAtoRGB(color[1], color[0]);
        var t = getL(r);
        var o = getL(color[0]);
        var e = (Math.max(t, o) + 0.05) / (Math.min(t, o) + 0.05);
        
        document.getElementById("ratio").innerHTML = "<b>" + Dec2(100 * e / 100) + "</b>:1";
        
        // Get all required elements safely
        var normalAA = document.getElementById("normalAA");
        var bigAA = document.getElementById("bigAA");
        var normalAAA = document.getElementById("normalAAA");
        var uiAA = document.getElementById("uiAA");
        var ratioContainer = document.getElementById("ratioContainer");
        
        // Make sure elements exist before setting properties
        if (normalAA) {
          if (e >= 4.5) {
            normalAA.className = "pass";
            normalAA.textContent = "Pass";
          } else {
            normalAA.className = "fail";
            normalAA.textContent = "Fail";
          }
        }
        
        if (ratioContainer) {
          ratioContainer.className = e >= 4.5 ? "pass" : "";
        }
        
        if (bigAA) {
          if (e >= 3) {
            bigAA.className = "pass";
            bigAA.textContent = "Pass";
          } else {
            bigAA.className = "fail";
            bigAA.textContent = "Fail";
          }
        }
        
        if (uiAA) {
          if (e >= 3) {
            uiAA.className = "pass";
            uiAA.textContent = "Pass";
          } else {
            uiAA.className = "fail";
            uiAA.textContent = "Fail";
          }
        }
        
        if (normalAAA) {
          if (e >= 7) {
            normalAAA.className = "pass";
            normalAAA.textContent = "Pass";
          } else {
            normalAAA.className = "fail";
            normalAAA.textContent = "Fail";
          }
        }
      } catch (err) {
        console.error("Error in checkContrast function:", err);
      }
    }

    function HexToDec(r) {
      if (RegExp(/^[a-f|0-9]+$/i).test(r)) {
        return parseInt(r, 16);
      }
    }

    function HSLtoRGB(h, s, l) {
      var r, g, b;
      l /= 100;
      s /= 100;
      
      if (s === 0) {
        r = g = b = l;
      } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hueToRgb(p, q, h + 120);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 120);
      }
      
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    function hueToRgb(p, q, t) {
      if (t < 0) t += 360;
      if (t > 360) t -= 360;
      
      if (t < 60) return p + (q - p) * t / 60;
      if (t < 180) return q;
      if (t < 240) return p + (q - p) * (240 - t) / 60;
      return p;
    }

    function RGBtoHSL(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
      
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;
      
      if (max === min) {
        h = s = 0;
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        
        h *= 60;
      }
      
      return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
    }

    function getsRGB(r) {
      r = HexToDec(r) / 255;
      return r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    }

    function getL(r) {
      return 0.2126 * getsRGB(r.substr(0, 2)) + 0.7152 * getsRGB(r.substr(2, 2)) + 0.0722 * getsRGB(r.substr(4, 2));
    }

    function Dec2(r) {
      r = String(r);
      if (r.indexOf(".") === -1) return Number(r);
      
      var t = r.split(".");
      return t.length === 1 ? Number(r) : Number(t[0] + "." + t[1].charAt(0) + t[1].charAt(1));
    }

    // Initialize the app
    function initialize() {
      try {
        $Alpha = document.getElementById("Alpha1");
        $Hex[0] = document.getElementById("Hex0");
        $Hex[1] = document.getElementById("Hex1");
        $Pic[0] = document.getElementById("Pic0");
        $Pic[1] = document.getElementById("Pic1");
        $Lig[0] = document.getElementById("Lig0");
        $Lig[1] = document.getElementById("Lig1");
        $Err[0] = document.getElementById("Err0");
        $Err[1] = document.getElementById("Err1");
        
        $Lig[0].addEventListener("input", function() {
          changeHue(0);
        });
        
        $Lig[1].addEventListener("input", function() {
          changeHue(1);
        });
        
        $Hex[0].addEventListener("change", function() {
          handleColorChange(this);
        });
        
        $Hex[1].addEventListener("change", function() {
          handleColorChange(this);
        });
        
        $Pic[0].addEventListener("change", function() {
          handleColorChange(this);
        });
        
        $Pic[1].addEventListener("change", function() {
          handleColorChange(this);
        });
        
        $Alpha.addEventListener("input", function() {
          if (this.value > 1) {
            this.value = 1;
          } else if (this.value < 0) {
            this.value = 0;
          }
          
          var alphaHex = "";
          if (this.value != 1) {
            alphaHex = padHex(Math.round(255 * $Alpha.value).toString(16));
          }
          
          color[1] = $Hex[1].value.substr(0, 6) + alphaHex;
          update();
        });
        
        document.getElementById("contrastForm").addEventListener("submit", function(e) {
          e.preventDefault();
        });
        
        // Set default colors
        color[1] = "0000FF";  // Foreground blue
        color[0] = "FFFFFF";  // Background white
        
        update();
        updateAlpha();
        validate($Hex[0], $Hex[0].value || color[0], 0, "");
        validate($Hex[1], $Hex[1].value || color[1], 1, "");
      } catch (err) {
        console.error("Error initializing app:", err);
      }
    }
    
    function handleColorChange(element) {
      var value = element.value;
      var index = element.id.substr(-1);
      var alpha = $Hex[1].value.substr(6, 2);
      
      $Err[index].style.display = "none";
      
      if (value.substr(0, 1) === "#") {
        value = value.slice(1);
      }
      
      // Convert 3-digit hex to 6-digit
      if (value.length === 3 || (value.length === 4 && index == 1)) {
        value = value.charAt(0).repeat(2) + value.charAt(1).repeat(2) + value.charAt(2).repeat(2);
        if (value.length === 4) {
          value += value.charAt(3).repeat(2);
        }
      }
      
      // Add alpha for foreground color
      if (element.id === "Pic1") {
        value += alpha;
      }
      
      validate(element, value, index, alpha);
    }
    
    // Call initialize when the document is ready
    initialize();
  </script>
</body>
</html>`;

		// Set the srcdoc attribute of the iframe with our content
		contrastlet.srcdoc = htmlContent;

		let x = 0;
		let y = 0;

		const mouseDownHandler = function (e) {
			// Skip if clicking on the close button
			if (e.target.id === "contrastletclose") return;

			x = e.clientX;
			y = e.clientY;
			document.addEventListener("mousemove", mouseMoveHandler);
			document.addEventListener("mouseup", mouseUpHandler);
		};

		const mouseMoveHandler = function (e) {
			const dx = e.clientX - x;
			const dy = e.clientY - y;

			contrastletdragable.style.top = `${contrastletdragable.offsetTop + dy}px`;
			contrastletdragable.style.left = `${contrastletdragable.offsetLeft + dx}px`;

			x = e.clientX;
			y = e.clientY;
		};

		const mouseUpHandler = function () {
			document.removeEventListener("mousemove", mouseMoveHandler);
			document.removeEventListener("mouseup", mouseUpHandler);
		};

		contrastletdragzone.addEventListener("mousedown", mouseDownHandler);

		document.addEventListener("keyup", function (event) {
			if (event.keyCode === 27) {
				contrastletdragable.remove();
			}
		});

		// Handle CSP violations
		document.addEventListener("securitypolicyviolation", (e) => {
			contrastlet.remove();
			var contrastleterrortext = document.createTextNode("The Content Security Policy on this page does not allow embedded iframes. The Contrast Checker Bookmarklet cannot run on this page. Press Esc to dismiss this message.");
			contrastletdragable.style.backgroundColor = "#fff";
			contrastletdragable.style.padding = "15px";
			contrastletdragable.appendChild(contrastleterrortext);
		});
	}
})();

console.log(`
Source: https://webaim.org/resources/contrastchecker/bookmarklet
Bookmarklet name: Contrast Checker (Self-contained)
`);
