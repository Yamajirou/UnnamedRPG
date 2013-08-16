var BaseBuilding = cc.Class.extend({
    _GID: null,
    _type: null,
    _mapPosition:null,
    _level: null,
    ctor:function(gid, type, pos){
        this.GID = gid;
        this._type = type;
        this._mapPosition = pos;
    }
});

var BlacksmithBuilding = BaseBuilding.extend({
    ctor:function(pos){
        this._GID = 1;
        this._type = "blacksmith";
        this._mapPosition = pos;
        this._level = 0;
    }
});
