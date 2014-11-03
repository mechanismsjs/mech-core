describe("string mechanism - str", function() {
   it ("should not wipeout Object prototype and be a mechanism", function() {
     var mech = m.strM();
     expect(mech).to.have.property('toString');
     expect(m._.StrMF).to.not.be.undefined;
   });

   it ("should have correct properties", function() {
     var mech = m.strM();
     expect(mech.isMech).to.be.true;
     expect(mech.isPrim).to.be.true;
          
     expect(mech).to.have.property('v');
     expect(mech).to.have.property('_v'); // imagined privacy
   });
 
   it ("can contain another mechanism", function() {
      var mech = m.strM(m.str("6"));

      expect(mech.v).to.equal("6");
      expect(mech.go).to.equal("6");
      expect(mech.goNum).to.equal(6);
      expect(mech.goStr).to.equal("6");
      expect(mech.goArr).to.contain("6");
      expect(mech.goArr).to.have.length(1);
      expect(mech.goBool).to.be.true;
   });

}); 