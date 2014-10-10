module.exports.go = function go(m, expect) {
   describe ("mechanism mechanism - mech", function() {
      it ("should not wipeout Object prototype and be a mechanism", function() {
        var mech = m.mech();
        expect(mech).to.have.property('toString');
        expect (m.MechF).to.not.eql(undefined);
      });
      it ("should have correct properties", function() {
        var mech = m.mech();
        expect(mech).to.have.property('isMech');
        expect(mech.isMech).to.be.true;  

        expect(mech).to.have.property('isNull');
        expect(mech.isNull).to.be.false;

        expect(mech).to.have.property('isPrim');
        expect(mech.isPrim).to.be.false;

      });
   });
};