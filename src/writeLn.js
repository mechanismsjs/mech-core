function WriteLnF(){};
function writeLn(text) {
   var f = Object.create(WriteLnF.prototype);
   f.text = text;
   return f;
}
WriteLnF.prototype = Object.create(Object.prototype, {
   text: { enumerable: false,
      get: function() {  return this._t.isMech ? this._t.goStr : this._t; },
      set: function(d) { this._t = ((null === d) || (undefined === d)) ? "" : d; }
   },
   go: { enumerable: false, get: function() {
      return this.goStr;
   }},
   goStr: { enumerable: false, get: function() {
      var i = this._t.isMech ? this._t.goStr : this._t;
      console.log(i);
      return i;
   }},
   goNum: { enumerable: false, get: function() {
      var i = this._t.isMech ? this._t.goNum : this._t;
      i = Number(i);
      console.log(i.toString());
      return i;
   }}
});
WriteLnF.prototype.isMech = true;
WriteLnF.prototype.isNull = false;
WriteLnF.prototype.isPrim = false;
m.writeLn = writeLn;
m._.WriteLnF = WriteLnF;