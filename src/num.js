// A number primitive that can not contain a primitive
function NumF(){};
function num(d) {
   var f = Object.create(NumF.prototype);
   f.v = (arguments.length == 0) ? 0 : d; // for same behavior as Number() == 0 and Number(undefined) == NaN
   return f;
};
NumF.prototype = Object.create(MechF.prototype, {
   v: { enumerable: false,
      get: function() { return this.goNum; },
      set: function(d) {
         if (isUsable(d)) {
            this._v = Number(d);
            if ( isNaN(this._v)) {
               if ("NaN" != d.toString()) { // retain original bad value but NOT when NaN
                  this._vb = d;
               }
            }
         } else {
            this._v = (undefined === d) ? NaN : 0;
         }
      }
   },
   unit: { enumerable: false, get: function() { return ""; } },   
   go: { enumerable: false, get: function() { return this.goNum; } },
   goNum: { enumerable: false, get: function() { return this._v; } },
   goStr: { enumerable: false, get: function() { return this._vb ? this._vb.toString() : this._v.toString(); } },
   goArr: { enumerable: false, get: function() { return [this.goNum]; } },
   goBool: { enumerable: false, get: function() { return (this.goNum > 0); } }
});
NumF.prototype.isPrim = true;
m.num = num;
m.NumF = NumF;