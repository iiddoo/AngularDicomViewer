
angular.module('DicomViewer').controller('DicomViewerController', DicomViewerController);

DicomViewerController.$inject = ['$rootScope','$http', '$q' ,'ngDvService'];

function DicomViewerController($rootScope,$http, $q ,ngDvService) {
    var vm = this;

    vm.dataUrl='http://dicomviewer.herokuapp.com/';
    vm.studyId='';
    vm.studyMetadata={};
    vm.studySeries=[];
    vm.singleSeries=[];
    vm.getSingleImage=getSingleImage;
    vm.getStudySeries=getStudySeries;

    /* get study json from server */
    function getStudy () {
        var url = vm.dataUrl+'study/'+vm.studyId;
        $http({
            method: 'GET',
            url:url
        }).then(function(data){
            var study = angular.fromJson(data.data.study);
            vm.studyMetadata = study.dicomMetadata;
            vm.studySeries = study.series;
            vm.singleSeries = study.series[0].objects;
        });
    }

    /* get all series images from server, load images into imageLoader and display thumbnails */
    function getStudySeries(series,elementId){
        var promise = $q.all({});
        var objects = series.objects;
        series.loaded = false;
        var total=objects.length;
        var counter=0;
        series.progress = '';
        var seriesId = series.dicomMetadata.SeriesInstanceUID;
        angular.forEach(objects, function(file){
            var fileId=file.dicomMetadata.sopInstanceUid;
            var url = vm.dataUrl+'study/'+vm.studyId+'/'+seriesId+'/'+fileId+'.dcm';
            promise = promise.then(function(){
                return $http({
                    method: 'GET',
                    url:url
                }).then(function(data){
                    if(!ngDvService.loadImage(data.data)){
                        console.log('error loading image: '+ fileId);
                    }
                    counter++;
                    series.progress = Math.round(counter/total*100) + '%';
                });
            });
        });
        promise.then(function(){
            series.loaded = true;
            var imageId = objects[0].dicomMetadata.sopInstanceUid;
            ngDvService.displayImage(imageId,elementId,true);
        });
    }

    /* get all single image from server , load image into imageLoader and display thumbnail */
    function getSingleImage (object,elementId) {
        var promise = $q.all({});
        object.loaded = false;
        var imageId=object.dicomMetadata.sopInstanceUid;
        var url = vm.dataUrl+'study/'+vm.studyId+'/file/'+imageId+'.dcm';
        promise = promise.then(function(){
            return $http({
                method: 'GET',
                url:url
            }).then(function(data){
                if(!ngDvService.loadImage(data.data)){
                    console.log('error loading image: '+ imageId);
                }
            });
        });
        promise.then(function(){
            object.loaded = true;
            ngDvService.displayImage(imageId,elementId,true);
        });
    }

    /* initialize view */
    function init(){
        vm.studyId='study1';
        getStudy();
        $rootScope.dvDefaultView=2;
    }

    init();

}
