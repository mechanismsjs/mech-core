describe("reduce mechanism - reduce", function() {

	it("should not wipeout Object prototype and be a mechanism", function() {
		var mech = m.reduce();
		expect(mech).to.have.property('toString');
		expect(m._.ReduceF).to.not.eql(undefined);
	});

	it("should have correct properties", function() {
		var mech = m.reduce(1);
		expect(mech.isMech).to.be.true;
	});

	it("should set _parDir of child mechanisms to parent", function() {
		var mech = m.num(1);
		var mech3 = m.reduce(mech);
		expect(mech._parDir).to.equal(mech3);
	});

	it("should reduce from a fixed size source using an algorithm", function() {
		var mech = m.reduce(
			m.add(null, m.emitFromArr([3, 7, 22, 21]))
		);
		expect(mech.go).to.equal(3 + 7 + 22 + 21);
		expect(mech.go).to.equal(3 + 7 + 22 + 21); // run 2nd time no problem

		var mech2 = m.reduce(
			m.sub(null, m.emitFromArr([3, 7, 22, 21]))
		);
		expect(mech2.go).to.equal(3 - 7 - 22 - 21);

		var mech3 = m.reduce(
			m.add(null, m.emitFromArr([9, 11, 7, null, 21])) // ignores null
		);
		expect(mech3.goNum).to.equal(9 + 11 + 7 + 21);
	});

	it("should reduce from unknown sized source using an algorithm", function() {
		var mech = m.reduce(
			m.add(null, m.emitFromArr([1, 5, 7, undefined, 22, 34, 56]))
		);
		expect(mech.go).to.equal(1 + 5 + 7); // stops at undefined
		expect(mech.go).to.equal(1 + 5 + 7 + 22 + 34 + 56); // run 2nd time no problem
	});

	it("should return undefined if not enough elements for the algorithm", function() {
		var mech = m.reduce(
			m.add(null, m.emitFromArr([]))
		);
		expect(mech.go).to.be.undefined;

		var mech2 = m.reduce(
			m.add(null, m.emitFromArr([4]))
		);
		expect(mech2.go).to.be.equal(4);

		var mech3 = m.reduce(
			m.add(null, m.emitFromArr([2, undefined, 5, 8]))
		);
		expect(mech3.go).to.be.equal(2);
		expect(mech3.go).to.be.equal(2 + 5 + 8); // continued
	});

	it("should not get unhappy when undefined and null are used", function() {
		var mech = m.reduce();
		expect(mech.go).to.be.undefined;

		var mech2 = m.reduce(null);
		expect(mech2.go).to.be.undefined;

		var mech3 = m.reduce(m.add());
		expect(mech3.go).to.be.undefined;

		var mech4 = m.reduce(m.add(null));
		expect(mech4.go).to.be.undefined;

		var mech5 = m.reduce(m.add(null, null)); 
		expect(mech5.go).to.be.undefined;

	});	

});