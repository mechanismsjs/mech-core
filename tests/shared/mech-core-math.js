var chai = require("chai");
var expect = chai.expect;
module.exports.go = function go(M) {

   // ==========================================================================
   // MATH =====================================================================
   // ==========================================================================
   
   // dualArg ------------------------------------------------------------------

   describe("dual argument mechanism - dualArg", function() {
      it ("should not wipeout Object prototype and be a mechanism", function() {
        var mech = M.dualArg();
        expect(mech).to.have.property('toString');
      });
      
      it ("should have correct properties", function() {
        var mech = M.dualArg();
        expect(mech).to.have.property('isMechanism');
        expect(mech.isMechanism).to.be.true;
                
        expect(mech).to.have.property('isNull');
        expect(mech.isNull).to.be.false;
                
        expect(mech).to.have.property('isPrimitive');
        expect(mech.isPrimitive).to.be.false;
                
        expect(mech).to.have.property('l');
        expect(mech).to.have.property('_l'); // imagined privacy

        expect(mech).to.have.property('r');
        expect(mech).to.have.property('_r'); // imagined privacy

      });

      it ("dualArg() should be 0", function() {
          var mech = M.dualArg();
          expect(mech.l.v).to.eql(0);
          expect(mech.r.v).to.eql(0);
       });
     
      it ("dualArg(undefined) should be NaN", function() {
         var mech = M.dualArg(undefined);
         expect(mech.l.v).to.eql(NaN);
         expect(mech.r.v).to.eql(0);
      });
      
      it ("dualArg(NaN) should be 0", function() {
         var mech = M.dualArg(NaN);
         expect(mech.l.v).to.eql(NaN);
         expect(mech.r.v).to.eql(0);
      });
     
     it ("dualArg(Infinity) should be 0", function() {
        var mech = M.dualArg(Infinity);
        expect(mech.l.v).to.eql(Infinity);
        expect(mech.r.v).to.eql(0);
     });
      
      it ("dualArg(5) should be 0 and 0", function() {
         var mech = M.dualArg(5);
         expect(mech.l.v).to.eql(5);
         expect(mech.r.v).to.eql(0);
      });
     
      it ("dualArg(0) should be 0 and 0", function() {
         var mech = M.dualArg(0);
         expect(mech.l.v).to.eql(0);
         expect(mech.r.v).to.eql(0);
      });
     
      it ("dualArg(1,2) should be 1 and 2", function() {
         var mech = M.dualArg(1,2);
         expect(mech.l.v).to.eql(1);
         expect(mech.r.v).to.eql(2);
      });
     
      it ("dualArg('1','2') should be 1 and 2", function() {
         var mech = M.dualArg("1","2");
         expect(mech.l.v).to.eql(1);
         expect(mech.r.v).to.eql(2);
      });
     
      it ("dualArg(NaN,NaN) should be NaN and NaN", function() {
         var mech = M.dualArg(NaN,NaN);
         expect(mech.l.v).to.eql(NaN);
         expect(mech.r.v).to.eql(NaN);
      });

      it ("dualArg(null,null) should be NaN and NaN", function() {
         var mech = M.dualArg(null,null);
         expect(mech.l.v).to.eql(NaN);
         expect(mech.r.v).to.eql(NaN);
      });

      it ("dualArg(undefined,undefined) should be NaN and NaN", function() {
         var mech = M.dualArg(undefined,undefined);
         expect(mech.l.v).to.eql(NaN);
         expect(mech.r.v).to.eql(NaN);
      });

   });
   
   // add ----------------------------------------------------------------------

   describe("addition mechanism - add", function () {

      it ("should not wipeout Object prototype and be a mechanism", function() {
        var mech = M.add();
        expect(mech).to.have.property('toString');
      });
   
      it ("should have correct properties", function() {
        var mech = M.add();
        expect(mech).to.have.property('isMechanism');
        expect(mech.isMechanism).to.be.true;
             
        expect(mech).to.have.property('isNull');
        expect(mech.isNull).to.be.false;
             
        expect(mech).to.have.property('isPrimitive');
        expect(mech.isPrimitive).to.be.false;
             
        expect(mech).to.have.property('l');
        expect(mech).to.have.property('_l'); // imagined privacy

        expect(mech).to.have.property('r');
        expect(mech).to.have.property('_r'); // imagined privacy

      });
      
      it ("add() should have same behaivor as dualArg() and equal 0", function() {
         var mech = M.add();
         expect(mech.l.v).to.equal(0);
         expect(mech.r.v).to.equal(0);
      
         expect(mech.go).to.equal(0);
         expect(mech.goNum).to.equal(0);
         expect(mech.goStr).to.equal("(0 + 0)");
         expect(mech.goArr).to.contain(0);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });
      
      it ("should add(NaN,NaN) correctly", function() {
         var mech = M.add(NaN,NaN);
         expect(mech.l.v).to.eql(NaN);
         expect(mech.r.v).to.eql(NaN);
      
         expect(mech.go).to.eql(NaN);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("(NaN + NaN)");
         expect(mech.goArr[0]).to.eql(NaN);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });

      it ("should add(null,null) correctly", function() {
         var mech = M.add(NaN,NaN);
         expect(mech.l.v).to.eql(NaN);
         expect(mech.r.v).to.eql(NaN);
      
         expect(mech.go).to.eql(NaN);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("(NaN + NaN)");
         expect(mech.goArr[0]).to.eql(NaN);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });
      
      it ("should add(undefined,undefined) correctly", function() {
         var mech = M.add(NaN,NaN);
         expect(mech.l.v).to.eql(NaN);
         expect(mech.r.v).to.eql(NaN);
      
         expect(mech.go).to.eql(NaN);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("(NaN + NaN)");
         expect(mech.goArr[0]).to.eql(NaN);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });      

      it ("should add(0, 0) correctly", function() {
         var mech = M.add(0, 0);
         expect(mech.l.v).to.equal(0);
         expect(mech.r.v).to.equal(0);
      
         expect(mech.go).to.equal(0);
         expect(mech.goNum).to.equal(0);
         expect(mech.goStr).to.equal("(0 + 0)");
         expect(mech.goArr).to.contain(0);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });

      it ("should add(Infinity, Infinity) correctly", function() {
         var mech = M.add(Infinity, Infinity);
         expect(mech.l.v).to.equal(Infinity);
         expect(mech.r.v).to.equal(Infinity);
               
         expect(mech.go).to.equal(Infinity);
         expect(mech.goNum).to.equal(Infinity);
         expect(mech.goStr).to.equal("(Infinity + Infinity)");
         expect(mech.goArr).to.contain(Infinity);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.true;
      });

      it ("should add(-Infinity, -Infinity) correctly", function() {
         var mech = M.add(-Infinity, -Infinity);
         expect(mech.l.v).to.equal(-Infinity);
         expect(mech.r.v).to.equal(-Infinity);
               
         expect(mech.go).to.equal(-Infinity);
         expect(mech.goNum).to.equal(-Infinity);
         expect(mech.goStr).to.equal("(-Infinity + -Infinity)");
         expect(mech.goArr).to.contain(-Infinity);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });

      it ("should add(-Infinity, Infinity) correctly", function() {
         var mech = M.add(-Infinity, Infinity);
         expect(mech.l.v).to.equal(-Infinity);
         expect(mech.r.v).to.equal(Infinity);
               
         expect(mech.go).to.eql(NaN);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("(-Infinity + Infinity)");
         expect(mech.goArr[0]).to.eql(NaN);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });

      it ("should add(1, 5) correctly", function() {
         var mech = M.add(1, 5);
         expect(mech.l.v).to.equal(1);
         expect(mech.r.v).to.equal(5);
      
         expect(mech.go).to.equal(6);
         expect(mech.goNum).to.equal(6);
         expect(mech.goStr).to.equal("(1 + 5)");
         expect(mech.goArr).to.contain(6);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.true;
      });

      it ("should add nested operations correctly", function() {
         var mech = M.add(1, M.add(3, 4));
         expect(mech.l.v).to.equal(1);
         expect(mech.r.goNum).to.equal(7);
      
         expect(mech.go).to.equal(8);
         expect(mech.goNum).to.equal(8);
         expect(mech.goStr).to.equal("(1 + (3 + 4))");
         expect(mech.goArr).to.contain(8);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.true;
         
         var mech2 = M.add( M.add (M.num(3), M.num(-1) ), -1 );
         expect(mech2.l.goNum).to.equal(2);
         expect(mech2.r.v).to.equal(-1);
      
         expect(mech2.go).to.equal(1);
         expect(mech2.goNum).to.equal(1);
         expect(mech2.goStr).to.equal("((3 + -1) + -1)");
         expect(mech2.goArr).to.contain(1);
         expect(mech2.goArr).to.have.length(1);
         expect(mech2.goBool).to.be.true;
      });

      it ("should add('hi','hello') correctly", function() {
         var mech = M.add("hi","hello");
         expect(mech.l.v).to.eql(NaN);
         expect(mech.r.v).to.eql(NaN);
      
         expect(mech.go).to.eql(NaN);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("(hi + hello)");
         expect(mech.goArr[0]).to.eql(NaN);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });      

   });
   
   // sub ----------------------------------------------------------------------

    describe("subtraction mechanism - sub", function () {

       it ("should not wipeout Object prototype and be a mechanism", function() {
         var mech = M.sub();
         expect(mech).to.have.property('toString');
       });

       it ("should have correct properties", function() {
         var mech = M.sub();
         expect(mech).to.have.property('isMechanism');
         expect(mech.isMechanism).to.be.true;

         expect(mech).to.have.property('isNull');
         expect(mech.isNull).to.be.false;

         expect(mech).to.have.property('isPrimitive');
         expect(mech.isPrimitive).to.be.false;

         expect(mech).to.have.property('l');
         expect(mech).to.have.property('_l'); // imagined privacy

         expect(mech).to.have.property('r');
         expect(mech).to.have.property('_r'); // imagined privacy

       });

       it ("sub() should have same behaivor as dualArg() and equal 0", function() {
          var mech = M.sub();
          expect(mech.l.v).to.equal(0);
          expect(mech.r.v).to.equal(0);

          expect(mech.go).to.equal(0);
          expect(mech.goNum).to.equal(0);
          expect(mech.goStr).to.equal("(0 - 0)");
          expect(mech.goArr).to.contain(0);
          expect(mech.goArr).to.have.length(1);
          expect(mech.goBool).to.be.false;
       });

       it ("should sub(NaN,NaN) correctly", function() {
          var mech = M.sub(NaN,NaN);
          expect(mech.l.v).to.eql(NaN);
          expect(mech.r.v).to.eql(NaN);

          expect(mech.go).to.eql(NaN);
          expect(mech.goNum).to.eql(NaN);
          expect(mech.goStr).to.equal("(NaN - NaN)");
          expect(mech.goArr[0]).to.eql(NaN);
          expect(mech.goArr).to.have.length(1);
          expect(mech.goBool).to.be.false;
       });

       it ("should sub(null,null) correctly", function() {
          var mech = M.sub(NaN,NaN);
          expect(mech.l.v).to.eql(NaN);
          expect(mech.r.v).to.eql(NaN);

          expect(mech.go).to.eql(NaN);
          expect(mech.goNum).to.eql(NaN);
          expect(mech.goStr).to.equal("(NaN - NaN)");
          expect(mech.goArr[0]).to.eql(NaN);
          expect(mech.goArr).to.have.length(1);
          expect(mech.goBool).to.be.false;
       });

       it ("should sub(undefined,undefined) correctly", function() {
          var mech = M.sub(NaN,NaN);
          expect(mech.l.v).to.eql(NaN);
          expect(mech.r.v).to.eql(NaN);

          expect(mech.go).to.eql(NaN);
          expect(mech.goNum).to.eql(NaN);
          expect(mech.goStr).to.equal("(NaN - NaN)");
          expect(mech.goArr[0]).to.eql(NaN);
          expect(mech.goArr).to.have.length(1);
          expect(mech.goBool).to.be.false;
       });      

       it ("should sub(0, 0) correctly", function() {
          var mech = M.sub(0, 0);
          expect(mech.l.v).to.equal(0);
          expect(mech.r.v).to.equal(0);

          expect(mech.go).to.equal(0);
          expect(mech.goNum).to.equal(0);
          expect(mech.goStr).to.equal("(0 - 0)");
          expect(mech.goArr).to.contain(0);
          expect(mech.goArr).to.have.length(1);
          expect(mech.goBool).to.be.false;
       });

       it ("should sub(Infinity, Infinity) correctly", function() {
          var mech = M.sub(Infinity, Infinity);
          expect(mech.l.v).to.equal(Infinity);
          expect(mech.r.v).to.equal(Infinity);
                 
          expect(mech.go).to.eql(NaN);
          expect(mech.goNum).to.eql(NaN);
          expect(mech.goStr).to.equal("(Infinity - Infinity)");
          expect(mech.goArr[0]).to.eql(NaN);
          expect(mech.goArr).to.have.length(1);
          expect(mech.goBool).to.be.false;
       });
       
       it ("should sub(-Infinity, -Infinity) correctly", function() {
          var mech = M.sub(-Infinity, -Infinity);
          expect(mech.l.v).to.equal(-Infinity);
          expect(mech.r.v).to.equal(-Infinity);
       
          expect(mech.go).to.eql(NaN);
          expect(mech.goNum).to.eql(NaN);
          expect(mech.goStr).to.equal("(-Infinity - -Infinity)");
          expect(mech.goArr[0]).to.eql(NaN);
          expect(mech.goArr).to.have.length(1);
          expect(mech.goBool).to.be.false;
       });
       
       it ("should sub(-Infinity, Infinity) correctly", function() {
          var mech = M.sub(-Infinity, Infinity);
          expect(mech.l.v).to.equal(-Infinity);
          expect(mech.r.v).to.equal(Infinity);
       
          expect(mech.go).to.equal(-Infinity);
          expect(mech.goNum).to.equal(-Infinity);
          expect(mech.goStr).to.equal("(-Infinity - Infinity)");
          expect(mech.goArr).to.contain(-Infinity);
          expect(mech.goArr).to.have.length(1);
          expect(mech.goBool).to.be.false;
       });
       
       it ("should sub(1, 5) correctly", function() {
          var mech = M.sub(1, 5);
          expect(mech.l.v).to.equal(1);
          expect(mech.r.v).to.equal(5);
       
          expect(mech.go).to.equal(-4);
          expect(mech.goNum).to.equal(-4);
          expect(mech.goStr).to.equal("(1 - 5)");
          expect(mech.goArr).to.contain(-4);
          expect(mech.goArr).to.have.length(1);
          expect(mech.goBool).to.be.false;
       });
       
       it ("should sub nested operations correctly", function() {
          var mech = M.sub(1, M.sub(3, 4));
          expect(mech.l.v).to.equal(1);
          expect(mech.r.goNum).to.equal(-1);
       
          expect(mech.go).to.equal(2);
          expect(mech.goNum).to.equal(2);
          expect(mech.goStr).to.equal("(1 - (3 - 4))");
          expect(mech.goArr).to.contain(2);
          expect(mech.goArr).to.have.length(1);
          expect(mech.goBool).to.be.true;
       
          var mech2 = M.sub( M.sub (M.num(3), M.num(-1) ), -1 );
          expect(mech2.l.goNum).to.equal(4);
          expect(mech2.r.v).to.equal(-1);
       
          expect(mech2.go).to.equal(5);
          expect(mech2.goNum).to.equal(5);
          expect(mech2.goStr).to.equal("((3 - -1) - -1)");
          expect(mech2.goArr).to.contain(5);
          expect(mech2.goArr).to.have.length(1);
          expect(mech2.goBool).to.be.true;
       });
       
       it ("should sub('hi','hello') correctly", function() {
          var mech = M.sub("hi","hello");
          expect(mech.l.v).to.eql(NaN);
          expect(mech.r.v).to.eql(NaN);
       
          expect(mech.go).to.eql(NaN);
          expect(mech.goNum).to.eql(NaN);
          expect(mech.goStr).to.equal("(hi - hello)");
          expect(mech.goArr[0]).to.eql(NaN);
          expect(mech.goArr).to.have.length(1);
          expect(mech.goBool).to.be.false;
       });      

    });

    // mul ----------------------------------------------------------------------

     describe("multiply mechanism - mul", function () {

        it ("should not wipeout Object prototype and be a mechanism", function() {
          var mech = M.mul();
          expect(mech).to.have.property('toString');
        });

        it ("should have correct properties", function() {
          var mech = M.mul();
          expect(mech).to.have.property('isMechanism');
          expect(mech.isMechanism).to.be.true;

          expect(mech).to.have.property('isNull');
          expect(mech.isNull).to.be.false;

          expect(mech).to.have.property('isPrimitive');
          expect(mech.isPrimitive).to.be.false;

          expect(mech).to.have.property('l');
          expect(mech).to.have.property('_l'); // imagined privacy

          expect(mech).to.have.property('r');
          expect(mech).to.have.property('_r'); // imagined privacy

        });

        it ("mul() should have same behaivor as dualArg() and equal 0", function() {
           var mech = M.mul();
           expect(mech.l.v).to.equal(0);
           expect(mech.r.v).to.equal(0);

           expect(mech.go).to.equal(0);
           expect(mech.goNum).to.equal(0);
           expect(mech.goStr).to.equal("(0 * 0)");
           expect(mech.goArr).to.contain(0);
           expect(mech.goArr).to.have.length(1);
           expect(mech.goBool).to.be.false;
        });

        it ("should mul(NaN,NaN) correctly", function() {
           var mech = M.mul(NaN,NaN);
           expect(mech.l.v).to.eql(NaN);
           expect(mech.r.v).to.eql(NaN);

           expect(mech.go).to.eql(NaN);
           expect(mech.goNum).to.eql(NaN);
           expect(mech.goStr).to.equal("(NaN * NaN)");
           expect(mech.goArr[0]).to.eql(NaN);
           expect(mech.goArr).to.have.length(1);
           expect(mech.goBool).to.be.false;
        });

        it ("should mul(null,null) correctly", function() {
           var mech = M.mul(NaN,NaN);
           expect(mech.l.v).to.eql(NaN);
           expect(mech.r.v).to.eql(NaN);

           expect(mech.go).to.eql(NaN);
           expect(mech.goNum).to.eql(NaN);
           expect(mech.goStr).to.equal("(NaN * NaN)");
           expect(mech.goArr[0]).to.eql(NaN);
           expect(mech.goArr).to.have.length(1);
           expect(mech.goBool).to.be.false;
        });

        it ("should mul(undefined,undefined) correctly", function() {
           var mech = M.mul(NaN,NaN);
           expect(mech.l.v).to.eql(NaN);
           expect(mech.r.v).to.eql(NaN);

           expect(mech.go).to.eql(NaN);
           expect(mech.goNum).to.eql(NaN);
           expect(mech.goStr).to.equal("(NaN * NaN)");
           expect(mech.goArr[0]).to.eql(NaN);
           expect(mech.goArr).to.have.length(1);
           expect(mech.goBool).to.be.false;
        });      

        it ("should mul(0, 0) correctly", function() {
           var mech = M.mul(0, 0);
           expect(mech.l.v).to.equal(0);
           expect(mech.r.v).to.equal(0);

           expect(mech.go).to.equal(0);
           expect(mech.goNum).to.equal(0);
           expect(mech.goStr).to.equal("(0 * 0)");
           expect(mech.goArr).to.contain(0);
           expect(mech.goArr).to.have.length(1);
           expect(mech.goBool).to.be.false;
        });

        it ("should mul(Infinity, Infinity) correctly", function() {
           var mech = M.mul(Infinity, Infinity);
           expect(mech.l.v).to.equal(Infinity);
           expect(mech.r.v).to.equal(Infinity);
        
           expect(mech.go).to.equal(Infinity);
           expect(mech.goNum).to.equal(Infinity);
           expect(mech.goStr).to.equal("(Infinity * Infinity)");
           expect(mech.goArr[0]).to.equal(Infinity);
           expect(mech.goArr).to.have.length(1);
           expect(mech.goBool).to.be.true;
        });
        
        it ("should mul(-Infinity, -Infinity) correctly", function() {
           var mech = M.mul(-Infinity, -Infinity);
           expect(mech.l.v).to.equal(-Infinity);
           expect(mech.r.v).to.equal(-Infinity);
        
           expect(mech.go).to.equal(Infinity);
           expect(mech.goNum).to.equal(Infinity);
           expect(mech.goStr).to.equal("(-Infinity * -Infinity)");
           expect(mech.goArr[0]).to.equal(Infinity);
           expect(mech.goArr).to.have.length(1);
           expect(mech.goBool).to.be.true;
        });
        
        it ("should mul(-Infinity, Infinity) correctly", function() {
           var mech = M.mul(-Infinity, Infinity);
           expect(mech.l.v).to.equal(-Infinity);
           expect(mech.r.v).to.equal(Infinity);
        
           expect(mech.go).to.equal(-Infinity);
           expect(mech.goNum).to.equal(-Infinity);
           expect(mech.goStr).to.equal("(-Infinity * Infinity)");
           expect(mech.goArr).to.contain(-Infinity);
           expect(mech.goArr).to.have.length(1);
           expect(mech.goBool).to.be.false;
        });
        
        it ("should mul(2, 5) correctly", function() {
           var mech = M.mul(2, 5);
           expect(mech.l.v).to.equal(2);
           expect(mech.r.v).to.equal(5);
        
           expect(mech.go).to.equal(10);
           expect(mech.goNum).to.equal(10);
           expect(mech.goStr).to.equal("(2 * 5)");
           expect(mech.goArr).to.contain(10);
           expect(mech.goArr).to.have.length(1);
           expect(mech.goBool).to.be.true;
        });
        
        it ("should mul nested operations correctly", function() {
            var mech = M.mul(1, M.mul(3, 4));
            expect(mech.l.v).to.equal(1);
            expect(mech.r.goNum).to.equal(12);

            expect(mech.go).to.equal(12);
            expect(mech.goNum).to.equal(12);
            expect(mech.goStr).to.equal("(1 * (3 * 4))");
            expect(mech.goArr).to.contain(12);
            expect(mech.goArr).to.have.length(1);
            expect(mech.goBool).to.be.true;

            var mech2 = M.mul( M.mul (M.num(3), M.num(-1) ), -1 );
            expect(mech2.l.goNum).to.equal(-3);
            expect(mech2.r.v).to.equal(-1);

            expect(mech2.go).to.equal(3);
            expect(mech2.goNum).to.equal(3);
            expect(mech2.goStr).to.equal("((3 * -1) * -1)");
            expect(mech2.goArr).to.contain(3);
            expect(mech2.goArr).to.have.length(1);
            expect(mech2.goBool).to.be.true;
         });
        
        it ("should mul('hi','hello') correctly", function() {
           var mech = M.mul("hi","hello");
           expect(mech.l.v).to.eql(NaN);
           expect(mech.r.v).to.eql(NaN);
        
           expect(mech.go).to.eql(NaN);
           expect(mech.goNum).to.eql(NaN);
           expect(mech.goStr).to.equal("(hi * hello)");
           expect(mech.goArr[0]).to.eql(NaN);
           expect(mech.goArr).to.have.length(1);
           expect(mech.goBool).to.be.false;
        });      

     });

    // div ----------------------------------------------------------------------

   describe("multiply mechanism - div", function () {

      it ("should not wipeout Object prototype and be a mechanism", function() {
        var mech = M.div();
        expect(mech).to.have.property('toString');
      });
      
      it ("should have correct properties", function() {
        var mech = M.div();
        expect(mech).to.have.property('isMechanism');
        expect(mech.isMechanism).to.be.true;
      
        expect(mech).to.have.property('isNull');
        expect(mech.isNull).to.be.false;
      
        expect(mech).to.have.property('isPrimitive');
        expect(mech.isPrimitive).to.be.false;
      
        expect(mech).to.have.property('l');
        expect(mech).to.have.property('_l'); // imagined privacy
      
        expect(mech).to.have.property('r');
        expect(mech).to.have.property('_r'); // imagined privacy
      
      });

      it ("div() should have same behaivor as dualArg() and equal 0", function() {
          var mech = M.div();
          expect(mech.l.v).to.equal(0);
          expect(mech.r.v).to.equal(0);

          expect(mech.go).to.eql(NaN);
          expect(mech.goNum).to.eql(NaN);
          expect(mech.goStr).to.equal("(0 / 0)");
          expect(mech.goArr[0]).to.eql(NaN);
          expect(mech.goArr).to.have.length(1);
          expect(mech.goBool).to.be.false;
      });

      it ("should div(NaN,NaN) correctly", function() {
         var mech = M.div(NaN,NaN);
         expect(mech.l.v).to.eql(NaN);
         expect(mech.r.v).to.eql(NaN);

         expect(mech.go).to.eql(NaN);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("(NaN / NaN)");
         expect(mech.goArr[0]).to.eql(NaN);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });

      it ("should div(null,null) correctly", function() {
         var mech = M.div(NaN,NaN);
         expect(mech.l.v).to.eql(NaN);
         expect(mech.r.v).to.eql(NaN);

         expect(mech.go).to.eql(NaN);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("(NaN / NaN)");
         expect(mech.goArr[0]).to.eql(NaN);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });

      it ("should div(undefined,undefined) correctly", function() {
         var mech = M.div(NaN,NaN);
         expect(mech.l.v).to.eql(NaN);
         expect(mech.r.v).to.eql(NaN);

         expect(mech.go).to.eql(NaN);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("(NaN / NaN)");
         expect(mech.goArr[0]).to.eql(NaN);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });      

      it ("should div(0, 0) correctly", function() {
         var mech = M.div(0, 0);
         expect(mech.l.v).to.equal(0);
         expect(mech.r.v).to.equal(0);

         expect(mech.go).to.eql(NaN);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("(0 / 0)");
         expect(mech.goArr[0]).to.eql(NaN);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });

      it ("should div(Infinity, Infinity) correctly", function() {
         var mech = M.div(Infinity, Infinity);
         expect(mech.l.v).to.equal(Infinity);
         expect(mech.r.v).to.equal(Infinity);

         expect(mech.go).to.eql(NaN);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("(Infinity / Infinity)");
         expect(mech.goArr[0]).to.eql(NaN);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });

      it ("should div(-Infinity, -Infinity) correctly", function() {
         var mech = M.div(-Infinity, -Infinity);
         expect(mech.l.v).to.equal(-Infinity);
         expect(mech.r.v).to.equal(-Infinity);

         expect(mech.go).to.eql(NaN);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("(-Infinity / -Infinity)");
         expect(mech.goArr[0]).to.eql(NaN);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });

      it ("should div(-Infinity, Infinity) correctly", function() {
         var mech = M.div(-Infinity, Infinity);
         expect(mech.l.v).to.equal(-Infinity);
         expect(mech.r.v).to.equal(Infinity);

         expect(mech.go).to.eql(NaN);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("(-Infinity / Infinity)");
         expect(mech.goArr[0]).to.eql(NaN);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });

      it ("should div(10, -2) correctly", function() {
         var mech = M.div(10, -2);
         expect(mech.l.v).to.equal(10);
         expect(mech.r.v).to.equal(-2);

         expect(mech.go).to.equal(-5);
         expect(mech.goNum).to.equal(-5);
         expect(mech.goStr).to.equal("(10 / -2)");
         expect(mech.goArr).to.contain(-5);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });

      it ("should div nested operations correctly", function() {
         var mech = M.div(2, M.div(8, 4));
         expect(mech.l.v).to.equal(2);
         expect(mech.r.goNum).to.equal(2);

         expect(mech.go).to.equal(1);
         expect(mech.goNum).to.equal(1);
         expect(mech.goStr).to.equal("(2 / (8 / 4))");
         expect(mech.goArr).to.contain(1);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.true;

         var mech2 = M.div( M.div (M.num(3), M.num(-1) ), -1 );
         expect(mech2.l.goNum).to.equal(-3);
         expect(mech2.r.v).to.equal(-1);
         
         expect(mech2.go).to.equal(3);
         expect(mech2.goNum).to.equal(3);
         expect(mech2.goStr).to.equal("((3 / -1) / -1)");
         expect(mech2.goArr).to.contain(3);
         expect(mech2.goArr).to.have.length(1);
         expect(mech2.goBool).to.be.true;
      });

      it ("should div('hi','hello') correctly", function() {
         var mech = M.div("hi","hello");
         expect(mech.l.v).to.eql(NaN);
         expect(mech.r.v).to.eql(NaN);

         expect(mech.go).to.eql(NaN);
         expect(mech.goNum).to.eql(NaN);
         expect(mech.goStr).to.equal("(hi / hello)");
         expect(mech.goArr[0]).to.eql(NaN);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.false;
      });

   });
};



