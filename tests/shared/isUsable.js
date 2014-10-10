module.exports.go = function go(m, expect) {
   describe("the function isUsable should consider", function() {
      it ("null as not-usable", function() {
         expect(m.isUsable(null)).to.be.false;
      });
      it ("undefined as not-usable", function() {
         expect(m.isUsable(undefined)).to.be.false;
      });
      it ("a missing parameter as not-usable", function() {
         expect(m.isUsable()).to.be.false;
      });
      it ("0 as usable", function() {
         expect(m.isUsable(0)).to.be.true;
      });
      it ("NaN as usable", function() {
         expect(m.isUsable(NaN)).to.be.true;
      });
      it ("'' as usable", function() {
         expect(m.isUsable("")).to.be.true;
      });
      it ("'NaN' as usable", function() {
         expect(m.isUsable("NaN")).to.be.true;
      });
      it ("true as usable", function() {
         expect(m.isUsable(true)).to.be.true;
      });
      it ("false as usable", function() {
         expect(m.isUsable(false)).to.be.true;
      });
      it ("an object as usable", function() {
         expect(m.isUsable({x:5})).to.be.true;
      });
      it ("a string as usable", function() {
         expect(m.isUsable("xxx")).to.be.true;
      });
      it ("a number as usable", function() {
         expect(m.isUsable(6)).to.be.true;
      });
   });   
};