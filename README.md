# bpmn-js-aof

This is the modul to extend the [bpmn-js](https://github.com/bpmn-io/bpmn-js) for usage with the [AOF] (https://github.com/plt-tud/aof)

## Features

Some of the features are:

* Listener for creation of AOF-specific Elements (i.e UserTask) and add colors and Tooltips
* Custom ContextPad (override) for displaying buttons (Mark-as-AppEnsemble, Mark-as-App)
* Extention of the Palette with shortcuts for adding UserTask with Apps and Participant-App-Ensembles
* Custom replace menu (override) for restrict Task types for App-Ensembles and non-App-Ensembles
* Extention rules for drop-policy (addition to the custom replace menu)
* AppManager for providing an applist for the Propertiespanel
* Providing AOF-Moddle extention
* Automated inclusion of the [bpmn-js-properties-panel](https://github.com/korbinianHoerfurter/bpmn-js-properties-panel/) (fork for usage with the AOF)

## Usage

Provide two HTML elements, one for the properties panel and one for the BPMN diagram:

```html
<div class="modeler">
  <div id="canvas"></div>
  <div id="properties"></div>
</div>
```

Bootstrap [bpmn-js](https://github.com/bpmn-io/bpmn-js):

```javascript
var BpmnModeler = require('bpmn-js/lib/Modeler'),
    AofCustomizationModule=require('bpmn-js-aof'),
    aofModdleExtention = require('bpmn-js-aof/moddle');

var renderer = new BpmnModeler({
        container: $('#canvas'),
        additionalModules: [AofCustomizationModule],
        moddleExtensions: aofModdleExtention,
        propertiesPanel: {
            parent: '#properties'
        },
        appManager:{
            request_uri: "/api/appuris",
            info_uri_pattern: "/apps/#URI#/details.html"
        }
    });
```

## License

MIT