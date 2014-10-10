function StrMF(){};
function strM(d){
   var f = Object.create(StrMF.prototype);
   f.v = (arguments.length == 0) ? "" : d;
   return f;
}
StrMF.prototype = Object.create(StrF.prototype, {
   v: { enumerable: false,
      get: function() { return this.goStr; },
      set: function(d) {
         if ((isUsable(d)) && (d.isMech)){
            this._v = d;
         } else {
            this._v = String(d);
         }
   }},
   goStr: { enumerable: false, get: function() {
      return this._v.isMech ? this._v.goStr : this._v;
   }},
});
m.strM = strM;
m.StrMF = StrMF;