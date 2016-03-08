module.exports = {
    __init__: [ 'contextPadProvider','aofActionListener','aofPaletteProvider' ,'replaceMenuProvider','aofRules','appManager','propertiesPanel'],
    contextPadProvider: [ 'type', require('./lib/aof-context-pad') ],
    aofActionListener: [ 'type', require('./lib/aof-action-listener')],
    aofPaletteProvider: [ 'type', require('./lib/aof-palette-provider') ],
    replaceMenuProvider: [ 'type', require('./lib/aof-popup-menu') ],
    aofRules: [ 'type', require('./lib/aof-rules') ],
    appManager: [ 'type', require('./lib/app-manager') ],
    propertiesPanel: [ 'type', require('bpmn-js-properties-panel/lib/PropertiesPanel') ],
    propertiesProvider: [ 'type', require('bpmn-js-properties-panel/lib/provider/aof/AofPropertiesProvider') ]
};