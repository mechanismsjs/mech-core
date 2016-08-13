function StrMF() {}

function strM(d) {
  var f = Object.create(StrMF.prototype);
  f.v = (0 === arguments.length) ? "" : d;
  if (f._v && f._v.isMech) {
    f._v._parDir = f;
  }
  return f;
}
StrMF.prototype = Object.create(StrF.prototype, {
  v: {
    enumerable: false,
    get: function() {
      return this.goStr;
    },
    set: function(d) {
      if ((!((null === d) || (undefined === d))) && (d.isMech)) {
        this._v = d;
      } else {
        this._v = String(d);
      }
    }
  },
  goStr: {
    enumerable: false,
    get: function() {
      return this._v.isMech ? this._v.goStr : this._v;
    }
  },
});
m.strM = strM;
m._.StrMF = StrMF;
