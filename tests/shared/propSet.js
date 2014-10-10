module.exports.go = function go(m, expect) {
   // TODO: A lot more test coverage is required for propSet
   describe ("set a property mechanism - propSet", function() {
      it ("should not wipeout Object prototype and be a mechanism", function() {
         var mech = m.propSet();
         expect(mech).to.have.property('toString');
         expect(m.PropSetF).to.not.eql(undefined);         
      });
      
      it ("should have correct properties", function() {
         var mech = m.propSet();
         expect(mech).to.have.property('isMech');
         expect(mech.isMech).to.be.true;
      
         expect(mech).to.have.property('isNull');
         expect(mech.isNull).to.be.false;
      
         expect(mech).to.have.property('isPrim');
         expect(mech.isPrim).to.be.false;
      
         expect(mech).to.have.property('prop');
         expect(mech).to.have.property('_prop'); // imagined privacy

         expect(mech).to.have.property('dest');
         expect(mech).to.have.property('_dest'); // imagined privacy

         expect(mech).to.have.property('src');
         expect(mech).to.have.property('_src'); // imagined privacy
         
         expect(mech).to.have.property('itemGo');
         expect(mech).to.have.property('_itemGo'); // imagined privacy
      });
      
      it ("sets the value of a valid item given everything is valid", function() {

          var mech2 = m.num(8);
          var mech3 = m.num(7);
          expect(mech2.v).to.equal(8);
          expect(mech3.v).to.equal(7);

          var mech = m.propSet("v", mech2, mech3, false );
          expect(mech.prop).to.equal("v");
          expect(mech.dest).to.equal(mech2);
          expect(mech.src).to.equal(7);
          expect(mech.itemGo).to.be.false;

          mech.go;
          expect(mech2.v).to.equal(7);

       });
       
       it ("sets the value of a valid item given a primitive value (function syntax)", function() {
          
          var mech2 = m.num(8);
          expect(mech2.v).to.equal(8);
          
          var mech = m.propSet( "v", mech2, 22, false );
          expect(mech.prop).to.equal("v");
          expect(mech.src).to.equal(22);
          expect(mech.dest).to.equal(mech2);
          expect(mech.itemGo).to.be.false;
          
          mech.go;
          expect(mech2.v).to.equal(22);

          var mech3 = m.p$s( "v", mech2, 22, false );
          expect(mech3.prop).to.equal("v");
          expect(mech3.src).to.equal(22);
          expect(mech3.dest).to.equal(mech2);
          expect(mech3.itemGo).to.be.false;
          
          mech3.go;
          expect(mech2.v).to.equal(22);
          
       });
      
   });

};



