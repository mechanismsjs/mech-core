function PropGetF() {}

function propGet(prop, item, itemGo) {
   var f = Object.create(PropGetF.prototype);
   f.prop = prop;
   if (f._prop && f._prop.isMech) {
      f._prop._parDir = f;
   }
   f.item = item;
   if (f._item && f._item.isMech) {
      f._item._parDir = f;
   }
   f.itemGo = itemGo;
   return f;
}
PropGetF.prototype = Object.create(Object.prototype, {
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
   item: {
      enumerable: false,
      get: function() {
         return ((null === this._item) || (undefined === this._item)) ? null : (this._itemGo ? this._item.go : this._item);
      },
      set: function(d) {
         this._item = ((null === d) || (undefined === d)) ? null : d;
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
         var i = this.item;
         return ((null === i) || (undefined === i)) ? null : i[this.prop];
      }
   },
   goNum: {
      enumerable: false,
      get: function() {
         var i = this.go;
         return (null === i) ? NaN : Number(this.go);
      }
   },
   goStr: {
      enumerable: false,
      get: function() {
         var i = this.go;
         return (null === i) | (undefined === i) ? "" : String(this.go);
      }
   },
   goArr: {
      enumerable: false,
      get: function() {
         return [this.go];
      }
   },
   goBool: {
      enumerable: false,
      get: function() {
         return Boolean(this.go);
      }
   }
});
m.propGet = propGet;
m.p$ = propGet;
m._.PropGetF = PropGetF;
