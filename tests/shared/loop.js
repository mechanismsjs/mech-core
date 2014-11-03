describe("loopping mechanism - loop", function () {

   it ("should not wipeout Object prototype and be a mechanism", function() {
     var mech = m.loop();
     expect(mech).to.have.property('toString');
     expect(m._.LoopF).to.not.eql(undefined);
   });

   it ("should have correct properties", function() {
     var mech = m.loop();
     expect(mech.isMech).to.be.true;
   });

   it ("should loop a given number of times.", function() {
     var mech = m.loop(m.emitFromArr([1,2,3,4,5,6,7,8]),5);
     expect(mech.go).to.equal(5);

     var mech = m.loop(m.emitFromArr([1,2,3,4,5,6,7,8]),3);
     expect(mech.go).to.equal(3);

     var mech = m.loop(m.emitFromArr([1,2,3,4,5,6,7,8]),0);
     expect(mech.go).to.eql(undefined);
   });

   it ("should loop until the item is undefined and return the last value.", function() {
     var mech = m.loop(m.emitFromArr([1,2,3,4,5,6,7,8]));
     expect(mech.go).to.equal(8);
   });

   it ("should return undefined with nothing to loop on", function() {
     var mech = m.loop(undefined);
     expect(mech.go).to.eql(undefined);

     var mech2 = m.loop(null);
     expect(mech2.go).to.eql(undefined);
   });

   it ("should accept a mechanism as max", function() {
     var mech = m.loop(m.emitFromArr([1,2,3,4,5,6,7,8]),m.num(4));
     expect(mech.go).to.equal(4);
   });


});
