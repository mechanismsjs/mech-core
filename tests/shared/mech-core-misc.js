var chai = require("chai");
var expect = chai.expect;

module.exports.go = function go(M) {

   // isUsable FUNCTION -----------------------------------------------------------
   describe("the function isUsable should consider", function() {
      it ("null as not-usable", function() {
         expect(M.isUsable(null)).to.be.false;
      });
      it ("undefined as not-usable", function() {
         expect(M.isUsable(undefined)).to.be.false;
      });
      it ("a missing parameter as not-usable", function() {
         expect(M.isUsable()).to.be.false;
      });
      it ("0 as usable", function() {
         expect(M.isUsable(0)).to.be.true;
      });
      it ("NaN as usable", function() {
         expect(M.isUsable(NaN)).to.be.true;
      });
      it ("'' as usable", function() {
         expect(M.isUsable("")).to.be.true;
      });
      it ("'NaN' as usable", function() {
         expect(M.isUsable("NaN")).to.be.true;
      });
      it ("true as usable", function() {
         expect(M.isUsable(true)).to.be.true;
      });
      it ("false as usable", function() {
         expect(M.isUsable(false)).to.be.true;
      });
      it ("an object as usable", function() {
         expect(M.isUsable({x:5})).to.be.true;
      });
      it ("a string as usable", function() {
         expect(M.isUsable("xxx")).to.be.true;
      });
      it ("a number as usable", function() {
         expect(M.isUsable(6)).to.be.true;
      });
   });

};



