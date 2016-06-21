/**
 * Created by FGU on 21/03/2016.
 */

angular.module('ngDicomViewer',[])
    .controller('ButtonsController', ngDicomViewerController)
    /*  configure ngDicomViewer */
    .provider('ngDicomViewerConfig', ngDicomViewerConfig)
    /* load and display image services */
    .factory('ngDvService', ngDvService)
    /* image drop zone directive */
    .directive('dvDropImage', dvDropImage)
    /* draggable image directive */
    .directive('dvDragImage', dvDragImage)
    /* draggable series directive */
    .directive('dvDragStack', dvDragStack)
    /* display image Modality directive */
    .directive('dvImageModality', dvImageModality)
    /* display image Description directive */
    .directive('dvImageDescription', dvImageDescription)
    /* display image zoom value directive */
    .directive('dvImageZoom', dvImageZoom)
    /* display image window center window width value directive */
    .directive('dvImageWwwc', dvImageWwwc)
    /* display image index directive */
    .directive('dvImageIndex', dvImageIndex)
    /* clear button directive*/
    .directive('dvClearButton', dvClearButton)
    /* zoom button directive */
    .directive('dvZoomButton', dvZoomButton)
    /* pan button directive */
    .directive('dvPanButton', dvPanButton)
    /* wwwc button directive */
    .directive('dvWwwcButton', dvWwwcButton)
    /* highlight button directive */
    .directive('dvHighlightButton', dvHighlightButton)
    /* angle button directive */
    .directive('dvAngleButton', dvAngleButton)
    /* length button directive */
    .directive('dvLengthButton', dvLengthButton)
    /* probe button directive */
    .directive('dvProbeButton', dvProbeButton)
    /* circle button directive */
    .directive('dvCircleButton', dvCircleButton)
    /* rectangle button directive */
    .directive('dvRectangleButton', dvRectangleButton)
    /* change view button directive */
    .directive('dvViewButton', dvViewButton);

ngDicomViewerController.$inject=['$rootScope','$timeout','ngDicomViewerConfig','ngDvService'];
ngDvService.$inject=['ngDicomViewerConfig'];


function ngDicomViewerConfig(){
    this.set = function (config) {
        this.imageLoaderName = config.imageLoaderName||'myLoader://';
        this.cloneElementId = config.cloneElementId||'cloneImage';
    };
    this.$get = function () {
        return this;
    };
}

function dvDropImage() {
    var directive = {
        restrict: 'EA',
        template: '<div ng-drop="true"'+
        'ng-click="vm.selectElement($event)"'+
        'dv-stack="vm.currentStack"'+
        'dv-image-id="vm.currentImageId"'+
        'dv-element-id="vm.currentElementId"'+
        'ng-class="{\'active-image\':vm.dvElementId==vm.id}"'+
        'ng-drop-success="vm.displayImage()"></div>',
        controller: ngDicomViewerController,
        scope: {
            dvImageId: '=',
            dvElementId: '=',
            dvStack:'='
        },
        controllerAs: 'vm',
        bindToController: true,
        replace: true,
        link:dvDropImageLinkFunction
    };
    return directive;
}

function dvDragStack() {
    var directive = {
        restrict: 'EA',
        template: '<div ng-drag="true"'+
        'dv-stack="vm.currentStack"'+
        'dv-image-id="vm.currentImageId"'+
        'dv-element-id="vm.currentElementId"'+
        'ng-drag-data="vm.series"'+
        'ng-center-anchor="true"'+
        'ng-drag-start="vm.onDragStackStart()"></div>',
        require: '^ngModel',
        scope: {
            series: '=ngModel',
            dvImageId: '=',
            dvElementId: '=',
            dvStack:'='
        },
        controller: ngDicomViewerController,
        controllerAs: 'vm',
        bindToController: true,
        replace: true,
        link:dvDragImageLinkFunction
    };
    return directive;
}

