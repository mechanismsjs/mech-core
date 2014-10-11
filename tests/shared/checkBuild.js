module.exports.go = function go(m, expect) {
   describe("the modules were built correctly", function() {
      it ("should have the correct version", function() {
         expect(m.version).to.equal("0.1.10");
      });
   });
};