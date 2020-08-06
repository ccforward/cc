// 将 GitHub 静态资源地址替换为 jsdelivr 的 CDN 地址
var path = location.pathname;
var cdn = 'https://cdn.jsdelivr.net/gh' + path.replace('/blob/', '@');
var a = document.querySelector('#raw-url');
a.href = cdn;
a.setAttribute('target', '_blank');
if (['jpg', 'gif', 'png', 'svg'].includes(path.split('.')[1])) {
  var a = document.createElement('a');
  a.setAttribute('style', 'display:block;font-size:16px');
  a.target = "_blank";
  a.href = cdn;
  a.innerHTML = cdn;
  var img = document.querySelector('img[src="' + path + '?raw=true"]');
  img.parentNode.insertBefore(a, img)
}

// chrome 书签

javascript:var path = location.pathname;var cdn='https://cdn.jsdelivr.net/gh'+path.replace('/blob/','@');var a=document.querySelector('#raw-url');a.href=cdn;a.setAttribute('target','_blank');if(['jpg','gif','png','svg'].includes(path.split('.')[1])){var a=document.createElement('a');a.setAttribute('style','display:block;font-size:16px');a.target="_blank";a.href=cdn;a.innerHTML=cdn;var img = document.querySelector('img[src="'+path+'?raw=true"]');img.parentNode.insertBefore(a, img)}