function dvDragImage() {
    var directive = {
        restrict: 'EA',
        template: '<div ng-drag="true"'+
        'dv-image-id="vm.currentImageId"'+
        'dv-element-id="vm.currentElementId"'+
        'ng-drag-data="vm.object"'+
        'ng-center-anchor="true"'+
        'ng-drag-start="vm.onDragStart()"></div>',
        require: '^ngModel',
        scope: {
            object: '=ngModel',
            dvImageId: '=',
            dvElementId: '='
        },
        controller: ngDicomViewerController,
        controllerAs: 'vm',
        bindToController: true,
        replace: true,
        link:dvDragImageLinkFunction
    };
    return directive;
}

function dvImageModality(){
    var directive = {
        restrict: 'EA',
        replace: true,
        link:dvImageModalityLinkFunction
    };
    return directive;

    function dvImageModalityLinkFunction(scope, element, attributes){
        function updateModality(e,data) {
            var modality=data.image.modality;
            var text='';
            if(modality.length>0){
                text='Modality: '+modality;
            }
            element.text(text);
        }
        $('#' + attributes.resource).on("CornerstoneNewImage", updateModality);
    }
}

function dvImageDescription(){
    var directive = {
        restrict: 'EA',
        replace: true,
        link:dvImageDescriptionLinkFunction
    };
    return directive;

    function dvImageDescriptionLinkFunction(scope, element, attributes){
        function updateDescription(e,data) {
            var seriesDescription=data.image.seriesDescription;
            var studyDescription=data.image.studyDescription;
            var text='';
            if(seriesDescription.length>0){
                text='Series Description: '+seriesDescription;
            }
            else if(studyDescription.length>0){
                text='Study Description: '+studyDescription;
            }
            element.text(text);
        }
        $('#' + attributes.resource).on("CornerstoneNewImage", updateDescription);
    }
}

function dvImageZoom(){
    var directive = {
        restrict: 'EA',
        replace: true,
        link:dvImageZoomLinkFunction
    };
    return directive;

    function dvImageZoomLinkFunction(scope, element, attributes){
        function updateZoom(e) {
            var viewport = cornerstone.getViewport(e.target);
            var imageZoom = 'Zoom: ' + viewport.scale.toFixed(2);
            element.text(imageZoom);
        }
        $('#' + attributes.resource).on("CornerstoneImageRendered", updateZoom);
    }
}

function dvImageWwwc(){
    var directive = {
        restrict: 'EA',
        replace: true,
        link:dvImageWwwcLinkFunction
    };
    return directive;

    function dvImageWwwcLinkFunction(scope, element, attributes){
        function updateWwwc(e) {
            var viewport = cornerstone.getViewport(e.target);
            var imageWwwc = 'WW/WC: ' + Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter);
            element.text(imageWwwc);
        }
        $('#' + attributes.resource).on("CornerstoneImageRendered", updateWwwc);
    }
}

function dvImageIndex(){
    var directive = {
        restrict: 'EA',
        template: '<div dv-stack="vm.currentStack"'+
        'dv-image-id="vm.currentImageId"'+
        '</div>',
        controller: ngDicomViewerController,
        scope: {
            dvImageId: '=',
            dvStack:'='
        },
        controllerAs: 'vm',
        bindToController: true,
        replace: true,
        link:dvImageIndexLinkFunction
    };
    return directive;

    function dvImageIndexLinkFunction(scope, element, attributes,vm){
        var imageIndex ='';
        function updateIndex(e,data) {
            imageIndex = "Image " + (vm.dvStack.currentImageIdIndex + 1) + "/" + vm.dvStack.imageIds.length;
            element.text(imageIndex);
        }
        function stackLoaded(e,data) {
            imageIndex = "Image " + (data.currentImageIdIndex + 1) + "/" + data.imageIds.length;
            element.text(imageIndex);
        }
        function singleImageLoaded() {
            imageIndex = '';
            element.text(imageIndex);
        }
        var target=$('#' + attributes.resource);
        //target.on("CornerstoneStackScroll", updateIndex);
        target.on("CornerstoneNewImage", updateIndex);
        target.on("CornerstoneStackLoaded", stackLoaded);
        target.on("CornerstoneSingleImageLoaded", singleImageLoaded);
    }
}

