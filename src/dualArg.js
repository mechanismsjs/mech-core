function DualArgF(){};
function dualArg(left,right) {
   var f = Object.create(DualArgF.prototype);
   f.l = (arguments.length == 0) ? 0 : left;
   f.r = (arguments.length <= 1) ? 0 : right;
   return f;
};
DualArgF.prototype = Object.create(Object.prototype, {
   isMech2: { enumerable: false, get: function() { return true; }},
   l: { enumerable: false,
      get: function() { return this._l; },
      set: function(d) { this._l = isUsable(d) ? (d.isMech ? d : num(d)) : num(NaN); }
   },
   r: { enumerable: false,
      get: function() { return this._r; },
      set: function(d) { this._r = isUsable(d) ? (d.isMech ? d : num(d)) : num(NaN); }
   },
   go: { enumerable: false, get: function() { return this.goNum; } },
   goArr: { enumerable: false, get: function() { return [this.goNum]; } },
   goBool: { enumerable: false, get: function() { return (this.goNum > 0); } }
});
DualArgF.prototype.isMech = true;
DualArgF.prototype.isNull = false;
DualArgF.prototype.isPrim = false;

m.dualArg = dualArg;
m.DualArgF = DualArgF;