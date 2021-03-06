function PropSetF() {}

function propSet(prop, dest, src, itemGo) {
  var f = Object.create(PropSetF.prototype);
  f.prop = prop;
  if (f._prop.isMech) {
    f._prop._parDir = f;
  }
  f.dest = dest;
  if (f._dest && f._dest.isMech) {
    f._dest._parDir = f;
  }
  f.src = src;
  if (f._src && f._src.isMech) {
    f._src._parDir = f;
  }
  f.itemGo = itemGo;
  return f;
}
PropSetF.prototype = Object.create(Object.prototype, {
  isMech: {
    get: function() {
      return true;
    }
  },
  prop: {
    enumerable: false,
    get: function() {
      return this._prop.isMech ? this._prop.goStr : this._prop;
    },
    set: function(d) {
      this._prop = ((null === d) || (undefined === d)) ? "" : d;
    }
  },
  src: {
    enumerable: false,
    get: function() {
      return null === this._src ? null : (this._src.isMech ? this._src.go : this._src);
    },
    set: function(d) {
      this._src = ((null === d) || (undefined === d)) ? null : d;
    }
  },
  dest: {
    enumerable: false,
    get: function() {
      return this._itemGo ? (null === this._dest ? null : this._dest.go) : this._dest;
    },
    set: function(d) {
      this._dest = ((null === d) || (undefined === d)) ? null : d;
    }
  },
  itemGo: {
    enumerable: false,
    get: function() {
      return this._itemGo;
    },
    set: function(d) {
      this._itemGo = ((null === d) || (undefined === d)) ? true : d;
    }
  },
  go: {
    enumerable: false,
    get: function() {
      var s = this.src;
      var d = this.dest;
      if (!((null === d) || (undefined === d))) {
        d[this.prop] = s;
      }
      return s;
    }
  }
});
m.propSet = propSet;
m.p$s = propSet;
m._.PropSetF = PropSetF;
