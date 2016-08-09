// A number primitive that can contain a primitive.
function NumMF() {}

function numM(d) {
	var f = Object.create(NumMF.prototype);
	f.v = (0 === arguments.length) ? 0 : d;
	if (f._v && f._v.isMech) {
		f._v._parDir = f;
	}
	return f;
}
NumMF.prototype = Object.create(NumF.prototype, {
	v: {
		enumerable: false,
		get: function() {
			return this.goNum;
		},
		set: function(d) {
			if ((null === d) || (undefined === d)) {
				this._v = (undefined === d) ? NaN : 0;
				delete this._vb;
			} else {
				this._v = d.isMech ? d : Number(d);
				if (!this._v.isMech && isNaN(this._v)) {
					if ("NaN" != d.toString()) { // retain original bad value but NOT when NaN
						this._vb = d;
					}
				} else {
					delete this._vb;
				}
			}
		}
	},
	goNum: {
		enumerable: false,
		get: function() {
			return this._v.isMech ? this._v.goNum : this._v;
		}
	},
	goStr: {
		enumerable: false,
		get: function() {
			return this._v.isMech ? this._v.goStr : this._vb ? this._vb.toString() : this._v.toString();
		}
	},
});
m.numM = numM;
m._.NumMF = NumMF;
