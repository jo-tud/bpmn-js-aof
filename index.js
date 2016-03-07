module.exports = {
    __init__: [ 'contextPadProvider','aofActionListener','aofPaletteProvider' ,'replaceMenuProvider','customRules','appManager'],
    contextPadProvider: [ 'type', require('./lib/aof-context-pad') ],
    aofActionListener: [ 'type', require('./lib/aof-action-listener')],
    aofPaletteProvider: [ 'type', require('./lib/aof-palette-provider') ],
    replaceMenuProvider: [ 'type', require('./lib/aof-popup-menu') ],
    customRules: [ 'type', require('./lib/aof-rules') ],
    appManager: [ 'type', require('./lib/app-manager') ]
};