var fs = require("fs");
var http = require('http');

fs.readFile('img.txt', 'UTF-8', function(err, data){
    if(!err){
        var con = data.split('\n');
        // var i=0,
        //     len=con.length;

        // function down(file){
        //     http.get(file, function(res){
        //         var imgData = '';
        //         res.setEncoding('binary');

        //         res.on('data', function(chunk){
        //             imgData+=chunk;
        //         });
        //         res.on('end', function(){
        //             fs.writeFile(i+'.jpg', imgData, 'binary', function(err){
        //                 if(err){
        //                     console.log('fail: ' + file);
        //                 }
        //                 i++;
        //                 if(i<len){
        //                     down(con[i]);
        //                 }
        //                 console.log('download over')
        //             });
        //         });
        //     });
        // }
        // down(con[0]);

        for(var i=0,len=con.length;i<len;i++){
            (function(i, file){
                http.get(file, function(res){
                    var imgData = '';
                    res.setEncoding('binary');

                    res.on('data', function(chunk){
                        imgData+=chunk;
                    });
                    res.on('end', function(){
                        fs.writeFile(i+'.jpg', imgData, 'binary', function(err){
                            if(err){
                                console.log('fail: ' + con[0]);
                            }
                            console.log('download over')
                        });
                    });
                });
            })(i, con[i]);
        }
    }else {
        console.log(err);
    }
});
