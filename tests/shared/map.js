describe("mapping mechanism - map", function() {

  it("should not wipeout Object prototype and be a mechanism", function() {
    var mech = m.map();
    expect(mech).to.have.property('toString');
    expect(m._.MapF).to.not.eql(undefined);
  });

  it("should have correct properties", function() {
    var mech = m.map(1);
    expect(mech.isMech).to.be.true;
  });

  it("should return an emitFromArr as an array", function() {
    var mech = m.map(m.emitFromArr([1, 2, 3, 4]));
    expect(mech.go).to.have.length(4);
    expect(mech.go[0]).to.equal(1);
    expect(mech.go[1]).to.equal(2);
    expect(mech.go[2]).to.equal(3);
    expect(mech.go[3]).to.equal(4);

    var mech2 = m.map(m.emitFromArr([8, 6, 7]));
    expect(mech2.go).to.have.length(3);
    expect(mech2.go[0]).to.equal(8);
    expect(mech2.go[1]).to.equal(6);
    expect(mech2.go[2]).to.equal(7);

    expect(mech2.goNum).to.have.length(3);
    expect(mech2.goNum[0]).to.equal(8);
    expect(mech2.goNum[1]).to.equal(6);
    expect(mech2.goNum[2]).to.equal(7);

    expect(mech2.goArr).to.have.length(3);
    expect(mech2.goArr[0]).to.equal(8);
    expect(mech2.goArr[1]).to.equal(6);
    expect(mech2.goArr[2]).to.equal(7);

  });

  it("should return an emitFromRange as an array", function() {
    var mech = m.map(m.emitFromRange(1, 2, 0.5));
    expect(mech.goNum).to.have.length(3);
    expect(mech.goNum[0]).to.equal(1);
    expect(mech.goNum[1]).to.equal(1.5);
    expect(mech.goNum[2]).to.equal(2);
    expect(mech.go).to.have.length(3);
    expect(mech.go[0]).to.equal(1);
    expect(mech.go[1]).to.equal(1.5);
    expect(mech.go[2]).to.equal(2);
    expect(mech.goArr).to.have.length(3);
    expect(mech.goArr[0]).to.equal(1);
    expect(mech.goArr[1]).to.equal(1.5);
    expect(mech.goArr[2]).to.equal(2);
  });

  it("should return a fixed range", function() {
    var mech = m.map(m.emitFromRange(1, 2000, 2), 3);
    expect(mech.go).to.have.length(3);
    expect(mech.go[0]).to.equal(1);
    expect(mech.go[1]).to.equal(3);
    expect(mech.go[2]).to.equal(5);
  });

  it("should not hang when a HUGE range is emitted", function() {
    var mech = m.map(m.emitFromRange(1, Infinity, 45959532));
    expect(mech.go).to.have.length(1000);
  });

  it("should not hang when a HUGE range is emitted", function() {
    var mech = m.map(m.emitFromRange(1, Infinity, 45959532));
    expect(mech.go).to.have.length(1000);
  });

  it("should operate correctly using an algorithm", function() {

    var mech = m.map(m.add(4, m.emitFromArr([1, 2, 3, 4])));
    expect(mech.go).to.have.length(4);
    expect(mech.go[0]).to.equal(5);
    expect(mech.go[1]).to.equal(6);
    expect(mech.go[2]).to.equal(7);
    expect(mech.go[3]).to.equal(8);
    expect(mech.go[4]).to.eql(undefined);

    var mech2 = m.map(
      m.add(
        m.emitFromRange(1, 4, 1),
        m.emitFromArr([1, 2, 3, 4, 5])
      )
    );
    expect(mech2.go).to.have.length(4);
    expect(mech2.go[0]).to.equal(2);
    expect(mech2.go[1]).to.equal(4);
    expect(mech2.go[2]).to.equal(6);
    expect(mech2.go[3]).to.equal(8);
    expect(mech2.go[4]).to.eql(undefined);

    var mech3 = m.map(m.addS(m.emitFromArr(["a", "b", "c"]), "e"));
    expect(mech3.go).to.have.length(3);
    expect(mech3.go[0]).to.equal("ae");
    expect(mech3.go[1]).to.equal("be");
    expect(mech3.go[2]).to.equal("ce");

  });

  it("should map a literal", function() {
    var mech = m.map("hello", 5);
    expect(mech.go).to.have.length(5);
    expect(mech.go[0]).to.equal("hello");
    expect(mech.go[1]).to.equal("hello");
    expect(mech.go[2]).to.equal("hello");
    expect(mech.go[3]).to.equal("hello");
    expect(mech.go[4]).to.equal("hello");

    var mech2 = m.map(17, 3);
    expect(mech2.go).to.have.length(3);
    expect(mech2.go[0]).to.equal(17);
    expect(mech2.go[1]).to.equal(17);
    expect(mech2.go[2]).to.equal(17);
  });

  it("should allow a mechanism as a max", function() {
    var mech = m.map(m.emitFromRange(1, Infinity, 45959532), m.num(5));
    expect(mech.go).to.have.length(5);
  });

  it("should not hang on an invalid mechanism result", function() {
    var mech = m.map(m.emitFromRange(1, Infinity, 45959532), m.num(undefined));
    expect(mech.go).to.have.length(0);
  });

  it("should set _parDir of child mechanisms to parent", function() {
    var mech = m.num(1);
    var mech2 = m.num(2);
    var mech3 = m.map(mech, mech2);
    expect(mech._parDir).to.equal(mech3);
    // expect(mech2._parDir).to.equal(mech3);
  });

});
