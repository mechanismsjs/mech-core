describe("filter mechanism - filter", function() {

	it("should not wipeout Object prototype and be a mechanism", function() {
		var mech = m.filter();
		expect(mech).to.have.property('toString');
		expect(m._.FilterF).to.not.eql(undefined);
	});

	it("should have correct properties", function() {
		var mech = m.filter(1);
		expect(mech.isMech).to.be.true;
	});

	it("should set _parDir of child mechanisms to parent", function() {
		var mech = m.num(1);
		var mech3 = m.filter(mech);
		expect(mech._parDir).to.equal(mech3);
	});

	it("should filter out odd numbers and find correct parent", function() {
		var filter = m.filter(
		  m.eqlNum(0,
		    m.modulus(
		      m.parentPropSet("fv", m.emitFromRange(1,2000,1,true)),
		      2
		    )
		  )
		);
		expect(filter.go).to.equal(2);
		expect(filter.go).to.equal(4);
		expect(filter.go).to.equal(6);
		expect(filter.go).to.equal(8);

		expect(filter.goNum).to.equal(10);
		expect(filter.goNum).to.equal(12);

		expect(filter.goStr).to.equal("14");
		expect(filter.goStr).to.equal("16");

		expect(filter.goArr).to.contain(18);
		expect(filter.goArr).to.contain(20);

		expect(filter.goBool).to.be.true;
		expect(filter.goBool).to.be.true;

		expect(filter.go).to.equal(26);
	});

	it("should not be unhappy when there is nothing to filter.", function() {
		var mech = m.filter();
		expect(mech.go).to.equal(undefined);
		expect(mech.goNum).to.equal(undefined);
		expect(mech.goStr).to.equal(undefined);
		expect(mech.goArr[0]).to.equal(undefined);
		expect(mech.goBool).to.be.false;

		var mech2 = m.filter(null);
		expect(mech2.go).to.equal(null);
		expect(mech2.goNum).to.equal(null);
		expect(mech2.goStr).to.equal(null);
		expect(mech2.goArr[0]).to.equal(null);
		expect(mech2.goBool).to.be.false;
	});

});