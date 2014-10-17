describe("string mechanism - str", function() {
   it ("should not wipeout Object prototype and be a mechanism", function() {
     var mech = m.str();
     expect(mech).to.have.property('toString');
     expect(m._.StrF).to.not.eql(undefined);
   });

   it ("should have correct properties", function() {
     var mech = m.str();
     expect(mech).to.have.property('isMech');
     expect(mech.isMech).to.be.true;
       
     expect(mech).to.have.property('isNull');
     expect(mech.isNull).to.be.false;
       
     expect(mech).to.have.property('isPrim');
     expect(mech.isPrim).to.be.true;
       
     expect(mech).to.have.property('v');
     expect(mech).to.have.property('_v'); // imagined privacy
   });

   it ("str() should have same behaivor as String() and equal ''", function() {
       var mech = m.str();
       expect(mech.v).to.equal("");
    
       expect(mech.go).to.equal("");
       expect(mech.goNum).to.equal(0);
       expect(mech.goStr).to.equal("");
       expect(mech.goArr).to.contain("");
       expect(mech.goArr).to.have.length(1);
       expect(mech.goBool).to.be.false;
    });

    it ("str(undefined) should have same behaivor as String(undefined) and equal 'undefined'", function() {
       var mech = m.str(undefined);
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
       var mech = m.str(null);
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
       var mech = m.str(NaN);
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
       var mech = m.str("Infinity");

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
       var mech = m.str("-Infinity");

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
       var mech = m.str("0");

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
        var mech = m.str(String('0'));
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
       var mech = m.str(new String('0'));
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
       var mech = m.str("");
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
       var mech = m.str("5");

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
       var mech = m.str(Number(5));
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
       var mech = m.str(new Number("5"));
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
       var mech = m.str(false);
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
       var mech = m.str(true);
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
       var mech = m.str("6");
       expect(mech.v).to.equal("6");

       expect(mech.go).to.equal("6");
       expect(mech.goNum).to.equal(6);
       expect(mech.goStr).to.equal("6");
       expect(mech.goArr).to.contain("6");
       expect(mech.goArr).to.have.length(1);
       expect(mech.goBool).to.be.true;

       var mech2 = m.str("8");
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
       var mech = m.str("notnum");
       expect(mech.v).to.equal("notnum");

       expect(mech.go).to.equal("notnum");
       expect(mech.goNum).to.eql(NaN);
       expect(mech.goStr).to.equal("notnum"); // retain original string value
       expect(mech.goArr).to.contain("notnum");
       expect(mech.goArr).to.have.length(1);
       expect(mech.goBool).to.be.false;
    });

    it ("str({q:5}) should have same behaivor as String({q:5}) and equal '[object Object]'", function() {
       var mech = m.str({q:5});
       expect(mech.v).to.equal("[object Object]");
     
       expect(mech.go).to.equal("[object Object]");
       expect(mech.goNum).to.eql(NaN);
       expect(mech.goStr).to.equal("[object Object]"); // retain original string value
       expect(mech.goArr).to.contain("[object Object]");
       expect(mech.goArr).to.have.length(1);
       expect(mech.goBool).to.be.false;
    });

    it ("can initialize with string numerical values", function() {
       var mech = m.str("1");
       expect(mech.v).to.equal("1");

       expect(mech.go).to.equal("1");
       expect(mech.goNum).to.equal(1);
       expect(mech.goStr).to.equal("1");
       expect(mech.goArr).to.contain("1");
       expect(mech.goArr).to.have.length(1);      
       expect(mech.goBool).to.be.true;
    });

});