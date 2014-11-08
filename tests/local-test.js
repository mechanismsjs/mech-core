var merge = require("merge");
m = require('../node_modules/mech-emit/dist/mech-emit.js');
m2 = require('../node_modules/mech-math/dist/mech-math.js');
m3 = require("..");
merge.recursive(m, m2);
merge.recursive(m, m3);

expect = require("chai").expect;
require("./run-all.js");
