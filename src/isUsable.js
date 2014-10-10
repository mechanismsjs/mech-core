// Not usable - null/undefined
// Usable - NaN, #, Str, "", obj
// Not using Coffeescript? We can use !(null == d)
var isUsable = function(d){ return !((null === d) || (undefined === d)); };
m.isUsable = isUsable;
