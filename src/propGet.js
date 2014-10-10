function PropGetF(){};
function propGet(prop, item, itemGo) {
   var f = Object.create(PropGetF.prototype);
   f.prop = prop;
   f.item = item;
   f.itemGo = itemGo;
   return f;
};
PropGetF.prototype = Object.create(MechF.prototype, {
   prop: { enumerable: false,
      get: function() {  return this._prop.isMech ? this._prop.goStr : this._prop; },
      set: function(d) { this._prop = isUsable(d) ? d : ""; }
   },
   item: { enumerable: false,
      get: function() { return isUsable(this._item) ? (this._itemGo ? this._item.go : this._item) : null; },
      set: function(d) { this._item = isUsable(d) ? d : null; }
   },
   itemGo: { enumerable: false,
      get: function() { return this._itemGo; },
      set: function(d) { this._itemGo = isUsable(d) ? d : true; }
   },
   go: { enumerable: false, get: function() {
      var i = this.item;
      return isUsable(i) ? i[this.prop] : null;
   }},
   goNum: { enumerable: false, get: function() {
      var i = this.go;
      return (null === i) ? NaN : Number(this.go);
   }},
   goStr: { enumerable: false, get: function() {
      var i = this.go;
      return (null == i) ? "" : String(this.go);
   }},
   goArr: { enumerable: false, get: function() { return [this.go]; } },
   goBool: { enumerable: false, get: function() { return Boolean(this.go); }}
});
m.propGet = propGet;
m.p$ = propGet;
m.PropGetF = PropGetF;