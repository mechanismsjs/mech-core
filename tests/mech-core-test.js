var m = require("../dist/mech-core.js");
var expect = require("chai").expect;
require("./shared/runAll.js").go(m, expect);



/*

Purpose of testing this way:

Coffee script can generate your index.js.

An entry like:

xxxx

in Coffee script will generate the code in your index.js file as follows:

xxxx;

which will cause the tests fail.

If you run index.js through ugilify, xxxx; is removed meaning if you run
your tests against index.min.js they will pass even though the would fail
with index.js.

So, we setup this file to let us run the same tests against different generated
files:

index.js
index.min.js
index.webify.min.js

and so on


*/
