describe("self mechanism - self", function() {

	it("should not wipeout Object prototype and be a mechanism", function() {
		var mech = m.self(this);
		expect(mech).to.have.property('toString');
		// expect(m._.selfF).to.not.eql(undefined);
	});

	it("should have correct properties", function() {
    debugger;
		var mech = m.self(this);
		expect(mech.isMech).to.be.true;
	});

});
