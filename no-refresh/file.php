<?php
  
$header = get_headers($_GET['url'],1);

// filemtime($_GET['url']);
// var_dump(filemtime('http://a.tbcdn.cn/apps/e/brix/1.0/brix-min.css'));

// if( @fopen($_GET['url'], 'r' ) ) {}
if(preg_match('/200/',$header[0])){
    if($header['Last-Modified'] && $header['Content-Type']){
        echo '{"Last-Modified":' . '"' . $header['Last-Modified'] . '"' . ',"Content-Type":' . '"' . $header['Content-Type'] . '"}';
    }
}else {
    echo 'false';
}