function dvClearButton() {
    var directive = {
        restrict: 'EA',
        template: '<label class="btn btn-icon-only btn-default ng-dv-btn btn-clear"'+
        'dv-element-id="vm.currentElementId"' +
        'dv-app-states="vm.appStates"' +
        'ng-click="vm.clear()">' +
        '<input type="radio" class="toggle">'+
        '</label>',
        scope: {
            dvElementId: '=',
            dvAppStates:'='
        },
        controller: ngDicomViewerController,
        controllerAs: 'vm',
        bindToController: true,
        replace: true,
        link:dvButtonLinkFunction
    };
    return directive;
}

function dvZoomButton() {
    var directive = {
        restrict: 'EA',
        template: '<label class="btn btn-icon-only btn-default ng-dv-btn btn-zoom"'+
        'dv-element-id="vm.currentElementId"' +
        'ng-click="vm.zoom()">' +
        '<input type="radio" class="toggle">'+
        '</label>',
        scope: {
            dvElementId: '='
        },
        controller: ngDicomViewerController,
        controllerAs: 'vm',
        bindToController: true,
        replace: true,
        link:dvButtonLinkFunction
    };
    return directive;
}

function dvPanButton() {
    var directive = {
        restrict: 'EA',
        template: '<label class="btn btn-icon-only btn-default ng-dv-btn btn-pan"'+
        'dv-element-id="vm.currentElementId"' +
        'ng-click="vm.pan()">' +
        '<input type="radio" class="toggle">'+
        '</label>',
        scope: {
            dvElementId: '='
        },
        controller: ngDicomViewerController,
        controllerAs: 'vm',
        bindToController: true,
        replace: true,
        link:dvButtonLinkFunction
    };
    return directive;
}

function dvWwwcButton() {
    var directive = {
        restrict: 'EA',
        template: '<label class="btn btn-icon-only btn-default ng-dv-btn btn-wwwc"'+
        'dv-element-id="vm.currentElementId"' +
        'ng-click="vm.wwwc()">' +
        '<input type="radio" class="toggle">'+
        '</label>',
        scope: {
            dvElementId: '='
        },
        controller: ngDicomViewerController,
        controllerAs: 'vm',
        bindToController: true,
        replace: true,
        link:dvButtonLinkFunction
    };
    return directive;
}

function dvHighlightButton() {
    var directive = {
        restrict: 'EA',
        template: '<label class="btn btn-icon-only btn-default ng-dv-btn btn-highlight"'+
        'dv-element-id="vm.currentElementId"' +
        'ng-click="vm.highlight()">' +
        '<input type="radio" class="toggle">'+
        '</label>',
        scope: {
            dvElementId: '='
        },
        controller: ngDicomViewerController,
        controllerAs: 'vm',
        bindToController: true,
        replace: true,
        link:dvButtonLinkFunction
    };
    return directive;
}

function dvAngleButton() {
    var directive = {
        restrict: 'EA',
        template: '<label class="btn btn-icon-only btn-default ng-dv-btn btn-angle"'+
        'dv-element-id="vm.currentElementId"' +
        'ng-click="vm.angle()">' +
        '<input type="radio" class="toggle">'+
        '</label>',
        scope: {
            dvElementId: '='
        },
        controller: ngDicomViewerController,
        controllerAs: 'vm',
        bindToController: true,
        replace: true,
        link:dvButtonLinkFunction
    };
    return directive;
}

function dvLengthButton() {
    var directive = {
        restrict: 'EA',
        template: '<label class="btn btn-icon-only btn-default ng-dv-btn btn-length"'+
        'dv-element-id="vm.currentElementId"' +
        'ng-click="vm.length()">' +
        '<input type="radio" class="toggle">'+
        '</label>',
        scope: {
            dvElementId: '='
        },
        controller: ngDicomViewerController,
        controllerAs: 'vm',
        bindToController: true,
        replace: true,
        link:dvButtonLinkFunction
    };
    return directive;
}

