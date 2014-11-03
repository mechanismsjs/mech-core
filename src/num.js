// A number primitive that can not contain a primitive
function NumF(){};
function num(d) {
   var f = Object.create(NumF.prototype);
   f.v = (arguments.length == 0) ? 0 : d; // for same behavior as Number() == 0 and Number(undefined) == NaN
   return f;
};
NumF.prototype = Object.create(Object.prototype, {
   isMech: { get: function() { return true; }},
   isPrim: { get: function() { return true; }},      
   v: { enumerable: false,
      get: function() { return this.goNum; },
      set: function(d) {
         if ((null === d) || (undefined === d)) {
            this._v = (undefined === d) ? NaN : 0;
         } else {
            this._v = Number(d);
            if ( isNaN(this._v)) {
               if ("NaN" != d.toString()) { // retain original bad value but NOT when NaN
                  this._vb = d;
               }
            }
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
m.num = num;
m._.NumF = NumF;