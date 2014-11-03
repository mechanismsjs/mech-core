describe ("get a property mechanism - propGet", function() {
   it ("should not wipeout Object prototype and be a mechanism", function() {
      var mech = m.propGet();
      expect(mech).to.have.property('toString');
      expect(m._.PropGetF).to.not.be.undefined;
   });

   it ("should have correct properties", function() {
      var mech = m.propGet();
      expect(mech.isMech).to.be.true;

      expect(mech).to.have.property('prop');
      expect(mech).to.have.property('_prop'); // imagined privacy
   
      expect(mech).to.have.property('itemGo');
      expect(mech).to.have.property('_itemGo'); // imagined privacy
   
      expect(mech).to.have.property('item');
      expect(mech).to.have.property('_item'); // imagined privacy

   });

   it ("propGet(): all values missing", function() {
      var mech = m.propGet();
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

   it ("propGet('isMech'): item is undefined", function() {
      var mech = m.propGet("isMech");
      expect(mech.itemGo).to.equal(true); // default
      expect(mech.prop).to.equal("isMech");
      expect(mech.item).to.equal(null);
      expect(mech.go).to.eql(null);
      expect(mech.goNum).to.eql(NaN);
      expect(mech.goStr).to.equal("");
      expect(mech.goArr[0]).to.eql(null);
      expect(mech.goArr).to.have.length(1);
      expect(mech.goBool).to.be.false;
   });

   it ("propGet('isMech', null, false): item is null", function() {
      var mech = m.propGet("isMech", null, false);
      expect(mech.itemGo).to.equal(false); // default
      expect(mech.prop).to.equal("isMech");
      expect(mech.item).to.equal(null);
      expect(mech.go).to.eql(null);
      expect(mech.goNum).to.eql(NaN);
      expect(mech.goStr).to.equal("");
      expect(mech.goArr[0]).to.eql(null);
      expect(mech.goArr).to.have.length(1);
      expect(mech.goBool).to.be.false;
   });

   it ("propGet('isMech', theItem, false): return the actual item", function() {
      var theItem = m.num();
   
      var mech = m.propGet("isMech", theItem, false);
      expect(mech.itemGo).to.equal(false); // default
      expect(mech.prop).to.equal("isMech");
      expect(mech.item).to.equal(theItem);
      expect(mech.go).to.be.true;
      expect(mech.goNum).to.equal(1);
      expect(mech.goStr).to.equal("true");
      expect(mech.goArr).to.contain(true);
      expect(mech.goArr).to.have.length(1);
      expect(mech.goBool).to.be.true;
   });

   it ("p$('isMech', item, false): returns the actual item", function() {
      var theItem = m.num();
   
      var mech = m.p$("isMech", theItem, false);
      expect(mech.itemGo).to.equal(false); // default
      expect(mech.prop).to.equal("isMech");
      expect(mech.item).to.equal(theItem);
      expect(mech.go).to.be.true;
      expect(mech.goNum).to.equal(1);
      expect(mech.goStr).to.equal("true");
      expect(mech.goArr).to.contain(true);
      expect(mech.goArr).to.have.length(1);
      expect(mech.goBool).to.be.true;
   });

   it ("propGet('go', item, false): returns correct values item not ran", function() {
      var theItem = m.num(8);
      var mech = m.propGet("go", theItem, false);
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
      var theItem = m.num(8);
      var mech = m.propGet( "blah", theItem, false );
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
      var mech = m.propGet("blah", null, false);
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

   it ("propGet( null, m.num(8), null ): undefined for bad property", function() {
      var mech = m.propGet( null, m.num(8), null );
      expect(mech.itemGo).to.equal(true);      
      expect(mech.prop).to.equal("");
      expect(mech.go).to.eql(undefined);
      expect(mech.goNum).to.eql(NaN);
      expect(mech.goStr).to.equal("");
      expect(mech.goArr[0]).to.eql(undefined);
      expect(mech.goArr).to.have.length(1);
      expect(mech.goBool).to.be.false;
   });

   it ("propGet(undefined, m.num(8), undefined): undefined for bad property", function() {
      var mech = m.propGet(undefined, m.num(8), undefined);
      expect(mech.itemGo).to.equal(true);      
      expect(mech.prop).to.equal("");
      expect(mech.go).to.eql(undefined);
      expect(mech.goNum).to.eql(NaN);
      expect(mech.goStr).to.equal("");
      expect(mech.goArr[0]).to.eql(undefined);
      expect(mech.goArr).to.have.length(1);
      expect(mech.goBool).to.be.false;
   });

   it ("propGet( m.str('go'), theItem, false ): property is mechanism", function() {
      var theItem = m.num(8);
      var mech = m.propGet( m.str("go"), theItem, false );
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

   it("m.propGet( m.str('go'), theItem, true ): runnig m.num as a mechanism so undefined", function() {
      var theItem = m.num(8);
      var mech = m.propGet( m.str("go"), theItem, true );
      expect(mech.itemGo).to.equal(true);
      expect(mech.prop).to.equal("go");
      expect(mech.item).to.equal(8);
      expect(mech.go).to.eql(undefined);
      expect(mech.goNum).to.eql(NaN);
      expect(mech.goStr).to.equal("");
      expect(mech.goArr[0]).to.eql(undefined);
      expect(mech.goArr).to.have.length(1);
      expect(mech.goBool).to.be.false;

      var mech2 = m.propGet( m.str("go"), theItem ); // default to true
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