describe("eval mechanism - eval", function() {

  it("should not wipeout Object prototype and be a mechanism", function() {
    var mech = m.eval();
    expect(mech).to.have.property('toString');
    expect(m._.EvalF).to.not.eql(undefined);
  });

  it("should have correct properties", function() {
    var mech = m.eval(1);
    expect(mech.isMech).to.be.true;
  });

  it("should set _parDir of child mechanisms to parent", function() {
    var mech = m.num(1);
    var mech3 = m.eval(mech);
    expect(mech._parDir).to.equal(mech3);
  });

  it("should eval out odd numbers and find correct parent", function() {
    var mech = m.eval('3');
    expect(mech.go).to.equal(3);
    expect(mech.goNum).to.equal(3);
    expect(mech.goStr).to.equal('3');
    expect(mech.goBool).to.equal(true);
    expect(mech.goArr[0]).to.equal(3);

    // TODO: Figure out why this works in the browser but not
    // TODO: in node. Error is m.add not a function).
    var mech2 = m.eval('m.add(3,4).go;');
    expect(mech2.go).to.equal(7);
    expect(mech2.goNum).to.equal(7);
    expect(mech2.goStr).to.equal('7');
    expect(mech2.goBool).to.equal(true);
    expect(mech2.goArr[0]).to.equal(7);

    var mech3 = m.eval(m.str('m.add(-2,-3).go;'));
    expect(mech3.go).to.equal(-5);
    expect(mech3.goNum).to.equal(-5);
    expect(mech3.goStr).to.equal('-5');
    expect(mech3.goBool).to.equal(false);
    expect(mech3.goArr[0]).to.equal(-5);

  });

  it("should not be unhappy when there is nothing to eval.", function() {
    var mech = m.eval();
    expect(mech.go).to.equal(undefined);
    expect(mech.goNum).to.equal(undefined);
    expect(mech.goStr).to.equal(undefined);
    expect(mech.goArr[0]).to.equal(undefined);
    expect(mech.goBool).to.equal(false);

    var mech2 = m.eval(null);
    expect(mech2.go).to.equal(null);
    expect(mech2.goNum).to.equal(null);
    expect(mech2.goStr).to.equal(null);
    expect(mech2.goArr[0]).to.equal(null);
    expect(mech2.goBool).to.equal(false);
  });

});