function dvProbeButton() {
    var directive = {
        restrict: 'EA',
        template: '<label class="btn btn-icon-only btn-default ng-dv-btn btn-probe"'+
        'dv-element-id="vm.currentElementId"' +
        'ng-click="vm.probe()">' +
        '<input type="radio" class="toggle">'+
        '</label>',
        scope: {
            dvElementId: '='
        },
        controller: ngDicomViewerController,
        controllerAs: 'vm',
        bindToController: true,
        replace: true,
        link:dvButtonLinkFunction
    };
    return directive;
}

function dvCircleButton() {
    var directive = {
        restrict: 'EA',
        template: '<label class="btn btn-icon-only btn-default ng-dv-btn btn-circle"'+
        'dv-element-id="vm.currentElementId"' +
        'ng-click="vm.circle()">' +
        '<input type="radio" class="toggle">'+
        '</label>',
        scope: {
            dvElementId: '='
        },
        controller: ngDicomViewerController,
        controllerAs: 'vm',
        bindToController: true,
        replace: true,
        link:dvButtonLinkFunction
    };
    return directive;
}

function dvRectangleButton() {
    var directive = {
        restrict: 'EA',
        template: '<label class="btn btn-icon-only btn-default ng-dv-btn btn-rectangle"'+
        'dv-element-id="vm.currentElementId"' +
        'ng-click="vm.rectangle()">' +
        '<input type="radio" class="toggle">'+
        '</label>',
        scope: {
            dvElementId: '='
        },
        controller: ngDicomViewerController,
        controllerAs: 'vm',
        bindToController: true,
        replace: true,
        link:dvButtonLinkFunction
    };
    return directive;
}

function dvViewButton() {
    var directive = {
        restrict: 'EA',
        template: '<a ng-class="{\'active-view\':vm.dvView==vm.viewName}"'+
        'dv-view="vm.view"' +
        'ng-bind="vm.viewText"'+
        'ng-click="vm.updateView(vm.viewName)">' +
        '</a>',
        scope: {
            dvView: '='
        },
        controller: ngDicomViewerController,
        controllerAs: 'vm',
        bindToController: true,
        replace: true,
        link:dvViewButtonLinkFunction
    };
    return directive;
}

function dvViewButtonLinkFunction(scope, element, attributes,vm){
    vm.viewName=attributes.view;
    vm.viewText=attributes.text;
}

function dvDropImageLinkFunction(scope, element, attributes,vm){
    vm.id=attributes.id;
}

function dvDragImageLinkFunction(scope, element, attributes){
    if(attributes.class){
        element.css(attributes.class);
    }
}

function dvButtonLinkFunction(scope, element, attributes){
    var width=attributes.width||34,
        height=attributes.height||34;
    element.css("height", height+'px');
    element.css("width", width+'px');
}

