'use strict';

var find = require('lodash/collection/find'),
    any = require('lodash/collection/any'),
    forEach = require('lodash/collection/forEach'),
    jquery = require('jquery'),
    inherits = require('inherits');


/**
 * BPMN specific modeling rule
 */
function AppManager(config) {

    this._apps=[];
    this.request_uri=config.request_uri;
    this.init();

}

AppManager.$inject = [ 'config.appManager' ];

module.exports = AppManager;

AppManager.prototype.init = function() {
    var apps=this._apps;

    var request = jquery.ajax(this.request_uri, {
        success: function (data, status, jqXHR) {
            data=JSON.parse(data);
            if (data.results) {
                for(var i=0;i<data.results.bindings.length;i++){
                    var pushdata={name: data.results.bindings[i].label.value, value: data.results.bindings[i].uri.value};
                     apps.push(pushdata);
                }
            }
        },
        method: "GET",
        async: true,
        dataType: 'json',
        timeout: 1000,
        data: '',
        error: function (jqXHR, status, error) {
            alert(status);
        }
    });

};

AppManager.prototype.list=function(){
    return this._apps;

}
