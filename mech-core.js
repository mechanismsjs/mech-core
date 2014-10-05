// null/undefined - not usable. NaN, #, Str, "", obj - are usable
// works because null == undefined is true
// Coffeescript? Need !((null === d) || (undefined === d))
function isUsable(data){ return !(null == data); };
module.exports.isUsable = isUsable;

function MechF(){};
MechF.prototype.isMechanism = true;
MechF.prototype.isNull = false;
MechF.prototype.isPrimitive = false;
module.exports.mech = function (){ return Object.create(MechF.prototype); };

// A number primitive that can not contain a primitive (speed)
function NumF(){}; 
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
NumF.prototype.isPrimitive = true;
function num(d) {
   var f = Object.create(NumF.prototype);
   f.v = (arguments.length == 0) ? 0 : d; // for same behavior as Number() == 0 and Number(undefined) == NaN
   return f;
};
module.exports.num = num;

// A number primitive that can contain a primitive.
function NumMF(){}; 
NumMF.prototype = Object.create(NumF.prototype, {
   v: { enumerable: false,
      get: function() { return this.goNum; },
      set: function(d) {
         if (isUsable(d)) {
            this._v = d.isMechanism ? d : Number(d);
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
   goNum: { enumerable: false, get: function() { return this._v.isMechanism ? this._v.goNum : this._v; } },
   goStr: { enumerable: false, get: function() { return this._v.isMechanism ? this._v.goStr : this._vb ? this._vb.toString() : this._v.toString(); } },
});
function numM(d) {
   var f = Object.create(NumMF.prototype);
   f.v = (arguments.length == 0) ? 0 : d;
   return f;
};
module.exports.numM = numM;

function StrF(){};
StrF.prototype = Object.create(MechF.prototype, {
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
StrF.prototype.isPrimitive = true;
module.exports.str = function(d){
   var f = Object.create(StrF.prototype);
   f.v = (arguments.length == 0) ? "" : d;
   return f;
}

function StrMF(){};
StrMF.prototype = Object.create(StrF.prototype, {
   v: { enumerable: false,
      get: function() { return this.goStr; },
      set: function(d) {
         if ((isUsable(d)) && (d.isMechanism)){
            this._v = d;
         } else {
            this._v = String(d);
         }
   }},
   goStr: { enumerable: false, get: function() {
      return this._v.isMechanism ? this._v.goStr : this._v;
   }},
});
module.exports.strM = function(d){
   var f = Object.create(StrMF.prototype);
   f.v = (arguments.length == 0) ? "" : d;
   return f;
}

function DualArgF(){};
DualArgF.prototype = Object.create(MechF.prototype, {
   l: { enumerable: false,
      get: function() { return this._l; },
      set: function(d) { this._l = isUsable(d) ? (d.isMechanism ? d : num(d)) : num(NaN); }
   },
   r: { enumerable: false,
      get: function() { return this._r; },
      set: function(d) { this._r = isUsable(d) ? (d.isMechanism ? d : num(d)) : num(NaN); }
   },
   go: { enumerable: false, get: function() { return this.goNum; } },
   goArr: { enumerable: false, get: function() { return [this.goNum]; } },
   goBool: { enumerable: false, get: function() { return (this.goNum > 0); } }
});
module.exports.dualArg = function(left,right) {
   var f = Object.create(DualArgF.prototype);
   f.l = (arguments.length == 0) ? 0 : left;
   f.r = (arguments.length <= 1) ? 0 : right;
   return f;
};

function AddF(){};
AddF.prototype = Object.create(DualArgF.prototype, {
   goNum: { get: function() { return this._l.goNum + this._r.goNum; } },
   goStr: { get: function() { return "(" + this._l.goStr + " + " + this._r.goStr + ")"; } }
});
module.exports.add = function(left,right) {
   var f = Object.create(AddF.prototype);
   f.l = (arguments.length == 0) ? 0 : left;
   f.r = (arguments.length <= 1) ? 0 : right;
   return f;
};

function SubF(){};
SubF.prototype = Object.create(DualArgF.prototype, {
   goNum: { get: function() { return this._l.goNum - this._r.goNum; } },
   goStr: { get: function() { return "(" + this._l.goStr + " - " + this._r.goStr + ")"; } }
});
module.exports.sub = function(left,right) {
   var f = Object.create(SubF.prototype);
   f.l = (arguments.length == 0) ? 0 : left;
   f.r = (arguments.length <= 1) ? 0 : right;
   return f;
};

function MulF(){};
MulF.prototype = Object.create(DualArgF.prototype, {
   goNum: { get: function() { return this._l.goNum * this._r.goNum; } },
   goStr: { get: function() { return "(" + this._l.goStr + " * " + this._r.goStr + ")"; } }
});
module.exports.mul = function(left,right) {
   var f = Object.create(MulF.prototype);
   f.l = (arguments.length == 0) ? 0 : left;
   f.r = (arguments.length <= 1) ? 0 : right;
   return f;
};

function DivF(){};
DivF.prototype = Object.create(DualArgF.prototype, {
   goNum: { get: function() { return this._l.goNum / this._r.goNum; } },
   goStr: { get: function() { return "(" + this._l.goStr + " / " + this._r.goStr + ")"; } }
});
module.exports.div = function div(left,right) {
   var f = Object.create(DivF.prototype);
   f.l = (arguments.length == 0) ? 0 : left;
   f.r = (arguments.length <= 1) ? 0 : right;
   return f;
};

function PropGetF(){};
PropGetF.prototype = Object.create(MechF.prototype, {
   prop: { enumerable: false,
      get: function() {  return this._prop.isMechanism ? this._prop.goStr : this._prop; },
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
function propGet(prop, item, itemGo) {
   var f = Object.create(PropGetF.prototype);
   f.prop = prop;
   f.item = item;
   f.itemGo = itemGo;
   return f;
};
module.exports.propGet = propGet;
module.exports.p$ = propGet;

function PropSetF(){};
PropSetF.prototype = Object.create(MechF.prototype, {
   prop: { enumerable: false,
      get: function() {  return this._prop.isMechanism ? this._prop.goStr : this._prop; },
      set: function(d) { this._prop = isUsable(d) ? d : ""; }
   },
   src: { enumerable: false,
      get: function() { return null === this._src ? null : (this._src.isMechanism ? this._src.go : this._src); },
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
function propSet(prop, dest, src, itemGo) {
   var f = Object.create(PropSetF.prototype);
      f.prop = prop;
      f.dest = dest;
      f.src = src;
      f.itemGo = itemGo;
   return f;
}

module.exports.propSet = propSet;
module.exports.p$s = propSet;



function PropSetF(){};
PropSetF.prototype = Object.create(MechF.prototype, {
   prop: { enumerable: false,
      get: function() {  return this._prop.isMechanism ? this._prop.goStr : this._prop; },
      set: function(d) { this._prop = isUsable(d) ? d : ""; }
   },
   src: { enumerable: false,
      get: function() { return null === this._src ? null : (this._src.isMechanism ? this._src.go : this._src); },
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
function propSet(prop, dest, src, itemGo) {
   var f = Object.create(PropSetF.prototype);
      f.prop = prop;
      f.dest = dest;
      f.src = src;
      f.itemGo = itemGo;
   return f;
}

module.exports.propSet = propSet;
module.exports.p$s = propSet;

function WriteLnF(){};
WriteLnF.prototype = Object.create(MechF.prototype, {
   text: { enumerable: false,
      get: function() {  return this._text.isMechanism ? this._text.goStr : this._text; },
      set: function(d) { this._text = isUsable(d) ? d : ""; }
   },
   go: { enumerable: false, get: function() {
      return this.goStr;
   }},
   goStr: { enumerable: false, get: function() {
      var i = this._text.isMechanism ? this._text.goStr : this._text;
      console.log(i);
      return i;
   }},
   goNum: { enumerable: false, get: function() {
      var i = this._text.isMechanism ? this._text.goNum : this._text;
      i = Number(i);
      console.log(i.toString());
      return i;
   }}
});
function writeLn(text) {
   var f = Object.create(WriteLnF.prototype);
   f.text = text;
   return f;
}
module.exports.writeLn = writeLn;



