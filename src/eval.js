
function EvalF() {}

function evalM(algo) {
  var f = Object.create(EvalF.prototype);
  f._a = algo;
  if (f._a && f._a.isMech) {
    f._a._parDir = f;
  }
  return f;
}
EvalF.prototype = Object.create(Object.prototype, {
  isMech: {
    get: function() {
      return true;
    }
  },
  go: {
    get: function() {
      return (undefined === this._a) || (null === this._a) ? this._a : this._a.isMech ? eval(this._a.go) : eval(this._a);
    }
  },
  goNum: {
    get: function() {
      return this.go;
    }
  },
  goStr: {
    get: function() {
      var r = this.go;
      return undefined === r || null === r ? r : r.toString();
    }
  },
  goArr: {
    get: function() {
      return [this.go];
    }
  },
  goBool: {
    get: function() {
      return 0 < this.go;
    }
  }
});
m.eval = evalM;
m._.EvalF = EvalF;
