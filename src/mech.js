function MechF(){};
MechF.prototype.isMech = true;
MechF.prototype.isNull = false;
MechF.prototype.isPrim = false;
m.mech = function (){ return Object.create(MechF.prototype); };
m.MechF = MechF;
