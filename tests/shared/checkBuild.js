module.exports.go = function go(m, expect) {
   describe("the modules were built correctly", function() {
      var pack = require("../../package.json");
      it ("should have the correct version", function() {
         expect(m.version).to.equal(pack.version);
      });
   });
};