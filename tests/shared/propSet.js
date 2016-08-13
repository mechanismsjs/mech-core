// TODO: A lot more test coverage is required for propSet
describe("set a property mechanism - propSet", function() {
  it("should not wipeout Object prototype and be a mechanism", function() {
    var mech = m.propSet();
    expect(mech).to.have.property('toString');
    expect(m._.PropSetF).to.not.be.undefined;
  });

  it("should have correct properties", function() {
    var mech = m.propSet();
    expect(mech.isMech).to.be.true;

    expect(mech).to.have.property('prop');
    expect(mech).to.have.property('_prop'); // imagined privacy

    expect(mech).to.have.property('dest');
    expect(mech).to.have.property('_dest'); // imagined privacy

    expect(mech).to.have.property('src');
    expect(mech).to.have.property('_src'); // imagined privacy

    expect(mech).to.have.property('itemGo');
    expect(mech).to.have.property('_itemGo'); // imagined privacy
  });

  it("should have correct setting", function() {
    var mech = m.propSet();

    expect(mech.prop).to.equal("");
    expect(mech.src).to.eql.null;
    expect(mech.dest).to.eql.null;
    expect(mech.itemGo).to.be.true;

    var mech2 = m.propSet(null);
    expect(mech2.prop).to.equal("");
    expect(mech2.src).to.eql.null;
    expect(mech2.dest).to.eql.null;
    expect(mech2.itemGo).to.be.true;

    var mech3 = m.propSet(null, null);
    expect(mech3.prop).to.equal("");
    expect(mech3.src).to.eql.null;
    expect(mech3.dest).to.eql.null;
    expect(mech3.itemGo).to.be.true;

    var mech4 = m.propSet(null, null, null);
    expect(mech4.prop).to.equal("");
    expect(mech4.src).to.eql.null;
    expect(mech4.dest).to.eql.null;
    expect(mech4.itemGo).to.be.true;

    var mech5 = m.propSet(null, null, null, null);
    expect(mech5.prop).to.equal("");
    expect(mech5.src).to.eql.null;
    expect(mech5.dest).to.eql.null;
    expect(mech5.itemGo).to.be.true;
  });


  it("sets the value of a valid item given everything is valid", function() {
    var mech2 = m.num(8);
    var mech3 = m.num(7);
    expect(mech2.v).to.equal(8);
    expect(mech3.v).to.equal(7);

    var mech = m.propSet("v", mech2, mech3, false);
    expect(mech.prop).to.equal("v");
    expect(mech.dest).to.equal(mech2);
    expect(mech.src).to.equal(7);
    expect(mech.itemGo).to.be.false;

    mech.go;
    expect(mech2.v).to.equal(7);
  });

  it("sets the value of a valid item given a primitive value (function syntax)", function() {
    var mech2 = m.num(8);
    expect(mech2.v).to.equal(8);

    var mech = m.propSet("v", mech2, 22, false);
    expect(mech.prop).to.equal("v");
    expect(mech.src).to.equal(22);
    expect(mech.dest).to.equal(mech2);
    expect(mech.itemGo).to.be.false;

    mech.go;
    expect(mech2.v).to.equal(22);

    var mech3 = m.p$s("v", mech2, 22, false);
    expect(mech3.prop).to.equal("v");
    expect(mech3.src).to.equal(22);
    expect(mech3.dest).to.equal(mech2);
    expect(mech3.itemGo).to.be.false;

    mech3.go;
    expect(mech2.v).to.equal(22);
  });

  it("should set _parDir of child mechanisms to parent", function() {
    var mech = m.num(1);
    var mech2 = m.num(2);
    var mech3 = m.num(3);
    var mech4 = m.propSet(mech, mech2, mech3);
    expect(mech._parDir).to.equal(mech4);
    expect(mech2._parDir).to.equal(mech4);
    expect(mech3._parDir).to.equal(mech4);
  });


});