/* module services */
function ngDvService(ngDicomViewerConfig) {
    var imageLoaderName = ngDicomViewerConfig.imageLoaderName;
    var service = {
        displayImage: displayImage,
        displayStack: displayStack,
        loadImage:loadImage
    };
    return service;

    function displayImage(imageId,elementId,displayOnly) {
        var element = $('#'+elementId).get(0);
        var imageFullId = imageLoaderName + imageId;
        cornerstone.enable(element);
        cornerstone.loadImage(imageFullId).then(function (image) {
            cornerstone.displayImage(element, image);
            if(!displayOnly||displayOnly==undefined) {
                cornerstoneTools.mouseInput.enable(element);
                cornerstoneTools.mouseWheelInput.enable(element);
                cornerstoneTools.stackScrollWheel.deactivate(element);
                $(element).trigger('CornerstoneSingleImageLoaded', null);
            }
        });
    }

    function displayStack(stack,elementId) {
        var element = $('#'+elementId).get(0);
        var imageIds = stack.imageIds;
        for(var i= 0,len=imageIds.length;i<len;i++){
            imageIds[i] = imageLoaderName + imageIds[i];
        }
        cornerstone.enable(element);
        cornerstone.loadImage(imageIds[stack.currentImageIdIndex]).then(function (image) {
            cornerstone.displayImage(element, image);
            cornerstoneTools.mouseInput.enable(element);
            cornerstoneTools.mouseWheelInput.enable(element);
            cornerstoneTools.addStackStateManager(element, ['stack']);
            cornerstoneTools.addToolState(element, 'stack', stack);
            cornerstoneTools.stackScrollWheel.enable(element);
            cornerstoneTools.stackScrollWheel.activate(element);
            $(element).trigger('CornerstoneStackLoaded', stack);
        });
        cornerstone.reset(element);
    }

    function loadImage(imageBase64) {
        var raw = window.atob(imageBase64);
        var rawLength = raw.length;
        var array = new Uint8Array(new ArrayBuffer(rawLength));
        for (var i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        var imageDataSet = dicomParser.parseDicom(array);
        return imageLoader.imageManager.add(imageDataSet);
    }

}

function ngDicomViewerController($rootScope,$timeout,ngDicomViewerConfig,ngDvService) {
    var vm = this;
    vm.clear = clear;
    vm.zoom = zoom;
    vm.pan = pan;
    vm.wwwc = wwwc;
    vm.highlight = highlight;
    vm.angle = angle;
    vm.length = length;
    vm.probe = probe;
    vm.circle = circle;
    vm.rectangle = rectangle;
    vm.onDragStart = onDragStart;
    vm.onDragStackStart = onDragStackStart;
    vm.displayImage = displayImage;
    vm.selectElement=selectElement;
    vm.updateView=updateView;
    vm.currentImageId='';
    vm.currentElementId='';
    vm.currentStack={};
    vm.viewportElements=[];
    vm.view=$rootScope.dvDefaultView||1;
    vm.imageLoader=ngDicomViewerConfig.imageLoader;
    vm.cloneElementId=ngDicomViewerConfig.cloneElementId;

    function onDragStart(){
        var object = vm.object;
        vm.dvImageId = object.dicomMetadata.sopInstanceUid;
        ngDvService.displayImage(vm.dvImageId,vm.cloneElementId,true);
    }

    function onDragStackStart(){
        vm.dvImageId =[];
        for(var i= 0,len=vm.series.objects.length;i<len;i++){
            vm.dvImageId.push(vm.series.objects[i].dicomMetadata.sopInstanceUid);
        }
        vm.dvStack = {
            currentImageIdIndex : 0,
            imageIds: vm.dvImageId
        };
        var imageId = vm.dvImageId[0];
        ngDvService.displayImage(imageId,vm.cloneElementId,true);
    }

    function displayImage() {
        vm.dvElementId=vm.id;
        if(!angular.isArray(vm.dvImageId)) {
            ngDvService.displayImage(vm.dvImageId,vm.id);
        }
        else{
            ngDvService.displayStack(vm.dvStack,vm.id);
        }
        if (vm.dvElementId) {
            var oldElement = $('#'+vm.dvElementId).get(0);
            disableAllTools(oldElement);
        }
        vm.dvElementId=vm.id;
        enableStackScroll();
        $('.btn-group label').removeClass('active');
    }

    function selectElement(e){
        var hasImage=e.currentTarget.childNodes.length>0;
        if(vm.dvElementId!==vm.id && hasImage) {
            if (vm.dvElementId) {
                var oldElement = $('#'+vm.dvElementId).get(0);
                disableAllTools(oldElement);
            }
            vm.dvElementId=vm.id;
            enableStackScroll();
            $('.btn-group label').removeClass('active');
        }
    }

    function enableStackScroll() {
        var element=$('#'+vm.dvElementId).get(0);
        vm.dvStack=cornerstoneTools.getToolState(element, 'stack').data[0];
        cornerstoneTools.stackScrollWheel.enable(element);
        cornerstoneTools.stackScrollWheel.activate(element);
    }

    function clear () {
        var element=$('#'+vm.dvElementId).get(0);
        // var toolStateManager = cornerstoneTools.getElementToolStateManager(element);
        // toolStateManager.clear(element);
        // cornerstone.updateImage(element);
        cornerstoneTools.clearToolState(element, "length");
        cornerstoneTools.clearToolState(element, "angle");
        cornerstoneTools.clearToolState(element, "ellipticalRoi");
        cornerstoneTools.clearToolState(element, "highlight");
        cornerstoneTools.clearToolState(element, "probe");
        cornerstoneTools.clearToolState(element, "rectangleRoi");
        cornerstone.updateImage(element);
        //var appState = JSON.parse(vm.appStates);
        //cornerstoneTools.appState.restore(appState);
    }

    function zoom () {
        var element=$('#'+vm.dvElementId).get(0);
        disableAllTools(element);
        cornerstoneTools.zoom.enable(element);
        cornerstoneTools.zoom.activate(element, 1);
        enableStackScroll();
    }

    function pan () {
        var element=$('#'+vm.dvElementId).get(0);
        disableAllTools(element);
        cornerstoneTools.pan.enable(element);
        cornerstoneTools.pan.activate(element, 1);
        enableStackScroll();
    }

    function wwwc () {
        var element=$('#'+vm.dvElementId).get(0);
        disableAllTools(element);
        cornerstoneTools.wwwc.enable(element);
        cornerstoneTools.wwwc.activate(element, 1);
        enableStackScroll();
    }

    function highlight () {
        var element=$('#'+vm.dvElementId).get(0);
        disableAllTools(element);
        cornerstoneTools.highlight.enable(element);
        cornerstoneTools.highlight.activate(element, 1);
        enableStackScroll();
    }

    function angle () {
        var element=$('#'+vm.dvElementId).get(0);
        disableAllTools(element);
        cornerstoneTools.angle.enable(element);
        cornerstoneTools.angle.activate(element, 1);
        enableStackScroll();
    }

    function length () {
        var element=$('#'+vm.dvElementId).get(0);
        disableAllTools(element);
        cornerstoneTools.length.enable(element);
        cornerstoneTools.length.activate(element, 1);
        enableStackScroll();
    }

    function probe (){
        var element=$('#'+vm.dvElementId).get(0);
        disableAllTools(element);
        cornerstoneTools.probe.enable(element);
        cornerstoneTools.probe.activate(element, 1);
        enableStackScroll();
    }

    function circle () {
        var element=$('#'+vm.dvElementId).get(0);
        disableAllTools(element);
        cornerstoneTools.ellipticalRoi.enable(element);
        cornerstoneTools.ellipticalRoi.activate(element, 1);
        enableStackScroll();
    }

    function rectangle () {
        var element=$('#'+vm.dvElementId).get(0);
        disableAllTools(element);
        cornerstoneTools.rectangleRoi.enable(element);
        cornerstoneTools.rectangleRoi.activate(element, 1);
        enableStackScroll();
    }

    function updateView(view) {
        vm.dvView=view;
        $timeout(function() {
            resizeViewport();
        }, 10);
    }

    function disableAllTools(element) {
        cornerstoneTools.zoom.deactivate(element, 1);
        cornerstoneTools.pan.deactivate(element, 1);
        cornerstoneTools.wwwc.deactivate(element, 1);
        cornerstoneTools.probe.deactivate(element, 1);
        cornerstoneTools.length.deactivate(element, 1);
        cornerstoneTools.ellipticalRoi.deactivate(element, 1);
        cornerstoneTools.rectangleRoi.deactivate(element, 1);
        cornerstoneTools.angle.deactivate(element, 1);
        cornerstoneTools.highlight.deactivate(element, 1);
        cornerstoneTools.stackScrollWheel.deactivate(element);
    }

    function resizeViewport() {
        var len=vm.viewports.length;
        for(var i=0;i<len;i++){
            if(vm.viewports[i].firstChild!==null) {
                cornerstone.resize(vm.viewports[i], true);
            }
        }
    }

    function init() {
        vm.viewports =document.querySelectorAll('[dv-drop-image]');
        $(window).resize(function() {
            resizeViewport();
        });
        vm.dvView=vm.view;
    }

    init();
}