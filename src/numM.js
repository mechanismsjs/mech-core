// A number primitive that can contain a primitive.
function NumMF(){}; 
function numM(d) {
   var f = Object.create(NumMF.prototype);
   f.v = (arguments.length == 0) ? 0 : d;
   return f;
};
NumMF.prototype = Object.create(NumF.prototype, {
   v: { enumerable: false,
      get: function() { return this.goNum; },
      set: function(d) {
         if (isUsable(d)) {
            this._v = d.isMech ? d : Number(d);
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
   goNum: { enumerable: false, get: function() { return this._v.isMech ? this._v.goNum : this._v; } },
   goStr: { enumerable: false, get: function() { return this._v.isMech ? this._v.goStr : this._vb ? this._vb.toString() : this._v.toString(); } },
});
m.numM = numM;
m.NumMF = NumMF;