function load_options() {
    var isAutoLoad = localStorage["chrome_auto_load"];
    if (isAutoLoad > 0) {
        document.getElementById('J_Auto_Load').checked = true;
    }
}

document.addEventListener('DOMContentLoaded', load_options);
document.querySelector('#J_Save').addEventListener('click', function(){
    if(document.getElementById('J_Auto_Load').checked){
        localStorage["chrome_auto_load"] = 1;
    }else {
        localStorage["chrome_auto_load"] = -1;
    }
});
