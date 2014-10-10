function StrF(){};
function str(d){
   var f = Object.create(StrF.prototype);
   f.v = (arguments.length == 0) ? "" : d;
   return f;
}
StrF.prototype = Object.create(Object.prototype, {
   v: { enumerable: false,
      get: function() { return this.goStr; },
      set: function(d) { this._v = String(d); }},
   go: { enumerable: false, get: function() { return this.goStr; } },
   goNum: { enumerable: false, get: function() {
      var v = this.goStr;
      switch(v) {
         case "false":
            return 0;
            break;
         case "true":
            return 1;
            break;
         default:
            return Number(v);
      }
   }},
   goStr: { enumerable: false, get: function() { return this._v; }},
   goArr: { enumerable: false, get: function() { return [this.goStr]; } },
   goBool: { enumerable: false, get: function() { return (this.goNum > 0); } }
});
StrF.prototype.isMech = true;
StrF.prototype.isNull = false;
StrF.prototype.isPrim = true;
m.str = str;
m.StrF = StrF;