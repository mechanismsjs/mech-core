describe("write a line of text to the console - writeLn", function() {
  it("should not wipeout Object prototype and be a mechanism", function() {
    var mech = m.writeLn();
    expect(mech).to.have.property('toString');
    expect(m._.WriteLnF).to.not.be.undefined;
  });

  it("should have correct properties", function() {
    var mech = m.writeLn();
    expect(mech.isMech).to.be.true;

    expect(mech).to.have.property('text');
    expect(mech).to.have.property('_t'); // imagined privacy
  });

  it("should write the primitive text 'hello' to the console", function() {
    var mech = m.writeLn("hello");
    expect(mech.go).to.equal("hello");
    expect(mech.goNum).to.eql(NaN);
    expect(mech.goStr).to.equal("hello");
  });

  it("should write the mechanism text 'hello'", function() {
    var mech = m.writeLn(m.str("45"));
    expect(mech.go).to.equal("45");
    expect(mech.goStr).to.equal("45");
    expect(mech.goNum).to.equal(45);
  });

  it("should set _parDir of child mechanisms to parent", function() {
    var mech = m.num(1);
    var mech2 = m.writeLn(mech);
    expect(mech._parDir).to.equal(mech2);
  });

});
