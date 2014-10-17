(function() {
"use strict";

var root = this; // window (browser) or exports (server)
var m = root.m || { _ : {} }; // new module or merge with previous
var m_ = m._ || {}; // new sub-module or merge with pervious
m["version-core"] = '{{VERSION}}'; // New library OR to use existing library (m for example), please fork and add to that project.

// Export module for Node and the browser.
if(typeof module !== 'undefined' && module.exports) {
  module.exports = m;
} else {
  root.m = m
}
