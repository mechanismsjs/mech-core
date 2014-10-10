module.exports.go = function go(m, expect) {
   describe("multiply mechanism - div", function () {

      it ("should not wipeout Object prototype and be a mechanism", function() {
        var mech = m.div();
        expect(mech).to.have.property('toString');
        expect(m.DivF).to.not.eql(undefined);
      });
      
      it ("should have correct properties", function() {
        var mech = m.div();
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

      it ("div() should have same behaivor as dualArg() and equal 0", function() {
          var mech = m.div();
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
         var mech = m.div(NaN,NaN);
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
         var mech = m.div(NaN,NaN);
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
         var mech = m.div(NaN,NaN);
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
         var mech = m.div(0, 0);
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
         var mech = m.div(Infinity, Infinity);
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
         var mech = m.div(-Infinity, -Infinity);
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
         var mech = m.div(-Infinity, Infinity);
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
         var mech = m.div(10, -2);
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
         var mech = m.div(2, m.div(8, 4));
         expect(mech.l.v).to.equal(2);
         expect(mech.r.goNum).to.equal(2);

         expect(mech.go).to.equal(1);
         expect(mech.goNum).to.equal(1);
         expect(mech.goStr).to.equal("(2 / (8 / 4))");
         expect(mech.goArr).to.contain(1);
         expect(mech.goArr).to.have.length(1);
         expect(mech.goBool).to.be.true;

         var mech2 = m.div( m.div (m.num(3), m.num(-1) ), -1 );
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
         var mech = m.div("hi","hello");
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