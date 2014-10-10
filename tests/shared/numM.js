module.exports.go = function go(m, expect) {
   describe ("number mechanism - numM", function() {
      it ("should not wipeout Object prototype and be a mechanism", function() {
        var mech = m.numM();
        expect(mech).to.have.property('toString');
        expect(m.NumMF).to.not.eql(undefined);
      });

      it ("should have correct properties", function() {
        var mech = m.numM();
        expect(mech).to.have.property('isMech');
        expect(mech.isMech).to.be.true;
          
        expect(mech).to.have.property('isNull');
        expect(mech.isNull).to.be.false;
          
        expect(mech).to.have.property('isPrim');
        expect(mech.isPrim).to.be.true;
          
        expect(mech).to.have.property('v');
        expect(mech).to.have.property('_v'); // imagined privacy
      });

      it ("can contain another mechanism", function() {
         var mech = m.numM(m.num(6));

         expect(mech.v).to.equal(6);
         expect(mech.go).to.equal(6);
         expect(mech.goNum).to.equal(6);
         expect(mech.goStr).to.equal("6");
         expect(mech.goArr).to.contain(6);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.true;
      });

   });
};