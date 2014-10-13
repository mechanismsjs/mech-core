describe ("number primitive mechanism - num", function() {
   it ("should not wipeout Object prototype and be a mechanism", function() {
     var mech = m.num();
     expect(mech).to.have.property('toString');
     expect (m.NumF).to.not.eql(undefined);
   });

   it ("should have correct properties", function() {
     var mech = m.num();
     expect(mech).to.have.property('isMech');
     expect(mech.isMech).to.be.true;
       
     expect(mech).to.have.property('isNull');
     expect(mech.isNull).to.be.false;
       
     expect(mech).to.have.property('isPrim');
     expect(mech.isPrim).to.be.true;
       
     expect(mech).to.have.property('v');
     expect(mech).to.have.property('_v'); // imagined privacy
   });

   it ("num() should have same behaivor as Number() and equal 0", function() {
      var mech = m.num();
      expect(mech.v).to.equal(0);

      expect(mech.go).to.equal(0);
      expect(mech.goNum).to.equal(0);
      expect(mech.goStr).to.equal("0");
      expect(mech.goArr).to.contain(0);
      expect(mech.goArr).to.have.length(1);
      expect(mech.goBool).to.be.false;
   });

   it ("num(undefined) should have same behaivor as Number(undefined) and equal NaN", function() {
      var mech = m.num(undefined);
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
      var mech = m.num(null);
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
      var mech = m.num(NaN);
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
      var mech = m.num(Infinity);
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
      var mech = m.num(-Infinity);
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
      var mech = m.num(0);
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
      var mech = m.num(Number(0));
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
      var mech = m.num(new Number(0));
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
      var mech = m.num("");
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
      var mech = m.num("5");
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
      var mech = m.num(String("5"));
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
      var mech = m.num(new String("5"));
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
      var mech = m.num(false);
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
      var mech = m.num(true);
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
      var mech = m.num("notnum");
      expect(mech.v).to.eql(NaN);

      expect(mech.go).to.eql(NaN);
      expect(mech.goNum).to.eql(NaN);
      expect(mech.goStr).to.equal("notnum"); // retain original string value
      expect(mech.goArr[0]).to.eql(NaN);
      expect(mech.goArr).to.have.length(1);
      expect(mech.goBool).to.be.false;
   });

   it ("num({q:5}) should have same behaivor as Number(baddata) and equal NaN", function() {
      var mech = m.num({q:5});
      expect(mech.v).to.eql(NaN);

      expect(mech.go).to.eql(NaN);
      expect(mech.goNum).to.eql(NaN);
      expect(mech.goStr).to.equal("[object Object]"); // retain original string value
      expect(mech.goArr[0]).to.eql(NaN);
      expect(mech.goArr).to.have.length(1);
      expect(mech.goBool).to.be.false;
   });

   it ("can initialize with string numerical values", function() {
      var mech = m.num("1");
      expect(mech.v).to.equal(1);

      expect(mech.go).to.equal(1);
      expect(mech.goNum).to.equal(1);
      expect(mech.goStr).to.equal("1");
      expect(mech.goArr).to.contain(1);
      expect(mech.goArr).to.have.length(1);      
      expect(mech.goBool).to.be.true;
   });

   it ("is unitless and can't change unit (except mech.prototype.unit = 'notnone')", function() {
      var mech = m.num ({ v:6 });
      expect(mech.unit).to.equal("");
      // mech.unit = "other"; -- TODO: This fails under headless phantom testing but it shouldn't (only has a get defined). Need to figure out why.
      expect(mech.unit).to.equal("");
   });

   it ("can NOT contain another mechanism", function() {
      var mech = m.num(m.num(6));

      expect(mech.v).to.not.equal(6);
      expect(mech.go).to.not.equal(6);
      expect(mech.goNum).to.not.equal(6);
      expect(mech.goStr).to.not.equal("6");
      expect(mech.goArr).to.not.contain(6);
      expect(mech.goArr).to.have.length(1);
      expect(mech.goBool).to.be.false;
   });
});