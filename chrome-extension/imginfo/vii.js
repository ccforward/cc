//functions for getting i18n messages and elements
function g(s){return chrome.i18n.getMessage(s);}
function gtn(t){return document.getElementsByTagName(t);}

//formatting the number for displaying
//here I know all numbers will be integers
//if used elsewhere, some more conditional
//tests should be made
function fnum(ns){
    if(!ns) return;
    var ns=ns.toString(),op,j=0;
    if(ns.length>3){
        var nsl=ns.length,ca=[];
        for(var i=nsl-1;i>-1;i--){
            ++j;
            var cae=ns.substr(i,1);
            if(j==3 && i !=0) {cae=','+cae; j=0;}
            ca[i]=cae;
        }
        op = ca.join('');
    }else{
        op = ns;
    }
    return op;
}


//when the esc key released, close the info window
//there are two ways to close this window, one is
//traditional window.close(), the other is used below
//Using keydown event makes people feel the interface
//responsing faster, keyup does the opposite.
document.body.onkeydown=function(e){
    if(e.keyCode && e.keyCode == 27){
        chrome.windows.getCurrent(function(w){
            chrome.windows.remove(w.id);
        });
    }
}

//display initial contents of the window
var bg=chrome.extension.getBackgroundPage(),info=bg.imgInfoObj;
var c = '<tr><td>'+g('loc')+': </td><td><a href="'+info['imgSrc']+'" target="_blank">'+info['imgSrc']+'</a></td></tr>';
    c+= '<tr><td>'+g('dims')+': </td><td><img src="loading-s.gif" /></td></tr>';
    c+= '<tr><td>'+g('ftype')+': </td><td><img src="loading-s.gif" /></td></tr>';
    c+= '<tr><td>'+g('fsize')+': </td><td><img src="loading-s.gif" /></td></tr>';
    c+= '<tr><td>'+g('alt')+' / '+g('title')+': </td><td><img src="loading-s.gif" /></td></tr>';
    c+= '<tr><td>'+g('prev')+': </td><td><img src="loading-s.gif" /></td></tr>';
gtn('table')[0].innerHTML = c;

//calculating the size of the window
//using XMLHttpRequest object to get the file size and file type
//of the image file
var tds=gtn('td'),xhr=new XMLHttpRequest(),imgType,imgFileSize,oImgFileSize,dispImgFileSize;

var altTitleStr=info['altTitleStr'];

tds[9].innerHTML = altTitleStr;

var nImg = new Image();
    nImg.src=info['imgSrc'];

    nImg.onload=function(){
        var nImgWidth=nImg.width,nImgHeight=nImg.height,nImgDims,newImgWidth,newImgHeight;
        
        var dispWidth=info['dispWidth'],dispHeight=info['dispHeight'],sw,sh,sstr='';
        sw=dispWidth!=nImgWidth?dispWidth:0;
        sh=dispHeight!=nImgHeight?dispHeight:0;
        if(sw&&sh)sstr='<span class="gray">('+g('smsg')+' '+sw+' x '+sh+' px)</span>';
        
        //generating the image dimensions string
        nImgDims = nImgWidth&&nImgHeight ? nImgDims=nImgWidth+' x '+nImgHeight+' px  '+sstr: g('eid');
        tds[3].innerHTML = nImgDims;

        //resize the image if height or width or both
        //are larger than 600, and updating the size
        //of the info window according to these two
        //numbers, and show the scroll bar if needed
        newImgWidth = nImgWidth >= 600 ? 600 : nImgWidth;
        newImgHeight = nImgWidth >= 600 ? Math.ceil(600*nImgHeight/nImgWidth) : nImgHeight;
        
        var imgURLWidth=info['imgSrc'].length*8;			
            imgURLWidth = imgURLWidth > 680 ? 680 : imgURLWidth;

        var popWinNewHeight=info['popWinHeight']+newImgHeight-16;
            popWinNewHeight = popWinNewHeight > 600 ? 600 : popWinNewHeight;
            
        if(popWinNewHeight==600)document.body.style.overFlowY = "scroll";

        if(newImgWidth>imgURLWidth&&newImgWidth>popWinNewHeight-120){
            document.body.style.overFlowX="scroll";
            chrome.windows.getCurrent(function(w){
                chrome.windows.update(w.id,{width:newImgWidth+125});
            });
        }
        
        chrome.windows.getCurrent(function(w){
            chrome.windows.update(w.id,{height:popWinNewHeight});
        });
    }
    
    //if the image can not be loaded
    //error message should be in different color
    nImg.onerror=function(){
        document.title="View Image Info [error occurred]";
        tds[3].innerHTML=g('eid');
        tds[5].innerHTML=g('eift');
        tds[7].innerHTML=g('eifz');
        tds[11].innerHTML=g('ilem');
        tds[3].style.color=tds[5].style.color=tds[7].style.color=tds[9].style.color=tds[11].style.color='#999999';
    }
    
    //show the image before the xmlhttprequest request will be sent
    tds[11].firstChild.src=nImg.src;
    
    //'cause image could be embedded in a web page
    //using base64 data, so we handle it seperately
    //what about svg?
    if(info['linkType']!='base64'){
        xhr.open("GET",nImg.src,true);
        xhr.onreadystatechange=function(){
            if(xhr.status==200&&xhr.readyState==4){
                imgType=xhr.getResponseHeader("Content-Type").split("/")[1],
                oImgFileSize=xhr.getResponseHeader("Content-Length");
               
                //format the number for better readability
                dispImgFileSize = fnum(oImgFileSize);

                if(oImgFileSize<=1024) imgFileSize = dispImgFileSize+' bytes';
                if(oImgFileSize>1024 && oImgFileSize<=1024000) imgFileSize = (oImgFileSize/1024).toFixed(2)+' KB <span class="gray">('+dispImgFileSize+' bytes)</span>';
                if(oImgFileSize>1024000)imgFileSize=(oImgFileSize/1024/1024).toFixed(2)+' MB <span class="gray">('+dispImgFileSize+' bytes)</span>';


                if(parseInt(imgFileSize)>0){
                    tds[7].innerHTML = imgFileSize;     
                }else{
                    tds[7].innerHTML=g('eifz');
                    tds[7].style.color="#999999";
                }

                imgType = (imgType&&imgType.toLowerCase()!="html") ? '<em>'+imgType.toUpperCase()+'</em> image' : g('eift');
                tds[5].innerHTML=imgType;
                if(imgType==g('eift')) tds[5].style.color="#999999"; 
                
                document.title="View Image Info";
                
            //will this conditional test cause any problem?
            }else if(xhr.status>=300){
                document.title="View Image Info [error occurred]";
                tds[5].innerHTML=g('eift');
                tds[7].innerHTML=g('eifz');
                tds[5].style.color=tds[7].style.color="#999999";
            }
        }
        xhr.send(null);
    
        //to do:there should be a function to 
        //stop the xmlhttprequest request if
        //it takes too long to get response.
        //the time should be, say, 30sec.
    
    //if the image source is base64 data
    //file size will be unavailable
    }else{
        document.title="View Image Info [Base64 data]";
        imgType='<em>'+info['imgSrc'].substring(11,info['imgSrc'].indexOf(';')).toUpperCase()+'</em> image (base64 data)';
        imgFileSize=g('eifz');
        tds[5].innerHTML=imgType;
        tds[7].innerHTML=imgFileSize;
        tds[7].style.color="#999999";
    }