function PropSetF(){};
function propSet(prop, dest, src, itemGo) {
   var f = Object.create(PropSetF.prototype);
      f.prop = prop;
      f.dest = dest;
      f.src = src;
      f.itemGo = itemGo;
   return f;
};
PropSetF.prototype = Object.create(MechF.prototype, {
   prop: { enumerable: false,
      get: function() {  return this._prop.isMech ? this._prop.goStr : this._prop; },
      set: function(d) { this._prop = isUsable(d) ? d : ""; }
   },
   src: { enumerable: false,
      get: function() { return null === this._src ? null : (this._src.isMech ? this._src.go : this._src); },
      set: function(d) { this._src = isUsable(d) ? d: null; }
   },
   dest: { enumerable: false,
      get: function() { return this._itemGo ? (null === this._dest ? null : this._dest.go) : this._dest; },
      set: function(d) { this._dest = isUsable(d) ? d: null; }
   },
   itemGo: { enumerable: false,
      get: function() { return this._itemGo; },
      set: function(d) { this._itemGo = isUsable(d) ? d : true; }
   },
   go: { enumerable: false, get: function() {
      var s = this.src;
      var d = this.dest;
      if (isUsable(d)) {
         d[this.prop] = s;
      }
      return s;
   }}
});
m.propSet = propSet;
m.p$s = propSet;
m.PropSetF = PropSetF;