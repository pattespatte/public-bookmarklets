// Description: Wai aria.min bookmarklet
(!(function () {
	var e,
		a = {
			alert: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			alertdialog: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: ['aria-modal'],
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			application: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: ['aria-activedescendant', 'aria-expanded'],
				deprecatedAttributes: ['aria-dropeffect', 'aria-grabbed'],
				nameable: 'yes',
			},
			article: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: ['main'],
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			aside: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: ['aria-pressed'],
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			banner: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: ['main', 'header', 'footer'],
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			blockquote: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			button: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: ['interactive'],
				supported: ['aria-expanded', 'aria-pressed'],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			caption: {
				requiredParent: ['figure', 'grid', 'table', 'treegrid'],
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-errormessage',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			cell: {
				requiredParent: 'row',
				requiredParentNative: 'tr',
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: [
					'aria-colspan',
					'aria-colindex',
					'aria-rowindex',
					'aria-rowspan',
				],
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			checkbox: {
				requiredParent: null,
				requiredChild: null,
				requiredState: ['aria-checked'],
				descendantRestrictions: ['interactive'],
				supported: ['aria-expanded', 'aria-readonly'],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-grabbed',
					'aria-haspopup',
				],
				nameable: 'yes',
			},
			code: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-errormessage',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			columnheader: {
				requiredParent: 'row',
				requiredParentNative: 'tr',
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: [
					'aria-colspan',
					'aria-colindex',
					'aria-expanded',
					'aria-readonly',
					'aria-required',
					'aria-rowindex',
					'aria-rowspan',
					'aria-selected',
					'aria-sort',
				],
				deprecatedAttributes: ['aria-dropeffect', 'aria-grabbed'],
				nameable: 'yes',
			},
			combobox: {
				requiredParent: null,
				requiredChild: null,
				requiredState: ['aria-expanded', 'aria-controls'],
				descendantRestrictions: null,
				supported: [
					'aria-activedescendant',
					'aria-autocomplete',
					'aria-required',
					'aria-orientation',
				],
				deprecatedAttributes: ['aria-dropeffect', 'aria-grabbed'],
				nameable: 'yes',
			},
			complementary: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: ['main'],
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			contentinfo: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: ['main', 'header', 'footer'],
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			definition: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: ['phrasing'],
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			deletion: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-errormessage',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			dialog: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: ['aria-modal'],
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			directory: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecated: !0,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			document: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				nameable: 'yes',
			},
			emphasis: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-errormessage',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			feed: {
				requiredParent: null,
				requiredChild: ['article'],
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			figure: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			form: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			generic: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-errormessage',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			grid: {
				requiredParent: null,
				requiredChild: ['row', 'rowgroup'],
				requiredChildNative: ['tr'],
				requiredState: null,
				descendantRestrictions: null,
				supported: [
					'aria-activedescendant',
					'aria-colcount',
					'aria-level',
					'aria-multiselectable',
					'aria-readonly',
					'aria-rowcount',
				],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			gridcell: {
				requiredParent: ['row'],
				requiredParentNative: ['tr'],
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: [
					'aria-colspan',
					'aria-colindex',
					'aria-expanded',
					'aria-readonly',
					'aria-required',
					'aria-rowindex',
					'aria-rowspan',
					'aria-selected',
				],
				deprecatedAttributes: ['aria-dropeffect', 'aria-grabbed'],
				nameable: 'yes',
			},
			group: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: ['aria-activedescendant'],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			heading: {
				requiredParent: null,
				requiredChild: null,
				requiredState: ['aria-level'],
				descendantRestrictions: [
					'article',
					'aside',
					'blockquote',
					'body',
					'details',
					'dialog',
					'fieldset',
					'figure',
					'section',
					'h1',
					'h2',
					'h3',
					'h4',
					'h5',
					'h6',
					'hgroup',
					'nav',
					'td',
				],
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			insertion: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-errormessage',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			img: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			link: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: ['interactive'],
				supported: ['aria-expanded'],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			list: {
				requiredParent: null,
				requiredChild: ['group', 'listitem'],
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			listbox: {
				requiredParent: null,
				requiredChild: ['option'],
				requiredState: null,
				descendantRestrictions: null,
				supported: [
					'aria-activedescendant',
					'aria-multiselectable',
					'aria-required',
					'aria-orientation',
				],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-grabbed',
					'aria-haspopup',
				],
				nameable: 'yes',
			},
			listitem: {
				requiredParent: ['group', 'list'],
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: ['aria-level', 'aria-posinset', 'aria-setsize'],
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			log: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			main: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: ['main'],
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			marquee: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			math: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			meter: {
				requiredParent: null,
				requiredChild: null,
				requiredState: ['aria-valuenow'],
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-errormessage',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			menu: {
				requiredParent: null,
				requiredChild: [
					'group',
					'menuitem',
					'menuitemcheckbox',
					'menuitemradio',
				],
				requiredState: null,
				descendantRestrictions: null,
				supported: ['aria-activedescendant', 'aria-orientation'],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			menubar: {
				requiredParent: null,
				requiredChild: [
					'group',
					'menuitem',
					'menuitemcheckbox',
					'menuitemradio',
				],
				requiredState: null,
				descendantRestrictions: null,
				supported: ['aria-activedescendant', 'aria-orientation'],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			menuitem: {
				requiredParent: ['group', 'menu', 'menubar'],
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: ['interactive'],
				supported: ['aria-expanded', 'aria-posinset', 'aria-setsize'],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			menuitemcheckbox: {
				requiredParent: ['menu', 'menubar'],
				requiredChild: null,
				requiredState: ['aria-checked'],
				descendantRestrictions: ['interactive'],
				supported: ['aria-posinset', 'aria-setsize'],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			menuitemradio: {
				requiredParent: ['group', 'menu', 'menubar'],
				requiredChild: null,
				requiredState: ['aria-checked'],
				descendantRestrictions: ['interactive'],
				supported: ['aria-posinset', 'aria-setsize'],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			navigation: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: ['main'],
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			none: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'no',
			},
			note: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			option: {
				requiredParent: ['listbox'],
				requiredChild: null,
				requiredState: ['aria-selected'],
				descendantRestrictions: ['interactive'],
				supported: [
					'aria-checked',
					'aria-posinset',
					'aria-selected',
					'aria-setsize',
				],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			paragraph: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-errormessage',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			presentation: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'no',
			},
			progressbar: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: [
					'aria-valuemax',
					'aria-valuemin',
					'aria-valuenow',
					'aria-valuetext',
				],
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			radio: {
				requiredParent: null,
				requiredChild: null,
				requiredState: ['aria-checked'],
				descendantRestrictions: ['interactive'],
				supported: ['aria-posinset', 'aria-selected', 'aria-setsize'],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			radiogroup: {
				requiredParent: null,
				requiredChild: 'radio',
				requiredState: null,
				descendantRestrictions: null,
				supported: [
					'aria-activedescendant',
					'aria-orientation',
					'aria-required',
				],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-grabbed',
					'aria-haspopup',
				],
				nameable: 'yes',
			},
			region: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			row: {
				requiredParent: ['grid', 'rowgroup', 'table', 'treegrid'],
				requiredParentNative: ['table', 'thead', 'tbody', 'tfoot'],
				requiredChild: [
					'cell',
					'columnheader',
					'gridcell',
					'rowheader',
				],
				requiredChildNative: ['td', 'th'],
				requiredState: null,
				descendantRestrictions: null,
				supported: [
					'aria-activedescendant',
					'aria-colindex',
					'aria-rowindex',
					'aria-selected',
					'aria-expanded',
					'aria-level',
					'aria-posinset',
					'aria-setsize',
				],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			rowgroup: {
				requiredParent: ['grid', 'table', 'treegrid'],
				requiredParentNative: 'table',
				requiredChild: ['row'],
				requiredChildNative: 'tr',
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			rowheader: {
				requiredParent: ['row'],
				requiredParentNative: ['tr'],
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: [
					'aria-colindex',
					'aria-colspan',
					'aria-expanded',
					'aria-readonly',
					'aria-required',
					'aria-rowindex',
					'aria-rowspan',
					'aria-selected',
					'aria-expanded',
				],
				deprecatedAttributes: ['aria-dropeffect', 'aria-grabbed'],
				nameable: 'yes',
			},
			scrollbar: {
				requiredParent: null,
				requiredChild: null,
				requiredState: [
					'aria-controls',
					'aria-orientation',
					'aria-valuemax',
					'aria-valuemin',
					'aria-valuenow',
				],
				descendantRestrictions: null,
				supported: ['aria-valuetext'],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			search: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			searchbox: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: ['interactive'],
				supported: [
					'aria-activedescendant',
					'aria-autocomplete',
					'aria-multiline',
					'aria-placeholder',
					'aria-readonly',
					'aria-required',
				],
				deprecatedAttributes: ['aria-dropeffect', 'aria-grabbed'],
				nameable: 'yes',
			},
			separator: {
				requiredParent: null,
				requiredChild: null,
				requiredState: [
					'aria-valuemax',
					'aria-valuemin',
					'aria-valuenow',
				],
				descendantRestrictions: null,
				supported: ['aria-orientation', 'aria-valuetext'],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			slider: {
				requiredParent: null,
				requiredChild: null,
				requiredState: [
					'aria-valuemax',
					'aria-valuemin',
					'aria-valuenow',
				],
				descendantRestrictions: null,
				supported: ['aria-orientation', 'aria-valuetext'],
				deprecatedAttributes: ['aria-dropeffect', 'aria-grabbed'],
				nameable: 'yes',
			},
			spinbutton: {
				requiredParent: null,
				requiredChild: null,
				requiredState: [
					'aria-valuemax',
					'aria-valuemin',
					'aria-valuenow',
				],
				descendantRestrictions: null,
				supported: [
					'aria-readonly',
					'aria-required',
					'aria-valuetext',
					'aria-placeholder',
				],
				deprecatedAttributes: ['aria-dropeffect', 'aria-grabbed'],
				nameable: 'yes',
			},
			status: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			strong: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-errormessage',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			subscript: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-errormessage',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			superscript: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-errormessage',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			switch: {
				requiredParent: null,
				requiredChild: null,
				requiredState: ['aria-checked'],
				descendantRestrictions: ['interactive'],
				supported: ['aria-expanded', 'aria-readonly'],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-grabbed',
					'aria-haspopup',
				],
				nameable: 'yes',
			},
			tab: {
				requiredParent: ['tablist'],
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: [
					'aria-expanded',
					'aria-posinset',
					'aria-selected',
					'aria-setsize',
				],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			table: {
				requiredParent: null,
				requiredChild: ['row', 'rowgroup'],
				requiredChildNative: ['tr', 'thead', 'tbody', 'tfoot'],
				requiredState: null,
				descendantRestrictions: null,
				supported: ['aria-colcount', 'aria-rowcount'],
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			tablist: {
				requiredParent: null,
				requiredChild: ['tab'],
				requiredState: null,
				descendantRestrictions: null,
				supported: [
					'aria-activedescendant',
					'aria-level',
					'aria-multiselectable',
					'aria-orientation',
				],
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			tabpanel: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			term: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: ['phrasing'],
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			textbox: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: ['interactive'],
				supported: [
					'aria-activedescendant',
					'aria-autocomplete',
					'aria-multiline',
					'aria-placeholder',
					'aria-readonly',
					'aria-required',
				],
				deprecatedAttributes: ['aria-dropeffect', 'aria-grabbed'],
				nameable: 'yes',
			},
			time: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-errormessage',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			timer: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			toolbar: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: ['aria-activedescendant', 'aria-orientation'],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
			},
			tooltip: {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			tree: {
				requiredParent: null,
				requiredChild: ['group', 'treeitem'],
				requiredState: null,
				descendantRestrictions: null,
				supported: [
					'aria-activedescendant',
					'aria-multiselectable',
					'aria-orientation',
					'aria-required',
				],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-grabbed',
					'aria-haspopup',
				],
				nameable: 'yes',
			},
			treegrid: {
				requiredParent: null,
				requiredChild: ['row', 'rowgroup'],
				requiredState: null,
				descendantRestrictions: null,
				supported: [
					'aria-activedescendant',
					'aria-colcount',
					'aria-level',
					'aria-multiselectable',
					'aria-orientation',
					'aria-readonly',
					'aria-required',
					'aria-rowcount',
				],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-grabbed',
					'aria-haspopup',
				],
				nameable: 'yes',
			},
			treeitem: {
				requiredParent: ['group', 'tree'],
				requiredChild: null,
				requiredState: ['aria-selected'],
				descendantRestrictions: null,
				supported: [
					'aria-checked',
					'aria-expanded',
					'aria-level',
					'aria-posinset',
					'aria-selected',
					'aria-setsize',
				],
				deprecatedAttributes: [
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-abstract': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-acknowledgments': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-afterword': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-appendix': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-backlink': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-biblioentry': {
				requiredParent: 'list',
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecated: !0,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-bibliography': {
				requiredParent: null,
				requiredChild: 'list',
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-biblioref': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-chapter': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-colophon': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-conclusion': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-cover': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
			},
			'doc-credit': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-credits': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-dedication': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-endnote': {
				requiredParent: ['list'],
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecated: !0,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-endnotes': {
				requiredParent: null,
				requiredChild: 'list',
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-epigraph': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-epilogue': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-errata': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-example': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-footnote': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-foreword': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-glossary': {
				requiredParent: null,
				requiredChild: ['term', 'definition'],
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-glossref': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-index': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-introduction': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-noteref': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-notice': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-pagebreak': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-pagelist': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-part': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-preface': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-prologue': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-pullquote': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-qna': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
			},
			'doc-subtitle': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-tip': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
			'doc-toc': {
				requiredParent: null,
				requiredChild: null,
				requiredState: null,
				descendantRestrictions: null,
				supported: null,
				deprecatedAttributes: [
					'aria-disabled',
					'aria-dropeffect',
					'aria-errormessage',
					'aria-grabbed',
					'aria-haspopup',
					'aria-invalid',
				],
				nameable: 'yes',
			},
		},
		r = {
			ahref: {
				nodeName: 'a',
				nativeRole: 'link',
				allowedRoles: [
					'button',
					'checkbox',
					'menuitem',
					'menuitemcheckbox',
					'menuitemradio',
					'option',
					'radio',
					'switch',
					'tab',
					'treeitem',
					'doc-backlink',
					'doc-biblioref',
					'doc-glossref',
					'doc-noteref',
				],
				nameable: 'yes',
			},
			anohref: {
				nodeName: 'a',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			abbr: {
				nodeName: 'abbr',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			address: {
				nodeName: 'address',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'yes',
			},
			area: {
				nodeName: 'area',
				nativeRole: 'link',
				allowedRoles: [],
				nameable: 'yes',
			},
			areanohref: {
				nodeName: 'area',
				nativeRole: null,
				allowedRoles: ['button', 'link'],
				nameable: 'no',
			},
			article: {
				nodeName: 'article',
				nativeRole: 'article',
				allowedRoles: [
					'feed',
					'presentation',
					'none',
					'document',
					'application',
					'main',
					'region',
				],
				nameable: 'yes',
			},
			aside: {
				nodeName: 'aside',
				nativeRole: 'complementary',
				allowedRoles: [
					'feed',
					'note',
					'presentation',
					'none',
					'region',
					'search',
					'doc-dedication',
					'doc-example',
					'doc-footnote',
					'doc-glossary',
					'doc-pullquote',
					'doc-tip',
				],
				nameable: 'yes',
			},
			audio: {
				nodeName: 'audio',
				nativeRole: null,
				allowedRoles: ['application'],
				nameable: 'yes',
			},
			b: {
				nodeName: 'b',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			base: {
				nodeName: 'base',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'no',
			},
			bdi: {
				nodeName: 'bdi',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			bdo: {
				nodeName: 'bdo',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			blockquote: {
				nodeName: 'blockquote',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'yes',
			},
			body: {
				nodeName: 'body',
				nativeRole: 'document',
				allowedRoles: [],
				nameable: 'no',
			},
			br: {
				nodeName: 'br',
				nativeRole: null,
				allowedRoles: ['none', 'presentation'],
				nameable: 'no',
			},
			button: {
				nodeName: 'button',
				nativeRole: 'button',
				allowedRoles: [
					'checkbox',
					'combobox',
					'gridcell',
					'link',
					'menuitem',
					'menuitemcheckbox',
					'menuitemradio',
					'option',
					'radio',
					'separator',
					'slider',
					'switch',
					'tab',
					'treeitem',
				],
				nameable: 'yes',
			},
			canvas: {
				nodeName: 'canvas',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'yes',
			},
			caption: {
				nodeName: 'caption',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'no',
			},
			cite: {
				nodeName: 'cite',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			code: {
				nodeName: 'code',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			col: {
				nodeName: 'col',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			colgroup: {
				nodeName: 'colgroup',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			data: {
				nodeName: 'data',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			datalist: {
				nodeName: 'datalist',
				nativeRole: 'listbox',
				allowedRoles: [],
				nameable: 'yes',
			},
			dd: {
				nodeName: 'dd',
				nativeRole: 'definition',
				allowedRoles: [],
				nameable: 'yes',
			},
			del: {
				nodeName: 'del',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			details: {
				nodeName: 'details',
				nativeRole: 'group',
				allowedRoles: [],
				nameable: 'yes',
			},
			dfn: {
				nodeName: 'dfn',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'yes',
			},
			dialog: {
				nodeName: 'dialog',
				nativeRole: 'dialog',
				allowedRoles: ['alertdialog'],
				nameable: 'yes',
			},
			div: {
				nodeName: 'div',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			dl: {
				nodeName: 'dl',
				nativeRole: null,
				allowedRoles: ['group', 'list', 'presentation', 'none'],
				nameable: 'yes',
			},
			dt: {
				nodeName: 'dt',
				nativeRole: 'term',
				allowedRoles: ['listitem'],
				nameable: 'yes',
			},
			em: {
				nodeName: 'em',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			embed: {
				nodeName: 'embed',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			figcaption: {
				nodeName: 'figcaption',
				nativeRole: null,
				allowedRoles: ['group', 'presentation', 'none'],
				nameable: 'no',
			},
			fieldset: {
				nodeName: 'fieldset',
				nativeRole: 'group',
				allowedRoles: ['radiogroup', 'none', 'presentation'],
				nameable: 'yes',
			},
			figure: {
				nodeName: 'figure',
				nativeRole: 'figure',
				allowedRoles: ['doc-example'],
				nameable: 'yes',
			},
			'figure-nofigcap': {
				nodeName: 'figure',
				nativeRole: 'figure',
				allowedRoles: 'all',
				nameable: 'yes',
			},
			footer: {
				nodeName: 'footer',
				nativeRole: 'contentinfo',
				allowedRoles: ['group', 'none', 'presentation', 'doc-footnote'],
				nameable: 'no',
			},
			form: {
				nodeName: 'form',
				nativeRole: 'form',
				allowedRoles: ['search', 'none', 'presentation'],
				nameable: 'yes',
			},
			h1: {
				nodeName: 'h1',
				nativeRole: 'heading',
				allowedRoles: ['tab', 'none', 'presentation', 'doc-subtitle'],
				nameable: 'yes',
			},
			h2: {
				nodeName: 'h2',
				nativeRole: 'heading',
				allowedRoles: ['tab', 'none', 'presentation', 'doc-subtitle'],
			},
			h3: {
				nodeName: 'h3',
				nativeRole: 'heading',
				allowedRoles: ['tab', 'none', 'presentation', 'doc-subtitle'],
				nameable: 'yes',
			},
			h4: {
				nodeName: 'h4',
				nativeRole: 'heading',
				allowedRoles: ['tab', 'none', 'presentation', 'doc-subtitle'],
				nameable: 'yes',
			},
			h5: {
				nodeName: 'h5',
				nativeRole: 'heading',
				allowedRoles: ['tab', 'none', 'presentation', 'doc-subtitle'],
				nameable: 'yes',
			},
			h6: {
				nodeName: 'h6',
				nativeRole: 'heading',
				allowedRoles: ['tab', 'none', 'presentation', 'doc-subtitle'],
				nameable: 'yes',
			},
			head: {
				nodeName: 'head',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			header: {
				nodeName: 'header',
				nativeRole: 'banner',
				allowedRoles: ['group', 'none', 'presentation'],
				nameable: 'no',
			},
			hgroup: {
				nodeName: 'hgroup',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'yes',
			},
			hr: {
				nodeName: 'hr',
				nativeRole: 'separator',
				allowedRoles: ['none', 'presentation', 'doc-pagebreak'],
				nameable: 'yes',
			},
			html: {
				nodeName: 'html',
				nativeRole: 'document',
				allowedRoles: [],
				nameable: 'yes',
			},
			i: {
				nodeName: 'i',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			iframe: {
				nodeName: 'iframe',
				nativeRole: null,
				allowedRoles: [
					'application',
					'document',
					'img',
					'none',
					'presentation',
				],
				nameable: 'yes',
			},
			'img-noalt': {
				nodeName: 'imgEmptyAlt',
				nativeRole: 'img',
				allowedRoles: ['none', 'presentation'],
				nameable: 'yes',
			},
			'img-emptyalt': {
				nodeName: 'imgEmptyAlt',
				nativeRole: 'img',
				allowedRoles: ['none', 'presentation'],
				nameable: 'yes',
			},
			img: {
				nodeName: 'imgWithAlt',
				nativeRole: 'img',
				allowedRoles: [
					'button',
					'checkbox',
					'doc-cover',
					'link',
					'menuitem',
					'menuitemcheckbox',
					'menuitemradio',
					'meter',
					'option',
					'progressbar',
					'radio',
					'scrollbar',
					'separator',
					'slider',
					'switch',
					'tab',
					'treeitem',
				],
				nameable: 'yes',
			},
			'input-button': {
				nodeName: 'input',
				nativeRole: 'button',
				allowedRoles: [
					'checkbox',
					'combobox',
					'gridcell',
					'link',
					'menuitem',
					'menuitemcheckbox',
					'menuitemradio',
					'option',
					'radio',
					'separator',
					'slider',
					'switch',
					'tab',
					'treeitem',
				],
				nameable: 'yes',
			},
			'input-checkbox': {
				nodeName: 'input',
				nativeRole: 'checkbox',
				allowedRoles: [
					'button',
					'menuitemcheckbox',
					'option',
					'switch',
				],
				nameable: 'yes',
			},
			'input-color': {
				nodeName: 'input',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			'input-date': {
				nodeName: 'input',
				nativeRole: 'textbox',
				allowedRoles: [],
				nameable: 'yes',
			},
			'input-datetime-local': {
				nodeName: 'input',
				nativeRole: 'textbox',
				allowedRoles: [],
				nameable: 'yes',
			},
			'input-email': {
				nodeName: 'input',
				nativeRole: 'textbox',
				allowedRoles: [],
				nameable: 'yes',
			},
			'input-file': {
				nodeName: 'input',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			'input-hidden': {
				nodeName: 'input',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			'input-image': {
				nodeName: 'input',
				nativeRole: 'button',
				allowedRoles: [
					'checkbox',
					'combobox',
					'gridcell',
					'link',
					'menuitem',
					'menuitemcheckbox',
					'menuitemradio',
					'option',
					'radio',
					'separator',
					'slider',
					'switch',
					'tab',
					'treeitem',
				],
				nameable: 'yes',
			},
			'input-month': {
				nodeName: 'input',
				nativeRole: 'textbox',
				allowedRoles: [],
				nameable: 'yes',
			},
			'input-number': {
				nodeName: 'input',
				nativeRole: 'spinbutton',
				allowedRoles: [],
				nameable: 'yes',
			},
			'input-password': {
				nodeName: 'input',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			'input-radio': {
				nodeName: 'input',
				nativeRole: 'radio',
				allowedRoles: ['menuitemradio'],
				nameable: 'yes',
			},
			'input-range': {
				nodeName: 'input',
				nativeRole: 'slider',
				allowedRoles: [],
				nameable: 'yes',
			},
			'input-reset': {
				nodeName: 'input',
				nativeRole: 'button',
				allowedRoles: [
					'checkbox',
					'combobox',
					'gridcell',
					'link',
					'menuitem',
					'menuitemcheckbox',
					'menuitemradio',
					'option',
					'radio',
					'separator',
					'slider',
					'switch',
					'tab',
					'treeitem',
				],
				nameable: 'yes',
			},
			'input-search': {
				nodeName: 'input',
				nativeRole: 'searchbox',
				allowedRoles: [],
				nameable: 'yes',
			},
			'input-submit': {
				nodeName: 'input',
				nativeRole: 'button',
				allowedRoles: [
					'checkbox',
					'combobox',
					'gridcell',
					'link',
					'menuitem',
					'menuitemcheckbox',
					'menuitemradio',
					'option',
					'radio',
					'separator',
					'slider',
					'switch',
					'tab',
					'treeitem',
				],
				nameable: 'yes',
			},
			'input-tel': {
				nodeName: 'input',
				nativeRole: 'textbox',
				allowedRoles: [],
				nameable: 'yes',
			},
			'input-text': {
				nodeName: 'input',
				nativeRole: 'textbox',
				allowedRoles: ['combobox', 'searchbox', 'spinbutton'],
				nameable: 'yes',
			},
			'input-time': {
				nodeName: 'input',
				nativeRole: 'textbox',
				allowedRoles: [],
				nameable: 'yes',
			},
			'input-url': {
				nodeName: 'input',
				nativeRole: 'textbox',
				allowedRoles: [],
				nameable: 'yes',
			},
			'input-week': {
				nodeName: 'input',
				nativeRole: 'textbox',
				allowedRoles: [],
				nameable: 'yes',
			},
			ins: {
				nodeName: 'ins',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			kbd: {
				nodeName: 'kbd',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			label: {
				nodeName: 'label',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'no',
			},
			legend: {
				nodeName: 'legend',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'no',
			},
			li: {
				nodeName: 'li',
				nativeRole: 'listitem',
				allowedRoles: [
					'menuitem',
					'menuitemcheckbox',
					'menuitemradio',
					'option',
					'none',
					'presentation',
					'radio',
					'separator',
					'tab',
					'treeitem',
					'doc-biblioentry',
					'doc-endnote',
				],
				nameable: 'yes',
			},
			link: {
				nodeName: 'link',
				nativeRole: 'link',
				allowedRoles: [],
				nameable: 'yes',
			},
			main: {
				nodeName: 'main',
				nativeRole: 'main',
				allowedRoles: [],
				nameable: 'yes',
			},
			map: {
				nodeName: 'map',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			mark: {
				nodeName: 'mark',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			math: {
				nodeName: 'math',
				nativeRole: 'math',
				allowedRoles: [],
				nameable: 'yes',
			},
			menu: {
				nodeName: 'menu',
				nativeRole: 'list',
				allowedRoles: [
					'directory',
					'group',
					'listbox',
					'menu',
					'menubar',
					'radiogroup',
					'tablist',
					'toolbar',
					'tree',
					'presentation',
					'none',
				],
				nameable: 'yes',
			},
			meta: {
				nodeName: 'meta',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			meter: {
				nodeName: 'meter',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			nav: {
				nodeName: 'nav',
				nativeRole: 'navigation',
				allowedRoles: [
					'menu',
					'menubar',
					'none',
					'presentation',
					'tablist',
					'doc-index',
					'doc-pagelist',
					'doc-toc',
				],
				nameable: 'yes',
			},
			noscript: {
				nodeName: 'noscript',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			object: {
				nodeName: 'object',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			ol: {
				nodeName: 'ol',
				nativeRole: 'list',
				allowedRoles: [
					'directory',
					'group',
					'listbox',
					'menu',
					'menubar',
					'none',
					'presentation',
					'radiogroup',
					'tablist',
					'toolbar',
					'tree',
				],
				nameable: 'yes',
			},
			optgroup: {
				nodeName: 'optgroup',
				nativeRole: 'group',
				allowedRoles: [],
				nameable: 'yes',
			},
			option: {
				nodeName: 'option',
				nativeRole: 'option',
				allowedRoles: [],
				nameable: 'yes',
			},
			output: {
				nodeName: 'output',
				nativeRole: 'status',
				allowedRoles: 'all',
				nameable: 'yes',
			},
			p: {
				nodeName: 'p',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			param: {
				nodeName: 'param',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			picture: {
				nodeName: 'picture',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			pre: {
				nodeName: 'pre',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			progress: {
				nodeName: 'progress',
				nativeRole: 'progressbar',
				allowedRoles: [],
				nameable: 'yes',
			},
			q: {
				nodeName: 'q',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			rp: {
				nodeName: 'rp',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'yes',
			},
			rt: {
				nodeName: 'rt',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			ruby: {
				nodeName: 'ruby',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'yes',
			},
			s: {
				nodeName: 's',
				nativeRole: 'deletion',
				allowedRoles: 'all',
				nameable: 'no',
			},
			samp: {
				nodeName: 'samp',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			script: {
				nodeName: 'script',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			search: {
				nodeName: 'search',
				nativeRole: 'search',
				allowedRoles: [
					'form',
					'group',
					'none',
					'presentation',
					'region',
					'search',
				],
				nameable: 'yes',
			},
			section: {
				nodeName: 'section',
				nativeRole: 'region',
				allowedRoles: [
					'alert',
					'alertdialog',
					'application',
					'banner',
					'complementary',
					'contentinfo',
					'dialog',
					'document',
					'feed',
					'group',
					'log',
					'main',
					'marquee',
					'navigation',
					'none',
					'note',
					'presentation',
					'search',
					'status',
					'tabpanel',
					'doc-abstract',
					'doc-acknowledgments',
					'doc-afterword',
					'doc-appendix',
					'doc-bibliography',
					'doc-chapter',
					'doc-colophon',
					'doc-conclusion',
					'doc-credit',
					'doc-credits',
					'doc-dedication',
					'doc-endnotes',
					'doc-epigraph',
					'doc-epilogue',
					'doc-errata',
					'doc-example',
					'doc-foreword',
					'doc-glossary',
					'doc-index',
					'doc-introduction',
					'doc-notice',
					'doc-pagelist',
					'doc-part',
					'doc-preface',
					'doc-prologue',
					'doc-pullquote',
					'doc-qna',
					'doc-toc',
				],
				nameable: 'yes',
			},
			select: {
				nodeName: 'select',
				nativeRole: 'combobox',
				allowedRoles: ['menu'],
				nameable: 'yes',
			},
			'select-nomenu': {
				nodeName: 'select',
				nativeRole: 'combobox',
				allowedRoles: [],
				nameable: 'yes',
			},
			'select-2': {
				nodeName: 'select',
				nativeRole: 'listbox',
				allowedRoles: [],
				nameable: 'yes',
			},
			slot: {
				nodeName: 'slot',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			small: {
				nodeName: 'small',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			source: {
				nodeName: 'source',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			span: {
				nodeName: 'span',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			strong: {
				nodeName: 'strong',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			style: {
				nodeName: 'style',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			svg: {
				nodeName: 'svg',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'yes',
			},
			sub: {
				nodeName: 'sub',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			sup: {
				nodeName: 'sup',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'yes',
			},
			summary: {
				nodeName: 'summary',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			table: {
				nodeName: 'table',
				nativeRole: 'table',
				allowedRoles: 'all',
				nameable: 'yes',
			},
			template: {
				nodeName: 'template',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			textarea: {
				nodeName: 'textarea',
				nativeRole: 'textbox',
				allowedRoles: [],
				nameable: 'yes',
			},
			tbody: {
				nodeName: 'tbody',
				nativeRole: 'rowgroup',
				allowedRoles: 'all',
				nameable: 'yes',
			},
			tfoot: {
				nodeName: 'tfoot',
				nativeRole: 'rowgroup',
				allowedRoles: 'all',
				nameable: 'yes',
			},
			thead: {
				nodeName: 'thead',
				nativeRole: 'rowgroup',
				allowedRoles: 'all',
				nameable: 'yes',
			},
			title: {
				nodeName: 'title',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			td: {
				nodeName: 'td',
				nativeRole: 'cell',
				allowedRoles: 'all',
				nameable: 'yes',
			},
			th: {
				nodeName: 'th',
				nativeRole: 'columnheader',
				allowedRoles: 'all',
				nameable: 'yes',
			},
			time: {
				nodeName: 'time',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			tr: {
				nodeName: 'tr',
				nativeRole: 'row',
				allowedRoles: 'all',
				nameable: 'yes',
			},
			track: {
				nodeName: 'track',
				nativeRole: null,
				allowedRoles: [],
				nameable: 'yes',
			},
			u: {
				nodeName: 'u',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			ul: {
				nodeName: 'ul',
				nativeRole: 'list',
				allowedRoles: [
					'directory',
					'group',
					'listbox',
					'menu',
					'menubar',
					'radiogroup',
					'tablist',
					'toolbar',
					'tree',
					'presentation',
					'none',
				],
				nameable: 'yes',
			},
			var: {
				nodeName: 'var',
				nativeRole: null,
				allowedRoles: 'all',
				nameable: 'no',
			},
			video: {
				nodeName: 'video',
				nativeRole: null,
				allowedRoles: ['application'],
				nameable: 'yes',
			},
			wbr: {
				nodeName: 'wbr',
				nativeRole: null,
				allowedRoles: ['none', 'presentation'],
				nameable: 'yes',
			},
			circle: {
				nodeName: 'circle',
				nativeRole: null,
				allowedRoles: ['none', 'presentation'],
				nameable: 'yes',
			},
			defs: {
				nodeName: 'defs',
				nativeRole: null,
				allowedRoles: ['none', 'presentation'],
				nameable: 'yes',
			},
			ellipse: {
				nodeName: 'ellipse',
				nativeRole: null,
				allowedRoles: ['none', 'presentation'],
				nameable: 'yes',
			},
			g: {
				nodeName: 'g',
				nativeRole: null,
				allowedRoles: ['none', 'presentation'],
				nameable: 'yes',
			},
			line: {
				nodeName: 'line',
				nativeRole: null,
				allowedRoles: ['none', 'presentation'],
				nameable: 'yes',
			},
			path: {
				nodeName: 'path',
				nativeRole: null,
				allowedRoles: ['none', 'presentation'],
				nameable: 'yes',
			},
			polygon: {
				nodeName: 'polygon',
				nativeRole: null,
				allowedRoles: ['none', 'presentation'],
				nameable: 'yes',
			},
			polyline: {
				nodeName: 'polyline',
				nativeRole: null,
				allowedRoles: ['none', 'presentation'],
				nameable: 'yes',
			},
			rect: {
				nodeName: 'rect',
				nativeRole: null,
				allowedRoles: ['none', 'presentation'],
				nameable: 'yes',
			},
			text: {
				nodeName: 'text',
				nativeRole: null,
				allowedRoles: ['none', 'presentation'],
				nameable: 'yes',
			},
		},
		t = {
			'aria-atomic': { tokenlist: ['false', 'true'] },
			'aria-autocomplete': { tokenlist: ['inline', 'list', 'both'] },
			'aria-busy': { tokenlist: ['false', 'true'] },
			'aria-checked': { tokenlist: ['false', 'true', 'mixed'] },
			'aria-current': {
				tokenlist: [
					'page',
					'step',
					'location',
					'date',
					'time',
					'true',
					'false',
				],
			},
			'aria-disabled': { tokenlist: ['false', 'true'] },
			'aria-expanded': { tokenlist: ['false', 'true'] },
			'aria-haspopup': {
				tokenlist: [
					'true',
					'false',
					'menu',
					'listbox',
					'tree',
					'grid',
					'dialog',
				],
			},
			'aria-hidden': { tokenlist: ['false', 'true'] },
			'aria-invalid': {
				tokenlist: ['grammar', 'false', 'spelling', 'true'],
			},
			'aria-live': { tokenlist: ['assertive', 'off', 'polite'] },
			'aria-modal': { tokenlist: ['false', 'true'] },
			'aria-multiline': { tokenlist: ['false', 'true'] },
			'aria-multiselectable': { tokenlist: ['false', 'true'] },
			'aria-orientation': { tokenlist: ['horizontal', 'vertical'] },
			'aria-pressed': { tokenlist: ['false', 'true', 'mixed'] },
			'aria-readonly': { tokenlist: ['false', 'true'] },
			'aria-relevant': {
				tokenlist: [
					'additions',
					'additions text',
					'all',
					'removals',
					'text',
				],
			},
			'aria-required': { tokenlist: ['false', 'true'] },
			'aria-selected': { tokenlist: ['false', 'true'] },
		},
		i = {
			'aria-colcount': { type: 3 },
			'aria-colindex': { type: 2 },
			'aria-colspan': { type: 2 },
			'aria-level': { type: 4 },
			'aria-posinset': { type: 2 },
			'aria-rowcount': { type: 3 },
			'aria-rowindex': { type: 2 },
			'aria-rowspan': { type: 1 },
			'aria-setsize': { type: 3 },
		},
		l = [
			'aria-activedescendant',
			'aria-atomic',
			'aria-autocomplete',
			'aria-busy',
			'aria-checked',
			'aria-colcount',
			'aria-colindex',
			'aria-colspan',
			'aria-controls',
			'aria-current',
			'aria-describedby',
			'aria-details',
			'aria-disabled',
			'aria-dropeffect',
			'aria-errormessage',
			'aria-expanded',
			'aria-flowto',
			'aria-grabbed',
			'aria-haspopup',
			'aria-hidden',
			'aria-invalid',
			'aria-keyshortcuts',
			'aria-label',
			'aria-labelledby',
			'aria-level',
			'aria-live',
			'aria-modal',
			'aria-multiline',
			'aria-multiselectable',
			'aria-orientation',
			'aria-owns',
			'aria-placeholder',
			'aria-posinset',
			'aria-pressed',
			'aria-readonly',
			'aria-relevant',
			'aria-required',
			'aria-roledescription',
			'aria-rowcount',
			'aria-rowindex',
			'aria-rowspan',
			'aria-selected',
			'aria-setsize',
			'aria-sort',
			'aria-valuemax',
			'aria-valuemin',
			'aria-valuenow',
			'aria-valuetext',
		],
		n = [
			'a',
			'abbr',
			'area',
			'audio',
			'b',
			'bdi',
			'bdo',
			'br',
			'button',
			'canvas',
			'cite',
			'code',
			'data',
			'datalist',
			'del',
			'dfn',
			'emembed',
			'i',
			'iframe',
			'img',
			'input',
			'ins',
			'kbd',
			'label',
			'link',
			'map',
			'mark',
			'math',
			'meta',
			'meter',
			'noscript',
			'object',
			'output',
			'picture',
			'progress',
			'q',
			'ruby',
			's',
			'samp',
			'script',
			'select',
			'slot',
			'small',
			'span',
			'strong',
			'sub',
			'sup',
			'svg',
			'template',
			'text',
			'area',
			'time',
			'u',
			'var',
			'video',
			'wbr',
		],
		d = [
			'a',
			'audio',
			'button',
			'details',
			'embed',
			'iframe',
			'img',
			'input',
			'label',
			'object',
			'select',
			'textarea',
			'video',
		],
		o = [],
		s = !1;
	function u(e, a) {
		var r;
		switch (a) {
			case 'a':
				return e.hasAttribute('href') ? 'ahref' : 'anohref';
			case 'area':
				if (!e.hasAttribute('href')) return 'areanohref';
				break;
			case 'img':
				if (!e.hasAttribute('alt'))
					return e.hasAttribute('title') ||
						e.hasAttribute('aria-label') ||
						e.hasAttribute('aria-labelledby')
						? a
						: 'img-noalt';
				if (!e.getAttribute('alt')) return 'img-emptyalt';
				break;
			case 'figure':
				if (0 === e.getElementsByTagName('figcaption').length)
					return 'figure-nofigcap';
				break;
			case 'input':
				return (
					((r = e.getAttribute('type')) && 'password' !== r) ||
						(r = 'password'),
					a + '-' + r.toLowerCase()
				);
			case 'select':
				if (e.hasAttribute('multiple') || e.hasAttribute('size'))
					return 'select-nomenu';
		}
		return a;
	}
	function p() {
		var e,
			a,
			r,
			t,
			i = document.createElement('ul');
		for (t in o)
			((e = document.createElement('li')),
				(a = document.createElement('code')),
				(r = o[t][1]) &&
					(1 === r
						? e.appendChild(
								document.createTextNode('1 instance of ')
							)
						: e.appendChild(
								document.createTextNode(r + ' instances of ')
							),
					a.appendChild(document.createTextNode(o[t][0])),
					e.appendChild(a),
					i.appendChild(e)));
		return i;
	}
	function c(e) {
		var a;
		for (a in o) if (o[a][0] === e) return a;
		return -1;
	}
	function b(a, r, t, i, l, n, d) {
		var o = e.document.getElementById(d + 'Container'),
			u = document.createElement('p'),
			p = document.createElement('code'),
			c = document.createElement('code'),
			b = document.createElement('pre'),
			m = document.createElement('code');
		(0 === o.childNodes.length &&
			(function (e, a) {
				var r = document.createElement('h3'),
					t = document.createElement('a');
				switch (
					(t.setAttribute('href', '#__ARIA_validator_summary__'),
					(t.onclick = function (t) {
						(t.preventDefault(),
							(window.__waiAriaResultsWindow.location.hash =
								'#__ARIA_validator_summary__'));
					}),
					t.appendChild(document.createTextNode('Back to the top')),
					r.setAttribute('id', a + 'Head'),
					a)
				) {
					case 'invalid':
						r.appendChild(document.createTextNode('Invalid roles'));
						break;
					case 'unnecessary':
						r.appendChild(
							document.createTextNode('Unnecessary roles')
						);
						break;
					case 'unknown':
						r.appendChild(
							document.createTextNode('Unknown elements')
						);
						break;
					case 'nonexistent':
						r.appendChild(
							document.createTextNode('Non-existent roles')
						);
						break;
					case 'missingparent':
						r.appendChild(
							document.createTextNode('Missing parent roles')
						);
						break;
					case 'missingchild':
						r.appendChild(
							document.createTextNode('Missing child roles')
						);
						break;
					case 'missingstate':
						r.appendChild(
							document.createTextNode('Missing required state')
						);
						break;
					case 'invalidproperty':
						r.appendChild(
							document.createTextNode('Invalid properties')
						);
						break;
					case 'invaliddesc':
						r.appendChild(
							document.createTextNode('Invalid descendants')
						);
						break;
					case 'invalidref':
						r.appendChild(
							document.createTextNode('Invalid references')
						);
						break;
					case 'deprecated':
						r.appendChild(
							document.createTextNode('Deprecated roles')
						);
						break;
					case 'deprecatedattribute':
						r.appendChild(
							document.createTextNode('Deprecated attributes')
						);
				}
				(e.appendChild(r), e.appendChild(t));
			})(o, d),
			p.appendChild(document.createTextNode(r)),
			c.appendChild(document.createTextNode(i)),
			'' === a
				? (u.appendChild(c),
					u.appendChild(
						document.createTextNode(' is unnecessary on native ')
					),
					u.appendChild(p),
					u.appendChild(document.createTextNode(' elements')))
				: (u.appendChild(document.createTextNode(a)),
					u.appendChild(p),
					u.appendChild(document.createTextNode(t)),
					u.appendChild(c),
					u.appendChild(document.createTextNode(n)),
					u.appendChild(
						document.createTextNode(
							' There may be additional issues with this element.'
						)
					)),
			o.appendChild(u),
			l &&
				(m.appendChild(document.createTextNode(l.outerHTML)),
				b.appendChild(m),
				o.appendChild(b)),
			(s = !0));
	}
	function m(e, a) {
		switch (e) {
			case 'a':
				if (a.hasAttribute('href')) break;
				return !0;
			case 'audio':
			case 'video':
				if (a.hasAttribute('controls')) break;
				return !0;
			case 'img':
			case 'object':
				if (a.hasAttribute('usemap')) break;
				return !0;
			case 'input':
				if ('hidden' !== a.getAttribute('type')) break;
				return !0;
		}
		return !1;
	}
	function h(e, r) {
		var t,
			i,
			l,
			o = a[r].descendantRestrictions,
			s = e.tagName.toLowerCase(),
			u = e.getAttribute('role'),
			p = e;
		if (('' !== u && (s = s + ' role=' + u), o))
			switch (o[0]) {
				case 'phrasing':
					for (l = 0; l < e.childNodes.length; l++)
						if (
							1 === e.childNodes[l].nodeType &&
							((t = e.childNodes[l].tagName.toLowerCase()),
							-1 === n.indexOf(t))
						)
							return (
								b(
									'Invalid descendant: ',
									s,
									' with role ' + u + ' has child ',
									t,
									e,
									'.',
									'invaliddesc'
								),
								!1
							);
					break;
				case 'interactive':
					for (l = 0; l < e.childNodes.length; l++)
						if (1 === e.childNodes[l].nodeType)
							if (
								((t = e.childNodes[l].tagName.toLowerCase()),
								(i = e.childNodes[l].getAttribute('role')),
								-1 !== d.indexOf(t))
							) {
								if (!m(t, e.childNodes[l]))
									return (
										b(
											'Invalid descendant: ',
											s,
											' has child ',
											t,
											e,
											'.',
											'invaliddesc'
										),
										!1
									);
							} else if ('' !== i && -1 !== d.indexOf(i))
								return (
									b(
										'Invalid descendant: ',
										s,
										' has child ',
										(t = t + ' role=' + i),
										e,
										'.',
										'invaliddesc'
									),
									!1
								);
					do {
						if (
							1 === (p = p.parentNode).nodeType &&
							((t = p.tagName.toLowerCase()),
							-1 !== d.indexOf(t) && 'label' !== t && !m(t, p))
						)
							return (
								!(
									'summary' !== e.nodeName.toLowerCase() ||
									!N(e)
								) ||
								(b(
									'Invalid descendant: ',
									s,
									' has parent ',
									t,
									p,
									'.',
									'invaliddesc'
								),
								!1)
							);
					} while ('body' !== p.tagName.toLowerCase());
					break;
				default:
					for (l = 0; l < e.childNodes.length; l++)
						if (1 === e.childNodes[l].nodeType) {
							if (
								((t = e.childNodes[l].tagName.toLowerCase()),
								(i = e.childNodes[l].getAttribute('role')),
								-1 !== o.indexOf(t))
							)
								return (
									b(
										'Invalid descendant: ',
										s,
										' has child ',
										t,
										e,
										'.',
										'invaliddesc'
									),
									!1
								);
							if (-1 !== o.indexOf(i))
								return (
									b(
										'Invalid descendant: ',
										s,
										' has child ',
										i,
										e,
										'.',
										'invaliddesc'
									),
									!1
								);
						}
			}
		return !0;
	}
	function g(e, r) {
		var t,
			i = e,
			l = a[r].requiredParent,
			n = a[r].requiredParentNative;
		if (l) {
			for (; 'body' !== e.tagName.toLowerCase(); )
				if (
					((t = (e = e.parentNode).getAttribute('role')),
					-1 !== l.indexOf(t) ||
						(n && -1 !== n.indexOf(e.tagName.toLowerCase())))
				)
					return !0;
			return (
				!(
					!i.getAttribute('id') ||
					!(function (e, a) {
						var r,
							t = document.querySelectorAll("[role='tablist']"),
							i = e.getAttribute('id');
						for (r = 0; r < t.length; r++)
							if (
								t[r].hasAttribute('aria-owns') &&
								-1 !==
									t[r]
										.getAttribute('aria-owns')
										.split(' ')
										.indexOf(i)
							)
								return !0;
						return !1;
					})(i)
				) ||
				(b(
					'Role ',
					r,
					' missing required parent role ',
					'',
					i,
					' (' + l + ').',
					'missingparent'
				),
				!1)
			);
		}
		return !0;
	}
	function v(e, a) {
		for (var r; 'body' !== e.tagName.toLowerCase(); ) {
			if ((r = (e = e.parentNode).getAttribute('role'))) {
				if (-1 !== a.indexOf(r)) return !0;
				break;
			}
			if (-1 !== a.indexOf(e.tagName.toLowerCase())) return !0;
		}
		return !1;
	}
	function f(e, r) {
		var t,
			i,
			l,
			n = a[r].requiredChild,
			d = a[r].requiredChildNative,
			o = e.getElementsByTagName('*'),
			s = [];
		if (n) {
			for (l = 0; l < o.length; l++)
				if (
					(!(i = o[l].getAttribute('role')) &&
						'input' === (i = o[l].tagName.toLowerCase()) &&
						o[l].hasAttribute('type') &&
						(i = o[l].getAttribute('type').toLowerCase()),
					-1 !== n.indexOf(i) ||
						(d && -1 !== d.indexOf(o[l].tagName.toLowerCase())))
				)
					return !0;
			if ((s = e.getAttribute('aria-owns')))
				for (l = 0, s = s.split(' '); l < s.length; l++)
					if (
						(t = document.getElementById(s[l])) &&
						-1 !== n.indexOf(t.getAttribute('role'))
					)
						return !0;
			return (
				b(
					'Role ',
					r,
					' missing required child role ',
					'',
					e,
					' (' + n + ').',
					'missingchild'
				),
				!1
			);
		}
		return !0;
	}
	function R(e, a) {
		for (var r = e; (r = e.parentNode); )
			if (r.getAttribute('role') === a) return r;
		return !1;
	}
	function y(e) {
		var a,
			r = e.getElementsByTagName('*');
		for (a = 0; a < r.length; a++)
			if (r[a].getAttribute('aria-selected')) return !0;
		return !1;
	}
	function q(e, r) {
		var t,
			i,
			l,
			n,
			d = a[r].requiredState;
		if ('separator' === r && !((n = e.getAttribute('tabindex')) && n >= 0))
			return !0;
		if ('input' === e.tagName.toLowerCase() && e.hasAttribute('type')) {
			if (
				((i = e.getAttribute('type').toLowerCase()),
				(('menuitemcheckbox' === r || 'switch' === r) &&
					'checkbox' === i) ||
					('menuitemradio' === r && 'radio' === i))
			)
				return !0;
			if (
				'button' === r &&
				'checkbox' === i &&
				!e.hasAttribute('aria-pressed')
			)
				return (
					b(
						'Role ',
						r,
						' missing required state ',
						'',
						e,
						' (aria-pressed).',
						'missingstate'
					),
					!1
				);
		}
		if (d)
			for (n = 0; n < d.length; n++)
				if (!e.hasAttribute(d[n])) {
					if (
						((l = !1),
						'option' === r &&
							e.hasAttribute('aria-checked') &&
							(t = R(e, 'listbox')))
					) {
						if (y(t))
							return (
								b(
									'A listbox has',
									'',
									' option elements with mixed aria-checked and aria-selected states',
									'',
									e,
									'.',
									'missingstate'
								),
								!1
							);
						l = !0;
					}
					if (!l)
						return (
							b(
								'Role ',
								r,
								' missing required state ',
								'',
								e,
								' (' + d[n] + ').',
								'missingstate'
							),
							!1
						);
				}
		return !0;
	}
	function w(e) {
		var a,
			r = e.parentNode,
			t = ['article', 'aside', 'nav', 'section'];
		do {
			if ('body' === (a = r.tagName.toLowerCase())) return !0;
			if (t.indexOf(a) >= 0) break;
		} while ((r = r.parentNode));
		return !1;
	}
	function A(e) {
		return (
			!!(
				['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(
					e.tagName.toLowerCase()
				) >= 0
			) || 'heading' === e.getAttribute('role')
		);
	}
	function N(e) {
		for (; e.previousElementSibling; ) {
			if ('summary' === e.previousElementSibling.tagName.toLowerCase())
				return !0;
			e = e.previousElementSibling;
		}
		return !1;
	}
	function x(e, n, d) {
		var o,
			s,
			p,
			c,
			m,
			h,
			g,
			v,
			f,
			R,
			y = [
				'aria-atomic',
				'aria-busy',
				'aria-controls',
				'aria-current',
				'aria-describedby',
				'aria-details',
				'aria-disabled',
				'aria-dropeffect',
				'aria-errormessage',
				'aria-flowto',
				'aria-grabbed',
				'aria-haspopup',
				'aria-hidden',
				'aria-invalid',
				'aria-keyshortcuts',
				'aria-label',
				'aria-labelledby',
				'aria-live',
				'aria-owns',
				'aria-relevant',
				'aria-roledescription',
			],
			q = [
				'base',
				'body',
				'col',
				'colgroup',
				'head',
				'html',
				'link',
				'map',
				'meta',
				'noscript',
				'param',
				'script',
				'slot',
				'source',
				'style',
				'template',
				'title',
				'track',
			],
			x = [
				'aria-atomic',
				'aria-autocomplete',
				'aria-busy',
				'aria-checked',
				'aria-current',
				'aria-disabled',
				'aria-dropeffect',
				'aria-expanded',
				'aria-grabbed',
				'aria-haspopup',
				'aria-hidden',
				'aria-invalid',
				'aria-live',
				'aria-modal',
				'aria-multiline',
				'aria-multiselectable',
				'aria-orientation',
				'aria-pressed',
				'aria-readonly',
				'aria-relevant',
				'aria-required',
				'aria-selected',
				'aria-sort',
			],
			C = [
				'aria-keyshortcuts',
				'aria-label',
				'aria-roledescription',
				'aria-placeholder',
				'aria-valuetext',
			],
			k = [
				'aria-disabled',
				'aria-dropeffect',
				'aria-errormessage',
				'aria-grabbed',
				'aria-haspopup',
				'aria-invalid',
			],
			P = ['spelling', 'grammar', 'false'],
			S = [],
			E = [],
			T = e.attributes,
			_ = e.tagName.toLowerCase(),
			I = !1,
			L = !1;
		if (
			'input' === _ &&
			(e.hasAttribute('type') &&
				(m = e.getAttribute('type').toLowerCase()),
			e.hasAttribute('list') && e.hasAttribute('aria-haspopup'))
		) {
			if (!m)
				return (
					b(
						'Warning: ',
						_,
						' with a missing type attribute has aria-haspopup along with a native list attribute',
						'',
						e,
						'.',
						'invalidproperty'
					),
					!1
				);
			if (
				-1 ===
					[
						'button',
						'checkbox',
						'color',
						'date',
						'datetime-local',
						'email',
						'file',
						'hidden',
						'image',
						'month',
						'number',
						'password',
						'radio',
						'range',
						'reset',
						'search',
						'submit',
						'tel',
						'text',
						'time',
						'url',
						'week',
					].indexOf(m) ||
				['email', 'search', 'tel', 'text', 'url'].indexOf(m) >= 0
			)
				return (
					b(
						'Warning: ',
						_ + ' type=' + m,
						' has aria-haspopup along with a native list attribute',
						'',
						e,
						'.',
						'invalidproperty'
					),
					!1
				);
		}
		if (!n) {
			if ('input' === _ && e.hasAttribute('aria-checked')) {
				if ('checkbox' === m)
					return (
						'mixed' === e.getAttribute('aria-checked')
							? b(
									'Error: ',
									_,
									" aria-checked=mixed is used on a native checkbox. Use the element's indeterminate IDL attribute instead",
									'',
									e,
									'.',
									'invalidproperty'
								)
							: b(
									'Error: ',
									_,
									" aria-checked is used on a native checkbox. Use the element's native checked semantics instead",
									'',
									e,
									'.',
									'invalidproperty'
								),
						!1
					);
				if ('radio' === m)
					return (
						b(
							'Error: ',
							_,
							" aria-checked is used on a native radio button. Use the element's native checked semantics instead",
							'',
							e,
							'.',
							'invalidproperty'
						),
						!1
					);
			}
			r[(c = u(e, _))] && (n = r[c].nativeRole);
		}
		for (
			n && ((S = a[n].supported), (E = a[n].requiredState)), R = 0;
			R < T.length;
			R++
		)
			if (((v = !1), 'aria-' === (s = T[R].nodeName).substring(0, 5))) {
				if (
					'summary' === e.nodeName.toLowerCase() &&
					(N(e) ||
						'details' !== e.parentNode.tagName.toLowerCase() ||
						'aria-disabled' === s ||
						'aria-haspopup' === s)
				)
					return !0;
				if ('aria-label' === s || 'aria-labelledby' === s)
					if ('header' === c || 'footer' === c) {
						if (!w(e))
							return (
								b(
									'Element ',
									_,
									' is prohibited from being named by authors unless scoped to body ',
									'',
									e,
									'(' + s + ').',
									'invalidproperty'
								),
								!1
							);
					} else {
						if ('anohref' === c || 'areanohref' === c)
							return (
								b(
									'Element ',
									_,
									' without an href is prohibited from being named by authors ',
									'',
									e,
									'(' + s + ').',
									'invalidproperty'
								),
								!1
							);
						if (((p = c || e.tagName.toLowerCase()), a[n])) {
							if ('no' === a[n].nameable)
								return (
									b(
										'Element ',
										_,
										' is prohibited from being named by authors ',
										'',
										e,
										'(' + s + ').',
										'invalidproperty'
									),
									!1
								);
						} else {
							if (!r[p])
								return (
									b(
										'Custom element ',
										_,
										' is prohibited from being named by authors ',
										'',
										e,
										'(' + s + ').',
										'invalidproperty'
									),
									!1
								);
							if ('no' === r[p].nameable)
								return (
									b(
										'Element ',
										_,
										' is prohibited from being named by authors ',
										'',
										e,
										'(' + s + ').',
										'invalidproperty'
									),
									!1
								);
						}
					}
				if (
					0 > C.indexOf(s) &&
					'' === T[R].value &&
					'false' !== e.getAttribute('aria-expanded')
				)
					return (
						b(
							'Element ',
							_,
							' has an aria-* attribute without a value ',
							'',
							e,
							'(' + s + ').',
							'invalidproperty'
						),
						!1
					);
				if (
					((I = y.indexOf(s)),
					'input' === _ &&
						e.hasAttribute('type') &&
						('file' === e.getAttribute('type').toLowerCase()
							? ('aria-disabled' === s || 'aria-invalid' === s) &&
								(v = !0)
							: 'color' ===
									e.getAttribute('type').toLowerCase() &&
								'aria-disabled' === s &&
								(v = !0)),
					n && I && a[n].deprecatedAttributes
						? a[n].deprecatedAttributes.indexOf(s) >= 0 &&
							((o = e.getAttribute(s)),
							'aria-invalid' === s && o && P.indexOf(o) >= 0
								? b(
										'Warning ',
										_,
										' has a deprecated attribute for ',
										n,
										e,
										' (' +
											s +
											'). Although deprecated, the "' +
											o +
											'" value may be used until a replacement attribute is created to convey this information.',
										'deprecatedattribute'
									)
								: b(
										'Warning ',
										_,
										' has a deprecated attribute for ',
										n,
										e,
										' (' + s + ').',
										'deprecatedattribute'
									),
							d.deprecatedattribute++)
						: !v &&
							I &&
							k.indexOf(s) >= 0 &&
							((o = e.getAttribute(s)),
							'aria-invalid' === s && o && P.indexOf(o) >= 0
								? b(
										'Warning ',
										_,
										' has a deprecated attribute ',
										'',
										e,
										'(' +
											s +
											'). Although deprecated, the "' +
											o +
											'" value may be used until a replacement attribute is created to convey this information.',
										'deprecatedattribute'
									)
								: b(
										'Warning ',
										_,
										'aria-grabbed' === s ||
											'aria-dropeffect' === s
											? ' has a deprecated attribute '
											: ' has a deprecated attribute in this context ',
										'',
										e,
										'(' + s + ').',
										'deprecatedattribute'
									),
							d.deprecatedattribute++),
					'datalist' === _ &&
						(I ||
							[
								'aria-activedescendant',
								'aria-expanded',
								'aria-multiselectable',
								'aria-required',
								'aria-orientation',
							].indexOf(s)))
				)
					return (
						b(
							'Warning ',
							_,
							' has an attribute that serves no benefit ',
							'',
							e,
							'(' + s + ').',
							'invalidproperty'
						),
						!1
					);
				if (
					('input' === _ &&
						e.hasAttribute('type') &&
						('hidden' === m ||
							(('number' === m || 'range' === m) &&
								e.hasAttribute('aria-valuemin')) ||
							(('number' === m || 'range' === m) &&
								e.hasAttribute('aria-valuemax')))) ||
					(('br' === _ || 'wbr' === _) && 'aria-hidden' !== s)
				)
					return (
						b(
							'Element ',
							_,
							' has invalid attribute ',
							'',
							e,
							'(' + s + ').',
							'invalidproperty'
						),
						!1
					);
				if (
					('progress' === _ &&
						(e.hasAttribute('aria-valuemax') &&
							b(
								'Element ',
								_,
								' has invalid attribute ',
								'',
								e,
								'(aria-valuemax).',
								'invalidproperty'
							),
						e.hasAttribute('aria-valuemin') &&
							b(
								'Element ',
								_,
								' has invalid attribute ',
								'',
								e,
								'(aria-valuemin).',
								'invalidproperty'
							)),
					'aria-hidden' === s &&
						(q.indexOf(_) >= 0 || e.hasAttribute('hidden')))
				)
					return (
						null !== e.getAttribute('hidden')
							? 'until-found' ===
								e.getAttribute('hidden').toLowerCase()
								? b(
										'Element ',
										_,
										' aria-hidden must not be used with hidden=until-found ',
										'',
										e,
										'(' + s + ').',
										'invalidproperty'
									)
								: b(
										'Element ',
										_,
										' aria-hidden should not be used with hidden ',
										'',
										e,
										'(' + s + ').',
										'invalidproperty'
									)
							: b(
									'Element ',
									_,
									' has invalid attribute ',
									'',
									e,
									'(' + s + ').',
									'invalidproperty'
								),
						!1
					);
				if ('aria-required' === s && e.hasAttribute('required'))
					return (
						b(
							'Element ',
							_,
							' has invalid attribute ',
							'',
							e,
							'(' + s + ').',
							'invalidproperty'
						),
						!1
					);
				if (
					e.hasAttribute('contenteditable') &&
					e.getAttribute('aria-readonly')
				)
					return (
						b(
							'Element ',
							_,
							' has a contenteditable attribute along with aria-readonly',
							'',
							e,
							'.',
							'invalidproperty'
						),
						!1
					);
				if (!n && -1 === I && ('aria-required' !== s || 'input' !== _))
					return (
						b(
							'Element ',
							_,
							' has invalid attribute ',
							'',
							e,
							'(' + s + ').',
							'invalidproperty'
						),
						!1
					);
				if ('option' === _ && e.hasAttribute('aria-selected'))
					return (
						b(
							'Warning: ',
							_,
							' should not use the aria-selected attribute ',
							'',
							e,
							'.',
							'invalidproperty'
						),
						!1
					);
				if (
					'a' === _ &&
					e.hasAttribute('aria-disabled') &&
					e.hasAttribute('href')
				)
					return (
						b(
							'Warning: ',
							_,
							' with an href attribute should not use the aria-disabled attribute ',
							'',
							e,
							'.',
							'invalidproperty'
						),
						!1
					);
				if (
					e.hasAttribute('placeholder') &&
					e.hasAttribute('aria-placeholder')
				)
					return (
						b(
							'Element ',
							_,
							' has a native placeholder attribute along with ',
							'',
							e,
							s + '.',
							'invalidproperty'
						),
						!1
					);
				if (
					e.hasAttribute('readonly') &&
					e.getAttribute('aria-readonly')
				)
					return 'false' === e.getAttribute('aria-readonly')
						? (b(
								'Element ',
								_,
								' has invalid attribute ',
								'',
								e,
								'(' + s + ').',
								'invalidproperty'
							),
							!1)
						: (b(
								'Warning: Element ',
								_,
								' has a native readonly attribute along with ',
								'',
								e,
								s + '.',
								'invalidproperty'
							),
							!1);
				if (
					e.hasAttribute('disabled') &&
					e.getAttribute('aria-disabled')
				)
					return 'false' === e.getAttribute('aria-disabled')
						? (b(
								'Element ',
								_,
								' has invalid attribute ',
								'',
								e,
								'(' + s + ').',
								'invalidproperty'
							),
							!1)
						: (b(
								'Warning: Element ',
								_,
								' has a native disabled attribute along with ',
								'',
								e,
								s + '.',
								'invalidproperty'
							),
							!1);
				if (e.hasAttribute('colspan') && e.hasAttribute('aria-colspan'))
					return e.getAttribute('colspan') !==
						e.getAttribute('aria-colspan')
						? (b(
								'Element ',
								_,
								' has colspan and aria-colspan attribute values that do not match ',
								'',
								e,
								'.',
								'invalidproperty'
							),
							!1)
						: (b(
								'Warning: Element ',
								_,
								' has a native colspan attribute along with ',
								'',
								e,
								s + '.',
								'invalidproperty'
							),
							!1);
				if (e.hasAttribute('rowspan') && e.hasAttribute('aria-rowspan'))
					return e.getAttribute('rowspan') !==
						e.getAttribute('aria-rowspan')
						? (b(
								'Element ',
								_,
								' has rowspan and aria-rowspan attribute values that do not match ',
								'',
								e,
								'.',
								'invalidproperty'
							),
							!1)
						: (b(
								'Warning: Element ',
								_,
								' has a native rowspan attribute along with ',
								'',
								e,
								s + '.',
								'invalidproperty'
							),
							!1);
				if (
					('aria-required' === s && 'slider' === n) ||
					(-1 === I &&
						(S && S.indexOf(s) >= 0 && (L = !0),
						E && E.indexOf(s) >= 0 && (L = !0),
						!L && ('aria-required' !== s || 'input' !== _)))
				)
					return (
						b(
							'Role ',
							n,
							' has invalid attribute ',
							'',
							e,
							'(' + s + ').',
							'invalidproperty'
						),
						!1
					);
				if (
					t[s] &&
					-1 === t[s].tokenlist.indexOf(T[R].value.toLowerCase()) &&
					((g = !1),
					'aria-relevant' === s &&
						T[R].value.indexOf(' ') >= 0 &&
						('additionstext' ===
							(h = T[R].value.replace(/\s/g, '')) ||
							'textadditions' === h) &&
						(g = !0),
					!g)
				)
					return (
						b(
							'Invalid attribute value for ',
							s,
							'. The value must be one of ' +
								t[s].tokenlist.toString().replaceAll(',', ', '),
							'',
							e,
							'.',
							'invalidproperty'
						),
						!1
					);
				if (
					e.getAttribute(s) !== e.getAttribute(s).toLowerCase() &&
					x.indexOf(s) >= 0
				)
					return (
						b(
							'Warning: Attribute value for ',
							s,
							' not all browsers / assistive technology combinations expose attribute values that are not written in lowercase',
							'',
							e,
							'.',
							'invalidproperty'
						),
						!1
					);
				if (i[s]) {
					if (isNaN((f = parseInt(T[R].value))))
						return (
							b(
								'Invalid attribute value for ',
								s,
								'. The value must be an integer',
								'',
								e,
								'.',
								'invalidproperty'
							),
							!1
						);
					switch (i[s].type) {
						case 1:
							if (f < 0)
								return (
									b(
										'Invalid attribute value for ',
										s,
										'. The value must be 0 or higher',
										'',
										e,
										'.',
										'invalidproperty'
									),
									!1
								);
							break;
						case 2:
							if (f < 1)
								return (
									b(
										'Invalid attribute value for ',
										s,
										'. The value must be 1 or higher',
										'',
										e,
										'.',
										'invalidproperty'
									),
									!1
								);
							break;
						case 3:
							if (f < -1 || 0 === f)
								return (
									b(
										'Invalid attribute value for ',
										s,
										'. The value must be 1 or higher, or -1',
										'',
										e,
										'.',
										'invalidproperty'
									),
									!1
								);
							break;
						case 4:
							if (A(e)) {
								if (f < 1 || f > 6)
									return (
										b(
											'Invalid attribute value for ',
											s,
											'. The value must be between 1 and 6 on a heading',
											'',
											e,
											'.',
											'invalidproperty'
										),
										!1
									);
							} else if (f < 1)
								return (
									b(
										'Invalid attribute value for ',
										s,
										'. The value must be 1 or higher',
										'',
										e,
										'.',
										'invalidproperty'
									),
									!1
								);
					}
				}
				if (-1 === l.indexOf(s))
					return (
						b(
							'Attribute ',
							s,
							' is not a valid attribute',
							'',
							e,
							'.',
							'invalidproperty'
						),
						!1
					);
			}
		return !0;
	}
	function C(e) {
		var a,
			r,
			t,
			i,
			l = [
				'aria-activedescendant',
				'aria-controls',
				'aria-describedby',
				'aria-details',
				'aria-errormessage',
				'aria-flowto',
				'aria-labelledby',
				'aria-owns',
			],
			n = e.attributes,
			d = [];
		e.tagName.toLowerCase();
		var o = !0;
		for (t = 0; t < n.length; t++)
			if (((a = n[t].nodeName), (r = n[t].value), l.indexOf(a) >= 0))
				if ('' === r)
					'false' !== e.getAttribute('aria-expanded') &&
						(b(
							'Attribute ',
							a,
							' has an empty string.',
							'',
							e,
							'',
							'invalidref'
						),
						(o = !1));
				else
					for (i in (d = r.split(' ')))
						if (!document.getElementById(d[i])) {
							(b(
								'Attribute ',
								a,
								' does not reference a corresponding element.',
								'',
								e,
								'',
								'invalidref'
							),
								(o = !1));
							break;
						}
		return o;
	}
	!(function () {
		var t,
			i,
			l,
			n,
			d,
			m,
			R,
			y,
			w,
			A,
			k,
			P,
			S,
			E = {
				valid: 0,
				invalid: 0,
				unnecessary: 0,
				unknown: 0,
				nonexistent: 0,
				missingparent: 0,
				missingchild: 0,
				missingstate: 0,
				invalidproperty: 0,
				invaliddesc: 0,
				invalidref: 0,
				dpub: 0,
				deprecated: 0,
				deprecatedattribute: 0,
			},
			T = document.getElementsByTagName('*'),
			_ = document.createElement('a'),
			I = [],
			L = ['ul', 'ol', 'menu'];
		for (
			(function (a) {
				var r,
					t = document.createElement('div'),
					i = document.createElement('div'),
					l = document.createElement('h1'),
					n = document.createElement('h2');
				document.createElement('button');
				var d = document.createElement('link'),
					o = document.createElement('title');
				for (r in ((e = window.open('')),
				(window.__waiAriaResultsWindow = e),
				d.setAttribute('rel', 'stylesheet'),
				d.setAttribute('type', 'text/css'),
				d.setAttribute(
					'href',
					'https://juicystudio.com/tpg/ARC/aria-usage.css'
				),
				o.appendChild(
					document.createTextNode('WAI-ARIA usage results')
				),
				e.document
					.getElementsByTagName('HTML')[0]
					.setAttribute('lang', 'en'),
				e.document.getElementsByTagName('HEAD')[0].appendChild(d),
				e.document.getElementsByTagName('HEAD')[0].appendChild(o),
				t.setAttribute('id', '__ARIA_validator_resultsWindow__'),
				l.setAttribute('id', '__ARIA_validator_dlgtitle__'),
				l.appendChild(
					document.createTextNode('WAI-ARIA usage results')
				),
				t.appendChild(l),
				i.setAttribute('id', '__ARIA_validator_summary__'),
				n.appendChild(document.createTextNode('Summary')),
				i.appendChild(n),
				t.appendChild(i),
				(n = document.createElement('h2')).appendChild(
					document.createTextNode('Details')
				),
				t.appendChild(n),
				a))
					'valid' !== r &&
						((i = document.createElement('div')).setAttribute(
							'id',
							r + 'Container'
						),
						t.appendChild(i));
				e.document.body.appendChild(t);
			})(E),
				S = 0;
			S < T.length;
			S++
		) {
			if (
				((l = !1),
				(n = !1),
				(d = !1),
				(m = !1),
				T[S].getAttribute('role') &&
					'__ARIA_validator_resultsWindow__' !==
						T[S].getAttribute('id'))
			) {
				if (
					('input' !== (y = T[S].tagName.toLowerCase()) ||
						T[S].getAttribute('type') ||
						T[S].setAttribute('type', 'text'),
					(k = u(T[S], y)),
					(w = T[S].getAttribute('role')) !== w.toLowerCase() &&
						((w = w.toLowerCase()), (m = !0)),
					(P = c(w)),
					r[k] ||
						(E.unknown++,
						b(
							'Unknown element ',
							y,
							' has role ',
							w,
							T[S],
							'.',
							'unknown'
						),
						(k = 'div')),
					(I = r[k].allowedRoles),
					a.hasOwnProperty(w)
						? -1 !== I.indexOf(w) &&
							(E.valid++,
							-1 === P ? o.push([w, 1]) : o[P][1]++,
							m &&
								b(
									'Warning: ',
									y,
									' not all browsers / assistive technology combinations expose roles that are not written in lowercase',
									'',
									T[S],
									'.',
									'invalidproperty'
								),
							(l = !0))
						: (E.nonexistent++,
							b(
								'Element ',
								y,
								' has non-existent role ',
								w,
								T[S],
								'.',
								'nonexistent'
							),
							(d = !0)),
					(n = w === r[k].nativeRole),
					'rowheader' === w && 'th' === y && (n = !0),
					'all' === I && !d)
				) {
					switch (y) {
						case 'td':
						case 'th':
						case 'tr':
							v(T[S], ['table', 'grid', 'treegrid']) || (l = !0);
							break;
						case 'div':
							'dl' === T[S].parentNode.tagName.toLowerCase()
								? ('presentation' === w || 'none' === w) &&
									(l = !0)
								: (l = !0);
							break;
						default:
							l = !0;
					}
					l || n
						? (E.valid++,
							-1 === P ? o.push([w, 1]) : o[P][1]++,
							m &&
								b(
									'Warning: ',
									y,
									' not all browsers / assistive technology combinations expose roles that are not written in lowercase',
									'',
									T[S],
									'.',
									'invalidproperty'
								))
						: (E.invalid++,
							b(
								'Element ',
								y,
								' has invalid role ',
								w,
								T[S],
								'.',
								'invalid'
							),
							(d = !0));
				}
				(l ||
					d ||
					n ||
					((R = !1),
					'li' === y &&
						((A = T[S].parentNode.tagName.toLowerCase()),
						T[S].parentNode.getAttribute('role'),
						-1 === L.indexOf(A) && ((R = !0), (l = !0))),
					!R &&
						('summary' === y &&
							('details' !==
								T[S].parentNode.tagName.toLowerCase() &&
								(l = !0),
							N(T[S]) && (l = !0)),
						l
							? (E.valid++, -1 === P ? o.push([w, 1]) : o[P][1]++)
							: (E.invalid++,
								b(
									'Element ',
									y,
									' has invalid role ',
									w,
									T[S],
									'.',
									'invalid'
								)))),
					n &&
						((l = !0),
						('link' !== w || T[S].getAttribute('href')) &&
							((('textbox' === w || 'searchbox' === w) &&
								'INPUT' === T[S].tagName &&
								T[S].getAttribute('list')) ||
								(E.unnecessary++,
								b('', y, '', w, T[S], '.', 'unnecessary')))),
					l &&
						(!g(T[S], w) && E.missingparent++,
						!f(T[S], w) && E.missingchild++,
						!q(T[S], w) && E.missingstate++,
						!x(T[S], w, E) && E.invalidproperty++,
						m && E.invalidproperty++,
						!h(T[S], w) && E.invaliddesc++,
						'doc-' === w.substring(0, 4) && E.dpub++,
						a[w].deprecated &&
							(E.deprecated++,
							b(
								'Warning: ',
								y,
								' has deprecated role ',
								w,
								T[S],
								'.',
								'deprecated'
							))));
			} else !x(T[S], null, E) && E.invalidproperty++;
			!C(T[S]) && E.invalidref++;
		}
		((function (a) {
			var r,
				t,
				i,
				l,
				n,
				d,
				o = document.createElement('ul'),
				s = document.createElement('details'),
				u = e.document.getElementById('__ARIA_validator_summary__');
			for (i in a) {
				switch (
					((r = document.createElement('li')),
					(t = document.createElement('a')).setAttribute(
						'href',
						'#' + i + 'Head'
					),
					t.setAttribute('data-target', i + 'Head'),
					(t.onclick = function (t) {
						(t.preventDefault(),
							(window.__waiAriaResultsWindow.location.hash =
								'#' +
								t.currentTarget.getAttribute('data-target')));
					}),
					(l = !0),
					i)
				) {
					case 'valid':
						a[i] > 0
							? ((n =
									document.createElement(
										'summary'
									)).appendChild(
									document.createTextNode(
										a[i] + ' valid roles.'
									)
								),
								s.appendChild(n),
								s.appendChild(p()),
								u.appendChild(s),
								(l = !1))
							: (r.appendChild(
									document.createTextNode('0 valid roles.')
								),
								(l = !1));
						break;
					case 'unknown':
						d = a[i] + ' unknown elements.';
						break;
					case 'nonexistent':
						d = a[i] + ' non-existent roles.';
						break;
					case 'missingparent':
						d = a[i] + ' missing parent roles.';
						break;
					case 'missingchild':
						d = a[i] + ' missing child roles.';
						break;
					case 'missingstate':
						d = a[i] + ' roles without required states.';
						break;
					case 'invalidproperty':
						d =
							a[i] +
							' elements with invalid WAI-ARIA attributes.';
						break;
					case 'invaliddesc':
						d = a[i] + ' elements with invalid descendants.';
						break;
					case 'invalidref':
						d =
							a[i] +
							' attribute values without corresponding targets.';
						break;
					case 'deprecatedattribute':
						d = a[i] + ' deprecated attributes.';
						break;
					case 'dpub':
						(a[i] > 0 &&
							((d =
								a[i] +
								' valid DPub roles. Note: although valid, DPUB roles are likely not recognized on the web.'),
							r.appendChild(document.createTextNode(d)),
							o.appendChild(r)),
							(l = !1));
						break;
					default:
						d = a[i] + ' ' + i + ' roles.';
				}
				l &&
					(a[i] > 0
						? (t.appendChild(document.createTextNode(d)),
							r.appendChild(t))
						: r.appendChild(document.createTextNode(d)),
					o.appendChild(r));
			}
			u.appendChild(o);
		})(E),
			s
				? (_.setAttribute('href', '#__ARIA_validator_summary__'),
					(_.onclick = function (t) {
						(t.preventDefault(),
							(window.__waiAriaResultsWindow.location.hash =
								'#__ARIA_validator_summary__'));
					}),
					_.appendChild(document.createTextNode('Back to the top')),
					e.document.body.appendChild(_))
				: ((t = e.document.getElementById(
						'__ARIA_validator_resultsWindow__'
					)),
					(i = document.createElement('p')).appendChild(
						document.createTextNode('No details to display.')
					),
					t.appendChild(i)));
	})();
})(),
	console.log(
		'\nSource: https://thepaciellogroup.github.io/WAI-ARIA-Usage/WAI-ARIA_usage.html\nBookmarklet name: WAI-ARIA usage'
	));
