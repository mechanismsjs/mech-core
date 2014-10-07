

// http://www.erichosick.com
// (c) 2014 Eric K. Hosick
// mech-core may be freely distributed under the MIT license.
// follows underscore library
(function() {
   "use strict";

   // Establish the root object, `window` in the browser, or `exports` on the server.
   var root = this;

   // Save the previous value of the `_` variable.
   var previousMechanisms = root.m;

   // Create a safe reference to the Underscore object for use below.
   var m = function(obj) {
     if (obj instanceof m) return obj;
     if (!(this instanceof m)) return new m(obj);
     this._wrapped = obj;
   };

   // Export the Underscore object for **Node.js**, with
   // backwards-compatibility for the old `require()` API. If we're in
   // the browser, add `m` as a global object.
   if (typeof exports !== 'undefined') {
     if (typeof module !== 'undefined' && module.exports) {
       exports = module.exports = m;
     }
     exports.m = m;
   } else {
     root.m = m;
   }
   // Current version.
   m.VERSION = '0.1.5';
   
   // null/undefined - not usable. NaN, #, Str, "", obj - are usable
   // works because null == undefined is true
   // No-Coffeescript? Can use !(null == d)
   var isUsable = function(d){ return !((null === d) || (undefined === d)); };
   m.isUsable = isUsable;

   function MechF(){};
   MechF.prototype.isMech = true;
   MechF.prototype.isNull = false;
   MechF.prototype.isPrim = false;
   MechF.prototype.create = false;
   m.mech = function (){ return Object.create(MechF.prototype); };
   m.MechF = MechF;

   // A number primitive that can not contain a primitive
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
   NumF.prototype.isPrim = true;
   function num(d) {
      var f = Object.create(NumF.prototype);
      f.v = (arguments.length == 0) ? 0 : d; // for same behavior as Number() == 0 and Number(undefined) == NaN
      return f;
   };
   m.num = num;
   m.NumF = NumF;
   
    // A number primitive that can contain a primitive.
    function NumMF(){}; 
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
    function numM(d) {
       var f = Object.create(NumMF.prototype);
       f.v = (arguments.length == 0) ? 0 : d;
       return f;
    };
    m.numM = numM;
    m.NumMF = NumMF;
    
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
    StrF.prototype.isPrim = true;
    function str(d){
       var f = Object.create(StrF.prototype);
       f.v = (arguments.length == 0) ? "" : d;
       return f;
    }
    m.str = str;
    m.StrF = StrF;
    
    function StrMF(){};
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
    function strM(d){
       var f = Object.create(StrMF.prototype);
       f.v = (arguments.length == 0) ? "" : d;
       return f;
    }
    m.strM = strM;
    m.StrMF = StrMF;
    
    function DualArgF(){};
    DualArgF.prototype = Object.create(MechF.prototype, {
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
    function dualArg(left,right) {
       var f = Object.create(DualArgF.prototype);
       f.l = (arguments.length == 0) ? 0 : left;
       f.r = (arguments.length <= 1) ? 0 : right;
       return f;
    };
    m.dualArg = dualArg;
    m.DualArgF = DualArgF;
    
    function AddF(){};
    AddF.prototype = Object.create(DualArgF.prototype, {
       goNum: { get: function() { return this._l.goNum + this._r.goNum; } },
       goStr: { get: function() { return "(" + this._l.goStr + " + " + this._r.goStr + ")"; } }
    });
    function add(left,right) {
       var f = Object.create(AddF.prototype);
       f.l = (arguments.length == 0) ? 0 : left;
       f.r = (arguments.length <= 1) ? 0 : right;
       return f;
    };
    m.add = add;
    m.AddF = AddF;
    function SubF(){};
    SubF.prototype = Object.create(DualArgF.prototype, {
       goNum: { get: function() { return this._l.goNum - this._r.goNum; } },
       goStr: { get: function() { return "(" + this._l.goStr + " - " + this._r.goStr + ")"; } }
    });
    function sub(left,right) {
       var f = Object.create(SubF.prototype);
       f.l = (arguments.length == 0) ? 0 : left;
       f.r = (arguments.length <= 1) ? 0 : right;
       return f;
    };
    m.sub = sub;
    m.SubF = SubF;
    function MulF(){};
    MulF.prototype = Object.create(DualArgF.prototype, {
       goNum: { get: function() { return this._l.goNum * this._r.goNum; } },
       goStr: { get: function() { return "(" + this._l.goStr + " * " + this._r.goStr + ")"; } }
    });
    function mul(left,right) {
       var f = Object.create(MulF.prototype);
       f.l = (arguments.length == 0) ? 0 : left;
       f.r = (arguments.length <= 1) ? 0 : right;
       return f;
    };
    m.mul = mul;
    m.MulF = MulF;
    function DivF(){};
    DivF.prototype = Object.create(DualArgF.prototype, {
       goNum: { get: function() { return this._l.goNum / this._r.goNum; } },
       goStr: { get: function() { return "(" + this._l.goStr + " / " + this._r.goStr + ")"; } }
    });
    function div(left,right) {
       var f = Object.create(DivF.prototype);
       f.l = (arguments.length == 0) ? 0 : left;
       f.r = (arguments.length <= 1) ? 0 : right;
       return f;
    };
    m.div = div;
    m.DivF = DivF;
    function PropGetF(){};
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
    function propGet(prop, item, itemGo) {
       var f = Object.create(PropGetF.prototype);
       f.prop = prop;
       f.item = item;
       f.itemGo = itemGo;
       return f;
    };
    m.propGet = propGet;
    m.p$ = propGet;
    m.PropGetF = PropGetF;
    function PropSetF(){};
    PropSetF.prototype = Object.create(MechF.prototype, {
       prop: { enumerable: false,
          get: function() {  return this._prop.isMech ? this._prop.goStr : this._prop; },
          set: function(d) { this._prop = isUsable(d) ? d : ""; }
       },
       src: { enumerable: false,
          get: function() { return null === this._src ? null : (this._src.isMech ? this._src.go : this._src); },
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
    };
    m.propSet = propSet;
    m.p$s = propSet;
    m.PropSetF = PropSetF;
    function WriteLnF(){};
    WriteLnF.prototype = Object.create(MechF.prototype, {
       text: { enumerable: false,
          get: function() {  return this._t.isMech ? this._t.goStr : this._t; },
          set: function(d) { this._t = isUsable(d) ? d : ""; }
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
    function writeLn(text) {
       var f = Object.create(WriteLnF.prototype);
       f.text = text;
       return f;
    }
    m.writeLn = writeLn;
    m.WriteLnF = WriteLnF;
 
}.call(this));
