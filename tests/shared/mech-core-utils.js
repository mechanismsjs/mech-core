var chai = require("chai");
var expect = chai.expect;
module.exports.go = function go(M) {
   describe ("get a property mechanism - propGet", function() {
      it ("should not wipeout Object prototype and be a mechanism", function() {
         var mech = M.writeLn();
         expect(mech).to.have.property('toString');
      });
      
      it ("should have correct properties", function() {
         var mech = M.writeLn();
         expect(mech).to.have.property('isMechanism');
         expect(mech.isMechanism).to.be.true;
      
         expect(mech).to.have.property('isNull');
         expect(mech.isNull).to.be.false;
      
         expect(mech).to.have.property('isPrimitive');
         expect(mech.isPrimitive).to.be.false;
      
         expect(mech).to.have.property('text');
         expect(mech).to.have.property('_text'); // imagined privacy
      });
      
      it ("should write the primitive text 'hello' to the console", function() {
         var mech = M.writeLn("hello");
         expect(mech.go).to.equal("hello");
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("hello");
      });

      it ("should write the mechanism text 'hello'", function() {
         var mech = M.writeLn(M.str("45"));
         expect(mech.go).to.equal("45");
         expect(mech.goStr).to.equal("45");
         expect(mech.goNum).to.equal(45);
      });

      it ("should write the mechanism text '(4 + 2)'", function() {
         var mech = M.writeLn(M.add(4,2));
         expect(mech.go).to.equal("(4 + 2)");
         expect(mech.goStr).to.equal("(4 + 2)");
         expect(mech.goNum).to.equal(6);
         
      });
      
   });
};
