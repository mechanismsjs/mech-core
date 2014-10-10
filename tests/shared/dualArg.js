module.exports.go = function go(m, expect) {

   describe("dual argument mechanism - dualArg", function() {
      it ("should not wipeout Object prototype and be a mechanism", function() {
        var mech = m.dualArg();
        expect(mech).to.have.property('toString');
        expect(m.DualArgF).to.not.eql(undefined);
      });
      
      it ("should have correct properties", function() {
        var mech = m.dualArg();
        expect(mech).to.have.property('isMech');
        expect(mech.isMech).to.be.true;
                
        expect(mech).to.have.property('isNull');
        expect(mech.isNull).to.be.false;
                
        expect(mech).to.have.property('isPrim');
        expect(mech.isPrim).to.be.false;
                
        expect(mech).to.have.property('l');
        expect(mech).to.have.property('_l'); // imagined privacy

        expect(mech).to.have.property('r');
        expect(mech).to.have.property('_r'); // imagined privacy

      });

      it ("dualArg() should be 0", function() {
          var mech = m.dualArg();
          expect(mech.l.v).to.eql(0);
          expect(mech.r.v).to.eql(0);
       });
     
      it ("dualArg(undefined) should be NaN", function() {
         var mech = m.dualArg(undefined);
         expect(mech.l.v).to.eql(NaN);
         expect(mech.r.v).to.eql(0);
      });
      
      it ("dualArg(NaN) should be 0", function() {
         var mech = m.dualArg(NaN);
         expect(mech.l.v).to.eql(NaN);
         expect(mech.r.v).to.eql(0);
      });
     
     it ("dualArg(Infinity) should be 0", function() {
        var mech = m.dualArg(Infinity);
        expect(mech.l.v).to.eql(Infinity);
        expect(mech.r.v).to.eql(0);
     });
      
      it ("dualArg(5) should be 0 and 0", function() {
         var mech = m.dualArg(5);
         expect(mech.l.v).to.eql(5);
         expect(mech.r.v).to.eql(0);
      });
     
      it ("dualArg(0) should be 0 and 0", function() {
         var mech = m.dualArg(0);
         expect(mech.l.v).to.eql(0);
         expect(mech.r.v).to.eql(0);
      });
     
      it ("dualArg(1,2) should be 1 and 2", function() {
         var mech = m.dualArg(1,2);
         expect(mech.l.v).to.eql(1);
         expect(mech.r.v).to.eql(2);
      });
     
      it ("dualArg('1','2') should be 1 and 2", function() {
         var mech = m.dualArg("1","2");
         expect(mech.l.v).to.eql(1);
         expect(mech.r.v).to.eql(2);
      });
     
      it ("dualArg(NaN,NaN) should be NaN and NaN", function() {
         var mech = m.dualArg(NaN,NaN);
         expect(mech.l.v).to.eql(NaN);
         expect(mech.r.v).to.eql(NaN);
      });

      it ("dualArg(null,null) should be NaN and NaN", function() {
         var mech = m.dualArg(null,null);
         expect(mech.l.v).to.eql(NaN);
         expect(mech.r.v).to.eql(NaN);
      });

      it ("dualArg(undefined,undefined) should be NaN and NaN", function() {
         var mech = m.dualArg(undefined,undefined);
         expect(mech.l.v).to.eql(NaN);
         expect(mech.r.v).to.eql(NaN);
      });

   });
};