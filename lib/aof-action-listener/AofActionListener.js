'use strict';

var  forEach = require('lodash/collection/forEach');

function UserTaskCreationListener(eventBus,canvas,elementRegistry,appManager) {


// you may hook into any of the following events
    var events = [
        'element.changed'
    ];

    events.forEach(function (event) {

        eventBus.on(event, function (e) {
            // e.element = the model element
            // e.gfx = the graphical element
            if(e.element.businessObject.$type=="bpmn:UserTask"){
                if(!e.element.businessObject['$attrs']['aof:realizedBy']){
                    canvas.addMarker(e.element.id, 'no-app-assigned');
                    canvas.removeMarker(e.element.id, 'color-appensembleapp');
                }
                else{
                    canvas.removeMarker(e.element.id, 'no-app-assigned');
                    canvas.addMarker(e.element.id, 'color-appensembleapp');
                }
            }
            else if(e.element.businessObject.$type=="bpmn:Participant"){
                if(e.element.businessObject['isAppEnsemble']){
                    canvas.addMarker(e.element.id, 'color-appensemble');
                }
                else{
                    canvas.removeMarker(e.element.id, 'color-appensemble');
                }
            }
        });
    });

    eventBus.on('import.success',function(e){
        // Mark AppEnsembleApps grey
        forEach(elementRegistry.filter(
                function (element, gfx) {
                    return (element.type == "bpmn:UserTask" && element.businessObject.isAppEnsembleApp == true )//&& element.businessObject.$attrs['aof:realizedBy'] && element.businessObject.$attrs['aof:realizedBy'] != "")
                }),
            function (element) {
                canvas.addMarker(element.id, 'color-appensembleapp');
            }
        );

        // Mark AppEnsembles
        forEach(elementRegistry.filter(
                function (element, gfx) {
                    return (element.type == "bpmn:Participant" && (element.businessObject.isAppEnsemble && element.businessObject.isAppEnsemble == "true") || (element.businessObject.isAppEnsemble == true))
                }),
            function (element) {
                canvas.addMarker(element.id, 'color-appensemble');
            }
        );


    });

    function markAsAppEnsemble(element){
        canvas.addMarker(element.id, 'color-appensemble');
    }
}



UserTaskCreationListener.$inject = [ 'eventBus','canvas','elementRegistry','appManager'];

module.exports = UserTaskCreationListener;
