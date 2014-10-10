module.exports.go = function go(m, expect) {
   require("./num.js").go(m, expect);
   require("./numM.js").go(m, expect);
   require("./str.js").go(m, expect);
   require("./strM.js").go(m, expect);

   require("./checkBuild.js").go(m, expect);
   require("./isUsable.js").go(m, expect);

   require("./propGet.js").go(m, expect);
   require("./propSet.js").go(m, expect);

   require("./writeLn.js").go(m, expect);

   require("./dualArg.js").go(m, expect);
   require("./add.js").go(m, expect);
   require("./sub.js").go(m, expect);
   require("./mul.js").go(m, expect);
   require("./div.js").go(m, expect);
}