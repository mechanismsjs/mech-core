var merge = require("merge");
// m = require("../node_modules/mech-core/dist/mech-core.js");
// m2 = require("../node_modules/mech-scope-cell/dist/mech-scope-cell.js");
// m3 = require("../node_modules/mech-math/dist/mech-math.js");

// merge.recursive(m, m4); // mech-ajax is a core mechanism
// merge.recursive(m, m3); // mech-math is a core mechanism
// merge.recursive(m, m2); // mech-scope-cell is a core mechanism



m = require('../node_modules/mech-emit/dist/mech-emit.js');
m2 = require("..");
merge.recursive(m, m2); // mech-ajax is a core mechanism

expect = require("chai").expect;
require("./run-all.js");
