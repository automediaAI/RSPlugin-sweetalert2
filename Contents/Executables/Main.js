/*
 React Studio wrapper for the 'sweetalert2-react-content' npm package.

 - 2020 / Nitin Khanna / @nitinthewiz / automedia.ai
 
 . v1.0
 . Logo courtesy https://www.pngrepo.com/svg/54322/donut
 */

// -- plugin info requested by host app --

this.describePlugin = function(id, lang) {
  switch (id) {
    case 'displayName':
      return "sweetalert2";

    case 'shortDisplayText':
      return "sweetalert2!";

    case 'defaultNameForNewInstance':
      return "sweetalert2";
  }
}


// -- private variables --

this._data = {
  declarative: `footer: 'Hello',
padding:'5px',
position: 'center-end',
showClass: {
    popup: 'swal2-show',
},
hideClass: {
  popup: 'swal2-hide',
},
backdrop:true,
timer: 5000,
showConfirmButton: false,
timerProgressBar: true,
  `,
  component_to_animate: "",
  custom_name_for_component: "withSwalInstance"
};


// -- persistence, i.e. saving and loading --

this.persist = function() {
  return this._data;
}

this.unpersist = function(data) {  
	this._data = data;
}


// -- inspector UI --

this.inspectorUIDefinition = [
  {
    "type": "label",
    "text": "Pick a component to use as HTML below.\nIf you don't use pick any component, sweetalert2\nwill use the text/html from the config you provide.",
    "height": 40,
  },
  {
    "type": "component-picker",
    "id": "component_to_animate",
    "actionBinding": "this.onUIChange"
  },
  {
    "type": "label",
    "text": "Paste the sweetalert2 config below here.",
    "height": 20,
    "paddingTop": 20
  },
  {
    "type": "textinput",
    "id": "declarative",
    "actionBinding": "this.onUIChange",
    "multiline": true,
    "height": 60
  },
  {
    "type": "label",
    "text": "Give a custom name for the component.\nUseful if you want to use multiple instances of sweetalert2.",
    "height": 40,
    "paddingTop": 20
  },
  {
    "type": "textinput",
    "id": "custom_name_for_component",
    "actionBinding": "this.onUIChange",
    "height": 20
  },
];

this._uiTextFields = [ 'declarative', 'custom_name_for_component' ];
this._uiCheckboxes = [];
this._uiNumberFields = [];
this._uiColorPickers = [];
this._uiComponentPickers = [ 'component_to_animate' ];

this._accessorForDataKey = function(key) {
  if (this._uiTextFields.includes(key)) return 'text';
  else if (this._uiCheckboxes.includes(key)) return 'checked';
  else if (this._uiNumberFields.includes(key)) return 'numberValue';
  else if (this._uiColorPickers.includes(key)) return 'rgbaArrayValue';
  else if (this._uiComponentPickers.includes(key)) return 'componentName';
  return null;
}

this.onCreateUI = function() {
  var ui = this.getUI();
  for (var controlId in this._data) {
    var prop = this._accessorForDataKey(controlId);
    if (prop) {
      try {
      	ui.getChildById(controlId)[prop] = this._data[controlId];
      } catch (e) {
        console.log("** can't set ui value for key "+controlId+", prop "+prop);
      }
    }
  }
}

this.onUIChange = function(controlId) {
  var ui = this.getUI();
  var prop = this._accessorForDataKey(controlId);
  if (prop) {
    this._data[controlId] = ui.getChildById(controlId)[prop];
  } else {
    console.log("** no data property found for controlId "+controlId);
  }
}


// -- plugin preview --

this.renderIcon = function(canvas) {
  var ctx = canvas.getContext('2d');
  var w = canvas.width;
  var h = canvas.height;
  ctx.save();
  if (this.icon == null) {
    // got the Particles logo online
    var path = Plugin.getPathForResource("logo.png");
    this.icon = Plugin.loadImage(path);
  }
  var iconW = this.icon.width;
  var iconH = this.icon.height;
  var aspectScale = Math.min(w/iconW, h/iconH);
  var scale = 0.9 * aspectScale; // add some margin around icon
  iconW *= scale;
  iconH *= scale;
  ctx.drawImage(this.icon, (w-iconW)*0.5, (h-iconH)*0.5, iconW, iconH);
  ctx.restore();
};

this.renderEditingCanvasPreview = function(canvas, controller) {
  this._renderPreview(canvas, controller);
}

this._renderPreview = function(canvas, controller) {
  var ctx = canvas.getContext('2d');
  var w = canvas.width;
  var h = canvas.height;
  ctx.save();

  if (this.icon == null) {
    var path = Plugin.getPathForResource("logo.png");
    this.icon = Plugin.loadImage(path);
  }
  var iconW = this.icon.width;
  var iconH = this.icon.height;
  var aspectScale = Math.min(w/iconW, h/iconH);
  var scale = 0.9 * aspectScale; // add some margin around icon
  iconW *= scale;
  iconH *= scale;
  ctx.drawImage(this.icon, (w-iconW)*0.5, (h-iconH)*0.5, iconW, iconH);
  ctx.restore();
  
}


// -- code generation, React web --

this.getReactWebPackages = function() {
  // Return dependencies that need to be included in the exported project's package.json file.
  // Each key is an npm package name that must be imported, and the value is the package version.
  // 
  // Example:
  //    return { "somepackage": "^1.2.3" }
  
  return {
    "sweetalert2": "^10.9.0",
    "sweetalert2-react-content": "^3.2.1"
  };
}

this.getReactWebImports = function(exporter) {
	var arr = [
    { varName: "Swal", path: "sweetalert2" },
    { varName: "withReactContent", path: "sweetalert2-react-content" }
  ];
	
	return arr;
}

this.writesCustomReactWebComponent = true;

this.getReactWebCustomJSXAttrs = function(exporter) {
  return "label='Hello'";
}

this.getReactWebComponentName = function() {
    var custom_name_for_component = this._data.custom_name_for_component;

    if (custom_name_for_component){
      return custom_name_for_component;
    } else{
      return "withSwalInstance";
    }
}

this.exportAsReactWebComponent = function(className, exporter) {
  var template = Plugin.readResourceFile("templates-web/component-template.js", 'utf8');

  var customComponent_to_animate = exporter.classNameForComponentByName(this._data.component_to_animate);
  var declarative = this._data.declarative;

  if (!declarative){
    console.log("There's no sweetalert2 declaration. This is bad.");
  }

  if (customComponent_to_animate) {
    var view = {
      "CLASSNAME": customComponent_to_animate,
      "DECLARATION": declarative
    }
  } else {
    var view = {
      "DECLARATION": declarative
    }
  }
  var code = this.Mustache.render(template);

  if (customComponent_to_animate) {
    template = Plugin.readResourceFile("templates-web/component-template-with-custom-component.js", 'utf8');
    code = this.Mustache.render(template, view);
  } else {
    code = this.Mustache.render(template, view);
  }
  exporter.writeSourceCode(className+".js", code);
}