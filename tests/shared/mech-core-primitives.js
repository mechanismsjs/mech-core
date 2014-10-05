var chai = require("chai");
var expect = chai.expect;

module.exports.go = function go(M) {

   // ==========================================================================
   // PRIMITIVES ===============================================================
   // ==========================================================================

   // mech ----------------------------------------------------------------------

   describe ("mechanism mechanism - mech", function() {
      it ("should not wipeout Object prototype and be a mechanism", function() {
        var mech = M.mech();
        expect(mech).to.have.property('toString');
      });
      it ("should have correct properties", function() {
        var mech = M.mech();
        expect(mech).to.have.property('isMechanism');
        expect(mech.isMechanism).to.be.true;  
     
        expect(mech).to.have.property('isNull');
        expect(mech.isNull).to.be.false;
     
        expect(mech).to.have.property('isPrimitive');
        expect(mech.isPrimitive).to.be.false;
     
      });
   });
   
   // num ----------------------------------------------------------------------
   
      describe ("number primitive mechanism - num", function() {
         it ("should not wipeout Object prototype and be a mechanism", function() {
           var mech = M.num();
           expect(mech).to.have.property('toString');
         });
         
         it ("should have correct properties", function() {
           var mech = M.num();
           expect(mech).to.have.property('isMechanism');
           expect(mech.isMechanism).to.be.true;
                   
           expect(mech).to.have.property('isNull');
           expect(mech.isNull).to.be.false;
                   
           expect(mech).to.have.property('isPrimitive');
           expect(mech.isPrimitive).to.be.true;
                   
           expect(mech).to.have.property('v');
           expect(mech).to.have.property('_v'); // imagined privacy
         });
   
         it ("num() should have same behaivor as Number() and equal 0", function() {
            var mech = M.num();
            expect(mech.v).to.equal(0);
         
            expect(mech.go).to.equal(0);
            expect(mech.goNum).to.equal(0);
            expect(mech.goStr).to.equal("0");
            expect(mech.goArr).to.contain(0);
            expect(mech.goArr).to.have.length(1);
            expect(mech.goBool).to.be.false;
         });
   
         it ("num(undefined) should have same behaivor as Number(undefined) and equal NaN", function() {
            var mech = M.num(undefined);
            expect(mech.v).to.eql(NaN);
             
            expect(mech.go).to.eql(NaN);
            expect(mech.goNum).to.eql(NaN);
            expect(mech.goStr).to.equal("NaN");
            expect(mech.goArr[0]).to.eql(NaN);
            expect(mech.goArr).to.have.length(1);      
            expect(mech.goBool).to.be.false;
            
            mech.v = undefined;
            expect(mech.v).to.eql(NaN);
         });
      
         it ("num(null) should have same behaivor as Number(null) and equal 0", function() {
            var mech = M.num(null);
            expect(mech.v).to.equal(0);
   
            expect(mech.go).to.equal(0);
            expect(mech.goNum).to.equal(0);
            expect(mech.goStr).to.equal("0");
            expect(mech.goArr).to.contain(0);
            expect(mech.goArr).to.have.length(1);      
            expect(mech.goBool).to.be.false; // positive infinity
   
            mech.v = null;
            expect(mech.v).to.equal(0);
         });   
   
         it ("num(NaN) should have same behaivor as Number(NaN) and equal NaN", function() {
            var mech = M.num(NaN);
            expect(mech.v).to.eql(NaN);

            expect(mech.go).to.eql(NaN);
            expect(mech.goNum).to.eql(NaN);
            expect(mech.goStr).to.equal("NaN");
            expect(mech.goArr[0]).to.eql(NaN);
            expect(mech.goArr).to.have.length(1);      
            expect(mech.goBool).to.be.false;
   
            mech.v = NaN;
            expect(mech.v).to.eql(NaN);
         });
   
         it ("num(Infinity) should have same behaivor as Number(Infinity) and equal Infinity", function() {
            var mech = M.num(Infinity);
            expect(mech.v).to.equal(Infinity);
         
            expect(mech.go).to.equal(Infinity);
            expect(mech.goNum).to.equal(Infinity);
            expect(mech.goStr).to.equal("Infinity");
            expect(mech.goArr).to.contain(Infinity);
            expect(mech.goArr).to.have.length(1);      
            expect(mech.goBool).to.be.true; // positive infinity
   
            mech.v = Infinity;
            expect(mech.v).to.equal(Infinity);
         });
   
         it ("num(-Infinity) should have same behaivor as Number(-Infinity) and equal -Infinity", function() {
            var mech = M.num(-Infinity);
            expect(mech.v).to.equal(-Infinity);
         
            expect(mech.go).to.equal(-Infinity);
            expect(mech.goNum).to.equal(-Infinity);
            expect(mech.goStr).to.equal("-Infinity");
            expect(mech.goArr).to.contain(-Infinity);
            expect(mech.goArr).to.have.length(1);      
            expect(mech.goBool).to.be.false; // positive infinity
   
            mech.v = -Infinity;
            expect(mech.v).to.equal(-Infinity);
         });
      
         it ("num(0) should have same behaivor as Number(0) and equal 0", function() {
            var mech = M.num(0);
            expect(mech.v).to.equal(0);
   
            expect(mech.go).to.equal(0);
            expect(mech.goNum).to.equal(0);
            expect(mech.goStr).to.equal("0");
            expect(mech.goArr).to.contain(0);
            expect(mech.goArr).to.have.length(1);      
            expect(mech.goBool).to.be.false;
   
            mech.v = 0;
            expect(mech.v).to.equal(0);
         });
   
         it ("num(Number(0)) should have same behaivor as Number(0) and equal 0", function() {
            var mech = M.num(Number(0));
            expect(mech.v).to.equal(0);
   
            expect(mech.go).to.equal(0);
            expect(mech.goNum).to.equal(0);
            expect(mech.goStr).to.equal("0");
            expect(mech.goArr).to.contain(0);
            expect(mech.goArr).to.have.length(1);      
            expect(mech.goBool).to.be.false;
   
            mech.v = 0;
            expect(mech.v).to.equal(0);
         });   
      
         it ("num(new Number(0)) should have same behaivor as Number(0) and equal 0", function() {
            var mech = M.num(new Number(0));
            expect(mech.v).to.equal(0);
   
            expect(mech.go).to.equal(0);
            expect(mech.goNum).to.equal(0);
            expect(mech.goStr).to.equal("0");
            expect(mech.goArr).to.contain(0);
            expect(mech.goArr).to.have.length(1);      
            expect(mech.goBool).to.be.false;
   
            mech.v = 0;
            expect(mech.v).to.equal(0);
         });
   
         it ("num('') should have same behaivor as Number('') and equal 0", function() {
            var mech = M.num("");
            expect(mech.v).to.equal(0);
   
            expect(mech.go).to.equal(0);
            expect(mech.goNum).to.equal(0);
            expect(mech.goStr).to.equal("0");
            expect(mech.goArr).to.contain(0);
            expect(mech.goArr).to.have.length(1);      
            expect(mech.goBool).to.be.false;
   
            mech.v = "";
            expect(mech.v).to.equal(0);
         });
   
         it ("num('5') should have same behaivor as Number('5') and equal 5", function() {
            var mech = M.num("5");
            expect(mech.v).to.equal(5);
   
            expect(mech.go).to.equal(5);
            expect(mech.goNum).to.equal(5);
            expect(mech.goStr).to.equal("5");
            expect(mech.goArr).to.contain(5);
            expect(mech.goArr).to.have.length(1);      
            expect(mech.goBool).to.be.true;
   
            mech.v = "6";
            expect(mech.v).to.equal(6);
         });
   
         it ("num(String('5')) should have same behaivor as Number(String('5')) and equal 5", function() {
            var mech = M.num(String("5"));
            expect(mech.v).to.equal(5);
   
            expect(mech.go).to.equal(5);
            expect(mech.goNum).to.equal(5);
            expect(mech.goStr).to.equal("5");
            expect(mech.goArr).to.contain(5);
            expect(mech.goArr).to.have.length(1);      
            expect(mech.goBool).to.be.true;
   
            mech.v = "5";
            expect(mech.v).to.equal(5);
         });   
   
         it ("num(new String('5')) should have same behaivor as Number(new String('5')) and equal 5", function() {
            var mech = M.num(new String("5"));
            expect(mech.v).to.equal(5);
   
            expect(mech.go).to.equal(5);
            expect(mech.goNum).to.equal(5);
            expect(mech.goStr).to.equal("5");
            expect(mech.goArr).to.contain(5);
            expect(mech.goArr).to.have.length(1);      
            expect(mech.goBool).to.be.true;
   
            mech.v = "6";
            expect(mech.v).to.equal(6);
         });   
   
         it ("num(false) should have same behaivor as Number(false) and equal 0", function() {
            var mech = M.num(false);
            expect(mech.v).to.equal(0);
   
            expect(mech.go).to.equal(0);
            expect(mech.goNum).to.equal(0);
            expect(mech.goStr).to.equal("0");
            expect(mech.goArr).to.contain(0);
            expect(mech.goArr).to.have.length(1);      
            expect(mech.goBool).to.be.false;
   
            mech.v = false;
            expect(mech.v).to.equal(0);
         });
   
         it ("num(true) should have same behaivor as Number(true) and equal 1", function() {
            var mech = M.num(true);
            expect(mech.v).to.equal(1);
   
            expect(mech.go).to.equal(1);
            expect(mech.goNum).to.equal(1);
            expect(mech.goStr).to.equal("1");
            expect(mech.goArr).to.contain(1);
            expect(mech.goArr).to.have.length(1);      
            expect(mech.goBool).to.be.true;
   
            mech.v = true;
            expect(mech.v).to.equal(1);
         });
   
         it ("num('notnum') should have same behaivor as Number('notnum') and equal NaN", function() {
            var mech = M.num("notnum");
            expect(mech.v).to.eql(NaN);
   
            expect(mech.go).to.eql(NaN);
            expect(mech.goNum).to.eql(NaN);
            expect(mech.goStr).to.equal("notnum"); // retain original string value
            expect(mech.goArr[0]).to.eql(NaN);
            expect(mech.goArr).to.have.length(1);
            expect(mech.goBool).to.be.false;
         });
   
         it ("num({q:5}) should have same behaivor as Number(baddata) and equal NaN", function() {
            var mech = M.num({q:5});
            expect(mech.v).to.eql(NaN);
   
            expect(mech.go).to.eql(NaN);
            expect(mech.goNum).to.eql(NaN);
            expect(mech.goStr).to.equal("[object Object]"); // retain original string value
            expect(mech.goArr[0]).to.eql(NaN);
            expect(mech.goArr).to.have.length(1);
            expect(mech.goBool).to.be.false;
         });
   
         it ("can initialize with string numerical values", function() {
            var mech = M.num("1");
            expect(mech.v).to.equal(1);
   
            expect(mech.go).to.equal(1);
            expect(mech.goNum).to.equal(1);
            expect(mech.goStr).to.equal("1");
            expect(mech.goArr).to.contain(1);
            expect(mech.goArr).to.have.length(1);      
            expect(mech.goBool).to.be.true;
         });
       
         it ("is unitless and can't change unit (except mech.prototype.unit = 'notnone')", function() {
            var mech = M.num ({ v:6 });
            expect(mech.unit).to.equal("");
            mech.unit = "other";
            expect(mech.unit).to.equal("");
         });
   
         it ("can NOT contain another mechanism", function() {
            var mech = M.num(M.num(6));
       
            expect(mech.v).to.not.equal(6);
            expect(mech.go).to.not.equal(6);
            expect(mech.goNum).to.not.equal(6);
            expect(mech.goStr).to.not.equal("6");
            expect(mech.goArr).to.not.contain(6);
            expect(mech.goArr).to.have.length(1);
            expect(mech.goBool).to.be.false;
         });
   });
   
   // numM ------------------------------------------------------------------
   
   describe ("number mechanism - numM", function() {
      it ("should not wipeout Object prototype and be a mechanism", function() {
        var mech = M.numM();
        expect(mech).to.have.property('toString');
      });
      
      it ("should have correct properties", function() {
        var mech = M.numM();
        expect(mech).to.have.property('isMechanism');
        expect(mech.isMechanism).to.be.true;
                
        expect(mech).to.have.property('isNull');
        expect(mech.isNull).to.be.false;
                
        expect(mech).to.have.property('isPrimitive');
        expect(mech.isPrimitive).to.be.true;
                
        expect(mech).to.have.property('v');
        expect(mech).to.have.property('_v'); // imagined privacy
      });
      
      it ("can contain another mechanism", function() {
         var mech = M.numM(M.num(6));
    
         expect(mech.v).to.equal(6);
         expect(mech.go).to.equal(6);
         expect(mech.goNum).to.equal(6);
         expect(mech.goStr).to.equal("6");
         expect(mech.goArr).to.contain(6);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.true;
      });
      
   });   

   // str ----------------------------------------------------------------------
   
   describe("string mechanism - str", function() {
      it ("should not wipeout Object prototype and be a mechanism", function() {
        var mech = M.str();
        expect(mech).to.have.property('toString');
      });
      
      it ("should have correct properties", function() {
        var mech = M.str();
        expect(mech).to.have.property('isMechanism');
        expect(mech.isMechanism).to.be.true;
                
        expect(mech).to.have.property('isNull');
        expect(mech.isNull).to.be.false;
                
        expect(mech).to.have.property('isPrimitive');
        expect(mech.isPrimitive).to.be.true;
                
        expect(mech).to.have.property('v');
        expect(mech).to.have.property('_v'); // imagined privacy
      });

      it ("str() should have same behaivor as String() and equal ''", function() {
          var mech = M.str();
          expect(mech.v).to.equal("");
             
          expect(mech.go).to.equal("");
          expect(mech.goNum).to.equal(0);
          expect(mech.goStr).to.equal("");
          expect(mech.goArr).to.contain("");
          expect(mech.goArr).to.have.length(1);
          expect(mech.goBool).to.be.false;
       });
   
       it ("str(undefined) should have same behaivor as String(undefined) and equal 'undefined'", function() {
          var mech = M.str(undefined);
          expect(mech.v).to.equal("undefined");
       
          expect(mech.go).to.equal("undefined");
          expect(mech.goNum).to.eql(NaN);
          expect(mech.goStr).to.equal("undefined");
          expect(mech.goArr).to.contain("undefined");
          expect(mech.goArr).to.have.length(1);      
          expect(mech.goBool).to.be.false;
       
          mech.v = undefined;
          expect(mech.v).to.equal("undefined");
       });
       
       it ("str(null) should have same behaivor as String(null) and equal 'null'", function() {
          var mech = M.str(null);
          expect(mech.v).to.equal("null");
       
          expect(mech.go).to.equal("null");
          expect(mech.goNum).to.eql(NaN);
          expect(mech.goStr).to.equal("null");
          expect(mech.goArr).to.contain("null");
          expect(mech.goArr).to.have.length(1);      
          expect(mech.goBool).to.be.false;
       
          mech.v = null;
          expect(mech.v).to.equal("null");
       });
       
       it ("str(NaN) should have same behaivor as String(NaN) and equal 'NaN'", function() {
          var mech = M.str(NaN);
          expect(mech.v).to.equal("NaN");
       
          expect(mech.go).to.equal("NaN");
          expect(mech.goNum).to.eql(NaN);
          expect(mech.goStr).to.equal("NaN");
          expect(mech.goArr).to.contain("NaN");
          expect(mech.goArr).to.have.length(1);      
          expect(mech.goBool).to.be.false;
       
          mech.v = NaN;
          expect(mech.v).to.equal("NaN");
       });
       
       it ("str(Infinity) should have same behaivor as String(Infinity) and equal 'Infinity'", function() {
          var mech = M.str("Infinity");
       
          expect(mech.v).to.equal("Infinity");
          expect(mech.go).to.equal("Infinity");
          expect(mech.goNum).to.equal(Infinity);
          expect(mech.goStr).to.equal("Infinity");
          expect(mech.goArr).to.contain("Infinity");
          expect(mech.goArr).to.have.length(1);      
          expect(mech.goBool).to.be.true; // positive infinity
       
          mech.v = "Infinity";
          expect(mech.v).to.equal("Infinity");
       });
       
       it ("str(-Infinity) should have same behaivor as String('-Infinity') and equal '-Infinity'", function() {
          var mech = M.str("-Infinity");
       
          expect(mech.v).to.equal("-Infinity");
          expect(mech.go).to.equal("-Infinity");
          expect(mech.goNum).to.equal(-Infinity);
          expect(mech.goStr).to.equal("-Infinity");
          expect(mech.goArr).to.contain("-Infinity");
          expect(mech.goArr).to.have.length(1);      
          expect(mech.goBool).to.be.false; // positive infinity
       
          mech.v = "-Infinity";
          expect(mech.v).to.equal("-Infinity");
       });
       
       it ("str('0') should have same behaivor as String('0') and equal '0'", function() {
          var mech = M.str("0");
       
          expect(mech.v).to.equal("0");
       
          expect(mech.go).to.equal("0");
          expect(mech.goNum).to.equal(0);
          expect(mech.goStr).to.equal("0");
          expect(mech.goArr).to.contain("0");
          expect(mech.goArr).to.have.length(1);      
          expect(mech.goBool).to.be.false;
       
          mech.v = "0";
          expect(mech.v).to.equal("0");
       });
       
       it ("str(String('0')) should have same behaivor as String('0') and equal '0'", function() {
           var mech = M.str(String('0'));
           expect(mech.v).to.equal("0");
        
           expect(mech.go).to.equal("0");
           expect(mech.goNum).to.equal(0);
           expect(mech.goStr).to.equal("0");
           expect(mech.goArr).to.contain("0");
           expect(mech.goArr).to.have.length(1);      
           expect(mech.goBool).to.be.false;
        
           mech.v = "0";
           expect(mech.v).to.equal("0");
        });
       
       it ("str(new String('0')) should have same behaivor as String('0') and equal '0'", function() {
          var mech = M.str(new String('0'));
          expect(mech.v).to.equal("0");
       
          expect(mech.go).to.equal("0");
          expect(mech.goNum).to.equal(0);
          expect(mech.goStr).to.equal("0");
          expect(mech.goArr).to.contain("0");
          expect(mech.goArr).to.have.length(1);      
          expect(mech.goBool).to.be.false;
       
          mech.v = "0";
          expect(mech.v).to.equal("0");
       });
   
       it ("str('') should have same behaivor as String('') and equal 0", function() {
          var mech = M.str("");
          expect(mech.v).to.equal("");
       
          expect(mech.go).to.equal("");
          expect(mech.goNum).to.equal(0);
          expect(mech.goStr).to.equal("");
          expect(mech.goArr).to.contain("");
          expect(mech.goArr).to.have.length(1);      
          expect(mech.goBool).to.be.false;
       
          mech.v = "";
          expect(mech.v).to.equal("");
       });
       
       it ("str('5') should have same behaivor as String('5') and equal '5'", function() {
          var mech = M.str("5");
       
          expect(mech.v).to.equal("5");
       
          expect(mech.go).to.equal("5");
          expect(mech.goNum).to.equal(5);
          expect(mech.goStr).to.equal("5");
          expect(mech.goArr).to.contain("5");
          expect(mech.goArr).to.have.length(1);      
          expect(mech.goBool).to.be.true;
       
          mech.v = "6";
          expect(mech.v).to.equal("6");
       });
       
       it ("str(Number(5)) should have same behaivor as String(Number(5)) and equal '5'", function() {
          var mech = M.str(Number(5));
          expect(mech.v).to.equal("5");
       
          expect(mech.go).to.equal("5");
          expect(mech.goNum).to.equal(5);
          expect(mech.goStr).to.equal("5");
          expect(mech.goArr).to.contain("5");
          expect(mech.goArr).to.have.length(1);      
          expect(mech.goBool).to.be.true;
       
          mech.v = "7";
          expect(mech.v).to.equal("7");
       });   
       
       it ("str(new Number('5')) should have same behaivor as String(new Number('5')) and equal '5'", function() {
          var mech = M.str(new Number("5"));
          expect(mech.v).to.equal("5");
       
          expect(mech.go).to.equal("5");
          expect(mech.goNum).to.equal(5);
          expect(mech.goStr).to.equal("5");
          expect(mech.goArr).to.contain("5");
          expect(mech.goArr).to.have.length(1);      
          expect(mech.goBool).to.be.true;
       
          mech.v = "6";
          expect(mech.v).to.equal("6");
       });   
       
       it ("str(false) should have same behaivor as String(false) and equal 'false'", function() {
          var mech = M.str(false);
          expect(mech.v).to.equal("false");
       
          expect(mech.go).to.equal("false");
          expect(mech.goNum).to.equal(0);
          expect(mech.goStr).to.equal("false");
          expect(mech.goArr).to.contain("false");
          expect(mech.goArr).to.have.length(1);      
          expect(mech.goBool).to.be.false;
       
          mech.v = false;
          expect(mech.v).to.equal("false");
       });
       
       it ("str(true) should have same behaivor as String(true) and equal 'true'", function() {
          var mech = M.str(true);
          expect(mech.v).to.equal("true");
       
          expect(mech.go).to.equal("true");
          expect(mech.goNum).to.equal(1);
          expect(mech.goStr).to.equal("true");
          expect(mech.goArr).to.contain("true");
          expect(mech.goArr).to.have.length(1);      
          expect(mech.goBool).to.be.true;
       
          mech.v = true;
          expect(mech.v).to.equal("true");
       });
       
       it ("should instantiate correctly when initialized with a primitive", function() {
          var mech = M.str("6");
          expect(mech.v).to.equal("6");
       
          expect(mech.go).to.equal("6");
          expect(mech.goNum).to.equal(6);
          expect(mech.goStr).to.equal("6");
          expect(mech.goArr).to.contain("6");
          expect(mech.goArr).to.have.length(1);
          expect(mech.goBool).to.be.true;
       
          var mech2 = M.str("8");
          expect(mech2.v).to.equal("8");
          expect(mech.v).to.equal("6"); // no global leak
       
          expect(mech2.go).to.equal("8");
          expect(mech2.goNum).to.equal(8);
          expect(mech2.goStr).to.equal("8");
          expect(mech2.goArr).to.contain("8");
          expect(mech2.goArr).to.have.length(1);      
          expect(mech2.goBool).to.be.true;
       });   
       
       it ("str('notnum') should have same behaivor as String('notnum') and equal 'notnum'", function() {
          var mech = M.str("notnum");
          expect(mech.v).to.equal("notnum");
       
          expect(mech.go).to.equal("notnum");
          expect(mech.goNum).to.eql(NaN);
          expect(mech.goStr).to.equal("notnum"); // retain original string value
          expect(mech.goArr).to.contain("notnum");
          expect(mech.goArr).to.have.length(1);
          expect(mech.goBool).to.be.false;
       });
       
       it ("str({q:5}) should have same behaivor as String({q:5}) and equal '[object Object]'", function() {
          var mech = M.str({q:5});
          expect(mech.v).to.equal("[object Object]");
              
          expect(mech.go).to.equal("[object Object]");
          expect(mech.goNum).to.eql(NaN);
          expect(mech.goStr).to.equal("[object Object]"); // retain original string value
          expect(mech.goArr).to.contain("[object Object]");
          expect(mech.goArr).to.have.length(1);
          expect(mech.goBool).to.be.false;
       });
       
       it ("can initialize with string numerical values", function() {
          var mech = M.str("1");
          expect(mech.v).to.equal("1");
       
          expect(mech.go).to.equal("1");
          expect(mech.goNum).to.equal(1);
          expect(mech.goStr).to.equal("1");
          expect(mech.goArr).to.contain("1");
          expect(mech.goArr).to.have.length(1);      
          expect(mech.goBool).to.be.true;
       });
   
   });
   
   
   // strM ------------------------------------------------------------------
   
   describe("string mechanism - str", function() {
      it ("should not wipeout Object prototype and be a mechanism", function() {
        var mech = M.strM();
        expect(mech).to.have.property('toString');
      });
      
      it ("should have correct properties", function() {
        var mech = M.strM();
        expect(mech).to.have.property('isMechanism');
        expect(mech.isMechanism).to.be.true;
                
        expect(mech).to.have.property('isNull');
        expect(mech.isNull).to.be.false;
                
        expect(mech).to.have.property('isPrimitive');
        expect(mech.isPrimitive).to.be.true;
                
        expect(mech).to.have.property('v');
        expect(mech).to.have.property('_v'); // imagined privacy
      });
       
      it ("can contain another mechanism", function() {
         var mech = M.strM(M.str("6"));
      
         expect(mech.v).to.equal("6");
         expect(mech.go).to.equal("6");
         expect(mech.goNum).to.equal(6);
         expect(mech.goStr).to.equal("6");
         expect(mech.goArr).to.contain("6");
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.true;
      });
   
   });

};



