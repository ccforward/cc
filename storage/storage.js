var storage = (function(win){
    var StorageKeys = {},
        regStorageKey = /^localstorage\_\_\_(.*)+\_\_\_\d*$/,
        prefixText = "localstorage",
        space = "___";
        
    function getRealKey (key){
        var tempArr = key.split(space),
            realKey = {};
            
        realKey['realkey'] = tempArr[1];
        realKey['expires'] = tempArr[2] || "";
        
        return realKey;
    }
    
    function isExpires(key,expires){
        var now  = +new Date();

        if(!expires){ return false; }
                    
        if(now > parseInt(expires,10)){
            return true;
        }
        
        return false;
    }
    
    function clear (){
        for(var key in win.localStorage){
            if(regStorageKey.test(key)){
                win.localStorage.removeItem(key);
            }
        }
        return this;
    }
    
    function removeItem (key){
        var item = StorageKeys[key];
        if(item){
            win.localStorage.removeItem(item['key']);
        }
        return this;
    }
    
    function getItem (key){
        var item = StorageKeys[key];
        if(item){
          // 如果过期了，那么就返回空字符串
          if(isExpires(key,item['expires'])){ return ""; }
            return win.localStorage[item['key']];
        }
        return "";
    }
    
    function setItem (key,value,expires){
        if(!key) { return this; }

        expires = expires || 0;
        
        this._key = key;
        var now = (+new Date()),
        	localKey = prefixText + space + key + space + ( expires ? expires * 1000 + now : "" );

        win.localStorage.setItem(localKey,value);
        StorageKeys[key] = { "key" : localKey, "expires" : expires ? expires * 1000 + now  : "" };
        
        return this;
    }
    
    function expires (seconds){
        if(!seconds){ return this; }
        
        var key = this._key,
            item = StorageKeys[key] || {},
            value = win.localStorage[item['key']],
            now = (+new Date());
        
        if(!key){ return this; }
        
        this.removeItem(key);
        this.setItem(key,value,seconds);
        
        return this;
    }
    
    function initCheck (){
        var realKey;
        for(var key in win.localStorage){
            if(regStorageKey.test(key)){
                realKey = getRealKey(key);

                // 如果已经过期的local data，则删掉
                if(isExpires(realKey['realkey'],realKey['expires'])){ win.localStorage.removeItem(key); continue; }
                
                StorageKeys[realKey['realkey']] = { "key" : key, "expires" : realKey['expires'] };
            }
        }
    }
    
    // 立即检查localStorage过期情况
    initCheck();
    
    return {
        getItem : getItem,
        setItem : setItem,
        removeItem : removeItem,
        clear : clear,
        expires : expires
    }
    
})(window);
