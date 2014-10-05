var chai = require("chai");
var expect = chai.expect;

module.exports.go = function go(M) {

   // propGet -----------------------------------------------------------------
   
   describe ("get a property mechanism - propGet", function() {
      it ("should not wipeout Object prototype and be a mechanism", function() {
         var mech = M.propGet();
         expect(mech).to.have.property('toString');
      });
      
      it ("should have correct properties", function() {
         var mech = M.propGet();
         expect(mech).to.have.property('isMechanism');
         expect(mech.isMechanism).to.be.true;

         expect(mech).to.have.property('isNull');
         expect(mech.isNull).to.be.false;

         expect(mech).to.have.property('isPrimitive');
         expect(mech.isPrimitive).to.be.false;

         expect(mech).to.have.property('prop');
         expect(mech).to.have.property('_prop'); // imagined privacy
         
         expect(mech).to.have.property('itemGo');
         expect(mech).to.have.property('_itemGo'); // imagined privacy
         
         expect(mech).to.have.property('item');
         expect(mech).to.have.property('_item'); // imagined privacy
      
      });

      it ("propGet(): all values missing", function() {
         var mech = M.propGet();
         expect(mech.itemGo).to.equal(true); // default
         expect(mech.prop).to.equal("");
         expect(mech.item).to.equal(null);
         expect(mech.go).to.eql(null);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("");
         expect(mech.goArr[0]).to.eql(null);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });

      it ("propGet('isMechanism'): item is undefined", function() {
         var mech = M.propGet("isMechanism");
         expect(mech.itemGo).to.equal(true); // default
         expect(mech.prop).to.equal("isMechanism");
         expect(mech.item).to.equal(null);
         expect(mech.go).to.eql(null);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("");
         expect(mech.goArr[0]).to.eql(null);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });

      it ("propGet('isMechanism', null, false): item is null", function() {
         var mech = M.propGet("isMechanism", null, false);
         expect(mech.itemGo).to.equal(false); // default
         expect(mech.prop).to.equal("isMechanism");
         expect(mech.item).to.equal(null);
         expect(mech.go).to.eql(null);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("");
         expect(mech.goArr[0]).to.eql(null);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });

      it ("propGet('isMechanism', theItem, false): return the actual item", function() {
         var theItem = M.mech();
         
         var mech = M.propGet("isMechanism", theItem, false);
         expect(mech.itemGo).to.equal(false); // default
         expect(mech.prop).to.equal("isMechanism");
         expect(mech.item).to.equal(theItem);
         expect(mech.go).to.be.true;
         expect(mech.goNum).to.equal(1);
         expect(mech.goStr).to.equal("true");
         expect(mech.goArr).to.contain(true);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.true;
      });

      it ("p$('isMechanism', item, false): returns the actual item", function() {
         var theItem = M.mech();
         
         var mech = M.p$("isMechanism", theItem, false);
         expect(mech.itemGo).to.equal(false); // default
         expect(mech.prop).to.equal("isMechanism");
         expect(mech.item).to.equal(theItem);
         expect(mech.go).to.be.true;
         expect(mech.goNum).to.equal(1);
         expect(mech.goStr).to.equal("true");
         expect(mech.goArr).to.contain(true);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.true;
      });

      it ("propGet('go', item, false): returns correct values item not ran", function() {
         var theItem = M.num(8);
         var mech = M.propGet("go", theItem, false);
         expect(mech.itemGo).to.equal(false);
         expect(mech.prop).to.equal("go");
         expect(mech.item).to.equal(theItem);
         expect(mech.go).to.equal(8);
         expect(mech.goNum).to.equal(8);
         expect(mech.goStr).to.equal("8");
         expect(mech.goArr).to.contain(8);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.true;
      });
      
      it ("propGet('blah', item, false): undefined for bad property", function() {
         var theItem = M.num(8);
         var mech = M.propGet( "blah", theItem, false );
         expect(mech.itemGo).to.equal(false);
         expect(mech.prop).to.equal("blah");
         expect(mech.item).to.equal(theItem);
         expect(mech.go).to.eql(undefined);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("");
         expect(mech.goArr[0]).to.eql(undefined);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      }); 
      
      it ("propGet('blah', null, false): item null", function() {
         var mech = M.propGet("blah", null, false);
         expect(mech.itemGo).to.equal(false);      
         expect(mech.prop).to.equal("blah");
         expect(mech.item).to.eql(null);
         expect(mech.go).to.eql(null);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("");
         expect(mech.goArr[0]).to.eql(null);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });
      
      it ("propGet( null, M.num(8), null ): undefined for bad property", function() {
         var mech = M.propGet( null, M.num(8), null );
         expect(mech.itemGo).to.equal(true);      
         expect(mech.prop).to.equal("");
         expect(mech.go).to.eql(undefined);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("");
         expect(mech.goArr[0]).to.eql(undefined);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });
      
      it ("propGet(undefined, M.num(8), undefined): undefined for bad property", function() {
         var mech = M.propGet(undefined, M.num(8), undefined);
         expect(mech.itemGo).to.equal(true);      
         expect(mech.prop).to.equal("");
         expect(mech.go).to.eql(undefined);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("");
         expect(mech.goArr[0]).to.eql(undefined);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });

      it ("propGet( M.str('go'), theItem, false ): property is mechanism", function() {
         var theItem = M.num(8);
         var mech = M.propGet( M.str("go"), theItem, false );
         expect(mech.itemGo).to.equal(false);      
         expect(mech.prop).to.equal("go");
         expect(mech.item).to.equal(theItem);
         expect(mech.go).to.equal(8);
         expect(mech.goNum).to.equal(8);
         expect(mech.goStr).to.equal("8");
         expect(mech.goArr).to.contain(8);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.true;
      });
      
      it("M.propGet( M.str('go'), theItem, true ): runnig M.num as a mechanism so undefined", function() {
         var theItem = M.num(8);
         var mech = M.propGet( M.str("go"), theItem, true );
         expect(mech.itemGo).to.equal(true);
         expect(mech.prop).to.equal("go");
         expect(mech.item).to.equal(8);
         expect(mech.go).to.eql(undefined);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("");
         expect(mech.goArr[0]).to.eql(undefined);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
   
         var mech2 = M.propGet( M.str("go"), theItem ); // default to true
         expect(mech2.itemGo).to.equal(true);
         expect(mech2.prop).to.equal("go");
         expect(mech2.item).to.equal(8);
         expect(mech2.go).to.eql(undefined);
         expect(mech2.goNum).to.eql(NaN);
         expect(mech2.goStr).to.equal("");
         expect(mech2.goArr[0]).to.eql(undefined);
         expect(mech2.goArr).to.have.length(1);
         expect(mech2.goBool).to.be.false;
      });
      
   });
   
   
   // propSet ------------------------------------------------------------------
   
   describe ("set a property mechanism - propSet", function() {
      it ("should not wipeout Object prototype and be a mechanism", function() {
         var mech = M.propSet();
         expect(mech).to.have.property('toString');
      });
      
      it ("should have correct properties", function() {
         var mech = M.propSet();
         expect(mech).to.have.property('isMechanism');
         expect(mech.isMechanism).to.be.true;
      
         expect(mech).to.have.property('isNull');
         expect(mech.isNull).to.be.false;
      
         expect(mech).to.have.property('isPrimitive');
         expect(mech.isPrimitive).to.be.false;
      
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

          var mech2 = M.num(8);
          var mech3 = M.num(7);
          expect(mech2.v).to.equal(8);
          expect(mech3.v).to.equal(7);

          var mech = M.propSet("v", mech2, mech3, false );
          expect(mech.prop).to.equal("v");
          expect(mech.dest).to.equal(mech2);
          expect(mech.src).to.equal(7);
          expect(mech.itemGo).to.be.false;

          mech.go;
          expect(mech2.v).to.equal(7);

       });
       
       it ("sets the value of a valid item given a primitive value (function syntax)", function() {
          
          var mech2 = M.num(8);
          expect(mech2.v).to.equal(8);
          
          var mech = M.propSet( "v", mech2, 22, false );
          expect(mech.prop).to.equal("v");
          expect(mech.src).to.equal(22);
          expect(mech.dest).to.equal(mech2);
          expect(mech.itemGo).to.be.false;
          
          mech.go;
          expect(mech2.v).to.equal(22);

          var mech3 = M.p$s( "v", mech2, 22, false );
          expect(mech3.prop).to.equal("v");
          expect(mech3.src).to.equal(22);
          expect(mech3.dest).to.equal(mech2);
          expect(mech3.itemGo).to.be.false;
          
          mech3.go;
          expect(mech2.v).to.equal(22);
          
       });
      
   });

};



