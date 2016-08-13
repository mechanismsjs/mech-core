describe("number mechanism - numM", function() {
  it("should not wipeout Object prototype and be a mechanism", function() {
    var mech = m.numM();
    expect(mech).to.have.property('toString');
    expect(m._.NumMF).to.not.be.undefined;
  });

  it("should have correct properties", function() {
    var mech = m.numM();
    expect(mech.isMech).to.be.true;
    expect(mech.isPrim).to.be.true;

    expect(mech).to.have.property('v');
    expect(mech).to.have.property('_v'); // imagined privacy
  });

  it("can contain another mechanism", function() {
    var mech = m.numM(m.num(6));

    expect(mech).to.not.have.property("_vb");
    expect(mech.v).to.equal(6);
    expect(mech.go).to.equal(6);
    expect(mech.goNum).to.equal(6);
    expect(mech.goStr).to.equal("6");
    expect(mech.goArr).to.contain(6);
    expect(mech.goArr).to.have.length(1);
    expect(mech.goBool).to.be.true;

    var mech2 = m.numM(m.str("12"));

    expect(mech2.v).to.equal(12);
    expect(mech2.go).to.equal(12);
    expect(mech2.goNum).to.equal(12);
    expect(mech2.goStr).to.equal("12");
    expect(mech2.goArr).to.contain(12);
    expect(mech2.goArr).to.have.length(1);
    expect(mech2.goBool).to.be.true;
  });

  it("should set _parDir of child mechanisms to parent", function() {
    var mech = m.num(1);
    var mech3 = m.numM(mech);
    expect(mech._parDir).to.equal(mech3);
  });

  it("should handle null and undefined correctly", function() {
    var mech = m.numM();
    expect(mech.go).to.equal(0);
    expect(mech.goNum).to.equal(0);
    expect(mech.goStr).to.equal("0");
    expect(mech.goArr).to.contain(0);
    expect(mech.goBool).to.be.false;

    var mech2 = m.numM(null);
    expect(mech2.go).to.equal(0);
    expect(mech2.goNum).to.equal(0);
    expect(mech2.goStr).to.equal("0");
    expect(mech2.goArr).to.contain(0);
    expect(mech2.goBool).to.be.false;
  });

  it("should clear _vb (value bad) property when set to a valid value.", function() {
    var mech = m.numM("stringisbad");
    expect(mech._vb).to.equal("stringisbad");
    mech.v = 3;
    expect(mech).to.not.have.property("_vb");
    expect(mech.go).to.equal(3);

    var mech2 = m.numM("stringisbad");
    expect(mech2._vb).to.equal("stringisbad");
    mech2.v = null;
    expect(mech2).to.not.have.property("_vb");
    expect(mech2.go).to.equal(0);
  });

});
