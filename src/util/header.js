(function() {
"use strict";

// Establish the root object:
//  'window' in the browser
//  'exports' on the server
var root = this;

// Save the previous m
var previous = root.m;

// New module or merge with previous
var m = previous || {};

// Current version updated by
// gulpfile.js build process
m["version"] = '{{VERSION}}';

// Export module for Node and the browser.
if(typeof module !== 'undefined' && module.exports) {
  module.exports = m;
} else {
  this.m = m
}
