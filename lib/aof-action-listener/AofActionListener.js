'use strict';

var  forEach = require('lodash/collection/forEach');

function UserTaskCreationListener(eventBus,canvas,elementRegistry,overlays) {


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

    eventBus.on('element.changed', function(event) {
        var shape = elementRegistry.get(event.element.id);
        if(event.element.businessObject.$type=="bpmn:UserTask") {
            if (!!event.element.businessObject['$attrs']['aof:realizedBy']) {
                var html=buildTooptip('This is a UserTask realized by an App')
            }
            else{
                var html=buildTooptip('This is a UserTask without an App. Please assign an App!')
            }
            overlays.add(event.element,'aofTooltip', {
                id:'overlay-'+shape.id,
                position: {
                    top: shape.height+15,
                    right: 20
                },
                html: html
            });
        }
        else if(event.element.businessObject.$type=="bpmn:Participant"){
            if(event.element.businessObject['isAppEnsemble']){
                overlays.add(event.element,'aofTooltip', {
                    id:'overlay-'+shape.id,
                    position: {
                        top: shape.height+15,
                        right: 20
                    },
                    html: buildTooptip('This is an Participant marked as AppEnsemble!')
                });
            }
        }

    });

    eventBus.on('element.out',removeOverlay);

    function removeOverlay (event) {
        var shape = elementRegistry.get(event.element.id);
        if(event.element.businessObject.$type=="bpmn:UserTask" || (event.element.businessObject.$type=="bpmn:Participant" && event.element.businessObject['isAppEnsemble'])) {
            overlays.remove({type:'aofTooltip'});//element:shape.id});
        }
    }


    function buildTooptip(text){
         return '<span class="tooltip" style="display: block; min-width: 150px;">'+text+'<span class="nub"></span></span>';
    }

    function markAsAppEnsemble(element){
        canvas.addMarker(element.id, 'color-appensemble');
    }
}



UserTaskCreationListener.$inject = [ 'eventBus','canvas','elementRegistry','overlays'];

module.exports = UserTaskCreationListener;
