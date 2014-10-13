describe ("write a line of text to the console - writeLn", function() {
   it ("should not wipeout Object prototype and be a mechanism", function() {
      var mech = m.writeLn();
      expect(mech).to.have.property('toString');
      expect(m.WriteLnF).to.not.eql(undefined);         
   });
   
   it ("should have correct properties", function() {
      var mech = m.writeLn();
      expect(mech).to.have.property('isMech');
      expect(mech.isMech).to.be.true;
   
      expect(mech).to.have.property('isNull');
      expect(mech.isNull).to.be.false;
   
      expect(mech).to.have.property('isPrim');
      expect(mech.isPrim).to.be.false;
   
      expect(mech).to.have.property('text');
      expect(mech).to.have.property('_t'); // imagined privacy
   });
   
   it ("should write the primitive text 'hello' to the console", function() {
      var mech = m.writeLn("hello");
      expect(mech.go).to.equal("hello");
      expect(mech.goNum).to.eql(NaN);
      expect(mech.goStr).to.equal("hello");
   });

   it ("should write the mechanism text 'hello'", function() {
      var mech = m.writeLn(m.str("45"));
      expect(mech.go).to.equal("45");
      expect(mech.goStr).to.equal("45");
      expect(mech.goNum).to.equal(45);
   });
   
});