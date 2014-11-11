// TODO: A lot more test coverage is required for parentPropSet
describe("set parent property mechanism - parentPropSet", function() {
	it("should not wipeout Object prototype and be a mechanism", function() {
		var mech = m.parentPropSet();
		expect(mech).to.have.property('toString');
		expect(m._.ParPropSetF).to.not.be.undefined;
	});

	it("should have correct properties", function() {
		var mech = m.parentPropSet();
		expect(mech.isMech).to.be.true;

		expect(mech).to.have.property('prop');
		expect(mech).to.have.property('_prop'); // imagined privacy

		expect(mech).to.have.property('src');
		expect(mech).to.have.property('_src'); // imagined privacy

		expect(mech).to.have.property('itemGo');
		expect(mech).to.have.property('_itemGo'); // imagined privacy
	});

	it("should have correct setting", function() {
		var mech = m.parentPropSet();

		expect(mech.prop).to.equal("");
		expect(mech.src).to.eql.null;
		expect(mech.dest).to.eql.null;
		expect(mech.itemGo).to.be.true;

		var mech2 = m.parentPropSet(null);
		expect(mech2.prop).to.equal("");
		expect(mech2.src).to.eql.null;
		expect(mech2.dest).to.eql.null;
		expect(mech2.itemGo).to.be.true;

		var mech3 = m.parentPropSet(null, null);
		expect(mech3.prop).to.equal("");
		expect(mech3.src).to.eql.null;
		expect(mech3.dest).to.eql.null;
		expect(mech3.itemGo).to.be.true;

		var mech4 = m.parentPropSet(null, null, null);
		expect(mech4.prop).to.equal("");
		expect(mech4.src).to.eql.null;
		expect(mech4.dest).to.eql.null;
		expect(mech4.itemGo).to.be.true;
	});

	it("should set _parDir of child mechanisms to parent", function() {
		var mech = m.num(1);
		var mech2 = m.num(2);
		var mech3 = m.parentPropSet(mech, mech2);
		expect(mech._parDir).to.equal(mech3);
		expect(mech2._parDir).to.equal(mech3);
	});

	it("correctly alters the value of the parent property using a primitive", function() {
		// Note partPropSet will overwrite itself for all of these tests.
		var mech2 = m.numM(m.parentPropSet("v", 2));
		expect(mech2.go).to.equal(2);
		expect(mech2._v).to.equal(2);

		var mech = m.numM(m.parentPropSet("v", 2));
		expect(mech.goNum).to.equal(2);
		expect(mech._v).to.equal(2);

		var mech3 = m.numM(m.parentPropSet("v", 2));
		expect(mech3.goStr).to.equal(2);
		expect(mech3._v).to.equal(2);

		var mech4 = m.numM(m.parentPropSet("v", 2));
		expect(mech4.goArr).to.contain(2);
		expect(mech4._v).to.equal(2);

		var mech5 = m.numM(m.parentPropSet("v", 2));
		expect(mech5.goBool).to.be.true;
		expect(mech5._v).to.equal(2);

		var mech6 = m.filter(m.numM(m.parentPropSet("fv", 2)));
		mech6.go;
		expect(mech6._fv).to.equal(2);

	});

	it("correctly handles setting of properties when null and undefined are used.", function() {
		// Note partPropSet will overwrite itself for all of these tests.

		var mech5 = m.numM(m.parentPropSet("v"));
		expect(mech5.go).to.equal(null); // calculated result
		expect(mech5.v).to.equal(0); // raw valueR

		var mech6 = m.numM(m.parentPropSet("v", null));
		expect(mech6.go).to.equal(null); // calculated result
		expect(mech6.v).to.equal(0); // raw value

		var mech = m.numM(m.parentPropSet("v"));
		expect(mech.goNum).to.equal(null); // calculated result
		expect(mech.v).to.equal(0); // raw value

		var mech2 = m.numM(m.parentPropSet("v", null));
		expect(mech2.goNum).to.equal(null); // calculated result
		expect(mech2.v).to.equal(0); // raw value

		var mech7 = m.strM(m.parentPropSet("v"));
		expect(mech7.goStr).to.equal(null); // calculated result
		expect(mech7.v).to.equal("null"); // raw value

		var mech8 = m.strM(m.parentPropSet("v", null));
		expect(mech8.goStr).to.equal(null); // calculated result
		expect(mech8.v).to.equal("null"); // raw value

		var mech9 = m.numM(m.parentPropSet("v"));
		expect(mech9.goArr[0]).to.equal(null); // calculated result
		expect(mech9.v).to.equal(0); // raw value

		var mech10 = m.numM(m.parentPropSet("v", null));
		expect(mech10.goArr[0]).to.equal(null); // calculated result
		expect(mech10.v).to.equal(0); // raw value

		var mech11 = m.strM(m.parentPropSet("v"));
		expect(mech11.goBool).to.be.false; // calculated result
		expect(mech11.v).to.eql.null; // raw value into false
		expect(mech11.goBool).to.be.false; // calculated result

		var mech12 = m.strM(m.parentPropSet("v", null));
		expect(mech12.goBool).to.be.false; // calculated result
		expect(mech12.v).to.eql.null; // raw value
		expect(mech12.goBool).to.be.false;
	});

	it("correctly alters the value of the parent property using mechanisms", function() {
		var mech2 = m.numM(m.parentPropSet("v", m.num(2)));
		expect(mech2.go).to.equal(2);
		expect(mech2._v).to.equal(2);

		var mech = m.numM(m.parentPropSet("v", m.num(3)));
		expect(mech.goNum).to.equal(3);
		expect(mech._v).to.equal(3);

		var mech3 = m.numM(m.parentPropSet("v", m.num(4)));
		expect(mech3.goStr).to.equal(4);
		expect(mech3._v).to.equal(4);

		var mech4 = m.numM(m.parentPropSet("v", m.num(5))); // Doesn't really test
		expect(mech4.goArr).to.contain(5);
		expect(mech4._v).to.equal(5);

		var mech5 = m.numM(m.parentPropSet("v", m.num(-1))); // Doesn't really test
		expect(mech5.goBool).to.be.false;
		expect(mech5._v).to.equal(-1);
	});

	it("correctly alters the value of the parent property by providing a reference to a mechanisms", function() {
		var mech11 = m.num(2);
		var mech = m.numM(m.parentPropSet("v", mech11, false));
		expect(mech.go).to.equal(mech11);
		expect(mech._v).to.equal(mech11);

		var mech2 = m.numM(m.parentPropSet("v", mech11, false));
		expect(mech2.goNum).to.equal(mech11);
		expect(mech2._v).to.equal(mech11);

		var mech3 = m.strM(m.parentPropSet("v", mech11, false));
		expect(mech3.goStr).to.equal(mech11);
		expect(mech3._v).to.equal(mech11);

		var mech4 = m.strM(m.parentPropSet("v", mech11, false));
		expect(mech4.goArr).to.contain(mech11);
		expect(mech4._v).to.equal(mech11);


		var mech5 = m.strM(m.parentPropSet("v", mech11, false));
		expect(mech5.goBool).to.be.false;
		expect(mech5._v).to.equal(mech11);
	});

	it("doesn't get unhappy when there is no parent.", function() {
		var mech = m.parentPropSet("v", 2);
		expect(mech.goNum).to.equal(2);
	});

	it("doesn't get unhappy when there is no property.", function() {
		var mech = m.parentPropSet("v2", 2);
		expect(mech.goNum).to.equal(2);
	});

	it("should cache the parent for speed", function() {
		var mech = m.parentPropSet("fv", 2);
		var mech2 = m.filter(m.numM(mech));
		expect(mech._parCach).to.eql(undefined);
		mech2.go;
		expect(mech2._fv).to.equal(2);
		expect(mech._parCache).to.not.equal(undefined);
	});

	it("should support a property that is a mechanism", function() {
		var mech6 = m.filter(m.numM(m.parentPropSet(m.str("fv"), 2)));
		mech6.go;
		expect(mech6._fv).to.equal(2);
	});

	it("should correctly set itemGo", function() {
		var mech = m.parentPropSet("fv", 2);
		expect(mech.itemGo).to.be.true;
		mech.itemGo = false;
		expect(mech.itemGo).to.be.false;
	});


});