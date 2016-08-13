function ReduceF() {}

function reduce(algo) {
  var f = Object.create(ReduceF.prototype);
  f._a = algo;
  if (f._a && f._a.isMech) {
    f._a._parDir = f;
  }
  return f;
}
ReduceF.prototype = Object.create(Object.prototype, {
  isMech: {
    get: function() {
      return true;
    }
  },
  go: {
    enumerable: false,
    get: function() {
      if (undefined === this._a || null === this._a) {
        return undefined;
      }
      if (!this._ran) {
        // inject first emitted value into left argument
        this._a._l = undefined === this._a.r || null === this._a.r ? undefined : this._a.r.go; // TODO: add/sub/etc. changes 2nd param to undefined. So, haven't tested null yet
        this._ran = true; //
      }
      var cur = null;
      while (undefined !== cur) {
        cur = this._a.go;
        if (undefined !== cur) {
          this._a._l = cur;
        }
      }
      return this._a._l;
    }
  },
  goNum: {
    enumerable: false,
    get: function() {
      return this.go;
    }
  }
});
m.reduce = reduce;
m._.ReduceF = ReduceF;
