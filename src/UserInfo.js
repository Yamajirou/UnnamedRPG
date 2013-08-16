var UserInfo = cc.Class.extend({
    
    // ----------- Resources --------------
    _gold: null,
    _stone: null,
    _wood: null,
    _cloth: null,
    _diamond: null,
    
    // ----------- Profile info -------------
    _id: null,
    _name: null,
    
    
    // ------------ Stats -------------------
    
    
    ctor:function(){
        this._gold = 0;
        this._stone = 0;
        this._wood = 0;
        this._cloth = 0;
        this._diamond = 0;
        
        this._id = 0;
        this._name = "Jogador";
    }
    
    
    
});


