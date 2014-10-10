(function() {
"use strict";

// Establish the root object:
//   'window' in the browser
//   'exports' on the server
var root = this;

// Save the previous m
var previousMechanisms = root.m;

// New module or use existing
var m = m || {};

// Current version updated by
// gulpfile.js build process
m["version"] = '{{VERSION}}';

// Export module for Node and the browser.
if(typeof module !== 'undefined' && module.exports) {
  module.exports = m;
} else {
  this.sightglass = sightglass
}
