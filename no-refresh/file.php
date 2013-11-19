<?php
  
$header = get_headers($_GET['url'],1);
// var_dump($header);
if(preg_match('/200/',$header[0])){
    if($header['Last-Modified'] && $header['Content-Type']){
        echo '{"Last-Modified":' . '"' . $header['Last-Modified'] . '"' . ',"Content-Type":' . '"' . $header['Content-Type'] . '"}';
    }
}else {
    echo 'false';
}