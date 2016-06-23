
var DicomViewer = angular.module("DicomViewer", [
    "ui.router",
    "oc.lazyLoad",
    "ngSanitize",
    "ngDraggable",
    "ngDicomViewer"
]);

DicomViewer.config(function(ngDicomViewerConfigProvider){
    var config={
        imageLoaderName:'myLoader://',
        cloneElementId:'cloneImage'
    };
    ngDicomViewerConfigProvider.set(config);
});

/* Routing Pages */
DicomViewer.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/DicomViewer.html");

    $stateProvider
        .state('DicomViewer', {
            url: "/DicomViewer.html",
            templateUrl: "app/views/DicomViewer.html",
            data: { pageTitle: 'Dicom Viewer' },
            controller: "DicomViewerController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'DicomViewer',
                        files: [
                            'app/controllers/DicomViewerController.js'
                        ]
                    }]);
                }]
            }
        });
}]);

DicomViewer.run(function ($rootScope, $state) {

    $rootScope.$state = $state;

});
