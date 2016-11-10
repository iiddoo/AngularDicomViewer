# AngularDicomViewer

[AngularJS](https://github.com/angular/angular.js) 1.x.x Viewer for medical images and *DICOM documents* with features and actions using [conerstone](https://github.com/chafey/cornerstone) JavaScript library.
This project provides:

  - **Image Loader**
  - **Viewer module**
  - **Usage example**

##### Image Loader

Using [conerstone](https://github.com/chafey/cornerstone) and [dicomParser](https://github.com/chafey/dicomParser) JavaScript libraries, the *Image Loader* parses the images and uses *DICOM* metadata to render the HTML canvas.  

##### Viewer module

This is an [AngularJS](https://github.com/angular/angular.js) module provides loading service, drag and drop DICOM Stacks to viewport and several actions on the rendered image:
* Zoom
* Pan
* WW/WC
* Highlight
* Angle
* Rectangle
* Circle
* Probe
* Length
* Clear

##### Usage example

* Live example: [http://dicomviewer.herokuapp.com](http://dicomviewer.herokuapp.com/)
* Several images views 1X1, 1X2, 2X1 and 2X2.
* Paging through stacks.
* Image description.
* Drag and drop images using [ngDraggable](https://github.com/fatlinesofcode/ngDraggable/).

### Technologies

Back-end written in [Node.js](https://nodejs.org/) and requires v4.x.x to run.

Front-end uses [AngularJS](https://angularjs.org/) framework v1.4.7.

### Actions
```sh
Drag and drop DICOM stack to the viewer
```
```sh
Select an action
```
```sh
Mouse left-click to DRAW
```
```sh
Mouse wheel-scroll to ZOOM or WW/WC
```
```sh
Change view with view select dropdown
```

App structure
----

```
AngularDicomViewer
│   package.jason
│   readme.md
│   server.js
│
└───study1
│    │   dopler
|    |   jpeg
|    |   mri
|    |   study.json
│
└───node_modules
│    │   body-parser
│    │   express
│
└───public
    └───app
    │    └───controllers  
    │    │      │   DicomViewerController.js
    |    └───css
    │    |      │   dicomViewer.css 
    │    |      │   dicomViewer.less 
    |    └───lib
    │    │      |   angular  
    │    │      |   bootstrap
    │    │      |   cornerstone
    │    │      |   dicomParser  
    │    │      |   imageLoader
    │    │      |   jpx
    │    │      |   jquery
    │    │      |   ngDicomViewer
    │    │      |   ngDraggble
    |    └───views
    │    │      |   DicomViewer.html
    │    │   app.js  
    │
    │   index.html


```
----
Live preview: [http://dicomviewer.herokuapp.com](http://dicomviewer.herokuapp.com/)
