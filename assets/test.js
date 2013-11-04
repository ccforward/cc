(function(S){
	var D = S.DOM,
		E = S.Event;

	D.insertBefore(D.create('<li class="sel-all" style="cursor:pointer;" id="J_sel_all"><a>ȫѡ</a></li>'), S.one('.nav-01'));
	E.on(S.one("#J_sel_all"), "click", function(e){
		e.preventDefault();
		S.all(".checkbox input").attr("checked", true);
	});
    
})(KISSY);