var popup = null;
$(function(){
	popup = new Popup();
})
function pop(class_name,shade_close){
	if (popup) {
		popup.msg($("."+class_name).html(),{ShadeClose:shade_close === undefined ? true : shade_close});
	}
}
function rewrite(class_name,_btn){
	if (popup) {
		var $win =$(_btn).parents('.popup-win') ;
		popup.rewrite($("."+class_name).html(),$win.attr('content-unique'));
	}
}