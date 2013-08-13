/*
	Tiled map
*/


classes.maps.TiledMeadow = cc.TMXTiledMap.extend({
    ctor : function() {
        this._super();
        this.initWithTMXFile("images/tiledMeadow.tmx");
    }
});
var tiledMap = new classes.maps.TiledMeadow();