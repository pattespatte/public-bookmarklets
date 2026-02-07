// Description: The Reveal Focus Order bookmarklet visualizes the tab order of all focusable elements on the page. Displays a numbered list panel showing all focusable elements in tab order sequence, allows clicking list items to highlight corresponding elements on the page, and can draw lines connecting focusable elements to visualize the tab path (includes color picker for line color). Useful for identifying non-intuitive focus orders caused by positive tabindex values or DOM structure issues. Click "Hide panel" to remove. WCAG SC 2.4.3: Focus Order.
(function () {
	function revealFocusOrder() {
		function l() {
			n = !0;
			let a = document.createElement('canvas');
			(a.setAttribute('id', 'taborder-canvas'),
				document.body.appendChild(a),
				(a.width = window.innerWidth));
			let c = document.body,
				b = document.documentElement,
				e = Math.max(
					c.scrollHeight,
					c.offsetHeight,
					b.clientHeight,
					b.scrollHeight,
					b.offsetHeight
				);
			if (((a.height = e), !a.getContext)) return;
			let d = a.getContext('2d');
			((d.strokeStyle = m), (d.lineWidth = 5));
			let f,
				g,
				h,
				i,
				j = !0;
			Array.from(o).forEach((a) => {
				(j
					? ((f = a[3] + 15), (g = a[0] + 15))
					: ((h = a[3] + 15),
						(i = a[0] + 15),
						d.beginPath(),
						d.moveTo(f, g),
						d.lineTo(h, i),
						d.stroke(),
						(f = a[3] + 15),
						(g = a[0] + 15)),
					(j = !1));
			});
		}
		let c = document.querySelectorAll(
				'button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"]):not([disabled]),summary:not(:disabled),[contenteditable]:not([contenteditable="false"])'
			),
			b = document.createElement('div'),
			d = document.createElement('div'),
			m = 'navy',
			n = !1,
			e = new Array(),
			o = new Array(),
			p = '',
			a = '';
		(b.setAttribute('id', 'focusOrderList'),
			b.setAttribute('role', 'region'),
			b.setAttribute('aria-label', 'List of focusable elements'),
			(b.innerHTML =
				'<div class="buttons"><button type="button" id="hide">Hide panel</button> <button type="button" id="draw">Draw tabbing order</button></div>'));
		let f = document.createElement('ol');
		b.appendChild(f);
		let g = b.querySelector('.buttons'),
			h = b.querySelector('button#hide'),
			i = b.querySelector('button#draw');
		(!(function () {
			let a = document.createElement('style');
			((a.textContent =
				'.visually-hidden {clip-path: inset(100%);clip: rect(1px, 1px, 1px, 1px);height: 1px;overflow: hidden;position: absolute;white-space: nowrap;width: 1px;}#focusOrderList{max-width:400px;box-sizing:border-box;}*[data-actualTabOrder]{white-space:nowrap}*[data-actualTabOrder]:before {content:attr(data-actualTabOrder);color:white;background:' +
				m +
				';display: inline-block;padding: 3px;font-weight: bold;font-size: 18px;font-family: sans-serif;border-radius: 5px;margin-right: 5px;box-shadow:0 0 0 3px white;} #focusOrderList {outline:2px solid black;position:absolute;top:10px;right:10px;padding:30px;background:white;box-shadow:0 0 0 10px white;z-index:10000;overflow:scroll;} #focusOrderList li {color:darkblue;} #focusOrderList .buttons {text-align:right;} .highlight-el {box-shadow:0 0 0 3px white,0 0 0 6px red,0 0 0 9px white;}#focusOrderList a {color:darkblue;text-decoration:underline;border-bottom:none;}#taborder-canvas {z-index:100000;position: absolute;top: 0;left: 0;bottom: 0;right: 0;background:rgba(233,233,233,0.2);}'),
				document.head.appendChild(a));
			let b = document.createElement('style');
			((b.textContent =
				'.no-list-style ul,.no-list-style ol {list-style: none;}.no-list-style ul,.no-list-style ol,.no-list-style ul li,.no-list-style ol li {margin: 0;padding: 0;}.Snow {background:Snow;}.SeaShell {background:SeaShell;}.LavenderBlush {background:LavenderBlush;}.MistyRose {background:MistyRose;}.Linen {background:Linen;}.Pink {background:Pink;}.LightPink {background:LightPink;}.Red {background:Red;}.Crimson {background:Crimson;}.HotPink {background:HotPink;}.Tomato {background:Tomato;}.OrangeRed {background:OrangeRed;}.DeepPink {background:DeepPink;}.IndianRed  {background:IndianRed;}.RosyBrown {background:RosyBrown;}.MediumVioletRed {background:MediumVioletRed;}.FireBrick {background:FireBrick;}.Brown {background:Brown;}.Sienna {background:Sienna;}.SaddleBrown {background:SaddleBrown;}.DarkRed {background:DarkRed;}.Maroon {background:Maroon;}.Orange        {background:Orange;}.FloralWhite {background:FloralWhite;}.Cornsilk {background:Cornsilk;}.OldLace {background:OldLace;}.PapayaWhip {background:PapayaWhip;}.BlanchedAlmond {background:BlanchedAlmond;}.Bisque {background:Bisque;}.Moccasin {background:Moccasin;}.NavajoWhite {background:NavajoWhite;}.PeachPuff {background:PeachPuff;}.Wheat {background:Wheat;}.AntiqueWhite {background:AntiqueWhite;}.Gold {background:Gold;}.Orange {background:Orange;}.LightSalmon {background:LightSalmon;}.Darkorange {background:Darkorange;}.Coral {background:Coral;}.Salmon {background:Salmon;}.SandyBrown {background:SandyBrown;}.LightCoral {background:LightCoral;}.DarkSalmon {background:DarkSalmon;}.BurlyWood {background:BurlyWood;}.Tan {background:Tan;}.Chocolate {background:Chocolate;}.Peru {background:Peru;}.Yellow        {background:Yellow;}.Ivory {background:Ivory;}.LightYellow {background:LightYellow;}.LemonChiffon {background:LemonChiffon;}.LightGoldenRodYellow {background:LightGoldenRodYellow;}.Beige {background:Beige;}.PaleGoldenRod {background:PaleGoldenRod;}.Yellow {background:Yellow;}.Khaki {background:Khaki;}.GoldenRod {background:GoldenRod;}.DarkGoldenRod {background:DarkGoldenRod;}.Green         {background:Green;}.MintCream {background:MintCream;}.Azure {background:Azure;}.HoneyDew {background:HoneyDew;}.LightCyan {background:LightCyan;}.PaleTurquoise {background:PaleTurquoise;}.GreenYellow {background:GreenYellow;}.LightGreen {background:LightGreen;}.PaleGreen {background:PaleGreen;}.DarkSeaGreen {background:DarkSeaGreen;}.DarkKhaki {background:DarkKhaki;}.YellowGreen {background:YellowGreen;}.SpringGreen {background:SpringGreen;}.Lime {background:Lime;}.Aquamarine {background:Aquamarine;}.MediumSpringGreen {background:MediumSpringGreen;}.Turquoise {background:Turquoise;}.MediumSeaGreen {background:MediumSeaGreen;}.Chartreuse {background:Chartreuse;}.LawnGreen {background:LawnGreen;}.LimeGreen {background:LimeGreen;}.DarkSlateGray {background:DarkSlateGray;}.SeaGreen {background:SeaGreen;}.ForestGreen {background:ForestGreen;}.MediumAquaMarine {background:MediumAquaMarine;}.CadetBlue {background:CadetBlue;}.DarkOliveGreen {background:DarkOliveGreen;}.Olive {background:Olive;}.OliveDrab {background:OliveDrab;}.LightSeaGreen {background:LightSeaGreen;}.DarkTurquoise {background:DarkTurquoise;}.DarkCyan {background:DarkCyan;}.Teal {background:Teal;}.Green {background:Green;}.DarkGreen {background:DarkGreen;}.Blue          {background:Blue;}.AliceBlue {background:AliceBlue;}.PowderBlue {background:PowderBlue;}.LightBlue {background:LightBlue;}.LightSteelBlue {background:LightSteelBlue;}.DeepSkyBlue {background:DeepSkyBlue;}.DodgerBlue {background:DodgerBlue;}.CornflowerBlue {background:CornflowerBlue;}.Aqua {background:Aqua;}.Cyan {background:Cyan;}.MediumTurquoise {background:MediumTurquoise;}.SteelBlue {background:SteelBlue;}.LightSkyBlue {background:LightSkyBlue;}.SkyBlue {background:SkyBlue;}.MediumSlateBlue {background:MediumSlateBlue;}.SlateBlue {background:SlateBlue;}.RoyalBlue {background:RoyalBlue;}.Blue {background:Blue;}.MediumBlue {background:MediumBlue;}.DarkSlateBlue {background:DarkSlateBlue;}.Indigo  {background:Indigo;}.DarkBlue {background:DarkBlue;}.Navy {background:Navy;}.MidnightBlue {background:MidnightBlue;}.Purple        {background:Purple;}.GhostWhite {background:GhostWhite;}.Lavender {background:Lavender;}.Violet {background:Violet;}.Plum {background:Plum;}.Thistle {background:Thistle;}.Fuchsia {background:Fuchsia;}.Magenta {background:Magenta;}.Orchid {background:Orchid;}.PaleVioletRed {background:PaleVioletRed;}.DarkMagenta {background:DarkMagenta;}.MediumOrchid {background:MediumOrchid;}.DarkOrchid {background:DarkOrchid;}.DarkViolet {background:DarkViolet;}.MediumPurple {background:MediumPurple;}.BlueViolet {background:BlueViolet;}.Purple {background:Purple;}.Other         {background:Other;}.White {background:White;}.WhiteSmoke {background:WhiteSmoke;}.Gainsboro {background:Gainsboro;}.LightGrey {background:LightGrey;}.DarkGray {background:DarkGray;}.Silver {background:Silver;}.Gray {background:Gray;}.LightSlateGray {background:LightSlateGray;}.SlateGray {background:SlateGray;}.DimGray {background:DimGray;}.Black {background:Black;}.color-picker li {display: inline-block;}.color-picker button {display: inline-block;height: 15px;width: 15px;border:2px solid gray;border-radius: 3px;margin: 3px;}.color-picker button {box-shadow:0 0 0 0px transparent;transition-duration: 0.2s}.color-picker button:hover, .color-picker button:focus {box-shadow:0 0 0 6px black;}#selectedColor {text-align: center;}#selectedColor>span {/*font-size: 30px;*/font-weight: bold;background: black;color:white;padding: 0.5em 1em;margin:1em auto;display: inline-block;border-radius: 10px;}#previewColor {width:100%;min-height: 200px;}'),
				document.head.appendChild(b));
			let c = document.createElement('style');
			((c.textContent =
				".disclosure ul,.disclosure li {list-style:none;padding: 0;}.disclosure li {margin: 0;}.disclosure a {display: block;padding: 0.2em 1em;}.disclosure h2 button {display: inline-block;}.disclosureTriggerButton>span:first-child {display: inline-block;transition-duration: 0.4s;}.disclosureTriggerButton[aria-expanded='true']>span:first-child {transform: rotate(180deg);}.disclosure {margin-top:10px;}"),
				document.head.appendChild(c));
		})(),
			(a += '  <div class="disclosure">\n'),
			(a += '   <div>\n'),
			(a +=
				'   <button class="disclosureTriggerButton" type="button" aria-expanded="false" aria-controls="disclosure1" id="TriggerEl"><span aria-hidden="true">\u25BC</span>Tab Path Color</button>\n'),
			(a += '   </div>\n'),
			(a +=
				'   <div id="disclosure1" tabindex="-1" class="disclosureContent" role="group" aria-labelledby="TriggerEl" hidden>\n'),
			(a +=
				'   <div class="no-list-style" role="group" aria-labelledby="h1heading">\n'),
			(a += '   <ul role="list" class="color-picker">\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Snow"><span class="visually-hidden">Snow</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="SeaShell"><span class="visually-hidden">SeaShell</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="LavenderBlush"><span class="visually-hidden">LavenderBlush</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="MistyRose"><span class="visually-hidden">MistyRose</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Linen"><span class="visually-hidden">Linen</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Pink"><span class="visually-hidden">Pink</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="LightPink"><span class="visually-hidden">LightPink</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Red"><span class="visually-hidden">Red</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Crimson"><span class="visually-hidden">Crimson</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="HotPink"><span class="visually-hidden">HotPink</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Tomato"><span class="visually-hidden">Tomato</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="OrangeRed"><span class="visually-hidden">OrangeRed</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DeepPink"><span class="visually-hidden">DeepPink</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="IndianRed "><span class="visually-hidden">IndianRed </span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="RosyBrown"><span class="visually-hidden">RosyBrown</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="MediumVioletRed"><span class="visually-hidden">MediumVioletRed</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="FireBrick"><span class="visually-hidden">FireBrick</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Brown"><span class="visually-hidden">Brown</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Sienna"><span class="visually-hidden">Sienna</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="SaddleBrown"><span class="visually-hidden">SaddleBrown</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DarkRed"><span class="visually-hidden">DarkRed</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Maroon"><span class="visually-hidden">Maroon</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Orange"><span class="visually-hidden">Orange</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="FloralWhite"><span class="visually-hidden">FloralWhite</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Cornsilk"><span class="visually-hidden">Cornsilk</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="OldLace"><span class="visually-hidden">OldLace</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="PapayaWhip"><span class="visually-hidden">PapayaWhip</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="BlanchedAlmond"><span class="visually-hidden">BlanchedAlmond</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Bisque"><span class="visually-hidden">Bisque</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Moccasin"><span class="visually-hidden">Moccasin</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="NavajoWhite"><span class="visually-hidden">NavajoWhite</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="PeachPuff"><span class="visually-hidden">PeachPuff</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Wheat"><span class="visually-hidden">Wheat</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="AntiqueWhite"><span class="visually-hidden">AntiqueWhite</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Gold"><span class="visually-hidden">Gold</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Orange"><span class="visually-hidden">Orange</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="LightSalmon"><span class="visually-hidden">LightSalmon</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Darkorange"><span class="visually-hidden">Darkorange</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Coral"><span class="visually-hidden">Coral</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Salmon"><span class="visually-hidden">Salmon</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="SandyBrown"><span class="visually-hidden">SandyBrown</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="LightCoral"><span class="visually-hidden">LightCoral</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DarkSalmon"><span class="visually-hidden">DarkSalmon</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="BurlyWood"><span class="visually-hidden">BurlyWood</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Tan"><span class="visually-hidden">Tan</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Chocolate"><span class="visually-hidden">Chocolate</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Peru"><span class="visually-hidden">Peru</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Yellow"><span class="visually-hidden">Yellow</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Ivory"><span class="visually-hidden">Ivory</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="LightYellow"><span class="visually-hidden">LightYellow</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="LemonChiffon"><span class="visually-hidden">LemonChiffon</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="LightGoldenRodYellow"><span class="visually-hidden">LightGoldenRodYellow</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Beige"><span class="visually-hidden">Beige</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="PaleGoldenRod"><span class="visually-hidden">PaleGoldenRod</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Yellow"><span class="visually-hidden">Yellow</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Khaki"><span class="visually-hidden">Khaki</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="GoldenRod"><span class="visually-hidden">GoldenRod</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DarkGoldenRod"><span class="visually-hidden">DarkGoldenRod</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Green"><span class="visually-hidden">Green</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="MintCream"><span class="visually-hidden">MintCream</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Azure"><span class="visually-hidden">Azure</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="HoneyDew"><span class="visually-hidden">HoneyDew</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="LightCyan"><span class="visually-hidden">LightCyan</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="PaleTurquoise"><span class="visually-hidden">PaleTurquoise</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="GreenYellow"><span class="visually-hidden">GreenYellow</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="LightGreen"><span class="visually-hidden">LightGreen</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="PaleGreen"><span class="visually-hidden">PaleGreen</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DarkSeaGreen"><span class="visually-hidden">DarkSeaGreen</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DarkKhaki"><span class="visually-hidden">DarkKhaki</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="YellowGreen"><span class="visually-hidden">YellowGreen</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="SpringGreen"><span class="visually-hidden">SpringGreen</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Lime"><span class="visually-hidden">Lime</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Aquamarine"><span class="visually-hidden">Aquamarine</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="MediumSpringGreen"><span class="visually-hidden">MediumSpringGreen</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Turquoise"><span class="visually-hidden">Turquoise</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="MediumSeaGreen"><span class="visually-hidden">MediumSeaGreen</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Chartreuse"><span class="visually-hidden">Chartreuse</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="LawnGreen"><span class="visually-hidden">LawnGreen</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="LimeGreen"><span class="visually-hidden">LimeGreen</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DarkSlateGray"><span class="visually-hidden">DarkSlateGray</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="SeaGreen"><span class="visually-hidden">SeaGreen</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="ForestGreen"><span class="visually-hidden">ForestGreen</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="MediumAquaMarine"><span class="visually-hidden">MediumAquaMarine</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="CadetBlue"><span class="visually-hidden">CadetBlue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DarkOliveGreen"><span class="visually-hidden">DarkOliveGreen</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Olive"><span class="visually-hidden">Olive</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="OliveDrab"><span class="visually-hidden">OliveDrab</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="LightSeaGreen"><span class="visually-hidden">LightSeaGreen</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DarkTurquoise"><span class="visually-hidden">DarkTurquoise</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DarkCyan"><span class="visually-hidden">DarkCyan</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Teal"><span class="visually-hidden">Teal</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Green"><span class="visually-hidden">Green</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DarkGreen"><span class="visually-hidden">DarkGreen</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Blue"><span class="visually-hidden">Blue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="AliceBlue"><span class="visually-hidden">AliceBlue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="PowderBlue"><span class="visually-hidden">PowderBlue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="LightBlue"><span class="visually-hidden">LightBlue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="LightSteelBlue"><span class="visually-hidden">LightSteelBlue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DeepSkyBlue"><span class="visually-hidden">DeepSkyBlue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DodgerBlue"><span class="visually-hidden">DodgerBlue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="CornflowerBlue"><span class="visually-hidden">CornflowerBlue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Aqua"><span class="visually-hidden">Aqua</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Cyan"><span class="visually-hidden">Cyan</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="MediumTurquoise"><span class="visually-hidden">MediumTurquoise</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="SteelBlue"><span class="visually-hidden">SteelBlue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="LightSkyBlue"><span class="visually-hidden">LightSkyBlue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="SkyBlue"><span class="visually-hidden">SkyBlue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="MediumSlateBlue"><span class="visually-hidden">MediumSlateBlue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="SlateBlue"><span class="visually-hidden">SlateBlue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="RoyalBlue"><span class="visually-hidden">RoyalBlue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Blue"><span class="visually-hidden">Blue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="MediumBlue"><span class="visually-hidden">MediumBlue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DarkSlateBlue"><span class="visually-hidden">DarkSlateBlue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Indigo "><span class="visually-hidden">Indigo </span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DarkBlue"><span class="visually-hidden">DarkBlue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Navy"><span class="visually-hidden">Navy</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="MidnightBlue"><span class="visually-hidden">MidnightBlue</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Purple"><span class="visually-hidden">Purple</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="GhostWhite"><span class="visually-hidden">GhostWhite</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Lavender"><span class="visually-hidden">Lavender</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Violet"><span class="visually-hidden">Violet</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Plum"><span class="visually-hidden">Plum</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Thistle"><span class="visually-hidden">Thistle</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Fuchsia"><span class="visually-hidden">Fuchsia</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Magenta"><span class="visually-hidden">Magenta</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Orchid"><span class="visually-hidden">Orchid</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="PaleVioletRed"><span class="visually-hidden">PaleVioletRed</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DarkMagenta"><span class="visually-hidden">DarkMagenta</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="MediumOrchid"><span class="visually-hidden">MediumOrchid</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DarkOrchid"><span class="visually-hidden">DarkOrchid</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DarkViolet"><span class="visually-hidden">DarkViolet</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="MediumPurple"><span class="visually-hidden">MediumPurple</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="BlueViolet"><span class="visually-hidden">BlueViolet</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Purple"><span class="visually-hidden">Purple</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Other"><span class="visually-hidden">Other</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="White"><span class="visually-hidden">White</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="WhiteSmoke"><span class="visually-hidden">WhiteSmoke</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Gainsboro"><span class="visually-hidden">Gainsboro</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="LightGrey"><span class="visually-hidden">LightGrey</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DarkGray"><span class="visually-hidden">DarkGray</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Silver"><span class="visually-hidden">Silver</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Gray"><span class="visually-hidden">Gray</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="LightSlateGray"><span class="visually-hidden">LightSlateGray</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="SlateGray"><span class="visually-hidden">SlateGray</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="DimGray"><span class="visually-hidden">DimGray</span></button></li>\n'),
			(a +=
				'    <li role="listitem"><button type="button" class="Black"><span class="visually-hidden">Black</span></button></li>\n'),
			(a += '   </ul>\n'),
			(a += '   </div>\n'),
			(a +=
				'   <div id="selectedColor"><span>Select color</span></div>\n'),
			(a +=
				'   <div role="status" id="status" class="visually-hidden"></div>\n'),
			(a += '   </div>\n'),
			(a += '  </div>\n'),
			Array.from(c).forEach((a) => {
				a.getAttribute('tabindex') &&
					'-1' !== a.getAttribute('tabindex') &&
					'0' !== a.getAttribute('tabindex') &&
					('' === (p = a.textContent.trim()) &&
						(p = '\u203C\uFE0F NON-TEXT CONTENT \u203C\uFE0F'),
					e.push([parseInt(a.getAttribute('tabindex')), p, a]));
			}),
			e.sort(function (a, b) {
				return a[0] - b[0];
			}),
			Array.from(c).forEach((a) => {
				(a.getAttribute('tabindex') &&
					'0' !== a.getAttribute('tabindex')) ||
					('' === (p = a.textContent.trim()) &&
						(p = '\u203C\uFE0F NON-TEXT CONTENT \u203C\uFE0F'),
					e.push(['N/A', p, a]));
			}));
		let q = 1;
		(Array.from(e).forEach((a) => {
			(a[2].setAttribute('data-actualTabOrder', q),
				(f.innerHTML =
					f.innerHTML +
					'<li><a href="#" data-focusable-el="' +
					q +
					'">' +
					a[1] +
					'</a></li>'),
				q++);
		}),
			r(),
			document.body.appendChild(b));
		let j = document.querySelectorAll('#focusOrderList li a');
		function r() {
			((o = []),
				Array.from(e).forEach((b) => {
					let a = b[2].getBoundingClientRect();
					o.push([a.top, a.right, a.bottom, a.left]);
				}));
		}
		function s() {
			b.remove();
		}
		(Array.from(j).forEach((a) => {
			a.addEventListener('click', (b) => {
				(document
					.querySelector(
						"[data-actualTabOrder='" +
							a.getAttribute('data-focusable-el') +
							"']"
					)
					.classList.add('highlight-el'),
					b.preventDefault());
			});
		}),
			h.addEventListener('click', (a) => {
				s();
			}),
			i.addEventListener('click', (a) => {
				(s(), l());
			}),
			(window.onresize = function () {
				n &&
					(document.querySelector('#taborder-canvas').remove(),
					r(),
					l());
			}),
			(d.innerHTML = a),
			g.appendChild(d));
		var t = document.querySelector('#selectedColor>span');
		document.querySelector('#status');
		var k = document.querySelectorAll('li button');
		(Array.from(k).forEach((a) => {
			(a.addEventListener('focus', (b) => {
				t.textContent = a.textContent;
			}),
				a.addEventListener('mouseover', (b) => {
					t.textContent = a.textContent;
				}),
				a.addEventListener('click', (b) => {
					m = a.textContent;
				}));
		}),
			(function () {
				let b = !1;
				function c(a, b) {
					(a.setAttribute('aria-expanded', 'false'),
						b.setAttribute('hidden', 'hidden'));
				}
				let a = document.querySelectorAll('.disclosureTriggerButton');
				Array.from(a).forEach((a) => {
					let d = a.parentNode.nextElementSibling;
					(c(a, d),
						a.addEventListener('click', (i) => {
							let f = (function (a, b) {
								for (
									;
									(a = a.parentElement) &&
									!(a.matches || a.matchesSelector).call(
										a,
										b
									);
								);
								return a;
							})(a, 'div.accordion');
							if (((b = !1), f && (b = !0), b)) {
								let e = f.querySelector(
									".disclosureTriggerButton[aria-expanded='true']"
								);
								e && a !== e && e.click();
							}
							if ('false' === a.getAttribute('aria-expanded')) {
								var g, h;
								((g = a),
									(h = d),
									g.setAttribute('aria-expanded', 'true'),
									h.removeAttribute('hidden'));
							} else c(a, d);
						}));
				});
			})());
	}
	revealFocusOrder();
})();

console.log(`
Source: https://a11y-tools.com/bookmarklets/#revealfocusorder
Bookmarklet name: Reveal Focus Order
`);
