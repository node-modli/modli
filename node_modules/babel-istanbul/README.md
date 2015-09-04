## babel-istanbul - [babel](https://github.com/babel/babel) + [istanbul](https://github.com/gotwarlost/istanbul)

* [Features](#features)
* [Getting started](#getting-started)
* [Special flags](#special-flags)

### Features

* This package handles coverage for babel generated code by reconciling babel's output and its source map.
* babel-istanbul is drop-in replacement for [istanbul](https://github.com/gotwarlost/istanbul), as it is a copy of istanbul with babel compilation inserted into the instrumentation layer.
* There are also a few [special flags](#special-flags) for helping with babel compilation.

### Getting started

    $ npm install babel-istanbul

* babel-istanbul is run exactly like istanbul. For specifics on running istanbul, see [istanbul's README](https://github.com/gotwarlost/istanbul/blob/master/README.md).


### Special flags

* There are a few special flags added to make working with babel easier:

Name                           | Description                                                    
------------------------------ | ------------------------------
`include-babel-polyfill`       | includes the babel-polyfill, defaults to false.                
`use-babel-runtime`            | uses the optional runtime option for babel, defaults to false. 
`babel-stage`                  | sets the babel stage, defaults to 2 (draft).                   
