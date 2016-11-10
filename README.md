# AngularDicomViewer

Viewer for *DICOM documents* with features and actions.

The app
----

  - **Query validation**
  - **Search for match**
  - **Return and view result to user**

##### Query validation

> Server side validation checks valid query object and it's fields, 
details below regarding to client side validation.

* Maximum 3 query fields.
* Age field is any number > 0 && < 120 (120 defined as maximum age).
* Phone field is any number >120.
* Name field is NaN and includes letters only.
* Query field can appear only once.
* Support case insensitive for *name* search.

##### Search for match

* Confirm query validation before starting search.
* Valid match only if all query fields found match in person properties.
* Person object expanded with additional fields for efficient compare.


##### Return and view result to user

* Loader animation while waiting for reply from server.
* Showing error message in case of long query or invalid characters.
* View results with detailed user query parsed to fields.
* Show the number of matching results.
* Server side pagination for big data results (default page size 20 records).
* Use client side infinite scroll to display large amounts of data.


### Technologies

Back-end written in [Node.js](https://nodejs.org/) and requires v4+ to run.

Front-end uses [AngularJS](https://angularjs.org/) framework v1.4.7.

### plugins
```sh
body-parser
```
```sh
express
```
```sh
angular-resource
```
```sh
angular-ui-router
```
```sh
oclazyload
```
```sh
taggedInfiniteScroll
```

App structure
----

```
Exercise
│   package.jason
│   readme.md
│   server.js
│
└───data
│    │   people.jason
│
└───node_modules
│    │   body-parser
│    │   express
│
└───public
    └───app
    │    └───exercise  
    │    │      │   exercise.controller.js
    │    │      │   exercise.view.html
    │    │   app.js
    └───components
    │     │   angular.min.js  
    │     │   angular-resource.min.js   
    │     │   angular-ui-router.min.js  
    │     │   ocLazyLoad.min.js
    │     │   taggedInfiniteScroll.min.js
    └───style
    │     │   custom.css  
    │     │   klarna-ui-css-components.css   
    │
    │   index.html


```
----
Live preview: [http://dicomviewer.herokuapp.com](http://dicomviewer.herokuapp.com/)
