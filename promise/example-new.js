var Fn = {
    a: function(aid){
        return new Promise(function(resolve, reject){
            if(aid) {
                setTimeout(function(){
                    console.log('1. 1秒后a函数执行完')
                    resolve(aid);
                },1000)
            }else {
                console.log('1. no 1')
                resolve(null);
            }
        })
    },
    b: function(aid){
        return Fn.xx(aid).then(function(d){
            console.log('7. b函数执行完xx后执行then,参数 ' + d);
            return Promise.resolve(aid);
        });           
        
    },
    xx: function(aid){
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                console.log('4. 2秒后xx函数resolve，下一步Fn.yy')
                Fn.yy(aid).then(function(d){
                    console.log('6. xx函数执行完yy后执行then,参数' + d);
                    resolve(aid)
                });
            },2000)             
            
        })
    },
    yy: function(aid){
        return new Promise(function(resolve, reject){
            if(aid){
                setTimeout(function(){
                    console.log('5. 2秒后yy函数resolve')
                    resolve(aid);
                },2000)
            }else {
                console.log('5. no yy')
                resolve(null);
            }

        });
    }
}

Fn.a(' $$$aaaa$$$ ')
    .then(function(res){
        console.log('2. then2 '+res)
        return Promise.resolve(' $$$then2的参数$$$ ')
    })
    .then(function(res){
        console.log('3. then3 '+res)
        return Fn.b(' $$$Fn.b参数$$$ ');
    })
    .then(function(res){
        console.log('8. then4 '+res)
    })
